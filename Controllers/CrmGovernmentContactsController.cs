using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.IO;
using System;
using System.Linq;


namespace FedPipelineApplication.Controllers
{
    public class CrmGovernmentContactsController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        public ActionResult Index()
        {
            return View();
        }

        public string AddGovernmentContact(ContactDetails contact)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
           
            string Error = "";

            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if(contact.government_contact_id != 0)
                    {
                        sp = "crm_government_contacts_update";
                    }
                    else
                    {
                        sp = "crm_government_contacts_insert";
                    }

                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@government_contact_id", contact.government_contact_id);
                        cmd.Parameters.AddWithValue("@name", contact.name);
                        cmd.Parameters.AddWithValue("@phone", contact.phone);
                        cmd.Parameters.AddWithValue("@address", contact.address);
                        cmd.Parameters.AddWithValue("@email_address", contact.email_address);
                        cmd.Parameters.AddWithValue("@city", contact.city);
                        cmd.Parameters.AddWithValue("@state", contact.state);
                        cmd.Parameters.AddWithValue("@zip_code", contact.zip_code);
                        cmd.Parameters.AddWithValue("@Notes", contact.notes);
                        cmd.Parameters.AddWithValue("@funding_agency_code", funding_agency_code);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_code", contact.funding_sub_agency_code);
                        cmd.Parameters.AddWithValue("@funding_office_code", contact.funding_office_code);
                        cmd.Parameters.AddWithValue("@user_id", UserID);

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
                response = "Error";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string GetGovernmentContactsList()
        {
            List<ContactDetails> contactList = new List<ContactDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = "crm_government_contacts_get_list";
               
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            ContactDetails contact = new ContactDetails();
                            contact.government_contact_id = Convert.ToInt32((dr2["government_contact_id"]));
                            contact.name = (dr2["name"].ToString());
                            contact.phone = (dr2["phone"].ToString());
                            contact.email_address = (dr2["email_address"].ToString());
                            contact.address = (dr2["address"].ToString());
                            contact.city = (dr2["city"].ToString());
                            contact.state = (dr2["state"].ToString());
                            contact.zip_code = (dr2["zip_code"].ToString());
                            contact.notes = (dr2["Notes"].ToString());
                            contact.funding_agency_code = (dr2["funding_agency_code"].ToString());
                            contact.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            contact.funding_office_code = (dr2["funding_office_code"].ToString());
                            contact.user_id = Convert.ToInt32((dr2["user_id"]));
                            contactList.Add(contact);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(contactList);

        }

        public string GetGovernmentContactById(int government_contact_id)
        {
            List<ContactDetails> contactList = new List<ContactDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                
                using (SqlCommand cmd = new SqlCommand("crm_government_contacts_get", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@government_contact_id", government_contact_id);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            ContactDetails contact = new ContactDetails();
                            contact.government_contact_id = Convert.ToInt32((dr2["government_contact_id"]));
                            contact.name = (dr2["name"].ToString());
                            contact.phone = (dr2["phone"].ToString());
                            contact.email_address = (dr2["email_address"].ToString());
                            contact.address = (dr2["address"].ToString());
                            contact.city = (dr2["city"].ToString());
                            contact.state = (dr2["state"].ToString());
                            contact.zip_code = (dr2["zip_code"].ToString());
                            contact.notes = (dr2["Notes"].ToString());
                            contact.funding_agency_code = (dr2["funding_agency_code"].ToString());
                            contact.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            contact.funding_office_code = (dr2["funding_office_code"].ToString());
                            contact.user_id = Convert.ToInt32((dr2["user_id"]));
                            contactList.Add(contact);
                        }
                    }
                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(contactList);

        }

        public string DeleteGovernmentContact(int government_contact_id)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;

            string Error = "";

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                  

                    using (SqlCommand cmd = new SqlCommand("crm_government_contacts_delete", con))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@government_contact_id", government_contact_id);
                        result = cmd.ExecuteNonQuery();
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
                response = "Error";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }


        public class ContactDetails
        {
            public int government_contact_id { get; set; }
            public string name { get; set; }
            public string phone { get; set; }
            public string email_address { get; set; }
            public string address { get; set; }
            public string city { get; set; }
            public string state { get; set; }
            public string zip_code { get; set; }
            public string notes { get; set; }
            public string funding_agency_code { get; set; }
            public string funding_sub_agency_code { get; set; }
            public string funding_office_code { get; set; }
            public int user_id { get; set; }


        }
    }
}