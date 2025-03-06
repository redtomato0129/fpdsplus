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
    public class SubscriptionHistoryController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: SubscriptionHistory
        public ActionResult Index()
        {
            return View();
        }

        public string GetSubscriptioHistory()
        {
            string result = "";
            string UserID = Session["User_Id"].ToString();
            List<SubscriptionHistory> SubData = new List<SubscriptionHistory>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_GetSubscriptionHistoryData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                SubscriptionHistory data01 = new SubscriptionHistory();
                                data01.SubscriptionId = dr["SubscriptionID"].ToString();
                                data01.PlanId = dr["PlanID"].ToString();
                                data01.PayerId = dr["PayerID"].ToString();
                                data01.StartDate = Convert.ToDateTime(dr["StartDate"]).ToString("MM/dd/yyyy");
                                data01.NextPaymentDate = Convert.ToDateTime(dr["NextPaymentDate"]).ToString("MM/dd/yyyy");
                                data01.LastPaymentDate = Convert.ToDateTime(dr["LastPaymentDate"]).ToString("MM/dd/yyyy");
                                data01.LastPaymentAmount = dr["LastPaymentAmount"].ToString();
                                data01.Status = dr["Status"].ToString();
                                data01.CancelUrl = dr["SubscriptionCancelUrl"].ToString();
                                data01.SuspendUrl = dr["SubscriptionSuspendUrl"].ToString();
                                data01.TransId = dr["TransID"].ToString();

                                SubData.Add(data01);
                            }
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { SubData, result });
        }
    }
}