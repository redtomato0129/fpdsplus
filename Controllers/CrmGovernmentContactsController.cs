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
using static FedPipelineApplication.Controllers.CrmPeopleController;


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

        public string GetGovernmentContactsList(int active)
        {
            List<ContactDetails> contactList = new List<ContactDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = "crm_government_contacts_get_list";
               
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@active", active);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            ContactDetails contact = new ContactDetails();
                            contact.government_contact_id = Convert.ToInt32((dr2["government_contact_id"]));
                            contact.name = (dr2["name"].ToString());
                            contact.phone = (dr2["phone"].ToString());
                            contact.title = (dr2["title"].ToString());
                            contact.email_address = (dr2["email"].ToString());
                            contact.address = (dr2["address"].ToString());
                            contact.city = (dr2["city"].ToString());
                            contact.state = (dr2["state"].ToString());
                            contact.zip_code = (dr2["zip_code"].ToString());
                            contact.notes = (dr2["Notes"].ToString());
                            contact.funding_agency_code = (dr2["funding_agency_code"].ToString());
                            contact.funding_agency_name = (dr2["funding_agency_name"].ToString());
                            contact.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            contact.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                            contact.funding_office_code = (dr2["funding_office_code"].ToString());
                            contact.funding_office_name = (dr2["funding_office_name"].ToString());
                            contact.user_id = Convert.ToInt32((dr2["user_id"]));
                            contact.active = Convert.ToInt32((dr2["active"]));
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
                            contact.funding_agency_name = (dr2["funding_agency_name"].ToString());
                            contact.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            contact.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                            contact.funding_office_code = (dr2["funding_office_code"].ToString());
                            contact.funding_office_name = (dr2["funding_office_name"].ToString());
                            contact.user_id = Convert.ToInt32((dr2["user_id"]));
                            contact.active = Convert.ToInt32((dr2["active"]));
                            contactList.Add(contact);
                        }
                    }
                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(contactList);

        }

        public string AddGovernmentContact(ContactDetails contact)
        {
            var sp = string.Empty;
            int result = 0;
            var error = string.Empty;
            var response = string.Empty;

            string Error = "";

            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if (contact.government_contact_id != 0)
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
                        if (contact.government_contact_id != 0)
                        {
                            cmd.Parameters.AddWithValue("@government_contact_id", contact.government_contact_id);
                        }
                        
                        cmd.Parameters.AddWithValue("@name", contact.name);
                        cmd.Parameters.AddWithValue("@phone", contact.phone);
                        cmd.Parameters.AddWithValue("@title", contact.title);
                        cmd.Parameters.AddWithValue("@address", contact.address);
                        cmd.Parameters.AddWithValue("@email", contact.email_address);
                        cmd.Parameters.AddWithValue("@city", contact.city);
                        cmd.Parameters.AddWithValue("@state", contact.state);
                        cmd.Parameters.AddWithValue("@zip_code", contact.zip_code);
                        cmd.Parameters.AddWithValue("@Notes", contact.notes);
                        cmd.Parameters.AddWithValue("@funding_agency_code", contact.funding_agency_code);
                        cmd.Parameters.AddWithValue("@funding_agency_name", contact.funding_agency_name);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_code", contact.funding_sub_agency_code);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_name", contact.funding_sub_agency_name);
                        cmd.Parameters.AddWithValue("@funding_office_code", contact.funding_office_code);
                        cmd.Parameters.AddWithValue("@funding_office_name", contact.funding_office_name);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@active", contact.active);

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

        public string GetDealGovernmentContactList(int deal_id)
        {
            List<DealContactDetails> contactList = new List<DealContactDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = "crm_deal_govt_contact_get_all";

                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", deal_id);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            DealContactDetails contact = new DealContactDetails();
                            contact.deal_id = Convert.ToInt32((dr2["deal_id"]));
                            contact.govt_contact_id = Convert.ToInt32((dr2["govt_contact_id"]));
                            contact.user_id = Convert.ToInt32((dr2["user_id"]));
                            contact.deal_title = (dr2["deal_title"].ToString());
                            contact.deal_status = (dr2["deal_status"].ToString());
                            contact.deal_rfp_release_date = (dr2["deal_rfp_release_date"].ToString());
                            contact.User_FirstName = (dr2["User_FirstName"].ToString());
                            contact.User_LastName = (dr2["User_LastName"].ToString());
                            contact.User_Company = (dr2["User_Company"].ToString());
                            contact.User_Email = (dr2["User_Email"].ToString());
                            contact.govt_contact_name = (dr2["govt_contact_name"].ToString());
                            contact.govt_contact_title = (dr2["govt_contact_title"].ToString());
                            contact.govt_contact_phone = (dr2["govt_contact_phone"].ToString());
                            contact.govt_contact_email = (dr2["govt_contact_email"].ToString());
                            contact.govt_contact_address = (dr2["govt_contact_address"].ToString());
                            contact.govt_contact_state = (dr2["govt_contact_state"].ToString());
                            contact.govt_contact_city = (dr2["govt_contact_city"].ToString());
                            contact.govt_contact_notes = (dr2["govt_contact_notes"].ToString());
                            contact.govt_contact_zip_code = (dr2["govt_contact_zip_code"].ToString());
                            contact.funding_agency_code = (dr2["funding_agency_code"].ToString());
                            contact.funding_agency_name = (dr2["funding_agency_name"].ToString());
                            contact.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            contact.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                            contact.funding_office_code = (dr2["funding_office_code"].ToString());
                            contact.funding_office_name = (dr2["funding_office_name"].ToString());
                            contact.government_contact_id = Convert.ToInt32((dr2["government_contact_id"]));
                            contact.active = Convert.ToInt32((dr2["active"]));
                            contactList.Add(contact);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(contactList);

        }

        public string GetDealGovernmentContact(int deal_id, int govt_contact_id)
        {
            List<DealContactDetails> contactList = new List<DealContactDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = "crm_deal_govt_contact_get";

                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", deal_id);
                    cmd.Parameters.AddWithValue("@govt_contact_id", govt_contact_id);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            DealContactDetails contact = new DealContactDetails();
                            contact.deal_id = Convert.ToInt32((dr2["deal_id"]));
                            contact.govt_contact_id = Convert.ToInt32((dr2["govt_contact_id"]));
                            contact.user_id = Convert.ToInt32((dr2["user_id"]));
                            contact.deal_title = (dr2["deal_title"].ToString());
                            contact.deal_status = (dr2["deal_status"].ToString());
                            contact.deal_rfp_release_date = (dr2["deal_rfp_release_date"].ToString());
                            contact.User_FirstName = (dr2["User_FirstName"].ToString());
                            contact.User_LastName = (dr2["User_LastName"].ToString());
                            contact.User_Company = (dr2["User_Company"].ToString());
                            contact.User_Email = (dr2["User_Email"].ToString());
                            contact.govt_contact_name = (dr2["govt_contact_name"].ToString());
                            contact.govt_contact_title = (dr2["govt_contact_title"].ToString());
                            contact.govt_contact_phone = (dr2["govt_contact_phone"].ToString());
                            contact.govt_contact_email = (dr2["govt_contact_email"].ToString());
                            contact.govt_contact_address = (dr2["govt_contact_address"].ToString());
                            contact.govt_contact_state = (dr2["govt_contact_state"].ToString());
                            contact.govt_contact_city = (dr2["govt_contact_city"].ToString());
                            contact.govt_contact_notes = (dr2["govt_contact_notes"].ToString());
                            contact.govt_contact_zip_code = (dr2["govt_contact_zip_code"].ToString());
                            contact.funding_agency_code = (dr2["funding_agency_code"].ToString());
                            contact.funding_agency_name = (dr2["funding_agency_name"].ToString());
                            contact.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            contact.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                            contact.funding_office_code = (dr2["funding_office_code"].ToString());
                            contact.funding_office_name = (dr2["funding_office_name"].ToString());
                            contact.government_contact_id = Convert.ToInt32((dr2["government_contact_id"]));
                            contact.active = Convert.ToInt32((dr2["active"]));
                            contactList.Add(contact);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(contactList);

        }

        public string AddDealGovernmentContact(DealContactDetails contact)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;

            string UserID = Session["User_ID"].ToString();

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    sp = "crm_deal_govt_contact_insert";


                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@deal_id", contact.deal_id);
                        cmd.Parameters.AddWithValue("@govt_contact_id", contact.govt_contact_id);
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
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }


        public class ContactDetails
        {
            public int government_contact_id { get; set; }
            public string name { get; set; }
            public string title { get; set; }
            public string phone { get; set; }
            public string email_address { get; set; }
            public string address { get; set; }
            public string city { get; set; }
            public string state { get; set; }
            public string zip_code { get; set; }
            public string notes { get; set; }
            public string funding_agency_code { get; set; }
            public string funding_agency_name { get; set; }
            public string funding_sub_agency_code { get; set; }
            public string funding_sub_agency_name { get; set; }
            public string funding_office_code { get; set; }
            public string funding_office_name { get; set; }
            public int user_id { get; set; }
            public int active { get; set; }


        }

        public class DealContactDetails
        {
            public int deal_id { get; set; }
            public int govt_contact_id { get; set; }
            public int user_id { get; set; }
            public string deal_title { get; set; }
            public string deal_rfp_release_date { get; set; }
            public string deal_status { get; set; }
            public string User_FirstName { get; set; }
            public string User_LastName { get; set; }
            public string User_Company { get; set; }
            public string User_Email { get; set; }
            public string govt_contact_name { get; set; }
            public string govt_contact_title { get; set; }
            public string govt_contact_phone { get; set; }
            public string govt_contact_email { get; set; }
            public string govt_contact_address { get; set; }
            public string govt_contact_city { get; set; }
            public string govt_contact_state { get; set; }
            public string govt_contact_zip_code { get; set; }
            public string govt_contact_notes { get; set; }
            public string funding_agency_code { get; set; }
            public string funding_agency_name { get; set; }
            public string funding_sub_agency_code { get; set; }
            public string funding_sub_agency_name { get; set; }
            public string funding_office_code { get; set; }
            public string funding_office_name { get; set; }
            public int active { get; set; }
            public int government_contact_id { get; set; }


        }
    }
}