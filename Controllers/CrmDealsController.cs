using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Linq;

namespace FedPipelineApplication.Controllers
{
    public class CrmDealsController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: CrmDeals
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddDeal()
        {
            return View();
        }

        public string DealsAdd(DealsDetails Deal)
        {
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;

            if (Deal.Deal_ID == 0)
            {
                sp = Common.crm_deal_insert;
            }
            else
            {
                sp = Common.crm_deal_update;
            }
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {

                    using (SqlCommand cmd1 = new SqlCommand(sp, con))
                    {
                        con.Open();
                        cmd1.CommandType = CommandType.StoredProcedure;
                        var dateAndTime = DateTime.Now;
                        Deal.created_datetime = dateAndTime.ToString();

                        if (Deal.Deal_ID != 0)
                        {
                            cmd1.Parameters.AddWithValue("@deal_id", Deal.Deal_ID);

                        }
                        else
                        {
                            cmd1.Parameters.AddWithValue("@created_datetime", Deal.created_datetime);
                        }
                        cmd1.Parameters.AddWithValue("@title", Deal.Deal_Title);
                        cmd1.Parameters.AddWithValue("@solicitation_number", Deal.Deal_SolicitationNumber);
                        cmd1.Parameters.AddWithValue("@sam_gov_link", Deal.Deal_SamGov_Link);
                        cmd1.Parameters.AddWithValue("@description", Deal.Description);
                        cmd1.Parameters.Add(new SqlParameter("@rfp_release_date", Deal.Deal_RFP_Release_Date));
                        cmd1.Parameters.AddWithValue("@status", Deal.Deal_Status);
                        cmd1.Parameters.AddWithValue("@stage", Deal.Deal_Stage);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", Deal.Deal_Funding_Agency_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_name", Deal.Deal_Funding_Agency_Name);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", Deal.Deal_funding_sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_name", Deal.Deal_funding_sub_agency_name);
                        cmd1.Parameters.AddWithValue("@awarding_agency_code", Deal.Deal_Awarding_Agency_code);
                        cmd1.Parameters.AddWithValue("@awarding_agency_name", Deal.Deal_Awarding_Agency_name);
                        cmd1.Parameters.AddWithValue("@award_type", Deal.Deal_Award_Type);
                        cmd1.Parameters.AddWithValue("@set_aside", Deal.Deal_Set_Aside);
                        cmd1.Parameters.AddWithValue("@set_aside_description", Deal.Deal_Set_Aside_Description);
                        cmd1.Parameters.AddWithValue("@naics_code", Deal.Deal_naics_code);
                        cmd1.Parameters.AddWithValue("@naics_description", Deal.Deal_naics_description);
                        cmd1.Parameters.AddWithValue("@psc_code", Deal.Deal_PSC_code);
                        cmd1.Parameters.AddWithValue("@psc_description", Deal.Deal_PSC_Description);
                        cmd1.Parameters.AddWithValue("@incumbent_name", Deal.Deal_Incumbent_Name);
                        cmd1.Parameters.AddWithValue("@incumbent_uei", Deal.Deal_Incumbent_UEI);
                        cmd1.Parameters.AddWithValue("@potential_award_amount", Deal.Deal_Potential_Award_Amount);
                        cmd1.Parameters.Add(new SqlParameter("@expiration_date", Deal.Deal_Expiration_Date));
                        cmd1.Parameters.AddWithValue("@govwin_id", Deal.Deal_Govwin_ID);
                        cmd1.Parameters.AddWithValue("@govwin_link", Deal.Deal_govwin_link);
                        cmd1.Parameters.AddWithValue("@priority", Deal.Deal_Priority);
                        cmd1.Parameters.AddWithValue("@user_id", Deal.user_id);
                        cmd1.Parameters.AddWithValue("@user_domain", Deal.user_domain);
                        cmd1.Parameters.AddWithValue("@multi_single_award", Deal.multi_single_award);
                        cmd1.Parameters.AddWithValue("@deal_type", Deal.deal_type);
                        //cmd1.Parameters.AddWithValue("@organization_id", Deal.organization_id.HasValue ?DBNull.Value :
                        //    Deal.organization_id);
                        cmd1.Parameters.Add(new SqlParameter("@organization_id", Deal.organization_id));

                        var result = obj.insertExecuteNonQuery_SP(cmd1);
                        if (result > 0 && Deal.Deal_ID != 0)
                        {
                            response = "Updated";

                        }
                        else if (result > 0) {
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

        public string DealsList(int pageNo, string keyword, string dealType)
        {
            string result = "";
            var error = string.Empty;
            var response = string.Empty;
            List<DealsDetails> deallist = new List<DealsDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            try
            {

                using (SqlConnection con = new SqlConnection(MainCon))
                {

                    var sp = string.IsNullOrEmpty(keyword) ? "crm_deal_getallbycategory" : "crm_deal_search_allbycategory";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    if (!string.IsNullOrEmpty(keyword))
                    {
                        cmd1.Parameters.AddWithValue("@search_text", keyword);
                    }
                    cmd1.Parameters.AddWithValue("@user_domain", UserDomain);
                    cmd1.Parameters.AddWithValue("@deal_type", dealType);
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
                        GetAll.multi_single_award = rdr["multi_single_award"].ToString();
                        GetAll.deal_type = rdr["deal_type"].ToString();
                        GetAll.organization_id = rdr["organization_id"].ToString();
                        GetAll.organization_name = rdr["organization_name"].ToString();

                        deallist.Add(GetAll);
                    }
                }


            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            var pageSize = 15;
            var paginatedResult = deallist.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            var pagesCount = Math.Ceiling((double)deallist.Count / pageSize);
            return new JavaScriptSerializer().Serialize(new { records = paginatedResult, pagesCount });
        }

        public string DealsListTitle(int pageNo, string keyword)
        {
            string result = "";
            var error = string.Empty;
            var response = string.Empty;
            List<DealsDetails> deallist = new List<DealsDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            try
            {

                using (SqlConnection con = new SqlConnection(MainCon))
                {

                    var sp =  "crm_deal_search_all_title";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@search_text", keyword);
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
                        GetAll.multi_single_award = rdr["multi_single_award"].ToString();
                        GetAll.deal_type = rdr["deal_type"].ToString();
                        GetAll.organization_id = rdr["organization_id"].ToString();

                        deallist.Add(GetAll);
                    }
                }


            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            var pageSize = 15;
            var paginatedResult = deallist.Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();
            var pagesCount = Math.Ceiling((double)deallist.Count / pageSize);
            return new JavaScriptSerializer().Serialize(new { records = paginatedResult, pagesCount });
        }
        public string DealsById(int dealId)
        {
            var deal = new DealsDetails();
            string UserDomain = Session["User_Domain"].ToString();
            try
            {

                using (SqlConnection con = new SqlConnection(MainCon))
                {


                    SqlCommand cmd1 = new SqlCommand("crm_deal_search", con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@deal_id", dealId);
                    cmd1.Parameters.AddWithValue("@user_domain", UserDomain);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    if (rdr.Read())
                    {

                        deal.Deal_ID = Convert.ToInt32(rdr["deal_id"]);
                        deal.created_datetime = rdr["created_datetime"].ToString();
                        deal.Deal_Title = rdr["title"].ToString();
                        deal.Deal_SolicitationNumber = rdr["solicitation_number"].ToString();
                        deal.Deal_SamGov_Link = rdr["sam_gov_link"].ToString();
                        deal.Description = rdr["description"].ToString();
                        deal.Deal_RFP_Release_Date = rdr["rfp_release_date"].ToString();
                        deal.Deal_Status = rdr["status"].ToString();
                        deal.Deal_Stage = rdr["stage"].ToString();
                        deal.Deal_Funding_Agency_code = rdr["funding_agency_code"].ToString();
                        deal.Deal_Funding_Agency_Name = rdr["funding_agency_name"].ToString();
                        deal.Deal_funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                        deal.Deal_funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                        deal.Deal_Awarding_Agency_code = rdr["awarding_agency_code"].ToString();
                        deal.Deal_Awarding_Agency_name = rdr["awarding_agency_name"].ToString();
                        deal.Deal_Award_Type = rdr["award_type"].ToString();
                        deal.Deal_Set_Aside = rdr["set_aside"].ToString();
                        deal.Deal_Set_Aside_Description = rdr["set_aside_description"].ToString();
                        deal.Deal_naics_description = rdr["naics_description"].ToString();
                        deal.Deal_PSC_code = rdr["psc_code"].ToString();
                        deal.Deal_PSC_Description = rdr["psc_description"].ToString();
                        deal.Deal_naics_code = rdr["naics_code"].ToString();
                        deal.Deal_Incumbent_Name = rdr["incumbent_name"].ToString();
                        deal.Deal_Incumbent_UEI = rdr["incumbent_uei"].ToString();
                        deal.Deal_Potential_Award_Amount = rdr["potential_award_amount"].ToString();
                        deal.Deal_Expiration_Date = rdr["expiration_date"].ToString();
                        deal.Deal_Govwin_ID = Convert.ToInt32(rdr["govwin_id"]);
                        deal.Deal_govwin_link = rdr["govwin_link"].ToString();
                        deal.Deal_Priority = rdr["priority"].ToString();
                        deal.user_id = Convert.ToInt32(rdr["user_id"]);
                        deal.user_domain = rdr["user_domain"].ToString();
                        deal.multi_single_award = rdr["multi_single_award"].ToString();
                        deal.deal_type = rdr["deal_type"].ToString();
                        deal.organization_id = rdr["organization_id"].ToString();
                    }
                }


            }
            catch (Exception)
            {
                // error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { deal });
        }

        public string DeleteDeal(int id)
        {

            int result = 0;
            string Error = "";
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("crm_deal_delete", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@deal_id", id);

                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }

        public string GetNAICSFam(string Code)
        {
            List<string> GetNAICSFamDescp = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("app_GetNaics", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@naics", Code);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            GetNAICSFamDescp.Add(dr2["description"].ToString());
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(GetNAICSFamDescp);

        }

        public string GetFundingAgency(string SubAgencyName)
        {
            List<FundingAgency> FundingAgency = new List<FundingAgency>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_getAgencylist", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@search_text", SubAgencyName);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            FundingAgency funding = new FundingAgency();
                            funding.funding_agency_code = (dr2["agency_code"].ToString());
                            funding.funding_agency_name = (dr2["agency_name"].ToString());
                            funding.funding_subagency_code = (dr2["department_code"].ToString());
                            funding.funding_subagency_name = (dr2["department_name"].ToString());

                            FundingAgency.Add(funding);

                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(FundingAgency);

        }

        public string GetAwardingFundingAgency(string AwardingSubAgencyName)
        {
            List<AwardFundingAgency> FundingAgency = new List<AwardFundingAgency>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_getAgencylist", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@search_text", AwardingSubAgencyName);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            AwardFundingAgency awardfunding = new AwardFundingAgency();
                            awardfunding.award_agency_code = (dr2["agency_code"].ToString());
                            awardfunding.award_agency_name = (dr2["agency_name"].ToString());
                            //funding.funding_subagency_code = (dr2["department_code"].ToString());
                            //funding.funding_subagency_name = (dr2["department_name"].ToString());

                            FundingAgency.Add(awardfunding);

                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(FundingAgency);

        }

        public string GetAgencyList(string AgencyValue)
        {
            List<AgencyList> getAgency = new List<AgencyList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(Common.crm_agency_list, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@search_text", AgencyValue);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            AgencyList AgencyData = new AgencyList();
                            AgencyData.value = (dr2["agency_name"].ToString());
                            AgencyData.id = (dr2["agency_code"].ToString());
                            getAgency.Add(AgencyData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getAgency);

        }

        public string GetAwardAgency(string AwardAgency)
        {
            List<string> GetAwardAgencyName = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("app_GetFundingAgency", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@funding_agency_code", AwardAgency);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            GetAwardAgencyName.Add(dr2["funding_agency_name"].ToString());
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(GetAwardAgencyName);

        }

        public string GetPSC(string Code)
        {
            List<string> GetPSCDesc = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("app_GetPSCList", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Code", Code);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            GetPSCDesc.Add(dr2["description"].ToString());


                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(GetPSCDesc);

        }

        public string GetIncumebentName(string search)
        {

            {
                List<Incumbent> IncumbentList = new List<Incumbent>();

                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("crm_getIncumbent", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@search_list", search);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                Incumbent incum = new Incumbent();
                                incum.legal_buisness_name = (dr2["legal_business_name"].ToString());
                                incum.SAM = (dr2["SAM"].ToString());
                                IncumbentList.Add(incum);

                            }

                        }

                    }

                    con.Close();
                }
                return new JavaScriptSerializer().Serialize(IncumbentList);

            }

        }

        public string GetIncumebentUEI(string CageCodeUEI)
        {
            List<string> GetIncumbentUEI = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("app_GetIncumbent", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CAGECODE", CageCodeUEI);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            GetIncumbentUEI.Add(dr2["DUNS"].ToString());


                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(GetIncumbentUEI);

        }

        public string Search(string searchtxt, string UserDomain)
        {

            List<DealsDetails> GetSearchData = new List<DealsDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_deal_search_all", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@search_text", searchtxt);
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);


                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            DealsDetails Initial = new DealsDetails();
                            Initial.Deal_ID = Convert.ToInt32((dr2["deal_id"]));
                            Initial.created_datetime = dr2["created_datetime"].ToString();
                            Initial.Deal_Title = (dr2["title"].ToString());
                            Initial.Description = (dr2["description"].ToString());
                            Initial.Deal_RFP_Release_Date = (dr2["rfp_release_date"].ToString());
                            Initial.Deal_Status = (dr2["status"].ToString());
                            Initial.Deal_Stage = (dr2["description"].ToString());
                            Initial.Deal_Funding_Agency_Name = (dr2["funding_agency_name"].ToString());
                            Initial.Deal_Award_Type = (dr2["award_type"].ToString());
                            Initial.Deal_Set_Aside = (dr2["set_aside"].ToString());
                            Initial.Deal_naics_code = (dr2["naics_code"].ToString());
                            Initial.Deal_PSC_code = (dr2["psc_code"].ToString());
                            Initial.Deal_Incumbent_Name = (dr2["incumbent_name"].ToString());
                            Initial.Deal_Potential_Award_Amount = (dr2["potential_award_amount"].ToString());
                            Initial.Deal_Expiration_Date = (dr2["expiration_date"].ToString());
                            Initial.Deal_SamGov_Link = (dr2["govwin_link"].ToString());
                            Initial.Deal_Priority = (dr2["priority"].ToString());





                            GetSearchData.Add(Initial);
                        }
                    }
                }
            }

            con.Close();



            return new JavaScriptSerializer().Serialize(GetSearchData);
        }

        public string Get_SocioEconomic()
        {
            List<SocioEco> getSocio = new List<SocioEco>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(Common.app_GetSetAsideList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            SocioEco getvalues = new SocioEco();
                            getvalues.abbreviation = (dr2["SetASide"].ToString());
                            getvalues.SetASideCode = (dr2["SetASideCode"].ToString());
                            getSocio.Add(getvalues);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getSocio);

        }

        public class FundingAgency
        {
            public string funding_agency_name { get; set; }
            public string funding_agency_code { get; set; }

            public string funding_subagency_code { get; set; }

            public string funding_subagency_name { get; set; }

        }

        public class AwardFundingAgency
        {
            public string award_agency_name { get; set; }
            public string award_agency_code { get; set; }




        }


        public class Incumbent
        {
            public string legal_buisness_name { get; set; }
            public string SAM { get; set; }

        }

        public class AgencyList
        {
            public string id { get; set; }
            public string value { get; set; }

        }

        public class SocioEco
        {
            public string abbreviation { get; set; }
            public string SetASideCode { get; set; }
        }

        public class DealsDetails
        {
            public int Deal_ID { get; set; }
            public string created_datetime { get; set; }
            public string Deal_Title { get; set; }
            public string Deal_SolicitationNumber { get; set; }
            public string Deal_SamGov_Link { get; set; }
            public string Deal_Status { get; set; }
            public string Deal_Stage { get; set; }
            public string Deal_RFP_Release_Date { get; set; }
            public string Deal_Funding_Agency_code { get; set; }

            public string Deal_Funding_Agency_Name { get; set; }
            public string Deal_Awarding_Agency_code { get; set; }

            public string Deal_Awarding_Agency_name { get; set; }
            public string Deal_funding_sub_agency_code { get; set; }
            public string Deal_funding_sub_agency_name { get; set; }
            public string Deal_Award_Type { get; set; }
            public string Deal_PSC_code { get; set; }
            public string Deal_PSC_Description { get; set; }

            public string Deal_Set_Aside { get; set; }

            public string Deal_Set_Aside_Description { get; set; }

            public string Deal_naics_code { get; set; }

            public string Deal_naics_description { get; set; }
            public string Deal_Incumbent_UEI { get; set; }
            public string Deal_Potential_Award_Amount { get; set; }
            public string Deal_Incumbent_Name { get; set; }
            public int Deal_Govwin_ID { get; set; }
            public string Deal_Priority { get; set; }
            public string Deal_Expiration_Date { get; set; }
            public string Deal_govwin_link { get; set; }
            public int user_id { get; set; }
            public string user_domain { get; set; }
            public string Description { get; set; }
            public string multi_single_award { get; set; }
            public string deal_type { get; set; }
            public string organization_id { get; set; }
            public string organization_name { get; set; }


        }
    }
}