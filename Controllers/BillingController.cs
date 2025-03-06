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
    public class BillingController : Controller
    {

        Utility obj = new Utility();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: Billing
        public ActionResult Index()
        {
            return View();
        }

        public string Billing_Datas(BillingData LoginDetails)
        {
            List<BillingData> Bill = new List<BillingData>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_GetBillingData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", Session["User_Id"]);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            BillingData BillData = new BillingData();
                            DataRow dr = ds.Tables["data"].Rows[0];
                            BillData.Amount = dr["Amount"].ToString();
                            BillData.OrderID = dr["orderID"].ToString();
                            BillData.PaiedDate = dr["PaiedDate"].ToString();
                            Bill.Add(BillData);
                        }
                        else
                        {
                        }

                    }
                }

            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {

            }
            return new JavaScriptSerializer().Serialize(Bill);
        }

        public class BillingData
        {
            public string Amount { get; set; }
            public string OrderID { get; set; }
            public string PaiedDate { get; set; }
        }
    }
}