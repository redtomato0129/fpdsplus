using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    public class UserController : Controller
    {
        Utility obj = new Utility();
        EncryptDecrypt EN_DE = new EncryptDecrypt();

        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public string CheckUser()
        {
            string user = (string)Session["User_Id"];

            List<userdata_Details> userdata = new List<userdata_Details>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_CheckUserdata, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", user);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                userdata_Details data = new userdata_Details();
                                data.User_FirstName = dr2["User_FirstName"].ToString();
                                data.User_LastName = dr2["User_LastName"].ToString();
                                data.User_Email = Convert.ToInt32(dr2["Trial_User"]) ==1 ? dr2["Public_Email"].ToString():
                                    dr2["User_Email"].ToString();
                                data.User_PhoneNo = dr2["User_PhoneNo"].ToString();
                                data.User_Company = dr2["User_Company"].ToString();
                                data.User_Address = dr2["User_Address"].ToString();
                                data.User_City = dr2["User_City"].ToString();
                                data.User_State = dr2["User_State"].ToString();
                                data.User_Pincode = dr2["User_Pincode"].ToString();
                                data.CreatedDate = dr2["CreatedDate"].ToString();
                                userdata.Add(data);
                            }
                        }
                        else
                        {
                        }

                    }
                }
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
            }
            return new JavaScriptSerializer().Serialize(userdata);
        }

        public string SaveUserProfile(userdata_Details data)
        {
            string user = (string)Session["User_Id"];
            int result = 0;
            List<userdata_Details> userdata = new List<userdata_Details>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Profile_SaveUserdata, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", user);
                        cmd.Parameters.AddWithValue("@User_FirstName", data.User_FirstName);
                        cmd.Parameters.AddWithValue("@User_LastName", data.User_LastName);
                        cmd.Parameters.AddWithValue("@User_Email", data.User_Email);
                        cmd.Parameters.AddWithValue("@User_PhoneNo", data.User_PhoneNo);
                        cmd.Parameters.AddWithValue("@User_Company", data.User_Company);
                        cmd.Parameters.AddWithValue("@User_Address", data.User_Address);
                        cmd.Parameters.AddWithValue("@User_City", data.User_City);
                        cmd.Parameters.AddWithValue("@User_State", data.User_State);
                        cmd.Parameters.AddWithValue("@User_Pincode", data.User_Pincode);

                        int n = obj.updateExecuteNonQuery_SP(cmd);
                        result = n;
                        Session["User_Email"] = data.User_Email;
                    }
                }
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
            }
            return new JavaScriptSerializer().Serialize(result);
        }

        public string checkpassword(string oldpassword, string newpassword)
        {

            string Old_password = EN_DE.Encrypt(oldpassword);
            string New_Password = EN_DE.Encrypt(newpassword);

            string user = (string)Session["User_Id"];
            int result = 0;

            List<userdata_Details> userdata = new List<userdata_Details>();
            con.Open();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_CheckPassword, con))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", user);
                        cmd.Parameters.AddWithValue("@User_OldPassword", Old_password);
                        cmd.Parameters.AddWithValue("@User_NewPassword", New_Password);
                        int n = cmd.ExecuteNonQuery();
                        result = n;
                    }

                }
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(result);
        }

        public class userdata_Details
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
            public string CreatedDate { get; set; }

        }
    }
}