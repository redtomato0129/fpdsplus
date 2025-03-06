using System;
using System.Collections.Generic;

namespace FedPipelineApplication.Models
{
    public class StoreProcedureBody
    {
        public int question_id { get; set; }
        public string total_vendors { get; set; }
        public int total_offices { get; set; }
        public int naics_code { get; set; }
        public string agency_code { get; set; }
        public string sub_agency_code { get; set; }
        public string office_code { get; set; }
        public string business_size { get; set; }
        public string socio_economic_designation { get; set; }
        public string store_procedure { get; set; }
        public string years { get; set; }
        public string solicitation_number { get; set; }
        public string minimum_contract_size { get; set; }
        public string maximum_contract_size { get; set; }
        public int minimum_number_of_contracts { get; set; }
        public int total_agency { get; set; }
        public string set_aside_code { get; set; }
        public string set_aside { get; set; }
        public string expire_date_start { get; set; }
        public string expire_date_end { get; set; }
        public string primary_place_of_performance_city { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string primary_place_of_performance_country_code { get; set; }
        public int total_contracts { get; set; }
        public int total_agencies { get; set; }
        public string idiq_selection { get; set; }
        public string expiration_date { get; set; }
        public string vendor_uei { get; set; }
        public string set_aside_1 { get; set; }
        public string set_aside_2 { get; set; }
        public int project_id { get; set; }
        public string PostedDate { get; set; }
        public string PostedDateEnd { get; set; }
        public string naics { get; set; }
        public string department_code { get; set; }
        public string expiration_date_start { get; set; }
        public string expiration_date_end { get; set; }
        public string opportunity_type { get; set; }
        public string contract_number { get; set; }
        public string display_type { get; set; }
        public string search_text { get; set; }
        public string product_or_service_code { get; set; }
        public string agency_name { get; set; }

    }
    public class question1Response
    {
        public string vendor_uei { get; set; }
        public string recipient_uei { get; set; }
        public string funding_agency_code { get; set; }
        public string funding_agency_name { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string funding_office_code { get; set; }
        public string funding_office_name { get; set; }
        public string vendor_name { get; set; }
        public string recipient_name { get; set; }
        public double total_base_and_all_options { get; set; }
        public double total_obligations { get; set; }
        public int number_of_contracts { get; set; }
        public double base_and_all_options_total { get; set; }
        public double total_dollars_obligated { get; set; }
        public string type_of_set_aside { get; set; }
        public double base_and_all_options_UNR { get; set; }
        public double base_and_all_options_SETASIDE { get; set; }
        public double total_dollars_obligated_UNR { get; set; }
        public double total_dollars_obligated_SETASIDE { get; set; }
        public double base_and_all_options_8A { get; set; }
        public double base_and_all_options_SB { get; set; }
        public double total_dollars_obligated_8A { get; set; }
        public double total_dollars_obligated_SB { get; set; }
        public double base_and_all_options_WOSB { get; set; }
        public double total_dollars_obligated_WOSB { get; set; }
        public double base_and_all_options_SDVOSB { get; set; }
        public double total_dollars_obligated_SDVOSB { get; set; }
        public double base_and_all_options_HUBZONE { get; set; }
        public double total_dollars_obligated_HUBZONE { get; set; }
        public double base_and_all_options { get; set; }
        public string agency_code { get; set; }
        public string agency_name { get; set; }
        public int contracts { get; set; }
        public string sp_type { get; set; }
        public string set_aside_code { get; set; }
        public string set_aside { get; set; }
        public string set_aside_code1 { get; set; }
        public string set_aside_code2 { get; set; }
        public string data_type { get; set; }
        public string naics_code { get; set; }
        public int fao_count { get; set; }
        public string type_of_set_aside1 { get; set; }
        public string type_of_set_aside2 { get; set; }
        public double base_and_all_options_1 { get; set; }
        public double base_and_all_options_2 { get; set; }
        public double total_dollars_obligated_1 { get; set; }
        public double total_dollars_obligated_2 { get; set; }
        public int total_notices { get; set; }
        public int total_UEIs { get; set; }
        public string department_code { get; set; }
        public string department_name { get; set; }
        public string agency { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public string UEI { get; set; }
    }
    public class StoreProcedureDrillDown1Body
    {
        public string vendor_uei { get; set; }
        public string recipient_uei { get; set; }
        public string naics_code { get; set; }
        public string agency_code { get; set; }
        public string sub_agency_code { get; set; }
        public string office_code { get; set; }
        public string funding_office_code { get; set; }
        public string funding_agency_code { get; set; }
        public string store_procedure { get; set; }
        public string business_size { get; set; }
        public string socio_economic_designation { get; set; }
        public string minimum_contract_size { get; set; }
        public string maximum_contract_size { get; set; }
        public int minimum_number_of_contracts { get; set; }
        public int years { get; set; }
        public int total_vendors { get; set; }
        public string solicitation_number { get; set; }
        public int total_offices { get; set; }
        public string set_aside_code { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string expire_date_start { get; set; }
        public string expire_date_end { get; set; }
        public string primary_place_of_performance_city { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string primary_place_of_performance_country_code { get; set; }
        public int total_contracts { get; set; }
        public int total_agency { get; set; }
        public string s_aside_code { get; set; }
        public string set_aside { get; set; }
        public string expiration_date { get; set; }
        public string idiq_selection { get; set; }
        public int project_id { get; set; }
        public string set_aside_1 { get; set; }
        public string set_aside_2 { get; set; }
        public string expiration_date_start { get; set; }
        public string expiration_date_end { get; set; }
        public string y_axis { get; set; }
        public string opportunity_type { get; set; }
    }
    public class question1DrillDown1Response
    {
        public string vendor_uei { get; set; }
        public string action_date_fiscal_year { get; set; }
        public int funding_agency_code { get; set; }
        public string funding_agency_name { get; set; }
        public int funding_sub_agency_code { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string funding_office_code { get; set; }
        public string funding_office_name { get; set; }
        public string vendor_name { get; set; }
        public double total_base_and_all_options { get; set; }
        public double total_obligations { get; set; }
        public string solicitation_number { get; set; }
        public string set_aside_code { get; set; }
        public string set_aside { get; set; }
        public string data_type { get; set; }
        public string contract_year { get; set; }
        public string contract_number { get; set; }
        public int number_of_contracts { get; set; }
        public int total_contracts { get; set; }
        public string start_date_fiscal_year { get; set; }
        public string fiscal_year_earliest_start_date { get; set; }
        public double base_and_all_options_total { get; set; }
        public double total_dollars_obligated { get; set; }
        public string type_of_set_aside { get; set; }
        public string award_id_piid { get; set; }
        public string fiscal_year { get; set; }
        public double base_and_all_options_UNR { get; set; }
        public double base_and_all_options_SETASIDE { get; set; }
        public double total_dollars_obligated_UNR { get; set; }
        public double total_dollars_obligated_SETASIDE { get; set; }
        public double base_and_all_options_8A { get; set; }
        public double base_and_all_options_SB { get; set; }
        public double total_dollars_obligated_8A { get; set; }
        public double total_dollars_obligated_SB { get; set; }
        public double base_and_all_options_WOSB { get; set; }
        public double total_dollars_obligated_WOSB { get; set; }
        public double base_and_all_options_SDVOSB { get; set; }
        public double total_dollars_obligated_SDVOSB { get; set; }
        public double base_and_all_options_HUBZONE { get; set; }
        public double total_dollars_obligated_HUBZONE { get; set; }
        public double base_and_all_options { get; set; }
        public string recipient_uei { get; set; }
        public string recipient_name { get; set; }
        public string sp_type { get; set; }
        public string agency_code { get; set; }
        public string agency_name { get; set; }
        public string sub_agency_code { get; set; }
        public string legal_business_name { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public string LEGAL_BUSINESS_NAME { get; set; }
        public string type_of_set_aside1 { get; set; }
        public string type_of_set_aside2 { get; set; }
        public string set_aside_code1 { get; set; }
        public string transaction_id { get; set; }
        public double base_and_all_options_1 { get; set; }
        public double base_and_all_options_2 { get; set; }
        public double total_dollars_obligated_1 { get; set; }
        public double total_dollars_obligated_2 { get; set; }
    }
    public class StoreProcedureDrillDown2Body
    {
        public string UEI { get; set; }
        public string vendor_uei { get; set; }
        public string recipient_uei { get; set; }
        public string naics_code { get; set; }
        public string agency_code { get; set; }
        public string sub_agency_code { get; set; }
        public string office_code { get; set; }
        public string action_date_fiscal_year { get; set; }
        public string fiscal_year { get; set; }
        public string store_procedure { get; set; }
        public string solicitation_number { get; set; }
        public string minimum_contract_size { get; set; }
        public string maximum_contract_size { get; set; }
        public string minimum_number_of_contracts { get; set; }
        public string socio_economic_designation { get; set; }
        public string years { get; set; }
        public string business_size { get; set; }
        public string expiration_year { get; set; }
        public string expiration_date { get; set; }
        public int total_offices { get; set; }
        public int total_agency { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string funding_office_code { get; set; }
        public string funding_agency_code { get; set; }
        public string award_id_piid { get; set; }
        public string set_aside_code { get; set; }
        public string setAsideUNR { get; set; }
        public string setAside { get; set; }
        public string fiscal_year_earliest_start_date { get; set; }
        public string expire_date_start { get; set; }
        public string expire_date_end { get; set; }
        public string primary_place_of_performance_city { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string primary_place_of_performance_country_code { get; set; }
        public int total_contracts { get; set; }
        public int total_vendors { get; set; }
        public string contract_number { get; set; }
        public string display_type { get; set; }
        public string set_aside { get; set; }
        public string set_aside_1 { get; set; }
        public string idiq_selection { get; set; }
        public int project_id { get; set; }
        public string product_or_service_code { get; set; }
        public string expiration_date_start { get; set; }
        public string expiration_date_end { get; set; }
        public string y_axis { get; set; }
        public string opportunity_type { get; set; }
        public string vendor_name { get; set; }
        public string agency_name { get; set; }
        public string company_name { get; set; }
    }
    public class question1DrillDown2Response
    {
        public int total_records { get; set; }
        public int transaction_id { get; set; }
        public string award_id_piid { get; set; }
        public string parent_award_id_piid { get; set; }
        public string modification_number { get; set; }
        public string funding_agency_name { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string funding_office_name { get; set; }
        public int naics_code { get; set; }
        public string naics_description { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public double base_and_all_options_value { get; set; }
        public double federal_action_obligation { get; set; }
        public string solicitation_identifier { get; set; }
        public string funding_agency_code { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string funding_office_code { get; set; }
        public string awarding_agency_code { get; set; }
        public string awarding_agency_name { get; set; }
        public string awarding_sub_agency_code { get; set; }
        public string awarding_sub_agency_name { get; set; }
        public string awarding_office_code { get; set; }
        public string awarding_office_name { get; set; }
        public string award_type { get; set; }
        public double base_and_all_options_value_k { get; set; }
        public double federal_action_obligation_k { get; set; }
        public string type_of_contract_pricing { get; set; }
        public string solicitation_date { get; set; }
        public string action_date { get; set; }
        public string action_date_fiscal_year { get; set; }
        public string period_of_performance_start_date { get; set; }
        public string period_of_performance_current_end_date { get; set; }
        public string period_of_performance_potential_end_date { get; set; }
        public string year_expire { get; set; }
        public string Year_Expire { get; set; }
        public string contract_duration { get; set; }
        public string vendor_name { get; set; }
        public string vendor_uei { get; set; }
        public string recipient_uei { get; set; }
        public string major_program { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string award_description { get; set; }
        public string extent_competed { get; set; }
        public string solicitation_procedures { get; set; }
        public string SB_Award { get; set; }
        public string type_of_set_aside { get; set; }
        public string fed_biz_opps { get; set; }
        public string number_of_offers_received { get; set; }
        public string BusinessSize { get; set; }
        public string Contract_URL { get; set; }

        //extra fields for Question 2
        public double total_dollars_obligated { get; set; }
        public double base_and_all_options_total { get; set; }

        //extra fields for Question 3
        public int fao_count { get; set; }
        public string contract_start_date { get; set; }
        public string fiscal_year_start { get; set; }

        //extra fields for Question 6
        public string expire_year { get; set; }

        //extra fields for Question 8
        public int wizard_agency_contract_total_id { get; set; }
        public double federal_action_obligations { get; set; }
        public int baao_count { get; set; }
        public string contract_end_date { get; set; }
        public string fiscal_year_end { get; set; }

        //extra fields for Question 9
        public double total_base_and_all_options_value { get; set; }
        public double base_and_all_options { get; set; }

        //extra fields for Question 65
        public string JV { get; set; }
        public string UEI { get; set; }
        public string immediate_owner_name { get; set; }
        public string highest_level_owner { get; set; }
        public string reg_expire_date { get; set; }
        public string cage { get; set; }
        public string tax_id_number { get; set; }
        public string DUNS { get; set; }
        public string office_location { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string notes { get; set; }

        //extra fields for Question 66
        public string AGENCY_NAME { get; set; }
        public string QUALITY_RATING { get; set; }
        public string SCHEDULE_RATING { get; set; }
        public string COST_CONTROL_RATING { get; set; }
        public string MANAGEMENT_RATING { get; set; }
        public string SMALL_BUSINESS_RATING { get; set; }
        public string REGULATORY_COMPLIANCE_RATING { get; set; }
        public string UNIQUE_ENTITY_ID { get; set; }
        public string CONTRACT_NUMBER { get; set; }
        public string CONTRACT_ORDER_NUMBER { get; set; }
        public string ASSESSING_OFFICIAL_RECOMMEND { get; set; }
        public string ASSESSING_OFFICIAL_SIGNED_DATE { get; set; }
        public string referenced_idv_id { get; set; }
        public string contract_number { get; set; }
        public string idv_type { get; set; }

    }
    public class FdpsList
    {
        public string Contract_ID { get; set; }
        public string Referenced_IDV_ID { get; set; }
        public string solicitation_identifier { get; set; }
        public string date_signed { get; set; }
        public string earliest_start_date { get; set; }
        public string latest_period_of_performance_potential_end_date { get; set; }
        public string modification_number { get; set; }
        public string latest_modification_number { get; set; }
        public string federal_action_obligation { get; set; }
        public string base_and_all_options_value { get; set; }
        public string total_dollars_obligated { get; set; }
        public string total_base_and_all_options { get; set; }
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
        public string awarding_office_code { get; set; }
        public string awarding_office_name { get; set; }
        public string recipient_uei { get; set; }
        public string recipient_name { get; set; }
        public string INITIAL_REGISTRATION_DATE { get; set; }
        public string EXPIRATION_DATE { get; set; }
        public string PHYSICAL_ADDRESS_LINE_1 { get; set; }
        public string PHYSICAL_ADDRESS_LINE_2 { get; set; }
        public string PHYSICAL_ADDRESS_PROVINCE_OR_STATE { get; set; }
        public string PHYSICAL_ADDRESS_ZIP_POSTAL_CODE { get; set; }
        public string PHYSICAL_ADDRESS_COUNTRY_CODE { get; set; }
        public string PHYSICAL_ADDRESS_CITY { get; set; }
        public string naics_code_registrations { get; set; }
        public string business_registrations { get; set; }
        public string type_of_contract_pricing { get; set; }
        public string type_of_contract_pricing_code { get; set; }
        public string major_program { get; set; }
        public string primary_place_of_performance_city_name { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string primary_place_of_performance_country_name { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public string naics_code { get; set; }
        public string naics_description { get; set; }
        public string award_description { get; set; }
        public string extent_competed { get; set; }
        public string solicitation_procedures { get; set; }
        public string type_of_set_aside_code { get; set; }
        public string type_of_set_aside { get; set; }
        public string usaspending_permalink { get; set; }
        public string idv_type_code { get; set; }
        public string idv_type { get; set; }
        public string fair_opportunity_limited_sources_code { get; set; }
        public string fair_opportunity_limited_sources { get; set; }
    }
    public class WizardQuestionList
    {
        public int question_id { get; set; }
        public string question_name { get; set; }
        public string description { get; set; }
        public int agency { get; set; }
        public int contract { get; set; }
        public int vendor { get; set; }
        public int opportunity { get; set; }
        public int hdr { get; set; }
        public string ui_style { get; set; }
        public string instance { get; set; }
        public int skip_charts { get; set; }
    }
    public class WizardQuestionParamsList
    {
        public int wizard_question_parameter_id { get; set; }
        public int question_id { get; set; }
        public int parameter_id { get; set; }
        public int required_field { get; set; }
        public string question_name { get; set; }
        public string description { get; set; }
        public string ui_style { get; set; }
        public string parameter_name { get; set; }
        public string parameter_type { get; set; }
        public string parameter_data { get; set; }
        public string parameter_query_param { get; set; }
        public int toggle_button { get; set; }
        public List<ProjectList> ProjectList { get; set; }

    }
    public class WidgetDasboardWidgetsPayload
    {
        public int question_id { get; set; }
        public int page_number { get; set; }
    }
    public class WizardDashboardWidgetsList
    {
        public int wizard_question_widget_id { get; set; }
        public int question_id { get; set; }
        public int widget_id { get; set; }
        public string widget_name { get; set; }
        public string store_procedure { get; set; }
        public int wizard_widget_type_id { get; set; }
        public string wizard_widget_type_type { get; set; }
        public string wizard_widget_type_url { get; set; }
        public string question_name { get; set; }
        public string description { get; set; }
        public int page_number { get; set; }
        public string x_axis { get; set; }
        public string y_axis { get; set; }
        public string x_axis_label { get; set; }
        public string y_axis_label { get; set; }
        public string y_axis_line_label { get; set; }
        public string y_axis_line { get; set; }
        public string y_axis_bar_label { get; set; }
        public string widget_help_description { get; set; }
        public string widget_currency_field { get; set; }
        public string query_params_key { get; set; }
        public string query_params_field { get; set; }
    }
    public class WizardWidgetTableCoumnList
    {
        public int wizard_widget_table_column_id { get; set; }
        public string header_name { get; set; }
        public string field { get; set; }
        public string column_color { get; set; }
        public int widget_id { get; set; }
        public int data_grid { get; set; }
        public int column_currency_field { get; set; }
        public int isLabel { get; set; }
    }
    public class HelpList
    {
        public int question_id { get; set; }
        public string page_name { get; set; }
        public string description { get; set; }
    }
    public class VendorList
    {
        public string vendor_uei { get; set; }
        public string vendor_name_uei { get; set; }

    }
    public class AgencyName
    {
        public string agency_name { get; set; }

    }
    public class CompanyName
    {
        public string operating_company { get; set; }
        public string uei { get; set; }

    }
    public class OpportunityTypeList
    {
        public string opportunity_type { get; set; }

    }
    public class OpportunityPlusList
    {
        public string NoticeId { get; set; }
        public string Title { get; set; }
        public string Solicitation_Number { get; set; }
        public string Department_IndAgency { get; set; }
        public string department_code { get; set; }
        public string department_name { get; set; }
        public string agency_code { get; set; }
        public string office_name { get; set; }
        public string office_code { get; set; }
        public string PostedDate { get; set; }
        public string Type { get; set; }
        public string BaseType { get; set; }
        public string ArchiveType { get; set; }
        public string ArchiveDate { get; set; }
        public string SetASideCode { get; set; }
        public string SetASide { get; set; }
        public string ResponseDeadLine { get; set; }
        public string NaicsCode { get; set; }
        public string ClassificationCode { get; set; }
        public string PopStreetAddress { get; set; }
        public string PopCity { get; set; }
        public string PopState { get; set; }
        public string PopZip { get; set; }
        public string PopCountry { get; set; }
        public string Active { get; set; }
        public string AwardNumber { get; set; }
        public string AwardDate { get; set; }
        public string Award { get; set; }
        public string Awardee { get; set; }
        public string PrimaryContactTitle { get; set; }
        public string PrimaryContactFullname { get; set; }
        public string PrimaryContactEmail { get; set; }
        public string PrimaryContactPhone { get; set; }
        public string PrimaryContactFax { get; set; }
        public string SecondaryContactFullname { get; set; }
        public string SecondaryContactTitle { get; set; }
        public string SecondaryContactEmail { get; set; }
        public string SecondaryContactPhone { get; set; }
        public string SecondaryContactFax { get; set; }
        public string OrganizationType { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string CountryCode { get; set; }
        public string AdditionalInfoLink { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public string award_number { get; set; }
        public string InsertedDateTime { get; set; }

    }
    public class SetAsideList
    {
        public string Business_type_description { get; set; }
        public string abbreviation { get; set; }

    }
    public class ContractMods
    {
        public string contract_transaction_id { get; set; }
        public string contract_modification_number { get; set; }
        public string contract_action_date { get; set; }
        public string contract_base_and_all_options_value { get; set; }
        public string contract_federal_action_obligation { get; set; }
    }
    public class VendorPlusResponse
    {
        public string vendor_uei { get; set; }
        public string Cage { get; set; }
        public string EXPIRATION_DATE { get; set; }
        public string INITIAL_REGISTRATION_DATE { get; set; }
        public string LEGAL_BUSINESS_NAME { get; set; }
        public string PHYSICAL_ADDRESS_LINE_1 { get; set; }
        public string PHYSICAL_ADDRESS_LINE_2 { get; set; }
        public string PHYSICAL_ADDRESS_CITY { get; set; }
        public string PHYSICAL_ADDRESS_PROVINCE_OR_STATE { get; set; }
        public string PHYSICAL_ADDRESS_ZIP_POSTAL_CODE { get; set; }
        public string PHYSICAL_ADDRESS_ZIP_CODE { get; set; }
        public string PHYSICAL_ADDRESS_COUNTRY_CODE { get; set; }
        public string MAILING_ADDRESS_LINE_1 { get; set; }
        public string MAILING_ADDRESS_LINE_2 { get; set; }
        public string MAILING_ADDRESS_CITY { get; set; }
        public string MAILING_ADDRESS_STATE_OR_PROVINCE { get; set; }
        public string MAILING_ADDRESS_ZIP_CODE { get; set; }
        public string GOVT_BUS_POC_FIRST_NAME { get; set; }
        public string GOVT_BUS_POC_LAST_NAME { get; set; }
        public string GOVT_BUS_POC_ST_ADD_1 { get; set; }
        public string GOVT_BUS_POC_TITLE { get; set; }
        public string GOVT_BUS_POC_CITY { get; set; }
        public string GOVT_BUS_POC_ZIP_POSTAL_CODE { get; set; }
        public string GOVT_BUS_POC_STATE_OR_PROVINCE { get; set; }
        public string PRIMARY_NAICS { get; set; }
        public string BUSINESS_TYPE { get; set; }
        public string NAICS_CODE { get; set; }
        public string CORPORATE_URL { get; set; }
        public string BUsiness_Start_date { get; set; }
        public string Fiscal_Year_End_Close_Date { get; set; }
        public string Entity_Structure { get; set; }
        public string NAICS { get; set; }
        public string description { get; set; }
        public string Small_For_NAICS { get; set; }
    }
    public class VendorPlusSocioEconomicResponse
    {
        public string socio_economic_designation { get; set; }
    }
    public class VendorPlusNAICSResponse
    {
        public string NAICS { get; set; }
        public string description { get; set; }
        public string Small_For_NAICS { get; set; }
    }
	public class VendorPlusObligationsResponse
	{
		public double action_obligation_total { get; set; }
		public string fiscal_year { get; set; }
	}
	public class VendorPlusContractInventoyResponse
    {
        public int total_records { get; set; }
        public int transaction_id { get; set; }
        public string award_id_piid { get; set; }
        public string parent_award_id_piid { get; set; }
        public string modification_number { get; set; }
        public string funding_agency_name { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string funding_office_name { get; set; }
        public int naics_code { get; set; }
        public string naics_description { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public double base_and_all_options_value { get; set; }
        public double federal_action_obligation { get; set; }
        public string solicitation_identifier { get; set; }
        public string funding_agency_code { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string funding_office_code { get; set; }
        public string awarding_agency_code { get; set; }
        public string awarding_agency_name { get; set; }
        public string awarding_sub_agency_code { get; set; }
        public string awarding_sub_agency_name { get; set; }
        public string awarding_office_code { get; set; }
        public string awarding_office_name { get; set; }
        public string award_type { get; set; }
        public double base_and_all_options_value_k { get; set; }
        public double federal_action_obligation_k { get; set; }
        public string type_of_contract_pricing { get; set; }
        public string solicitation_date { get; set; }
        public string action_date { get; set; }
        public string action_date_fiscal_year { get; set; }
        public string period_of_performance_start_date { get; set; }
        public string period_of_performance_current_end_date { get; set; }
        public string period_of_performance_potential_end_date { get; set; }
        public string year_expire { get; set; }
        public string Year_Expire { get; set; }
        public string contract_duration { get; set; }
        public string vendor_name { get; set; }
        public string vendor_uei { get; set; }
        public string recipient_uei { get; set; }
        public string major_program { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string award_description { get; set; }
        public string extent_competed { get; set; }
        public string solicitation_procedures { get; set; }
        public string SB_Award { get; set; }
        public string type_of_set_aside { get; set; }
        public string fed_biz_opps { get; set; }
        public string number_of_offers_received { get; set; }
        public string BusinessSize { get; set; }
        public string Contract_URL { get; set; }

        //extra fields for Question 2
        public double total_dollars_obligated { get; set; }
        public double base_and_all_options_total { get; set; }

        //extra fields for Question 3
        public int fao_count { get; set; }
        public string contract_start_date { get; set; }
        public string fiscal_year_start { get; set; }

        //extra fields for Question 6
        public string expire_year { get; set; }

        //extra fields for Question 8
        public int wizard_agency_contract_total_id { get; set; }
        public double federal_action_obligations { get; set; }
        public int baao_count { get; set; }
        public string contract_end_date { get; set; }
        public string fiscal_year_end { get; set; }

        //extra fields for Question 9
        public double total_base_and_all_options_value { get; set; }
        public double base_and_all_options { get; set; }
    }
    public class EasyContractSearch
    {
        public string transaction_id { get; set; }
        public string award_id_piid { get; set; }
        public string parent_award_id_piid { get; set; }
        public string contract_search { get; set; }
    }
    public class VendorPlusQuestionResponse
    {
        public int vendor_question_result_id { get; set; }
        public string question { get; set; }
        public string vendor_uei { get; set; }
        public string description { get; set; }
        public string link { get; set; }
    }
    public class WizardWidgetExcelCoumnList
    {
        public int wizard_widget_table_column_id { get; set; }
        public string header_name { get; set; }
        public string field { get; set; }
        public string column_color { get; set; }
        public int widget_id { get; set; }
        public int data_grid { get; set; }
        public int column_currency_field { get; set; }
    }
    public class ExcelBodyResponse
    {
        public int transaction_id { get; set; }
        public string award_id_piid { get; set; }
        public string parent_award_id_piid { get; set; }
        public string modification_number { get; set; }
        public string funding_agency_name { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string funding_office_name { get; set; }
        public int naics_code { get; set; }
        public string naics_description { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public double base_and_all_options_value { get; set; }
        public double federal_action_obligation { get; set; }
        public string solicitation_identifier { get; set; }
        public string funding_agency_code { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string funding_office_code { get; set; }
        public string awarding_agency_code { get; set; }
        public string awarding_agency_name { get; set; }
        public string awarding_sub_agency_code { get; set; }
        public string awarding_sub_agency_name { get; set; }
        public string awarding_office_code { get; set; }
        public string awarding_office_name { get; set; }
        public string award_type { get; set; }
        public double base_and_all_options_value_k { get; set; }
        public double federal_action_obligation_k { get; set; }
        public string type_of_contract_pricing { get; set; }
        public string solicitation_date { get; set; }
        public string action_date { get; set; }
        public string action_date_fiscal_year { get; set; }
        public string period_of_performance_start_date { get; set; }
        public string period_of_performance_current_end_date { get; set; }
        public string period_of_performance_potential_end_date { get; set; }
        public string year_expire { get; set; }
        public string contract_duration { get; set; }
        public string vendor_name { get; set; }
        public string recipient_uei { get; set; }
        public string major_program { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string award_description { get; set; }
        public string extent_competed { get; set; }
        public string solicitation_procedures { get; set; }
        public string SB_Award { get; set; }
        public string type_of_set_aside { get; set; }
        public string fed_biz_opps { get; set; }
        public string number_of_offers_received { get; set; }
        public string BusinessSize { get; set; }
        public string Contract_URL { get; set; }

    }
    public class ExcelPayLoad
    {
        public static List<WizardWidgetExcelCoumnList> excelHeader { get; set; }
        public static List<ExcelBodyResponse> excelBody { get; set; }
    }
    public class ProjectList
    {
        public int Project_id { get; set; }
        public string project_name { get; set; }
    }
    public class OpportunityListBody
    {
        public string store_procedure { get; set; }
        public string PostedDate { get; set; }
        public string PostedDateEnd { get; set; }
        public string naics_code { get; set; }
        public string department_code { get; set; }
        public string funding_agency_code { get; set; }
        public string agency_code { get; set; }
        public string sub_agency_code { get; set; }
        public string office_code { get; set; }
        public string opportunity_type { get; set; }
        public string product_or_service_code { get; set; }
        public string set_aside { get; set; }
        public string display_type { get; set; }
    }
    public class OpportunityList
    {
        public int total_records { get; set; }
        public int max_record_count { get; set; }
        public string NoticeId { get; set; }
        public string title { get; set; }
        public string Solicitation_Number { get; set; }
        public string department_name { get; set; }
        public string agency_name { get; set; }
        public string office_name { get; set; }
        public string PostedDate { get; set; }
        public string ArchiveDate { get; set; }
        public string set_aside_code { get; set; }
        public string set_aside_description { get; set; }
        public string naicss_code { get; set; }
        public string opportunity_type { get; set; }
        public string product_or_service_code { get; set; }
        public string PrimaryContactTitle { get; set; }
        public string PrimaryContactFullname { get; set; }
        public string PrimaryContactEmail { get; set; }
        public string PrimaryContactPhone { get; set; }
        public string SecondaryContactFullname { get; set; }
        public string SecondaryContactTitle { get; set; }
        public string SecondaryContactEmail { get; set; }
        public string SecondaryContactPhone { get; set; }
        public string SAMLink { get; set; }
        public string Opportunity_description { get; set; }

    }
    public class HdrList
    {
        public int total_records { get; set; }
        public int transaction_id { get; set; }
        public string award_id_piid { get; set; }
        public string parent_award_id_piid { get; set; }
        public string modification_number { get; set; }
        public string funding_agency_name { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string funding_office_name { get; set; }
        public string naics_code { get; set; }
        public string naics_description { get; set; }
        public string product_or_service_code { get; set; }
        public string product_or_service_code_description { get; set; }
        public double base_and_all_options_value { get; set; }
        public double federal_action_obligation { get; set; }
        public string solicitation_identifier { get; set; }
        public string funding_agency_code { get; set; }
        public string funding_sub_agency_code { get; set; }
        public string funding_office_code { get; set; }
        public string awarding_agency_code { get; set; }
        public string awarding_agency_name { get; set; }
        public string awarding_sub_agency_code { get; set; }
        public string awarding_sub_agency_name { get; set; }
        public string awarding_office_code { get; set; }
        public string awarding_office_name { get; set; }
        public string award_type { get; set; }
        public double base_and_all_options_value_k { get; set; }
        public double federal_action_obligation_k { get; set; }
        public string type_of_contract_pricing { get; set; }
        public string solicitation_date { get; set; }
        public string action_date { get; set; }
        public string action_date_fiscal_year { get; set; }
        public string period_of_performance_start_date { get; set; }
        public string period_of_performance_current_end_date { get; set; }
        public string period_of_performance_potential_end_date { get; set; }
        public string year_expire { get; set; }
        public string Year_Expire { get; set; }
        public string contract_duration { get; set; }
        public string vendor_name { get; set; }
        public string vendor_uei { get; set; }
        public string recipient_uei { get; set; }
        public string major_program { get; set; }
        public string primary_place_of_performance_state_code { get; set; }
        public string award_description { get; set; }
        public string extent_competed { get; set; }
        public string solicitation_procedures { get; set; }
        public string SB_Award { get; set; }
        public string type_of_set_aside { get; set; }
        public string fed_biz_opps { get; set; }
        public string number_of_offers_received { get; set; }
        public string BusinessSize { get; set; }
        public string Contract_URL { get; set; }
        public string action_to_take { get; set; }
        public string idiq_status { get; set; }
        public string uei { get; set; }

        //extra fields for Question 2
        public double total_dollars_obligated { get; set; }
        public double base_and_all_options_total { get; set; }

        //extra fields for Question 3
        public int fao_count { get; set; }
        public string contract_start_date { get; set; }
        public string fiscal_year_start { get; set; }

        //extra fields for Question 6
        public string expire_year { get; set; }

        //extra fields for Question 8
        public int wizard_agency_contract_total_id { get; set; }
        public double federal_action_obligations { get; set; }
        public int baao_count { get; set; }
        public string contract_end_date { get; set; }
        public string fiscal_year_end { get; set; }

        //extra fields for Question 9
        public double total_base_and_all_options_value { get; set; }
        public double base_and_all_options { get; set; }

        //extra fields for Question 65
        public string JV { get; set; }
        public string UEI { get; set; }
        public string CPARS { get; set; }
        public string idiq_active { get; set; }
        public string idiq_expired { get; set; }
        public string idiq_total { get; set; }
        public string single_idiq { get; set; }
        public string Multiple_IDIQ { get; set; }
        public string TO_Active { get; set; }
        public string TO_Expired { get; set; }
        public string TO_Total { get; set; }
        public string immediate_owner_name { get; set; }
        public string highest_level_owner { get; set; }
        public string reg_expire_date { get; set; }
        public string cage { get; set; }
        public string tax_id_number { get; set; }
        public string DUNS { get; set; }
        public string office_location { get; set; }
        public string status { get; set; }
        public string action { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string notes { get; set; }
        public string updated_at { get; set; }

        //extra fields for Question 66
        public string AGENCY_NAME { get; set; }
        public string QUALITY_RATING { get; set; }
        public string SCHEDULE_RATING { get; set; }
        public string COST_CONTROL_RATING { get; set; }
        public string MANAGEMENT_RATING { get; set; }
        public string SMALL_BUSINESS_RATING { get; set; }
        public string REGULATORY_COMPLIANCE_RATING { get; set; }
        public string UNIQUE_ENTITY_ID { get; set; }
        public string CONTRACT_NUMBER { get; set; }
        public string CONTRACT_ORDER_NUMBER { get; set; }
        public string ASSESSING_OFFICIAL_RECOMMEND { get; set; }
        public string ASSESSING_OFFICIAL_SIGNED_DATE { get; set; }

    }
    public class HdrListBody
    {
        public string store_procedure { get; set; }
        public string display_type { get; set; }
        public string vendor_name { get; set; }
        public string agency_name { get; set; }
        public string expiration_date_start { get; set; }
        public string expiration_date_end { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
        public string UEI { get; set; }
        public string company_name { get; set; }
        public string award_id_piid { get; set; }
        public string parent_award_id_piid { get; set; }
        public string search_text { get; set; }
        public string jv { get; set; }
        public string office_location { get; set; }
        public string includeTaskOrders { get; set; }
        public string drilldown_type { get; set; }

    }
    public class CparsList
    {
        public string CONTRACT_NUMBER { get; set; }
        public string UEI { get; set; }
        public string vendor_name { get; set; }
        public string agency_name { get; set; }
        public int total_CPARS { get; set; }
        public string Quality_Rating_Exceptional { get; set; }
        public string Quality_Rating_VeryGood { get; set; }
        public string Quality_Rating_Satisfactory { get; set; }
        public string Quality_Rating_Marginal { get; set; }
        public string Quality_Rating_UNSat { get; set; }
        public string Quality_Rating_NA { get; set; }
        public string Schedule_Rating_Exceptional { get; set; }
        public string Schedule_Rating_VeryGood { get; set; }
        public string Schedule_Rating_Satisfactory { get; set; }
        public string Schedule_Rating_Marginal { get; set; }
        public string Schedule_Rating_UNSat { get; set; }
        public string Schedule_Rating_NA { get; set; }
        public string Cost_Control_Rating_Exceptional { get; set; }
        public string Cost_Control_Rating_VeryGood { get; set; }
        public string Cost_Control_Rating_Satisfactory { get; set; }
        public string Cost_Control_Rating_Marginal { get; set; }
        public string Cost_Control_Rating_UNSat { get; set; }
        public string Cost_Control_Rating_NA { get; set; }
        public string Management_Rating_Exceptional { get; set; }
        public string Management_Rating_VeryGood { get; set; }
        public string Management_Rating_Satisfactory { get; set; }
        public string Management_Rating_Marginal { get; set; }
        public string Management_Rating_UNSat { get; set; }
        public string Management_Rating_NA { get; set; }
        public string Small_Business_Rating_Exceptional { get; set; }
        public string Small_Business_Rating_VeryGood { get; set; }
        public string Small_Business_Rating_Satisfactory { get; set; }
        public string Small_Business_Rating_Marginal { get; set; }
        public string Small_Business_Rating_UNSat { get; set; }
        public string Small_Business_Rating_NA { get; set; }
        public string Regulatory_Compliance_Rating_Exceptional { get; set; }
        public string Regulatory_Compliance_Rating_VeryGood { get; set; }
        public string Regulatory_Compliance_Rating_Satisfactory { get; set; }
        public string Regulatory_Compliance_Rating_Marginal { get; set; }
        public string Regulatory_Compliance_Rating_UNSat { get; set; }
        public string Regulatory_Compliance_Rating_NA { get; set; }

    }
}