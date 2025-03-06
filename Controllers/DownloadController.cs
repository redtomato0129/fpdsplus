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
    public class DownloadController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

		public ActionResult Index()
        {
            return View();
        }

		public string GetReports()
		{
			var error = string.Empty;
			var response = string.Empty;
			List<DownloadList> downloadList = new List<DownloadList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_getwizardReports";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						DownloadList downloadObject = new DownloadList();
						downloadObject.name = rdr["name"].ToString();
						downloadObject.description = rdr["description"].ToString();
						downloadObject.url = rdr["url"].ToString();
						downloadList.Add(downloadObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = downloadList });
		}

		public class DownloadList
		{
			public string name { get; set; }
			public string description { get; set; }
			public string url { get; set; }
		}

	}
}