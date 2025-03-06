using FedPipelineApplication.Models;
using Newtonsoft.Json;
using PayPal.Api;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net;

namespace FedPipelineApplication
{
    public class PaypalApiService
    {
        /// <summary>
        /// Create Plan
        /// </summary>
        /// <param name="name"></param>
        /// <param name="description"></param>
        /// <param name="baseUrl"></param>
        /// <returns></returns>
        public static Plan CreateBillingPlan(string name, string description, string baseUrl, string planId)
        {
            var returnUrl = baseUrl + "/Payment/SubscribeSuccess";
            var cancelUrl = baseUrl + "/Payment/SubscribeCancel";

            // Plan Details
            var plan = CreatePlanObject("Basic Plan", "Basic Plan", planId, returnUrl, cancelUrl,
                PlanInterval.Day, 1, (decimal)9.90, trial: false, trialLength: 0, trialPrice: 0);

            // PayPal Authentication tokens
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            // Create plan
            plan = plan.Create(apiContext);

            // Activate the plan
            var patchRequest = new PatchRequest()
            {
                new Patch()
                {
                    op = "replace",
                    path = "/",
                    value = new Plan() { state = "ACTIVE" }
                }
            };
            plan.Update(apiContext, patchRequest);

            return plan;
        }

        /// <summary>
        /// Update Plan
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="path"></param>
        /// <param name="value"></param>
        public static void UpdateBillingPlan(string planId, string path, object value)
        {
            // PayPal Authentication tokens
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            // Retrieve Plan
            var plan = Plan.Get(apiContext, planId);

            // Activate the plan
            var patchRequest = new PatchRequest()
            {
                new Patch()
                {
                    op = "replace", // Only the 'replace' operation is supported when updating billing plans.
                    path = path,
                    value = value
                }
            };
            plan.Update(apiContext, patchRequest);
        }

        /// <summary>
        /// Deactivate Plan
        /// </summary>
        /// <param name="planId"></param>
        public static void DeactivateBillingPlan(string planId)
        {
            UpdateBillingPlan(
                planId: planId,
                path: "/",
                value: new Plan { state = "INACTIVE" });
        }

        public static PaypalSubscriptionResponse CreateSubscribePlan(PaypalSubscriptionRequest paypalSubscription)
        {
            // PayPal Authentication tokens
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            ICollection<KeyValuePair<string, string>> headers = new Dictionary<String, String>();
            headers.Add(new KeyValuePair<String, String>("PayPal-Request-Id", "SUBSCRIPTION-" + DateTime.Now.Date.ToString("ddMMyyyy") + "-001"));
            PaypalSubscriptionResponse subscriptionResponse = null;

            string uri = GetPaypalUrl(apiContext) + PaypalEndpoints.SubscribePlan;

            IRestResponse response = PaypalRestApi(HttpMethodType.HttpPostMethod, uri, apiContext, headers, paypalSubscription);

            if (response.StatusCode == HttpStatusCode.Created)
            {
                subscriptionResponse = JsonConvert.DeserializeObject<PaypalSubscriptionResponse>(response.Content);
            }

            return subscriptionResponse;
        }

        public static PaypalSubscriptionResponse UpdateSubscribePlan(string subscriptionId, string url)
        {
            // PayPal Authentication tokens
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            // Get Status from the Url
            var status = url.Substring(url.LastIndexOf('/') + 1);

            dynamic model = new System.Dynamic.ExpandoObject();
            if (status == "cancel")
            {
                model.reason = "Cancelling the agreement";
            }
            else
            {
                model.reason = "Suspending the agreement";
            }

            PaypalSubscriptionResponse subscriptionResponse = null;

            IRestResponse response = PaypalRestApi(HttpMethodType.HttpPostMethod, url, apiContext, null, model);

            if (response.StatusCode == HttpStatusCode.NoContent)
            {
                // Get Subscription Details 
                subscriptionResponse = GetFullSubscriptionDetails(subscriptionId);
            }

            return subscriptionResponse;
        }

        public static PaypalSubscriptionResponse GetFullSubscriptionDetails(string agreementId)
        {
            var apiContext = PaypalApiConfiguration.GetAPIContext();


            string uri = GetPaypalUrl(apiContext) + PaypalEndpoints.SubscribePlan + "/" + agreementId;
            PaypalSubscriptionResponse subscriptionResponse = null;
            IRestResponse response = PaypalRestApi(HttpMethodType.HttpGetMethod, uri, apiContext, null, subscriptionResponse);

            if (response.StatusCode == HttpStatusCode.OK)
            {
                subscriptionResponse = JsonConvert.DeserializeObject<PaypalSubscriptionResponse>(response.Content);
            }

            return subscriptionResponse;
        }

        /// <summary>
        /// Complete/Execute subscription plan
        /// </summary>
        /// <param name="token"></param>
        public static Agreement ExecuteSubscription(string token)
        {
            // PayPal Authentication tokens
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            var subscription = new Agreement() { token = token };
            var executedSubscription = subscription.Execute(apiContext);
            return executedSubscription;
        }

        /// <summary>
        /// Suspend Subscription Plan
        /// </summary>
        /// <param name="subscriptionId"></param>
        public static void SuspendSubscription(string subscriptionId)
        {
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            var subscription = new Agreement() { id = subscriptionId };
            subscription.Suspend(apiContext, new AgreementStateDescriptor()
            { note = "Suspending the agreement" });
        }

        /// <summary>
        /// Reactivate Subscription
        /// </summary>
        /// <param name="subscriptionId"></param>
        public static void ReactivateSubscription(string subscriptionId)
        {
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            var subscription = new Agreement() { id = subscriptionId };
            subscription.ReActivate(apiContext, new AgreementStateDescriptor()
            { note = "Reactivating the agreement" });
        }

        /// <summary>
        /// Cancel Subscription Plan
        /// </summary>
        /// <param name="subscriptionId"></param>
        public static void CancelSubscription(string subscriptionId)
        {
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            var subscription = new Agreement() { id = subscriptionId };
            subscription.Cancel(apiContext, new AgreementStateDescriptor()
            { note = "Cancelling the agreement" });
        }

        /// <summary>
        /// Get subscription details
        /// </summary>
        /// <param name="agreementId"></param>
        /// <returns></returns>
        public static Agreement GetSubscriptionDetails(string agreementId)
        {
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            var subscription = Agreement.Get(apiContext, agreementId);

            return subscription;
        }

        /// <summary>
        /// Get subscription transaction details
        /// </summary>
        /// <param name="subscriptionId"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        public static AgreementTransactions GetSubscriptionTransactions(string subscriptionId, string startDate, string endDate)
        {
            var apiContext = PaypalApiConfiguration.GetAPIContext();

            var subscriptionTransactions = Agreement.ListTransactions(apiContext, subscriptionId, startDate, endDate);

            return subscriptionTransactions;
        }

        #region Helpers

        public static string GetPaypalUrl(APIContext apiContext)
        {
            var paypalUrl = "https://api-m.sandbox.paypal.com";

            if (apiContext.Config["mode"] != null && apiContext.Config["mode"] == "live")
            {
                paypalUrl = "https://api-m.paypal.com";
            }
            return paypalUrl;
        }

        //Rest API Service
        public static IRestResponse PaypalRestApi<TBody>(string MethodType, string uri, APIContext apiContext, ICollection<KeyValuePair<string, string>> headers, TBody Model)
        {
            var client = new RestClient();
            var request = new RestRequest();

            if (MethodType == HttpMethodType.HttpGetMethod)
            {
                request = new RestRequest(Method.GET);
            }
            else if (MethodType == HttpMethodType.HttpPostMethod)
            {
                request = new RestRequest(Method.POST);
                request.AddJsonBody(Model);
            }
            else if (MethodType == HttpMethodType.HttpPutMethod)
            {
                request = new RestRequest(Method.PUT);
                request.AddJsonBody(Model);
            }
            else if (MethodType == HttpMethodType.HttpPatchMethod)
            {
                request = new RestRequest(Method.PATCH);
                request.AddJsonBody(Model);
            }
            else if (MethodType == HttpMethodType.HttpDeleteMethod)
            {
                request = new RestRequest(Method.DELETE);
            }

            client = new RestClient(uri);

            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Accept-Encoding", "gzip,deflate");
            request.AddHeader("Authorization", apiContext.AccessToken);

            if (headers != null && headers.Count > 0)
            {
                request.AddHeaders(headers);
            }

            client.Timeout = -1;

            IRestResponse response = client.Execute(request);
            return response;
        }


        /// <summary>
        /// Helper method for getting a currency amount.
        /// </summary>
        /// <param name="value">The value for the currency object.</param>
        /// <returns></returns>
        private static Currency GetCurrency(string value)
        {
            return new Currency() { value = value, currency = "USD" };
        }

        private static class PlanType
        {
            /// <summary>
            /// Use Fixed when you want to create a billing plan with a fixed number of payments (cycles)
            /// </summary>
            public static string Fixed { get { return "fixed"; } }

            /// <summary>
            /// Use Infinite and set cycles to 0 for a billing plan that is active until it's manually cancelled
            /// </summary>
            public static string Infinite { get { return "infinite"; } }
        }

        private static class PlanInterval
        {
            public static string Week { get { return "Week"; } }
            public static string Day { get { return "Day"; } }
            public static string Month { get { return "Month"; } }
            public static string Year { get { return "Year"; } }
        }

        private static class HttpMethodType
        {
            public static string HttpGetMethod { get { return "GET"; } }
            public static string HttpPostMethod { get { return "POST"; } }
            public static string HttpPutMethod { get { return "PUT"; } }
            public static string HttpPatchMethod { get { return "PATCH"; } }
            public static string HttpDeleteMethod { get { return "DELETE"; } }
        }

        public static Plan CreatePlanObject(string planName, string planDescription, string planId, string returnUrl, string cancelUrl,
            string frequency, int frequencyInterval, decimal planPrice,
            decimal shippingAmount = 0, decimal taxPercentage = 0, bool trial = false, int trialLength = 0, decimal trialPrice = 0)
        {
            // Define the plan and attach the payment definitions and merchant preferences.
            // More Information: https://developer.paypal.com/docs/rest/api/payments.billing-plans/
            return new Plan
            {
                id = planId,
                name = planName,
                description = planDescription,
                type = PlanType.Fixed,

                // Define the merchant preferences.
                // More Information: https://developer.paypal.com/webapps/developer/docs/api/#merchantpreferences-object
                merchant_preferences = new MerchantPreferences()
                {
                    setup_fee = GetCurrency("1"),
                    return_url = returnUrl,
                    cancel_url = cancelUrl,
                    auto_bill_amount = "YES",
                    initial_fail_amount_action = "CONTINUE",
                    max_fail_attempts = "0"
                },
                payment_definitions = GetPaymentDefinitions(trial, trialLength, trialPrice, frequency, frequencyInterval, planPrice, shippingAmount, taxPercentage)
            };
        }

        private static List<PaymentDefinition> GetPaymentDefinitions(bool trial, int trialLength, decimal trialPrice,
            string frequency, int frequencyInterval, decimal planPrice, decimal shippingAmount, decimal taxPercentage)
        {
            var paymentDefinitions = new List<PaymentDefinition>();

            if (trial)
            {
                // Define a trial plan that will charge 'trialPrice' for 'trialLenght'
                // After that, the standard plan will take over.
                paymentDefinitions.Add(
                    new PaymentDefinition()
                    {
                        name = "Trial",
                        type = "TRIAL",
                        frequency = frequency,
                        frequency_interval = frequencyInterval.ToString(),
                        amount = GetCurrency(trialPrice.ToString()),
                        cycles = trialLength.ToString(),
                        charge_models = GetChargeModels(trialPrice, shippingAmount, taxPercentage)
                    });
            }

            // Define the standard payment plan. It will represent a 'frequency' (monthly, etc)
            // plan for 'planPrice' that charges 'planPrice' (once a month) for #cycles.
            var regularPayment = new PaymentDefinition
            {
                name = "Standard Plan",
                type = "REGULAR",
                frequency = frequency,
                frequency_interval = frequencyInterval.ToString(),
                amount = GetCurrency(planPrice.ToString()),
                // > NOTE: For `IFNINITE` type plans, `cycles` should be 0 for a `REGULAR` `PaymentDefinition` object.
                cycles = "11",
                charge_models = GetChargeModels(trialPrice, shippingAmount, taxPercentage)
            };
            paymentDefinitions.Add(regularPayment);

            return paymentDefinitions;
        }

        private static List<ChargeModel> GetChargeModels(decimal planPrice, decimal shippingAmount, decimal taxPercentage)
        {
            // Create the Billing Plan
            var chargeModels = new List<ChargeModel>();
            if (shippingAmount > 0)
            {
                chargeModels.Add(new ChargeModel()
                {
                    type = "SHIPPING",
                    amount = GetCurrency(shippingAmount.ToString())
                });
            }
            if (taxPercentage > 0)
            {
                chargeModels.Add(new ChargeModel()
                {
                    type = "TAX",
                    amount = GetCurrency(String.Format("{0:f2}", planPrice * taxPercentage / 100))
                });
            }

            return chargeModels;
        }
        #endregion
    }
}