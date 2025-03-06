namespace FedPipelineApplication.Models
{
    public class ContractSearch
    {
        public class ContractSimpleSearch
        {
            public string award_id { get; set; }
            public string referenced_idv_id { get; set; }
            public string modification_number { get; set; }
            public string base_and_all_options_value { get; set; }
            public string FY { get; set; }
            public string FY_End { get; set; }
            public string department_code { get; set; }
            public string department_name { get; set; }
            public string agency_code { get; set; }
            public string agency_name { get; set; }
            public string uei { get; set; }
            public string NAICS { get; set; }
            public string PSC { get; set; }
            public string PSC_Description { get; set; }
            public string type_of_set_aside { get; set; }
            public string usaspending_permalink { get; set; }
            public string ContractNumber { get; set; }
            public string type_of_contract_pricing { get; set; }

            public string naics_family { get; set; }
            public string business_type_code_list { get; set; }
            public string business_size { get; set; }
            public string legal_business_name { get; set; }
            public string award_description { get; set; }
            public string cageCodePrimary { get; set; }
            public string solicitation_code { get; set; }
            public string solicitation_name { get; set; }
            public string funding_office_code { get; set; }
            public string funding_office_name { get; set; }
            public string awarding_agency_code { get; set; }
            public string awarding_agency_name { get; set; }
            public string awarding_sub_agency_code { get; set; }
            public string awarding_subagency_name { get; set; }
            public string awarding_office_code { get; set; }
            public string awarding_office_name { get; set; }

            public string transaction_id { get; set; }
            //user//
            public string UserID { get; set; }

        }
    }
}