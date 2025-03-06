using System;
using System.Data;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;


namespace FedPipelineApplication.Controllers
{
    public class CmiNewsController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();


        // GET: CmiNews
        public ActionResult Index()
        {
            return View();
        }


        public string CmiList(string startDate, string endDate, string searchText)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<CmiNews> cmilist = new List<CmiNews>();
            string UserDomain = Session["User_Domain"].ToString();
            try
            { 
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                   
                    var sp = string.IsNullOrEmpty(searchText) ? "cri_get_export_news_by_date" : "cri_search_export_news_by_date";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;                   
                    cmd1.Parameters.AddWithValue("@startDate", startDate);
                    cmd1.Parameters.AddWithValue("@endDate", endDate);
                    if (!string.IsNullOrEmpty(searchText))
                    {
                        cmd1.Parameters.AddWithValue("@search_text", searchText);
                    }
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        CmiNews CmiNewsGet = new CmiNews();
                        CmiNewsGet.news_export_id = Convert.ToInt32(rdr["news_export_id"]);
                        CmiNewsGet.keyword = rdr["keyword"].ToString();
                        CmiNewsGet.title = rdr["title"].ToString();
                        CmiNewsGet.detail_page = rdr["detail_page"].ToString();
                        CmiNewsGet.description = rdr["description"].ToString();
                        CmiNewsGet.source_website = rdr["source_website"].ToString();
                        CmiNewsGet.client_id = rdr["client_id"].ToString();
                        CmiNewsGet.article_age = rdr["article_age"].ToString();
                        CmiNewsGet.scraping_date_time = rdr["scraping_date_time"].ToString();
                        CmiNewsGet.news_link = rdr["news_link"].ToString();
                        CmiNewsGet.article_summary = rdr["article_summary"].ToString();
                        CmiNewsGet.article_summary_status = rdr["article_summary_status"] == DBNull.Value ? 0 :Convert.ToInt32(rdr["article_summary_status"]);
                        cmilist.Add(CmiNewsGet);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = cmilist });
        }

        public string CmiWebsiteList()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<CmiWebsitesList> cmiWebsiteList = new List<CmiWebsitesList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "cmi_master_all_website_list";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        CmiWebsitesList cmiWebsites = new CmiWebsitesList();
                        cmiWebsites.cmi_master_website_list_id = Convert.ToInt32(rdr["cmi_master_website_list_id"]);
                        cmiWebsites.website_url = rdr["website_url"].ToString();
                        cmiWebsites.website_name = rdr["website_name"].ToString();

                        cmiWebsiteList.Add(cmiWebsites);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = cmiWebsiteList });
        }

        public string CmiClientAdd(List<CmiClientNews> client)
        {
            var error = string.Empty;
            var response = string.Empty;
            int result = 0;
            try
            {
                string UserID = Session["User_ID"].ToString();

                foreach (CmiClientNews c in client)
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        string sp = "";
                        if(c.cmi_client_news_id==0)
                        {
                            sp = "cmi_client_news_insert";
                        }
                        else
                        {
                            sp = "cmi_client_news_update";
                        }
                        using (SqlCommand cmd = new SqlCommand(sp, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            if (c.cmi_client_news_id != 0)
                            {
                                cmd.Parameters.AddWithValue("@cmi_client_news_id", c.cmi_client_news_id);
                            }
                            cmd.Parameters.AddWithValue("@news_link", c.news_link);
                            cmd.Parameters.AddWithValue("@user_id", UserID);
                            cmd.Parameters.AddWithValue("@search_url", c.search_url);
                            cmd.Parameters.AddWithValue("@search_phrase", c.search_phrase);
                            cmd.Parameters.AddWithValue("@search_phrase_2", c.search_phrase_2);
                            cmd.Parameters.AddWithValue("@group_id", c.group_id);
                          
                            result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                                response = "fail";

                        }
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string CmiClientDelete(List<CmiClientNews> client)
        {
            var error = string.Empty;
            var response = string.Empty;
            int result = 0;
            try
            {
                string UserID = Session["User_ID"].ToString();

                foreach (CmiClientNews c in client)
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        string sp = "cmi_client_news_delete";
                        using (SqlCommand cmd = new SqlCommand(sp, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;                   
                            cmd.Parameters.AddWithValue("@user_id", UserID);
                            cmd.Parameters.AddWithValue("@search_url", c.search_url);
                            cmd.Parameters.AddWithValue("@group_id", c.group_id);

                            result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                                response = "fail";

                        }
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string CmiClientList()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<CmiClientNews> cmiClientNewsList = new List<CmiClientNews>();
            try
            {
                string UserID = Session["User_ID"].ToString();
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "cmi_client_news_get";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.Parameters.AddWithValue("@user_id", UserID);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        CmiClientNews cmiClient = new CmiClientNews();
                        cmiClient.cmi_client_news_id = Convert.ToInt32(rdr["cmi_client_news_id"]);
                        cmiClient.news_link = rdr["news_link"].ToString();
                        cmiClient.user_id = Convert.ToInt32(rdr["user_id"]);
                        cmiClient.search_url = rdr["search_url"].ToString();
                        cmiClient.search_phrase= rdr["search_phrase"].ToString();
                        cmiClient.search_phrase_2= rdr["search_phrase_2"].ToString();
                        cmiClient.group_id = Convert.ToInt32(rdr["group_id"]);  
                        cmiClientNewsList.Add(cmiClient);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = cmiClientNewsList });
        }

        public class CmiNews
        {
            public int news_export_id { get; set; }
            public string keyword { get; set; }
            public string title { get; set; }
            public string detail_page { get; set; }
            public string description { get; set; }
            public string source_website { get; set; }
            public string client_id { get; set; }
            public string article_age { get; set; }
            public string scraping_date_time { get; set; }
            public string news_link { get; set; }
            public string article_summary { get; set; }
            public int article_summary_status { get; set; }

        }

        public class CmiWebsitesList
        {
            public int cmi_master_website_list_id { get; set; }
            public string website_url { get; set; }
            public string website_name { get; set; }
        }

        public class CmiClientNews
        {
            public int cmi_client_news_id { get; set; }
            public string news_link { get; set; }
            public int user_id { get; set; }
            public string search_url { get; set; }
            public string search_phrase { get; set; }
            public string search_phrase_2 { get; set; }
            public int group_id { get; set; }

        }
    }
}