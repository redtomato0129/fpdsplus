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
    public class CrmPeopleController : Controller
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

        public string AddOrganization(OrganizationDetails organization)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
           
            string Error = "";

            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    if(organization.organization_id !=0)
                    {
                        sp = "crm_organization_update";
                    }
                    else
                    {
                        sp = "crm_organization_insert";
                    }

                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        if (organization.organization_id != 0)
                        {
                            cmd.Parameters.AddWithValue("@organization_id", organization.organization_id);

                        }

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@name", organization.name);
                        cmd.Parameters.AddWithValue("@phone", organization.phone);
                        cmd.Parameters.AddWithValue("@address", organization.address);
                        cmd.Parameters.AddWithValue("@email_address", organization.email_address);
                        cmd.Parameters.AddWithValue("@city", organization.city);
                        cmd.Parameters.AddWithValue("@state", organization.state);
                        cmd.Parameters.AddWithValue("@zip_code", organization.zip_code);
                        cmd.Parameters.AddWithValue("@Notes", organization.notes);
                       
                        if (organization.organization_id == 0)
                        {
                            cmd.Parameters.AddWithValue("@uei", organization.uei);
                            cmd.Parameters.AddWithValue("@CageCode", organization.cage_code);
                            cmd.Parameters.AddWithValue("@user_id", UserID);
                            cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                        }
                       

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

        public string AddPeople(List<PeopleDetails> people)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
          
            string Error = "";

           string UserID = Session["User_ID"].ToString();
            // string UserID = "37";
            try
            {
                foreach (PeopleDetails p in people)
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        if (p.people_id != 0)
                        {
                            sp = "crm_people_update";
                        }
                        else
                        {
                            sp = "crm_people_insert";
                        }
                        using (SqlCommand cmd = new SqlCommand(sp, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            if (p.people_id != 0)
                            {
                                cmd.Parameters.AddWithValue("@people_id", p.people_id);
                            }
                            cmd.Parameters.AddWithValue("@organization_id", p.organization_id);
                            cmd.Parameters.AddWithValue("@contact_name", p.contact_name);
                            cmd.Parameters.AddWithValue("@phone", p.phone);
                            cmd.Parameters.AddWithValue("@title", p.title);
                            cmd.Parameters.AddWithValue("@city", p.city);
                            cmd.Parameters.AddWithValue("@state", p.state);
                            cmd.Parameters.AddWithValue("@address", p.address);
                            cmd.Parameters.AddWithValue("@notes", p.notes);
                            cmd.Parameters.AddWithValue("@email_address", p.email_address);
                            cmd.Parameters.AddWithValue("@zip_code", p.zip_code);
                            cmd.Parameters.AddWithValue("@user_id", UserID);

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
             
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }


        public string GetPeopleByOrganizationId(int organizationId)
        {
            List<PeopleDetails> peopleList = new List<PeopleDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_people_getByorganization_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@organization_id", organizationId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            PeopleDetails peopleObject = new PeopleDetails();
                           
                   

                            peopleObject.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            peopleObject.contact_name = (dr2["contact_name"].ToString());
                            peopleObject.phone = (dr2["phone"].ToString());
                            peopleObject.title = (dr2["title"].ToString());
                            peopleObject.city = (dr2["city"].ToString());
                            peopleObject.state = (dr2["state"].ToString());
                            peopleObject.address = (dr2["address"].ToString());
                            peopleObject.email_address = (dr2["email_address"].ToString());
                            peopleObject.zip_code = (dr2["zip_code"].ToString());
                            peopleObject.notes = (dr2["notes"].ToString());
                            peopleObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            peopleObject.people_id = Convert.ToInt32((dr2["people_id"]));
                            
                            peopleList.Add(peopleObject);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(peopleList);

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


        public string GetPeopleBId(int peopleId)
        {
            List<PeopleDetails> peopleList = new List<PeopleDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_people_getByPeople_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@people_id", peopleId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            PeopleDetails peopleObject = new PeopleDetails();
                            peopleObject.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            peopleObject.contact_name = (dr2["contact_name"].ToString());
                            peopleObject.phone = (dr2["phone"].ToString());
                            peopleObject.title = (dr2["title"].ToString());
                            peopleObject.city = (dr2["city"].ToString());
                            peopleObject.state = (dr2["state"].ToString());
                            peopleObject.address = (dr2["address"].ToString());
                            peopleObject.email_address = (dr2["email_address"].ToString());
                            peopleObject.zip_code = (dr2["zip_code"].ToString());
                            peopleObject.notes = (dr2["notes"].ToString());
                            peopleObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            peopleObject.people_id = Convert.ToInt32((dr2["people_id"]));
                            peopleList.Add(peopleObject);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(peopleList);

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

        public string GetRelationshipList()
        {
            List<RelationshipDetails> relationshipList = new List<RelationshipDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_relationship_get", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            RelationshipDetails relationshipObject = new RelationshipDetails();
                            relationshipObject.relationship_id = Convert.ToInt32((dr2["relationship_id"]));
                            relationshipObject.description = (dr2["description"].ToString());
                           
                            relationshipList.Add(relationshipObject);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(relationshipList);

        }

        public string SearchPeople(string keyword)
        {
            List<PeopleDetails> peopleList = new List<PeopleDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp = "crm_people_search";

                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                   
                     cmd.Parameters.AddWithValue("@contact_name", keyword);


                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {                           
                            PeopleDetails peopleObject = new PeopleDetails();
                            peopleObject.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            peopleObject.contact_name = (dr2["contact_name"].ToString());
                            peopleObject.phone = (dr2["phone"].ToString());
                            peopleObject.title = (dr2["title"].ToString());
                            peopleObject.city = (dr2["city"].ToString());
                            peopleObject.state = (dr2["state"].ToString());
                            peopleObject.address = (dr2["address"].ToString());
                            peopleObject.email_address = (dr2["email_address"].ToString());
                            peopleObject.zip_code = (dr2["zip_code"].ToString());
                            peopleObject.notes = (dr2["notes"].ToString());
                            peopleObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            peopleObject.people_id = Convert.ToInt32((dr2["people_id"]));
                            peopleObject.organization_name = (dr2["name"].ToString());
                            peopleList.Add(peopleObject);

                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(peopleList);

        }

        public string AddDealPeopleOrganization(DealPeopleOrganizationDetails deal_people_organization)
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
                   
                        sp = "crm_deal_people_organization_insert";
                    

                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@deal_id", deal_people_organization.deal_id);
                        cmd.Parameters.AddWithValue("@people_id", deal_people_organization.people_id);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@relationship_id", deal_people_organization.relationship_id);
                        cmd.Parameters.AddWithValue("@organization_id", deal_people_organization.organization_id);
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

        public string GetDealPeopleOrganization(int dealId)
        {
            List<DealPeopleOrganizationDetails> dataList = new List<DealPeopleOrganizationDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp =  "crm_deal_people_organization_get" ;

                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                  
                       cmd.Parameters.AddWithValue("@deal_id", dealId);


                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            DealPeopleOrganizationDetails data = new DealPeopleOrganizationDetails();
                            data.organization_id = Convert.ToInt32((dr2["organization_id"]));
                            data.people_id = Convert.ToInt32((dr2["people_id"]));
                            data.deal_id = Convert.ToInt32((dr2["deal_id"]));
                            data.relationship_id = Convert.ToInt32((dr2["relationship_id"]));
                            data.organization_name = (dr2["organization_name"].ToString());
                            data.organization_phone = (dr2["organization_phone"].ToString());
                            data.organization_email = (dr2["organization_email"].ToString());
                            data.organization_address = (dr2["organization_address"].ToString());
                            data.organization_city = (dr2["organization_city"].ToString());
                            data.organization_state = (dr2["organization_state"].ToString());
                            data.organization_zip_code = (dr2["organization_zip_code"].ToString());
                            data.organization_notes = (dr2["organization_notes"].ToString());
                            data.user_id = Convert.ToInt32((dr2["user_id"]));
                            data.organization_uei = (dr2["organization_uei"].ToString());
                            data.organization_cage_code = (dr2["organization_cage_code"].ToString());
                            data.deal_title = (dr2["title"].ToString());
                            data.deal_status = (dr2["status"].ToString());
                            data.deal_rfp_release_date = (dr2["rfp_release_date"].ToString());
                            data.User_FirstName = (dr2["User_FirstName"].ToString());
                            data.User_LastName = (dr2["User_LastName"].ToString());
                            data.User_Company = (dr2["User_Company"].ToString());
                            data.User_Email = (dr2["User_Email"].ToString());
                            data.relation_description = (dr2["relation_description"].ToString());

                            data.people_contact_name = (dr2["people_contact_name"].ToString());
                            data.people_title = (dr2["people_title"].ToString());
                            data.people_phone = (dr2["people_phone"].ToString());
                            data.people_email = (dr2["people_email"].ToString());
                            data.people_address = (dr2["people_address"].ToString());
                            data.people_state = (dr2["people_state"].ToString());
                            data.people_city = (dr2["people_city"].ToString());
                            data.people_notes = (dr2["people_notes"].ToString());
                            data.people_zip_code = (dr2["people_zip_code"].ToString());
                            dataList.Add(data);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(dataList);

        }
        public class DealPeopleOrganizationDetails
        {
            public int deal_id { get; set; }
            public int people_id { get; set; }
            public int user_id { get; set; }
            public int relationship_id { get; set; }
            public int organization_id { get; set; }
            public string deal_title { get; set; }
            public string deal_status { get; set; }
            public string deal_rfp_release_date { get; set; }
            public string relation_description { get; set; }

            public string User_FirstName { get; set; }
            public string User_LastName { get; set; }
            public string User_Company { get; set; }
            public string User_Email { get; set; }

            public string organization_name { get; set; }
            public string organization_phone { get; set; }
            public string organization_email { get; set; }
            public string organization_address { get; set; }
            public string organization_city { get; set; }
            public string organization_state { get; set; }
            public string organization_zip_code { get; set; }

            public string organization_notes { get; set; }
            public string organization_uei { get; set; }
            public string organization_cage_code { get; set; }

            public string people_contact_name { get; set; }
            public string people_title { get; set; }
            public string people_phone { get; set; }
            public string people_email { get; set; }
            public string people_address { get; set; }
            public string people_city { get; set; }

            public string people_state { get; set; }

            public string people_zip_code { get; set; }
            public string people_notes { get; set; }
        }

        public class RelationshipDetails 
        {
            public int relationship_id { get; set; }
            public string description { get; set; }
        }
        public class OrganizationDetails
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
            public string uei { get; set; }
            public string cage_code { get; set; }
            public int user_id { get; set; }


        }
        public class PeopleDetails
        {
            public int organization_id { get; set; }
            public int people_id { get; set; }
            public string contact_name { get; set; }
            public string organization_name { get; set; }
            public string title { get; set; }
            public string email_address { get; set; }
            public string phone { get; set; }
            public string address { get; set; }
            public string city { get; set; }
            public string state { get; set; }
            public string zip_code { get; set; }
            public string notes { get; set; }
            public int user_id { get; set; }
        }
    }
}