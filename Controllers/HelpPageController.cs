using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    public class HelpPageController : Controller
    {
        Utility obj = new Utility();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineDataConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: HelpPage
        public ActionResult Index()
        {
            return View();
        }

        public string GetQuestionIds()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<HelpList> helpList = new List<HelpList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_get_questions";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        HelpList helpObject = new HelpList();
                        helpObject.question_id = Convert.ToInt32(rdr["question_id"]);
                        helpList.Add(helpObject);
                    }
                    rdr.Close();
                }
                con.Close();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = helpList });
        }

        public string GetQuestionHelpPageData(int question_id)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<HelpList> helpList = new List<HelpList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_question_help_page_data";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@question_id", question_id);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        HelpList helpObject = new HelpList();
                        helpObject.question_id = Convert.ToInt32(rdr["question_id"]);
                        helpObject.page_name = rdr["page_name"].ToString();
                        helpObject.description = rdr["description"].ToString();
                        helpList.Add(helpObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = helpList });
        }

        public string InsertQuestionHelpPageData(int question_id, string search_description, string dashboard_description, string drilldown_description, string datagrid_description)
        {
            var error = string.Empty;
            string response = string.Empty;
            int result =0;
            string userDomain = Session["User_Domain"].ToString();
            if (!String.IsNullOrEmpty(userDomain) && userDomain!= "rturner.net")
            {
                response = "fail";
            }
            else
            {
                try
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        var sp = "wizard_question_help_insert_data";
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@question_id", question_id);
                        cmd1.Parameters.AddWithValue("@search_description", search_description);
                        cmd1.Parameters.AddWithValue("@dashboard_description", dashboard_description);
                        cmd1.Parameters.AddWithValue("@drilldown_description", dashboard_description);
                        cmd1.Parameters.AddWithValue("@datagrid_description", datagrid_description);

                        /*  SqlDataReader rdr = cmd1.ExecuteReader();
                          int n = cmd1.ExecuteNonQuery();
                          if (n != 0)
                          {
                              var res = n;
                              result = "success";
                          }
                          else
                          {
                              result = "error";
                          }*/
                        result = obj.insertExecuteNonQuery_SP(cmd1);

                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";
                        con.Close();
                    }
                }
                catch (Exception ex)
                {
                    response = "error";
                    error = ex.Message;
                }
            }
            
            return new JavaScriptSerializer().Serialize(new { result = response });
        }

    }
}

public class HelpList
{
    public int question_id { get; set; }
    public string page_name { get; set; }
    public string description { get; set; }
}