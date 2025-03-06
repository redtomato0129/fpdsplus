using FedPipelineApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static System.Net.WebRequestMethods;

namespace FedPipelineApplication.Controllers
{
    public class LoginController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        EncryptDecrypt EN_DE = new EncryptDecrypt();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DownloadFile(string fileName, bool type)
        {
            var contentPath = "";
            if (type)
            {
                contentPath = Server.MapPath("/Uploads/");
            }
            else
            {
                contentPath = Server.MapPath("/Uploads/files/");
            }
            byte[] fileBytes = System.IO.File.ReadAllBytes(contentPath + fileName);
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        }

        public ActionResult login()
        {
            return View();
        }

        public async Task<string> CheckPublicAccountLogin(PublicUser PublicAccountLoginDetails)
        {
            //string password = EN_DE.Encrypt(LoginDetails.userpassword);
            string Public_Email = PublicAccountLoginDetails.Public_Email;
            string Public_Password = PublicAccountLoginDetails.Public_Password;
            dynamic result = 0;
            var res = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("app_publicUserLogin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Public_Email", Public_Email);
                        cmd.Parameters.AddWithValue("@Public_Password", Public_Password);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            DataRow dr = ds.Tables["data"].Rows[0];
                            Public_Email = dr["Public_Email"].ToString();
                            var Domain = Public_Email.Split('@');
                            var DomainName = Domain[1];
                            int LoginCount = Convert.ToInt32(dr["Login_Count"]) + 1;
                            int TrialCount= Convert.ToInt32(dr["Trial_User"]);
                            Session["User_FirstName"] = dr["User_FirstName"].ToString();
                            Session["User_Id"] = dr["User_Id"].ToString();
                            Session["IsPaidUser"] = (bool)dr["Paid"];
                            Session["isTrialUser"] = TrialCount;
                            Session["User_Domain"] = DomainName;
                            Session["User_Email"] = Public_Email;
                            Session["User_FirstName"] = dr["User_FirstName"].ToString();
                            using (SqlCommand cmd1 = new SqlCommand("app_UpdatePublicUserLoginCount", con))
                            {
                                cmd1.CommandType = CommandType.StoredProcedure;

                                cmd1.Parameters.AddWithValue("@Public_Email", Public_Email);
                                cmd1.Parameters.AddWithValue("@Login_Count", LoginCount);

                                int n = cmd1.ExecuteNonQuery();
                                if (n!=0)
                                {
                                    result = new ExpandoObject();
                                    result.userEmail = EN_DE.Encrypt(dr["Public_Email"].ToString()); ;
                                    result.User_OTP = Convert.ToInt32(dr["User_OTP"]);
                                }
                                else{
                                    result = 0;
                                }
                            }
                        }
                        else
                        {
                            result = 0;
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                result = 0;
            }
            return new JavaScriptSerializer().Serialize(result);
        }

        public async Task<string> CheckLogin(User LoginDetails)
        {

            //string password = EN_DE.Encrypt(LoginDetails.userpassword);
            string User_Email = string.Empty;
            string User_FirstName = string.Empty;
            string User_LastName = string.Empty;

            int result = 0;
            var res = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_GetRegLoginData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Email", LoginDetails.useremail);
                        //cmd.Parameters.AddWithValue("@User_Password", password);
                        cmd.Parameters.AddWithValue("@Role", "User");


                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {

                            DataRow dr = ds.Tables["data"].Rows[0];
                            User_Email = dr["User_Email"].ToString();
                            User_FirstName = dr["User_FirstName"].ToString();
                            User_LastName = dr["User_LastName"].ToString();
                            var Domain = User_Email.Split('@');
                            var DomainName = Domain[1];
                            Session["User_Domain"] = DomainName;
                            Session["User_Email"] = User_Email;
                            Session["User_FirstName"] = dr["User_FirstName"].ToString();
                            Session["User_Id"] = dr["User_Id"].ToString();
                            Session["IsPaidUser"] = (bool)dr["Paid"];

                            var OTP = mail.GenerateNumericOTP();
                            using (SqlCommand cmd1 = new SqlCommand(Common.app_Login_UpdateUserOTP, con))
                            {
                                cmd1.CommandType = CommandType.StoredProcedure;

                                cmd1.Parameters.AddWithValue("@User_Email", LoginDetails.useremail);
                                cmd1.Parameters.AddWithValue("@User_OTP", OTP);

                                int n = cmd1.ExecuteNonQuery();
                                await mail.LoginEmail(LoginDetails.useremail, OTP);
                                if (n != 0)
                                {
                                    res = n;
                                }
                                result = res;
                            }
                        }
                        else
                        {
                            result = 0;
                        }
                    }
                }
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
                result = 0;
            }
            return new JavaScriptSerializer().Serialize(result);
        }

        public string GetMaintenanceStatus()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<MaintenanceStatus> maintenanceList = new List<MaintenanceStatus>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_check_maintenance_status";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        MaintenanceStatus maintenanceObject = new MaintenanceStatus();
                        maintenanceObject.enable_maintenance = Convert.ToInt32(rdr["enable_maintenance"]);
                        maintenanceObject.message = rdr["message"].ToString();
                        maintenanceList.Add(maintenanceObject);
                    }
                    rdr.Close();
                }
                con.Close();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = maintenanceList });
        }

        public string checkCookieCode(User LoginDetails)
        {

            //string password = EN_DE.Encrypt(LoginDetails.userpassword);
            string User_Email = string.Empty;
            int result = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_CheckUser, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Email", LoginDetails.useremail);
                        cmd.Parameters.AddWithValue("@Code", LoginDetails.CookieCode);


                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            DataRow dr = ds.Tables["data"].Rows[0];
                            User_Email = dr["User_Email"].ToString();
                            Session["User_Email"] = User_Email;
                            var Domain = User_Email.Split('@');
                            var DomainName = Domain[1];
                            Session["User_Domain"] = DomainName;
                            Session["User_FirstName"] = dr["User_FirstName"].ToString();
                            Session["User_Id"] = dr["User_Id"].ToString();
                            Session["IsPaidUser"] = (bool)dr["Paid"];

                            using (SqlCommand cmd1 = new SqlCommand(Common.app_Login_GetLoginPaymentData, con))
                            {
                                cmd1.CommandType = CommandType.StoredProcedure;
                                cmd1.Parameters.AddWithValue("@User_Id", Session["User_Id"]);
                                DataSet ds1 = obj.getDataSet_SP(cmd1);
                                if (ds1.Tables["data"].Rows.Count > 0)
                                {
                                    Session["Buy"] = '1';

                                }
                                else
                                {
                                    Session["Buy"] = '0';
                                }
                            }
                            result = 1;
                        }
                        else
                        {
                            result = 0;
                        }
                    }
                }
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
                result = 0;
            }
            return new JavaScriptSerializer().Serialize(result);
        }

        public class MaintenanceStatus
        {
            public int enable_maintenance { get; set; }
            public string message { get; set; }
        }
    }
}