using FedPipelineApplication.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace FedPipelineApplication.Controllers
{
    [SessionExpire]
    [CheckUserSubscription]
    public class OpportunityController : Controller
    {
        Utility obj = new Utility();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        // GET: Opportunity
        public ActionResult Index()
        {
            return View();

        }

        public ActionResult Chat()
        {
            return View();

        }

        [WebMethod]



        public string GetPSC(string Code)
        {
            List<string> GetPSCDesc = new List<string>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(Common.app_GetPSCList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Code", Code);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            GetPSCDesc.Add(dr2["description"].ToString());
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(GetPSCDesc);

        }


        public string SearchOpportunity(SearchOpportunityData SearchOpportunity)
        {
            List<SearchOpportunityData> GetInitialData = new List<SearchOpportunityData>();
            string Error = "";
            string User_Id = Session["User_Id"].ToString();
            string paidUser = Session["Paid"].ToString();
            //string paidUser = "True";
            string storedProcedureName;
            SearchOpportunity.Solicitation_Number = SearchOpportunity.Solicitation_Number?.ToString() ?? "";

            if (SearchOpportunity.Solicitation_Number != "")
            {
                storedProcedureName = Common.app_Opportunity_GetOpportunityBySolicitationIdentifier;
            }
            else
            {
                storedProcedureName = Common.app_Opportunity_GetOpportunityList;
            }



            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                try
                {
                    using (SqlCommand cmd = new SqlCommand(storedProcedureName, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (SearchOpportunity.Solicitation_Number != "")
                        {
                            cmd.Parameters.AddWithValue("@solicitation_identifier", SearchOpportunity.Solicitation_Number);
                        }

                        else
                        {
                            cmd.Parameters.AddWithValue("@naics", SearchOpportunity.NAICS?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@psc", SearchOpportunity.PSC?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@department_group_code", SearchOpportunity.department_group_code?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@agency_group_code", SearchOpportunity.agency_group_code?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@setAside", SearchOpportunity.business_type_code_list?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@keyword_list", SearchOpportunity.keyword_list?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@posted_date_start", SearchOpportunity.PosteDateStart?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@posted_date_end", SearchOpportunity.PosteDateEnd?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@BaseType", SearchOpportunity.BaseType?.ToString() ?? "");
                            cmd.Parameters.AddWithValue("@user_id", User_Id);


                        }

                        //Console.WriteLine("[GetOpportunityList] " + SearchOpportunity.NAICS + "," + SearchOpportunity.naics_family + "," + SearchOpportunity.PSC + "," + SearchOpportunity.business_type_code_list + "," + SearchOpportunity.department_group_code + "," + SearchOpportunity.agency_group_code + "," + SearchOpportunity.PosteDateStart + "," + SearchOpportunity.PosteDateEnd + "," + SearchOpportunity.BaseType + "");

                        //var execute = "[app_GetOpportunityList] " + SearchOpportunity.NAICS + "," + SearchOpportunity.naics_family + "," + SearchOpportunity.PSC + "," + SearchOpportunity.business_type_code_list + "," + SearchOpportunity.department_group_code + "," + SearchOpportunity.agency_group_code + "," + SearchOpportunity.PosteDateStart + "," + SearchOpportunity.PosteDateEnd + "," + SearchOpportunity.BaseType + ","+ User_Id;
                        //if (SearchOpportunity.PosteDateStart == null) { SearchOpportunity.PosteDateStart = ""; }
                        //if (SearchOpportunity.PosteDateEnd == null) { SearchOpportunity.PosteDateEnd = ""; }
                        //if (SearchOpportunity.PSC == null) { SearchOpportunity.PSC = ""; }
                        //if (SearchOpportunity.NAICS == null) { SearchOpportunity.NAICS = ""; }
                        //if (SearchOpportunity.department_group_code == null) { SearchOpportunity.department_group_code = ""; }
                        //if (SearchOpportunity.agency_group_code == null) { SearchOpportunity.agency_group_code = ""; }
                        //if (SearchOpportunity.keyword_list == null) { SearchOpportunity.keyword_list = ""; }
                        //if (SearchOpportunity.business_type_code_list == null) { SearchOpportunity.business_type_code_list = ""; }
                        //if (SearchOpportunity.BaseType == null) { SearchOpportunity.BaseType = ""; }
                        //if (SearchOpportunity.Solicitation_Number == null) { SearchOpportunity.Solicitation_Number = ""; }




                        //cmd.Parameters.AddWithValue("@naics", "");
                        //cmd.Parameters.AddWithValue("@psc", "");
                        //cmd.Parameters.AddWithValue("@department_group_code", "");
                        //cmd.Parameters.AddWithValue("@agency_group_code", "");
                        //cmd.Parameters.AddWithValue("@setAside", "");
                        //cmd.Parameters.AddWithValue("@keyword_list", "");
                        //cmd.Parameters.AddWithValue("@posted_date_start", "2/5/2020");
                        //cmd.Parameters.AddWithValue("@posted_date_end", "2/8/2020");




                        DataSet ds = obj.getDataSet_SP(cmd);
                        if (ds.Tables["data"].Rows.Count > 0)
                        {
                            foreach (DataRow dr2 in ds.Tables["data"].Rows)
                            {
                                SearchOpportunityData Initial = new SearchOpportunityData();
                                Initial.NoticeId = (dr2["NoticeId"].ToString());
                                Initial.Title = (dr2["Title"].ToString());
                                Initial.Department_IndAgency = (dr2["Department_IndAgency"].ToString());
                                Initial.Solicitation_Number = (dr2["Solicitation_Number"].ToString());
                                Initial.SubTier = (dr2["SubTier"].ToString());
                                Initial.Type = (dr2["Type"].ToString());
                                Initial.BaseType = (dr2["BaseType"].ToString());
                                Initial.SetASideCode = (dr2["SetASideCode"].ToString());
                                Initial.PostedDate = (dr2["PostedDate"].ToString());
                                Initial.PostedDate = Convert.ToDateTime(Initial.PostedDate).ToString("MM/dd/yyyy");
                                Initial.department_code = (dr2["department_code"].ToString());
                                Initial.agency_code = (dr2["agency_code"].ToString());
                                Initial.NaicsCode = (dr2["NaicsCode"].ToString());
                                Initial.Setaside = (dr2["Setaside"].ToString());
                                Initial.Processed= (dr2["processed"].ToString());


                                if (paidUser == "False")
                                {
                                    Initial.ClassificationCode = (dr2["ClassificationCode"].ToString());
                                }
                                else
                                {
                                    if (SearchOpportunity.Solicitation_Number != "")
                                    {
                                        Initial.ClassificationCode = (dr2["ClassificationCode"].ToString());
                                    }
                                    else
                                    {
                                        Initial.ClassificationCode = (dr2["psc"].ToString());
                                    }
                                }
                                GetInitialData.Add(Initial);
                            }
                        }

                    }

                }
                catch (Exception ex)
                {
                    Error = ex.Message;

                }
                con.Close();
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = 86753090 };

            return serializer.Serialize(new { GetInitialData, Error });
            //return new JavaScriptSerializer().Serialize(new { GetInitialData, Error });

        }
        public string Get_SocioEconomic()
        {
            List<SocioEco> getSocio = new List<SocioEco>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(Common.app_GetSetAsideList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            SocioEco getvalues = new SocioEco();
                            getvalues.abbreviation = (dr2["SetASide"].ToString());
                            getvalues.SetASideCode = (dr2["SetASideCode"].ToString());
                            getSocio.Add(getvalues);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getSocio);

        }
        public string CheckUser()
        {
            string getUserInfo = "";

            string User_Email = Session["User_Email"].ToString();
            string User_Id = Session["User_Id"].ToString();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();


                using (SqlCommand cmd = new SqlCommand(Common.app_GetUserInfo, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@User_Email", User_Email);
                    cmd.Parameters.AddWithValue("@User_Id", User_Id);


                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            getUserInfo = (dr2["Paid"].ToString());
                            Session["Paid"] = getUserInfo;
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getUserInfo);

        }
        public string GetBaseType()
        {
            List<BaseTypeList> getBaseType = new List<BaseTypeList>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand(Common.app_Opportunity_GetBaseTypeList, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    //cmd.Parameters.AddWithValue("@LEGAL_BUSINESS_NAME");

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {

                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            BaseTypeList BaseTypeData = new BaseTypeList();
                            BaseTypeData.value = (dr2["BaseType"].ToString());

                            getBaseType.Add(BaseTypeData);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(getBaseType);

        }

        public string ChatBot(string query, string notifyId)
        {
            ChatBotResponse response;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://127.0.0.1:7000/");
                //HTTP GET
                var responseTask = client.GetAsync("search?query="+query+"&&notice_ids="+notifyId);
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync();
                    readTask.Wait();

                    var alldata = readTask.Result;

                    dynamic d = JObject.Parse(alldata);
                    var answer = d.answer.ToString();
                    var source = d.source.ToString();
                    response = new ChatBotResponse
                    { answer = answer,
                              source = source };
                }
                else
                {
                    response = new ChatBotResponse
                    {
                        answer = string.Empty,
                        source = string.Empty
                    };
                }
            }
            return new JavaScriptSerializer().Serialize(response);
        }

        public string getOpportunityListByNoticeIds(List<string> noticeid)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            List<SearchOpportunityData> opportunityList = new List<SearchOpportunityData>();
            string Error = "";

            // string UserID = "37";
            try
            {
                foreach (string n in noticeid)
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        sp = "app_Opportunity_GetOpportunityList_by_noticeId";
                        using (SqlCommand cmd = new SqlCommand(sp, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@notifyid", n);
                            DataSet ds = obj.getDataSet_SP(cmd);
                            if (ds.Tables["data"].Rows.Count > 0)
                            {
                                foreach (DataRow dr2 in ds.Tables["data"].Rows)
                                {
                                    SearchOpportunityData opportunityObject = new SearchOpportunityData();
                                    opportunityObject.NoticeId = (dr2["NoticeId"].ToString());
                                    opportunityObject.Title = (dr2["Title"].ToString());
                                    opportunityObject.Department_IndAgency = (dr2["Department_IndAgency"].ToString());
                                    opportunityObject.Solicitation_Number = (dr2["Solicitation_Number"].ToString());
                                    opportunityObject.SubTier = (dr2["SubTier"].ToString());
                                    opportunityObject.Type = (dr2["Type"].ToString());
                                    opportunityObject.BaseType = (dr2["BaseType"].ToString());
                                    opportunityObject.SetASideCode = (dr2["SetASideCode"].ToString());
                                    opportunityObject.PostedDate = (dr2["PostedDate"].ToString());
                                    opportunityObject.PostedDate = Convert.ToDateTime(opportunityObject.PostedDate).ToString("MM/dd/yyyy");
                                    opportunityObject.department_code = (dr2["department_code"].ToString());
                                    opportunityObject.agency_code = (dr2["agency_code"].ToString());
                                    opportunityObject.NaicsCode = (dr2["NaicsCode"].ToString());
                                    opportunityObject.Setaside = (dr2["Setaside"].ToString());
                                    opportunityList.Add(opportunityObject);
                                }

                            }
                            con.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { opportunityList });
        }
        public string SaveOpportunityEmail(OpportunityEmail parameters)
        {
            var error = string.Empty;
            var response = string.Empty;
            var userEmailAddress = Session["User_Email"].ToString();
            var User_Id = Convert.ToInt32(Session["User_Id"]);
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Common.app_OpportunityEmail, con))
                    {
                        var searchParameters = new OpportunityEmail()
                        {
                            solicitation_number = parameters.solicitation_number,
                            naics_code = parameters.naics_code,
                            naics_description = parameters.naics_description,
                            service_code = parameters.service_code,
                            service_description = parameters.service_description,
                            funding_agency = parameters.funding_agency,
                            funding_agency_name = parameters.funding_agency_name,
                            funding_sub_agency = parameters.funding_sub_agency,
                            funding_sub_agency_name = parameters.funding_sub_agency_name,
                            keyword = parameters.keyword,
                            socio_economic_designation = parameters.socio_economic_designation,
                            socio_economic_designation_name = parameters.socio_economic_designation_name,
                            base_type = parameters.base_type,
                            email_address = userEmailAddress,
                            userid = User_Id,
                            daily_report_name = parameters.daily_report_name,
                        };

                       

                        if (parameters.solicitation_number == "None Chosen")
                            parameters.solicitation_number = null;
                        if (parameters.naics_code == "None Chosen")
                            parameters.naics_code = null;
                        if (parameters.naics_description == "None Chosen")
                            parameters.naics_description = null;
                        if (parameters.service_code == "None Chosen")
                            parameters.service_code = null;
                        if (parameters.service_description == "None Chosen")
                            parameters.service_description = null;
                        if (parameters.funding_agency == "None Chosen")
                            parameters.funding_agency = null;
                        if (parameters.funding_agency_name == "None Chosen")
                            parameters.funding_agency_name = null;
                        if (parameters.funding_sub_agency == "None Chosen")
                            parameters.funding_sub_agency = null;
                        if (parameters.funding_sub_agency_name == "None Chosen")
                            parameters.funding_sub_agency_name = null;
                        if (parameters.keyword == "None Chosen")
                            parameters.keyword = null;
                        if (parameters.socio_economic_designation == "None Chosen")
                            parameters.socio_economic_designation = null;
                        if (parameters.socio_economic_designation_name == "None Chosen")
                            parameters.socio_economic_designation_name = null;
                        if (parameters.base_type == "None Chosen")
                            parameters.base_type = null;

                        if (parameters.naics_code != null)
                        {
                            if (parameters.naics_code.Length.Equals(4))
                            {
                                parameters.naics_family = 1;
                            }
                            if (parameters.naics_code.Length.Equals(6))
                            {
                                parameters.naics_family = 0;
                            }
                        }

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@solicitation_number", parameters.solicitation_number);
                        cmd.Parameters.AddWithValue("@naics_code", parameters.naics_code);
                        cmd.Parameters.AddWithValue("@naics_description", parameters.naics_description);
                        cmd.Parameters.AddWithValue("@service_code", parameters.service_code);
                        cmd.Parameters.AddWithValue("@service_description", parameters.service_description);
                        cmd.Parameters.AddWithValue("@funding_agency", parameters.funding_agency);
                        cmd.Parameters.AddWithValue("@funding_sub_agency", parameters.funding_sub_agency);
                        cmd.Parameters.AddWithValue("@funding_agency_name", parameters.funding_agency_name);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_name", parameters.funding_sub_agency_name);
                        cmd.Parameters.AddWithValue("@keyword", parameters.keyword);
                        cmd.Parameters.AddWithValue("@socio_economic_designation", parameters.socio_economic_designation);
                        cmd.Parameters.AddWithValue("@socio_economic_designation_name", parameters.socio_economic_designation_name);
                        cmd.Parameters.AddWithValue("@base_type", parameters.base_type);
                        cmd.Parameters.AddWithValue("@email_address", userEmailAddress);
                        cmd.Parameters.AddWithValue("@userid", User_Id);
                        cmd.Parameters.AddWithValue("@daily_report_name", parameters.daily_report_name);
                        cmd.Parameters.AddWithValue("@naics_family", parameters.naics_family);


                        var result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            //mail.SendContractSearchRequestEmail(userEmailAddress, searchParameters);
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public class SearchOpportunityData
        {
            //Request Param//
            public string PosteDateStart { get; set; }
            public string PosteDateEnd { get; set; }
            public string PSC { get; set; }
            public string NAICS { get; set; }
            public string department_group_code { get; set; }
            public string agency_group_code { get; set; }
            public string keyword_list { get; set; }
            public string naics_family { get; set; }
            public string business_type_code_list { get; set; }
            public string BaseType { get; set; }
            public string Solicitation_Number { get; set; }
            public string Processed { get; set; }


            // Response Param//
            public string Title { get; set; }
            public string Department_IndAgency { get; set; }
            public string SubTier { get; set; }
            public string PostedDate { get; set; }
            public string Type { get; set; }
            public string SetASideCode { get; set; }
            public string department_code { get; set; }
            public string agency_code { get; set; }
            public string NaicsCode { get; set; }
            public string Setaside { get; set; }
            public string ClassificationCode { get; set; }
            public string NoticeId { get; set; }
        }
        public class SocioEco
        {
            public string abbreviation { get; set; }
            public string SetASideCode { get; set; }
        }
        public class BaseTypeList
        {
            public string value { get; set; }


        }

        public class ChatBotResponse
        {
            public string answer { get; set; }
            public string source { get; set; }


        }

    }
}

