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
    public class TeamingController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
		public ActionResult Index()
        {
            return View();
        }
		public ActionResult Add()
		{
			return View();
		}
		public ActionResult List()
		{
			return View();
		}

        public string GetTeamingActiveForm()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<TeamingActiveFormResponse> responseData = new List<TeamingActiveFormResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_teaming_getActive";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        TeamingActiveFormResponse teamingObject = new TeamingActiveFormResponse();
                        teamingObject.wizard_teaming_id = Convert.ToInt32(rdr["wizard_teaming_id"]);
                        teamingObject.title = rdr["title"].ToString();
                        responseData.Add(teamingObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = responseData });
        }
        public string GetTeamingQuestionDetail()
		{
			var error = string.Empty;
			var response = string.Empty;
			List<TeamingList> t_List = new List<TeamingList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_teaming_getQuestionDetail";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@is_active", 1);
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						TeamingList teamingObject = new TeamingList();
						teamingObject.wizard_teaming_id = Convert.ToInt32(rdr["wizard_teaming_id"]);
						teamingObject.wizard_teaming_question_id = Convert.ToInt32(rdr["wizard_teaming_question_id"]);
						teamingObject.title = rdr["title"].ToString();
						teamingObject.Active = Convert.ToInt32(rdr["Active"]);
						teamingObject.question_name = rdr["question_name"].ToString();
						teamingObject.response_type =rdr["response_type"].ToString();
						teamingObject.required = Convert.ToInt32(rdr["required"]);
						teamingObject.description = rdr["description"].ToString();
						teamingObject.response_data = rdr["response_data"].ToString();
						t_List.Add(teamingObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = t_List });
		}
		public string GetTeamingListQuestionDetail(GetTeamingListQuestionDetailPayload data)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<TeamingList> t_List = new List<TeamingList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_teaming_list_getQuestionDetail";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@is_active", 1);
					cmd1.Parameters.AddWithValue("@show_grid", data.show_grid);
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						TeamingList teamingObject = new TeamingList();
						teamingObject.wizard_teaming_id = Convert.ToInt32(rdr["wizard_teaming_id"]);
						teamingObject.wizard_teaming_question_id = Convert.ToInt32(rdr["wizard_teaming_question_id"]);
						teamingObject.title = rdr["title"].ToString();
						teamingObject.Active = Convert.ToInt32(rdr["Active"]);
						teamingObject.question_name = rdr["question_name"].ToString();
						teamingObject.response_type = rdr["response_type"].ToString();
						teamingObject.required = Convert.ToInt32(rdr["required"]);
						teamingObject.description = rdr["description"].ToString();
						teamingObject.response_data = rdr["response_data"].ToString();
						teamingObject.show_grid = Convert.ToInt32(rdr["show_grid"]);
						teamingObject.list_sequence = Convert.ToInt32(rdr["list_sequence"]);
						teamingObject.class_col = rdr["class"].ToString();
						teamingObject.list_question_name = rdr["list_question_name"].ToString();
						teamingObject.isHeader = Convert.ToInt32(rdr["isHeader"]);
						t_List.Add(teamingObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = t_List });
		}
		public string InsertTeamingForm(TeamingFormDataPayload body)
		{
			var error = string.Empty;
			var response = string.Empty;
			string result = "fail";
			string UserID = Session["User_ID"].ToString();
			List<TeamingList> t_List = new List<TeamingList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_teaming_insertFormData";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@user_id", UserID);
					cmd1.Parameters.AddWithValue("@wizard_teaming_id", body.wizard_teaming_id);
					cmd1.Parameters.AddWithValue("@form_data", body.form_data);
					con.Open();
					int n = cmd1.ExecuteNonQuery();
					if (n != 0)
					{
						var res = n;
					}

					result = "success";
				}
			}
			catch (Exception ex)
			{
				result = ex.Message;
			}
			con.Close();
			return new JavaScriptSerializer().Serialize(result);
		}
		public string GetTeamingFormData()
		{
			var error = string.Empty;
			var response = string.Empty;
			List<TeamingList> t_List = new List<TeamingList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_teaming_getFormData";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						TeamingList teamingObject = new TeamingList();
						teamingObject.wizard_teaming_id = Convert.ToInt32(rdr["wizard_teaming_id"]);
						teamingObject.wizard_teaming_form_data_id = Convert.ToInt32(rdr["wizard_teaming_form_data_id"]);
						teamingObject.form_data = rdr["form_data"].ToString();
						t_List.Add(teamingObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = t_List });
		}
		public string GetTeamingListModalData(GetTeamingListQuestionDetailPayload data)
		{
			var error = string.Empty;
			var response = string.Empty;
			List<TeamingList> t_List = new List<TeamingList>();
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					var sp = "wizard_teaming_list_getModalData";
					SqlCommand cmd1 = new SqlCommand(sp, con);
					cmd1.CommandType = CommandType.StoredProcedure;
					cmd1.Parameters.AddWithValue("@wizard_teaming_form_data_id", data.wizard_teaming_form_data_id);
					con.Open();
					SqlDataReader rdr = cmd1.ExecuteReader();
					while (rdr.Read())
					{
						TeamingList teamingObject = new TeamingList();
						teamingObject.wizard_teaming_id = Convert.ToInt32(rdr["wizard_teaming_id"]);
						teamingObject.wizard_teaming_form_data_id = Convert.ToInt32(rdr["wizard_teaming_form_data_id"]);
						teamingObject.form_data = rdr["form_data"].ToString();
						t_List.Add(teamingObject);
					}
				}
			}
			catch (Exception ex)
			{
				error = ex.Message;
			}
			return new JavaScriptSerializer().Serialize(new { records = t_List });
		}

		public class TeamingList
		{
			public int wizard_teaming_id { get; set; }
			public int wizard_teaming_question_id { get; set; }
			public string title { get; set; }
			public int Active { get; set; }
			public string question_name { get; set; }
			public string response_type { get; set; }
			public int required { get; set; }
			public string description { get; set; }
			public string response_data { get; set; }
			public string form_data { get; set; }
			public int show_grid { get; set; }
			public int list_sequence { get; set; }
			public string class_col { get; set; }
			public int wizard_teaming_form_data_id { get; set; }
			public string list_question_name { get; set; }
			public int isHeader { get; set; }
		}
		public class TeamingFormDataPayload
		{
			public int wizard_teaming_id { get; set; }
			public string form_data { get; set; }
		}
		public class GetTeamingListQuestionDetailPayload
		{
			public int show_grid { get; set; }
			public int wizard_teaming_form_data_id { get; set; }
		}
        public class TeamingActiveFormResponse
        {
            public int wizard_teaming_id { get; set; }
            public string title { get; set; }
        }
    }
}