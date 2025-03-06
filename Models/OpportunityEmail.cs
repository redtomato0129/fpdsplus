using System;

namespace FedPipelineApplication.Models
{
    public class OpportunityEmail
    {
        public int id { get; set; }
        public string solicitation_number { get; set; }
        public string naics_code { get; set; }
        public string naics_description { get; set; }
        public string service_code { get; set; }
        public string service_description { get; set; }
        public string funding_agency { get; set; }
        public string funding_sub_agency { get; set; }
        public string funding_agency_name { get; set; }
        public string funding_sub_agency_name { get; set; }
        public string keyword { get; set; }
        public string socio_economic_designation { get; set; }
        public string socio_economic_designation_name { get; set; }
        public string base_type { get; set; }
        public DateTime created_datetime { get; set; }
        public string email_address { get; set; }
        public int userid { get; set; }
        public string daily_report_name { get; set; }
        public int naics_family { get; set; }

    }
}