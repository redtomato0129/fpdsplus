using System.Configuration;

namespace FedPipelineApplication.Models
{
    public class Paypal : ConfigurationSection
    {
        [ConfigurationProperty("settings")]
        public PaypalSettings[] PaypalSettings
        {
            get
            {
                return (PaypalSettings[])this["settings"];
            }
            set
            {
                value = (PaypalSettings[])this["settings"];
            }
        }
    }

    public class PaypalSettings : ConfigurationElement
    {
        [ConfigurationProperty("mode", DefaultValue = "sandbox", IsRequired = true)]
        public string Mode
        {
            get
            {
                return (string)this["mode"];
            }
            set
            {
                value = (string)this["mode"];
            }
        }

        [ConfigurationProperty("connectionTimeout", DefaultValue = "360000", IsRequired = true)]
        public string ConnectionTimeout
        {
            get
            {
                return (string)this["connectionTimeout"];
            }
            set
            {
                value = (string)this["connectionTimeout"];
            }
        }

        [ConfigurationProperty("requestRetries", DefaultValue = "1", IsRequired = true)]
        public string RequestRetries
        {
            get
            {
                return (string)this["requestRetries"];
            }
            set
            {
                value = (string)this["requestRetries"];
            }
        }

        [ConfigurationProperty("clientId", DefaultValue = "", IsRequired = true)]
        public string ClientId
        {
            get
            {
                return (string)this["clientId"];
            }
            set
            {
                value = (string)this["clientId"];
            }
        }

        [ConfigurationProperty("clientSecret", DefaultValue = "", IsRequired = true)]
        public string ClientSecret
        {
            get
            {
                return (string)this["clientSecret"];
            }
            set
            {
                value = (string)this["clientSecret"];
            }
        }
    }

    public class SubsciptionPlan
    {
        public string BasicPlan { get; set; }
        public string PremiumPlan { get; set; }
        public string PlatinumPlan { get; set; }
    }
}