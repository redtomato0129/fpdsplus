using FedPipelineApplication.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace FedPipelineApplication
{
    public class SendEmail
    {
        EncryptDecrypt EN_DE = new EncryptDecrypt();

        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string SendGridApiKey = WebConfigurationManager.AppSettings["SendGridApiKey"];
        string SendGridApiName = WebConfigurationManager.AppSettings["SendGridApiName"];
        string SendGridFromEmail = WebConfigurationManager.AppSettings["SendGridFromEmail"];

        //        public string ContactMail(string Contact_FirstName, string Contact_LastName, string Contact_Email, string Contact_BusineesName, string Contact_Message)
        //        {
        //            string result = "";

        //            try
        //            {
        //                MailMessage mailMsg = new MailMessage("dollynisha@vts.in", Contact_Email);// (from,to)the verified sender email that you have registered in my account



        //                //Message Settings
        //                mailMsg.Subject = "Messeage Sent sucessfully !";
        //                mailMsg.IsBodyHtml = true;//any default text or data from our textbox
        //                mailMsg.Body = "<html>" +
        //                                "<head></head>" +
        //                                "<body>" +

        //                                "<div>" +

        //                                "<h3 style = 'margin: 1em 0; line-height:1.5em; style='color: #5f00a4;''> " +
        //                                "Hello " + Contact_FirstName + " ," +
        //                                "</h3> " +
        //                                "<div>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "</div>" +
        //                                "<p>We've received your message, we'll get back to you soon.</p>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Thanks,<br> " +
        //                                "The <span> FedPipeline </span> Team" +
        //                                "</p> " +
        //                                "</div> " +

        //                                "</body>" +
        //                                "</html> ";      //any default text or data from our textbox

        //                //SMTP Settings
        //                SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", 587);
        //                //NetworkCredential credentials = new NetworkCredential("apikey", "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"); //the mail id and password that we have register to log in the sendgrid 
        //                //NetworkCredential credentials = new NetworkCredential("FedPipelineWeb", "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"); //the mail id and password that we have register to log in the sendgrid 
        //                NetworkCredential credentials = new NetworkCredential(SendGridApiName, SendGridApiKey);//the mail id and password that we have register to log in the sendgrid --- 01032021

        //                smtpClient.Credentials = credentials;
        //                if (mailMsg != null)
        //                {
        //                    smtpClient.Send(mailMsg);
        //                    //var adminmail = SendMailToAdmin(Contact_FirstName, Contact_LastName, Contact_Email, Contact_BusineesName, Contact_Message);

        //                    var adminmail = ""; // Wrking in progress//
        //                    if (adminmail == "success") {
        //                        result = "success";
        //                    }
        //                }
        //            }
        //#pragma warning disable CS0168 // The variable 'ex' is declared but never used
        //            catch (Exception ex)
        //#pragma warning restore CS0168 // The variable 'ex' is declared but never used
        //            {
        //                result = "Fail";
        //            }
        //            return result;
        //        }
        //public string SendMailToAdmin(string Feedback_Module, string Feedback_Type, string Feedback_Contact_Requested, string Feedback_Message)
        //{
        //    string result = "";

        //    try
        //    {
        //        MailMessage mailMsg = new MailMessage("dollynisha@vts.in", SendGridFromEmail);// (from,to)the verified sender email that you have registered in my account


        //        //Message Settings
        //        mailMsg.Subject = "Feedback Request Form Message !";
        //        mailMsg.IsBodyHtml = true;//any default text or data from our textbox
        //        mailMsg.Body = "<html>" +
        //                        "<head></head>" +
        //                        "<body>" +

        //                        "<div>" +

        //                         "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
        //                         "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
        //                         "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
        //                            "<div class='row'><div style='color: #5f00a4;width: 100%;text-align: center;'><h4> Feedback Message!</h4></div></div>" +
        //                             "</div>" +
        //                             "<table>" +
        //                                    "<tr><td>Module</td><td> : </td><td> " + Feedback_Module + " </td></tr>" +
        //                                           "<tr><td>Type</td><td> : </td><td> " + Feedback_Type + " </td></tr>" +
        //                                                //"<tr><td>Email</td><td> : </td><td> " + Contact_Email + " </td></tr>" +
        //                                                "<tr><td>Contact Requested</td><td> : </td><td> " + Feedback_Contact_Requested + " </td></tr>" +
        //                                                 "<tr><td>Message</td><td> : </td><td> " + Feedback_Message + " </td></tr>" +
        //                                "</table>" +
        //                        "</div> " +

        //                        "</body>" +
        //                        "</html> ";      //any default text or data from our textbox

        //        //SMTP Settings
        //        SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", 587);
        //        //NetworkCredential credentials = new NetworkCredential("apikey", "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"); //the mail id and password that we have register to log in the sendgrid 
        //        NetworkCredential credentials = new NetworkCredential(SendGridApiName, SendGridApiKey);//the mail id and password that we have register to log in the sendgrid(from 03/01/2021)
        //        smtpClient.Credentials = credentials;
        //        if (mailMsg != null)
        //        {
        //            smtpClient.Send(mailMsg);
        //            result = "success";

        //        }
        //        else
        //        {
        //            result = "failed";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        result = ex.Message;
        //    }
        //    return result;
        //    //return RedirectResult("Index", "Dasboard");
        //}

        //        public string RegisterMail(string ToEmail, string OTP)
        //        {
        //            string result = "";

        //            try
        //            {
        //                MailMessage mailMsg = new MailMessage("dollynisha@vts.in", ToEmail);// (from,to)the verified sender email that you have registered in my account

        //                string ToEmailID = EN_DE.Encrypt(ToEmail);

        //                var param = "https://app.fedpipeline.com/VerifyUSer/Index?PM1=" + ToEmailID;
        //                //var param = "http://localhost:52830/VerifyUSer/Index?Email=" + ToEmailID;
        //                mailMsg.Subject = "Email Verification Code";
        //                mailMsg.IsBodyHtml = true;//any default text or data from our textbox
        //                mailMsg.Body = "<html>" +
        //                                "<head></head>" +
        //                                "<body>" +
        //                                "<div>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Hi," +
        //                                "</p> " +

        //                                "<div>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                " Your Email verification code is " +
        //                                "</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +

        //                                "<p>Click the bellow link to Verify the code and continue.</p>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                " <a href='" + param + "'>" + param + "</a>" +
        //                                "</p> " +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Kindly ignore if you have not requested for this" +
        //                                "</p> " +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Thanks,<br> " +
        //                                "The <span> FedPipeline </span> Team" +
        //                                "</p> " +
        //                                "</div> " +
        //                                "</body>" +
        //                                "</html> ";      //any default text or data from our textbox

        //                //SMTP Settings
        //                SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", 587);
        //                //NetworkCredential credentials = new NetworkCredential("apikey", "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"); //the mail id and password that we have register to log in the sendgrid 
        //                //NetworkCredential credentials = new NetworkCredential("FedPipelineWeb", "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"); //the mail id and password that we have register to log in the sendgrid 
        //                NetworkCredential credentials = new NetworkCredential(SendGridApiName, SendGridApiKey); //the mail id and password that we have register to log in the sendgrid  --- 01032021

        //                smtpClient.Credentials = credentials;
        //                if (mailMsg != null)
        //                {
        //                    smtpClient.Send(mailMsg);
        //                    result = "success";
        //                }
        //            }
        //#pragma warning disable CS0168 // The variable 'ex' is declared but never used
        //            catch (Exception ex)
        //#pragma warning restore CS0168 // The variable 'ex' is declared but never used
        //            {
        //                result = "Fail";
        //            }
        //            return result;
        //        }


        //        public string LoginEmail(string ToEmail, string OTP)
        //        {
        //            string result = "";

        //            try
        //            {
        //                MailMessage mailMsg = new MailMessage("dollynisha@vts.in", ToEmail);// (from,to)the verified sender email that you have registered in my account

        //                string ToEmailID = EN_DE.Encrypt(ToEmail);
        //                string otp = EN_DE.Encrypt(OTP); 
        //                var param = "https://app.fedpipeline.com/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
        //                //var param = "http://localhost:52830/VerifyUSer/Index?Email=" + ToEmailID;
        //                mailMsg.Subject = "Email Verification Code";
        //                mailMsg.IsBodyHtml = true;//any default text or data from our textbox
        //                mailMsg.Body = "<html>" +
        //                                "<head></head>" +
        //                                "<body>" +
        //                                "<div>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Hi," +
        //                                "</p> " +

        //                                //"<div>" +
        //                                //"<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                //" Your Email verification code is " +
        //                                //"</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +

        //                                "<p>Click the bellow link to continues.</p>" +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                " <a href='" + param + "'>" + param + "</a>" +
        //                                "</p> " +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Kindly ignore if you have not requested for this" +
        //                                "</p> " +
        //                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
        //                                "Thanks,<br> " +
        //                                "The <span> FedPipeline </span> Team" +
        //                                "</p> " +
        //                                "</div> " +
        //                                "</body>" +
        //                                "</html> ";      //any default text or data from our textbox

        //                //SMTP Settings
        //                SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", 587);
        //                //NetworkCredential credentials = new NetworkCredential("apikey", "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"); //the mail id and password that we have register to log in the sendgrid 
        //                //NetworkCredential credentials = new NetworkCredential("FedPipelineWeb", "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"); //the mail id and password that we have register to log in the sendgrid 
        //                NetworkCredential credentials = new NetworkCredential(SendGridApiName, SendGridApiKey); //the mail id and password that we have register to log in the sendgrid  --- 01032021

        //                smtpClient.Credentials = credentials;
        //                if (mailMsg != null)
        //                {
        //                    smtpClient.Send(mailMsg);
        //                    result = "success";
        //                }
        //            }
        //#pragma warning disable CS0168 // The variable 'ex' is declared but never used
        //            catch (Exception ex)
        //#pragma warning restore CS0168 // The variable 'ex' is declared but never used
        //            {
        //                result = "Fail";
        //            }
        //            return result;
        //        }

        public string PublicAccountMail(string ToEmail, string message_Email, string message_Password, DateTime message_Date, string OTP)
        {
            string ToEmailID = EN_DE.Encrypt(ToEmail);

            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "Register Verification Details";
            var to = new EmailAddress(ToEmail, "Robert Turner");

            var param = GetBaseUrl() + "/VerifyUSer/Index?PM1=" + ToEmailID;
            var plainTextContent = "Register Details";
            var htmlContent = "<html>" +
                                            "<head></head>" +
                                            "<body>" +
                                            "<div>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Hi," +
                                            "</p> " +

                                            "<div>" +
                                             "<p> Your Email verification code is " +
                                            "</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            " Thank you for registering for your free access. Click the link below to get started. </p>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            " <a href='" + param + "'>" + param + "</a>" +
                                            "</p> " +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Kindly ignore if you have not requested for this" +
                                            "</p> " +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Thanks,<br> " +
                                            "The <span> FedPipeline </span> Team" +
                                            "</p> " +
                                            "</div> " +
                                            "</body>" +
                                            "</html> ";      //any default text or data from our textbox

/*            var htmlContent = "<html>" +
                                            "<head></head>" +
                                            "<body>" +
                                            "<div>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Hi," +
                                            "</p> " +

"<div>" +
"<p style = 'margin: 1em 0; line - height:1.5em'> " +
" Here are your public credentials: " +
"</p><h4 style='color: #00000;'>" + "Email: " + message_Email + "</h4>" +
"<h4 style='color: #00000;'>" + "Password: " + message_Password + "</h4>" +
"<h4 style='color: #00000;'>" + "Valid till: " + message_Date + "</h4></div>" +


"<p style = 'margin: 1em 0; line - height:1.5em'> " +
"Thanks,<br> " +
"The <span> FedPipeline </span> Team" +
"</p> " +
"</div> " +
"</body>" +
"</html> ";      //any default text or data from our textbox*/

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }

        public string RegisterMail(string ToEmail, string OTP)
        {
            string ToEmailID = EN_DE.Encrypt(ToEmail);

            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "Register Verification Details";
            var to = new EmailAddress(ToEmail, "Robert Turner");

            var param = GetBaseUrl() + "/VerifyUSer/Index?PM1=" + ToEmailID;
            var plainTextContent = "Register Details";
            var htmlContent = "<html>" +
                                            "<head></head>" +
                                            "<body>" +
                                            "<div>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Hi," +
                                            "</p> " +

                                            "<div>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            " Your Email verification code is " +
                                            "</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +

                                            "<p>Click the below link to Verify the code and continue.</p>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            " <a href='" + param + "'>" + param + "</a>" +
                                            "</p> " +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Kindly ignore if you have not requested for this" +
                                            "</p> " +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Thanks,<br> " +
                                            "The <span> FedPipeline </span> Team" +
                                            "</p> " +
                                            "</div> " +
                                            "</body>" +
                                            "</html> ";      //any default text or data from our textbox

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }

        public string SendInstantMailToAdmin(int Feedbackid, string user_email, string Feedback_Module, string Feedback_Type, string Feedback_Contact_Requested, string Feedback_Message,
           string zipName, List<string> files)
        {
            int fileTotal = 0;
            var filesData = "";
            if (files.Count > 0)
            {
                filesData = "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'>File Link  : </td>";
            }
            foreach (var file in files)
            {
                if (fileTotal == 0)
                {
                    filesData += "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><a href='" + GetBaseUrl() + "/files/download?type=false&filename=" + file + "' target='_blank' download>" + GetBaseUrl() + "/Uploads/files/" + file + "</a> </td></tr>";
                }
                else
                {
                    filesData += "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'></td><td  style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'> <a href='" + GetBaseUrl() + "/files/download?type=false&filename=" + file + "' target='_blank' download>" + GetBaseUrl() + "/Uploads/files/" + file + "</a> </td></tr>";
                }

                fileTotal++;
            }

            var folderdata = "";
            if (zipName != "")
            {
                folderdata = "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'>Zip File Link : </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><a href='" + GetBaseUrl() + "/files/download?type=true&filename=" + zipName + "' target='_blank' download>" + GetBaseUrl() + "/Uploads/" + zipName + "</a> </td></tr>";
            }
            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "FedPipeline Support Request #" + Feedbackid.ToString();

            var receivers = new List<EmailAddress>() { new EmailAddress("support@fedpipeline.com"), new EmailAddress(user_email) };
            var plainTextContent = "Feedback Request";
            var htmlContent = "<html>" +
                                    "<head></head>" +
                                    "<body>" +
                                    "<div>" +
                                     "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
                                     "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
                                     "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
                                        "<div class='row'><div style='color: #5f00a4;width: 100%;text-align: center;'><h3> FedPipeline Support Request #" + Feedbackid + "</h3></div></div>" +
                                         "</div>" +
                                         "<table style='border-collapse: collapse; width: 65%; border:none;'>" + "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'>User email :</td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'> " + user_email + " </td></tr>" +
                                                "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'>Module :</td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'> " + Feedback_Module + " </td></tr>" +
                                                       "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'>Type :</td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'> " + Feedback_Type + " </td></tr>" +
                                                             "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'>Message :</td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'> " + Feedback_Message + " </td></tr>" +
                                                             filesData + folderdata +
                                            "</table>" +
                                    "</div> " +
                                    "<footer><br><br> " +
                                    "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                    "FedPipeline Support Desk<br>" +
                                    "support@fedpipeline.com<br>" +
                                    "www.fedpipeline.com<br>" +
                                    "</p> </footer>" +
                                    "</body>" +
                                    "</html> ";

            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, receivers, subject, plainTextContent, htmlContent);

            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }
        public string SendMailToAdmin(string Feedback_Module, string Feedback_Type, string Feedback_Contact_Requested, string Feedback_Message)
        {

            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "Feedback Request Form Message !";
            var to = new EmailAddress(SendGridFromEmail, "Robert Turner");
            var plainTextContent = "Feedback Request";
            var htmlContent = "<html>" +
                                    "<head></head>" +
                                    "<body>" +

                                    "<div>" +

                                     "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
                                     "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
                                     "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
                                        "<div class='row'><div style='color: #5f00a4;width: 100%;text-align: center;'><h4> Feedback Message!</h4></div></div>" +
                                         "</div>" +
                                         "<table>" +
                                                "<tr><td>Module</td><td> : </td><td> " + Feedback_Module + " </td></tr>" +
                                                       "<tr><td>Type</td><td> : </td><td> " + Feedback_Type + " </td></tr>" +
                                                             //"<tr><td>Email</td><td> : </td><td> " + Contact_Email + " </td></tr>" +
                                                             //"<tr><td>Contact Requested</td><td> : </td><td> " + Feedback_Contact_Requested + " </td></tr>" +
                                                             "<tr><td>Message</td><td> : </td><td> " + Feedback_Message + " </td></tr>" +
                                            "</table>" +
                                    "</div> " +

                                    "</body>" +
                                    "</html> ";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }

        public string ContactMail(string Contact_FirstName, string Contact_LastName, string Contact_Email, string Contact_BusineesName, string Contact_Message)
        {

            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "Messeage Sent sucessfully !";
            var to = new EmailAddress(Contact_Email, "Robert Turner");
            var plainTextContent = "Contact Details";
            var htmlContent = "<html>" +
                                            "<head></head>" +
                                            "<body>" +
                                            "<div>" +
                                            "<h3 style = 'margin: 1em 0; line-height:1.5em; style='color: #5f00a4;''> " +
                                            "Hello " + Contact_FirstName + " ," +
                                            "</h3> " +
                                            "<div>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "</div>" +
                                            "<p>We've received your message, we'll get back to you soon.</p>" +
                                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                            "Thanks,<br> " +
                                            "The <span> FedPipeline </span> Team" +
                                            "</p> " +
                                            "</div> " +

                                            "</body>" +
                                            "</html> ";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }

        public async Task<string> LoginEmail(string ToEmail, string OTP)
        {
            string ToEmailID = EN_DE.Encrypt(ToEmail);
            string otp = EN_DE.Encrypt(OTP);
            //var apiKey = "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";
            var client = new SendGridClient(SendGridApiKey);

            string url = HttpContext.Current.Request.Url.Authority;

            if (url.Contains("fpdsplus"))
            {
                var from = new EmailAddress("support@fedpipeline.com", "FPDSplus Support");
                var subject = "Email Verification Code";
                var to = new EmailAddress(ToEmail, "Robert Turner");

                //var param = "https://app.fpds.com/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
                string header = GetBaseUrl();
                header = header.Replace("http", "https");
                var param = header + "/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
                var plainTextContent = "Email Verification";
                var htmlContent = "<html>" +
                                                "<head></head>" +
                                                "<body>" +
                                                "<div>" +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Thank you for using FPDSPlus.com" +
                                                "</p> " +

                                                //"<div>" +
                                                //"<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                //" Your Email verification code is " +
                                                //"</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +

                                                "<p>Click the below link to access FPDSPlus.com</p>" +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                " <a href='" + param + "'>" + param + "</a>" +
                                                "</p> " +
                                                //"<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                //"Kindly ignore if you have not requested for this" +
                                                //"</p> " +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Sincerely<br> " +
                                                "The <span> FPDSplus </span> Team" +
                                                "</p> " +
                                                "<p>" +
                                                "PRIVACY and MARKETING NOTICE: rTurner Consulting and FedPipeline will not share your contact information with 3rd parties at any time. We use your contact information to provide our application service to you. By using this system, you consent to receive emails discussing new features, products and services offered by our organization. Email\nsupport@fedpipeline.com\nwith any questions or concerns." +
                                                "</p> " +
                                                "</div> " +
                                                "</body>" +
                                                "</html> ";
                try
                {
                    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                    var response = await client.SendEmailAsync(msg);

                    return response.ToString();
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else if (url.Contains("fedpipeline"))
            {
                var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
                var subject = "Email Verification Code";
                var to = new EmailAddress(ToEmail, "Robert Turner");

                //var param = "https://app.fedpipeline.com/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
                string header = GetBaseUrl();
                header = header.Replace("http", "https");
                var param = header + "/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
                var plainTextContent = "Email Verification";
                var htmlContent = "<html>" +
                                                "<head></head>" +
                                                "<body>" +
                                                "<div>" +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Thank you for using Fedpipeline.com" +
                                                "</p> " +

                                                //"<div>" +
                                                //"<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                //" Your Email verification code is " +
                                                //"</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +

                                                "<p>Click the below link to access Fedpipeline.com</p>" +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                " <a href='" + param + "'>" + param + "</a>" +
                                                "</p> " +
                                                //"<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                //"Kindly ignore if you have not requested for this" +
                                                //"</p> " +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Sincerely<br> " +
                                                "The <span> FedPipeline </span> Team" +
                                                "</p> " +
                                                "<p>" +
                                                "PRIVACY and MARKETING NOTICE: rTurner Consulting and FedPipeline will not share your contact information with 3rd parties at any time. We use your contact information to provide our application service to you. By using this system, you consent to receive emails discussing new features, products and services offered by our organization. Email\nsupport@fedpipeline.com\nwith any questions or concerns." +
                                                "</p> " +
                                                "</div> " +
                                                "</body>" +
                                                "</html> ";
                try
                {
                    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                    var response = await client.SendEmailAsync(msg);

                    return response.ToString();
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            else
            {
                var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
                var subject = "Email Verification Code";
                var to = new EmailAddress(ToEmail, "Robert Turner");

                //var param = "https://app.fedpipeline.com/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
                string header = GetBaseUrl();
                header = header.Replace("http", "https");
                var param = header + "/VerifyUSer/Index?PM1=" + ToEmailID + "&PM2=" + otp + "&PM3=1";
                var plainTextContent = "Email Verification";
                var htmlContent = "<html>" +
                                                "<head></head>" +
                                                "<body>" +
                                                "<div>" +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Hi" +
                                                "</p> " +

                                                //"<div>" +
                                                //"<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                //" Your Email verification code is " +
                                                //"</p> <h3 style='color: #5f00a4;'>" + OTP + "</h3></p></div>" +

                                                "<p>Click the below link</p>" +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                " <a href='" + param + "'>" + param + "</a>" +
                                                "</p> " +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Kindly ignore if you have not requested for this" +
                                                "</p> " +
                                                "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                                                "Thanks,<br> " +
                                                "The <span> FedPipeline </span> Team" +
                                                "</p> " +
                                                "</div> " +
                                                "</body>" +
                                                "</html> ";
                try
                {
                    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                    var response = await client.SendEmailAsync(msg);

                    return response.ToString();
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
        }

        public string SendContractSearchRequestEmail(string ToEmail, SearchParameters parameters)
        {
            string ToEmailID = EN_DE.Encrypt(ToEmail);
            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "Report Request has been submitted";
            var receivers = new List<EmailAddress>() { new EmailAddress("jim@rturner.net"), new EmailAddress(ToEmail) };
            var plainTextContent = "Search Report Request";
            var htmlContent = "";
            if (parameters.naics_code_list != "" && parameters.naics_code_list != null)
            {
                htmlContent = "<html>" +
                            "<head></head>" +
                            "<body>" +
                            "<div>" +
                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                            "A new excel report request for the contract search has been submitted by " + ToEmail + ". Request criteria for the excel report:" +
                            "</p> " +
                            "<label>Selected Form Data :</label>" +
                            "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
                            "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
                            "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
                            "</div>" +
                            "<table style='border-collapse: collapse; width: 65%; border:none;'>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Funding Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.funding_agency_code_list + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'> NAICS Code: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.naics_code_list + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Contract set a side: </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'> " + parameters.socio_economic_list + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Funding Sub Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.funding_sub_agency_code_list + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Business Size : </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.business_size + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Solicitation Procedure: </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'> " + parameters.solicitation_procedure_code + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Funding Office: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.funding_office_list + "</label></td> " +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Awarding Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.awarding_agency_code_list + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Keyword (Searches through award description): </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.keywords + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>FY Range (Start / End): </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.FY_start + "-" + parameters.FY_end + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Awarding Sub Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.awarding_sub_agency_code_list + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Minimum Contract Size: </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.minimum_contract_size + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Awarding Office: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.awarding_office_list + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Report Notes: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.report_notes + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'></td>" +
                            "</tr>" +
                            "</table>" +
                            "<p style = 'margin: 1em 0; line - height:1.5em'>" +
                            "Thanks You,<br><br>" +
                            "The <span> FedPipeline </span> Team" +
                            "</p>" +
                            "</div>" +
                            "</body>" +
                            "</html>";
            }
            else

            {
                htmlContent = "<html>" +
                            "<head></head>" +
                            "<body>" +
                            "<div>" +
                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                            "A new excel report request for the contract search has been submitted by " + ToEmail + ". Request criteria for the excel report:" +
                            "</p> " +

                            "<label>Selected Form Data :</label>" +
                            "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
                            "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
                            "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
                            "</div>" +
                            "<table style='border-collapse: collapse; width: 65%; border:none;'>" +
                            "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Contract No :</td><td  style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;color: #058500;'> " + parameters.psc_code_list + "</label></td></tr>" +
                            "<tr><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Report Notes :</td><td  style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;color: #058500;'> " + parameters.report_notes + "</label></td></tr>" +
                            "</table> " +
                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                            "Thanks You,<br><br> " +
                            "The <span> FedPipeline </span> Team" +
                            "</p> " +
                            "</div> " +
                            "</body>" +
                            "</html> ";
            }

            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, receivers, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }

        public string SendVendorSearchRequestEmail(string ToEmail, SearchParameters parameters)
        {
            string ToEmailID = EN_DE.Encrypt(ToEmail);
            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress("support@fedpipeline.com", "FedPipeline Support");
            var subject = "Report Request has been submitted";
            var receivers = new List<EmailAddress>() { new EmailAddress("jim@rturner.net"), new EmailAddress(ToEmail) };
            var plainTextContent = "Search Report Request";
            var htmlContent = "";
            if (parameters.naics_code_list != "" && parameters.naics_code_list != null)
            {
                htmlContent = "<html>" +
                            "<head></head>" +
                            "<body>" +
                            "<div>" +
                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                            "A new excel report request for the vendor search has been submitted by " + ToEmail + ". Request criteria for the excel report:" +
                            "</p> " +
                            "<label>Selected Form Data :</label>" +
                            "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
                            "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
                            "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
                            "</div>" +
                            "<table style='border-collapse: collapse; width: 65%; border:none;'>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Funding Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.funding_agency_code_list + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'> NAICS Code: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.naics_code_list + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Socio-Economic Designation(s): </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'> " + parameters.socio_economic_list + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Funding Sub Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.funding_sub_agency_code_list + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Business Size : </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.business_size + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Solicitation Procedure: </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'> " + parameters.solicitation_procedure_code + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Funding Office: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.funding_office_list + "</label></td> " +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Awarding Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.awarding_agency_code_list + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>FY Range (Start / End): </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.FY_start + "-" + parameters.FY_end + "</label></td>" +
                             "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Awarding Sub Agency: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.awarding_sub_agency_code_list + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Minimum Contract Size: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.minimum_contract_size + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Awarding Office: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.awarding_office_list + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Report Notes: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.report_notes + "</label ></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'></label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'></label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'></label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'></label></td>" +
                            "</tr>" +
                            "</table>" +
                            "<p style = 'margin: 1em 0; line - height:1.5em'>" +
                            "Thanks You,<br><br>" +
                            "The <span> FedPipeline </span> Team" +
                            "</p>" +
                            "</div>" +
                            "</body>" +
                            "</html>";
            }
            else

            {
                htmlContent = "<html>" +
                            "<head></head>" +
                            "<body>" +
                            "<div>" +
                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                            "A new excel report request for the vendor search has been submitted by " + ToEmail + ". Request criteria for the excel report:" +
                            "</p> " +
                            "<label>Selected Form Data :</label>" +
                            "<div style='flex: 1 1 auto; padding: 1.25rem; min-height: 1px; margin: 28px 9px 25px 0px; position: relative; width: 50 %; " +
                            "display: flex; flex-direction: column; min-width: 0; word - wrap: break-word; background-color: #fff;background-clip: border-box;" +
                            "border: 1px solid rgba(0, 0, 0, 0.125); box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08) !important; border: 0;'> " +
                            "</div>" +
                            "<table style='border-collapse: collapse; width: 65%; border:none;'>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Vendor Name :</td><td  style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;color: #058500;'> " + parameters.vendor_name + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Cage :</td><td  style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;color: #058500;'> " + parameters.cage + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>FY Range (Start / End): </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.FY_start + "-" + parameters.FY_end + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Minimum Contract Size: </label> </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'> " + parameters.minimum_contract_size + "</label></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'>Report Notes: </label></td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'>" + parameters.report_notes + "</label></td>" +
                            "<td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #5d247f;'></label> </td><td style='border: 1px solid #ddd; padding: 8px;max-width: 200px!important;min-width: 200px!important;word-break:break-word;'><label style='color: #058500;'></label></td>" +
                            "</tr>" +
                            "</table> " +
                            "<p style = 'margin: 1em 0; line - height:1.5em'> " +
                            "Thanks You,<br><br> " +
                            "The <span> FedPipeline </span> Team" +
                            "</p> " +
                            "</div> " +
                            "</body>" +
                            "</html> ";
            }

            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, receivers, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);

            return response.ToString();
        }
        public string GenerateNumericOTP()
        {
            string numbers = "0123456789";
            Random objrandom = new Random();
            string strrandom = string.Empty;
            for (int i = 0; i < 5; i++)
            {
                int temp = objrandom.Next(0, numbers.Length);
                strrandom += temp;
            }
            var otp = strrandom;
            return otp;
        }

        public string GetBaseUrl()
        {
            return HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
        }

        public class Contact
        {
            public string Contact_FirstName { get; set; }
            public string Contact_LastName { get; set; }
            public string Contact_Email { get; set; }
            public string Contact_BusineesName { get; set; }
            public string Contact_Message { get; set; }

        }
    }
}