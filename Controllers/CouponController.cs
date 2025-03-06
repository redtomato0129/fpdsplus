using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Services;


namespace FedPipelineApplication.Controllers
{
    public class CouponController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: Coupon
        public ActionResult Index()
        {
            return View();
        }
        [WebMethod]
        public string SaveCoupon(coupon CouponDetails)
        {

            int result = 0;
            string Error = "";
            string AdminID = Session["Admin_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_InsertCoupon, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Code", CouponDetails.Code);
                        cmd.Parameters.AddWithValue("@CodeDescription", CouponDetails.CodeDescription);
                        cmd.Parameters.AddWithValue("@PercentageDiscount", CouponDetails.PercentageDiscount);
                        cmd.Parameters.AddWithValue("@ExpirationDate", CouponDetails.ExpirationDate);
                        cmd.Parameters.AddWithValue("@AdminID", AdminID);
                        cmd.Parameters.AddWithValue("@Active", CouponDetails.Active);

                        result = cmd.ExecuteNonQuery();
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


        public string UpdateCoupon(coupon CouponDetails)
        {

            int result = 0;
            string Error = "";
            string AdminID = Session["Admin_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_UpdateCoupon, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@TransID", CouponDetails.TransID);

                        cmd.Parameters.AddWithValue("@Code", CouponDetails.Code);
                        cmd.Parameters.AddWithValue("@CodeDescription", CouponDetails.CodeDescription);
                        cmd.Parameters.AddWithValue("@PercentageDiscount", CouponDetails.PercentageDiscount);
                        cmd.Parameters.AddWithValue("@ExpirationDate", CouponDetails.ExpirationDate);
                        cmd.Parameters.AddWithValue("@AdminID", AdminID);
                        cmd.Parameters.AddWithValue("@Active", CouponDetails.Active);

                        result = cmd.ExecuteNonQuery();
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

        public string DeleteCoupon(string TransID)
        {

            int result = 0;
            string Error = "";
            string AdminID = Session["Admin_Id"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_DeleteSelectedCoupon, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@TransID", TransID);

                        result = cmd.ExecuteNonQuery();
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

        public string GetCoupon()
        {
            string result = "";
            string AdminID = Session["Admin_Id"].ToString();
            List<coupon> CouponData = new List<coupon>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_Payments_GetCouponData, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@AdminID", AdminID);
                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables["data"].Rows)
                            {
                                coupon data01 = new coupon();
                                //DataRow dr = ds.Tables["data"].Rows[0];
                                data01.Code = dr["Code"].ToString();
                                data01.CodeDescription = dr["CodeDescription"].ToString();
                                data01.PercentageDiscount = dr["PercentageDiscount"].ToString();
                                data01.ExpirationDate = dr["ExpirationDate"].ToString();
                                data01.Active = dr["Active"].ToString();
                                data01.TransID = dr["TransID"].ToString();

                                CouponData.Add(data01);
                            }
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            //return new JavaScriptSerializer().Serialize(SubData);
            return new JavaScriptSerializer().Serialize(new { CouponData, result });
        }

        public class coupon
        {
            public string Code { get; set; }
            public string CodeDescription { get; set; }
            public string PercentageDiscount { get; set; }
            public string ExpirationDate { get; set; }
            public string Active { get; set; }
            public string AdminID { get; set; }
            public string TransID { get; set; }



        }






    }
}