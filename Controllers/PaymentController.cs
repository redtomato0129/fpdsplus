//using PayPal.Api;
using FedPipelineApplication.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PayPal.Api;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Serilog;

namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    public class PaymentController : Controller
    {

        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Payment
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PaymentWithPaypal(string id = "", string paymentStatus = "")
        {
            SubscriptionPlanData subsciptionPlan = GetSubscription();
            return View(subsciptionPlan);
        }

        public ActionResult RedirectToPaypalSubscribe(string planId)
        {
            // Check Subscription plan
            var redirectUrl = string.Empty;
            int status = CheckSubscriptionPlan(planId);
            if (status == 0)
            {
                redirectUrl = "SubscribeCancel";
                return Redirect(redirectUrl);
            }
            
            PaypalSubscriptionRequest paypalSubscription = new PaypalSubscriptionRequest
            {
                plan_id = planId,
                application_context = new ApplicationContext
                {
                    return_url = GetBaseUrl() + "/Payment/SubscribeSuccess",
                    cancel_url = GetBaseUrl() + "/Payment/SubscribeCancel"

                    //return_url = "https://9758-70-182-177-121.ngrok.io/Payment/SubscribeSuccess",
                    //cancel_url = "https://9758-70-182-177-121.ngrok.io/Payment/SubscribeCancel"
                }
            };

            var subscription = PaypalApiService.CreateSubscribePlan(paypalSubscription);


            if (subscription != null && subscription.Links.Count > 0)
            {
                foreach (var url in subscription.Links)
                {
                    if (url.Rel == "approve")
                    {
                        redirectUrl = url.Href;
                    }
                }
            }
            else
            {
                redirectUrl = "SubscribeCancel";
            }

            return Redirect(redirectUrl);
        }

        public ActionResult SubscribeSuccess(string token,string subscription_id)
        {
            Agreement agreement = new Agreement()
            {
                payer = new Payer(),
                agreement_details = new AgreementDetails()
            };
            PaypalSubscriptionResponse paypalSubscriptionResponse = new PaypalSubscriptionResponse() { Subscriber = new Subscriber(),Links=new List<Link>() };
            var log = new LoggerConfiguration().WriteTo.File(System.Web.Hosting.HostingEnvironment.MapPath("~/Logs/log.txt")).CreateLogger();
            try
            {
                // Execute approved agreement
               
                paypalSubscriptionResponse = PaypalApiService.GetFullSubscriptionDetails(subscription_id);
                
                //agreement = PaypalApiService.ExecuteSubscription(token, subscription_id);
                // Get Subscription Details
                //paypalSubscriptionResponse = PaypalApiService.GetFullSubscriptionDetails(agreement.id);
            }
            catch (Exception ex)
            {

                log.Error(ex.Message);
            }
            int result = SaveSubscriptionHistory(agreement, paypalSubscriptionResponse);
            Session["IsPaidUser"] = true;
            //return RedirectToAction("PaymentWithPaypal", new { id = agreement.id, paymentStatus = "SUCCESS" });

            return RedirectToAction("Index", "SubscriptionHistory");
        }

        public ActionResult SubscribeCancel(string token)
        {
            return RedirectToAction("PaymentWithPaypal", new { id = string.Empty, paymentStatus = "FAILURE" });
        }

        public string UpdateSubscriptionStatus(string TransId, string SubscriptionId, string Url)
        {
            int result = 0;
            string Error = "";
            string UserID = (string)Session["User_Id"];

            // Update Subscription plan
            var subscriptionDetails = PaypalApiService.UpdateSubscribePlan(SubscriptionId, Url);
            if (subscriptionDetails != null)
            {
                try
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        using (SqlCommand cmd = new SqlCommand(Common.app_Payments_UpdateSubscriptionHistory, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@TransID", TransId);
                            cmd.Parameters.AddWithValue("@UserID", UserID);
                            cmd.Parameters.AddWithValue("@Status", subscriptionDetails.Status);
                            cmd.Parameters.AddWithValue("@ModifiedDate", subscriptionDetails.Update_time);

                            result = cmd.ExecuteNonQuery();

                            Session["IsPaidUser"] = false;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Error = ex.Message;
                }
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }

        public string SavePaymentDetails(payDetails paymentdetails)
        {
            int result = 0;
            string User_FirstName = (string)Session["User_FirstName"];
            string UserID = (string)Session["User_Id"];
            con.Open();
            try
            {
                //    string qry = "Insert into T_PaymentDetails (UserID, UserName, status, orderID, PayerName, PayerID, PayerEmail,PaymentID,Amount) values" +
                //                "('" + UserID + "','" + User_FirstName + "', '" + paymentdetails.status + "'," +
                //                "'"+paymentdetails.OrderID+"','" + paymentdetails.PayerName + "','" + paymentdetails.payerID + "'," +
                //                "'" + paymentdetails.PayerEmail + "','" + paymentdetails.PaymentID + "','" + paymentdetails.amount + "')";
                //    SqlCommand cmd2 = new SqlCommand(qry, con);
                //    int n = cmd2.ExecuteNonQuery();
                //    result = n;

                //    if (result==1) {

                //        string qry0 = "UPDATE M_User SET Paid = '1' WHERE User_Id = '"+ UserID + "'";
                //        SqlCommand cmd3 = new SqlCommand(qry0, con);
                //        int m = cmd3.ExecuteNonQuery();
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_InsertPayment, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", UserID);
                        cmd.Parameters.AddWithValue("@User_FirstName", User_FirstName);
                        cmd.Parameters.AddWithValue("@status", paymentdetails.status);
                        cmd.Parameters.AddWithValue("@OrderID", paymentdetails.OrderID);
                        cmd.Parameters.AddWithValue("@PayerName", paymentdetails.PayerName);
                        cmd.Parameters.AddWithValue("@payerID", paymentdetails.payerID);
                        cmd.Parameters.AddWithValue("@PayerEmail", paymentdetails.PayerEmail);
                        cmd.Parameters.AddWithValue("@PaymentID", paymentdetails.PaymentID);
                        cmd.Parameters.AddWithValue("@amount", paymentdetails.amount);

                        int n = cmd.ExecuteNonQuery();
                        result = n;

                        if (result == 2)
                        {
                            Session["Buy"] = '1';
                        }
                    }

                }


            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            { }
            con.Close();
            return new JavaScriptSerializer().Serialize(result);
        }

        public int CheckSubscriptionPlan(string planId)
        {
            string UserID = (string)Session["User_Id"];
            string Error = "";
            int result = 0;
            SubscriptionHistory subscriptionHistory = null;
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_PaymentsGetSubscriptionHistoryByPlanId, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        cmd.Parameters.AddWithValue("@PlanID", planId);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            subscriptionHistory = new SubscriptionHistory();
                            DataRow dr = ds.Tables["data"].Rows[0];

                            subscriptionHistory.TransId = dr["TransID"].ToString();
                            subscriptionHistory.SubscriptionId = dr["SubscriptionID"].ToString();
                            subscriptionHistory.PlanId = dr["PlanID"].ToString();
                            subscriptionHistory.Status = dr["Status"].ToString();
                            subscriptionHistory.CancelUrl = dr["SubscriptionCancelUrl"].ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }

            if (subscriptionHistory != null && subscriptionHistory.Status != "CANCELLED")
            {
                // Update Subscription Plan
                string subscription = UpdateSubscriptionStatus(subscriptionHistory.TransId, subscriptionHistory.SubscriptionId, subscriptionHistory.CancelUrl);
                dynamic updateSubscriptionStatus = JsonConvert.DeserializeObject<ExpandoObject>(subscription, new ExpandoObjectConverter());
                if (updateSubscriptionStatus.result == 1)
                {
                    result = 1;
                }
            }
            else
            {
                result = 1;
            }

            return result;
        }
        public SubscriptionPlanData GetSubscription()
        {
            string UserID = (string)Session["User_Id"];
            string Error = "";
            SubscriptionPlanData SubscriptionData = new SubscriptionPlanData();
            SubscriptionData.Subscriptions = new List<Subscription>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_GetUserSubscriptionData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
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
                                data01.Description = dr["Description"].ToString();
                                data01.Position = dr["DisplayPosition"].ToString();
                                data01.PlanID = dr["PlanID"].ToString();

                                SubscriptionData.Subscriptions.Add(data01);
                            }
                        }

                        if (ds.Tables["data1"].Rows.Count > 0)
                        {
                            SubscriptionData.SelectedPlanId = ds.Tables["data1"].Rows[0].ItemArray[0].ToString();
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            //return new JavaScriptSerializer().Serialize(SubData);
            //return new JavaScriptSerializer().Serialize(new { SubData, result });
            return SubscriptionData;
        }

        public string SaveSubscriptionDetails(payDetails paymentdetails)
        {
            int result = 0;
            string User_FirstName = (string)Session["User_FirstName"];
            string UserID = (string)Session["User_Id"];
            con.Open();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_InsertPayment, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Id", UserID);
                        cmd.Parameters.AddWithValue("@User_FirstName", User_FirstName);
                        cmd.Parameters.AddWithValue("@status", paymentdetails.status);
                        cmd.Parameters.AddWithValue("@OrderID", paymentdetails.OrderID);
                        cmd.Parameters.AddWithValue("@PayerName", paymentdetails.PayerName);
                        cmd.Parameters.AddWithValue("@payerID", paymentdetails.payerID);
                        cmd.Parameters.AddWithValue("@PayerEmail", paymentdetails.PayerEmail);
                        cmd.Parameters.AddWithValue("@PaymentID", paymentdetails.PaymentID);
                        cmd.Parameters.AddWithValue("@amount", paymentdetails.amount);

                        int n = cmd.ExecuteNonQuery();
                        result = n;

                        if (result == 2)
                        {
                            Session["Buy"] = '1';
                        }
                    }

                }


            }

            catch (Exception ex)
            { }
            con.Close();
            return new JavaScriptSerializer().Serialize(result);
        }

        public int SaveSubscriptionHistory(Agreement agreementDetails, PaypalSubscriptionResponse paypalSubscriptionResponse)
        {

            int result = 0;
            string Error = "";
            string UserID = (string)Session["User_Id"];
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_InsertSubscriptionHistory, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@SubscriptionID", paypalSubscriptionResponse.Id ?? string.Empty);
                        cmd.Parameters.AddWithValue("@PlanID", paypalSubscriptionResponse.Plan_id ?? string.Empty);
                        cmd.Parameters.AddWithValue("@Status", paypalSubscriptionResponse.Status ?? string.Empty);
                        cmd.Parameters.AddWithValue("@PayerID", paypalSubscriptionResponse.Subscriber.payer_id ?? string.Empty);
                        cmd.Parameters.AddWithValue("@PaymentType", agreementDetails.payer.payment_method ?? "paypal");
                        cmd.Parameters.AddWithValue("@NextPaymentDate", paypalSubscriptionResponse.Billing_info.next_billing_time); //agreementDetails.agreement_details.next_billing_date
                        cmd.Parameters.AddWithValue("@LastPaymentDate", paypalSubscriptionResponse.Billing_info.last_payment.time);//agreementDetails.agreement_details.last_payment_date);
                        cmd.Parameters.AddWithValue("@LastPaymentAmount", paypalSubscriptionResponse.Billing_info.last_payment.amount?.value ?? "0"); //agreementDetails.agreement_details.last_payment_amount
                        cmd.Parameters.AddWithValue("@SubscriptionCancelUrl", paypalSubscriptionResponse.Links?.Where(s => s.Rel == "cancel").Select(s => s.Href).FirstOrDefault() ?? string.Empty);
                        cmd.Parameters.AddWithValue("@SubscriptionSuspendUrl", paypalSubscriptionResponse.Links?.Where(s => s.Rel == "suspend").Select(s => s.Href).FirstOrDefault() ?? string.Empty);
                        cmd.Parameters.AddWithValue("@StartDate", paypalSubscriptionResponse.Update_time); //agreementDetails.start_date
                        cmd.Parameters.AddWithValue("@CreatedBy", UserID);
                        cmd.Parameters.AddWithValue("@ModifiedBy", UserID);

                        result = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            { }

            con.Close();
            return result;
        }

        public string GetBaseUrl()
        {
            return Request.Url.GetLeftPart(UriPartial.Authority);
        }

        public class payDetails
        {

            public string UserID { get; set; }
            public string id { get; set; }
            public string PayerName { get; set; }
            public string PayerEmail { get; set; }
            public string status { get; set; }
            public string PaymentID { get; set; }
            public string OrderID { get; set; }
            public string payerID { get; set; }
            public string amount { get; set; }
        }
    }
}