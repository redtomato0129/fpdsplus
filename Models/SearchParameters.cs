using System;

namespace FedPipelineApplication.Models
{
    public class SearchParameters
    {
        public string business_size { get; set; }
        public string funding_agency_code_list { get; set; }
        public string funding_sub_agency_code_list { get; set; }
        public string funding_office_list { get; set; }
        public string awarding_agency_code_list { get; set; }
        public string awarding_sub_agency_code_list { get; set; }
        public string awarding_office_list { get; set; }
        public string naics_code_list { get; set; }
        public bool naics_family { get; set; }
        public string psc_code_list { get; set; }
        public string solicitation_procedure_code { get; set; }
        public string FY_start { get; set; }
        public string FY_end { get; set; }
        public decimal minimum_contract_size { get; set; }
        public string socio_economic_list { get; set; }
        public int excel_report_id { get; set; }
        public DateTime created_datetime { get; set; }
        public string email_address { get; set; }
        public string vendor_name { get; set; }
        public string cage { get; set; }
        public string report_notes { get; set; }
        public string keywords { get; set; }
    }
}