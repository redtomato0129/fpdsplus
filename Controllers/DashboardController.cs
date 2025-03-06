using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{
    [CheckUserSubscription]
    public class DashboardController : Controller
    {
        ErrorLog Log = new ErrorLog();
        Utility obj = new Utility();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }

        public string InsertMarketContext(List<MarketContext> MarketContext, string Mode, string MasterID, string NaicsMode)
        {
            string DeleteNaics = "";
            string result = "";
            string Error = "";
            string UserID = Session["User_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    //if (MarketContext[0].Type == "Department_Agency") {
                    using (SqlCommand cmd1 = new SqlCommand(Common.app_Dashboard_RemoveMarketContext, con))
                    {
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@MasterID", MasterID);
                        cmd1.Parameters.AddWithValue("@RemoveMode", "All");
                        cmd1.Parameters.AddWithValue("@Type", MarketContext[0].Type);
                        cmd1.Parameters.AddWithValue("@UserID", UserID);
                        int n1 = cmd1.ExecuteNonQuery();
                    }
                    //}

                    var i = 0; var len = MarketContext.Count;
                    while (i < len)
                    {
                        // your code
                        using (SqlCommand cmd1 = new SqlCommand(Common.app_Dashboard_InsertMarketContext, con))
                        {
                            cmd1.CommandType = CommandType.StoredProcedure;

                            cmd1.Parameters.AddWithValue("@MasterID", MasterID);
                            cmd1.Parameters.AddWithValue("@Mode", Mode);
                            cmd1.Parameters.AddWithValue("@Code", MarketContext[i].Code);
                            cmd1.Parameters.AddWithValue("@Description", MarketContext[i].Description);
                            cmd1.Parameters.AddWithValue("@Type", MarketContext[i].Type);
                            cmd1.Parameters.AddWithValue("@UserID", UserID);
                            cmd1.Parameters.AddWithValue("@MarketContextID", MarketContext[i].MarketContextID);
                            int n = cmd1.ExecuteNonQuery();

                            if (n == 1)
                            {
                                result = "Success";
                            }
                            else
                            {
                                result = "fail";
                            }
                        }
                        i++;
                    }

                    //for (var i = 0; i < MarketContext.Count; i++)
                    //{

                    //    using (SqlCommand cmd1 = new SqlCommand(Common.app_InsertMarketContext, con))
                    //    {
                    //        cmd1.CommandType = CommandType.StoredProcedure;

                    //        cmd1.Parameters.AddWithValue("@MasterID", MasterID);
                    //        cmd1.Parameters.AddWithValue("@Mode", Mode);
                    //        cmd1.Parameters.AddWithValue("@Code", MarketContext[i].Code);
                    //        cmd1.Parameters.AddWithValue("@Description", MarketContext[i].Description);
                    //        cmd1.Parameters.AddWithValue("@Type", MarketContext[i].Type);
                    //        cmd1.Parameters.AddWithValue("@UserID", UserID);
                    //        cmd1.Parameters.AddWithValue("@MarketContextID", MarketContext[i].MarketContextID);
                    //        int n = cmd1.ExecuteNonQuery();

                    //        if (n == 1)
                    //        {
                    //            result = "Success";
                    //        }
                    //        else
                    //        {
                    //            result = "fail";
                    //        }
                    //    }
                    //}

                    if (NaicsMode == "1")
                    {
                        DeleteNaics = "Naics";
                        using (SqlCommand cmd1 = new SqlCommand(Common.app_Dashboard_DeleteMarketContext, con))
                        {
                            cmd1.CommandType = CommandType.StoredProcedure;
                            cmd1.Parameters.AddWithValue("@MasterID", MasterID);
                            cmd1.Parameters.AddWithValue("@UserID", UserID);
                            cmd1.Parameters.AddWithValue("@NaicsMode", DeleteNaics);
                            int n = cmd1.ExecuteNonQuery();
                        }
                    }
                    else if (NaicsMode == "2")
                    {
                        DeleteNaics = "NaicsFamily";
                        using (SqlCommand cmd1 = new SqlCommand(Common.app_Dashboard_DeleteMarketContext, con))
                        {
                            cmd1.CommandType = CommandType.StoredProcedure;
                            cmd1.Parameters.AddWithValue("@MasterID", MasterID);
                            cmd1.Parameters.AddWithValue("@UserID", UserID);
                            cmd1.Parameters.AddWithValue("@NaicsMode", DeleteNaics);
                            int n = cmd1.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }




        public string GetMarketContext(string MasterID)
        {
            string UserID = Session["User_Id"].ToString();

            List<MarketContext> GetMarketContext = new List<MarketContext>();

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Dashboard_GetMarketContext, con))

                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        cmd.Parameters.AddWithValue("@MasterID", MasterID);


                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                MarketContext GetMC = new MarketContext();
                                //DataRow dr = ds.Tables["data"].Rows[0];
                                GetMC.MarketContextID = dr["MarketContextID"].ToString();
                                GetMC.Type = dr["Type"].ToString();
                                GetMC.Description = dr["Description"].ToString();
                                GetMC.Code = dr["Code"].ToString();
                                GetMarketContext.Add(GetMC);
                            }
                        }
                    }
                }

            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {

            }
            return new JavaScriptSerializer().Serialize(GetMarketContext);
        }

        public string RemoveMarketContext(MarketContext MarketContext)
        {
            string result = "";
            string Error = "";
            string UserID = Session["User_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    using (SqlCommand cmd1 = new SqlCommand(Common.app_Dashboard_RemoveMarketContext, con))
                    {
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@Code", MarketContext.Code);
                        cmd1.Parameters.AddWithValue("@UserID", UserID);
                        cmd1.Parameters.AddWithValue("@MarketContextID", MarketContext.MarketContextID);
                        cmd1.Parameters.AddWithValue("@RemoveMode", "Single");
                        cmd1.Parameters.AddWithValue("@MasterID", MarketContext.MasterID);

                        int n = cmd1.ExecuteNonQuery();

                        if (n == 1)
                        {
                            result = "Success";
                        }
                        else
                        {
                            result = "fail";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }

        public string GetMarketContextMasterID()
        {
            string UserID = Session["User_Id"].ToString();

            List<MarketContextMasterID> GetMaster = new List<MarketContextMasterID>();

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Dashboard_GetMarketContextMaster, con))

                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                MarketContextMasterID GetMCMaster = new MarketContextMasterID();

                                GetMCMaster.TransId = dr["TransId"].ToString();
                                GetMCMaster.MarketContext_Name = dr["MarketContext_Name"].ToString();

                                GetMaster.Add(GetMCMaster);
                            }
                        }
                    }
                }

            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {

            }
            return new JavaScriptSerializer().Serialize(GetMaster);
        }

        public string UpdateMarketContextUseage(MarketContext MarketContext)
        {
            string result = "";
            string Error = "";
            string UserID = Session["User_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    using (SqlCommand cmd1 = new SqlCommand(Common.app_Dashboard_UpdateMarketContextUsage, con))
                    {
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@MasterID", MarketContext.MasterID);
                        cmd1.Parameters.AddWithValue("@Active", MarketContext.Active);
                        cmd1.Parameters.AddWithValue("@UserID", UserID);
                        cmd1.Parameters.AddWithValue("@Mode", "Insert");


                        int n = cmd1.ExecuteNonQuery();

                        if (n == 1)
                        {
                            result = "Success";
                        }
                        else
                        {
                            result = "fail";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Error = ex.Message;
            }
            con.Close();
            return new JavaScriptSerializer().Serialize(new { result, Error });
        }

        public string GetMarketContextUseage(MarketContext MarketContext)
        {
            string UserID = Session["User_Id"].ToString();

            List<MarketContextMasterID> MarketContextUseage = new List<MarketContextMasterID>();

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Dashboard_UpdateMarketContextUsage, con))

                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        cmd.Parameters.AddWithValue("@MasterID", MarketContext.MasterID);
                        cmd.Parameters.AddWithValue("@Mode", "Get");


                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                MarketContextMasterID GetMCMaster = new MarketContextMasterID();

                                GetMCMaster.Active = dr["Active"].ToString();
                                MarketContextUseage.Add(GetMCMaster);
                            }
                        }
                    }
                }

            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {

            }
            return new JavaScriptSerializer().Serialize(MarketContextUseage);
        }
        [CheckUserSubscription]
        public string GetHelpingIcons(string MasterID)
        {
            string UserID = Session["User_Id"].ToString();

            List<HelpingIcon> GetIcons = new List<HelpingIcon>();

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_GetHelpingIcons, con))

                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                HelpingIcon Icons = new HelpingIcon();
                                //DataRow dr = ds.Tables["data"].Rows[0];
                                Icons.TransId = dr["TransId"].ToString();
                                Icons.Type = dr["Type"].ToString();
                                Icons.Description = dr["Description"].ToString();
                                Icons.Code = dr["Code"].ToString();
                                GetIcons.Add(Icons);
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return new JavaScriptSerializer().Serialize(GetIcons);
        }

        public class MarketContext
        {
            public string MarketContextID { get; set; }
            public string UserID { get; set; }
            public string Type { get; set; }
            public string Description { get; set; }
            public string Code { get; set; }
            public string Mode { get; set; }
            public string Active { get; set; }
            public string MasterID { get; set; }

        }

        public class MarketContextMasterID
        {
            public string TransId { get; set; }
            public string UserID { get; set; }
            public string MarketContext_Name { get; set; }
            public string Active { get; set; }

        }

        public class HelpingIcon
        {

            public string TransId { get; set; }
            public string Type { get; set; }
            public string Code { get; set; }
            public string Description { get; set; }
        }
    }
}