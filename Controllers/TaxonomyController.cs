using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Web.Mvc;
using FedPipelineApplication.Models;
using System.Web.Script.Serialization;
using System.Configuration;


namespace FedPipelineApplication.Controllers
{
    public class TaxonomyController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
		public ActionResult Index()
        {
            return View();
        }
		public string GetAgencyListSearch(string funding_agency_code, string search_text)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<AgencyList> agencyList = new List<AgencyList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "app_GetAgencyListSearch";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@funding_agency_code", funding_agency_code);
					cmd1.Parameters.AddWithValue("@search_text", string.IsNullOrEmpty(search_text)? "All": search_text);
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						AgencyList agencyObject = new AgencyList();
						agencyObject.funding_agency_name = rdr["funding_agency_name"].ToString();
						agencyObject.funding_agency_code = rdr["funding_agency_code"].ToString();
						agencyObject.total_records = Convert.ToInt32(rdr["total_records"]);
						agencyList.Add(agencyObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = agencyList });
		}

		public string GetOfficeListSearch(string agency_code, string search_text)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<OfficeList> officeList = new List<OfficeList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "app_GetOfficeListSearch";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@agency_code", agency_code);
					cmd1.Parameters.AddWithValue("@search_text", search_text);
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						OfficeList officeObject = new OfficeList();
						officeObject.total_records = Convert.ToInt32(rdr["total_records"]);
						officeObject.office_name = rdr["office_name"].ToString();
						officeObject.office_code = rdr["office_code"].ToString();
						officeList.Add(officeObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = officeList });
		}

        public class AgencyList
		{
			public string funding_agency_name { get; set; }
			public string funding_agency_code { get; set; }
			public int total_records { get; set; }
		}
		public class OfficeList
		{
			public int total_records { get; set; }
			public string office_name { get; set; }
			public string office_code { get; set; }
		}
        
    }
}