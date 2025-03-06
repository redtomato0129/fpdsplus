using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static FedPipelineApplication.Controllers.CrmActivitiesController;
using System.Linq;
using static FedPipelineApplication.Controllers.CrmDealsController;
using static FedPipelineApplication.Controllers.CrmPeopleController;

namespace FedPipelineApplication.Controllers
{
    public class CrmDashboardController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: News
        public ActionResult Index()
        {
            return View();
        }


        public string DealsList(int count)
        {
            string result = "";
            var error = string.Empty;
            var response = string.Empty;
            string UserDomain = Session["User_Domain"].ToString();
            List<DealsDetails> deallist = new List<DealsDetails>();
            try
            {

                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "crm_deal_recent";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@count", count);
                    cmd1.Parameters.AddWithValue("@user_domain", UserDomain);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        DealsDetails GetAll = new DealsDetails();
                        GetAll.Deal_ID = Convert.ToInt32(rdr["deal_id"]);
                        GetAll.created_datetime = rdr["created_datetime"].ToString();
                        GetAll.Deal_Title = rdr["title"].ToString();
                        GetAll.Deal_SolicitationNumber = rdr["solicitation_number"].ToString();
                        GetAll.Deal_SamGov_Link = rdr["sam_gov_link"].ToString();
                        GetAll.Description = rdr["description"].ToString();
                        GetAll.Deal_RFP_Release_Date = rdr["rfp_release_date"].ToString();
                        GetAll.Deal_Status = rdr["status"].ToString();
                        GetAll.Deal_Stage = rdr["stage"].ToString();
                        GetAll.Deal_Funding_Agency_code = rdr["funding_agency_code"].ToString();
                        GetAll.Deal_Funding_Agency_Name = rdr["funding_agency_name"].ToString();
                        GetAll.Deal_funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                        GetAll.Deal_funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                        GetAll.Deal_Awarding_Agency_code = rdr["awarding_agency_code"].ToString();
                        GetAll.Deal_Awarding_Agency_name = rdr["awarding_agency_name"].ToString();
                        GetAll.Deal_Award_Type = rdr["award_type"].ToString();
                        GetAll.Deal_Set_Aside = rdr["set_aside"].ToString();
                        GetAll.Deal_Set_Aside_Description = rdr["set_aside_description"].ToString();
                        GetAll.Deal_naics_description = rdr["naics_description"].ToString();
                        GetAll.Deal_PSC_code = rdr["psc_code"].ToString();
                        GetAll.Deal_PSC_Description = rdr["psc_description"].ToString();
                        GetAll.Deal_naics_code = rdr["naics_code"].ToString();
                        GetAll.Deal_Incumbent_Name = rdr["incumbent_name"].ToString();
                        GetAll.Deal_Incumbent_UEI = rdr["incumbent_uei"].ToString();
                        GetAll.Deal_Potential_Award_Amount = rdr["potential_award_amount"].ToString();
                        GetAll.Deal_Expiration_Date = rdr["expiration_date"].ToString();
                        GetAll.Deal_Govwin_ID = Convert.ToInt32(rdr["govwin_id"]);
                        GetAll.Deal_govwin_link = rdr["govwin_link"].ToString();
                        GetAll.Deal_Priority = rdr["priority"].ToString();
                        GetAll.user_id = Convert.ToInt32(rdr["user_id"]);
                        GetAll.user_domain = rdr["user_domain"].ToString();
                        deallist.Add(GetAll);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = deallist });
        }
        public string RecentActivitiesList(int count)
        {
            string result = "";
            var error = string.Empty;
            var response = string.Empty;
            List<ActivitiesDetails> activitylist = new List<ActivitiesDetails>();
            try
            {
                string UserID = Session["User_ID"].ToString();
                string UserDomain = Session["User_Domain"].ToString();
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "crm_activity_most_recent_getAllUnion_byUserID";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@user_id", UserID);
                    cmd1.Parameters.AddWithValue("@user_domain", UserDomain);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        ActivitiesDetails GetAll = new ActivitiesDetails();
                        GetAll.Activity_ID = Convert.ToInt32(rdr["id"]);
                        GetAll.Activity_name = rdr["Activity"].ToString();
                        GetAll.Description = rdr["description"].ToString();
                        GetAll.Type = rdr["Type"].ToString();
                        GetAll.created_datetime = rdr["created_date"].ToString();
                        //GetAll.created_datetime = rdr["created_datetime"].ToString();
                        GetAll.Deal_ID = Convert.ToInt32(rdr["deal_id"]);
                        GetAll.User_ID = Convert.ToInt32(rdr["user_id"]);
                        GetAll.title = rdr["title"].ToString();
                        GetAll.mode = rdr["mode"].ToString();
                        activitylist.Add(GetAll);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            var pageSize = 5;
            var paginatedResult = activitylist.Skip((1 - 1) * pageSize).Take(pageSize).ToList();
            var pagesCount = Math.Ceiling((double)activitylist.Count / pageSize);
            return new JavaScriptSerializer().Serialize(new { records = paginatedResult });
        }

        public string GetRecentOrganizationList(int count)
        {
            List<OrganizationDetails> organizationList = new List<OrganizationDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                var sp =  "crm_organization_get_most_recent";
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@record_count", count);
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
            return new JavaScriptSerializer().Serialize(new { records = organizationList });

        }
    }
}