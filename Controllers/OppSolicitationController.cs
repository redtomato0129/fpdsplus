using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FedPipelineApplication.Controllers
{

    [SessionExpire]
    public class OppSolicitationController : Controller
    {
        Utility obj = new Utility();
        EncryptDecrypt EN_DE = new EncryptDecrypt();

        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: OppSolicitation
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RelatedVendorsRelatedVendors(RelatedVendorParameter parameters)
        {
            ViewBag.agency_code = parameters.agency_code;
            ViewBag.department_code = parameters.department_code;
            ViewBag.naics_code = parameters.naics_code;
            return View();
        }

         
        public string RelatedVendorsData(RelatedVendorParameter parameters)
        {
            List<RelatedVendorList> getRelatedVendors = new List<RelatedVendorList>();
            string Error = "";
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(Common.app_Opportunity_GetRelatedVendors, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@naics_code", parameters.naics_code);
                        cmd.Parameters.AddWithValue("@department_code", parameters.department_code);
                        cmd.Parameters.AddWithValue("@agency_code", parameters.agency_code);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {

                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                RelatedVendorList relatedVendor = new RelatedVendorList();

                                relatedVendor.vendor_name = (dr2["vendor_name"].ToString());
                                relatedVendor.recipient_uei = (dr2["recipient_uei"].ToString());
                                relatedVendor.cagecode = (dr2["cagecode"].ToString());
                                relatedVendor.total_funding = (dr2["total_funding"].ToString());
                                

                                getRelatedVendors.Add(relatedVendor);
                            }
                            con.Close();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(getRelatedVendors);
        }


        public JsonResult GetSoliciDetails(string SolicitationNo)
        {

            SolicitationNo = EN_DE.Decrypt(SolicitationNo);

            List<socinoList> getsocino = new List<socinoList>();
            string Error = "";

            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(Common.app_Opportunity_GetSolicitationDetail, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");
                        cmd.Parameters.AddWithValue("@solicitation_number", SolicitationNo);

                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {

                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                socinoList ContractData = new socinoList();

                                ContractData.NoticeId = (dr2["NoticeId"].ToString());
                                ContractData.PostedDate = (dr2["PostedDate"].ToString());
                                ContractData.PostedDate = Convert.ToDateTime(ContractData.PostedDate).ToString("MM/dd/yyyy");
                                ContractData.Title = (dr2["Title"].ToString());
                                ContractData.Department_IndAgency = (dr2["Department_IndAgency"].ToString());
                                ContractData.SubTier = (dr2["SubTier"].ToString());
                                ContractData.Office = (dr2["Office"].ToString());
                                ContractData.Type = (dr2["Type"].ToString());
                                ContractData.BaseType = (dr2["BaseType"].ToString());
                                ContractData.SetASide = (dr2["SetASide"].ToString());
                                ContractData.SetASideCode = (dr2["SetASideCode"].ToString());

                                ContractData.PrimaryContactTitle = (dr2["PrimaryContactTitle"].ToString());
                                ContractData.PrimaryContactFullName = (dr2["PrimaryContactFullName"].ToString());
                                ContractData.PrimaryContactPhone = (dr2["PrimaryContactPhone"].ToString());
                                ContractData.PrimaryContactEmail = (dr2["PrimaryContactEmail"].ToString());

                                ContractData.SecondaryContactTitle = (dr2["SecondaryContactTitle"].ToString());
                                ContractData.SecondaryContactFullName = (dr2["SecondaryContactFullName"].ToString());
                                ContractData.SecondaryContactPhone = (dr2["SecondaryContactPhone"].ToString());
                                ContractData.SecondaryContactEmail = (dr2["SecondaryContactEmail"].ToString());

                                ContractData.Description = (dr2["Description"].ToString());
                                ContractData.Link = (dr2["Link"].ToString());
                                ContractData.SolicitationNo = (SolicitationNo);
                                ContractData.naics_code = (dr2["NaicsCode"].ToString());
                                ContractData.naics_description = (dr2["naics_description"].ToString());
                                ContractData.product_or_service_code = (dr2["psc"].ToString());
                                ContractData.psc_description = (dr2["psc_description"].ToString());
                                ContractData.CGAC = (dr2["CGAC"]).ToString();
                                ContractData.FPDSCode = (dr2["FPDSCode"]).ToString();

                                ContractData.addressLine = (dr2["addressLine"]).ToString();
                                ContractData.CityStZip = (dr2["CityStZip"]).ToString();
                                ContractData.ClassificationCode = (dr2["ClassificationCode"]).ToString();

                                getsocino.Add(ContractData);
                            }
                            con.Close();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Error = ex.Message;
            }
            var jsonResult = Json(getsocino, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
 
           
        }

        public class socinoList
        {

            public string NoticeId { get; set; }
            public string PostedDate { get; set; }
            public string Title { get; set; }
            public string Department_IndAgency { get; set; }
            //public string Solicitation_Number { get; set; }
            public string SubTier { get; set; }
            public string Office { get; set; }
            public string Type { get; set; }
            public string BaseType { get; set; }
            public string SetASide { get; set; }
            public string SetASideCode { get; set; }
            public string PrimaryContactTitle { get; set; }
            public string PrimaryContactFullName { get; set; }
            public string PrimaryContactPhone { get; set; }
            public string PrimaryContactEmail { get; set; }
            public string SecondaryContactTitle { get; set; }
            public string SecondaryContactFullName { get; set; }
            public string SecondaryContactPhone { get; set; }
            public string SecondaryContactEmail { get; set; }
            public string Description { get; set; }
            public string SolicitationNo { get; set; }
            public string Link { get; set; }
            public string naics_code { get; set; }
            public string naics_description { get; set; }
            public string product_or_service_code { get; set; }
            public string psc_description { get; set; }

            public string CGAC { get; set; }
            public string FPDSCode { get; set; }

            public string addressLine { get; set; }
            public string CityStZip { get; set; }
            public string ClassificationCode { get; set; }
        }

        public class RelatedVendorParameter
        {
            public string naics_code { get; set; }
            public string department_code { get; set; }
            public string agency_code { get; set; }
        }

        public class RelatedVendorList
        {
            public string vendor_name { get; set; }
            public string recipient_uei { get; set; }
            public string cagecode { get; set; }
            public string total_funding { get; set; }

        }
    }
}