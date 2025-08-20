using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Configuration;
using System.Globalization;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Models
{
    public class AnswerWidgetService
    {
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        /// <summary>
        /// Helper method to safely convert string values to double, handling null/empty values and parsing errors
        /// </summary>
        /// <param name="value">String value to convert</param>
        /// <param name="defaultValue">Default value to return if conversion fails (default: 0.0)</param>
        /// <returns>Converted double value or default value</returns>
        private double SafeParseDouble(string value, double defaultValue = 0.0)
        {
            return !string.IsNullOrEmpty(value) && double.TryParse(value, out double result) ? result : defaultValue;
        }

        /// <summary>
        /// Helper method to safely convert string values to double and return as string, handling null/empty values and parsing errors
        /// </summary>
        /// <param name="value">String value to convert</param>
        /// <param name="defaultValue">Default value to return if conversion fails (default: "0")</param>
        /// <returns>Converted double value as string or default value</returns>
        private string SafeParseDoubleAsString(string value, string defaultValue = "0")
        {
            return !string.IsNullOrEmpty(value) && double.TryParse(value, out double result) ? result.ToString() : defaultValue;
        }
        public dynamic DataGridService(StoreProcedureDrillDown2Body body, string UserID)
        {
            var widgetList = new List<dynamic>();
            var error = string.Empty;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (body.store_procedure == "Wizard_Question1_GetTopVendorsByAgencyNAICS_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.action_date_fiscal_year);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.year_expire = rdr["year_expire"].ToString();
                            widgetObject.contract_duration = rdr["contract_duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }
                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question2_GetCompetitorsByRFP_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.action_date_fiscal_year);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question3_GetTeammatesforAgencyNAICS_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        //cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.action_date_fiscal_year);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@maximum_contract_size", body.maximum_contract_size);
                        cmd1.Parameters.AddWithValue("@minimum_number_of_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question5_GetLargestContractAgencyExpiring_DataGrid")
                    {
                        var sp = body.store_procedure;
                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;
                        if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@expire_date", body.expiration_date_start);
                        cmd1.Parameters.AddWithValue("@expire_date_end", body.expiration_date_end);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@maximum_contract_size", body.maximum_contract_size);
                        cmd1.Parameters.AddWithValue("@contract_number", body.award_id_piid);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question6_VendorList8aNContractsNoLonger8A_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var temp_sa = body.set_aside;

                        if (body.set_aside == "8A Sole Source")
                        {
                            temp_sa = "8AN";
                        }
                        else if (body.set_aside == "8A Competed")
                        {
                            temp_sa = "8A";
                        }
                        else
                        {
                            temp_sa = "Both";
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@expiration_year", body.expiration_year);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside", temp_sa);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question7_VendorsWithExpiring8aContracts_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@contract_number", body.contract_number);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@expire_date_start", body.expire_date_start);
                        cmd1.Parameters.AddWithValue("@expire_date_end", body.expire_date_end);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.expire_year = rdr["expire_year"] == DBNull.Value ? "" : rdr["expire_year"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question8_GetTopFundingOfficesByFiscalYearNAICS_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.funding_office_code);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question9_AgencySpendingByFY_NAICS_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.funding_sub_agency_code) ? String.Empty : body.funding_sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.funding_agency_code);
                        //cmd1.Parameters.AddWithValue("@sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.funding_office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"] == DBNull.Value ? "" : rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question14_AgencySpendingFY_SetAside_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year_earliest_start_date", body.fiscal_year_earliest_start_date);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question16_AgencyObligationsFYNaics_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var display_type = string.IsNullOrEmpty(body.display_type) ? "DataGrid" : body.display_type;
                        var socio_economic_designation = string.IsNullOrEmpty(body.socio_economic_designation) ? String.Empty : body.socio_economic_designation;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.funding_sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.funding_office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@display_type", display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.expire_year = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question17_AgencySpendingFY_SetAside_vs_UNR_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        //cmd1.Parameters.AddWithValue("@setAisdeUNR", body.setAsideUNR);
                        if (body.setAsideUNR == "UNR")
                        {
                            cmd1.Parameters.AddWithValue("@setAisdeUNR", body.setAsideUNR);
                        }
                        else
                        {
                            cmd1.Parameters.AddWithValue("@setAisdeUNR", "");
                        }

                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question18_AgencySpendingFY_8a_vs_SB_DataGrid")
                    {

                        var sp = body.store_procedure;
                        string setAside = body.y_axis;
                        string setAsideValue = setAside.Substring(setAside.LastIndexOf('_') + 1);
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@setAside", setAsideValue);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        //if (body.setAsideUNR == "SB")
                        //{
                        //    cmd1.Parameters.AddWithValue("@setAside", body.setAsideUNR);
                        //}
                        //else
                        //{
                        //    cmd1.Parameters.AddWithValue("@setAside", "");
                        //}

                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question19_AgencySpendingFY_WOSB_vs_SB_DataGrid")
                    {

                        var sp = body.store_procedure;
                        string setAside = body.y_axis;
                        string setAsideValue = setAside.Substring(setAside.LastIndexOf('_') + 1);
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@setAside", setAsideValue);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);


                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question20_AgencySpendingFY_SDVOSB_vs_SB_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        string setAside = body.y_axis;
                        string setAsideValue = setAside.Substring(setAside.LastIndexOf('_') + 1);
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@setAside", setAsideValue);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);


                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question21_AgencySpendingFY_HUBZONE_vs_SB_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        string setAside = body.y_axis;
                        string setAsideValue = setAside.Substring(setAside.LastIndexOf('_') + 1);
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@setAside", setAsideValue);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);

                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question26_AgencySpendingPlaceOfPerformance_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var sub_agency_code = string.IsNullOrEmpty(body.sub_agency_code) ? String.Empty : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);

                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_city", body.primary_place_of_performance_city);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_state_code", body.primary_place_of_performance_state_code);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_country_code", body.primary_place_of_performance_country_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                            widgetObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                            widgetObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                            widgetObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question29_TopContractsByAgency_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@total_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question31_GetTopVendorsWith8ASoleSourceContracts_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        //cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        //   cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question34_VendorContractInventory_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();

                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question35_GetSetAisdeUsage_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_agencies", body.total_agency);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question36_GetTopVendorsByAgencyNAICS_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.action_date_fiscal_year);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["contract_duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question37_GetTeammatesforAgencyNAICS_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        //cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.action_date_fiscal_year);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@minimum_number_of_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question38_GetCompetitorsByRFP_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.action_date_fiscal_year);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question39_GetVendorContractHistory")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {

                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question40_GetVehicleFundingDataGrid")
                    {

                        var sp = body.store_procedure;
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        else
                        {
                            officeCode = String.Empty;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@project_id", body.project_id);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@product_or_service_code", body.product_or_service_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {

                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question41_GetVehicleFundingDataGrid")
                    {

                        var sp = body.store_procedure;
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        else
                        {
                            officeCode = String.Empty;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@project_id", body.project_id);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {

                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question42_AgencySpendingFYSetAsideComparison_DataGrid")
                    {

                        var sp = body.store_procedure;
                        //string[] setAside = body.set_aside_2.Split(',');
                        //var set_aside_code1 = setAside[0].Trim();
                        //var set_aside_code2 = setAside[1].Trim();
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        else
                        {
                            officeCode = String.Empty;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question43_AgencySpendingFYSetAsideComparison_DataGrid")
                    {

                        var sp = body.store_procedure;
                        var subAgency_code = string.IsNullOrEmpty(body.sub_agency_code) ? body.funding_agency_code : body.sub_agency_code;
                        var office_code = !string.IsNullOrEmpty(body.sub_agency_code) ? body.funding_agency_code : String.Empty;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside_1);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question47_RecentlyAwardedContracts")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.referenced_idv_id = rdr["referenced_idv_id"].ToString();
                            widgetObject.contract_number = rdr["contract_number"].ToString();
                            widgetObject.idv_type = rdr["idv_type"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.base_and_all_options_total = Convert.ToDouble(rdr["base_and_all_options_total"]);
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);

                            widgetList.Add(widgetObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question53_GetSimplifiedAcquisitionContractsAgency_DataGrid")
                    {
                        var sp = body.store_procedure;
                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;
                        if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        //cmd1.Parameters.AddWithValue("@naics_code", String.IsNullOrEmpty(body.naics) ? "" : body.naics);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@contract_number", body.award_id_piid);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question56_ListofSetAsideContracts_DataGrid")
                    {
                        var sp = body.store_procedure;
                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;
                        if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question57_ContractsPlaceofPerformance_DataGrid")
                    {
                        var sp = body.store_procedure;
                        string agencyCode = String.Empty;
                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;

                        if (String.IsNullOrEmpty(body.agency_code))
                        {
                            agencyCode = body.funding_agency_code;
                        }
                        else if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            agencyCode = body.agency_code;
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            agencyCode = body.agency_code;
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@state_code", body.primary_place_of_performance_state_code);
                        cmd1.Parameters.AddWithValue("@city_name", body.primary_place_of_performance_city);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        //cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question58_OfficesUsedByAgency_DataGrid")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question61_GetProductServiceCodesAgencyNaics_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@product_or_service_code", body.product_or_service_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.year_expire = rdr["year_expire"].ToString();
                            widgetObject.contract_duration = rdr["contract_duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }
                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question63_GetTopVendorsByAgencyNAICS_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.year_expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["contract_duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();

                            widgetList.Add(widgetObject);
                        }
                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question68_SimplifiedAcquisition_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.referenced_idv_id = rdr["referenced_idv_id"].ToString();
                            widgetObject.contract_number = rdr["contract_number"].ToString();
                            widgetObject.idv_type = rdr["idv_type"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.base_and_all_options_total = Convert.ToDouble(rdr["base_and_all_options_total"]);
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);

                            widgetList.Add(widgetObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question69_GetTopVendors_GSAMAS_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        //cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        //   cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@action_date_fiscal_year", body.fiscal_year);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown2Response widgetObject = new question1DrillDown2Response();
                            widgetObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            widgetObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            widgetObject.modification_number = rdr["modification_number"].ToString();
                            widgetObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                            widgetObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            widgetObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            widgetObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            widgetObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            widgetObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            widgetObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            widgetObject.award_type = rdr["award_type"].ToString();
                            widgetObject.naics_code = Convert.ToInt32(rdr["naics_code"]);
                            widgetObject.naics_description = rdr["naics_description"].ToString();
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.base_and_all_options_value = 0;
                            widgetObject.base_and_all_options_value_k = 0;
                            widgetObject.federal_action_obligation = 0;
                            widgetObject.federal_action_obligation_k = 0;
                            widgetObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            widgetObject.solicitation_date = rdr["solicitation_date"].ToString();
                            widgetObject.action_date = rdr["action_date"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            DateTime enteredDate1 = DateTime.Parse(widgetObject.period_of_performance_start_date);
                            widgetObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            widgetObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            widgetObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            DateTime enteredDate2 = DateTime.Parse(widgetObject.period_of_performance_potential_end_date);
                            widgetObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            widgetObject.Year_Expire = rdr["Year_Expire"].ToString();
                            widgetObject.contract_duration = rdr["Contract_Duration"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.major_program = rdr["major_program"].ToString();
                            widgetObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            widgetObject.award_description = rdr["award_description"].ToString();
                            widgetObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            widgetObject.SB_Award = rdr["SB_Award"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            widgetObject.extent_competed = rdr["extent_competed"].ToString();
                            widgetObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            widgetObject.BusinessSize = rdr["BusinessSize"].ToString();
                            widgetObject.Contract_URL = rdr["Contract_URL"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    con.Close();

                    return widgetList;
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
                return widgetList;
            }
        }

        public List<VendorPlusContractInventoyResponse> ContractInventoryService(string vendor_uei, bool isExcel)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorPlusContractInventoyResponse> vendorList = new List<VendorPlusContractInventoyResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Vendor_Plus_ContractInventory";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    cmd1.Parameters.AddWithValue("@display_type", isExcel ? "Excel" : "DataGrid");
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorPlusContractInventoyResponse vendorObject = new VendorPlusContractInventoyResponse();
                        vendorObject.total_records = Convert.ToInt32(rdr["total_records"]);
                        vendorObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                        vendorObject.award_id_piid = rdr["award_id_piid"].ToString();
                        vendorObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                        vendorObject.modification_number = rdr["modification_number"].ToString();
                        vendorObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                        vendorObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                        vendorObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                        vendorObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                        vendorObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                        vendorObject.funding_office_code = rdr["funding_office_code"].ToString();
                        vendorObject.funding_office_name = rdr["funding_office_name"].ToString();
                        vendorObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                        vendorObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                        vendorObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                        vendorObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                        vendorObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                        vendorObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                        vendorObject.award_type = rdr["award_type"].ToString();
                        vendorObject.naics_code = typeChecker(rdr, "naics_code") ? 0 : Convert.ToInt32(rdr["naics_code"]);
                        vendorObject.naics_description = rdr["naics_description"].ToString();
                        vendorObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                        vendorObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                        vendorObject.base_and_all_options_value = 0;
                        vendorObject.base_and_all_options_value_k = 0;
                        vendorObject.federal_action_obligation = 0;
                        vendorObject.federal_action_obligation_k = 0;
                        vendorObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                        vendorObject.solicitation_date = rdr["type_of_contract_pricing"].ToString();
                        vendorObject.action_date = rdr["action_date"].ToString();
                        vendorObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                        vendorObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                        vendorObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                        vendorObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                        vendorObject.Year_Expire = rdr["Year_Expire"].ToString();
                        vendorObject.contract_duration = rdr["Contract_Duration"].ToString();
                        vendorObject.vendor_name = rdr["vendor_name"].ToString();
                        vendorObject.recipient_uei = rdr["recipient_uei"].ToString();
                        vendorObject.major_program = rdr["major_program"].ToString();
                        vendorObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                        vendorObject.award_description = rdr["award_description"].ToString();
                        vendorObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                        vendorObject.SB_Award = rdr["SB_Award"].ToString();
                        vendorObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                        vendorObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                        vendorObject.extent_competed = rdr["extent_competed"].ToString();
                        vendorObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                        vendorObject.BusinessSize = rdr["BusinessSize"].ToString();
                        vendorObject.Contract_URL = rdr["Contract_URL"].ToString();

                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return vendorList;
        }

        public dynamic typeChecker(SqlDataReader rdr, string value)
        {
            return rdr[value].GetType() == typeof(DBNull);
        }

        public List<ProjectList> fetchProjectList()
        {
            string error = String.Empty;
            List<ProjectList> projectList = new List<ProjectList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("Wizard_GetProjectList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    // cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        ProjectList projectObject = new ProjectList();
                        projectObject.Project_id = Convert.ToInt32(rdr["Project_id"]);
                        projectObject.project_name = rdr["project_name"].ToString();
                        projectList.Add(projectObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return projectList;
        }

        public List<OpportunityList> fetchOpportunityList(OpportunityListBody body, string UserID)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<OpportunityList> opportunityList = new List<OpportunityList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (body.store_procedure == "Wizard_Question44_RecentlyPostedSourcesSought_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@PostedDate", body.PostedDate);
                        cmd1.Parameters.AddWithValue("@naics_code", String.IsNullOrEmpty(body.naics_code) ? "" : body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", String.IsNullOrEmpty(body.department_code) ? "" : body.department_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", String.IsNullOrEmpty(body.funding_agency_code) ? "" : body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@product_or_service_code", String.IsNullOrEmpty(body.product_or_service_code) ? "" : body.product_or_service_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            OpportunityList opportunityObject = new OpportunityList();
                            opportunityObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            opportunityObject.max_record_count = Convert.ToInt32(rdr["max_record_count"]);
                            opportunityObject.NoticeId = rdr["NoticeId"].ToString();
                            opportunityObject.title = rdr["title"].ToString();
                            opportunityObject.Solicitation_Number = rdr["Solicitation_Number"].ToString();
                            opportunityObject.department_name = rdr["department_name"].ToString();
                            opportunityObject.agency_name = rdr["agency_name"].ToString();
                            opportunityObject.office_name = rdr["office_name"].ToString();
                            opportunityObject.PostedDate = rdr["PostedDate"].ToString();
                            opportunityObject.ArchiveDate = rdr["ArchiveDate"].ToString();
                            opportunityObject.set_aside_code = rdr["set_aside_code"].ToString();
                            opportunityObject.set_aside_description = rdr["set_aside_description"].ToString();
                            opportunityObject.naicss_code = rdr["naicss_code"].ToString();
                            opportunityObject.opportunity_type = rdr["opportunity_type"].ToString();
                            opportunityObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            opportunityObject.PrimaryContactTitle = rdr["PrimaryContactTitle"].ToString();
                            opportunityObject.PrimaryContactFullname = rdr["PrimaryContactFullname"].ToString();
                            opportunityObject.PrimaryContactEmail = rdr["PrimaryContactEmail"].ToString();
                            opportunityObject.PrimaryContactPhone = rdr["PrimaryContactPhone"].ToString();
                            opportunityObject.SecondaryContactFullname = rdr["SecondaryContactFullname"].ToString();
                            opportunityObject.SecondaryContactTitle = rdr["SecondaryContactTitle"].ToString();
                            opportunityObject.SecondaryContactEmail = rdr["SecondaryContactEmail"].ToString();
                            opportunityObject.SecondaryContactPhone = rdr["SecondaryContactPhone"].ToString();
                            opportunityObject.SAMLink = rdr["SAMLink"].ToString();
                            opportunityObject.Opportunity_description = rdr["Opportunity_description"].ToString();
                            opportunityList.Add(opportunityObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question50_OpportunityDistributionByOfficeDataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@posted_date", body.PostedDate);
                        cmd1.Parameters.AddWithValue("@posted_date_end", body.PostedDateEnd);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", String.IsNullOrEmpty(body.sub_agency_code) ? body.funding_agency_code : body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", String.IsNullOrEmpty(body.sub_agency_code) ? "" : body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@opportunity_type", body.opportunity_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            OpportunityList opportunityObject = new OpportunityList();
                            opportunityObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            opportunityObject.NoticeId = rdr["NoticeId"].ToString();
                            opportunityObject.title = rdr["title"].ToString();
                            opportunityObject.Solicitation_Number = rdr["Solicitation_Number"].ToString();
                            opportunityObject.department_name = rdr["department_name"].ToString();
                            opportunityObject.agency_name = rdr["agency_name"].ToString();
                            opportunityObject.office_name = rdr["office_name"].ToString();
                            opportunityObject.PostedDate = rdr["PostedDate"].ToString();
                            opportunityObject.ArchiveDate = rdr["ArchiveDate"].ToString();
                            opportunityObject.set_aside_code = rdr["set_aside_code"].ToString();
                            opportunityObject.set_aside_description = rdr["set_aside_description"].ToString();
                            opportunityObject.naicss_code = rdr["naicss_code"].ToString();
                            opportunityObject.opportunity_type = rdr["opportunity_type"].ToString();
                            opportunityObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            opportunityObject.PrimaryContactTitle = rdr["PrimaryContactTitle"].ToString();
                            opportunityObject.PrimaryContactFullname = rdr["PrimaryContactFullname"].ToString();
                            opportunityObject.PrimaryContactEmail = rdr["PrimaryContactEmail"].ToString();
                            opportunityObject.PrimaryContactPhone = rdr["PrimaryContactPhone"].ToString();
                            opportunityObject.SecondaryContactFullname = rdr["SecondaryContactFullname"].ToString();
                            opportunityObject.SecondaryContactTitle = rdr["SecondaryContactTitle"].ToString();
                            opportunityObject.SecondaryContactEmail = rdr["SecondaryContactEmail"].ToString();
                            opportunityObject.SecondaryContactPhone = rdr["SecondaryContactPhone"].ToString();
                            opportunityObject.SAMLink = rdr["SAMLink"].ToString();
                            opportunityObject.Opportunity_description = rdr["Opportunity_description"].ToString();
                            opportunityList.Add(opportunityObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question51_OpportunitiesSimilarToContract_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@product_or_service_code", "");
                        cmd1.Parameters.AddWithValue("@naisc_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@opportunity_type", body.opportunity_type);
                        cmd1.Parameters.AddWithValue("@posted_date", body.PostedDate);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            OpportunityList opportunityObject = new OpportunityList();
                            opportunityObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            opportunityObject.NoticeId = rdr["NoticeId"].ToString();
                            opportunityObject.title = rdr["title"].ToString();
                            opportunityObject.Solicitation_Number = rdr["Solicitation_Number"].ToString();
                            opportunityObject.department_name = rdr["department_name"].ToString();
                            opportunityObject.agency_name = rdr["agency_name"].ToString();
                            opportunityObject.office_name = rdr["office_name"].ToString();
                            opportunityObject.PostedDate = rdr["PostedDate"].ToString();
                            opportunityObject.ArchiveDate = rdr["ArchiveDate"].ToString();
                            opportunityObject.set_aside_code = rdr["set_aside_code"].ToString();
                            opportunityObject.set_aside_description = rdr["set_aside_description"].ToString();
                            opportunityObject.naicss_code = rdr["naicss_code"].ToString();
                            opportunityObject.opportunity_type = rdr["opportunity_type"].ToString();
                            opportunityObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            opportunityObject.PrimaryContactTitle = rdr["PrimaryContactTitle"].ToString();
                            opportunityObject.PrimaryContactFullname = rdr["PrimaryContactFullname"].ToString();
                            opportunityObject.PrimaryContactEmail = rdr["PrimaryContactEmail"].ToString();
                            opportunityObject.PrimaryContactPhone = rdr["PrimaryContactPhone"].ToString();
                            opportunityObject.SecondaryContactFullname = rdr["SecondaryContactFullname"].ToString();
                            opportunityObject.SecondaryContactTitle = rdr["SecondaryContactTitle"].ToString();
                            opportunityObject.SecondaryContactEmail = rdr["SecondaryContactEmail"].ToString();
                            opportunityObject.SecondaryContactPhone = rdr["SecondaryContactPhone"].ToString();
                            opportunityObject.SAMLink = rdr["SAMLink"].ToString();
                            opportunityObject.Opportunity_description = rdr["Opportunity_description"].ToString();
                            opportunityList.Add(opportunityObject);
                        }
                    }
                }
                con.Close();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return opportunityList;
        }

        public List<HdrList> fetchHdrList(HdrListBody body, string UserID)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<HdrList> hdrList = new List<HdrList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (body.store_procedure == "Wizard_Question_HDR_65_UEI_Expiration_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        string startdate = body.start_date;
                        if (body.start_date == null)
                        {
                            startdate = "";
                        }
                        /* if (body.start_date !=null) {
                             startdate = DateTime.ParseExact(body.start_date, "dd'.'MM'.'yyyy", CultureInfo.InvariantCulture).ToString("MM'/'dd'/yyyy");
                         }*/

                        string enddate = body.end_date;
                        if (body.end_date == null)
                        {
                            enddate = "";
                        }
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        cmd1.Parameters.AddWithValue("@start_date", startdate);
                        cmd1.Parameters.AddWithValue("@end_date", enddate);
                        cmd1.Parameters.AddWithValue("@jv", body.jv);
                        cmd1.Parameters.AddWithValue("@office_location", body.office_location);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            HdrList hdrObject = new HdrList();
                            hdrObject.vendor_name = rdr["vendor_name"].ToString();
                            hdrObject.JV = rdr["JV"].ToString();
                            hdrObject.UEI = rdr["UEI"].ToString();
                            //hdrObject.CPARS = Convert.ToInt32(rdr["CPARS"]) == DBNull.Value ? null : Convert.ToInt64(rdr["CPARS"]);
                            //if (!((rdr["CPARS"]) is DBNull))
                            //	hdrObject.idiq_active = Convert.ToInt64(rdr["CPARS"]);
                            hdrObject.CPARS = rdr["CPARS"].ToString();
                            hdrObject.idiq_active = rdr["idiq_active"].ToString();
                            hdrObject.idiq_expired = rdr["idiq_expired"].ToString();
                            hdrObject.idiq_total = rdr["idiq_total"].ToString();
                            hdrObject.single_idiq = rdr["single_idiq"].ToString();
                            hdrObject.Multiple_IDIQ = rdr["Multiple_IDIQ"].ToString();
                            hdrObject.TO_Active = rdr["TO_Active"].ToString();
                            hdrObject.TO_Expired = rdr["TO_Expired"].ToString();
                            hdrObject.TO_Total = rdr["TO_Total"].ToString();
                            hdrObject.immediate_owner_name = rdr["immediate_owner_name"].ToString();
                            hdrObject.highest_level_owner = rdr["highest_level_owner"].ToString();
                            hdrObject.reg_expire_date = rdr["reg_expire_date"].ToString();
                            DateTime enteredDate = DateTime.Parse(hdrObject.reg_expire_date);
                            hdrObject.reg_expire_date = enteredDate.ToString("MM/dd/yy");
                            hdrObject.cage = rdr["cage"].ToString();
                            hdrObject.tax_id_number = rdr["tax_id_number"].ToString();
                            hdrObject.DUNS = rdr["DUNS"].ToString();
                            hdrObject.office_location = rdr["office_location"].ToString();
                            hdrObject.status = rdr["status"].ToString();
                            hdrObject.action = rdr["action"].ToString();
                            hdrObject.address = rdr["address"].ToString();
                            hdrObject.city = rdr["city"].ToString();
                            hdrObject.state = rdr["state"].ToString();
                            hdrObject.zip = rdr["zip"].ToString();
                            hdrObject.notes = rdr["notes"].ToString();
                            hdrObject.updated_at = rdr["updated_at"].ToString();

                            hdrList.Add(hdrObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question_HDR_66_CPARS_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_name", body.agency_name);
                        cmd1.Parameters.AddWithValue("@start_date", body.expiration_date_start);
                        cmd1.Parameters.AddWithValue("@end_date", body.expiration_date_end);
                        cmd1.Parameters.AddWithValue("@display_type", "DataGrid");
                        cmd1.Parameters.AddWithValue("@UEI", body.UEI);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            HdrList hdrObject = new HdrList();
                            hdrObject.vendor_name = rdr["vendor_name"].ToString();
                            hdrObject.AGENCY_NAME = rdr["AGENCY_NAME"].ToString();
                            hdrObject.QUALITY_RATING = rdr["QUALITY_RATING"].ToString();
                            hdrObject.SCHEDULE_RATING = rdr["SCHEDULE_RATING"].ToString();
                            hdrObject.COST_CONTROL_RATING = rdr["COST_CONTROL_RATING"].ToString();
                            hdrObject.MANAGEMENT_RATING = rdr["MANAGEMENT_RATING"].ToString();
                            hdrObject.SMALL_BUSINESS_RATING = rdr["SMALL_BUSINESS_RATING"].ToString();
                            hdrObject.REGULATORY_COMPLIANCE_RATING = rdr["REGULATORY_COMPLIANCE_RATING"].ToString();
                            hdrObject.UNIQUE_ENTITY_ID = rdr["UNIQUE_ENTITY_ID"].ToString();
                            hdrObject.CONTRACT_NUMBER = rdr["CONTRACT_NUMBER"].ToString();
                            hdrObject.CONTRACT_ORDER_NUMBER = rdr["CONTRACT_ORDER_NUMBER"].ToString();
                            hdrObject.ASSESSING_OFFICIAL_RECOMMEND = rdr["ASSESSING_OFFICIAL_RECOMMEND"].ToString();
                            hdrObject.ASSESSING_OFFICIAL_SIGNED_DATE = rdr["ASSESSING_OFFICIAL_SIGNED_DATE"].ToString();
                            hdrList.Add(hdrObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question_HDR_67_CPARS_DataGrid")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@award_id_piid", body.award_id_piid);
                        cmd1.Parameters.AddWithValue("@parent_award_id_piid", body.parent_award_id_piid);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            HdrList hdrObject = new HdrList();
                            hdrObject.vendor_name = rdr["vendor_name"].ToString();
                            hdrObject.AGENCY_NAME = rdr["AGENCY_NAME"].ToString();
                            hdrObject.QUALITY_RATING = rdr["QUALITY_RATING"].ToString();
                            hdrObject.SCHEDULE_RATING = rdr["SCHEDULE_RATING"].ToString();
                            hdrObject.COST_CONTROL_RATING = rdr["COST_CONTROL_RATING"].ToString();
                            hdrObject.MANAGEMENT_RATING = rdr["MANAGEMENT_RATING"].ToString();
                            hdrObject.SMALL_BUSINESS_RATING = rdr["SMALL_BUSINESS_RATING"].ToString();
                            hdrObject.REGULATORY_COMPLIANCE_RATING = rdr["REGULATORY_COMPLIANCE_RATING"].ToString();
                            hdrObject.UNIQUE_ENTITY_ID = rdr["UNIQUE_ENTITY_ID"].ToString();
                            hdrObject.CONTRACT_NUMBER = rdr["CONTRACT_NUMBER"].ToString();
                            hdrObject.CONTRACT_ORDER_NUMBER = rdr["CONTRACT_ORDER_NUMBER"].ToString();
                            hdrObject.ASSESSING_OFFICIAL_RECOMMEND = rdr["ASSESSING_OFFICIAL_RECOMMEND"].ToString();
                            hdrObject.ASSESSING_OFFICIAL_SIGNED_DATE = rdr["ASSESSING_OFFICIAL_SIGNED_DATE"].ToString();
                            hdrList.Add(hdrObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question_HDR_67_Obligations_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@award_id_piid", body.award_id_piid);
                        cmd1.Parameters.AddWithValue("@parent_award_id_piid", body.parent_award_id_piid);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@includeTaskOrders", body.includeTaskOrders);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            HdrList hdrObject = new HdrList();
                            //hdrObject.total_records = Convert.ToInt32(rdr["total_records"]);
                            hdrObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            hdrObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            hdrObject.award_id_piid = rdr["award_id_piid"].ToString();
                            hdrObject.modification_number = rdr["modification_number"].ToString();
                            hdrObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            hdrObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            hdrObject.funding_office_name = rdr["funding_office_name"].ToString();
                            hdrObject.naics_code = rdr["naics_code"].ToString();
                            hdrObject.naics_description = rdr["naics_description"].ToString();
                            hdrObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            hdrObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            hdrObject.base_and_all_options_value = 0;
                            hdrObject.federal_action_obligation = 0;
                            hdrObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            hdrObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            hdrObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            hdrObject.funding_office_code = rdr["funding_office_code"].ToString();
                            hdrObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            hdrObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            hdrObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            hdrObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            hdrObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            hdrObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            hdrObject.award_type = rdr["award_type"].ToString();
                            hdrObject.base_and_all_options_value_k = 0;
                            hdrObject.federal_action_obligation_k = 0;
                            hdrObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            hdrObject.solicitation_date = rdr["solicitation_date"].ToString();
                            hdrObject.action_date = rdr["action_date"].ToString();
                            hdrObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            hdrObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            if (hdrObject.period_of_performance_start_date != "")
                            {
                                DateTime enteredDate1 = DateTime.Parse(hdrObject.period_of_performance_start_date);
                                hdrObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            }
                            hdrObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            hdrObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            if (hdrObject.period_of_performance_potential_end_date != "")
                            {
                                DateTime enteredDate2 = DateTime.Parse(hdrObject.period_of_performance_potential_end_date);
                                hdrObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            }
                            hdrObject.year_expire = rdr["year_expire"].ToString();
                            hdrObject.contract_duration = rdr["contract_duration"].ToString();
                            hdrObject.vendor_name = rdr["vendor_name"].ToString();
                            hdrObject.recipient_uei = rdr["recipient_uei"].ToString();
                            hdrObject.major_program = rdr["major_program"].ToString();
                            hdrObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            hdrObject.award_description = rdr["award_description"].ToString();
                            hdrObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            //hdrObject.SB_Award = rdr["SB_Award"].ToString();
                            hdrObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            hdrObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            hdrObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            hdrObject.BusinessSize = rdr["BusinessSize"].ToString();
                            hdrObject.Contract_URL = rdr["Contract_URL"].ToString();
                            hdrObject.action_to_take = rdr["action_to_take"].ToString();
                            hdrObject.idiq_status = rdr["idiq_status"].ToString();
                            hdrObject.updated_at = rdr["updated_at"].ToString();
                            hdrObject.uei = rdr["uei"].ToString();
                            hdrObject.notes = rdr["notes"].ToString();

                            hdrList.Add(hdrObject);
                        }
                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                }
                con.Close();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return hdrList;
        }

        public List<HdrList> fetchHdrDrilldownList(HdrListBody body, string UserID)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<HdrList> hdrList = new List<HdrList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (body.store_procedure == "Wizard_Question_HDR_IDIQ_DrillDown")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@UEI", body.UEI);
                        cmd1.Parameters.AddWithValue("@drilldown_type", body.drilldown_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            HdrList hdrObject = new HdrList();
                            hdrObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                            hdrObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                            hdrObject.award_id_piid = rdr["award_id_piid"].ToString();
                            hdrObject.modification_number = rdr["modification_number"].ToString();
                            hdrObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            hdrObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            hdrObject.funding_office_name = rdr["funding_office_name"].ToString();
                            hdrObject.naics_code = rdr["naics_code"].ToString();
                            hdrObject.naics_description = rdr["naics_description"].ToString();
                            hdrObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            hdrObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            hdrObject.base_and_all_options_value = 0;
                            hdrObject.federal_action_obligation = 0;
                            hdrObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                            hdrObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            hdrObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            hdrObject.funding_office_code = rdr["funding_office_code"].ToString();
                            hdrObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                            hdrObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                            hdrObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                            hdrObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                            hdrObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                            hdrObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                            hdrObject.award_type = rdr["award_type"].ToString();
                            hdrObject.base_and_all_options_value_k = 0;
                            hdrObject.federal_action_obligation_k = 0;
                            hdrObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                            hdrObject.solicitation_date = rdr["solicitation_date"].ToString();
                            hdrObject.action_date = rdr["action_date"].ToString();
                            hdrObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            hdrObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                            if (hdrObject.period_of_performance_start_date != "")
                            {
                                DateTime enteredDate1 = DateTime.Parse(hdrObject.period_of_performance_start_date);
                                hdrObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                            }
                            hdrObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                            hdrObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                            if (hdrObject.period_of_performance_potential_end_date != "")
                            {
                                DateTime enteredDate2 = DateTime.Parse(hdrObject.period_of_performance_potential_end_date);
                                hdrObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                            }
                            hdrObject.year_expire = rdr["year_expire"].ToString();
                            hdrObject.contract_duration = rdr["contract_duration"].ToString();
                            hdrObject.vendor_name = rdr["vendor_name"].ToString();
                            hdrObject.recipient_uei = rdr["recipient_uei"].ToString();
                            hdrObject.major_program = rdr["major_program"].ToString();
                            hdrObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                            hdrObject.award_description = rdr["award_description"].ToString();
                            hdrObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                            hdrObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            hdrObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                            hdrObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                            hdrObject.BusinessSize = rdr["BusinessSize"].ToString();
                            hdrObject.Contract_URL = rdr["Contract_URL"].ToString();
                            hdrObject.action_to_take = rdr["action_to_take"].ToString();
                            hdrObject.idiq_status = rdr["idiq_status"].ToString();
                            hdrObject.updated_at = rdr["updated_at"].ToString();
                            hdrObject.uei = rdr["uei"].ToString();
                            hdrObject.notes = rdr["notes"].ToString();
                            hdrList.Add(hdrObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question_HDR_CPARS_UEI_DataGrid")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@UEI", body.UEI);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            HdrList hdrObject = new HdrList();
                            hdrObject.vendor_name = rdr["vendor_name"].ToString();
                            hdrObject.AGENCY_NAME = rdr["AGENCY_NAME"].ToString();
                            hdrObject.QUALITY_RATING = rdr["QUALITY_RATING"].ToString();
                            hdrObject.SCHEDULE_RATING = rdr["SCHEDULE_RATING"].ToString();
                            hdrObject.COST_CONTROL_RATING = rdr["COST_CONTROL_RATING"].ToString();
                            hdrObject.MANAGEMENT_RATING = rdr["MANAGEMENT_RATING"].ToString();
                            hdrObject.SMALL_BUSINESS_RATING = rdr["SMALL_BUSINESS_RATING"].ToString();
                            hdrObject.REGULATORY_COMPLIANCE_RATING = rdr["REGULATORY_COMPLIANCE_RATING"].ToString();
                            hdrObject.UNIQUE_ENTITY_ID = rdr["UNIQUE_ENTITY_ID"].ToString();
                            hdrObject.CONTRACT_NUMBER = rdr["CONTRACT_NUMBER"].ToString();
                            hdrObject.CONTRACT_ORDER_NUMBER = rdr["CONTRACT_ORDER_NUMBER"].ToString();
                            hdrObject.ASSESSING_OFFICIAL_RECOMMEND = rdr["ASSESSING_OFFICIAL_RECOMMEND"].ToString();
                            hdrObject.ASSESSING_OFFICIAL_SIGNED_DATE = rdr["ASSESSING_OFFICIAL_SIGNED_DATE"].ToString();
                            DateTime enteredDate = DateTime.Parse(hdrObject.ASSESSING_OFFICIAL_SIGNED_DATE);
                            hdrObject.ASSESSING_OFFICIAL_SIGNED_DATE = enteredDate.ToString("MM/dd/yy");
                            hdrList.Add(hdrObject);
                        }
                    }
                }
                con.Close();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return hdrList;
        }

    }
}