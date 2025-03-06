using FedPipelineApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static System.Net.WebRequestMethods;

namespace FedPipelineApplication.Controllers
{
    public class VerifyUSerController : Controller
    {

        Utility obj = new Utility();
        EncryptDecrypt EN_DE = new EncryptDecrypt();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        SendEmail mail = new SendEmail();
        // GET: VerifyUSer
        public ActionResult Index()
        {
            return View();
        }

        public string Userverification(user_Verification VerificationDetails)
        {

            //var password = EN_DE.Encrypt(VerificationDetails.User_confirmPassword);
            var User_Email = EN_DE.Decrypt(VerificationDetails.User_Email);
            SubscriptionPlanData subsciptionPlan = new SubscriptionPlanData();
            string username = string.Empty;
            int result = 0;
            string LoginResult = "0";
            con.Open();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_VerifyUserData, con))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_OTP", VerificationDetails.User_verificationcode);
                        cmd.Parameters.AddWithValue("@User_Email", User_Email);
                        //cmd.Parameters.AddWithValue("@User_Password", password);
                        int n = cmd.ExecuteNonQuery();

                        result = n;
                        if (result > 0)
                        {
                            LoginResult = CheckLogin(VerificationDetails.User_Email);
                            
                            subsciptionPlan = GetSubscription();
                        }

                    }

                }

            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
                LoginResult = "0";
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(new { subsciptionPlan, LoginResult });
        }


        public string CheckLogin(string Email)
        {

            //string password = EN_DE.Encrypt(LoginDetails.userpassword);
            string User_Email = string.Empty;
            var DEcodeEmail = EN_DE.Decrypt(Email);
            int result = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_GetRegLoginData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Email", DEcodeEmail);
                        //cmd.Parameters.AddWithValue("@User_Password", password);
                        cmd.Parameters.AddWithValue("@Role", "User");


                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)

                        {
                            DataRow dr = ds.Tables["data"].Rows[0];
                            User_Email = dr["User_Email"].ToString();
                            Session["User_Email"] = User_Email;
                            Session["User_FirstName"] = dr["User_FirstName"].ToString();
                            Session["User_Id"] = dr["User_Id"].ToString();
                            
                            Session["IsPaidUser"] = (bool)dr["Paid"];
                            Session.Timeout = 60;
                            if ((bool)dr["Paid"] == true)
                            {
                                result = 1;
                            }
                            else
                            {
                                result = 0;
                            }

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

        public SubscriptionPlanData GetSubscription()
        {
            string UserID = (string)Session["User_Id"];
            string Error = "";
            SubscriptionPlanData SubscriptionData = new SubscriptionPlanData();
            SubscriptionData.Subscriptions = new List<Subscription>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_GetUserSubscriptionData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                Subscription data01 = new Subscription();
                                //DataRow dr = ds.Tables["data"].Rows[0];
                                data01.Code = dr["Code"].ToString();
                                data01.Name = dr["Name"].ToString();
                                data01.Active = dr["Active"].ToString();
                                data01.Value = dr["Value"].ToString();
                                data01.Description = dr["Description"].ToString();
                                data01.Position = dr["DisplayPosition"].ToString();
                                data01.PlanID = dr["PlanID"].ToString();

                                SubscriptionData.Subscriptions.Add(data01);
                            }
                        }

                        if (ds.Tables["data1"].Rows.Count > 0)
                        {
                            SubscriptionData.SelectedPlanId = ds.Tables["data1"].Rows[0].ItemArray[0].ToString();
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            //return new JavaScriptSerializer().Serialize(SubData);
            //return new JavaScriptSerializer().Serialize(new { SubData, result });
            return SubscriptionData;
        }

        public string verifyRfqUser(string email)
        {
            string username = string.Empty;
            int result = 0;
            string LoginResult = "0";
            string ToEmailID = string.Empty;
            string otp = string.Empty;
            string param = string.Empty;
            con.Open();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_Rfq_VerifyUserData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Email", email);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0) {
                            DataRow dr = ds.Tables["data"].Rows[0];
                            //string userOtp= dr["User_OTP"].ToString();
                            otp = mail.GenerateNumericOTP();
                            using (SqlCommand cmd1 = new SqlCommand(Common.app_Login_UpdateUserOTP, con))
                            {
                                cmd1.CommandType = CommandType.StoredProcedure;

                                cmd1.Parameters.AddWithValue("@User_Email", email);
                                cmd1.Parameters.AddWithValue("@User_OTP", otp);

                                int n = cmd1.ExecuteNonQuery();
                                if (n != 0)
                                {
                                    result = 0;
                                }
                            }
                            string header = mail.GetBaseUrl();
                            header = header.Replace("http", "https");
                            param = header + "/VerifyUSer/Index?PM1=" + EN_DE.Encrypt(email) + "&PM2=" + EN_DE.Encrypt(otp) + "&PM3=1";
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
                LoginResult = "0";
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(new { param });
        }
        public class user_Verification
        {
            public string User_verificationcode { get; set; }
            public string User_Password { get; set; }
            public string User_confirmPassword { get; set; }
            public string User_Email { get; set; }
        }
    }
}