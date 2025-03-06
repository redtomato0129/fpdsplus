using FedPipelineApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static FedPipelineApplication.Controllers.TaxonomyController;


namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    [CheckUserSubscription]
    public class SearchController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Search
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult WIP()
        {
            return View();
        }
        public ActionResult Common()
        {
            return View();
        }
        public ActionResult _PartialContractDetails()
        {
            return View();
        }
        public ActionResult _PartialSearch()
        {
            return View();
        }

        public string Search_Name(string SearchName)
        {
            List<string> SearchResult = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                //using (SqlCommand cmd = new SqlCommand(Common.app_WebTeaming_getName, con))
                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_Vendor_getNameList, con))

                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME", SearchName);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            SearchResult.Add(dr2["LEGAL_BUSINESS_NAME_DUNS"].ToString());

                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(SearchResult);

        }

        public string GetData(string value, string Mode)
        {
            List<Search> searchresult = new List<Search>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                if (Mode == "Name")
                {
                    string[] Names = value.Split('+');
                    //using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_WebTeaming_getName, con))
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_Vendor_getNameList, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME", value);
                        cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME", Names[0]);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            Search res = new Search();
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                string CAGECODE = (dr2["CAGECODE"].ToString());
                                if (CAGECODE == Names[1])
                                {
                                    res.CAGECODE = (dr2["CAGECODE"].ToString());
                                    res.uei = (dr2["UEI"].ToString());
                                    searchresult.Add(res);
                                }
                            }
                        }
                    }
                }
                if (Mode == "CAGE")
                {
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_Vendor_getCageCode, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@CAGE_CODE", value);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            Search res = new Search();
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                res.LEGAL_BUSINESS_NAME = (dr2["LEGAL_BUSINESS_NAME"].ToString());
                                res.uei = (dr2["UEI"].ToString());
                                searchresult.Add(res);
                            }
                        }
                    }
                }
                if (Mode == "DUNS")
                {
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_Vendor_getDuns, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UEI", value);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            Search res = new Search();
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                res.LEGAL_BUSINESS_NAME = (dr2["LEGAL_BUSINESS_NAME"].ToString());
                                res.CAGECODE = (dr2["CAGE_CODE"].ToString());
                                searchresult.Add(res);
                            }
                        }
                    }
                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(searchresult);

        }

        public string GetNAICSFam(string Code)
        {
            List<string> GetNAICSFamDescp = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetNaics, con))
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

        public string GetDepartmentList()
        {
            List<DepartmentList> getDept = new List<DepartmentList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetDepartmentList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {

                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            DepartmentList DeptData = new DepartmentList();
                            DeptData.value = (dr2["funding_agency_name"].ToString());
                            DeptData.id = (dr2["funding_agency_code"].ToString());
                            getDept.Add(DeptData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getDept);

        }

        public string GetAgencyList(string Agencycode)
        {
            List<AgencyList> getAgency = new List<AgencyList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetAgencyList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@funding_agency_code", Agencycode);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            AgencyList AgencyData = new AgencyList();
                            AgencyData.value = (dr2["funding_agency_name"].ToString());
                            AgencyData.id = (dr2["funding_agency_code"].ToString());
                            getAgency.Add(AgencyData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getAgency);

        }

        public string GetOfficeList(string Agencycode)
        {
            List<FundingOfficeList> getFundingOffice = new List<FundingOfficeList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetOfficeList, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@agency_code", Agencycode);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                FundingOfficeList FundingOfficeData = new FundingOfficeList();
                                FundingOfficeData.value = (dr2["office_name"].ToString());
                                FundingOfficeData.id = (dr2["office_code"].ToString());
                                getFundingOffice.Add(FundingOfficeData);
                            }
                        }

                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {

            }
            return new JavaScriptSerializer().Serialize(getFundingOffice);

        }

		public string GetOfficeListSearch(string agency_code, string search_text)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<FundingOfficeList> getFundingOffice = new List<FundingOfficeList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "app_GetOfficeListSearch";
					SqlCommand cmd = new SqlCommand(sp, con);
					cmd.CommandType = CommandType.StoredProcedure;
					cmd.Parameters.AddWithValue("@agency_code", agency_code);
					cmd.Parameters.AddWithValue("@search_text", search_text);
					con.Open();
					DataSet ds = obj.getDataSet_SP(cmd);
					if (ds.Tables["data"].Rows.Count > 0)
					{
						foreach (DataRow dr2 in ds.Tables["data"].Rows)
						{
							FundingOfficeList FundingOfficeData = new FundingOfficeList();
							FundingOfficeData.value = (dr2["office_name"].ToString());
							FundingOfficeData.id = (dr2["office_code"].ToString());
							getFundingOffice.Add(FundingOfficeData);
						}
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(getFundingOffice);
		}
		public string FullSearch(FullSearchData FullSearch)
        {
            List<FullSearchData> GetInitialData = new List<FullSearchData>();
            string Error = "";

            string UserID = (string)Session["User_Id"];

            string storedProcedureName = FedPipelineApplication.Common.app_GetVendorSummary;


            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                try
                {
                    using (SqlCommand cmd = new SqlCommand(storedProcedureName, con))
                    {

                        if (FullSearch.business_type_code_list == null) { FullSearch.business_type_code_list = ""; }
                        if (FullSearch.business_size != "SB") { FullSearch.business_type_code_list = ""; }
                        if (FullSearch.uei == null) { FullSearch.uei= ""; }
                        if (FullSearch.agency_code == null) { FullSearch.agency_code = ""; }
                        if (FullSearch.NAICS == null) { FullSearch.NAICS = ""; }
                        if (FullSearch.naics_family == null) { FullSearch.naics_family = ""; }
                        if (FullSearch.business_size == null) { FullSearch.business_size = ""; }
                        if (FullSearch.department_code == null) { FullSearch.department_code = ""; }
                        if (FullSearch.agency_code == null) { FullSearch.agency_code = ""; }
                        if (FullSearch.solicitation_code == null) { FullSearch.solicitation_code = ""; }
                        if (FullSearch.funding_office_code == null) { FullSearch.funding_office_code = ""; }
                        if (FullSearch.awarding_agency_code == null) { FullSearch.awarding_agency_code = ""; }
                        if (FullSearch.awarding_sub_agency_code == null) { FullSearch.awarding_sub_agency_code = ""; }
                        if (FullSearch.awarding_office_name == null) { FullSearch.awarding_office_name = ""; }


                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@NAICS", FullSearch.NAICS);
                        cmd.Parameters.AddWithValue("@naics_family", FullSearch.naics_family);
                        cmd.Parameters.AddWithValue("@business_type_code_list", FullSearch.business_type_code_list);
                        cmd.Parameters.AddWithValue("@base_and_all_options_value", FullSearch.base_and_all_options_value);
                        cmd.Parameters.AddWithValue("@business_size", FullSearch.business_size);
                        cmd.Parameters.AddWithValue("@UEI", FullSearch.uei);
                        cmd.Parameters.AddWithValue("@department_code", FullSearch.department_code);
                        cmd.Parameters.AddWithValue("@agency_code", FullSearch.agency_code);
                        cmd.Parameters.AddWithValue("@FY", FullSearch.FY);
                        cmd.Parameters.AddWithValue("@FY_End", FullSearch.FY_End);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@solicitation_procedures_code", FullSearch.solicitation_code?.ToString() ?? "");
                        cmd.Parameters.AddWithValue("@funding_office_code", FullSearch.funding_office_code?.ToString() ?? "");
                        cmd.Parameters.AddWithValue("@awarding_agency_code", FullSearch.awarding_agency_code?.ToString() ?? "");
                        cmd.Parameters.AddWithValue("@awarding_subagency_code", FullSearch.awarding_sub_agency_code.ToString() ?? "");
                        cmd.Parameters.AddWithValue("@awarding_office_code", FullSearch.awarding_office_name?.ToString() ?? "");

                        // Console.WriteLine("[webTeaming_getInitialSearchResults] " + FullSearch.NAICS + "," + FullSearch.naics_family + "," + FullSearch.uei + "," + FullSearch.base_and_all_options_value + "," + FullSearch.business_size + "," + FullSearch.business_type_code_list + "," + FullSearch.department_code + "," + FullSearch.agency_code + "," + FullSearch.FY + "");

                        // var execute = "[webTeaming_getInitialSearchResults] " + FullSearch.NAICS + "," + FullSearch.naics_family + "," + FullSearch.uei + "," + FullSearch.base_and_all_options_value + "," + FullSearch.business_size + "," + FullSearch.business_type_code_list + "," + FullSearch.department_code + "," + FullSearch.agency_code + "," + FullSearch.FY + "," + FullSearch.FY_End;

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables.Count > 0 && ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                FullSearchData Initial = new FullSearchData();
                                Initial.legal_business_name = (dr2["legal_business_name"].ToString());
                                Initial.CAGECODE = (dr2["CAGECODE"].ToString());
                                Initial.recipient_uei = (dr2["recipient_UEI"].ToString());
                                Initial.total_awards = (dr2["total_awards"].ToString());
                                Initial.base_and_all_options_value = (dr2["total_base_all_value"].ToString());
                                Initial.total_action_obligation = (dr2["total_fed_obligation"].ToString());
                                //Initial.total_fed_obligation = Convert.ToDouble(dr2["total_fed_obligation"]);
                                //Initial.total_base_all_value = Convert.ToDouble(dr2["total_base_all_value"]);
                                //Initial.solicitation_code = (dr2["solicitation_procedures_code"].ToString());
                                //Initial.solicitation_name = (dr2["solicitation_procedures"].ToString());
                                //Initial.funding_office_code = (dr2["funding_office_code"].ToString());
                                //Initial.funding_office_name = (dr2["funding_office_name"].ToString());
                                //Initial.awarding_agency_code = (dr2["awarding_agency_code"].ToString());
                                //Initial.awarding_agency_name = (dr2["awarding_agency_name"].ToString());
                                //Initial.awarding_sub_agency_code = (dr2["awarding_subagency_code"].ToString());
                                //Initial.awarding_sub_agency_name = (dr2["awarding_subagency_name"].ToString());
                                //Initial.awarding_office_code = (dr2["awarding_office_code"].ToString());
                                //Initial.awarding_office_name = (dr2["awarding_office_name"].ToString());

                                GetInitialData.Add(Initial);
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    Error = ex.Message;

                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(new { GetInitialData, Error });

        }

        public string GetContractorDetails(Contractor ContractorDetails)
        {

            List<Contractor> GetContractorData = new List<Contractor>();
            List<ContractorEntityByDUNS> EntityByDUNS = new List<ContractorEntityByDUNS>();
            List<SmallBusiness> S_Business = new List<SmallBusiness>();
            List<SocioEconomicBusiness> getsocio = new List<SocioEconomicBusiness>();
            string Error = "";

            string UserID = (string)Session["User_Id"];

            string storedProcedure = FedPipelineApplication.Common.app_getVendorContractDetails;

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                try
                {
                    using (SqlCommand cmd = new SqlCommand(storedProcedure, con))
                    {
                        if (ContractorDetails.business_type_code_list == null) { ContractorDetails.business_type_code_list = ""; }
                        if (ContractorDetails.uei == null) { ContractorDetails.uei = ""; }
                        if (ContractorDetails.agency_code == null) { ContractorDetails.agency_code = ""; }
                        if (ContractorDetails.NAICS == null) { ContractorDetails.NAICS = ""; }
                        if (ContractorDetails.naics_family == null) { ContractorDetails.naics_family = ""; }
                        if (ContractorDetails.business_size == null) { ContractorDetails.business_size = ""; }
                        if (ContractorDetails.department_code == null) { ContractorDetails.department_code = ""; }
                        if (ContractorDetails.agency_code == null) { ContractorDetails.agency_code = ""; }
                        if (ContractorDetails.solicitation_procedures_code == null) { ContractorDetails.solicitation_procedures_code = ""; }
                        if (ContractorDetails.funding_office_code == null) { ContractorDetails.funding_office_code = ""; }
                        if (ContractorDetails.awarding_agency_code == null) { ContractorDetails.awarding_agency_code = ""; }
                        if (ContractorDetails.awarding_subagency_code == null) { ContractorDetails.awarding_subagency_code = ""; }
                        if (ContractorDetails.awarding_office_code == null) { ContractorDetails.awarding_office_code = ""; }

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@NAICS", ContractorDetails.NAICS);
                        cmd.Parameters.AddWithValue("@naics_family", ContractorDetails.naics_family);
                        cmd.Parameters.AddWithValue("@business_type_code_list", ContractorDetails.business_type_code_list);
                        cmd.Parameters.AddWithValue("@base_and_all_options_value", ContractorDetails.base_and_all_options_value);
                        cmd.Parameters.AddWithValue("@business_size", ContractorDetails.business_size);
                        cmd.Parameters.AddWithValue("@UEI", ContractorDetails.uei);
                        cmd.Parameters.AddWithValue("@department_code", ContractorDetails.department_code);
                        cmd.Parameters.AddWithValue("@agency_code", ContractorDetails.agency_code);
                        cmd.Parameters.AddWithValue("@FY", ContractorDetails.FY);
                        cmd.Parameters.AddWithValue("@FY_End", ContractorDetails.FY_End);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@solicitation_procedures_code", ContractorDetails.solicitation_procedures_code);
                        cmd.Parameters.AddWithValue("@funding_office_code", ContractorDetails.funding_office_code);
                        cmd.Parameters.AddWithValue("@awarding_agency_code", ContractorDetails.awarding_agency_code);
                        cmd.Parameters.AddWithValue("@awarding_subagency_code", ContractorDetails.awarding_subagency_code);
                        cmd.Parameters.AddWithValue("@awarding_office_code", ContractorDetails.awarding_office_code);


                     //   var execute = "[app_getFederalPrimeContractorPortfolio_UEI] " + ContractorDetails.NAICS + "," + ContractorDetails.naics_family + "," + ContractorDetails.uei + "," + ContractorDetails.base_and_all_options_value + "," + ContractorDetails.business_size + "," + ContractorDetails.business_type_code_list + "," + ContractorDetails.department_code + "," + ContractorDetails.agency_code + "," + ContractorDetails.FY + "," + ContractorDetails.FY_End + "";


                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                Contractor Initial = new Contractor();
                                Initial.department_name = (dr2["department_name"].ToString());
                                Initial.agency_name = (dr2["agency_name"].ToString());
                                Initial.contract_type = (dr2["contract_type"].ToString());
                                Initial.Contract_number = (dr2["Contract_number"].ToString());
                                Initial.FY_awarded = (dr2["FY_awarded"].ToString());
                                Initial.NAICS = (dr2["NAICS"].ToString());
                                Initial.PSC = (dr2["PSC"].ToString());
                                Initial.total_contract_values = (dr2["total_contract_values"].ToString());
                                Initial.Link = (dr2["usaspending_permalink"].ToString());
                                Initial.Referenced_idv_id = (dr2["Referenced_idv_id"].ToString());
                                Initial.transaction_id = (dr2["transaction_id"].ToString());
                                Initial.type_of_contract_pricing = (dr2["type_of_contract_pricing"].ToString());

                                Initial.award_description = (dr2["award_description"].ToString());
                                Initial.NAICS_opportunity = (dr2["NAICS_opportunity"].ToString());
                                Initial.PSC_opportunity = (dr2["PSC_opportunity"].ToString());
                                Initial.PSC_NAICS_opportunity = (dr2["PSC_NAICS_opportunity"].ToString());

                                GetContractorData.Add(Initial);
                            }
                        }

                    }
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetVendorDetails, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UEI", ContractorDetails.uei);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                ContractorEntityByDUNS ContractorEntity = new ContractorEntityByDUNS();
                                ContractorEntity.LEGAL_BUSINESS_NAME = (dr2["LEGAL_BUSINESS_NAME"].ToString());
                                ContractorEntity.uei = (dr2["UEI"].ToString());
                                ContractorEntity.CAGE_CODE = (dr2["CAGE_CODE"].ToString());
                                ContractorEntity.address_line1 = (dr2["address_line1"].ToString());
                                ContractorEntity.address_line2 = (dr2["address_line2"].ToString());
                                ContractorEntity.city = (dr2["city"].ToString());
                                ContractorEntity.state = (dr2["state"].ToString());
                                ContractorEntity.zip_code = (dr2["zip_code"].ToString());
                                ContractorEntity.zip_code_4 = (dr2["zip_code_4"].ToString());
                                ContractorEntity.contact_first_name_1 = (dr2["contract_first_name_1"].ToString());
                                ContractorEntity.contact_last_name_1 = (dr2["contact_last_name_1"].ToString());
                                ContractorEntity.contact_phone_1 = (dr2["contact_phone_1"].ToString());
                                ContractorEntity.contact_email_1 = (dr2["contact_email_1"].ToString());
                                ContractorEntity.contact_first_name_2 = (dr2["contact_first_name_2"].ToString());
                                ContractorEntity.contact_last_name_2 = (dr2["contact_last_name_2"].ToString());
                                ContractorEntity.contact_phone_2 = (dr2["contact_phone_2"].ToString());
                                ContractorEntity.contact_email_2 = (dr2["contact_email_2"].ToString());
                                ContractorEntity.contact_first_name_3 = (dr2["contact_first_name_3"].ToString());
                                ContractorEntity.contact_last_name_3 = (dr2["contact_last_name_3"].ToString());
                                ContractorEntity.contact_phone_3 = (dr2["contact_phone_3"].ToString());
                                ContractorEntity.contact_email_3 = (dr2["contact_email_3"].ToString());
                                ContractorEntity.contact_first_name_4 = (dr2["contact_first_name_4"].ToString());
                                ContractorEntity.contact_last_name_4 = (dr2["contact_last_name_4"].ToString());
                                ContractorEntity.contact_phone_4 = (dr2["contact_phone_4"].ToString());
                                ContractorEntity.contact_email_4 = (dr2["contact_email_4"].ToString());
                                ContractorEntity.corporate_url = (dr2["corporate_url"].ToString());

                                EntityByDUNS.Add(ContractorEntity);
                            }
                        }

                    }
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_getDUNSNaics, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UEI", ContractorDetails.uei);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                SmallBusiness SB_data = new SmallBusiness();

                                SB_data.NAICS = (dr2["NAICS"].ToString());
                                SB_data.size_standard_dollars = (dr2["size_standard_dollars"].ToString());
                                SB_data.size_standard_employees = (dr2["size_standard_employees"].ToString());
                                SB_data.prefix = (dr2["prefix"].ToString());
                                SB_data.suffix = (dr2["suffix"].ToString());
                                SB_data.SBI = (dr2["SBI"].ToString());

                                S_Business.Add(SB_data);
                            }
                        }

                    }
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_getSocioEconomicBusinessTypeByDUNS, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UEI", ContractorDetails.uei);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                SocioEconomicBusiness socio = new SocioEconomicBusiness();

                                socio.abbreviation = (dr2["abbreviation"].ToString());
                                socio.business_type_code = (dr2["business_type_code"].ToString());

                                getsocio.Add(socio);
                            }
                        }

                    }
                }
                catch (Exception ex)
                {
                    Error = ex.Message;
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(new { GetContractorData, EntityByDUNS, S_Business, getsocio, Error });

        }

        public string GetAwardValue()
        {
            List<getaward> getaward = new List<getaward>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetAwardValue, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {

                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            getaward getvalues = new getaward();
                            getvalues.award_value_id = (dr2["award_value_id"].ToString());
                            getvalues.award_value = (dr2["award_value"].ToString());
                            getaward.Add(getvalues);
                        }
                    }
                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getaward);

        }

        public string Get_SocioEconomic()
        {
            List<SocioEco> getSocio = new List<SocioEco>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_getSocioEconomicList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            SocioEco getvalues = new SocioEco();
                            getvalues.abbreviation = (dr2["abbreviation"].ToString());
                            getvalues.business_type_code = (dr2["business_type_code"].ToString());
                            getvalues.Business_type_description = (dr2["Business_type_description"].ToString());

                            getSocio.Add(getvalues);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getSocio);

        }

        //public string Get_SocioEconomic()
        //{
        //    List<SocioEco> getSocio = new List<SocioEco>();

        //    using (SqlConnection con = new SqlConnection(MainCon))
        //    {
        //        con.Open();

        //        using (SqlCommand cmd = new SqlCommand(Common.app_TeamingGetSetAsideList, con))
        //        {
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

        //            DataSet ds = obj.getDataSet_SP(cmd);
        //            if (ds.Tables["data"].Rows.Count > 0)
        //            {
        //                foreach (DataRow dr2 in ds.Tables["data"].Rows)
        //                {
        //                    SocioEco getvalues = new SocioEco();
        //                    getvalues.abbreviation = (dr2["SetASide"].ToString());
        //                    getvalues.SetASideCode = (dr2["setasideCode"].ToString());
        //                    getSocio.Add(getvalues);
        //                }
        //            }
        //        }
        //        con.Close();
        //    }
        //    return new JavaScriptSerializer().Serialize(getSocio);

        //}


        public string CheckUser()
        {
            string getUserInfo = "";

            string User_Email = Session["User_Email"].ToString();
            string User_Id = Session["User_Id"].ToString();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();


                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetUserInfo, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@User_Email", User_Email);
                    cmd.Parameters.AddWithValue("@User_Id", User_Id);


                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            getUserInfo = (dr2["Paid"].ToString());
                            Session["Paid"] = getUserInfo;
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getUserInfo);

        }

        public string GetDepartmentCode(string dept)
        {
            List<DepartmentList> getDept = new List<DepartmentList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetDepartmentCode, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@funding_agency_name", dept);
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {

                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            DepartmentList DeptData = new DepartmentList();
                            DeptData.value = (dr2["funding_agency_name"].ToString());
                            DeptData.id = (dr2["funding_agency_code"].ToString());
                            getDept.Add(DeptData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getDept);

        }

        public void GenerateExcel(FullSearchData FullSearch)
        {
            List<SearchReportModel> searchReport = new List<SearchReportModel>();

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_Report_Template, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@NAICS", FullSearch.NAICS);
                        cmd.Parameters.AddWithValue("@naics_family", FullSearch.naics_family);
                        cmd.Parameters.AddWithValue("@business_type_code_list", "");
                        cmd.Parameters.AddWithValue("@base_and_all_options_value", FullSearch.base_and_all_options_value);
                        cmd.Parameters.AddWithValue("@business_size", FullSearch.business_size);
                        cmd.Parameters.AddWithValue("@contract_number", "");
                        cmd.Parameters.AddWithValue("@duns", FullSearch.uei);
                        cmd.Parameters.AddWithValue("@funding_agency_code", FullSearch.department_code);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_code", FullSearch.agency_code);
                        cmd.Parameters.AddWithValue("@funding_office_code", "");
                        cmd.Parameters.AddWithValue("@awarding_agency_code", "");
                        cmd.Parameters.AddWithValue("@awarding_sub_agency_code", "");
                        cmd.Parameters.AddWithValue("@awarding_office_code", "");
                        cmd.Parameters.AddWithValue("@FY", FullSearch.FY);
                        cmd.Parameters.AddWithValue("@FY_End", FullSearch.FY_End);
                        cmd.Parameters.AddWithValue("@user_id", "51");
                        cmd.Parameters.AddWithValue("@award_description", "o");
                        cmd.Parameters.AddWithValue("@solicitation_procedures_code", FullSearch.solicitation_code);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {

                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                SearchReportModel searchReportData = new SearchReportModel();
                                searchReportData.Award_id = (dr2["award_id"].ToString());
                                searchReportData.Referenced_idv_id = (dr2["referenced_idv_id"].ToString());
                                searchReportData.Solicitation_identifier = (dr2["solicitation_identifier"].ToString());
                                searchReportData.Funding_agency_name = (dr2["funding_agency_name"].ToString());
                                searchReportData.Funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                                searchReportData.Funding_office_name = (dr2["funding_office_name"].ToString());
                                searchReportData.Awarding_agency_name = (dr2["awarding_agency_name"].ToString());
                                searchReportData.Awarding_sub_agency_name = (dr2["awarding_sub_agency_name"].ToString());
                                searchReportData.Awarding_office_name = (dr2["awarding_office_name"].ToString());
                                searchReportData.Award_type = (dr2["award_type"].ToString());
                                searchReportData.Type_of_contract_pricing = (dr2["type_of_contract_pricing"].ToString());
                                searchReportData.Solicitation_date = (dr2["solicitation_date"].ToString());
                                searchReportData.Action_date = (dr2["action_date"].ToString());
                                searchReportData.Action_date_fiscal_year = (dr2["action_date_fiscal_year"].ToString());
                                searchReportData.Period_of_performance_start_date = (dr2["period_of_performance_start_date"].ToString());
                                searchReportData.Period_of_performance_current_end_date = (dr2["period_of_performance_current_end_date"].ToString());
                                searchReportData.Period_of_performance_start_date = (dr2["period_of_performance_start_date"].ToString());
                                searchReportData.Period_of_performance_potential_end_date = (dr2["period_of_performance_potential_end_date"].ToString());
                                searchReportData.Contract_Duration = (dr2["Contract_Duration"].ToString());
                                searchReportData.Base_and_all_options_value = (dr2["base_and_all_options_value"].ToString());
                                searchReportData.Base_options_k = (dr2["base_options_k"].ToString());
                                searchReportData.Vendor_name = (dr2["vendor_name"].ToString());
                                searchReportData.DUNS = (dr2["DUNS"].ToString());
                                searchReportData.Vendor_link = (dr2["vendor_link"].ToString());
                                searchReportData.ContractType = (dr2["contractType"].ToString());
                                searchReportData.Major_program = (dr2["major_program"].ToString());
                                searchReportData.Primary_place_of_performance_state_code = (dr2["primary_place_of_performance_state_code"].ToString());
                                searchReportData.Product_or_service_code = (dr2["product_or_service_code"].ToString());
                                searchReportData.Product_or_service_code_description = (dr2["product_or_service_code_description"].ToString());
                                searchReportData.Naics_code = (dr2["naics_code"].ToString());
                                searchReportData.Naics_description = (dr2["naics_description"].ToString());
                                searchReportData.Award_description = (dr2["award_description"].ToString());
                                searchReportData.Extent_competed = (dr2["extent_competed"].ToString());
                                searchReportData.Solicitation_procedures = (dr2["solicitation_procedures"].ToString());
                                searchReportData.SB_Award = (dr2["SB_Award"].ToString());
                                searchReportData.Type_of_set_aside = (dr2["type_of_set_aside"].ToString());
                                searchReportData.Fed_biz_opps = (dr2["fed_biz_opps"].ToString());
                                searchReportData.Number_of_offers_received = (dr2["number_of_offers_received"].ToString());
                                searchReportData.Simplified_procedures_for_certain_commercial_items = (dr2["simplified_procedures_for_certain_commercial_items"].ToString());
                                searchReportData.BusinessSize = (dr2["BusinessSize"].ToString());
                                searchReportData.Contract_URL = (dr2["Contract_URL"].ToString());
                                searchReportData.OpportunityWebLink = (dr2["opportunityWebLink"].ToString());
                                searchReportData.Award_or_idv_flag = (dr2["award_or_idv_flag"].ToString());
                                searchReportData.Multiple_or_single_award_idv = (dr2["multiple_or_single_award_idv"].ToString());
                                searchReport.Add(searchReportData);
                            }
                        }
                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {

            }
        }

        public string GetAgencyCode(string Agency)
        {
            List<AgencyList> getAgency = new List<AgencyList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetAgencyCode, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@funding_agency_name", Agency);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            AgencyList AgencyData = new AgencyList();
                            AgencyData.value = (dr2["funding_agency_name"].ToString());
                            AgencyData.id = (dr2["funding_agency_code"].ToString());
                            getAgency.Add(AgencyData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getAgency);

        }

        public string GetSolicitationProcedureList()
        {
            List<SolicitationProcedureList> getSolicitation = new List<SolicitationProcedureList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_GetSolicitationProcedureList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {

                        foreach (DataRow dr in ds.Tables["data"].Rows)
                        {
                            SolicitationProcedureList solicitationProcedureList = new SolicitationProcedureList();
                            solicitationProcedureList.value = (dr["solicitation_procedure"].ToString());
                            solicitationProcedureList.id = (dr["solicitation_procedure_code"].ToString());
                            getSolicitation.Add(solicitationProcedureList);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getSolicitation);

        }

        public string SaveSearchParameters(SearchParameters parameters)
        {
            var error = string.Empty;
            var response = string.Empty;
            var userEmailAddress = Session["User_Email"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(FedPipelineApplication.Common.app_InsertExcelReport, con))
                    {
                        var currentDate = DateTime.Now;
                        var searchParameters = new SearchParameters()
                        {
                            business_size = parameters.business_size,
                            naics_code_list = parameters.naics_code_list,
                            psc_code_list = parameters.psc_code_list,
                            naics_family = parameters.naics_family,
                            FY_start = parameters.FY_start,
                            FY_end = parameters.FY_end,
                            minimum_contract_size = parameters.minimum_contract_size,
                            created_datetime = currentDate,
                            email_address = userEmailAddress,
                            solicitation_procedure_code = parameters.solicitation_procedure_code,
                            funding_agency_code_list = parameters.funding_agency_code_list,
                            funding_sub_agency_code_list = parameters.funding_sub_agency_code_list,
                            funding_office_list = parameters.funding_office_list,
                            awarding_agency_code_list = parameters.awarding_agency_code_list,
                            awarding_sub_agency_code_list = parameters.awarding_sub_agency_code_list,
                            awarding_office_list = parameters.awarding_office_list,
                            socio_economic_list = parameters.socio_economic_list,
                            vendor_name = parameters.vendor_name,
                            cage = parameters.cage,
                            report_notes = parameters.report_notes,
                        };

                        if (parameters.psc_code_list == "NA")
                            parameters.psc_code_list = null;
                        if (parameters.solicitation_procedure_code == "NA")
                            parameters.solicitation_procedure_code = null;
                        if (parameters.funding_agency_code_list == "NA")
                            parameters.funding_agency_code_list = null;
                        if (parameters.funding_sub_agency_code_list == "NA")
                            parameters.funding_sub_agency_code_list = null;
                        if (parameters.funding_office_list == "NA")
                            parameters.funding_office_list = null;
                        if (parameters.awarding_agency_code_list == "NA")
                            parameters.awarding_agency_code_list = null;
                        if (parameters.awarding_sub_agency_code_list == "NA")
                            parameters.awarding_sub_agency_code_list = null;
                        if (parameters.awarding_office_list == "NA")
                            parameters.awarding_office_list = null;
                        if (parameters.socio_economic_list == "NA")
                            parameters.socio_economic_list = null;
                        if (parameters.report_notes == "NA")
                            parameters.report_notes = null;

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@business_size", parameters.business_size);
                        cmd.Parameters.AddWithValue("@funding_agency_code_list", parameters.funding_agency_code_list);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_code_list", parameters.funding_sub_agency_code_list);
                        cmd.Parameters.AddWithValue("@funding_office_list", parameters.funding_office_list);
                        cmd.Parameters.AddWithValue("@awarding_agency_code_list", parameters.awarding_agency_code_list);
                        cmd.Parameters.AddWithValue("@awarding_sub_agency_code_list", parameters.awarding_sub_agency_code_list);
                        cmd.Parameters.AddWithValue("@awarding_office_list", parameters.awarding_office_list);
                        cmd.Parameters.AddWithValue("@naics_code_list", parameters.naics_code_list);
                        cmd.Parameters.AddWithValue("@psc_code_list", parameters.psc_code_list);
                        cmd.Parameters.AddWithValue("@naics_family", parameters.naics_family);
                        cmd.Parameters.AddWithValue("@solicitation_procedure_code", parameters.solicitation_procedure_code);
                        cmd.Parameters.AddWithValue("@FY_start", parameters.FY_start);
                        cmd.Parameters.AddWithValue("@FY_end", parameters.FY_end);
                        cmd.Parameters.AddWithValue("@minimum_contract_size", parameters.minimum_contract_size);
                        cmd.Parameters.AddWithValue("@socio_economic_list", parameters.socio_economic_list);
                        cmd.Parameters.AddWithValue("@created_datetime", currentDate);
                        cmd.Parameters.AddWithValue("@email_address", userEmailAddress);
                        cmd.Parameters.AddWithValue("@vendor_name", parameters.vendor_name);
                        cmd.Parameters.AddWithValue("@cage", parameters.cage);
                        cmd.Parameters.AddWithValue("@report_notes", parameters.report_notes);


                        var result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            mail.SendVendorSearchRequestEmail(userEmailAddress, searchParameters);
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
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }


        public class Search
        {
            public string LEGAL_BUSINESS_NAME { get; set; }
            public string CAGECODE { get; set; }
            public string uei { get; set; }

        }
        public class DepartmentList
        {
            public string value { get; set; }
            public string id { get; set; }

        }
        public class SolicitationProcedureList
        {
            public string value { get; set; }
            public string id { get; set; }
        }
        public class AgencyList
        {
            public string value { get; set; }
            public string id { get; set; }

        }
        public class FundingOfficeList
        {
            public string value { get; set; }
            public string id { get; set; }

        }
        public class FullSearchData
        {
            //Request Param//
            public string NAICS { get; set; }
            public string naics_family { get; set; }
            public string business_type_code_list { get; set; }
            public string business_size { get; set; }
            public string uei { get; set; }
            public string department_code { get; set; }
            public string agency_code { get; set; }
            public string FY { get; set; }
            public string FY_End { get; set; }
            public string base_and_all_options_value { get; set; }



            // Response Param//
            public string legal_business_name { get; set; }
            public string CAGECODE { get; set; }
            public string recipient_uei{ get; set; }
            public string total_awards { get; set; }
            public string solicitation_code { get; set; }
            public string solicitation_name { get; set; }
            public string funding_office_code { get; set; }
            public string funding_office_name { get; set; }
            public string awarding_agency_code { get; set; }
            public string awarding_agency_name { get; set; }
            public string awarding_sub_agency_code { get; set; }
            public string awarding_sub_agency_name { get; set; }
            public string awarding_office_code { get; set; }
            public string awarding_office_name { get; set; }
            public string total_action_obligation { get; set; }
            public double total_fed_obligation { get; set; }
            public double total_base_all_value { get; set; }
        }
        public class Contractor
        {
            //Request Param//
            public string SendNAICS { get; set; }
            public string naics_family { get; set; }
            public string business_type_code_list { get; set; }
            public string business_size { get; set; }
            public string uei { get; set; }
            public string recipient_uei { get; set; }
            public string department_code { get; set; }
            public string agency_code { get; set; }
            public string FY { get; set; }
            public string FY_End { get; set; }
            public string NAICS_opportunity { get; set; }
            public string PSC_opportunity { get; set; }
            public string PSC_NAICS_opportunity { get; set; }
            public string transaction_id { get; set; }

            public string base_and_all_options_value { get; set; }

            public string solicitation_procedures_code { get; set; }
            public string funding_office_code { get; set; }
            public string awarding_agency_code { get; set; }
            public string awarding_subagency_code { get; set; }
            public string awarding_office_code { get; set; }

            // Response Param//
            public string department_name { get; set; }
            public string agency_name { get; set; }
            public string contract_type { get; set; }
            public string Contract_number { get; set; }
            public string FY_awarded { get; set; }
            public string NAICS { get; set; }
            public string PSC { get; set; }
            public string total_contract_values { get; set; }
            public string Link { get; set; }
            public string Referenced_idv_id { get; set; }
            public string type_of_contract_pricing { get; set; }
            public string award_description { get; set; }

        }
        public class ContractorEntityByDUNS
        {

            public string LEGAL_BUSINESS_NAME { get; set; }
            public string uei { get; set; }
            public string CAGE_CODE { get; set; }
            public string address_line1 { get; set; }
            public string address_line2 { get; set; }
            public string city { get; set; }
            public string state { get; set; }
            public string zip_code { get; set; }
            public string zip_code_4 { get; set; }
            public string contact_first_name_1 { get; set; }
            public string contact_last_name_1 { get; set; }
            public string contact_phone_1 { get; set; }
            public string contact_email_1 { get; set; }
            public string contact_first_name_2 { get; set; }
            public string contact_last_name_2 { get; set; }
            public string contact_phone_2 { get; set; }
            public string contact_email_2 { get; set; }
            public string contact_first_name_3 { get; set; }
            public string contact_last_name_3 { get; set; }
            public string contact_phone_3 { get; set; }
            public string contact_email_3 { get; set; }
            public string contact_first_name_4 { get; set; }
            public string contact_last_name_4 { get; set; }
            public string contact_phone_4 { get; set; }
            public string contact_email_4 { get; set; }
            public string corporate_url { get; set; }
        }
        public class SmallBusiness
        {
            public string NAICS { get; set; }
            public string size_standard_dollars { get; set; }
            public string size_standard_employees { get; set; }
            public string prefix { get; set; }
            public string suffix { get; set; }
            public string SBI { get; set; }
        }
        public class getaward
        {
            public string award_value_id { get; set; }
            public string award_value { get; set; }
        }
        public class SocioEconomicBusiness
        {
            public string abbreviation { get; set; }
            public string business_type_code { get; set; }

        }
        public class SocioEco
        {
            public string abbreviation { get; set; }
            public string business_type_code { get; set; }
            public string SetASideCode { get; set; }
            public string Business_type_description { get; set; }
        }

        public class Error
        {

            public string SpotError { get; set; }

        }
    }
}