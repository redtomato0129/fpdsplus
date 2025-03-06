using ICSharpCode.SharpZipLib.Zip;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    public class FeedbackController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Contact
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InstantFeedback()
        {
            return View();
        }
        public string SendInstantFeedback(Feedback FeedbackDetails)
        {
            var flag = false;
            List<string> files = new List<string>();
            string folders = "";
            try
            {
                if (FeedbackDetails.Files != null)
                {
                    string folderPath = Server.MapPath("/Uploads/");
                    string filePath = Server.MapPath("/Uploads/files/");
                    ZipOutputStream s = null;
                    DateTime current = DateTime.Now;
                    FileStream fs;
                    MemoryStream ms = null;
                    string zipfName = "Data" + current.Date.Day.ToString() + current.Date.Month.ToString() + current.Date.Year.ToString() + current.TimeOfDay.Duration().Hours.ToString() + current.TimeOfDay.Duration().Minutes.ToString() + current.TimeOfDay.Duration().Seconds.ToString();
                    if (FeedbackDetails.Files.Length > 0)
                    {
                        var zip = folderPath + zipfName + ".zip";
                        folders = zipfName + ".zip";
                        using (s = new ZipOutputStream(System.IO.File.Create(zip)))
                        {
                            foreach (var file in FeedbackDetails.Files)
                            {
                                if (file != null)
                                {

                                    var fileStream = file.Split(',');

                                    string fileName = "";
                                    fileName = DateTime.Now.ToString("yyyyMMddHHmmssffff");
                                    var index = Array.IndexOf(FeedbackDetails.Files, file);
                                    fileName = fileName + "." + FeedbackDetails.Extensions[index];
                                    files.Add(fileName);
                                    byte[] bytes = Convert.FromBase64String(fileStream[1]);

                                    using (ms = new MemoryStream(bytes))
                                    {
                                        using (fs = new FileStream(Path.Combine(filePath, fileName), FileMode.Create, System.IO.FileAccess.Write))
                                        {
                                            ms.CopyTo(fs);

                                        }
                                    }
                                    s.SetLevel(9);
                                    byte[] buffer = Convert.FromBase64String(fileStream[1]);

                                    ZipEntry entry = new ZipEntry(fileName);

                                    entry.DateTime = DateTime.Now;

                                    s.PutNextEntry(entry);
                                    using (ms = new MemoryStream(bytes))
                                    {
                                        using (fs = new FileStream(Path.Combine(folderPath, fileName), FileMode.OpenOrCreate, System.IO.FileAccess.ReadWrite))
                                        {
                                            //ms.CopyTo(fs);
                                            ms.CopyTo(s);
                                        }
                                    }

                                    s.CloseEntry();
                                    System.IO.File.Delete(Path.Combine(folderPath, fileName));
                                }
                            }

                        }
                        s.Finish();
                        s.Close();
                        flag = true;
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            string result = "success";
            string UserID = (string)Session["User_Id"];
            var userEmailAddress = Session["User_Email"].ToString();
            var feedback_id = 0;
            
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_InsertFeedback, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@module", FeedbackDetails.Feedback_Module);
                        cmd.Parameters.AddWithValue("@feedback_type", FeedbackDetails.Feedback_Type);
                        cmd.Parameters.AddWithValue("@contact_requested", false);
                        cmd.Parameters.AddWithValue("@message", FeedbackDetails.Feedback_Message);
                        cmd.Parameters.Add("@output", SqlDbType.Int).Direction = ParameterDirection.Output;
                        int n = cmd.ExecuteNonQuery();
                        feedback_id = Convert.ToInt32(cmd.Parameters["@output"].Value);
                        if (feedback_id > 0)
                        {

                            var email = mail.SendInstantMailToAdmin(feedback_id, userEmailAddress, FeedbackDetails.Feedback_Module, FeedbackDetails.Feedback_Type, "", FeedbackDetails.Feedback_Message, folders, files);

                            if (n != 0)
                            {
                                var res = n;
                            }

                            if (email == "success")
                            {
                                result = "success";
                            }
                        }
                        else
                        {
                            result = "fail";
                        }


                        con.Close();


                    }
                }
            

            return new JavaScriptSerializer().Serialize(result);

        }


        public string SendFeedbackMail(Feedback FeedbackDetails)
        {

            string result = "";
            string UserID = (string)Session["User_Id"];


            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(Common.app_InsertFeedback, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@User_Id", UserID);
                    cmd.Parameters.AddWithValue("@module", FeedbackDetails.Feedback_Module);
                    cmd.Parameters.AddWithValue("@feedback_type", FeedbackDetails.Feedback_Type);
                    cmd.Parameters.AddWithValue("@contact_requested", FeedbackDetails.Feedback_Contact_Requested);
                    cmd.Parameters.AddWithValue("@message", FeedbackDetails.Feedback_Message);

                    var contreq = FeedbackDetails.Feedback_Contact_Requested;

                    if (FeedbackDetails.Feedback_Contact_Requested == "0")
                    {

                        contreq = "YES";
                    }

                    else if (FeedbackDetails.Feedback_Contact_Requested == "1")
                    {
                        contreq = "NO";
                    }

                    int n = cmd.ExecuteNonQuery();
                    var email = mail.SendMailToAdmin(FeedbackDetails.Feedback_Module, FeedbackDetails.Feedback_Type, contreq, FeedbackDetails.Feedback_Message);

                    if (n != 0)
                    {
                        var res = n;
                    }

                    if (email == "success")
                    {
                        result = "success";
                    }

                    else
                    {
                        result = "fail";
                    }


                    con.Close();
                    return new JavaScriptSerializer().Serialize(result);

                }
            }
        }



        public class Feedback
        {
            public string Feedback_Module { get; set; }
            public string Feedback_Type { get; set; }
            public string Feedback_Contact_Requested { get; set; }
            public string Feedback_Message { get; set; }

            public string[] Files { get; set; }
            public string[] Extensions { get; set; }


        }
    }
}