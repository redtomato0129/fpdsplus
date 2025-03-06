using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace FedPipelineApplication
{
    public class ErrorLog
    {
        Utility obj = new Utility();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        public string StoreErrorLog(ErrorLogs ErrorParams)
        {
            string result = "";
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd1 = new SqlCommand(Common.app_Log_StoreErrorLog, con))
                    {
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@UserID", ErrorParams.UserID);
                        cmd1.Parameters.AddWithValue("@base_and_all_options_value", ErrorParams.base_and_all_options_value);
                        cmd1.Parameters.AddWithValue("@business_size", ErrorParams.business_size);
                        cmd1.Parameters.AddWithValue("@DUNS", ErrorParams.DUNS);
                        cmd1.Parameters.AddWithValue("@department_code", ErrorParams.department_code);
                        cmd1.Parameters.AddWithValue("@FY", ErrorParams.FY);
                        cmd1.Parameters.AddWithValue("@FY_End", ErrorParams.FY_End);
                        cmd1.Parameters.AddWithValue("@stored_procedure", ErrorParams.stored_procedure);
                        cmd1.Parameters.AddWithValue("@created_datetime", ErrorParams.created_datetime);
                        cmd1.Parameters.AddWithValue("@setAside", ErrorParams.setAside);
                        cmd1.Parameters.AddWithValue("@keyword_list", ErrorParams.keyword_list);
                        cmd1.Parameters.AddWithValue("@posted_date_end", ErrorParams.posted_date_end);
                        cmd1.Parameters.AddWithValue("@posted_date_start", ErrorParams.posted_date_start);
                        cmd1.Parameters.AddWithValue("@Referance_IDV", ErrorParams.Referance_IDV);


                        int n = cmd1.ExecuteNonQuery();

                        if (n != 0)
                        { result = "success"; }
                    }
                }
            }
            catch (Exception ex)
            {

                result = ex.Message;
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(result);
        }

        public class ErrorLogs
        {
            public string UserID { get; set; }
            public string base_and_all_options_value { get; set; }
            public string business_size { get; set; }
            public string DUNS { get; set; }
            public string department_code { get; set; }
            public string FY { get; set; }
            public string FY_End { get; set; }
            public string stored_procedure { get; set; }
            public string created_datetime { get; set; }
            public string setAside { get; set; }
            public string keyword_list { get; set; }
            public string posted_date_end { get; set; }
            public string posted_date_start { get; set; }
            public string Referance_IDV { get; set; }
        }
    }
}