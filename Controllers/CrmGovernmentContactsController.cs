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
        // GET: CrmPeople
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

        public string GetOrganizationList(int pageNo, string keyword, int pageSize)
        {
            List<OrganizationDetails> organizationList = new List<OrganizationDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = string.IsNullOrEmpty(keyword) ? "crm_organization_get" : "crm_organization_search";
               
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (!string.IsNullOrEmpty(keyword))
                    {
                        cmd.Parameters.AddWithValue("@organization_name", keyword);
                       
                    }
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            OrganizationDetails organization = new OrganizationDetails();
                            organization.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            organization.name = (dr2["name"].ToString());
                            organization.phone = (dr2["phone"].ToString());
                            organization.email_address = (dr2["email_address"].ToString());
                            organization.address = (dr2["address"].ToString());
                            organization.city = (dr2["city"].ToString());
                            organization.state = (dr2["state"].ToString());
                            organization.zip_code = (dr2["zip_code"].ToString());
                            organization.notes = (dr2["Notes"].ToString());
                            organization.user_id = Convert.ToInt32((dr2["user_id"]));
                            organization.uei = (dr2["UEI"].ToString());
                            organization.cage_code = (dr2["CageCode"].ToString());

                            organizationList.Add(organization);
                        }
                    }

                }

                con.Close();
            }
           // var pageSize = 15;
            var paginatedResult = organizationList.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            var pagesCount = Math.Ceiling((double)organizationList.Count / pageSize);
            return new JavaScriptSerializer().Serialize(new { records = paginatedResult, pagesCount });

        }

        public string GetOrganizationListAll()
        {
            List<OrganizationDetails> organizationList = new List<OrganizationDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = "crm_organization_get";

                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                   
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            OrganizationDetails organization = new OrganizationDetails();
                            organization.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            organization.name = (dr2["name"].ToString());
                            organization.phone = (dr2["phone"].ToString());
                            organization.email_address = (dr2["email_address"].ToString());
                            organization.address = (dr2["address"].ToString());
                            organization.city = (dr2["city"].ToString());
                            organization.state = (dr2["state"].ToString());
                            organization.zip_code = (dr2["zip_code"].ToString());
                            organization.notes = (dr2["Notes"].ToString());
                            organization.user_id = Convert.ToInt32((dr2["user_id"]));
                            organization.uei = (dr2["UEI"].ToString());
                            organization.cage_code = (dr2["CageCode"].ToString());

                            organizationList.Add(organization);
                        }
                    }

                }

                con.Close();
            }
            // var pageSize = 15;
           
            return new JavaScriptSerializer().Serialize(new { records = organizationList });

        }

        public string GetOrganizationById(int organizationId)
        {
            List<OrganizationDetails> organizationList = new List<OrganizationDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                

                using (SqlCommand cmd = new SqlCommand("crm_organization_getByOrganization_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                   
                     cmd.Parameters.AddWithValue("@organization_id", organizationId);
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            OrganizationDetails organization = new OrganizationDetails();
                            organization.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            organization.name = (dr2["name"].ToString());
                            organization.phone = (dr2["phone"].ToString());
                            organization.email_address = (dr2["email_address"].ToString());
                            organization.address = (dr2["address"].ToString());
                            organization.city = (dr2["city"].ToString());
                            organization.state = (dr2["state"].ToString());
                            organization.zip_code = (dr2["zip_code"].ToString());
                            organization.notes = (dr2["Notes"].ToString());
                            organization.user_id = Convert.ToInt32((dr2["user_id"]));
                            organization.uei = (dr2["UEI"].ToString());
                            organization.cage_code = (dr2["CageCode"].ToString());

                            organizationList.Add(organization);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(organizationList);

        }

        public string DeleteOrganization(int organizationId)
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
                  

                    using (SqlCommand cmd = new SqlCommand("crm_organization_delete", con))
                    {

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@organization_id", organizationId);
                        result = cmd.ExecuteNonQuery();
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


        public class ContactDetails
        {
            public int organization_id { get; set; }
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