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
    public class TaxonomyPSCController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
		public ActionResult Index()
        {
            return View();
        }
		
        public string NaicsPscTaxonomy(string agency_code, string sub_agency_code, string office_code, string naics_code, string psc_code, int years)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<NaicsPscList> npList = new List<NaicsPscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_NAICS_PSCTaxonomy";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@agency_code", agency_code);
                    cmd1.Parameters.AddWithValue("@sub_agency_code", sub_agency_code);
                    cmd1.Parameters.AddWithValue("@office_code", office_code);
                    cmd1.Parameters.AddWithValue("@naics_code", naics_code);
                    cmd1.Parameters.AddWithValue("@psc_code", psc_code);
                    cmd1.Parameters.AddWithValue("@years", years);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        NaicsPscList npObject = new NaicsPscList();
						if (naics_code != "" && psc_code == "")
                        {
                            npObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            npObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                        }
						else if (naics_code == "" && psc_code != "")
                        {
                            npObject.naics_code = rdr["naics_code"].ToString();
                            npObject.naics_description = rdr["naics_description"].ToString();
                        }
                        npObject.total_uses = Convert.ToInt32(rdr["total_uses"]);
                        npList.Add(npObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = npList });
        }

		public string GetPSCList(string search_text)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<NaicsPscList> npList = new List<NaicsPscList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "app_GetPSCList";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@Code", search_text);
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						NaicsPscList npObject = new NaicsPscList();
						npObject.product_or_service_code = rdr["code"].ToString();
                        npObject.product_or_service_code_description = rdr["description"].ToString();
						npList.Add(npObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = npList });
		}

		public class NaicsPscList
        {
            public string naics_code { get; set; }
            public string naics_description { get; set; }
            public string product_or_service_code { get; set; }
            public string product_or_service_code_description { get; set; }
            public int total_uses { get; set; }
        }
    }
}