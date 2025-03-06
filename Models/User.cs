namespace FedPipelineApplication.Models
{
    public class User
    {
        public string username { get; set; }
        public string useremail { get; set; }
        public string userpassword { get; set; }
        public string phoneno { get; set; }
        public string CookieCode { get; set; }
    }

    public class PublicUser
    {
        public string Public_Email { get; set; }
        public string Public_Password { get; set; }
 
    }
}

