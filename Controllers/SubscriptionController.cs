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
    public class SubscriptionController : Controller
    {

        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Subscription
        public ActionResult Index()
        {
            return View();
        }

        [WebMethod]
        public string SaveSubscription(Subscription SubscriptionDetails)
        {

            int result = 0;
            string Error = "";
            string AdminID = Session["Admin_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_InsertSubscription, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Code", SubscriptionDetails.Code);
                        cmd.Parameters.AddWithValue("@Value", SubscriptionDetails.Value);
                        cmd.Parameters.AddWithValue("@name", SubscriptionDetails.Name);
                        cmd.Parameters.AddWithValue("@AdminID", AdminID);
                        cmd.Parameters.AddWithValue("@Active", SubscriptionDetails.Active);
                        cmd.Parameters.AddWithValue("@Description", SubscriptionDetails.Description);
                        cmd.Parameters.AddWithValue("@Position", SubscriptionDetails.Position);

                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }



        public string UpdateSubscription(Subscription SubscriptionDetails)
        {

            int result = 0;
            string Error = "";
            string AdminID = Session["Admin_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_UpdateSubscription, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TransID", SubscriptionDetails.TransID);
                        cmd.Parameters.AddWithValue("@Code", SubscriptionDetails.Code);
                        cmd.Parameters.AddWithValue("@Value", SubscriptionDetails.Value);
                        cmd.Parameters.AddWithValue("@name", SubscriptionDetails.Name);
                        cmd.Parameters.AddWithValue("@AdminID", AdminID);
                        cmd.Parameters.AddWithValue("@Active", SubscriptionDetails.Active);
                        cmd.Parameters.AddWithValue("@Description", SubscriptionDetails.Description);
                        cmd.Parameters.AddWithValue("@Position", SubscriptionDetails.Position);

                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }

        public string DeleteSubscription(string TransID)
        {

            int result = 0;
            string Error = "";
            string AdminID = Session["Admin_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_DeleteSelectedSubscription,con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TransID", TransID);

                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }


        public string GetSubscription()
        {
            string result = "";
            string AdminID = Session["Admin_Id"].ToString();
            List<Subscription> SubData = new List<Subscription>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_GetSubscriptionData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@AdminID", AdminID);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                Subscription data01 = new Subscription();
                                //DataRow dr = ds.Tables["data"].Rows[0];
                                data01.Code = dr["Code"].ToString();
                                data01.Name = dr["Name"].ToString();
                                data01.Active = dr["Active"].ToString();
                                data01.Value = dr["Value"].ToString();
                                data01.TransID = dr["TransID"].ToString();
                                data01.Description = dr["Description"].ToString();
                                data01.Position = dr["DisplayPosition"].ToString();

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
            //return new JavaScriptSerializer().Serialize(SubData);
            return new JavaScriptSerializer().Serialize(new { SubData, result });
        }

        public class Subscription
        {
            public string Code { get; set; }
            public string Name { get; set; }
            public string Value { get; set; }
            public string Active { get; set; }
            public string AdminID { get; set; }
            public string TransID { get; set; }

            public string Description { get; set; }
            public string Position { get; set; }



        }
    }
}