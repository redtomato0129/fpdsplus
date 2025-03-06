using System;
using System.Collections.Generic;

namespace FedPipelineApplication.Models
{
    public class PaypalSubscriptionResponse
    {
        public string Status { get; set; }
        public string Id { get; set; }
        public DateTime Create_time { get; set; }
        public List<Link> Links { get; set; }
        public DateTime Status_update_time { get; set; }
        public string Plan_id { get; set; }
        public DateTime Start_time { get; set; }
        public string Quantity { get; set; }
        public ShippingAmount Shipping_amount { get; set; }
        public Subscriber Subscriber { get; set; }
        public BillingInfo Billing_info { get; set; }
        public DateTime Update_time { get; set; }
        public bool Plan_overridden { get; set; }
    }
    public class Link
    {
        public string Href { get; set; }
        public string Rel { get; set; }
        public string Method { get; set; }
    }

    public class ShippingAddress
    {
        public Name name { get; set; }
        public Address address { get; set; }
    }


    public class OutstandingBalance
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }

    public class CycleExecution
    {
        public string tenure_type { get; set; }
        public int sequence { get; set; }
        public int cycles_completed { get; set; }
        public int cycles_remaining { get; set; }
        public int total_cycles { get; set; }
        public int? current_pricing_scheme_version { get; set; }
    }

    public class Amount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }

    public class LastPayment
    {
        public Amount amount { get; set; }
        public DateTime time { get; set; }
    }

    public class BillingInfo
    {
        public OutstandingBalance outstanding_balance { get; set; }
        public List<CycleExecution> cycle_executions { get; set; }
        public LastPayment last_payment { get; set; }
        public DateTime next_billing_time { get; set; }
        public DateTime final_payment_time { get; set; }
        public int failed_payments_count { get; set; }
    }
}