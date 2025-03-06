using System;

namespace FedPipelineApplication.Models
{
    public class AppUserReport
    {
        public int app_user_report_id { get; set; }
        public int app_user_id { get; set; }
        public string app_report_name { get; set; }
        public string app_report_path { get; set; }
        public bool global_report { get; set; }
        public DateTime? app_report_datetime { get; set; }
        public string app_report_note { get; set; }
    }
}