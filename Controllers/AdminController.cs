using FedPipelineApplication.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    public class AdminController : Controller
    {

        Utility obj = new Utility();
        EncryptDecrypt EN_DE = new EncryptDecrypt();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult admin()
        {
            return View();
        }

        public string CheckAdminLogin(User LoginDetails)
        {

            string password = EN_DE.Encrypt(LoginDetails.userpassword);
            string User_Email = string.Empty;
            string Error = "";
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Login_GetRegLoginData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@User_Email", LoginDetails.useremail);
                        cmd.Parameters.AddWithValue("@User_Password", password);
                        cmd.Parameters.AddWithValue("@Role", "Admin");



                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)

                        {
                            DataRow dr = ds.Tables["data"].Rows[0];
                            User_Email = dr["User_Email"].ToString();
                            Session["User_Email"] = User_Email;
                            Session["User_FirstName"] = User_Email;
                            Session["Admin_Id"] = dr["User_Id"].ToString();                          
                        }
                        else
                        {
                            Session["User_Email"] = "";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { User_Email, Error });
        }
    }
}