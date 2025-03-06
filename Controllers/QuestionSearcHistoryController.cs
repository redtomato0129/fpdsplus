using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Services;


namespace FedPipelineApplication.Controllers
{
    public class QuestionSearchHistoryController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: Coupon
        public ActionResult Index()
        {
            return View();
        }


        public string AddSearchHistory(SearchDetails SearchHistory)
        {
            int result = 0;
            var error = string.Empty;
            var response = string.Empty;
            string Error = "";
            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    var CurrentDate = DateTime.Now.ToString();
                    using (SqlCommand cmd = new SqlCommand("app_InsertInSearchHistory", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@search_name", SearchHistory.search_name);
                        cmd.Parameters.AddWithValue("@question_id", SearchHistory.question_id);
                        cmd.Parameters.AddWithValue("@User_Id", UserID);
                        cmd.Parameters.AddWithValue("@date_created", CurrentDate);
                        cmd.Parameters.AddWithValue("@date_modified", CurrentDate);
                        cmd.Parameters.AddWithValue("@search_results", SearchHistory.search_results);
                        cmd.Parameters.AddWithValue("@category", SearchHistory.category);
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
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string DisplaySearchHistory(string search_text)
        {         
            var error = string.Empty;
            var response = string.Empty;
            int UserID = Convert.ToInt32(Session["User_ID"]);

            List<SearchDetails> SearchList = new List<SearchDetails>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {

                    string sp = string.Empty;
                    if (String.IsNullOrEmpty(search_text))
                    {
                        sp = "Wizard_GetSearchHistory_by_userId";
                    }
                    else
                    {
                        sp = "Wizard_GetSearchHistory_by_userId_search";
                    }
                    using (SqlCommand cmd = new SqlCommand(sp, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", UserID);
                        if (!String.IsNullOrEmpty(search_text))
                        {
                            cmd.Parameters.AddWithValue("@search_name", search_text);
                        }
                        con.Open();
                        SqlDataReader rdr = cmd.ExecuteReader();

                        while (rdr.Read())
                        {
                            SearchDetails DisplaySearchHistory = new SearchDetails();
                            DisplaySearchHistory.question_search_result_id = Convert.ToInt32(rdr["question_search_result_id"]);
                            DisplaySearchHistory.question_id = Convert.ToInt32(rdr["question_id"]);
                            DisplaySearchHistory.question_name = rdr["question_name"].ToString();
                            DisplaySearchHistory.search_name = rdr["search_name"].ToString();
                            DisplaySearchHistory.date_modified = rdr["date_modified"].ToString();
                            DisplaySearchHistory.category = rdr["category"].ToString();

                            SearchList.Add(DisplaySearchHistory);
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = SearchList });
        }

        public string GetSearchResultById(string searchId)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
            string Error = "";
            List<SearchDetails> SearchList = new List<SearchDetails>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    using (SqlCommand cmd = new SqlCommand("Wizard_GetSearchHistory_by_searchId", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SearchId", Convert.ToInt32(searchId));
                        con.Open();
                        SqlDataReader rdr = cmd.ExecuteReader();

                        while (rdr.Read())
                        {
                            SearchDetails SearchObject = new SearchDetails();
                            SearchObject.question_search_result_id = Convert.ToInt32(rdr["question_search_result_id"]);
                            SearchObject.question_id = Convert.ToInt32(rdr["question_id"]);
                            SearchObject.question_name = rdr["question_name"].ToString();
                            SearchObject.search_name = rdr["search_name"].ToString();
                            SearchObject.date_modified = rdr["date_modified"].ToString();
                            SearchObject.category = rdr["category"].ToString();
                            SearchObject.search_results = rdr["search_results"].ToString();
                            SearchList.Add(SearchObject);
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = SearchList });
        }

        public class SearchDetails
        {
            public int question_search_result_id { get; set; }
            public string search_name { get; set; }
            public int question_id { get; set; }
            public int User_Id { get; set; }
            public string date_created { get; set; }
            public string date_modified { get; set; }
            public string search_results { get; set; }
            public string category { get; set; }
            public string question_name { get; set; }
        }

    }
}