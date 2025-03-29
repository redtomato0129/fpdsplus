using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Configuration;
using System.Text;

namespace FedPipelineApplication.Models
{
    public class PublicUserService {
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        Utility obj = new Utility();

        public UserStateResult GetExistingUser(string Email)
        {
            UserStateResult result = new UserStateResult();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd2 = new SqlCommand(Common.app_getPublicUser, con))
                    {
                        cmd2.CommandType = CommandType.StoredProcedure;
                        cmd2.Parameters.AddWithValue("@Email", Email);
                        DataSet ds = obj.getDataSet_SP(cmd2);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                if (Convert.ToInt32(dr2["Paid"])==1)
                                {
                                    result.UserState = "user-is-valid";
                                    result.Count = 0;
                                }
                                else
                                {
                                    DateTime? expirationDate = dr2["Expiration_Date"] != DBNull.Value
                                    ? Convert.ToDateTime(dr2["Expiration_Date"]) // Change data type accordingly
                                    : (DateTime?)null;
                                    DateTime CurrentTempDate = DateTime.Now;
                                    if (expirationDate < CurrentTempDate)
                                    {
                                        int freeTrialCount = dr2["Trial_Count"] != DBNull.Value
                                         ? Convert.ToInt32(dr2["Trial_Count"])
                                            : 0;
                                        result.UserState = "user-expired";
                                        result.Count = freeTrialCount + 1;
                                    }
                                    else
                                    {
                                        result.UserState = "user-is-valid";
                                        result.Count = 0;
                                    }

                                }
                               
                            }
                        }
                        else
                        {
                            result.UserState = "no-user-found";
                            result.Count = 0;
                        }
                    }
                    con.Close();
                    return result;
                }
            }
            catch (Exception ex)
            {
                return result;
            }
        }

        public DateTime GetNextSundayWithTime(DateTime CurrentDate)
        {
            // Calculate the next Sunday from the current date
            DateTime nextSunday = CurrentDate.AddDays(6000 - (int)CurrentDate.DayOfWeek);

            // Set the time to 11:59 PM (23:59)
            nextSunday = nextSunday.Date.AddHours(23).AddMinutes(59).AddSeconds(59);

            return nextSunday;
        }

        public string GetNameBeforeAtSymbol(string email)
        {
            // Split the email address using '@' as a delimiter and take the part before '@'
            string[] parts = email.Split('@');
            return parts[0];
        }

        public string GenerateRandomPassword(int length)
        {
            const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

            Random random = new Random();
            StringBuilder passwordBuilder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(validChars.Length);
                passwordBuilder.Append(validChars[randomIndex]);
            }

            return passwordBuilder.ToString();
        }
    }

    public class UserStateResult
    {
        public string UserState { get; set; }
        public int Count { get; set; }
    }

    public class RegisterPublicUserDetails
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string Public_Email { get; set; }
        public string Public_Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}