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
    public class HDRController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
		public ActionResult Index()
        {
            return View();
        }

		public string UpdateUEI_notes(string UEI, string notes, string UEI_Status, string action_to_take, string updated_at)
		{
			string result = "";
			try
			{
				using (SqlConnection con = new SqlConnection(MainCon))
				{
					con.Open();
					using (SqlCommand cmd = new SqlCommand("HDR_UpdateNotesStatus", con))
					{
						cmd.CommandType = CommandType.StoredProcedure;
						cmd.Parameters.AddWithValue("@UEI", UEI);
						cmd.Parameters.AddWithValue("@notes", notes);
						cmd.Parameters.AddWithValue("@UEI_Status", UEI_Status);
						cmd.Parameters.AddWithValue("@action_to_take", action_to_take);
						cmd.Parameters.AddWithValue("@updated_at", updated_at);
						
						int n = cmd.ExecuteNonQuery();
						if (n != 0)
						{
							var res = n;
						}

						result = "success";
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

        public string UpdateHDR_NotesStatusIDIQ(string UEI, string notes,  string contract_number, string idiq_Status, string action_to_take, string updated_at)
        {
            string result = "";
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("UpdateHDR_NotesStatusIDIQ", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UEI", UEI);
                        cmd.Parameters.AddWithValue("@notes", notes);
                        cmd.Parameters.AddWithValue("@contract_number", contract_number);
                        cmd.Parameters.AddWithValue("@idiq_Status", idiq_Status);
                        cmd.Parameters.AddWithValue("@action_to_take", action_to_take);
                        cmd.Parameters.AddWithValue("@updated_at", updated_at);

                        int n = cmd.ExecuteNonQuery();
                        if (n != 0)
                        {
                            var res = n;
                        }

                        result = "success";
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

    }
}