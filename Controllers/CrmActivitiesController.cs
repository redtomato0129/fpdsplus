using FedPipelineApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static FedPipelineApplication.Controllers.CrmDealsController;

namespace FedPipelineApplication.Controllers
{
    public class CrmActivitiesController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: CrmActivities
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddActivities()
        {
            return View();
        }

        public string ActivitiesList(int userId, int pageNo, string keyword)
        {
            string result = "";
            var error = string.Empty;
            var response = string.Empty;
            string UserDomain = Session["User_Domain"].ToString();
            List<ActivitiesDetails> activitylist = new List<ActivitiesDetails>();
            try
            {

                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = string.IsNullOrEmpty(keyword) ? "crm_activity_getAllUnion_byUserID" : "crm_activity_getAllUnion_Search";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    if (!string.IsNullOrEmpty(keyword))
                    {
                        cmd1.Parameters.AddWithValue("@search_text", keyword);
                    }
                    cmd1.Parameters.AddWithValue("@user_id", userId);
                    cmd1.Parameters.AddWithValue("@user_domain", UserDomain);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        ActivitiesDetails GetAll = new ActivitiesDetails();
                        GetAll.Activity_ID = Convert.ToInt32(rdr["id"]);
                        GetAll.Activity_name = rdr["Activity"].ToString();
                        GetAll.Description = rdr["description"].ToString();
                        GetAll.Type = rdr["Type"].ToString();
                        GetAll.created_datetime = rdr["created_date"].ToString();
                        //GetAll.created_datetime = rdr["created_datetime"].ToString();
                        GetAll.Deal_ID = Convert.ToInt32(rdr["deal_id"]);
                        GetAll.User_ID = Convert.ToInt32(rdr["user_id"]);
                        GetAll.title = rdr["title"].ToString();
                        GetAll.mode = rdr["mode"].ToString();
                        activitylist.Add(GetAll);
                    }
                }


            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            var pageSize = 14;
            var paginatedResult = activitylist.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            var pagesCount = Math.Ceiling((double)activitylist.Count / pageSize);
            return new JavaScriptSerializer().Serialize(new { records = paginatedResult, pagesCount });
        }

        //public string InsertActivities(ActivitiesDetails Activity)
        //{
        //    var sp = string.Empty;
        //    var error = string.Empty;
        //    var response = string.Empty;

        //    if (Activity.Activity_ID == 0)
        //    {
        //        sp = Common.crm_deal_insert;
        //    }
        //    else
        //    {
        //        sp = Common.crm_deal_update;
        //    }
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(MainCon))
        //        {

        //            using (SqlCommand cmd1 = new SqlCommand(sp, con))
        //            {
        //                con.Open();
        //                cmd1.CommandType = CommandType.StoredProcedure;
        //                var dateAndTime = DateTime.Now;
        //                Deal.created_datetime = dateAndTime.ToString();

        //                if (Deal.Deal_ID != 0)
        //                {
        //                    cmd1.Parameters.AddWithValue("@deal_id", Deal.Deal_ID);

        //                }
        //                else
        //                {
        //                    cmd1.Parameters.AddWithValue("@created_datetime", Deal.created_datetime);
        //                }
        //                cmd1.Parameters.AddWithValue("@title", Deal.Deal_Title);
        //                cmd1.Parameters.AddWithValue("@solicitation_number", Deal.Deal_SolicitationNumber);
        //                cmd1.Parameters.AddWithValue("@sam_gov_link", Deal.Deal_SamGov_Link);
        //                cmd1.Parameters.AddWithValue("@description", Deal.Description);
        //                cmd1.Parameters.Add(new SqlParameter("rfp_release_date", Deal.Deal_RFP_Release_Date));
        //                cmd1.Parameters.AddWithValue("@status", Deal.Deal_Status);
        //                cmd1.Parameters.AddWithValue("@stage", Deal.Deal_Stage);
        //                cmd1.Parameters.AddWithValue("@funding_agency_code", Deal.Deal_Funding_Agency_code);
        //                cmd1.Parameters.AddWithValue("@funding_agency_name", Deal.Deal_Funding_Agency_Name);
        //                cmd1.Parameters.AddWithValue("@funding_sub_agency_code", Deal.Deal_funding_sub_agency_code);
        //                cmd1.Parameters.AddWithValue("@funding_sub_agency_name", Deal.Deal_funding_sub_agency_name);
        //                cmd1.Parameters.AddWithValue("@awarding_agency_code", Deal.Deal_Awarding_Agency_code);
        //                cmd1.Parameters.AddWithValue("@awarding_agency_name", Deal.Deal_Awarding_Agency_name);
        //                cmd1.Parameters.AddWithValue("@award_type", Deal.Deal_Award_Type);
        //                cmd1.Parameters.AddWithValue("@set_aside", Deal.Deal_Set_Aside);
        //                cmd1.Parameters.AddWithValue("@set_aside_description", Deal.Deal_Set_Aside_Description);
        //                cmd1.Parameters.AddWithValue("@naics_code", Deal.Deal_naics_code);
        //                cmd1.Parameters.AddWithValue("@naics_description", Deal.Deal_naics_description);
        //                cmd1.Parameters.AddWithValue("@psc_code", Deal.Deal_PSC_code);
        //                cmd1.Parameters.AddWithValue("@psc_description", Deal.Deal_PSC_Description);
        //                cmd1.Parameters.AddWithValue("@incumbent_name", Deal.Deal_Incumbent_Name);
        //                cmd1.Parameters.AddWithValue("@incumbent_uei", Deal.Deal_Incumbent_UEI);
        //                cmd1.Parameters.AddWithValue("@potential_award_amount", Deal.Deal_Potential_Award_Amount);
        //                cmd1.Parameters.Add(new SqlParameter("@expiration_date", Deal.Deal_Expiration_Date));
        //                cmd1.Parameters.AddWithValue("@govwin_id", Deal.Deal_Govwin_ID);
        //                cmd1.Parameters.AddWithValue("@govwin_link", Deal.Deal_govwin_link);
        //                cmd1.Parameters.AddWithValue("@priority", Deal.Deal_Priority);
        //                cmd1.Parameters.AddWithValue("@user_id", Deal.user_id);
        //                cmd1.Parameters.AddWithValue("@user_domain", Deal.user_domain);

        //                var result = obj.insertExecuteNonQuery_SP(cmd1);
        //                if (result > 0)
        //                {
        //                    response = "Success";
        //                }
        //                else
        //                    response = "fail";

        //            }
        //            con.Close();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        response = "fail";
        //        error = ex.Message;
        //    }
        //    return new JavaScriptSerializer().Serialize(new { response, error });
        //}

        public string ProcessRequest(RecentDocument filedetails)
        {
            string response = string.Empty;
            string fileName = string.Empty;
            string filenamesaved = string.Empty;
            string sp = string.Empty;
            var error = string.Empty;
            var dateAndTime = DateTime.Now;
            filedetails.document_datetime = dateAndTime.ToString();
            if (Request.Files.Count > 0)
            {
                int result;

                string UserID = Session["User_ID"].ToString();
                string UserDomain = Session["User_Domain"].ToString();
                HttpFileCollectionBase files = Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    string filePath = Server.MapPath("~/UploadFiles/");
                    HttpPostedFileBase file = files[i];
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    filenamesaved = file.FileName;
                    fileName = filePath + file.FileName;
                    file.SaveAs(fileName);
                }
               
                try
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {

                        con.Open();
                      
                            sp = "crm_activity_Document_insert";
                       
                        using (SqlCommand cmd = new SqlCommand(sp, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            if (filedetails.activity_document_id != 0)
                            {
                              cmd.Parameters.AddWithValue("@activity_document_id", filedetails.activity_document_id);
                            }
                            cmd.Parameters.AddWithValue("@document_datetime", filedetails.document_datetime);

                            cmd.Parameters.AddWithValue("@file_name", filenamesaved);
                            cmd.Parameters.AddWithValue("@note", filedetails.note);
                            cmd.Parameters.AddWithValue("@deal_id", filedetails.Deal_ID);
                            cmd.Parameters.AddWithValue("@user_id", UserID);
                            
                             cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                            result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                                response = "Failed";

                        }
                        con.Close();
                    }
                }
                catch (Exception ex)
                {
                    response = "Failed";
                    error = ex.Message;
                }
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string ProcessRequestUpdate(RecentDocument filedetails)
        {
            string response = string.Empty;
            string fileName = string.Empty;
            string filenamesaved = string.Empty;
            string sp = string.Empty;
            var error = string.Empty;
            var dateAndTime = DateTime.Now;
            filedetails.document_datetime = dateAndTime.ToString();
            int result;
            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
            if (Request.Files.Count > 0)
            {
                HttpFileCollectionBase files = Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    string filePath = Server.MapPath("~/UploadFiles/");
                    HttpPostedFileBase file = files[i];
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    filenamesaved = file.FileName;
                    fileName = filePath + file.FileName;
                    file.SaveAs(fileName);
                }
            }
                try
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        sp = "crm_activity_Document_update";

                        using (SqlCommand cmd = new SqlCommand(sp, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            if (filedetails.activity_document_id != 0)
                            {
                                cmd.Parameters.AddWithValue("@activity_document_id", filedetails.activity_document_id);
                            }
                            cmd.Parameters.AddWithValue("@document_datetime", filedetails.document_datetime);
                            if(filenamesaved !="")
                            {
                                cmd.Parameters.AddWithValue("@file_name", filenamesaved);
                            }
                          
                            cmd.Parameters.AddWithValue("@note", filedetails.note);
                            cmd.Parameters.AddWithValue("@deal_id", filedetails.Deal_ID);
                            cmd.Parameters.AddWithValue("@user_id", UserID);
                            cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                        result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                                response = "Failed";

                        }
                        con.Close();
                    }
                }
                catch (Exception ex)
                {
                    response = "Failed";
                    error = ex.Message;
                }
            
            return new JavaScriptSerializer().Serialize(new { response, error });
        }



        public string DownloadFile(string filename)
        {
            //filename = "VPN_Setup.txt";

            string query = Request.QueryString[0];

            //Set the File Folder Path.
            //string path = HttpContext.Current.Server.MapPath("~/Files/");
            string path = HostingEnvironment.MapPath("~/UploadFiles/");
            //Read the File as Byte Array.
           

            byte[] bytes = System.IO.File.ReadAllBytes(path + filename);

            //Convert File to Base64 string and send to Client.
            return Convert.ToBase64String(bytes, 0, bytes.Length);
        }

        public string CallsAdd(CallDetails Call)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
            DateTime dt = DateTime.Now;
            string time = dt.ToShortTimeString();
            var dateAndTime = Call.Date + " " + time;
            Call.Date = dateAndTime.ToString();
            string Error = "";
            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if (Call.Activity_call_ID != 0)
                    {
                        sp = "crm_activity_Call_update";
                    }
                    else
                    {
                        sp = "crm_activity_Call_insert";
                    }
                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        if (Call.Activity_call_ID != 0)
                        {
                            cmd.Parameters.AddWithValue("@activity_call_id", Call.Activity_call_ID);
                        }
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@organization_called", Call.Organization);
                        cmd.Parameters.AddWithValue("@organization_contact", Call.Contact);
                        cmd.Parameters.AddWithValue("@note", Call.CallDescription);
                        cmd.Parameters.AddWithValue("@deal_id", Call.Deal_ID);
                        cmd.Parameters.AddWithValue("@call_date", Call.Date);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                        result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string NotesAdd(NoteDetails Notes)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
            var dateAndTime = DateTime.Now;
            Notes.Date = dateAndTime.ToString();
            string Error = "";
            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if (Notes.activity_note_id != 0)
                    {
                        sp = "crm_activity_Notes_update";
                    }
                    else
                    {
                        sp = "crm_activity_Notes_insert";
                       
                    }
                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        if (Notes.activity_note_id != 0)
                        {
                            cmd.Parameters.AddWithValue("@activity_note_id", Notes.activity_note_id);
                        }
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@note", Notes.NoteDescription);
                        cmd.Parameters.AddWithValue("@deal_id", Notes.Deal_ID);
                        cmd.Parameters.AddWithValue("@created_datetime", Notes.Date);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                        
                        result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string EmailAdd(EmailDetails Email)
        {
            var error = string.Empty;
            var response = string.Empty;
            try
            {
                int result = 0;
                var sp = string.Empty;
               
                DateTime dt = DateTime.Now;
                string time = dt.ToShortTimeString();
                var dateAndTime = Email.email_datetime + " " + time;
                Email.email_datetime = dateAndTime.ToString();
                string Error = "";
                string UserID = Session["User_ID"].ToString();
                string UserDomain = Session["User_Domain"].ToString();
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if (Email.activity_email_id != 0)
                    {
                        sp = "crm_activity_Email_update";
                    }
                    else
                    {
                        sp = "crm_activity_Email_insert";
                    }
                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (Email.activity_email_id != 0)
                        {
                            cmd.Parameters.AddWithValue("@email_datetime", Email.email_datetime);
                           
                            cmd.Parameters.AddWithValue("@activity_email_id", Email.activity_email_id);
                        } 
                        else
                        {
                            cmd.Parameters.AddWithValue("@email_datetime", Email.email_datetime);
                        }
                       
                        cmd.Parameters.AddWithValue("@contact_emailed", Email.contact_emailed);
                        cmd.Parameters.AddWithValue("@email_address", Email.email_address);
                        cmd.Parameters.AddWithValue("@body", Email.body);
                        cmd.Parameters.AddWithValue("@subject", Email.subject);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                        cmd.Parameters.AddWithValue("@deal_id", Email.Deal_ID);

                        result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }
        public string GetRecentNotes(int dealId)
        {
            List<RecentNotes> FundingAgency = new List<RecentNotes>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_get_activity_note", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", dealId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            RecentNotes funding = new RecentNotes();
                            funding.activity_note_id = Convert.ToInt32((dr2["activity_note_id"]));
                            funding.note = (dr2["note"].ToString());
                            funding.created_datetime = (dr2["created_datetime"].ToString());
                            funding.Deal_ID = Convert.ToInt32((dr2["deal_id"]));
                            funding.User_ID = Convert.ToInt32((dr2["user_id"]));
                            funding.User_Email = (dr2["User_Email"].ToString());

                            FundingAgency.Add(funding);

                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(FundingAgency);

        }

        public string GetRecentCalls(int dealId)
        {
            List<RecentCalls> FundingAgency = new List<RecentCalls>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_get_activity_call", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", dealId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            RecentCalls recentCalls = new RecentCalls();
                            recentCalls.activity_call_id = Convert.ToInt32((dr2["activity_call_id"]));
                            recentCalls.note = (dr2["note"].ToString());
                            recentCalls.organization_called = (dr2["organization_called"].ToString());
                            recentCalls.organization_contact = (dr2["organization_contact"].ToString());
                            recentCalls.call_date = (dr2["call_date"].ToString());
                            recentCalls.Deal_ID = Convert.ToInt32((dr2["deal_id"]));
                            recentCalls.User_ID = Convert.ToInt32((dr2["user_id"]));
                            recentCalls.User_Email = (dr2["User_Email"].ToString());
                            recentCalls.first_name = (dr2["User_FirstName"].ToString());
                            recentCalls.last_name = (dr2["User_LastName"].ToString());

                            FundingAgency.Add(recentCalls);

                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(FundingAgency);

        }

        public string GetRecentEmail(int dealId)
        {
            List<RecentEmail> FundingAgency = new List<RecentEmail>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_get_activity_Email", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", dealId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            RecentEmail recentEmail = new RecentEmail();
                            recentEmail.activity_email_id = Convert.ToInt32((dr2["activity_email_id"]));
                            recentEmail.email_datetime = (dr2["email_datetime"].ToString());
                            recentEmail.contact_emailed = (dr2["contact_emailed"].ToString());
                            recentEmail.email_address = (dr2["email_address"].ToString());
                            recentEmail.body = (dr2["body"].ToString());
                            recentEmail.Deal_ID = Convert.ToInt32((dr2["deal_id"]));
                            recentEmail.User_ID = Convert.ToInt32((dr2["user_id"]));
                            recentEmail.User_Email = (dr2["User_Email"].ToString());
                            recentEmail.subject = (dr2["subject"].ToString());
                            FundingAgency.Add(recentEmail);

                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(FundingAgency);

        }

        public string GetRecentDocument(int dealId)
        {
            List<RecentDocument> FundingAgency = new List<RecentDocument>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_get_activity_Document", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", dealId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            RecentDocument recentEmail = new RecentDocument();
                            recentEmail.activity_document_id = Convert.ToInt32((dr2["activity_document_id"]));
                            recentEmail.document_datetime = (dr2["document_datetime"].ToString());
                            recentEmail.note = (dr2["note"].ToString());
                            recentEmail.file_name = (dr2["file_name"].ToString());
                            recentEmail.Deal_ID = Convert.ToInt32((dr2["deal_id"]));
                            recentEmail.User_ID = Convert.ToInt32((dr2["user_id"]));
                            recentEmail.User_Email = (dr2["User_Email"].ToString());

                            FundingAgency.Add(recentEmail);

                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(FundingAgency);

        }

        public string Search(string searchtxt, int userId)
        {

            List<ActivitiesDetails> GetSearchData = new List<ActivitiesDetails>();
            string UserDomain = Session["User_Domain"].ToString();

            using (SqlConnection con = new SqlConnection(MainCon))
            {


                SqlCommand cmd1 = new SqlCommand("crm_activity_getAllUnion_Search", con);
                cmd1.CommandType = CommandType.StoredProcedure;
                cmd1.Parameters.AddWithValue("@search_text", searchtxt);
                cmd1.Parameters.AddWithValue("@user_id", userId);
                cmd1.Parameters.AddWithValue("@user_domain", UserDomain);

                con.Open();
                SqlDataReader rdr = cmd1.ExecuteReader();
                while (rdr.Read())
                {
                    ActivitiesDetails GetAll = new ActivitiesDetails();
                    GetAll.Activity_ID = Convert.ToInt32(rdr["id"]);
                    GetAll.Activity_name = rdr["Activity"].ToString();
                    GetAll.Description = rdr["description"].ToString();
                    GetAll.Type = rdr["Type"].ToString();
                    GetAll.created_datetime = rdr["created_date"].ToString();
                    GetAll.title = rdr["title"].ToString();
                    GetAll.mode = rdr["mode"].ToString();
                    //GetAll.created_datetime = rdr["created_datetime"].ToString();
                    GetAll.Deal_ID = Convert.ToInt32(rdr["deal_id"]);
                    GetAll.User_ID = Convert.ToInt32(rdr["user_id"]);
                    

                    GetSearchData.Add(GetAll);
                }
            }





            con.Close();



            return new JavaScriptSerializer().Serialize(GetSearchData);
        }


        public class ActivitiesDetails
        {
            public int Activity_ID { get; set; }
            public string Activity_name { get; set; }
            public string Description { get; set; }
            public string Type { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }

            public string title { get; set; }
            public string created_datetime { get; set; }

            public string mode { get; set; }



        }

        public class RecentNotes
        {
            public int activity_note_id { get; set; }
            public string note { get; set; }
            public string created_datetime { get; set; }
            public string User_Email { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }
        }

        public class RecentCalls
        {
            public int activity_call_id { get; set; }
            public string call_date { get; set; }
            public string organization_called { get; set; }
            public string organization_contact { get; set; }
            public string note { get; set; }
            public int Deal_ID { get; set; }
            public string User_Email { get; set; }
            public string first_name { get; set; }
            public  string last_name { get; set; }
            public int User_ID { get; set; }
        }

        public class RecentEmail
        {
            public int activity_email_id { get; set; }
            public string email_datetime { get; set; }
            public string contact_emailed { get; set; }
            public string email_address { get; set; }
            public string body { get; set; }
            public string subject { get; set; }
            public string User_Email { get; set; }
            public int User_ID { get; set; }

            public int Deal_ID { get; set; }
        }

        public class RecentDocument
        {
            public int activity_document_id { get; set; }
            public string document_datetime { get; set; }
            public string note { get; set; }
            public string file_name { get; set; }
            public string User_Email { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }
        }

        public class CallDetails
        {
            public int Activity_call_ID { get; set; }
            public string Date { get; set; }
            public string Organization { get; set; }

            public string Contact { get; set; }

            public string Note { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }
            public string CallDescription { get; set; }
        }

        public class NoteDetails
        {
            public int activity_note_id { get; set; }
            public string NoteDescription { get; set; }
            public string Date { get; set; }
            public string Note { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }
        }

        public class EmailDetails
        {
            public int activity_email_id { get; set; }
            public string email_datetime { get; set; }
            public string contact_emailed { get; set; }
            public string email_address { get; set; }
            public string body { get; set; }
            public string subject { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }

        }

        public class FileDetails
        {
            public string activity_document_id { get; set; }
            public string document_datetime { get; set; }
            public string note { get; set; }
            public string file_name { get; set; }
            public int User_ID { get; set; }
            public int Deal_ID { get; set; }

        }

    }
}