using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Web.Mvc;
using FedPipelineApplication.Models;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Web.UI.WebControls.Expressions;


namespace FedPipelineApplication.Controllers
{
    public class TaxonomyUNSPSCController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
		public ActionResult Index()
        {
            return View();
        }
		public string GetSegmentList(string search_text)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<unspscList> segmentList = new List<unspscList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_getUNSPSCSegmentListSearch";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@search_text", search_text);
                    con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
                        unspscList unspscObject = new unspscList();
                        unspscObject.segment = rdr["segment"].ToString();
                        unspscObject.segmentname = rdr["segmentname"].ToString();
                        segmentList.Add(unspscObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = segmentList });
		}

        public string GetFamilyList(string segment, string search_text, string search_type)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<unspscList> familyList = new List<unspscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_getUNSPSCFamilyListSearch";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@segment", segment);
                    cmd1.Parameters.AddWithValue("@search_text", search_text);
                    cmd1.Parameters.AddWithValue("@search_type", search_type);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        unspscList unspscObject = new unspscList();
                        unspscObject.family = rdr["family"].ToString();
                        unspscObject.familyname = rdr["familyname"].ToString();
                        unspscObject.SEWP_VI_Note = rdr["SEWP_VI_Note"].ToString();
                        unspscObject.total_rows = Convert.ToInt32(rdr["total_rows"]);
                        familyList.Add(unspscObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = familyList });
        }

        public string GetClassList(string family, string search_text, string search_type)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<unspscList> classList = new List<unspscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_getUNSPSCClassListSearch";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@family", family);
                    cmd1.Parameters.AddWithValue("@search_text", search_text);
                    cmd1.Parameters.AddWithValue("@search_type", search_type);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        unspscList unspscObject = new unspscList();
                        unspscObject.classNo = rdr["class"].ToString();
                        unspscObject.classname = rdr["classname"].ToString();
                        unspscObject.SEWP_VI_Note = rdr["SEWP_VI_Note"].ToString();
                        unspscObject.total_rows = Convert.ToInt32(rdr["total_rows"]);
                        classList.Add(unspscObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = classList });
        }

        public string GetCommodityList(string classNo)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<unspscList> commodityList = new List<unspscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_getUNSPSCcommodityList";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@class", classNo);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        unspscList unspscObject = new unspscList();
                        unspscObject.Commodity = rdr["Commodity"].ToString();
                        unspscObject.CommodityName = rdr["CommodityName"].ToString();
                        unspscObject.SEWP_VI_Note = rdr["SEWP_VI_Note"].ToString();
                        unspscObject.total_rows = Convert.ToInt32(rdr["total_rows"]);
                        commodityList.Add(unspscObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = commodityList });
        }

        public string SearchCommodityList(string search_text)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<unspscList> commodityList = new List<unspscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_getUNSPSCcommodity_Search";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@search_text", search_text);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        unspscList unspscObject = new unspscList();
                        unspscObject.Commodity = rdr["Commodity"].ToString();
                        unspscObject.CommodityName = rdr["CommodityName"].ToString();
                        unspscObject.SEWP_VI_Note = rdr["SEWP_VI_Note"].ToString();
                        unspscObject.total_rows = Convert.ToInt32(rdr["total_rows"]);
                        commodityList.Add(unspscObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = commodityList });
        }

        public string GetCommodityCode(string commodity)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<unspscList> commodityList = new List<unspscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_getUNSPSCcommoditycode";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@commodity", commodity);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        unspscList unspscObject = new unspscList();
                        unspscObject.Commodity = rdr["Commodity"].ToString();
                        unspscObject.CommodityName = rdr["CommodityName"].ToString();
                        unspscObject.segment = rdr["segment"].ToString();
                        unspscObject.segmentname = rdr["segmentname"].ToString();
                        unspscObject.family = rdr["family"].ToString();
                        unspscObject.familyname = rdr["familyname"].ToString();
                        unspscObject.classNo = rdr["class"].ToString();
                        unspscObject.classname = rdr["classname"].ToString();
                        commodityList.Add(unspscObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = commodityList });
        }

        public string GetCommodityItem(string commodity_name)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<unspscList> commodityList = new List<unspscList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_getUNSPSCcommodityitem";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@commodity_name", commodity_name);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        unspscList unspscObject = new unspscList();
                        unspscObject.Commodity = rdr["Commodity"].ToString();
                        unspscObject.CommodityName = rdr["CommodityName"].ToString();
                        unspscObject.segment = rdr["segment"].ToString();
                        unspscObject.segmentname = rdr["segmentname"].ToString();
                        unspscObject.family = rdr["family"].ToString();
                        unspscObject.familyname = rdr["familyname"].ToString();
                        unspscObject.classNo = rdr["class"].ToString();
                        unspscObject.classname = rdr["classname"].ToString();
                        commodityList.Add(unspscObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = commodityList });
        }


        public class unspscList
		{
			public string segment { get; set; }
			public string segmentname { get; set; }
            public string family { get; set; }
            public string familyname { get; set; }
            public string classNo { get; set; }
            public string classname { get; set; }
            public string Commodity { get; set; }
            public string CommodityName { get; set; }
            public string SEWP_VI_Note { get; set; }
            public int total_rows { get; set; }

        }
        
    }
}