using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{

    [SessionExpire]
    [CheckUserSubscription]
    public class ContractController : Controller
    {
        Utility obj = new Utility();
        EncryptDecrypt EN_DE = new EncryptDecrypt();

        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Contract
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult _PartialContract()
        {
            return View();
        }
        public ActionResult _PartialReferenceIDV()
        {
            return View();
        }

        public string GetContractNumberDetail(string contractno, string DUNS)
        {

            contractno = EN_DE.Decrypt(contractno);
            DUNS = EN_DE.Decrypt(DUNS);


            List<ContractList> getContract = new List<ContractList>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(Common.app_GetContractSummaryInfo, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");
                    cmd.Parameters.AddWithValue("@contract_number", contractno);
                    cmd.Parameters.AddWithValue("@UEI", DUNS);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {

                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            ContractList ContractData = new ContractList();

                            ContractData.award_id = (dr2["award_id"].ToString());
                            ContractData.transaction_id = (dr2["transaction_id"].ToString());
                            ContractData.award_type = (dr2["award_type"].ToString());
                            ContractData.modification_number = (dr2["modification_number"].ToString());
                            ContractData.base_and_all_options_value = (dr2["base_and_all_options_value"].ToString());
                            ContractData.base_and_exercised_options_value = (dr2["base_and_exercised_options_value"].ToString());
                            ContractData.federal_action_obligation = (dr2["federal_action_obligation"].ToString());
                            ContractData.solicitation_identifier = (dr2["solicitation_identifier"].ToString());

                            ContractData.action_date = dr2["action_date"].ToString();
                            if (ContractData.action_date != "")
                                ContractData.action_date = Convert.ToDateTime(ContractData.action_date).ToString("MM/dd/yyyy");
                            ContractData.action_date_fiscal_year = (dr2["action_date_fiscal_year"].ToString());
                            // ContractData.action_date_fiscal_year = Convert.ToDateTime(ContractData.action_date_fiscal_year).ToString("dd/MM/yyyy");

                            ContractData.period_of_performance_start_date = DBNull.Value== dr2["period_of_performance_start_date"]? "": dr2["period_of_performance_start_date"].ToString();
                            var flag = ContractData.period_of_performance_start_date.ToCharArray().Any(char.IsDigit);
                            if ((ContractData.period_of_performance_start_date != "" )&& flag)
                                ContractData.period_of_performance_start_date = Convert.ToDateTime(ContractData.period_of_performance_start_date).ToString("MM/dd/yyyy");

                            ContractData.period_of_performance_current_end_date = (dr2["period_of_performance_current_end_date"].ToString());
                            if (ContractData.period_of_performance_current_end_date != "")
                                ContractData.period_of_performance_current_end_date = Convert.ToDateTime(ContractData.period_of_performance_current_end_date).ToString("MM/dd/yyyy");

                            ContractData.period_of_performance_potential_end_date = (dr2["period_of_performance_potential_end_date"].ToString());
                            if (ContractData.period_of_performance_potential_end_date != "")
                                ContractData.period_of_performance_potential_end_date = Convert.ToDateTime(ContractData.period_of_performance_potential_end_date).ToString("MM/dd/yyyy");

                            ContractData.funding_agency_code = (dr2["funding_agency_code"].ToString());
                            ContractData.funding_agency_name = (dr2["funding_agency_name"].ToString());
                            ContractData.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                            ContractData.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                            ContractData.funding_office_code = (dr2["funding_office_code"].ToString());
                            ContractData.funding_office_name = (dr2["funding_office_name"].ToString());
                            ContractData.awarding_agency_code = (dr2["awarding_agency_code"].ToString());
                            ContractData.awarding_agency_name = (dr2["awarding_agency_name"].ToString());
                            ContractData.awarding_sub_agency_code = (dr2["awarding_sub_agency_code"].ToString());
                            ContractData.awarding_sub_agency_name = (dr2["awarding_sub_agency_name"].ToString());
                            ContractData.recipient_uei = (dr2["recipient_UEI"].ToString());
                            ContractData.recipient_name = (dr2["recipient_name"].ToString()); 
                            ContractData.naics_code = (dr2["naics_code"].ToString());
                            ContractData.naics_description = (dr2["naics_description"].ToString());
                            ContractData.product_or_service_code = (dr2["product_or_service_code"].ToString());
                            ContractData.product_or_service_code_description = (dr2["product_or_service_code_description"].ToString());
                            ContractData.major_program = (dr2["major_program"].ToString());
                            ContractData.type_of_set_aside = (dr2["type_of_set_aside"].ToString());
                            ContractData.type_of_set_aside_code = (dr2["type_of_set_aside_code"].ToString());
                            ContractData.usaspending_permalink = (dr2["usaspending_permalink"].ToString());
                            ContractData.award_description = (dr2["award_description"].ToString());
                            ContractData.corporate_url = (dr2["corporate_url"].ToString());
                            ContractData.primary_place_of_performance_city_name = (dr2["primary_place_of_performance_city_name"].ToString());
                            ContractData.primary_place_of_performance_state_name = (dr2["primary_place_of_performance_state_name"].ToString());
                            ContractData.primary_place_of_performance_country_name = (dr2["primary_place_of_performance_country_name"].ToString());
                            //ContractData.referenced_idv_id = (dr2["referenced_idv_id"].ToString());
                            //ContractData.parent_award_agency_id = (dr2["parent_award_agency_id"].ToString());
                            //ContractData.parent_award_agency_name = (dr2["parent_award_agency_name"].ToString());





                            getContract.Add(ContractData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getContract);

        }

        public string getReferenceIDVDetail(string IDV)
        {

            IDV = EN_DE.Decrypt(IDV);


            List<ContractList> getIDV = new List<ContractList>();
            string Error = "";

            try
            {

                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(Common.app_GetContractSummaryInfoByReferencedIDVID, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");
                        cmd.Parameters.AddWithValue("@contract_number", IDV);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {

                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                ContractList IDVData = new ContractList();

                                IDVData.award_id = (dr2["award_id"].ToString());
                                IDVData.parent_award_agency_id = (dr2["parent_award_agency_id"].ToString());
                                IDVData.parent_award_agency_name = (dr2["parent_award_agency_name"].ToString());

                                IDVData.award_type = (dr2["award_type"].ToString());
                                IDVData.modification_number = (dr2["modification_number"].ToString());
                                IDVData.base_and_all_options_value = (dr2["base_and_all_options_value"].ToString());
                                //IDVData.base_and_exercised_options_value = (dr2["base_and_exercised_options_value"].ToString());
                                //IDVData.federal_action_obligation = (dr2["federal_action_obligation"].ToString());
                                IDVData.solicitation_identifier = (dr2["solicitation_identifier"].ToString());

                                IDVData.action_date = dr2["action_date"].ToString();
                                if (IDVData.action_date != "")
                                    IDVData.action_date = Convert.ToDateTime(IDVData.action_date).ToString("MM/dd/yyyy");


                                IDVData.action_date_fiscal_year = (dr2["action_date_fiscal_year"].ToString());
                                // ContractData.action_date_fiscal_year = Convert.ToDateTime(ContractData.action_date_fiscal_year).ToString("dd/MM/yyyy");

                                IDVData.period_of_performance_start_date = (dr2["period_of_performance_start_date"].ToString());
                                if (IDVData.period_of_performance_start_date != "")
                                    IDVData.period_of_performance_start_date = Convert.ToDateTime(IDVData.period_of_performance_start_date).ToString("MM/dd/yyyy");

                                IDVData.period_of_performance_current_end_date = (dr2["period_of_performance_current_end_date"].ToString());
                                if (IDVData.period_of_performance_current_end_date != "")
                                    IDVData.period_of_performance_current_end_date = Convert.ToDateTime(IDVData.period_of_performance_current_end_date).ToString("MM/dd/yyyy");

                                //IDVData.period_of_performance_potential_end_date = (dr2["period_of_performance_potential_end_date"].ToString());
                                //IDVData.period_of_performance_potential_end_date = Convert.ToDateTime(IDVData.period_of_performance_potential_end_date).ToString("dd/MM/yyyy");

                                IDVData.funding_agency_code = (dr2["funding_agency_code"].ToString());
                                IDVData.funding_agency_name = (dr2["funding_agency_name"].ToString());
                                IDVData.funding_sub_agency_code = (dr2["funding_sub_agency_code"].ToString());
                                IDVData.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                                //IDVData.funding_office_code = (dr2["funding_office_code"].ToString());
                                //IDVData.funding_office_name = (dr2["funding_office_name"].ToString());
                                IDVData.awarding_agency_code = (dr2["awarding_agency_code"].ToString());
                                IDVData.awarding_agency_name = (dr2["awarding_agency_name"].ToString());
                                IDVData.awarding_sub_agency_code = (dr2["awarding_sub_agency_code"].ToString());
                                IDVData.awarding_sub_agency_name = (dr2["awarding_sub_agency_name"].ToString());
                                IDVData.recipient_uei = (dr2["recipient_UEI"].ToString());
                                IDVData.recipient_name = (dr2["recipient_name"].ToString());
                                IDVData.naics_code = (dr2["naics_code"].ToString());
                                IDVData.naics_description = (dr2["naics_description"].ToString());
                                IDVData.product_or_service_code = (dr2["product_or_service_code"].ToString());
                                IDVData.product_or_service_code_description = (dr2["product_or_service_code_description"].ToString());
                                IDVData.major_program = (dr2["major_program"].ToString());
                                IDVData.type_of_set_aside = (dr2["type_of_set_aside"].ToString());
                                IDVData.type_of_set_aside_code = (dr2["type_of_set_aside_code"].ToString());
                                IDVData.usaspending_permalink = (dr2["usaspending_permalink"].ToString());
                                IDVData.award_description = (dr2["award_description"].ToString());
                                IDVData.award_type = (dr2["award_type"].ToString());
                                IDVData.referenced_idv_id = (dr2["referenced_idv_id"].ToString());
                                IDVData.primary_place_of_performance_city_name = (dr2["primary_place_of_performance_city_name"].ToString());
                                IDVData.primary_place_of_performance_state_name = (dr2["primary_place_of_performance_state_name"].ToString());
                                IDVData.primary_place_of_performance_country_name = (dr2["primary_place_of_performance_country_name"].ToString());
                                getIDV.Add(IDVData);
                            }
                        }

                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(getIDV);

        }


        public class ContractList
        {
            public string award_id { get; set; }
            public string transaction_id { get; set; }
            public string award_type { get; set; }
            public string modification_number { get; set; }
            public string base_and_all_options_value { get; set; }
            public string base_and_exercised_options_value { get; set; }
            public string federal_action_obligation { get; set; }
            public string solicitation_identifier { get; set; }
            public string action_date { get; set; }
            public string action_date_fiscal_year { get; set; }
            public string period_of_performance_start_date { get; set; }
            public string period_of_performance_current_end_date { get; set; }
            public string period_of_performance_potential_end_date { get; set; }
            public string funding_agency_code { get; set; }
            public string funding_agency_name { get; set; }
            public string funding_sub_agency_code { get; set; }
            public string funding_sub_agency_name { get; set; }
            public string funding_office_code { get; set; }
            public string funding_office_name { get; set; }
            public string awarding_agency_code { get; set; }
            public string awarding_agency_name { get; set; }
            public string awarding_sub_agency_code { get; set; }
            public string awarding_sub_agency_name { get; set; }
            public string recipient_uei { get; set; }
            public string recipient_name { get; set; }
            public string naics_code { get; set; }
            public string naics_description { get; set; }
            public string product_or_service_code { get; set; }
            public string product_or_service_code_description { get; set; }
            public string major_program { get; set; }
            public string type_of_set_aside { get; set; }
            public string type_of_set_aside_code { get; set; }
            public string usaspending_permalink { get; set; }
            public string award_description { get; set; }

            public string referenced_idv_id { get; set; }
            public string parent_award_agency_id { get; set; }
            public string parent_award_agency_name { get; set; }
            public string corporate_url { get; set; }
            public string primary_place_of_performance_country_name { get; set; }
            public string primary_place_of_performance_state_name { get; set; }
            public string primary_place_of_performance_city_name { get; set; }

        }


        //public class IDVList
        //{
        //    public string award_id { get; set; }

        //}
    }
}