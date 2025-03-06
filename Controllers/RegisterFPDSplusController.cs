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
    public class RegisterFPDSplusController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        public string GetContact(ContactPayload contact)
        {
            var error = string.Empty;
            var response = string.Empty;
            int result = 0;
            List< ContactList> contactList= new List<ContactList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    var sp = "pmo_organization_contact_fpds_get";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@User_Email", contact.contact_email);
                    DataSet ds = obj.getDataSet_SP(cmd1);
                    if (ds.Tables["data"].Rows.Count == 0)
                    {
                        var OTP = mail.GenerateNumericOTP();
                        using (SqlCommand cmd = new SqlCommand("pmo_organization_contact_fpds_insert", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@contact_name", contact.contact_name);
                            cmd.Parameters.AddWithValue("@contact_phone_number", contact.contact_phone);
                            cmd.Parameters.AddWithValue("@contact_email", contact.contact_email);
                            cmd.Parameters.AddWithValue("@contact_otp", OTP);
                            result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                            {
                                response = "fail";
                            }
                        }
                    }
                    else
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            ContactList contactObject = new ContactList();
                            contactObject.User_Id= Convert.ToInt32(dr2["User_Id"]);
                            contactList.Add(contactObject);
                        }
                        using (SqlCommand cmd = new SqlCommand("pmo_organization_contact_fpds_update", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@user_id", contactList[0].User_Id);
                            cmd.Parameters.AddWithValue("@contact_name", contact.contact_name);
                            cmd.Parameters.AddWithValue("@contact_phone_number", contact.contact_phone);
                            cmd.Parameters.AddWithValue("@contact_email", contact.contact_email);
                            result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                                response = "fail";

                        }
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
                response = "fail";
            }
            return new JavaScriptSerializer().Serialize(new { response = response });
        }

        //public string AddContact(ContactPayload contact)
        //{
        //    int result = 0;
        //    var sp = string.Empty;
        //    var error = string.Empty;
        //    var response = string.Empty;

        //    string Error = "";

        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(MainCon))
        //        {
        //            con.Open();
                    
        //            sp = "pmo_organization_contact_fpds_insert";

        //            using (SqlCommand cmd = new SqlCommand(sp, con))
        //            {
        //                cmd.CommandType = CommandType.StoredProcedure;
        //                cmd.Parameters.AddWithValue("@organization_id", contact.organization_id);
        //                cmd.Parameters.AddWithValue("@contact_name", contact.contact_name);
        //                cmd.Parameters.AddWithValue("@contact_phone_number", contact.contact_phone);
        //                cmd.Parameters.AddWithValue("@contact_email", contact.contact_email);
        //                result = obj.insertExecuteNonQuery_SP(cmd);
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

        //public string UpdateContact(ContactPayload contact)
        //{
        //    int result = 0;
        //    var sp = string.Empty;
        //    var error = string.Empty;
        //    var response = string.Empty;

        //    string Error = "";

        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(MainCon))
        //        {
        //            con.Open();

        //            sp = "pmo_organization_contact_fpds_update";

        //            using (SqlCommand cmd = new SqlCommand(sp, con))
        //            {
        //                cmd.CommandType = CommandType.StoredProcedure;
        //                cmd.Parameters.AddWithValue("@user_id", contact.contact_id);
        //                cmd.Parameters.AddWithValue("@contact_name", contact.contact_name);
        //                cmd.Parameters.AddWithValue("@contact_phone_number", contact.contact_phone);
        //                cmd.Parameters.AddWithValue("@contact_email", contact.contact_email);
        //                result = obj.insertExecuteNonQuery_SP(cmd);
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

        public class ContactPayload
        {
            public string contact_name { get; set; }
            public string contact_email { get; set; }
            public string contact_phone { get; set; }
            public int active { get; set; }
        }

        public class ContactDetails
        {
            public int User_Id { get; set; }
            public int User_OTP { get; set; }
            public int Login_OTP { get; set; }
            public string User_FirstName { get; set; }
            public string User_Email { get; set; }
            public string User_PhoneNo { get; set; }
        }

        public class ContactList
        {
            public int User_Id { get; set; }
            public int User_OTP { get; set; }
            public int Login_OTP { get; set; }
            public string User_FirstName { get; set; }
            public string User_LastName { get; set; }
            public string User_Email { get; set; }
            public string User_Password { get; set; }
            public string User_Company { get; set; }
            public string User_Address { get; set; }
            public string User_City { get; set; }
            public string User_State { get; set; }
            public string User_Pincode { get; set; }
            public string CreatedDate { get; set; }
            public string Active { get; set; }
            public string ActivePlan { get; set; }
            public string Paid { get; set; }
            public string User_PhoneNo { get; set; }
            public string Type { get; set; }
            public string VerifyLinkExpiration { get; set; }
        }


    }
    
}