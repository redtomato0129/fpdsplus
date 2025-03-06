namespace FedPipelineApplication.Models
{
    public class SubscriptionHistory
    {
        public string TransId { get; set; }
        public string SubscriptionId { get; set; }
        public string PlanId { get; set; }
        public string PayerId { get; set; }
        public string StartDate { get; set; }
        public string NextPaymentDate { get; set; }
        public string LastPaymentDate { get; set; }
        public string LastPaymentAmount { get; set; }
        public string Status { get; set; }
        public string SuspendUrl { get; set; }
        public string CancelUrl { get; set; }
    }
}