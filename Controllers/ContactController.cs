using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    public class ContactController : Controller
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


        public string SendContactMail(Contact ContactDetails)
        {
            string result = "";
            string UserID = (string)Session["User_Id"];

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Registration_InsertContactData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@User_Id", UserID);
                        cmd.Parameters.AddWithValue("@User_FirstName", ContactDetails.Contact_FirstName);
                        cmd.Parameters.AddWithValue("@User_LastName", ContactDetails.Contact_LastName);
                        cmd.Parameters.AddWithValue("@User_Email", ContactDetails.Contact_Email);
                        cmd.Parameters.AddWithValue("@BusineesName", ContactDetails.Contact_BusineesName);
                        cmd.Parameters.AddWithValue("@User_Message", ContactDetails.Contact_Message);

                        int n = cmd.ExecuteNonQuery();
                    }

                }
                var emailservice = mail.ContactMail(ContactDetails.Contact_FirstName, ContactDetails.Contact_LastName, ContactDetails.Contact_Email, ContactDetails.Contact_BusineesName, ContactDetails.Contact_Message);

                if (emailservice == "success")
                {
                    result = "success";
                }

            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(result);
        }


    }

    public class Contact
    {
        public string Contact_FirstName { get; set; }
        public string Contact_LastName { get; set; }
        public string Contact_Email { get; set; }
        public string Contact_BusineesName { get; set; }
        public string Contact_Message { get; set; }

    }
}