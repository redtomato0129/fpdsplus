using System.Collections.Generic;

namespace FedPipelineApplication.Models
{
    public class Subscription
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Active { get; set; }
        public string AdminID { get; set; }
        public string TransID { get; set; }
        public string PlanID { get; set; }
        public string Description { get; set; }
        public string Position { get; set; }
    }
    public class SubscriptionPlanData
    {
        public string SelectedPlanId { get; set; }
        public List<Subscription> Subscriptions { get; set; }
    }
}