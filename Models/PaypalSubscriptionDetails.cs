namespace FedPipelineApplication.Models
{
    public class PaypalSubscriptionDetails
    {
        public string Id { get; set; }
        public string SubscriptionId { get; set; }
        public string OrderID { get; set; }
        public string Active { get; set; }
        public string UserID { get; set; }
        public string TransID { get; set; }

        public string Description { get; set; }
        public string Position { get; set; }
    }
}