using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    public class EmailNotificationController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineDataConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: EmailNotification
        public ActionResult Index()
        {
            return View();
        }

        public string GetEmailNotificationByUserId()
        {
            string userId = Session["User_ID"].ToString();
            var emailNotification = new EmailNotification();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    SqlCommand cmd1 = new SqlCommand("cmi_email_notification_get_by_userId", con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@user_id", userId);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    if (rdr.Read())
                    {
                        emailNotification.Email_Notification_Id = Convert.ToInt32(rdr["Email_Notification_Id"]);
                        emailNotification.User_id = Convert.ToInt32(rdr["User_id"]);
                        emailNotification.Status = Convert.ToInt32(rdr["Status"]);
                        emailNotification.Frequency_type = rdr["Frequency_type"].ToString();
                        emailNotification.Frequency_option = rdr["Frequency_option"].ToString();
                    }
                }
            }
            catch (Exception)
            {
                // error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { emailNotification });
        }


        public string EmailNotificationAdd(EmailNotification emailNotificationObject)
        {
            var emailNotification = new EmailNotification();
            var error = string.Empty;
            var response = string.Empty;
            string sp = string.Empty;
            int result = 0;
            string userId = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if (emailNotificationObject.Email_Notification_Id != 0)
                    {
                        sp = "cmi_email_notification_update";
                    }
                    else
                    {
                        sp = "cmi_email_notification_insert";
                    }
                  
                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@user_id", userId);
                        cmd.Parameters.AddWithValue("@status", emailNotificationObject.Status);
                        cmd.Parameters.AddWithValue("@frequency_type", emailNotificationObject.Frequency_type);
                        cmd.Parameters.AddWithValue("@frequency_option", emailNotificationObject.Frequency_option);
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
    }
}

public class EmailNotification
{
    public int Email_Notification_Id { get; set; }
    public int User_id { get; set; }
    public int Status { get; set; }
    public string Frequency_type { get; set; }
    public string Frequency_option { get; set; }
}