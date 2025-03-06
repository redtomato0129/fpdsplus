using FedPipelineApplication.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;


namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    [CheckUserSubscription]

    public class UserReportsController : Controller
    {
        Utility obj = new Utility();
        EncryptDecrypt EN_DE = new EncryptDecrypt();

        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Contract
        public ActionResult Index()
        {
            return View();
        }

        public string GetUserReportData()
        {
            string UserID = (string)Session["User_Id"];
            List<AppUserReport> appUserReports = new List<AppUserReport>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(Common.app_GetUserReport, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@user_id", Convert.ToInt32(UserID));

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            AppUserReport userReport = new AppUserReport();
                            if (dr2["app_report_path"] != null)
                                userReport.app_report_path = (dr2["app_report_path"].ToString());
                            else
                                userReport.app_report_path = "";
                            if (dr2["app_report_note"] != null)
                                userReport.app_report_note = (dr2["app_report_note"].ToString());
                            else
                                userReport.app_report_name = null;
                            if (dr2["app_report_name"] != null)
                                userReport.app_report_name = (dr2["app_report_name"].ToString());
                            else
                                userReport.app_report_name = null;
                            if (dr2["app_report_datetime"] is DBNull)
                                userReport.app_report_datetime = null;
                            else
                                userReport.app_report_datetime = Convert.ToDateTime(dr2["app_report_datetime"]);
                            appUserReports.Add(userReport);

                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(appUserReports);

        }

        public string GetUserGlobalReportData()
        {
            List<AppUserReport> appUserReports = new List<AppUserReport>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(Common.app_GetUserReport, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@user_id", 0);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            AppUserReport userReport = new AppUserReport();
                            if (dr2["app_report_path"] != null)
                                userReport.app_report_path = (dr2["app_report_path"].ToString());
                            else
                                userReport.app_report_path = "";
                            if (dr2["app_report_note"] != null)
                                userReport.app_report_note = (dr2["app_report_note"].ToString());
                            else
                                userReport.app_report_name = null;
                            if (dr2["app_report_name"] != null)
                                userReport.app_report_name = (dr2["app_report_name"].ToString());
                            else
                                userReport.app_report_name = null;
                            if (dr2["app_report_datetime"] is DBNull)
                                userReport.app_report_datetime = null;
                            else
                                userReport.app_report_datetime = Convert.ToDateTime(dr2["app_report_datetime"]);
                            appUserReports.Add(userReport);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(appUserReports);

        }

        public string GetDailyOpportunityEmail()
        {
            string UserID = (string)Session["User_Id"];
            List<OpportunityEmail> appOpportunityReports = new List<OpportunityEmail>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(Common.app_GetOpportunityEmailList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userid", Convert.ToInt32(UserID));

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            OpportunityEmail opportunityReport = new OpportunityEmail();
                            opportunityReport.id = Convert.ToInt32(dr2["id"]);
                            opportunityReport.solicitation_number = (dr2["solicitation_number"].ToString());
                            opportunityReport.naics_code = (dr2["naics_code"].ToString());
                            opportunityReport.funding_agency = (dr2["funding_agency"].ToString());
                            opportunityReport.funding_sub_agency = (dr2["funding_sub_agency"].ToString());
                            opportunityReport.keyword = (dr2["keyword"].ToString());
                            opportunityReport.socio_economic_designation = (dr2["socio_economic_designation"].ToString());
                            opportunityReport.base_type = (dr2["base_type"].ToString());
                            opportunityReport.daily_report_name = (dr2["daily_report_name"].ToString());
                            opportunityReport.funding_agency_name = (dr2["funding_agency_name"].ToString());
                            opportunityReport.funding_sub_agency_name = (dr2["funding_sub_agency_name"].ToString());
                            opportunityReport.socio_economic_designation_name = (dr2["socio_economic_designation_name"].ToString());
                            //if (dr2["app_report_path"] != null)
                            //    userReport.app_report_path = (dr2["app_report_path"].ToString());
                            //else
                            //    userReport.app_report_path = "";
                            //if (dr2["app_report_note"] != null)
                            //    userReport.app_report_note = (dr2["app_report_note"].ToString());
                            //else
                            //    userReport.app_report_name = null;
                            //if (dr2["app_report_name"] != null)
                            //    userReport.app_report_name = (dr2["app_report_name"].ToString());
                            //else
                            //    userReport.app_report_name = null;
                            //if (dr2["app_report_datetime"] is DBNull)
                            //    userReport.app_report_datetime = null;
                            //else
                            //    userReport.app_report_datetime = Convert.ToDateTime(dr2["app_report_datetime"]);
                            appOpportunityReports.Add(opportunityReport);

                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(appOpportunityReports);

        }

        public string DeleteDailyOpportunityEmail(int id)
        {
            string response = "";
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_DeleteOpportunityDailyEmail, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);

                        var result = obj.insertExecuteNonQuery_SP(cmd);
                        if(result > 0)
                        {
                            response = "1";
                        }
                        else
                        {
                            response = "0";
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(response);

        }
    }
}