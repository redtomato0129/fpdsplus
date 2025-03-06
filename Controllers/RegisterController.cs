using FedPipelineApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Services;
using static System.Net.WebRequestMethods;

namespace FedPipelineApplication.Controllers
{
    public class RegisterController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();


        public ActionResult Index()
        {
            //Session["JSVersion"] = DateTime.Now.ToString("yyyyMMddHHmmss");
            return View();
        }
        public ActionResult register()
        {
            return View();
        }

        public ActionResult publicUser()
        {
            return View();
        }

        [WebMethod]
        public string UserRegister(RegisterDetails RegisterDetails)
        {

            string result = "";


            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_GetRegEmail, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@User_Email", RegisterDetails.User_Email);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count == 0)

                        {
                            var OTP = mail.GenerateNumericOTP();

                            using (SqlCommand cmd1 = new SqlCommand(Common.app_Registation_InsertRegistration, con))
                            {
                                cmd1.CommandType = CommandType.StoredProcedure;



                                cmd1.Parameters.AddWithValue("@User_FirstName", RegisterDetails.User_FirstName);
                                cmd1.Parameters.AddWithValue("@User_LastName", RegisterDetails.User_LastName);
                                cmd1.Parameters.AddWithValue("@User_Email", RegisterDetails.User_Email);
                                cmd1.Parameters.AddWithValue("@User_PhoneNo", RegisterDetails.User_PhoneNo);
                                cmd1.Parameters.AddWithValue("@User_Company", RegisterDetails.User_Company);
                                cmd1.Parameters.AddWithValue("@User_Address", RegisterDetails.User_Address);
                                cmd1.Parameters.AddWithValue("@User_City", RegisterDetails.User_City);
                                cmd1.Parameters.AddWithValue("@User_State", RegisterDetails.User_State);
                                cmd1.Parameters.AddWithValue("@User_Pincode", RegisterDetails.User_Pincode);
                                cmd1.Parameters.AddWithValue("@User_OTP", OTP);


                                int n = cmd1.ExecuteNonQuery();
                                mail.RegisterMail(RegisterDetails.User_Email, OTP);
                                if (n != 0)
                                {
                                    var res = n;
                                }

                                result = "success";
                            }
                        }
                        else
                        {
                            result = "fail";
                        }

                    }

                }


            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(result);
        }

        public string PublicUserRegister(RegisterPublicUserDetails RegisterPublicUserDetails)
        {
            string result = "";
            int passwordLength = 8;
            string UserId = String.Empty;
            PublicUserService service = new PublicUserService();

            string nameBeforeAtSymbol = service.GetNameBeforeAtSymbol(RegisterPublicUserDetails.Email);
            string Public_Email = nameBeforeAtSymbol + "-public@fedpipeline.com";
            string Public_Password = service.GenerateRandomPassword(passwordLength);
            DateTime CurrentDate = DateTime.Now;
            DateTime nextSunday = service.GetNextSundayWithTime(CurrentDate);

            UserStateResult responseData = service.GetExistingUser(RegisterPublicUserDetails.Email);

            if (responseData != null)
            {
                if (responseData.UserState == "no-user-found")
                {
                    // create new user
                    try
                    {
                        using (SqlConnection con = new SqlConnection(MainCon))
                        {
                            con.Open();
                            var OTP = mail.GenerateNumericOTP();
                            using (SqlCommand cmd = new SqlCommand(Common.app_Registation_InsertRegistration, con))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@User_FirstName", RegisterPublicUserDetails.FirstName);
                                cmd.Parameters.AddWithValue("@User_LastName", RegisterPublicUserDetails.LastName);
                                cmd.Parameters.AddWithValue("@User_Email", RegisterPublicUserDetails.Email);
                                cmd.Parameters.AddWithValue("@User_PhoneNo", RegisterPublicUserDetails.Phone);
                                cmd.Parameters.AddWithValue("@Trial_User", 0);// count is 1 for trial users
                                cmd.Parameters.AddWithValue("@User_OTP", OTP);
                                cmd.Parameters.AddWithValue("@Public_Email", Public_Email);
                                cmd.Parameters.AddWithValue("@User_Password", Public_Password);
                                cmd.Parameters.AddWithValue("@Created_Date", CurrentDate);
                                cmd.Parameters.AddWithValue("@Expiration_Date", nextSunday);
                                cmd.Parameters.AddWithValue("@Trial_Count", 0);
                                cmd.Parameters.AddWithValue("@Login_Count", 0);
                                cmd.Parameters.AddWithValue("@Paid", 1);// this is for answers
                                cmd.Parameters.AddWithValue("@Active", 1);// this is for answers
                                int n = cmd.ExecuteNonQuery();
                                if (n != 0)
                                {
                                    {
                                        var res = n;
                                    }
                                    result = responseData.UserState;
                                    //these two statements added for answers
                                    mail.PublicAccountMail(RegisterPublicUserDetails.Email, Public_Email, Public_Password, nextSunday, OTP);
                                    con.Close();
                                }
                            }
                            // this is commented for answers block
                          /*  using (SqlCommand cmd1 = new SqlCommand(Common.app_getLatest_User, con))
                            {

                                DataSet ds = obj.getDataSet_SP(cmd1);
                                if (ds.Tables["data"].Rows.Count > 0)
                                {

                                    DataRow dr = ds.Tables["data"].Rows[0];
                                    UserId = dr["User_Id"].ToString();

                                    using (SqlCommand cmd2 = new SqlCommand(Common.app_InsertPublicUserRegistration, con))
                                    {
                                        cmd2.CommandType = CommandType.StoredProcedure;
                                        cmd2.Parameters.AddWithValue("@Plan_Name", "Trial");
                                        cmd2.Parameters.AddWithValue("@User_id", UserId);
                                        int n = cmd2.ExecuteNonQuery();
                                        if (n != 0)
                                        {
                                            var res = n;
                                            result = responseData.UserState;
                                            mail.PublicAccountMail(RegisterPublicUserDetails.Email, Public_Email, Public_Password, nextSunday);
                                            con.Close();
                                        }
                                    }
                                }
                            }*/

                        }
                    }

                    catch (Exception ex)
                    {
                        result = ex.Message;
                    }
                }
                else if (responseData.UserState == "user-expired")
                {
                    // update count ,public password ,cration date,expiry date
                    try
                    {
                        using (SqlConnection con = new SqlConnection(MainCon))
                        {
                            con.Open();

                            var OTP = mail.GenerateNumericOTP();
                            using (SqlCommand cmd = new SqlCommand(Common.app_Registration_UpdateRegistration, con))
                            {
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@User_FirstName", RegisterPublicUserDetails.FirstName);
                                cmd.Parameters.AddWithValue("@User_LastName", RegisterPublicUserDetails.LastName);
                                cmd.Parameters.AddWithValue("@User_Email", RegisterPublicUserDetails.Email);
                                cmd.Parameters.AddWithValue("@User_PhoneNo", RegisterPublicUserDetails.Phone);
                                cmd.Parameters.AddWithValue("@User_OTP", OTP);
                                cmd.Parameters.AddWithValue("@Public_Email", Public_Email);
                                cmd.Parameters.AddWithValue("@Public_Password", Public_Password);
                                cmd.Parameters.AddWithValue("@Created_Date", CurrentDate);
                                cmd.Parameters.AddWithValue("@Expiration_Date", nextSunday);
                                cmd.Parameters.AddWithValue("@Trial_Count", responseData.Count);
                                int n = cmd.ExecuteNonQuery();
                                if (n != 0)
                                {
                                   
                                    
                                }
                            }

                            using (SqlCommand cmd1 = new SqlCommand(Common.app_Login_GetRegLoginData, con))
                            {
                                cmd1.CommandType = CommandType.StoredProcedure;
                                cmd1.Parameters.AddWithValue("@User_Email", RegisterPublicUserDetails.Email);
                                cmd1.Parameters.AddWithValue("@Role", "User");
                                DataSet ds = obj.getDataSet_SP(cmd1);
                                if (ds.Tables["data"].Rows.Count > 0)
                                {

                                    DataRow dr = ds.Tables["data"].Rows[0];
                                    UserId = dr["User_ID"].ToString();
                                    using (SqlCommand cmd2 = new SqlCommand(Common.app_UpdatePublicUserRegistration, con))
                                    {
                                        cmd2.CommandType = CommandType.StoredProcedure;
                                        cmd2.Parameters.AddWithValue("@Plan_name","Trial");
                                        cmd2.Parameters.AddWithValue("@User_id", UserId);
                                        int n = cmd2.ExecuteNonQuery();
                                        mail.PublicAccountMail(RegisterPublicUserDetails.Email, Public_Email, Public_Password, nextSunday, OTP);
                                        if (n != 0)
                                        {
                                            {
                                                var res = n;
                                            }
                                            result = responseData.UserState;
                                            con.Close();
                                        }
                                    }
                                }
                            }
                            
                        }
                    }

                    catch (Exception ex)
                    {
                        result = ex.Message;
                    }
                }
                else if (responseData.UserState == "user-is-valid")
                {
                    // user is already valid
                    result = responseData.UserState;
                }
            }
            return new JavaScriptSerializer().Serialize(result);
        }

        public string CheckDomainException(string Email)
        {
            List<string> domainList = new List<string>();
            string error = String.Empty;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("app_returnDomains", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@domain_name", Email);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                domainList.Add(dr2["domain_name"].ToString());
                            }
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception err)
            {
                error=err.Message;
            }

            return new JavaScriptSerializer().Serialize(domainList);


        }
    }


        public class RegisterDetails
        {
            public string User_FirstName { get; set; }
            public string User_LastName { get; set; }
            public string User_Email { get; set; }
            public string User_Password { get; set; }
            public string User_PhoneNo { get; set; }
            public string User_Company { get; set; }
            public string User_Address { get; set; }
            public string User_City { get; set; }
            public string User_State { get; set; }
            public string User_Pincode { get; set; }

            //public string username { get; set; }
            //public string useremail { get; set; }
            //public string password { get; set; }
            //public string phoneno { get; set; }


        }



    
}