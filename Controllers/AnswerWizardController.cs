using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Database;
using OfficeOpenXml.Style;
using OfficeOpenXml.Table;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using FedPipelineApplication.Models;
using System.Linq;
using Microsoft.Office.Core;
/*using PowerPoint = Microsoft.Office.Interop.PowerPoint;
using System.Windows.Media.Media3D;*/
using Aspose;
using Aspose.Slides;
using System.Globalization;
using System.Web.Hosting;
using System.Web.Services.Description;

namespace FedPipelineApplication.Controllers
{
    public class AnswerWizardController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();

        /// <summary>
        /// Helper method to safely convert string values to double, handling null/empty values and parsing errors
        /// </summary>
        /// <param name="value">String value to convert</param>
        /// <param name="defaultValue">Default value to return if conversion fails (default: 0.0)</param>
        /// <returns>Converted double value or default value</returns>
        private double SafeParseDouble(string value, double defaultValue = 0.0)
        {
            return !string.IsNullOrEmpty(value) && double.TryParse(value, out double result) ? result : defaultValue;
        }

        /// <summary>
        /// Helper method to safely convert string values to double and return as string, handling null/empty values and parsing errors
        /// </summary>
        /// <param name="value">String value to convert</param>
        /// <param name="defaultValue">Default value to return if conversion fails (default: "0")</param>
        /// <returns>Converted double value as string or default value</returns>
        private string SafeParseDoubleAsString(string value, string defaultValue = "0")
        {
            return !string.IsNullOrEmpty(value) && double.TryParse(value, out double result) ? result.ToString() : defaultValue;
        }
        // GET: AnswerWizard
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult QuestionView()
        {
            return View();
        }

        public ActionResult QuestionParams()
        {
            return View();
        }

        public ActionResult QuestionDashboard()
        {
            return View();
        }

        public ActionResult DrillDown1()
        {
            return View();
        }

        public ActionResult DrillDown2()
        {
            return View();
        }

        public ActionResult FpdsPage()
        {
            return View();
        }

        public ActionResult VendorPlus()
        {
            return View();
        }

        public ActionResult ContractInventory()
        {
            return View();
        }

        public ActionResult OpportunityDataGrid()
        {
            return View();
        }

        public ActionResult OpportunityPlus()
        {
            return View();
        }

        public ActionResult HdrDataGrid()
        {
            return View();
        }

        public ActionResult HdrDrilldown()
        {
            return View();
        }

        public ActionResult HdrUEIplus()
        {
            return View();
        }

        public ActionResult FpdsCPARSPage()
        {
            return View();
        }


        public string QuestionList(int agency, int contract, int opportunity, int vendor, string search_text, string instance, int hdr)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<WizardQuestionList> questionList = new List<WizardQuestionList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = String.Empty;
                    if (String.IsNullOrEmpty(search_text))
                    {
                        sp = "wizard_question_get_all";
                    }
                    else
                    {
                        sp = "wizard_question_get_all_search";
                    }

                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@agency", agency);
                    cmd1.Parameters.AddWithValue("@contract", contract);
                    cmd1.Parameters.AddWithValue("@opportunity", opportunity);
                    cmd1.Parameters.AddWithValue("@vendor", vendor);
                    cmd1.Parameters.AddWithValue("@hdr", hdr);
                    cmd1.Parameters.AddWithValue("@mode", instance);
                    if (!String.IsNullOrEmpty(search_text))
                    {
                        cmd1.Parameters.AddWithValue("@search_text", search_text);
                    }
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        WizardQuestionList questionObject = new WizardQuestionList();
                        questionObject.question_id = Convert.ToInt32(rdr["question_id"]);
                        questionObject.question_name = rdr["question_name"].ToString();
                        questionObject.description = rdr["description"].ToString();
                        questionObject.agency = Convert.ToInt32(rdr["agency"]);
                        questionObject.vendor = Convert.ToInt32(rdr["vendor"]);
                        questionObject.opportunity = Convert.ToInt32(rdr["opportunity"]);
                        questionObject.contract = Convert.ToInt32(rdr["contract"]);
                        //questionObject.hdr = Convert.ToInt32(rdr["hdr"]);
                        questionObject.ui_style = rdr["ui_style"].ToString();
                        questionObject.skip_charts = Convert.ToInt32(rdr["skip_charts"]);
                        questionList.Add(questionObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = questionList });
        }

        public string GetQuestionParams(int question_id)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<WizardQuestionParamsList> questionParamsList = new List<WizardQuestionParamsList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_question_parameter_by_id";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@question_id", question_id);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        WizardQuestionParamsList paramsObject = new WizardQuestionParamsList();
                        paramsObject.wizard_question_parameter_id = Convert.ToInt32(rdr["wizard_question_parameter_id"]);
                        paramsObject.question_id = Convert.ToInt32(rdr["question_id"]);
                        paramsObject.question_name = rdr["question_name"].ToString();
                        paramsObject.description = rdr["description"].ToString();
                        paramsObject.ui_style = rdr["ui_style"].ToString();
                        paramsObject.parameter_id = Convert.ToInt32(rdr["parameter_id"]);
                        paramsObject.parameter_name = rdr["parameter_name"].ToString();
                        paramsObject.parameter_type = rdr["parameter_type"].ToString();
                        paramsObject.parameter_data = rdr["parameter_data"].ToString();
                        paramsObject.toggle_button = Convert.ToInt32(rdr["toggle_button"]);
                        paramsObject.required_field = Convert.ToInt32(rdr["required_field"]);
                        paramsObject.parameter_query_param = rdr["parameter_query_param"].ToString();
                        if (paramsObject.parameter_type == "project_list")
                        {
                            List<ProjectList> projectList = new List<ProjectList>();
                            try
                            {
                                AnswerWidgetService service = new AnswerWidgetService();
                                paramsObject.ProjectList = service.fetchProjectList();
                            }
                            catch (Exception ex)
                            {
                                error = ex.Message;
                            }

                        }
                        questionParamsList.Add(paramsObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = questionParamsList });
        }

        public string GetQuestionHelp(int question_id, string page_name)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<HelpList> helpList = new List<HelpList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    AnswerWidgetService service = new AnswerWidgetService();
                    var sp = "wizard_question_help_data";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@question_id", question_id);
                    cmd1.Parameters.AddWithValue("@page_name", page_name);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        HelpList helpObject = new HelpList();
                        helpObject.question_id = service.typeChecker(rdr, "question_id") ? 0 : Convert.ToInt32(rdr["question_id"]);
                        helpObject.page_name = rdr["page_name"].ToString();
                        helpObject.description = rdr["description"].ToString();
                        helpList.Add(helpObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = helpList });
        }

        public string GetQuestionParamsFields(string solicitation_number, int question_id)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<question1Response> paramsList = new List<question1Response>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (question_id == 2)
                    {
                        var sp = "Wizard_Question2_GetCompetitorsByRFP_FormDetails";
                        string UserID = Session["User_ID"].ToString();
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@solicitation_number", solicitation_number);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            question1Response paramsObject = new question1Response();
                            paramsObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            paramsObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            paramsObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            paramsObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            paramsObject.naics_code = rdr["naics_code"].ToString();
                            paramsObject.set_aside_code = rdr["set_aside_code"].ToString();
                            paramsObject.set_aside = rdr["set_aside"].ToString();
                            if (!String.IsNullOrEmpty(paramsObject.funding_agency_code) && !String.IsNullOrEmpty(paramsObject.funding_sub_agency_code) &&
                                !String.IsNullOrEmpty(paramsObject.naics_code))
                            {
                                paramsList.Add(paramsObject);
                            }

                        }
                        con.Close();
                    }
                    if (question_id == 51)
                    {
                        var sp = "Wizard_Question51_OpportunitiesSimilarToContract_FormDetails";
                        string UserID = Session["User_ID"].ToString();
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@contract_number", solicitation_number);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            question1Response paramsObject = new question1Response();
                            paramsObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            paramsObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            paramsObject.funding_office_code = rdr["funding_office_code"].ToString();
                            paramsObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            paramsObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            paramsObject.funding_office_name = rdr["funding_office_name"].ToString();
                            paramsObject.naics_code = rdr["naics_code"].ToString();
                            paramsObject.set_aside_code = rdr["set_aside_code"].ToString();
                            paramsObject.set_aside = rdr["set_aside"].ToString();
                            paramsObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            paramsObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            if (!String.IsNullOrEmpty(paramsObject.funding_agency_code) && !String.IsNullOrEmpty(paramsObject.funding_sub_agency_code) &&
                                !String.IsNullOrEmpty(paramsObject.naics_code))
                            {
                                paramsList.Add(paramsObject);
                            }

                        }
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = paramsList });
        }

        public string GetVendorList(string search_text)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorList> vendorList = new List<VendorList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_GetVendorList";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@search_text", search_text);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorList vendorObject = new VendorList();
                        vendorObject.vendor_uei = rdr["vendor_uei"].ToString();
                        vendorObject.vendor_name_uei = rdr["vendor_name_uei"].ToString();
                        vendorList.Add(vendorObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = vendorList });
        }

        public string GetAgencyName()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<AgencyName> agencyName = new List<AgencyName>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_HDR_agency_list";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        AgencyName agencyNameObject = new AgencyName();
                        agencyNameObject.agency_name = rdr["agency_name"].ToString();
                        agencyName.Add(agencyNameObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = agencyName });
        }

        public string GetCompanyName(string company_name)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<CompanyName> agencyName = new List<CompanyName>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Wizard_Question_HDR_67_CompanyDetail";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@company_name", company_name);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        CompanyName agencyNameObject = new CompanyName();
                        agencyNameObject.operating_company = rdr["operating_company"].ToString();
                        agencyNameObject.uei = rdr["uei"].ToString();
                        agencyName.Add(agencyNameObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = agencyName });
        }

        public string GetOpportunityType()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<OpportunityTypeList> opportunityList = new List<OpportunityTypeList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Opportunity_getOpportunityType";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        OpportunityTypeList opportunityObject = new OpportunityTypeList();
                        opportunityObject.opportunity_type = rdr["opportunity_type"].ToString();
                        opportunityList.Add(opportunityObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = opportunityList });
        }

        public string GetTypeOfSetAisde()
        {
            var error = string.Empty;
            var response = string.Empty;
            List<SetAsideList> setAsideList = new List<SetAsideList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_GetTypeOfSetAisde";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        SetAsideList setAsideObject = new SetAsideList();
                        setAsideObject.Business_type_description = rdr["type_of_set_aside"].ToString();
                        setAsideObject.abbreviation = rdr["type_of_set_aside_code"].ToString();
                        setAsideList.Add(setAsideObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(setAsideList);
        }

        public string GetQuestionWidgetsList(WidgetDasboardWidgetsPayload body)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<WizardDashboardWidgetsList> widgetList = new List<WizardDashboardWidgetsList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_widget_by_question_id";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@question_id", body.question_id);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        WizardDashboardWidgetsList widgetObject = new WizardDashboardWidgetsList();
                        widgetObject.wizard_question_widget_id = Convert.ToInt32(rdr["wizard_question_widget_id"]);
                        widgetObject.question_id = Convert.ToInt32(rdr["question_id"]);
                        widgetObject.widget_id = Convert.ToInt32(rdr["widget_id"]);
                        widgetObject.widget_name = rdr["widget_name"].ToString();
                        widgetObject.store_procedure = rdr["store_procedure"].ToString();
                        widgetObject.wizard_widget_type_id = Convert.ToInt32(rdr["wizard_widget_type_id"]);
                        widgetObject.wizard_widget_type_type = rdr["wizard_widget_type_type"].ToString();
                        widgetObject.wizard_widget_type_url = rdr["wizard_widget_type_url"].ToString();
                        widgetObject.question_name = rdr["question_name"].ToString();
                        widgetObject.description = rdr["description"].ToString();
                        widgetObject.page_number = Convert.ToInt32(rdr["page_number"]);
                        widgetObject.x_axis = rdr["x_axis"].ToString();
                        widgetObject.y_axis = rdr["y_axis"].ToString();
                        widgetObject.y_axis_bar_label = rdr["y_axis_bar_label"].ToString();
                        widgetObject.y_axis_line_label = rdr["y_axis_line_label"].ToString();
                        widgetObject.y_axis_line = rdr["y_axis_line"].ToString();
                        widgetObject.x_axis_label = rdr["x_axis_label"].ToString();
                        widgetObject.y_axis_label = rdr["y_axis_label"].ToString();
                        widgetObject.widget_help_description = rdr["widget_help_description"].ToString();
                        widgetObject.widget_currency_field = rdr["widget_currency_field"].ToString();
                        widgetObject.query_params_key = rdr["query_params_key"].ToString();
                        widgetObject.query_params_field = rdr["query_params_field"].ToString();
                        widgetList.Add(widgetObject);
                    }
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = widgetList });
        }

        public string ExecuteStoreProcedure(StoreProcedureBody body)
        {
            var error = string.Empty;
            var response = string.Empty;
            var widgetList = new List<dynamic>();
            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (body.store_procedure == "Wizard_Question1_GetTopVendorsByAgencyNAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question2_GetCompetitorsByRFP")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.data_type = rdr["data_type"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question3_GetTeammatesforAgencyNAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@maximum_contract_size", body.maximum_contract_size);
                        cmd1.Parameters.AddWithValue("@minimum_number_of_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();

                            widgetObject.vendor_name = rdr["vendor_name"].ToString();

                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question5_GetLargestContractAgencyExpiring")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@expire_date", body.expiration_date_start);
                        cmd1.Parameters.AddWithValue("@expire_date_end", body.expiration_date_end);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@maximum_contract_size", body.maximum_contract_size);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside_code", body.set_aside_1);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            widgetObject.contracts = Convert.ToInt32(rdr["total_contracts"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["dollars_obligated"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question6_VendorList8aNContractsNoLonger8A")
                    {

                        var temp_sa = "";
                        var sp = body.store_procedure;
                        if (body.set_aside == "8A Sole Source")
                        {
                            temp_sa = "8AN";
                        }
                        else if (body.set_aside == "8A Competed")
                        {
                            temp_sa = "8A";
                        }
                        else
                        {
                            temp_sa = "Both";
                        }

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside", temp_sa);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.number_of_contracts = Convert.ToInt32(rdr["number_of_contracts"]);
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question7_VendorsWithExpiring8aContracts")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@expire_date_start", body.expire_date_start);
                        cmd1.Parameters.AddWithValue("@expire_date_end", body.expire_date_end);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code != 0 ? body.naics_code.ToString() : "");
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.contracts = Convert.ToInt32(rdr["contracts"]);
                            widgetObject.total_dollars_obligated = Convert.ToDouble(rdr["total_dollars_obligated"]);
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question8_GetTopFundingOfficesByFiscalYearNAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_offices", body.total_offices);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_sub_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question9_AgencySpendingByFY_NAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_agency_count", body.total_agency);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question14_AgencySpendingFY_SetAside")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options_total = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetObject.set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.set_aside_code = rdr["type_of_set_aside_code"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question16_AgencyObligationsFYNaics")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_sub_agency_code = rdr["agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            widgetObject.total_dollars_obligated = Convert.ToDouble(rdr["dollars_obligated"]);
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question17_AgencySpendingFY_SetAside_vs_UNR")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options_UNR = SafeParseDouble(rdr["base_and_all_options_UNR"].ToString());
                            widgetObject.base_and_all_options_SETASIDE = SafeParseDouble(rdr["base_and_all_options_SETASIDE"].ToString());
                            widgetObject.total_dollars_obligated_UNR = SafeParseDouble(rdr["total_dollars_obligated_UNR"].ToString());
                            widgetObject.total_dollars_obligated_SETASIDE = SafeParseDouble(rdr["total_dollars_obligated_SETASIDE"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question18_AgencySpendingFY_8a_vs_SB")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options_8A = SafeParseDouble(rdr["base_and_all_options_8A"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_8A = SafeParseDouble(rdr["total_dollars_obligated_8A"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question19_AgencySpendingFY_WOSB_vs_SB")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options_WOSB = SafeParseDouble(rdr["base_and_all_options_WOSB"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_WOSB = SafeParseDouble(rdr["total_dollars_obligated_WOSB"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question20_AgencySpendingFY_SDVOSB_vs_SB")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options_SDVOSB = SafeParseDouble(rdr["base_and_all_options_SDVOSB"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_SDVOSB = SafeParseDouble(rdr["total_dollars_obligated_SDVOSB"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question21_AgencySpendingFY_HUBZONE_vs_SB")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options_HUBZONE = SafeParseDouble(rdr["base_and_all_options_HUBZONE"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_HUBZONE = SafeParseDouble(rdr["total_dollars_obligated_HUBZONE"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question26_AgencySpendingPlaceOfPerformance")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_city", body.primary_place_of_performance_city);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_state_code", body.primary_place_of_performance_state_code);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_country_code", body.primary_place_of_performance_country_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question29_TopContractsByAgency")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@total_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.total_dollars_obligated = Convert.ToDouble(rdr["total_dollars_obligated"]);
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question31_GetTopVendorsWith8ASoleSourceContracts")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.sp_type = rdr["sp_type"].ToString();
                            widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_dollars_obligated = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question34_VendorContractInventory")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["dollars_obligated"].ToString());
                            widgetList.Add(widgetObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question35_GetSetAisdeUsage")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_agencies", body.total_agency);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question36_GetTopVendorsByAgencyNAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question37_GetTeammatesforAgencyNAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@minimum_number_of_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.fao_count = Convert.ToInt32(rdr["fao_count"]);

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question38_GetCompetitorsByRFP")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.data_type = rdr["data_type"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question40_GetVehicleFundingByAgency")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.CommandTimeout = 120;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@project_id", body.project_id);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", String.IsNullOrEmpty(body.agency_code) ? "" : body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", String.IsNullOrEmpty(body.sub_agency_code) ? "" : body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["federal_action_obligations"].ToString());
                            if (body.agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["department_code"].ToString();
                                widgetObject.funding_agency_name = rdr["department_name"].ToString();
                            }
                            else if (body.sub_agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                                widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_code = rdr["office_code"].ToString();
                                widgetObject.funding_agency_name = rdr["office_name"].ToString();
                            }

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question41_GetVehicleFundingByAgency")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd = new SqlCommand(sp, con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 120;
                        string vendor = String.IsNullOrEmpty(body.vendor_uei) ? "" : body.vendor_uei;
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? "" : body.agency_code;
                        string subAgencyCode = String.IsNullOrEmpty(body.sub_agency_code) ? "" : body.sub_agency_code;
                        cmd.Parameters.AddWithValue("@vendor_uei", vendor);
                        cmd.Parameters.AddWithValue("@years", body.years);
                        cmd.Parameters.AddWithValue("@project_id", body.project_id);
                        cmd.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["federal_action_obligations"].ToString());
                            if (body.agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["department_code"].ToString();
                                widgetObject.funding_agency_name = rdr["department_name"].ToString();
                            }
                            else if (body.sub_agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                                widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_code = rdr["office_code"].ToString();
                                widgetObject.funding_agency_name = rdr["office_name"].ToString();
                            }
                            /*widgetObject.funding_sub_agency_code = rdr["agency_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["agency_name"].ToString();
                            widgetObject.funding_sub_agency_code = rdr["office_code"].ToString();
                            widgetObject.funding_sub_agency_name = rdr["office_name"].ToString();*/

                            widgetList.Add(widgetObject);
                        }

                    }

                    if (body.store_procedure == "Wizard_Question42_AgencySpendingFYSetAsideComparison")
                    {

                        var sp = body.store_procedure;
                        string[] setAside = body.set_aside_2.Split(',');
                        var set_aside_code_1 = setAside[0].Trim();
                        var set_aside_code_2 = setAside[1].Trim();
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? "" : body.agency_code;
                        string subAgencyCode = String.IsNullOrEmpty(body.sub_agency_code) ? "" : body.sub_agency_code;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@set_aside_code1", set_aside_code_1);
                        cmd1.Parameters.AddWithValue("@set_aside_code2", set_aside_code_2);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            //widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.set_aside_code1 = rdr["set_aside_code1"].ToString();
                            widgetObject.type_of_set_aside1 = rdr["type_of_set_aside1"].ToString();
                            widgetObject.base_and_all_options_1 = SafeParseDouble(rdr["base_and_all_options_1"].ToString());
                            widgetObject.total_dollars_obligated_1 = SafeParseDouble(rdr["total_dollars_obligated_1"].ToString());
                            widgetObject.set_aside_code2 = rdr["set_aside_code2"].ToString();
                            widgetObject.type_of_set_aside2 = rdr["type_of_set_aside2"].ToString();
                            widgetObject.base_and_all_options_2 = SafeParseDouble(rdr["base_and_all_options_2"].ToString());
                            widgetObject.total_dollars_obligated_2 = SafeParseDouble(rdr["total_dollars_obligated_2"].ToString());
                            if (body.agency_code != null && body.sub_agency_code != null && body.office_code != null)
                            {
                                widgetObject.funding_agency_name = rdr["funding_office_name"].ToString();
                            }
                            else if (body.agency_code != null && body.sub_agency_code != null && body.office_code == null)
                            {
                                widgetObject.funding_agency_name = rdr["funding_sub_agency_name"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            }


                            widgetList.Add(widgetObject);


                        }
                    }

                    if (body.store_procedure == "Wizard_Question43_AgencySpendingFYSetAside")
                    {

                        var sp = body.store_procedure;
                        //string agencyCode = String.IsNullOrEmpty(body.agency_code) ? "" : body.agency_code;
                        //string subAgencyCode = String.IsNullOrEmpty(body.sub_agency_code) ? null : body.sub_agency_code;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside_1);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            //if (body.agency_code != null && body.sub_agency_code != null)
                            //{
                            //    widgetObject.funding_agency_name = rdr["funding_office_name"].ToString();
                            //}
                            if (body.sub_agency_code == null && body.office_code == null)
                            {
                                widgetObject.funding_agency_name = rdr["funding_sub_agency_name"].ToString();
                                widgetObject.funding_agency_code = rdr["funding_sub_agency_code"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_name = rdr["funding_office_name"].ToString();
                                widgetObject.funding_agency_code = rdr["funding_office_code"].ToString();
                            }
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question44_RecentlyPostedSourcesSought")
                    {

                        var sp = body.store_procedure;
                        string naics = body.naics_code == 0 ? "" : body.naics_code.ToString();
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@PostedDate", body.PostedDate);
                        cmd1.Parameters.AddWithValue("@naics_code", naics);
                        cmd1.Parameters.AddWithValue("@agency_code", String.IsNullOrEmpty(body.agency_code) ? "" : body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", String.IsNullOrEmpty(body.sub_agency_code) ? "" : body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@product_or_service_code", String.IsNullOrEmpty(body.product_or_service_code) ? "" : body.product_or_service_code);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.total_notices = Convert.ToInt32(rdr["total_notices"]);
                            widgetObject.department_code = rdr["department_code"].ToString();
                            widgetObject.department_name = rdr["department_name"].ToString();
                            widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.agency = rdr["agency"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question50_OpportunityDistributionByOffice")
                    {

                        var sp = body.store_procedure;
                        string naics = body.naics_code == 0 ? "" : body.naics_code.ToString();
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@posted_date", body.PostedDate);
                        cmd1.Parameters.AddWithValue("@posted_date_end", body.PostedDateEnd);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", String.IsNullOrEmpty(body.agency_code) ? "" : body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", String.IsNullOrEmpty(body.sub_agency_code) ? "" : body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@opportunity_type", body.opportunity_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.total_notices = Convert.ToInt32(rdr["total"]);
                            if (body.sub_agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["funding_sub_agency_code"].ToString();
                                widgetObject.funding_agency_name = rdr["funding_sub_agency_name"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_code = rdr["office_code"].ToString();
                                widgetObject.funding_agency_name = rdr["office_name"].ToString();
                            }
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question53_GetSimplifiedAcquisitionContractsAgency")
                    {

                        var sp = body.store_procedure;
                        string nc = body.naics_code != 0 ? body.naics_code.ToString() : "";
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", nc);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            widgetObject.contracts = Convert.ToInt32(rdr["total_contracts"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["dollars_obligated"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question56_ListofSetAsideContracts")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            if (body.sub_agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["funding_sub_agency_code"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            }
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_dollars_obligated"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question57_ContractsPlaceofPerformance")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@state_code", body.primary_place_of_performance_state_code);
                        cmd1.Parameters.AddWithValue("@city_name", body.primary_place_of_performance_city);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        //cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            if (body.agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                                widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            }
                            else if (body.agency_code != null && body.sub_agency_code == null)
                            {
                                widgetObject.funding_agency_code = rdr["funding_sub_agency_code"].ToString();
                                widgetObject.funding_agency_name = rdr["funding_sub_agency_name"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_code = rdr["funding_office_code"].ToString();
                                widgetObject.funding_agency_name = rdr["funding_office_name"].ToString();
                            }

                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question58_OfficesUsedByAgency")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question61_GetProductServiceCodesAgencyNaics")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            //widgetObject.naics_code = rdr["naics_code"].ToString();
                            widgetObject.product_or_service_code = rdr["psc_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                            widgetObject.total_notices = Convert.ToInt32(rdr["total"]);

                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question63_GetTopVendorsByAgencyNAICS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        cmd1.Parameters.AddWithValue("@search_text", body.search_text);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.vendor_uei = rdr["sam"].ToString();
                            widgetObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question_HDR_65_UEI_Expiration")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@start_date", body.expiration_date_start);
                        cmd1.Parameters.AddWithValue("@end_date", body.expiration_date_end);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_UEIs = Convert.ToInt32(rdr["total_UEIs"]);

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question_HDR_66_CPARS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_name", body.agency_name);
                        cmd1.Parameters.AddWithValue("@start_date", body.expiration_date_start);
                        cmd1.Parameters.AddWithValue("@end_date", body.expiration_date_end);
                        cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();
                            widgetObject.UEI = rdr["UEI"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.total_UEIs = Convert.ToInt32(rdr["total_UEIs"]);
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question69_GetTopVendors_GSAMAS")
                    {

                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1Response widgetObject = new question1Response();

                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.sp_type = rdr["sp_type"].ToString();
                            widgetObject.funding_agency_code = rdr["agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_dollars_obligated = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = widgetList });
        }

        public string ExecuteStoreProcedureDrillDown(StoreProcedureDrillDown1Body body)
        {
            var error = string.Empty;
            var response = string.Empty;
            var widgetList = new List<dynamic>();
            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    if (body.store_procedure == "Wizard_Question1_GetTopVendorsByAgencyNAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();

                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());

                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question2_GetCompetitorsByRFP_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.data_type = rdr["data_type"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question3_GetTeammatesforAgencyNAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@maximum_contract_size", body.maximum_contract_size);
                        cmd1.Parameters.AddWithValue("@minimum_number_of_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);

                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question5_GetLargestContractAgencyExpiring_DD")
                    {
                        var sp = body.store_procedure;

                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;
                        if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@expire_date", body.expiration_date_start);
                        cmd1.Parameters.AddWithValue("@expire_date_end", body.expiration_date_end);
                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@maximum_contract_size", body.maximum_contract_size);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside_code", body.set_aside_1);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.contract_number = rdr["contract_number"].ToString();
                            widgetObject.agency_code = rdr["agency_code"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["dollars_obligated"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question6_VendorList8aNContractsNoLonger8A_DD")
                    {
                        var sp = body.store_procedure;
                        var temp_sa = body.set_aside;

                        if (body.set_aside == "8A Sole Source")
                        {
                            temp_sa = "8AN";
                        }
                        else if (body.set_aside == "8A Competed")
                        {
                            temp_sa = "8A";
                        }
                        else
                        {
                            temp_sa = "Both";
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside", temp_sa);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.contract_year = rdr["contract_year"].ToString();
                            widgetObject.number_of_contracts = Convert.ToInt32(rdr["number_of_contracts"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question7_VendorsWithExpiring8aContracts_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@expire_date_start", body.expire_date_start);
                        cmd1.Parameters.AddWithValue("@expire_date_end", body.expire_date_end);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.legal_business_name = rdr["legal_business_name"].ToString();
                            widgetObject.recipient_name = rdr["recipient_name"].ToString();
                            widgetObject.contract_number = rdr["contract_number"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question8_GetTopFundingOfficesByFiscalYearNAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@total_offices", body.total_offices);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.funding_sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.funding_office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.funding_office_code = rdr["agency_code"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question9_AgencySpendingByFY_NAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", !String.IsNullOrEmpty(body.office_code) ? body.office_code : "");
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();
                        // var columns = Enumerable.Range(0, rdr.FieldCount).Select(rdr.GetName).ToList();
                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_office_code = rdr["agency_code"].ToString();
                            widgetObject.total_contracts = Convert.ToInt32(rdr["total_contracts"]);
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question14_AgencySpendingFY_SetAside_DD")
                    {
                        var sp = body.store_procedure;
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside_code);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.fiscal_year_earliest_start_date = rdr["fiscal_year_earliest_start_date"].ToString();
                            widgetObject.base_and_all_options_total = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetObject.set_aside_code = rdr["type_of_set_aside"].ToString();
                            widgetList.Add(widgetObject);
                        }
                    }

                    if (body.store_procedure == "Wizard_Question16_AgencyObligationsFYNaics_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.funding_sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_office_code = rdr["agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["agency_name"].ToString();
                            //widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question17_AgencySpendingFY_SetAside_vs_UNR_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.base_and_all_options_UNR = SafeParseDouble(rdr["base_and_all_options_UNR"].ToString());
                            widgetObject.base_and_all_options_SETASIDE = SafeParseDouble(rdr["base_and_all_options_SETASIDE"].ToString());
                            widgetObject.total_dollars_obligated_UNR = SafeParseDouble(rdr["total_dollars_obligated_UNR"].ToString());
                            widgetObject.total_dollars_obligated_SETASIDE = SafeParseDouble(rdr["total_dollars_obligated_SETASIDE"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question18_AgencySpendingFY_8a_vs_SB_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.base_and_all_options_8A = SafeParseDouble(rdr["base_and_all_options_8A"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_8A = SafeParseDouble(rdr["total_dollars_obligated_8A"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question19_AgencySpendingFY_WOSB_vs_SB_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.base_and_all_options_WOSB = SafeParseDouble(rdr["base_and_all_options_WOSB"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_WOSB = SafeParseDouble(rdr["total_dollars_obligated_WOSB"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question20_AgencySpendingFY_SDVOSB_vs_SB_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.base_and_all_options_SDVOSB = SafeParseDouble(rdr["base_and_all_options_SDVOSB"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_SDVOSB = SafeParseDouble(rdr["total_dollars_obligated_SDVOSB"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question21_AgencySpendingFY_HUBZONE_vs_SB_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.base_and_all_options_HUBZONE = SafeParseDouble(rdr["base_and_all_options_HUBZONE"].ToString());
                            widgetObject.base_and_all_options_SB = SafeParseDouble(rdr["base_and_all_options_SB"].ToString());
                            widgetObject.total_dollars_obligated_HUBZONE = SafeParseDouble(rdr["total_dollars_obligated_HUBZONE"].ToString());
                            widgetObject.total_dollars_obligated_SB = SafeParseDouble(rdr["total_dollars_obligated_SB"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question26_AgencySpendingPlaceOfPerformance_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_city", body.primary_place_of_performance_city);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_state_code", body.primary_place_of_performance_state_code);
                        cmd1.Parameters.AddWithValue("@primary_place_of_performance_country_code", body.primary_place_of_performance_country_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question29_TopContractsByAgency_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@total_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.total_dollars_obligated = Convert.ToDouble(rdr["total_dollars_obligated"]);
                            widgetObject.base_and_all_options_total = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question31_GetTopVendorsWith8ASoleSourceContracts_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.sp_type = rdr["sp_type"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question34_VendorContractInventory_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["dollars_obligated"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question35_GetSetAisdeUsage_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_agencies", body.total_agency);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@agency_code", body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question36_GetTopVendorsByAgencyNAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question37_GetTeammatesforAgencyNAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@minimum_contract_size", body.minimum_contract_size);
                        cmd1.Parameters.AddWithValue("@minimum_number_of_contracts", body.minimum_number_of_contracts);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question38_GetCompetitorsByRFP_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@solicitation_number", body.solicitation_number);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.data_type = rdr["data_type"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question40_GetVehicleFundingByPSC")
                    {
                        var sp = body.store_procedure;
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        //-------For Sub Agency
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        //    string subAgencyCode = !String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code) ? body.funding_agency_code : body.sub_agency_code;

                        //-------For Office
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        /*else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }*/
                        else
                        {
                            officeCode = String.Empty;
                        }


                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.CommandTimeout = 120;
                        cmd1.Parameters.AddWithValue("@vendor_uei", !String.IsNullOrEmpty(body.vendor_uei) ? body.vendor_uei : "");
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@project_id", body.project_id);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["federal_action_obligations"].ToString());
                            widgetObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                            widgetObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question41_GetVehicleFundingByVendor")
                    {
                        var sp = body.store_procedure;
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        //-------For Sub Agency
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        //    string subAgencyCode = !String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code) ? body.funding_agency_code : body.sub_agency_code;

                        //-------For Office
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        else
                        {
                            officeCode = String.Empty;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.CommandTimeout = 120;
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@project_id", body.project_id);
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["federal_action_obligations"].ToString());
                            widgetObject.LEGAL_BUSINESS_NAME = rdr["LEGAL_BUSINESS_NAME"].ToString();
                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();

                            widgetList.Add(widgetObject);
                        }

                    }

                    if (body.store_procedure == "Wizard_Question42_AgencySpendingFYSetAsideComparison_DD")
                    {
                        var sp = body.store_procedure;
                        //string[] setAside = body.set_aside_2.Split(',');
                        string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        else
                        {
                            officeCode = String.Empty;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@set_aside_code1", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.set_aside_code1 = rdr["set_aside_code1"].ToString();
                            widgetObject.type_of_set_aside1 = rdr["type_of_set_aside1"].ToString();
                            widgetObject.base_and_all_options_1 = SafeParseDouble(rdr["base_and_all_options_1"].ToString());
                            widgetObject.total_dollars_obligated_1 = SafeParseDouble(rdr["total_dollars_obligated_1"].ToString());
                            if (body.agency_code != null && body.sub_agency_code != null && body.office_code != null)
                            {
                                widgetObject.funding_agency_name = rdr["funding_office_name"].ToString();
                            }
                            else if (body.agency_code != null && body.sub_agency_code != null && body.office_code == null)
                            {
                                widgetObject.funding_agency_name = rdr["funding_sub_agency_name"].ToString();
                            }
                            else
                            {
                                widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            }

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question43_AgencySpendingFYSetAsideComparison_DD")
                    {
                        var sp = body.store_procedure;
                        //string agencyCode = String.IsNullOrEmpty(body.agency_code) ? body.funding_agency_code : body.agency_code;
                        string subAgencyCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.sub_agency_code;
                        }
                        else if (!String.IsNullOrEmpty(body.agency_code) && String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = String.Empty;
                        }
                        string officeCode = String.Empty;
                        if (!String.IsNullOrEmpty(body.agency_code) && !String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            officeCode = body.funding_agency_code;
                        }
                        else
                        {
                            officeCode = String.Empty;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside_1);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                            widgetObject.base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_dollars_obligated = SafeParseDouble(rdr["total_dollars_obligated"].ToString());

                            if (subAgencyCode != null && (officeCode == null || officeCode == ""))
                            {
                                widgetObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                                widgetObject.funding_sub_agency_code = Convert.ToInt32(rdr["funding_sub_agency_code"]);
                            }
                            else
                            {
                                widgetObject.funding_office_name = rdr["funding_office_name"].ToString();
                                //widgetObject.funding_office_code = rdr["funding_office_code"].ToString();
                            }
                            widgetList.Add(widgetObject);
                        }

                    }

                    if (body.store_procedure == "Wizard_Question53_GetSimplifiedAcquisitionContractsAgency_DD")
                    {
                        var sp = body.store_procedure;

                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;
                        if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@naics_code", String.IsNullOrEmpty(body.naics_code) ? "" : body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        cmd1.Parameters.AddWithValue("@type_of_set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.contract_number = rdr["contract_number"].ToString();
                            widgetObject.agency_code = rdr["agency_code"].ToString();
                            widgetObject.agency_name = rdr["agency_name"].ToString();
                            widgetObject.award_id_piid = rdr["award_id_piid"].ToString();
                            widgetObject.transaction_id = rdr["transaction_id"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["dollars_obligated"].ToString());

                            widgetList.Add(widgetObject);
                        }


                    }

                    if (body.store_procedure == "Wizard_Question56_ListofSetAsideContracts_DD")
                    {
                        var sp = body.store_procedure;
                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;
                        if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@funding_agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@funding_sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@funding_office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.funding_office_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["base_and_all_options_total"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_dollars_obligated"].ToString());
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question57_ContractsPlaceofPerformance_DD")
                    {
                        var sp = body.store_procedure;
                        string agencyCode = String.Empty;
                        string subAgencyCode = String.Empty;
                        string officeCode = String.Empty;

                        if (String.IsNullOrEmpty(body.agency_code))
                        {
                            agencyCode = body.funding_agency_code;
                        }
                        else if (String.IsNullOrEmpty(body.sub_agency_code))
                        {
                            agencyCode = body.agency_code;
                            subAgencyCode = body.funding_agency_code;
                        }
                        else
                        {
                            agencyCode = body.agency_code;
                            subAgencyCode = body.sub_agency_code;
                            officeCode = body.funding_agency_code;
                        }
                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@agency_code", agencyCode);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", subAgencyCode);
                        cmd1.Parameters.AddWithValue("@office_code", officeCode);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@state_code", body.primary_place_of_performance_state_code);
                        cmd1.Parameters.AddWithValue("@city_name", body.primary_place_of_performance_city);
                        cmd1.Parameters.AddWithValue("@set_aside_code", body.set_aside);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        //cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetList.Add(widgetObject);
                        }


                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question58_OfficesUsedByAgency_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@funding_office_code", body.funding_agency_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        //cmd1.Parameters.AddWithValue("@display_type", body.display_type);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.funding_office_code = rdr["funding_agency_code"].ToString();
                            widgetObject.funding_office_name = rdr["funding_agency_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question63_GetTopVendorsByAgencyNAICS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        cmd1.Parameters.AddWithValue("@total_vendors", body.total_vendors);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@vendor_uei", body.vendor_uei);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@idiq_selection", body.idiq_selection);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.vendor_uei = rdr["vendor_uei"].ToString();
                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetObject.total_obligations = SafeParseDouble(rdr["total_obligations"].ToString());
                            widgetList.Add(widgetObject);
                        }

                        // return new JavaScriptSerializer().Serialize(new { records = widgetList });
                    }

                    if (body.store_procedure == "Wizard_Question69_GetTopVendors_GSAMAS_DD")
                    {
                        var sp = body.store_procedure;

                        SqlCommand cmd1 = new SqlCommand(sp, con);
                        cmd1.CommandType = CommandType.StoredProcedure;

                        cmd1.Parameters.AddWithValue("@vendor_uei", body.recipient_uei);
                        cmd1.Parameters.AddWithValue("@agency_code", body.agency_code);
                        cmd1.Parameters.AddWithValue("@sub_agency_code", body.sub_agency_code);
                        cmd1.Parameters.AddWithValue("@office_code", body.office_code);
                        cmd1.Parameters.AddWithValue("@years", body.years);
                        cmd1.Parameters.AddWithValue("@naics_code", body.naics_code);
                        cmd1.Parameters.AddWithValue("@business_size", body.business_size);
                        cmd1.Parameters.AddWithValue("@socio_economic_designation", body.socio_economic_designation);
                        cmd1.Parameters.AddWithValue("@user_id", UserID);
                        con.Open();
                        SqlDataReader rdr = cmd1.ExecuteReader();

                        while (rdr.Read())
                        {
                            question1DrillDown1Response widgetObject = new question1DrillDown1Response();

                            widgetObject.recipient_uei = rdr["recipient_uei"].ToString();
                            widgetObject.sp_type = rdr["sp_type"].ToString();
                            widgetObject.fiscal_year = rdr["fiscal_year"].ToString();
                            widgetObject.funding_agency_code = Convert.ToInt32(rdr["funding_agency_code"]);
                            widgetObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                            widgetObject.vendor_name = rdr["vendor_name"].ToString();
                            widgetObject.total_obligations = Convert.ToDouble(rdr["total_obligations"]);
                            widgetObject.total_base_and_all_options = SafeParseDouble(rdr["total_base_and_all_options"].ToString());
                            widgetList.Add(widgetObject);
                        }


                    }

                    con.Close();
                }

            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = widgetList });
        }

        public string ExecuteStoreProcedureDataGrid(StoreProcedureDrillDown2Body body)
        {
            var error = string.Empty;
            var response = string.Empty;
            AnswerWidgetService service = new AnswerWidgetService();
            string UserID = Session["User_ID"].ToString();
            dynamic widgetList = service.DataGridService(body, UserID);

            return new JavaScriptSerializer().Serialize(new { records = widgetList });
        }

        public string QuestionFdpsList(int transaction_id)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<FdpsList> fdpsList = new List<FdpsList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_question_fpds_plus";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@transaction_id", transaction_id);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        FdpsList fpdsObject = new FdpsList();
                        fpdsObject.Contract_ID = rdr["Contract_ID"].ToString();
                        fpdsObject.Referenced_IDV_ID = rdr["Referenced_IDV_ID"].ToString();
                        fpdsObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                        fpdsObject.date_signed = rdr["date_signed"].ToString();
                        fpdsObject.earliest_start_date = rdr["earliest_start_date"].ToString();
                        fpdsObject.latest_period_of_performance_potential_end_date = rdr["latest_period_of_performance_potential_end_date"].ToString();
                        fpdsObject.modification_number = rdr["modification_number"].ToString();
                        fpdsObject.latest_modification_number = rdr["latest_modification_number"].ToString();
                        // Convert string values to double, handling potential null/empty values
                        fpdsObject.federal_action_obligation = SafeParseDoubleAsString(rdr["federal_action_obligation"].ToString());
                        fpdsObject.base_and_all_options_value = SafeParseDoubleAsString(rdr["base_and_all_options_value"].ToString());
                        fpdsObject.total_dollars_obligated = rdr["total_dollars_obligated"].ToString();
                        fpdsObject.total_base_and_all_options = rdr["base_and_all_options_total"].ToString();
                        fpdsObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                        fpdsObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                        fpdsObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                        fpdsObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                        fpdsObject.funding_office_code = rdr["funding_office_code"].ToString();
                        fpdsObject.funding_office_name = rdr["funding_office_name"].ToString();
                        fpdsObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                        fpdsObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                        fpdsObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                        fpdsObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                        fpdsObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                        fpdsObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                        fpdsObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                        fpdsObject.recipient_uei = rdr["recipient_uei"].ToString();
                        fpdsObject.recipient_name = rdr["recipient_name"].ToString();
                        fpdsObject.INITIAL_REGISTRATION_DATE = rdr["INITIAL_REGISTRATION_DATE"].ToString();
                        fpdsObject.EXPIRATION_DATE = rdr["EXPIRATION_DATE"].ToString();
                        fpdsObject.PHYSICAL_ADDRESS_LINE_1 = rdr["PHYSICAL_ADDRESS_LINE_1"].ToString();
                        fpdsObject.PHYSICAL_ADDRESS_LINE_2 = rdr["PHYSICAL_ADDRESS_LINE_2"].ToString();
                        fpdsObject.PHYSICAL_ADDRESS_PROVINCE_OR_STATE = rdr["PHYSICAL_ADDRESS_PROVINCE_OR_STATE"].ToString();
                        fpdsObject.PHYSICAL_ADDRESS_ZIP_POSTAL_CODE = rdr["PHYSICAL_ADDRESS_ZIP/POSTAL_CODE"].ToString();
                        fpdsObject.PHYSICAL_ADDRESS_COUNTRY_CODE = rdr["PHYSICAL_ADDRESS_COUNTRY_CODE"].ToString();
                        fpdsObject.PHYSICAL_ADDRESS_CITY = rdr["PHYSICAL_ADDRESS_CITY"].ToString();
                        fpdsObject.naics_code_registrations = rdr["naics_code_registrations"].ToString();
                        fpdsObject.business_registrations = rdr["business_registrations"].ToString();
                        fpdsObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                        fpdsObject.type_of_contract_pricing_code = rdr["type_of_contract_pricing_code"].ToString();
                        fpdsObject.major_program = rdr["major_program"].ToString();
                        fpdsObject.primary_place_of_performance_city_name = rdr["primary_place_of_performance_city_name"].ToString();
                        fpdsObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                        fpdsObject.primary_place_of_performance_country_name = rdr["primary_place_of_performance_country_name"].ToString();
                        fpdsObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                        fpdsObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                        fpdsObject.naics_code = rdr["naics_code"].ToString();
                        fpdsObject.naics_description = rdr["naics_description"].ToString();
                        fpdsObject.award_description = rdr["award_description"].ToString();
                        fpdsObject.extent_competed = rdr["extent_competed"].ToString();
                        fpdsObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                        fpdsObject.type_of_set_aside_code = rdr["type_of_set_aside_code"].ToString();
                        fpdsObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                        fpdsObject.usaspending_permalink = rdr["usaspending_permalink"].ToString();
                        fpdsObject.idv_type_code = rdr["idv_type_code"].ToString();
                        fpdsObject.idv_type = rdr["idv_type"].ToString();
                        fpdsObject.fair_opportunity_limited_sources_code = rdr["fair_opportunity_limited_sources_code"].ToString();
                        fpdsObject.fair_opportunity_limited_sources = rdr["fair_opportunity_limited_sources"].ToString();
                        fdpsList.Add(fpdsObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = fdpsList });
        }

        public string ContractSearchEZ(string contract_number)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<EasyContractSearch> contractList = new List<EasyContractSearch>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_EZSearch_Contract";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@contract_number", contract_number);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        EasyContractSearch contractObject = new EasyContractSearch();
                        contractObject.transaction_id = rdr["transaction_id"].ToString();
                        contractObject.award_id_piid = rdr["award_id_piid"].ToString();
                        contractObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                        contractObject.contract_search = rdr["contract_search"].ToString();

                        contractList.Add(contractObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = contractList });
        }

        public string ContractData(string award_id_piid, string parent_award_id_piid)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<ContractMods> contractMods = new List<ContractMods>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_question_fpds_contract_mods";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@award_id_piid", award_id_piid);
                    cmd1.Parameters.AddWithValue("@parent_award_id_piid", parent_award_id_piid);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        ContractMods contractObject = new ContractMods();
                        contractObject.contract_transaction_id = rdr["transaction_id"].ToString();
                        contractObject.contract_modification_number = rdr["modification_number"].ToString();
                        contractObject.contract_action_date = rdr["action_date"].ToString();
                        // Convert and validate string values for contract modifications
                        contractObject.contract_base_and_all_options_value = SafeParseDoubleAsString(rdr["base_and_all_options_value"].ToString());
                        contractObject.contract_federal_action_obligation = SafeParseDoubleAsString(rdr["federal_action_obligation"].ToString());
                        contractMods.Add(contractObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = contractMods });
        }

        public string ExportToExcel(List<WizardWidgetExcelCoumnList> excelHeader, StoreProcedureDrillDown2Body excelBody)
        {
            string error = "";
            string base64String = "";

            try
            {
                DateTime now = DateTime.Now;

                // Load the Excel template
                var templatePath = "FedTemplate.xlsx"; // Update with your template file path
                var outputFilePath = "Output.xlsx"; // Update with your desired output file path
                outputFilePath = outputFilePath.Replace('/', '-');
                string filePath = Server.MapPath("~/Templates/");
                ExcelPackage.LicenseContext = LicenseContext.Commercial;
                using (var templateStream = new FileStream(filePath + templatePath, FileMode.Open))
                using (var package = new ExcelPackage(templateStream))
                {
                    // Access the worksheet in the template
                    var worksheet = package.Workbook.Worksheets[0];
                    int headerCount = 1;
                    int headerIndex = 7;
                    foreach (WizardWidgetExcelCoumnList headerObject in excelHeader)
                    {
                        Color colFromHex = System.Drawing.ColorTranslator.FromHtml(headerObject.column_color);
                        worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                        worksheet.Cells[headerIndex, headerCount].Value = headerObject.header_name;
                        if (headerObject.header_name == "Award Description")
                        {
                            worksheet.Column(headerCount).Width = 500;

                        }
                        headerCount++;
                    }

                    worksheet.Cells[6, 1].Value = "FedPipeline - Answers Wizard - Report - " + Session["User_Email"].ToString() + " - " + now;
                    //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                    // Add data to specific cells

                    AnswerWidgetService service = new AnswerWidgetService();
                    string UserID = Session["User_ID"].ToString();
                    dynamic widgetList = service.DataGridService(excelBody, UserID);
                    int dataCount = 8;
                    foreach (dynamic dataObject in widgetList)
                    {
                        CultureInfo cultureInfo = new CultureInfo("en-US");
                        worksheet.Cells[dataCount, 1].Value = dataObject.transaction_id;
                        worksheet.Cells[dataCount, 2].Value = dataObject.award_id_piid;
                        worksheet.Cells[dataCount, 3].Value = dataObject.parent_award_id_piid;
                        worksheet.Cells[dataCount, 4].Value = dataObject.modification_number;
                        worksheet.Cells[dataCount, 5].Value = dataObject.funding_agency_name;
                        worksheet.Cells[dataCount, 6].Value = dataObject.funding_sub_agency_name;
                        worksheet.Cells[dataCount, 7].Value = dataObject.funding_office_name;
                        worksheet.Cells[dataCount, 8].Value = dataObject.naics_code;
                        worksheet.Cells[dataCount, 9].Value = dataObject.naics_description;
                        worksheet.Cells[dataCount, 10].Value = dataObject.product_or_service_code;
                        worksheet.Cells[dataCount, 11].Value = dataObject.product_or_service_code_description;
                        worksheet.Cells[dataCount, 12].Value = dataObject.period_of_performance_start_date;
                        worksheet.Cells[dataCount, 13].Value = dataObject.period_of_performance_potential_end_date;
                        worksheet.Cells[dataCount, 14].Value = dataObject.type_of_set_aside;
                        if (!string.IsNullOrEmpty(dataObject.expire_year))
                        {
                            worksheet.Cells[dataCount, 15].Value = !string.IsNullOrEmpty(dataObject.expire_year) ? dataObject.expire_year : "";
                        }
                        else if (!string.IsNullOrEmpty(dataObject.year_expire))
                        {
                            worksheet.Cells[dataCount, 15].Value = !string.IsNullOrEmpty(dataObject.year_expire) ? dataObject.year_expire : "";
                        }
                        else
                        {
                            worksheet.Cells[dataCount, 15].Value = !string.IsNullOrEmpty(dataObject.Year_Expire) ? dataObject.Year_Expire : "";
                        }
                        worksheet.Cells[dataCount, 16].Value = dataObject.base_and_all_options_value.ToString("C", cultureInfo); ;
                        worksheet.Cells[dataCount, 17].Value = dataObject.solicitation_identifier;
                        worksheet.Cells[dataCount, 18].Value = dataObject.funding_agency_code;
                        worksheet.Cells[dataCount, 19].Value = dataObject.federal_action_obligation.ToString("C", cultureInfo); ;
                        worksheet.Cells[dataCount, 20].Value = dataObject.funding_sub_agency_code;
                        worksheet.Cells[dataCount, 21].Value = dataObject.funding_office_code;
                        worksheet.Cells[dataCount, 22].Value = dataObject.awarding_agency_code;
                        worksheet.Cells[dataCount, 23].Value = dataObject.awarding_agency_name;
                        worksheet.Cells[dataCount, 24].Value = dataObject.awarding_sub_agency_code;
                        worksheet.Cells[dataCount, 25].Value = dataObject.awarding_sub_agency_name;
                        worksheet.Cells[dataCount, 26].Value = dataObject.awarding_office_code;
                        worksheet.Cells[dataCount, 27].Value = dataObject.awarding_office_name;
                        worksheet.Cells[dataCount, 28].Value = dataObject.award_type;
                        worksheet.Cells[dataCount, 29].Value = dataObject.type_of_contract_pricing;
                        worksheet.Cells[dataCount, 30].Value = dataObject.solicitation_date;
                        worksheet.Cells[dataCount, 31].Value = dataObject.action_date;
                        worksheet.Cells[dataCount, 32].Value = dataObject.action_date_fiscal_year;
                        worksheet.Cells[dataCount, 33].Value = dataObject.period_of_performance_current_end_date;
                        worksheet.Cells[dataCount, 34].Value = dataObject.contract_duration;
                        worksheet.Cells[dataCount, 35].Value = dataObject.vendor_name;
                        worksheet.Cells[dataCount, 36].Value = dataObject.recipient_uei;
                        worksheet.Cells[dataCount, 37].Value = dataObject.major_program;
                        worksheet.Cells[dataCount, 38].Value = dataObject.primary_place_of_performance_state_code;
                        worksheet.Cells[dataCount, 39].Value = dataObject.award_description;
                        worksheet.Cells[dataCount, 40].Value = dataObject.extent_competed;
                        worksheet.Cells[dataCount, 41].Value = dataObject.solicitation_procedures;
                        worksheet.Cells[dataCount, 42].Value = dataObject.SB_Award;
                        worksheet.Cells[dataCount, 43].Value = dataObject.fed_biz_opps;
                        worksheet.Cells[dataCount, 44].Value = dataObject.number_of_offers_received;
                        worksheet.Cells[dataCount, 45].Value = dataObject.BusinessSize;
                        worksheet.Cells[dataCount, 46].Value = dataObject.Contract_URL;

                        /* worksheet.Cells[dataCount, 14].Value = dataObject.base_and_all_options_value.ToString("C6");
                         worksheet.Cells[dataCount, 16].Value = dataObject.base_and_all_options_value_k.ToString("C6");
                         worksheet.Cells[dataCount, 17].Value = dataObject.federal_action_obligation_k.ToString("C6");
                         worksheet.Cells[dataCount, 15].Value = dataObject.federal_action_obligation.ToString("C6");*/


                        // worksheet.Cells[dataCount, 16].Value = dataObject.base_and_all_options_value_k;
                        // worksheet.Cells[dataCount, 17].Value = dataObject.federal_action_obligation_k;


                        //worksheet.Cells[dataCount, 17].Style.Numberformat.Format = "$0.00";
                        //worksheet.Cells[dataCount, 18].Style.Numberformat.Format = "$0.00";

                        dataCount++;
                    }



                    ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Count];
                    string tableName = "Table1";
                    //Ading a table to a Range
                    ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                    //Formating the table style
                    tab.TableStyle = TableStyles.Medium4;
                    worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                    worksheet.Column(40).Width = 100;
                    worksheet.Column(40).Style.WrapText = true;
                    // Save the modified Excel package to a new file

                    using (var outputFileStream = new FileStream(filePath + outputFilePath, FileMode.Create))
                    {
                        package.SaveAs(outputFileStream);
                    }
                }
                byte[] bytes = System.IO.File.ReadAllBytes(filePath + outputFilePath);
                base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { messge = "you can download the file", base64 = base64String });
        }

        public string WizardWidgetColumnsList(int widget_id)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<WizardWidgetTableCoumnList> columnList = new List<WizardWidgetTableCoumnList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_widget_table_column_by_widget_id";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@widget_id", widget_id);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        WizardWidgetTableCoumnList columnObject = new WizardWidgetTableCoumnList();
                        columnObject.wizard_widget_table_column_id = Convert.ToInt32(rdr["wizard_widget_table_column_id"]);
                        columnObject.widget_id = Convert.ToInt32(rdr["widget_id"]);
                        columnObject.header_name = rdr["header_name"].ToString();
                        columnObject.field = rdr["field"].ToString();
                        columnObject.column_color = rdr["column_color"].ToString();
                        columnObject.data_grid = Convert.ToInt32(rdr["data_grid"]);
                        columnObject.column_currency_field = Convert.ToInt32(rdr["column_currency_field"]);
                        columnObject.isLabel = Convert.ToInt32(rdr["isLabel"]);
                        columnList.Add(columnObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = columnList });

        }

        public string VendorPlusDetails(string vendor_uei)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorPlusResponse> vendorList = new List<VendorPlusResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "wizard_vendor_plus";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorPlusResponse vendorObject = new VendorPlusResponse();
                        vendorObject.vendor_uei = rdr["vendor_uei"].ToString();
                        vendorObject.Cage = rdr["Cage"].ToString();
                        vendorObject.EXPIRATION_DATE = rdr["EXPIRATION_DATE"].ToString();
                        vendorObject.INITIAL_REGISTRATION_DATE = rdr["INITIAL_REGISTRATION_DATE"].ToString();
                        vendorObject.LEGAL_BUSINESS_NAME = rdr["LEGAL_BUSINESS_NAME"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_LINE_1 = rdr["PHYSICAL_ADDRESS_LINE_1"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_LINE_2 = rdr["PHYSICAL_ADDRESS_LINE_2"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_CITY = rdr["PHYSICAL_ADDRESS_CITY"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_PROVINCE_OR_STATE = rdr["PHYSICAL_ADDRESS_PROVINCE_OR_STATE"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_ZIP_POSTAL_CODE = rdr["PHYSICAL_ADDRESS_ZIP_POSTAL_CODE"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_ZIP_CODE = rdr["PHYSICAL_ADDRESS_ZIP_CODE"].ToString();
                        vendorObject.PHYSICAL_ADDRESS_COUNTRY_CODE = rdr["PHYSICAL_ADDRESS_COUNTRY_CODE"].ToString();
                        vendorObject.MAILING_ADDRESS_LINE_1 = rdr["MAILING_ADDRESS_LINE_1"].ToString();
                        vendorObject.MAILING_ADDRESS_LINE_2 = rdr["MAILING_ADDRESS_LINE_2"].ToString();
                        vendorObject.MAILING_ADDRESS_LINE_2 = rdr["MAILING_ADDRESS_LINE_2"].ToString();
                        vendorObject.MAILING_ADDRESS_CITY = rdr["MAILING_ADDRESS_CITY"].ToString();
                        vendorObject.MAILING_ADDRESS_ZIP_CODE = rdr["MAILING_ADDRESS_ZIP_CODE"].ToString();
                        vendorObject.GOVT_BUS_POC_FIRST_NAME = rdr["GOVT_BUS_POC_FIRST_NAME"].ToString();
                        vendorObject.GOVT_BUS_POC_LAST_NAME = rdr["GOVT_BUS_POC_LAST_NAME"].ToString();
                        vendorObject.GOVT_BUS_POC_ST_ADD_1 = rdr["GOVT_BUS_POC_ST_ADD_1"].ToString();
                        vendorObject.GOVT_BUS_POC_TITLE = rdr["GOVT_BUS_POC_TITLE"].ToString();
                        vendorObject.GOVT_BUS_POC_CITY = rdr["GOVT_BUS_POC_CITY"].ToString();
                        vendorObject.GOVT_BUS_POC_ZIP_POSTAL_CODE = rdr["GOVT_BUS_POC_ZIP_POSTAL_CODE"].ToString();
                        vendorObject.GOVT_BUS_POC_STATE_OR_PROVINCE = rdr["GOVT_BUS_POC_STATE_OR_PROVINCE"].ToString();
                        vendorObject.PRIMARY_NAICS = rdr["PRIMARY_NAICS"].ToString();
                        vendorObject.BUSINESS_TYPE = rdr["BUSINESS_TYPE"].ToString();
                        vendorObject.NAICS_CODE = rdr["NAICS_CODE"].ToString();
                        vendorObject.CORPORATE_URL = rdr["CORPORATE_URL"].ToString();
                        vendorObject.BUsiness_Start_date = rdr["BUsiness_Start_date"].ToString();
                        vendorObject.Fiscal_Year_End_Close_Date = rdr["Fiscal_Year_End_Close_Date"].ToString();
                        vendorObject.Entity_Structure = rdr["Entity_Structure"].ToString();

                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = vendorList });

        }

        public string VendorPlusSocioEconomic(string vendor_uei)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorPlusSocioEconomicResponse> vendorList = new List<VendorPlusSocioEconomicResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Vendor_plus_socio_economic";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorPlusSocioEconomicResponse vendorObject = new VendorPlusSocioEconomicResponse();
                        vendorObject.socio_economic_designation = rdr["socio_economic_designation"].ToString();

                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = vendorList });

        }

        public string VendorPlusNAICS(string vendor_uei)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorPlusNAICSResponse> vendorList = new List<VendorPlusNAICSResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Vendor_plus_NAICS";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorPlusNAICSResponse vendorObject = new VendorPlusNAICSResponse();
                        vendorObject.NAICS = rdr["NAICS"].ToString();
                        vendorObject.description = rdr["description"].ToString();
                        vendorObject.Small_For_NAICS = rdr["Small_For_NAICS"].ToString();

                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = vendorList });

        }

        public string VendorPlusObligations(string vendor_uei)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorPlusObligationsResponse> vendorList = new List<VendorPlusObligationsResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Vendor_plus_FYObligations";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorPlusObligationsResponse vendorObject = new VendorPlusObligationsResponse();
                        vendorObject.action_obligation_total = Convert.ToDouble(rdr["action_obligation_total"]);
                        vendorObject.fiscal_year = rdr["fiscal_year"].ToString();
                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = vendorList });

        }

        public string VendorPlusContractInventoy(string vendor_uei, bool isExcel)
        {
            AnswerWidgetService service = new AnswerWidgetService();
            List<VendorPlusContractInventoyResponse> vendorList = new List<VendorPlusContractInventoyResponse>();
            string error = "";
            string exportedFilePath = "";
            var templatePath = "FedTemplate.xlsx"; // Update with your template file path
            string outputFileName = "Output -" + DateTime.Now.ToString("yyyy-dd-M-HH-mm-ss") + ".xlsx"; // Update with your desired output file path
            byte[] bytes = new Byte[64];
            Array.Clear(bytes, 0, bytes.Length);
            if (!isExcel)
            {
                vendorList = service.ContractInventoryService(vendor_uei, isExcel);
            }
            else
            {
                try
                {
                    vendorList = service.ContractInventoryService(vendor_uei, isExcel);
                    DateTime now = DateTime.Now;
                    // Load the Excel template
                    outputFileName = outputFileName.Replace('/', '-');
                    string filePath = Server.MapPath("~/Templates/");
                    ExcelPackage.LicenseContext = LicenseContext.Commercial;
                    using (var templateStream = new FileStream(filePath + templatePath, FileMode.Open))
                    using (var package = new ExcelPackage(templateStream))
                    {
                        // Access the worksheet in the template
                        var worksheet = package.Workbook.Worksheets[0];
                        int headerCount = 1;
                        int headerIndex = 7;
                        string[] excelHeader = new string[]{ "Transaction Id","Contract #","Referenced IDV #","Modification #","Funding Agency Name(dept)","Funding Sub-Agency Name(Agency)","Funding Office Name(Office)",
                                                              "NAICS","NAICS Description","PSC","PSC Description","Type of Set Aside","Expire Year","Base and All Options","Federal Action Obligation",
                                                              "Solicitation Identifier","Funding Agency Code","Funding Sub Agency Code","Funding Office Code","Awarding Agency Code",
                                                                "Awarding Agency Name","Awarding Sub Agency Code","Awarding Sub Agency Name","Awarding Office Code","Awarding Office Name","Award Type",
                                                                "Type of Contract Pricing","Solicitation Date","Date Signed","Date Signed(FY)","POP Start Date","POP Current End Date",
                                                                "POP Potential End Date","Contract Duration","Vendor Name","Vendor UEI","Major Program","Primary POP State","Award Description",
                                                                "Extent Competed","Solicitation Procedures","Small Business Set Aside","Posted to Fed Piz Opps","# of Offers Received",
                                                                "Business Size(Contractor Determination)","Contract Link" };


                        foreach (string headerObject in excelHeader)
                        {
                            Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#571C7A");
                            worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                            worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                            worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                            if (headerObject == "Award Description")
                            {
                                worksheet.Column(headerCount).Width = 500;

                            }
                            headerCount++;
                        }

                        worksheet.Cells[6, 1].Value = "FedPipeline - Answers Wizard - Report - " + Session["User_Email"].ToString() + " - " + now;
                        //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                        // Add data to specific cells

                        int dataCount = 8;
                        foreach (dynamic dataObject in vendorList)
                        {

                            CultureInfo cultureInfo = new CultureInfo("en-US");
                            worksheet.Cells[dataCount, 1].Value = dataObject.transaction_id;
                            worksheet.Cells[dataCount, 2].Value = dataObject.award_id_piid;
                            worksheet.Cells[dataCount, 3].Value = dataObject.parent_award_id_piid;
                            worksheet.Cells[dataCount, 4].Value = dataObject.modification_number;
                            worksheet.Cells[dataCount, 5].Value = dataObject.funding_agency_name;
                            worksheet.Cells[dataCount, 6].Value = dataObject.funding_sub_agency_name;
                            worksheet.Cells[dataCount, 7].Value = dataObject.funding_office_name;
                            worksheet.Cells[dataCount, 8].Value = dataObject.naics_code;
                            worksheet.Cells[dataCount, 9].Value = dataObject.naics_description;
                            worksheet.Cells[dataCount, 10].Value = dataObject.product_or_service_code;
                            worksheet.Cells[dataCount, 11].Value = dataObject.product_or_service_code_description;
                            worksheet.Cells[dataCount, 12].Value = dataObject.type_of_set_aside;


                            if (!string.IsNullOrEmpty(dataObject.expire_year))
                            {
                                worksheet.Cells[dataCount, 13].Value = !string.IsNullOrEmpty(dataObject.expire_year) ? dataObject.expire_year : "";
                            }
                            else if (!string.IsNullOrEmpty(dataObject.year_expire))
                            {
                                worksheet.Cells[dataCount, 13].Value = !string.IsNullOrEmpty(dataObject.year_expire) ? dataObject.year_expire : "";
                            }
                            else
                            {
                                worksheet.Cells[dataCount, 13].Value = !string.IsNullOrEmpty(dataObject.Year_Expire) ? dataObject.Year_Expire : "";
                            }
                            worksheet.Cells[dataCount, 14].Value = dataObject.base_and_all_options_value.ToString("C", cultureInfo); ;
                            worksheet.Cells[dataCount, 15].Value = dataObject.federal_action_obligation.ToString("C", cultureInfo); ;
                            worksheet.Cells[dataCount, 16].Value = dataObject.solicitation_identifier;
                            worksheet.Cells[dataCount, 17].Value = dataObject.funding_agency_code;
                            worksheet.Cells[dataCount, 18].Value = dataObject.funding_sub_agency_code;
                            worksheet.Cells[dataCount, 19].Value = dataObject.funding_office_code;
                            worksheet.Cells[dataCount, 20].Value = dataObject.awarding_agency_code;
                            worksheet.Cells[dataCount, 21].Value = dataObject.awarding_agency_name;
                            worksheet.Cells[dataCount, 22].Value = dataObject.awarding_sub_agency_code;
                            worksheet.Cells[dataCount, 23].Value = dataObject.awarding_sub_agency_name;
                            worksheet.Cells[dataCount, 24].Value = dataObject.awarding_office_code;
                            worksheet.Cells[dataCount, 25].Value = dataObject.awarding_office_name;
                            worksheet.Cells[dataCount, 26].Value = dataObject.award_type;
                            worksheet.Cells[dataCount, 27].Value = dataObject.type_of_contract_pricing;
                            worksheet.Cells[dataCount, 28].Value = dataObject.solicitation_date;
                            worksheet.Cells[dataCount, 29].Value = dataObject.action_date;
                            worksheet.Cells[dataCount, 30].Value = dataObject.action_date_fiscal_year;
                            worksheet.Cells[dataCount, 31].Value = dataObject.period_of_performance_start_date;
                            worksheet.Cells[dataCount, 32].Value = dataObject.period_of_performance_current_end_date;
                            worksheet.Cells[dataCount, 33].Value = dataObject.period_of_performance_potential_end_date;
                            worksheet.Cells[dataCount, 34].Value = dataObject.contract_duration;
                            worksheet.Cells[dataCount, 35].Value = dataObject.vendor_name;
                            worksheet.Cells[dataCount, 36].Value = dataObject.recipient_uei;
                            worksheet.Cells[dataCount, 37].Value = dataObject.major_program;
                            worksheet.Cells[dataCount, 38].Value = dataObject.primary_place_of_performance_state_code;
                            worksheet.Cells[dataCount, 39].Value = dataObject.award_description;
                            worksheet.Cells[dataCount, 40].Value = dataObject.extent_competed;
                            worksheet.Cells[dataCount, 41].Value = dataObject.solicitation_procedures;
                            worksheet.Cells[dataCount, 42].Value = dataObject.SB_Award;
                            worksheet.Cells[dataCount, 43].Value = dataObject.fed_biz_opps;
                            worksheet.Cells[dataCount, 44].Value = dataObject.number_of_offers_received;
                            worksheet.Cells[dataCount, 45].Value = dataObject.BusinessSize;
                            worksheet.Cells[dataCount, 46].Value = dataObject.Contract_URL;
                            dataCount++;
                        }
                        ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                        string tableName = "Table1";
                        //Ading a table to a Range
                        ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                        //Formating the table style
                        tab.TableStyle = TableStyles.Medium4;
                        worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                        worksheet.Column(40).Width = 100;
                        worksheet.Column(40).Style.WrapText = true;
                        // Save the modified Excel package to a new file
                        using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                        {
                            package.SaveAs(outputFileStream);
                        }
                    }
                    bytes = System.IO.File.ReadAllBytes(filePath + "files/" + outputFileName);
                    exportedFilePath = outputFileName;//Convert.ToBase64String(bytes, 0, bytes.Length);

                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            dynamic response = String.Empty;
            if (exportedFilePath == String.Empty)
            {
                response = vendorList;
            }
            else
            {
                response = outputFileName;
            }

            return new JavaScriptSerializer().Serialize(new { records = response });

        }

        public string OpportunityDataGridPage(OpportunityListBody body, bool isExcel)
        {
            List<OpportunityList> opportunityList = new List<OpportunityList>();
            AnswerWidgetService service = new AnswerWidgetService();
            string UserID = Session["User_ID"].ToString();
            string error = "";
            string exportedFilePath = "";
            var templatePath = "FedTemplate.xlsx"; // Update with your template file path
            string outputFileName = "Output -" + DateTime.Now.ToString("yyyy-dd-M-HH-mm-ss") + ".xlsx"; // Update with your desired output file path
            byte[] bytes = new Byte[64];
            Array.Clear(bytes, 0, bytes.Length);
            if (!isExcel)
            {
                opportunityList = service.fetchOpportunityList(body, UserID);
            }
            else
            {
                try
                {
                    opportunityList = service.fetchOpportunityList(body, UserID);
                    DateTime now = DateTime.Now;
                    // Load the Excel template
                    outputFileName = outputFileName.Replace('/', '-');
                    string filePath = Server.MapPath("~/Templates/");
                    ExcelPackage.LicenseContext = LicenseContext.Commercial;
                    using (var templateStream = new FileStream(filePath + templatePath, FileMode.Open))
                    using (var package = new ExcelPackage(templateStream))
                    {
                        // Access the worksheet in the template
                        var worksheet = package.Workbook.Worksheets[0];
                        int headerCount = 1;
                        int headerIndex = 7;
                        string[] excelHeader = new string[]{ "Notice Id","Title","Solicitation Number","Department Name","Agency Name",
                                                "Office Name","Posted Date","Archive Date","Set Aside Code","Set Aside Description",
                                                "Naics Code","Product or Service Code","Primary Contact Title","Primary Contact Full Name",
                                                "Primary Contact Email","Primary Contact Phone","SecondaryContactFullname","SecondaryContactTitle",
                                                "Secondary Contact Email","Secondary Contact Phone","SAM Link","Opportunity Description"};


                        foreach (string headerObject in excelHeader)
                        {
                            Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#571C7A");
                            worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                            worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                            worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                            headerCount++;
                        }

                        worksheet.Cells[6, 1].Value = "FedPipeline - Answers Wizard - Report - " + Session["User_Email"].ToString() + " - " + now;
                        //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                        // Add data to specific cells

                        int dataCount = 8;
                        foreach (dynamic dataObject in opportunityList)
                        {

                            CultureInfo cultureInfo = new CultureInfo("en-US");
                            worksheet.Cells[dataCount, 1].Value = dataObject.NoticeId;
                            worksheet.Cells[dataCount, 2].Value = dataObject.title;
                            worksheet.Cells[dataCount, 3].Value = dataObject.Solicitation_Number;
                            worksheet.Cells[dataCount, 4].Value = dataObject.department_name;
                            worksheet.Cells[dataCount, 5].Value = dataObject.agency_name;
                            worksheet.Cells[dataCount, 6].Value = dataObject.office_name;
                            worksheet.Cells[dataCount, 7].Value = dataObject.PostedDate;
                            worksheet.Cells[dataCount, 8].Value = dataObject.ArchiveDate;
                            worksheet.Cells[dataCount, 9].Value = dataObject.set_aside_code;
                            worksheet.Cells[dataCount, 10].Value = dataObject.set_aside_description;
                            worksheet.Cells[dataCount, 11].Value = dataObject.naicss_code;
                            worksheet.Cells[dataCount, 12].Value = dataObject.product_or_service_code;
                            worksheet.Cells[dataCount, 13].Value = dataObject.PrimaryContactTitle;
                            worksheet.Cells[dataCount, 14].Value = dataObject.PrimaryContactFullname;
                            worksheet.Cells[dataCount, 15].Value = dataObject.PrimaryContactEmail;
                            worksheet.Cells[dataCount, 16].Value = dataObject.PrimaryContactPhone;
                            worksheet.Cells[dataCount, 17].Value = dataObject.SecondaryContactFullname;
                            worksheet.Cells[dataCount, 18].Value = dataObject.SecondaryContactTitle;
                            worksheet.Cells[dataCount, 19].Value = dataObject.SecondaryContactEmail;
                            worksheet.Cells[dataCount, 20].Value = dataObject.SecondaryContactPhone;
                            worksheet.Cells[dataCount, 21].Value = dataObject.SAMLink;
                            worksheet.Cells[dataCount, 22].Value = dataObject.Opportunity_description;
                            dataCount++;
                        }
                        ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                        string tableName = "Table1";
                        //Ading a table to a Range
                        ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                        //Formating the table style
                        tab.TableStyle = TableStyles.Medium4;
                        worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                        worksheet.Column(40).Width = 100;
                        worksheet.Column(40).Style.WrapText = true;
                        // Save the modified Excel package to a new file
                        using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                        {
                            package.SaveAs(outputFileStream);
                        }
                    }
                    bytes = System.IO.File.ReadAllBytes(filePath + "files/" + outputFileName);
                    exportedFilePath = outputFileName;//Convert.ToBase64String(bytes, 0, bytes.Length);

                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            dynamic response = String.Empty;
            if (exportedFilePath == String.Empty)
            {
                response = opportunityList;
            }
            else
            {
                response = outputFileName;
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            return serializer.Serialize(new { records = response });
        }

        public string OpportunityPlusList(string NoticeId)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<OpportunityPlusList> opportunityList = new List<OpportunityPlusList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Question_OpportunityPlus";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@noticeID", NoticeId);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        OpportunityPlusList opportunityObject = new OpportunityPlusList();
                        opportunityObject.NoticeId = rdr["NoticeId"].ToString();
                        opportunityObject.Title = rdr["Title"].ToString();
                        opportunityObject.Solicitation_Number = rdr["Solicitation_Number"].ToString();
                        opportunityObject.Department_IndAgency = rdr["Department_IndAgency"].ToString();
                        opportunityObject.department_code = rdr["department_code"].ToString();
                        opportunityObject.department_name = rdr["department_name"].ToString();
                        opportunityObject.agency_code = rdr["agency_code"].ToString();
                        opportunityObject.office_name = rdr["office_name"].ToString();
                        opportunityObject.office_code = rdr["office_code"].ToString();
                        opportunityObject.PostedDate = rdr["PostedDate"].ToString();
                        opportunityObject.Type = rdr["Type"].ToString();
                        opportunityObject.BaseType = rdr["BaseType"].ToString();
                        opportunityObject.ArchiveType = rdr["ArchiveType"].ToString();
                        opportunityObject.ArchiveDate = rdr["ArchiveDate"].ToString();
                        opportunityObject.SetASideCode = rdr["SetASideCode"].ToString();
                        opportunityObject.SetASide = rdr["SetASide"].ToString();
                        opportunityObject.ResponseDeadLine = rdr["ResponseDeadLine"].ToString();
                        opportunityObject.NaicsCode = rdr["NaicsCode"].ToString();
                        opportunityObject.ClassificationCode = rdr["ClassificationCode"].ToString();
                        opportunityObject.PopStreetAddress = rdr["PopStreetAddress"].ToString();
                        opportunityObject.PopCity = rdr["PopCity"].ToString();
                        opportunityObject.PopState = rdr["PopState"].ToString();
                        opportunityObject.PopZip = rdr["PopZip"].ToString();
                        opportunityObject.PopCountry = rdr["PopCountry"].ToString();
                        opportunityObject.Active = rdr["Active"].ToString();
                        opportunityObject.AwardNumber = rdr["AwardNumber"].ToString();
                        opportunityObject.AwardDate = rdr["AwardDate"].ToString();
                        opportunityObject.Award = rdr["Award$"].ToString();
                        opportunityObject.Awardee = rdr["Awardee"].ToString();
                        opportunityObject.PrimaryContactTitle = rdr["PrimaryContactTitle"].ToString();
                        opportunityObject.PrimaryContactFullname = rdr["PrimaryContactFullname"].ToString();
                        opportunityObject.PrimaryContactEmail = rdr["PrimaryContactEmail"].ToString();
                        opportunityObject.PrimaryContactPhone = rdr["PrimaryContactPhone"].ToString();
                        opportunityObject.PrimaryContactFax = rdr["PrimaryContactFax"].ToString();
                        opportunityObject.SecondaryContactFullname = rdr["SecondaryContactFullname"].ToString();
                        opportunityObject.SecondaryContactTitle = rdr["SecondaryContactTitle"].ToString();
                        opportunityObject.SecondaryContactEmail = rdr["SecondaryContactEmail"].ToString();
                        opportunityObject.SecondaryContactPhone = rdr["SecondaryContactPhone"].ToString();
                        opportunityObject.SecondaryContactFax = rdr["SecondaryContactFax"].ToString();
                        opportunityObject.OrganizationType = rdr["OrganizationType"].ToString();
                        opportunityObject.State = rdr["State"].ToString();
                        opportunityObject.City = rdr["City"].ToString();
                        opportunityObject.ZipCode = rdr["ZipCode"].ToString();
                        opportunityObject.CountryCode = rdr["CountryCode"].ToString();
                        opportunityObject.AdditionalInfoLink = rdr["AdditionalInfoLink"].ToString();
                        opportunityObject.Link = rdr["Link"].ToString();
                        opportunityObject.Description = rdr["Description"].ToString();
                        opportunityObject.award_number = rdr["award_number"].ToString();
                        opportunityObject.InsertedDateTime = rdr["InsertedDateTime"].ToString();

                        opportunityList.Add(opportunityObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { records = opportunityList });
        }

        public string DownloadFile(string filename)
        {
            //filename = "VPN_Setup.txt";

            string query = Request.QueryString[0];

            //Set the File Folder Path.
            //string path = HttpContext.Current.Server.MapPath("~/Files/");
            string path = HostingEnvironment.MapPath("~/Templates/files/");
            //Read the File as Byte Array.


            byte[] bytes = System.IO.File.ReadAllBytes(path + filename);

            //Convert File to Base64 string and send to Client.
            return Convert.ToBase64String(bytes, 0, bytes.Length);
        }

        public string VendorPlusQuestions(string vendor_uei)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorPlusQuestionResponse> vendorList = new List<VendorPlusQuestionResponse>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "vendor_plus_questions_get_by_vendor_uei";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@vendor_uei", vendor_uei);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorPlusQuestionResponse vendorObject = new VendorPlusQuestionResponse();
                        vendorObject.vendor_uei = rdr["vendor_uei"].ToString();
                        vendorObject.question = rdr["question"].ToString();
                        vendorObject.vendor_question_result_id = Convert.ToInt32(rdr["vendor_question_result_id"]);
                        vendorObject.description = rdr["description"].ToString();
                        vendorObject.link = rdr["link"].ToString();

                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = vendorList });
        }

        public string VendorInformation(string uei)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<VendorList> vendorList = new List<VendorList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_HDR_GetVendorName";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@uei", uei);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        VendorList vendorObject = new VendorList();
                        vendorObject.vendor_name_uei = rdr["vendor_name"].ToString();

                        vendorList.Add(vendorObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = vendorList });
        }

        public string ExportToPpt(string image, string text)
        {
            string base64String = String.Empty;
            string error = String.Empty;
            try
            {
                // Create presentation
                using (Presentation presentation = new Presentation())
                {
                    // Get slide collection
                    ISlideCollection slds = presentation.Slides;

                    // Add an empty slide to the Slides collection
                    ISlide sld = slds.AddEmptySlide(presentation.LayoutSlides[0]);

                    // Set the background color of the first ISlide to Blue
                    sld.Background.Type = BackgroundType.OwnBackground;
                    sld.Background.FillFormat.FillType = FillType.Solid;
                    sld.Background.FillFormat.SolidFillColor.Color = Color.Blue;
                    // Add title


                    /*  
                     ((IAutoShape)sld.Shapes[0]).TextFrame.Text = "Slide Title Heading";
                      // Add an AutoShape of Rectangle type
                      IAutoShape ashp = sld.Shapes.AddAutoShape(ShapeType.Rectangle, 150, 75, 150, 50);

                      // Add TextFrame to the Rectangle
                      ashp.AddTextFrame(" ");

                      // Accessing the text frame
                      ITextFrame txtFrame = ashp.TextFrame;

                      // Create the Paragraph object for text frame
                      IParagraph para = txtFrame.Paragraphs[0];

                      // Create Portion object for paragraph
                      IPortion portion = para.Portions[0];

                      // Set Text
                      portion.Text = "Aspose TextBox";*/

                    // Add image
                    string convert = image.Replace("data:image/png;base64,", String.Empty);
                    byte[] fileBytes = Convert.FromBase64String(convert);
                    using (MemoryStream stream = new MemoryStream(fileBytes))
                    {
                        IPPImage imagePpt = presentation.Images.AddImage(stream);
                        sld.Shapes.AddPictureFrame(ShapeType.Rectangle, 10, 10, 100, 100, imagePpt);
                    }


                    // Add autoshape of ellipse type
                    // sld.Shapes.AddAutoShape(ShapeType.Ellipse, 50, 150, 150, 50);

                    // Save the presentation to disk
                    presentation.Save("C:\\fedpipeline.com1\\fedpipeline.com1\\fedpipeline.com-22-06-23\\fedpipeline.com-22-06-23\\fedpipeline.com-22-06-23\\fedpipeline.com\\presentation.pptx", Aspose.Slides.Export.SaveFormat.Pptx);
                    //presentation.Save("presentation.pptx", Aspose.Slides.Export.SaveFormat.Pptx);
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { messge = "you can download the file", base64 = base64String });
        }

        public string HDRDataGridPage(HdrListBody body, bool isExcel)
        {
            List<HdrList> hdrList = new List<HdrList>();
            AnswerWidgetService service = new AnswerWidgetService();
            string UserID = Session["User_ID"].ToString();
            string error = "";
            string exportedFilePath = "";
            var templatePath = "Template.xlsx"; // Update with your template file path
            string outputFileName = "Output -" + DateTime.Now.ToString("yyyy-dd-M-HH-mm-ss") + ".xlsx"; // Update with your desired output file path
            byte[] bytes = new Byte[64];
            Array.Clear(bytes, 0, bytes.Length);
            if (!isExcel)
            {
                hdrList = service.fetchHdrList(body, UserID);
            }
            else
            {
                try
                {
                    hdrList = service.fetchHdrList(body, UserID);
                    DateTime now = DateTime.Now;
                    // Load the Excel template
                    outputFileName = outputFileName.Replace('/', '-');
                    string filePath = Server.MapPath("~/Templates/");
                    ExcelPackage.LicenseContext = LicenseContext.Commercial;
                    using (var templateStream = new FileStream(filePath + templatePath, FileMode.Open))
                        if (body.store_procedure == "Wizard_Question_HDR_65_UEI_Expiration_DataGrid")
                        {
                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{ "Vendor Name","JV","UEI","Immediate Owner Name","Highest Level Owner",
                                "CPARS","IDIQ Active","IDIQ Expired","IDIQ Total","Single IDIQ","Multiple IDIQ","Task Order(s) Active",
                                "Task Order(s) Expired","Task Order(s) Total","Registration Expire Date","Cage","Tax ID Number","DUNS",
                                "Office Location","Address","City","State","Zip","Status","Action","Notes"};

                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "FPDS - HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {

                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.JV;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.UEI;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.immediate_owner_name;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.highest_level_owner;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.CPARS;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.idiq_active;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.idiq_expired;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.idiq_total;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.single_idiq;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.Multiple_IDIQ;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.TO_Active;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.TO_Expired;
                                    worksheet.Cells[dataCount, 14].Value = dataObject.TO_Total;
                                    worksheet.Cells[dataCount, 15].Value = dataObject.reg_expire_date;
                                    worksheet.Cells[dataCount, 16].Value = dataObject.cage;
                                    worksheet.Cells[dataCount, 17].Value = dataObject.tax_id_number;
                                    worksheet.Cells[dataCount, 18].Value = dataObject.DUNS;
                                    worksheet.Cells[dataCount, 19].Value = dataObject.office_location;
                                    worksheet.Cells[dataCount, 20].Value = dataObject.address;
                                    worksheet.Cells[dataCount, 21].Value = dataObject.city;
                                    worksheet.Cells[dataCount, 22].Value = dataObject.state;
                                    worksheet.Cells[dataCount, 23].Value = dataObject.zip;
                                    worksheet.Cells[dataCount, 24].Value = dataObject.status;
                                    worksheet.Cells[dataCount, 25].Value = dataObject.action;
                                    worksheet.Cells[dataCount, 26].Value = dataObject.notes;
                                    //worksheet.Cells[dataCount, 27].Value = dataObject.updated_at;

                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }

                        else if (body.store_procedure == "Wizard_Question_HDR_67_Obligations_DataGrid")
                        {
                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{"Transaction Id","Contract #","IDV #","Modification #","Funding Agency",
                                    "Funding Sub-Agency","Funding Office","NAICS","NAICS Description","PSC","PSC Description",
                                    "Start Date","End Date","Set Aside","Expire Year","Solicitation Identifier","Base and All Options",
                                    "Action Obligation","Funding Agency Code","Funding Sub Agency Code","Funding Office Code",
                                    "Awarding Agency Code","Awarding Agency Name","Awarding Sub Agency Code","Awarding Sub Agency Name",
                                    "Awarding Office Code","Awarding Office Name","Award Type","Type of Contract Pricing","Solicitation Date",
                                    "Date Signed","Date Signed (FY)","POP Current End Date","Contract Duration","Vendor Name","Vendor UEI",
                                    "Major Program","Primary POP State","Award Description","Extent Competed","Solicitation Procedures",
                                    "Small Business Set Aside","Posted to Fed Piz Opps","# of Offers Received","Business Size","Contract Link",
                                    "IDIQ Status","Action","Notes","Updated"};

                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "FPDS - HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {
                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.transaction_id;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.award_id_piid;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.parent_award_id_piid;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.modification_number;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.funding_agency_name;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.funding_sub_agency_name;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.funding_office_name;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.naics_code;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.naics_description;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.product_or_service_code;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.product_or_service_code_description;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.period_of_performance_start_date;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.period_of_performance_potential_end_date;
                                    worksheet.Cells[dataCount, 14].Value = dataObject.type_of_set_aside;
                                    worksheet.Cells[dataCount, 15].Value = !string.IsNullOrEmpty(dataObject.Year_Expire) ? dataObject.Year_Expire : "";
                                    worksheet.Cells[dataCount, 16].Value = dataObject.solicitation_identifier;
                                    worksheet.Cells[dataCount, 17].Value = dataObject.base_and_all_options_value.ToString("C", cultureInfo); ;
                                    worksheet.Cells[dataCount, 18].Value = dataObject.federal_action_obligation.ToString("C", cultureInfo); ;
                                    worksheet.Cells[dataCount, 19].Value = dataObject.funding_agency_code;
                                    worksheet.Cells[dataCount, 20].Value = dataObject.funding_sub_agency_code;
                                    worksheet.Cells[dataCount, 21].Value = dataObject.funding_office_code;
                                    worksheet.Cells[dataCount, 22].Value = dataObject.awarding_agency_code;
                                    worksheet.Cells[dataCount, 23].Value = dataObject.awarding_agency_name;
                                    worksheet.Cells[dataCount, 24].Value = dataObject.awarding_sub_agency_code;
                                    worksheet.Cells[dataCount, 25].Value = dataObject.awarding_sub_agency_name;
                                    worksheet.Cells[dataCount, 26].Value = dataObject.awarding_office_code;
                                    worksheet.Cells[dataCount, 27].Value = dataObject.awarding_office_name;
                                    worksheet.Cells[dataCount, 28].Value = dataObject.award_type;
                                    worksheet.Cells[dataCount, 29].Value = dataObject.type_of_contract_pricing;
                                    worksheet.Cells[dataCount, 30].Value = dataObject.solicitation_date;
                                    worksheet.Cells[dataCount, 31].Value = dataObject.action_date;
                                    worksheet.Cells[dataCount, 32].Value = dataObject.action_date_fiscal_year;
                                    worksheet.Cells[dataCount, 33].Value = dataObject.period_of_performance_current_end_date;
                                    worksheet.Cells[dataCount, 34].Value = dataObject.contract_duration;
                                    worksheet.Cells[dataCount, 35].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 36].Value = dataObject.recipient_uei;
                                    worksheet.Cells[dataCount, 37].Value = dataObject.major_program;
                                    worksheet.Cells[dataCount, 38].Value = dataObject.primary_place_of_performance_state_code;
                                    worksheet.Cells[dataCount, 39].Value = dataObject.award_description;
                                    worksheet.Cells[dataCount, 40].Value = dataObject.extent_competed;
                                    worksheet.Cells[dataCount, 41].Value = dataObject.solicitation_procedures;
                                    worksheet.Cells[dataCount, 42].Value = dataObject.SB_Award;
                                    worksheet.Cells[dataCount, 43].Value = dataObject.fed_biz_opps;
                                    worksheet.Cells[dataCount, 44].Value = dataObject.number_of_offers_received;
                                    worksheet.Cells[dataCount, 45].Value = dataObject.BusinessSize;
                                    worksheet.Cells[dataCount, 46].Value = dataObject.Contract_URL;
                                    worksheet.Cells[dataCount, 47].Value = dataObject.idiq_status;
                                    worksheet.Cells[dataCount, 48].Value = dataObject.action_to_take;
                                    worksheet.Cells[dataCount, 49].Value = dataObject.notes;
                                    worksheet.Cells[dataCount, 50].Value = dataObject.updated_at;

                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }

                        else if (body.store_procedure == "Wizard_Question_HDR_66_CPARS_DataGrid")
                        {
                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{ "Vendor Name","AGENCY_NAME", "QUALITY_RATING", "SCHEDULE_RATING",
                                    "COST_CONTROL_RATING","MANAGEMENT_RATING","SMALL_BUSINESS_RATING","REGULATORY_COMPLIANCE_RATING",
                                    "UNIQUE_ENTITY_ID","CONTRACT_NUMBER","CONTRACT_ORDER_NUMBER","ASSESSING_OFFICIAL_RECOMMEND","ASSESSING_OFFICIAL_SIGNED_DATE" };


                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "FPDS - HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {

                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.AGENCY_NAME;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.QUALITY_RATING;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.SCHEDULE_RATING;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.COST_CONTROL_RATING;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.MANAGEMENT_RATING;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.SMALL_BUSINESS_RATING;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.REGULATORY_COMPLIANCE_RATING;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.UNIQUE_ENTITY_ID;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.CONTRACT_NUMBER;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.CONTRACT_ORDER_NUMBER;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.ASSESSING_OFFICIAL_RECOMMEND;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.ASSESSING_OFFICIAL_SIGNED_DATE;
                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }

                    bytes = System.IO.File.ReadAllBytes(filePath + "files/" + outputFileName);
                    exportedFilePath = outputFileName;//Convert.ToBase64String(bytes, 0, bytes.Length);

                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            dynamic response = String.Empty;
            if (exportedFilePath == String.Empty)
            {
                response = hdrList;
            }
            else
            {
                response = outputFileName;
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            return serializer.Serialize(new { records = response });
        }

        public string HDRDrilldownPage(HdrListBody body, bool isExcel)
        {
            List<HdrList> hdrList = new List<HdrList>();
            AnswerWidgetService service = new AnswerWidgetService();
            string UserID = Session["User_ID"].ToString();
            string error = "";
            string exportedFilePath = "";
            var templatePath = "Template.xlsx"; // Update with your template file path
            string outputFileName = "Output -" + DateTime.Now.ToString("yyyy-dd-M-HH-mm-ss") + ".xlsx"; // Update with your desired output file path
            byte[] bytes = new Byte[64];
            Array.Clear(bytes, 0, bytes.Length);
            if (!isExcel)
            {
                hdrList = service.fetchHdrDrilldownList(body, UserID);
            }
            else
            {
                try
                {
                    hdrList = service.fetchHdrDrilldownList(body, UserID);
                    DateTime now = DateTime.Now;
                    // Load the Excel template
                    outputFileName = outputFileName.Replace('/', '-');
                    string filePath = Server.MapPath("~/Templates/");
                    ExcelPackage.LicenseContext = LicenseContext.Commercial;
                    using (var templateStream = new FileStream(filePath + templatePath, FileMode.Open))
                        if (body.store_procedure == "Wizard_Question_HDR_IDIQ_DrillDown")
                        {

                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{"Transaction Id","Contract #","IDV #","Modification #","Funding Agency",
                                    "Funding Sub-Agency","Funding Office","NAICS","NAICS Description","PSC","PSC Description",
                                    "Start Date","End Date","Set Aside","Expire Year","Solicitation Identifier","Base and All Options",
                                    "Action Obligation","Funding Agency Code","Funding Sub Agency Code","Funding Office Code",
                                    "Awarding Agency Code","Awarding Agency Name","Awarding Sub Agency Code","Awarding Sub Agency Name",
                                    "Awarding Office Code","Awarding Office Name","Award Type","Type of Contract Pricing","Solicitation Date",
                                    "Date Signed","Date Signed (FY)","POP Current End Date","Contract Duration","Vendor Name","Vendor UEI",
                                    "Major Program","Primary POP State","Award Description","Extent Competed","Solicitation Procedures",
                                    "Small Business Set Aside","Posted to Fed Piz Opps","# of Offers Received","Business Size","Contract Link",
                                    "IDIQ Status","Action","Notes","Updated"};

                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {
                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.transaction_id;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.award_id_piid;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.parent_award_id_piid;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.modification_number;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.funding_agency_name;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.funding_sub_agency_name;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.funding_office_name;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.naics_code;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.naics_description;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.product_or_service_code;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.product_or_service_code_description;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.period_of_performance_start_date;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.period_of_performance_potential_end_date;
                                    worksheet.Cells[dataCount, 14].Value = dataObject.type_of_set_aside;
                                    worksheet.Cells[dataCount, 15].Value = !string.IsNullOrEmpty(dataObject.Year_Expire) ? dataObject.Year_Expire : "";
                                    worksheet.Cells[dataCount, 16].Value = dataObject.solicitation_identifier;
                                    worksheet.Cells[dataCount, 17].Value = dataObject.base_and_all_options_value.ToString("C", cultureInfo); ;
                                    worksheet.Cells[dataCount, 18].Value = dataObject.federal_action_obligation.ToString("C", cultureInfo); ;
                                    worksheet.Cells[dataCount, 19].Value = dataObject.funding_agency_code;
                                    worksheet.Cells[dataCount, 20].Value = dataObject.funding_sub_agency_code;
                                    worksheet.Cells[dataCount, 21].Value = dataObject.funding_office_code;
                                    worksheet.Cells[dataCount, 22].Value = dataObject.awarding_agency_code;
                                    worksheet.Cells[dataCount, 23].Value = dataObject.awarding_agency_name;
                                    worksheet.Cells[dataCount, 24].Value = dataObject.awarding_sub_agency_code;
                                    worksheet.Cells[dataCount, 25].Value = dataObject.awarding_sub_agency_name;
                                    worksheet.Cells[dataCount, 26].Value = dataObject.awarding_office_code;
                                    worksheet.Cells[dataCount, 27].Value = dataObject.awarding_office_name;
                                    worksheet.Cells[dataCount, 28].Value = dataObject.award_type;
                                    worksheet.Cells[dataCount, 29].Value = dataObject.type_of_contract_pricing;
                                    worksheet.Cells[dataCount, 30].Value = dataObject.solicitation_date;
                                    worksheet.Cells[dataCount, 31].Value = dataObject.action_date;
                                    worksheet.Cells[dataCount, 32].Value = dataObject.action_date_fiscal_year;
                                    worksheet.Cells[dataCount, 33].Value = dataObject.period_of_performance_current_end_date;
                                    worksheet.Cells[dataCount, 34].Value = dataObject.contract_duration;
                                    worksheet.Cells[dataCount, 35].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 36].Value = dataObject.recipient_uei;
                                    worksheet.Cells[dataCount, 37].Value = dataObject.major_program;
                                    worksheet.Cells[dataCount, 38].Value = dataObject.primary_place_of_performance_state_code;
                                    worksheet.Cells[dataCount, 39].Value = dataObject.award_description;
                                    worksheet.Cells[dataCount, 40].Value = dataObject.extent_competed;
                                    worksheet.Cells[dataCount, 41].Value = dataObject.solicitation_procedures;
                                    worksheet.Cells[dataCount, 42].Value = dataObject.SB_Award;
                                    worksheet.Cells[dataCount, 43].Value = dataObject.fed_biz_opps;
                                    worksheet.Cells[dataCount, 44].Value = dataObject.number_of_offers_received;
                                    worksheet.Cells[dataCount, 45].Value = dataObject.BusinessSize;
                                    worksheet.Cells[dataCount, 46].Value = dataObject.Contract_URL;
                                    worksheet.Cells[dataCount, 47].Value = dataObject.idiq_status;
                                    worksheet.Cells[dataCount, 48].Value = dataObject.action_to_take;
                                    worksheet.Cells[dataCount, 49].Value = dataObject.notes;
                                    worksheet.Cells[dataCount, 50].Value = dataObject.updated_at;

                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }

                        else if (body.store_procedure == "Wizard_Question_HDR_CPARS_UEI_DataGrid")
                        {
                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{ "Vendor Name","AGENCY_NAME", "QUALITY_RATING", "SCHEDULE_RATING",
                                    "COST_CONTROL_RATING","MANAGEMENT_RATING","SMALL_BUSINESS_RATING","REGULATORY_COMPLIANCE_RATING",
                                    "UNIQUE_ENTITY_ID","CONTRACT_NUMBER","CONTRACT_ORDER_NUMBER","ASSESSING_OFFICIAL_RECOMMEND","ASSESSING_OFFICIAL_SIGNED_DATE" };


                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {

                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.AGENCY_NAME;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.QUALITY_RATING;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.SCHEDULE_RATING;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.COST_CONTROL_RATING;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.MANAGEMENT_RATING;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.SMALL_BUSINESS_RATING;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.REGULATORY_COMPLIANCE_RATING;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.UNIQUE_ENTITY_ID;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.CONTRACT_NUMBER;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.CONTRACT_ORDER_NUMBER;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.ASSESSING_OFFICIAL_RECOMMEND;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.ASSESSING_OFFICIAL_SIGNED_DATE;
                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }

                    bytes = System.IO.File.ReadAllBytes(filePath + "files/" + outputFileName);
                    exportedFilePath = outputFileName;//Convert.ToBase64String(bytes, 0, bytes.Length);

                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            dynamic response = String.Empty;
            if (exportedFilePath == String.Empty)
            {
                response = hdrList;
            }
            else
            {
                response = outputFileName;
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            return serializer.Serialize(new { records = response });
        }

        public string HdrUEIplusPageGrid1(string UEI)
        {
            var error = string.Empty;
            var response = string.Empty;
            //List<HdrList> hdrList = new List<HdrList>();
            AnswerWidgetService service = new AnswerWidgetService();
            HdrListBody body = new HdrListBody();

            body.store_procedure = "Wizard_Question_HDR_CPARS_UEI_DataGrid";
            body.UEI = UEI;

            string UserID = Session["User_ID"].ToString();
            List<HdrList> hdrList = service.fetchHdrDrilldownList(body, UserID);


            return new JavaScriptSerializer().Serialize(new { records = hdrList });

        }

        public string HdrUEIplusPageGrid2(string UEI)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<HdrList> hdrList = new List<HdrList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Question_HDR_67_Obligations_DataGrid_UEI";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@UEI", UEI);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        HdrList hdrObject = new HdrList();
                        hdrObject.transaction_id = Convert.ToInt32(rdr["transaction_id"]);
                        hdrObject.parent_award_id_piid = rdr["parent_award_id_piid"].ToString();
                        hdrObject.award_id_piid = rdr["award_id_piid"].ToString();
                        hdrObject.modification_number = rdr["modification_number"].ToString();
                        hdrObject.funding_agency_name = rdr["funding_agency_name"].ToString();
                        hdrObject.funding_sub_agency_name = rdr["funding_sub_agency_name"].ToString();
                        hdrObject.funding_office_name = rdr["funding_office_name"].ToString();
                        hdrObject.naics_code = rdr["naics_code"].ToString();
                        hdrObject.naics_description = rdr["naics_description"].ToString();
                        hdrObject.product_or_service_code = rdr["product_or_service_code"].ToString();
                        hdrObject.product_or_service_code_description = rdr["product_or_service_code_description"].ToString();
                        // Convert string values to double, handling potential null/empty values and parsing errors
                        hdrObject.base_and_all_options_value = SafeParseDouble(rdr["base_and_all_options_value"].ToString());
                        hdrObject.federal_action_obligation = SafeParseDouble(rdr["federal_action_obligation"].ToString());
                        hdrObject.solicitation_identifier = rdr["solicitation_identifier"].ToString();
                        hdrObject.funding_agency_code = rdr["funding_agency_code"].ToString();
                        hdrObject.funding_sub_agency_code = rdr["funding_sub_agency_code"].ToString();
                        hdrObject.funding_office_code = rdr["funding_office_code"].ToString();
                        hdrObject.awarding_agency_code = rdr["awarding_agency_code"].ToString();
                        hdrObject.awarding_agency_name = rdr["awarding_agency_name"].ToString();
                        hdrObject.awarding_sub_agency_code = rdr["awarding_sub_agency_code"].ToString();
                        hdrObject.awarding_sub_agency_name = rdr["awarding_sub_agency_name"].ToString();
                        hdrObject.awarding_office_code = rdr["awarding_office_code"].ToString();
                        hdrObject.awarding_office_name = rdr["awarding_office_name"].ToString();
                        hdrObject.award_type = rdr["award_type"].ToString();
                        // Convert string values to double for _k fields, handling potential null/empty values and parsing errors
                        hdrObject.base_and_all_options_value_k = SafeParseDouble(rdr["base_and_all_options_value_k"].ToString());
                        hdrObject.federal_action_obligation_k = SafeParseDouble(rdr["federal_action_obligation_k"].ToString());
                        hdrObject.type_of_contract_pricing = rdr["type_of_contract_pricing"].ToString();
                        hdrObject.solicitation_date = rdr["solicitation_date"].ToString();
                        hdrObject.action_date = rdr["action_date"].ToString();
                        hdrObject.action_date_fiscal_year = rdr["action_date_fiscal_year"].ToString();
                        hdrObject.period_of_performance_start_date = rdr["period_of_performance_start_date"].ToString();
                        if (hdrObject.period_of_performance_start_date != "")
                        {
                            DateTime enteredDate1 = DateTime.Parse(hdrObject.period_of_performance_start_date);
                            hdrObject.period_of_performance_start_date = enteredDate1.ToString("MM/dd/yy");
                        }
                        hdrObject.period_of_performance_current_end_date = rdr["period_of_performance_current_end_date"].ToString();
                        hdrObject.period_of_performance_potential_end_date = rdr["period_of_performance_potential_end_date"].ToString();
                        if (hdrObject.period_of_performance_potential_end_date != "")
                        {
                            DateTime enteredDate2 = DateTime.Parse(hdrObject.period_of_performance_potential_end_date);
                            hdrObject.period_of_performance_potential_end_date = enteredDate2.ToString("MM/dd/yy");
                        }
                        hdrObject.year_expire = rdr["year_expire"].ToString();
                        hdrObject.contract_duration = rdr["contract_duration"].ToString();
                        hdrObject.vendor_name = rdr["vendor_name"].ToString();
                        hdrObject.recipient_uei = rdr["recipient_uei"].ToString();
                        hdrObject.major_program = rdr["major_program"].ToString();
                        hdrObject.primary_place_of_performance_state_code = rdr["primary_place_of_performance_state_code"].ToString();
                        hdrObject.award_description = rdr["award_description"].ToString();
                        hdrObject.solicitation_procedures = rdr["solicitation_procedures"].ToString();
                        hdrObject.type_of_set_aside = rdr["type_of_set_aside"].ToString();
                        hdrObject.fed_biz_opps = rdr["fed_biz_opps"].ToString();
                        hdrObject.number_of_offers_received = rdr["number_of_offers_received"].ToString();
                        hdrObject.BusinessSize = rdr["BusinessSize"].ToString();
                        hdrObject.Contract_URL = rdr["Contract_URL"].ToString();
                        hdrObject.action_to_take = rdr["action_to_take"].ToString();
                        hdrObject.idiq_status = rdr["idiq_status"].ToString();
                        hdrObject.updated_at = rdr["updated_at"].ToString();
                        hdrObject.uei = rdr["uei"].ToString();
                        hdrObject.notes = rdr["notes"].ToString();
                        hdrList.Add(hdrObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = hdrList });

        }

        public string HdrDrilldownDataGrid(string UEI, string drilldown_type)
        {
            var error = string.Empty;
            var response = string.Empty;
            // List<HdrList> hdrList = new List<HdrList>();
            AnswerWidgetService service = new AnswerWidgetService();
            HdrListBody body = new HdrListBody();

            body.store_procedure = "Wizard_Question_HDR_IDIQ_DrillDown";
            body.UEI = UEI;
            body.drilldown_type = drilldown_type;
            string UserID = Session["User_ID"].ToString();
            List<HdrList> hdrList = service.fetchHdrDrilldownList(body, UserID);
            return new JavaScriptSerializer().Serialize(new { records = hdrList });

        }

        public string HdrDrilldownExcel(string sp, bool isExcel, string UEI, string drilldown_type)
        {
            //List<HdrList> hdrList = new List<HdrList>();
            List<HdrList> hdrList = new List<HdrList>();
            string error = "";
            string exportedFilePath = "";
            var templatePath = "Template.xlsx"; // Update with your template file path
            string outputFileName = "Output -" + DateTime.Now.ToString("yyyy-dd-M-HH-mm-ss") + ".xlsx"; // Update with your desired output file path
            byte[] bytes = new Byte[64];
            Array.Clear(bytes, 0, bytes.Length);
            if (!isExcel)
            {
                //hdrList = service.fetchHdrList(body, UserID);
            }
            else
            {
                try
                {
                    //hdrList = service.fetchHdrList(body, UserID);
                    DateTime now = DateTime.Now;
                    // Load the Excel template
                    outputFileName = outputFileName.Replace('/', '-');
                    string filePath = Server.MapPath("~/Templates/");
                    ExcelPackage.LicenseContext = LicenseContext.Commercial;
                    using (var templateStream = new FileStream(filePath + templatePath, FileMode.Open))
                    {
                        if (sp == "Wizard_Question_HDR_IDIQ_DrillDown")
                        {
                            AnswerWidgetService service = new AnswerWidgetService();
                            HdrListBody body = new HdrListBody();
                            body.store_procedure = sp;
                            body.UEI = UEI;
                            body.drilldown_type = drilldown_type;
                            string UserID = Session["User_ID"].ToString();
                            hdrList = service.fetchHdrDrilldownList(body, UserID);
                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{"Transaction Id","Contract #","IDV #","Modification #","Funding Agency",
                                    "Funding Sub-Agency","Funding Office","NAICS","NAICS Description","PSC","PSC Description",
                                    "Start Date","End Date","Set Aside","Expire Year","Solicitation Identifier","Base and All Options",
                                    "Action Obligation","Funding Agency Code","Funding Sub Agency Code","Funding Office Code",
                                    "Awarding Agency Code","Awarding Agency Name","Awarding Sub Agency Code","Awarding Sub Agency Name",
                                    "Awarding Office Code","Awarding Office Name","Award Type","Type of Contract Pricing","Solicitation Date",
                                    "Date Signed","Date Signed (FY)","POP Current End Date","Contract Duration","Vendor Name","Vendor UEI",
                                    "Major Program","Primary POP State","Award Description","Extent Competed","Solicitation Procedures",
                                    "Small Business Set Aside","Posted to Fed Piz Opps","# of Offers Received","Business Size","Contract Link",
                                    "IDIQ Status","Action","Notes","Updated"};

                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {
                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.transaction_id;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.award_id_piid;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.parent_award_id_piid;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.modification_number;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.funding_agency_name;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.funding_sub_agency_name;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.funding_office_name;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.naics_code;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.naics_description;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.product_or_service_code;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.product_or_service_code_description;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.period_of_performance_start_date;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.period_of_performance_potential_end_date;
                                    worksheet.Cells[dataCount, 14].Value = dataObject.type_of_set_aside;
                                    worksheet.Cells[dataCount, 15].Value = !string.IsNullOrEmpty(dataObject.Year_Expire) ? dataObject.Year_Expire : "";
                                    worksheet.Cells[dataCount, 16].Value = dataObject.solicitation_identifier;
                                    worksheet.Cells[dataCount, 17].Value = dataObject.base_and_all_options_value.ToString("C", cultureInfo); ;
                                    worksheet.Cells[dataCount, 18].Value = dataObject.federal_action_obligation.ToString("C", cultureInfo); ;
                                    worksheet.Cells[dataCount, 19].Value = dataObject.funding_agency_code;
                                    worksheet.Cells[dataCount, 20].Value = dataObject.funding_sub_agency_code;
                                    worksheet.Cells[dataCount, 21].Value = dataObject.funding_office_code;
                                    worksheet.Cells[dataCount, 22].Value = dataObject.awarding_agency_code;
                                    worksheet.Cells[dataCount, 23].Value = dataObject.awarding_agency_name;
                                    worksheet.Cells[dataCount, 24].Value = dataObject.awarding_sub_agency_code;
                                    worksheet.Cells[dataCount, 25].Value = dataObject.awarding_sub_agency_name;
                                    worksheet.Cells[dataCount, 26].Value = dataObject.awarding_office_code;
                                    worksheet.Cells[dataCount, 27].Value = dataObject.awarding_office_name;
                                    worksheet.Cells[dataCount, 28].Value = dataObject.award_type;
                                    worksheet.Cells[dataCount, 29].Value = dataObject.type_of_contract_pricing;
                                    worksheet.Cells[dataCount, 30].Value = dataObject.solicitation_date;
                                    worksheet.Cells[dataCount, 31].Value = dataObject.action_date;
                                    worksheet.Cells[dataCount, 32].Value = dataObject.action_date_fiscal_year;
                                    worksheet.Cells[dataCount, 33].Value = dataObject.period_of_performance_current_end_date;
                                    worksheet.Cells[dataCount, 34].Value = dataObject.contract_duration;
                                    worksheet.Cells[dataCount, 35].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 36].Value = dataObject.recipient_uei;
                                    worksheet.Cells[dataCount, 37].Value = dataObject.major_program;
                                    worksheet.Cells[dataCount, 38].Value = dataObject.primary_place_of_performance_state_code;
                                    worksheet.Cells[dataCount, 39].Value = dataObject.award_description;
                                    worksheet.Cells[dataCount, 40].Value = dataObject.extent_competed;
                                    worksheet.Cells[dataCount, 41].Value = dataObject.solicitation_procedures;
                                    worksheet.Cells[dataCount, 42].Value = dataObject.SB_Award;
                                    worksheet.Cells[dataCount, 43].Value = dataObject.fed_biz_opps;
                                    worksheet.Cells[dataCount, 44].Value = dataObject.number_of_offers_received;
                                    worksheet.Cells[dataCount, 45].Value = dataObject.BusinessSize;
                                    worksheet.Cells[dataCount, 46].Value = dataObject.Contract_URL;
                                    worksheet.Cells[dataCount, 47].Value = dataObject.idiq_status;
                                    worksheet.Cells[dataCount, 48].Value = dataObject.action_to_take;
                                    worksheet.Cells[dataCount, 49].Value = dataObject.notes;
                                    worksheet.Cells[dataCount, 50].Value = dataObject.updated_at;

                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }

                        else if (sp == "Wizard_Question_HDR_CPARS_UEI_DataGrid")
                        {

                            AnswerWidgetService service = new AnswerWidgetService();
                            HdrListBody body = new HdrListBody();

                            body.store_procedure = sp;
                            body.UEI = UEI;

                            string UserID = Session["User_ID"].ToString();
                            hdrList = service.fetchHdrDrilldownList(body, UserID);
                            using (var package = new ExcelPackage(templateStream))
                            {
                                // Access the worksheet in the template
                                var worksheet = package.Workbook.Worksheets[0];
                                int headerCount = 1;
                                int headerIndex = 7;
                                string[] excelHeader = new string[]{ "Vendor Name","AGENCY_NAME", "QUALITY_RATING", "SCHEDULE_RATING",
                                    "COST_CONTROL_RATING","MANAGEMENT_RATING","SMALL_BUSINESS_RATING","REGULATORY_COMPLIANCE_RATING",
                                    "UNIQUE_ENTITY_ID","CONTRACT_NUMBER","CONTRACT_ORDER_NUMBER","ASSESSING_OFFICIAL_RECOMMEND","ASSESSING_OFFICIAL_SIGNED_DATE" };


                                foreach (string headerObject in excelHeader)
                                {
                                    Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                    worksheet.Cells[headerIndex, headerCount].Style.Fill.BackgroundColor.SetColor(colFromHex);
                                    worksheet.Cells[headerIndex, headerCount].Value = headerObject;
                                    headerCount++;
                                }
                                //Color headerColFromHex = System.Drawing.ColorTranslator.FromHtml("#808080");
                                worksheet.Cells[6, 1].Value = "HDR - Report - " + Session["User_Email"].ToString() + " - " + now;
                                //worksheet.Cells[6, 1].Style.Fill.BackgroundColor.SetColor(headerColFromHex);
                                //  worksheet.Cells[headerIndex, 1, headerIndex, headerData.Count].AutoFilter = true;
                                // Add data to specific cells

                                int dataCount = 8;
                                foreach (dynamic dataObject in hdrList)
                                {

                                    CultureInfo cultureInfo = new CultureInfo("en-US");
                                    worksheet.Cells[dataCount, 1].Value = dataObject.vendor_name;
                                    worksheet.Cells[dataCount, 2].Value = dataObject.AGENCY_NAME;
                                    worksheet.Cells[dataCount, 3].Value = dataObject.QUALITY_RATING;
                                    worksheet.Cells[dataCount, 4].Value = dataObject.SCHEDULE_RATING;
                                    worksheet.Cells[dataCount, 5].Value = dataObject.COST_CONTROL_RATING;
                                    worksheet.Cells[dataCount, 6].Value = dataObject.MANAGEMENT_RATING;
                                    worksheet.Cells[dataCount, 7].Value = dataObject.SMALL_BUSINESS_RATING;
                                    worksheet.Cells[dataCount, 8].Value = dataObject.REGULATORY_COMPLIANCE_RATING;
                                    worksheet.Cells[dataCount, 9].Value = dataObject.UNIQUE_ENTITY_ID;
                                    worksheet.Cells[dataCount, 10].Value = dataObject.CONTRACT_NUMBER;
                                    worksheet.Cells[dataCount, 11].Value = dataObject.CONTRACT_ORDER_NUMBER;
                                    worksheet.Cells[dataCount, 12].Value = dataObject.ASSESSING_OFFICIAL_RECOMMEND;
                                    worksheet.Cells[dataCount, 13].Value = dataObject.ASSESSING_OFFICIAL_SIGNED_DATE;
                                    dataCount++;
                                }
                                ExcelRange rg = worksheet.Cells[headerIndex, 1, worksheet.Dimension.End.Row, excelHeader.Length];
                                string tableName = "Table1";
                                //Ading a table to a Range
                                ExcelTable tab = worksheet.Tables.Add(rg, tableName);
                                //Formating the table style
                                tab.TableStyle = TableStyles.Medium4;
                                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
                                worksheet.Column(40).Width = 100;
                                worksheet.Column(40).Style.WrapText = true;
                                // Save the modified Excel package to a new file
                                using (var outputFileStream = new FileStream(filePath + "files/" + outputFileName, FileMode.Create))
                                {
                                    package.SaveAs(outputFileStream);
                                }
                            }
                        }
                    }
                    bytes = System.IO.File.ReadAllBytes(filePath + "files/" + outputFileName);
                    exportedFilePath = outputFileName;//Convert.ToBase64String(bytes, 0, bytes.Length);

                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            dynamic response = String.Empty;
            if (exportedFilePath == String.Empty)
            {
                response = hdrList;
            }
            else
            {
                response = outputFileName;
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            return serializer.Serialize(new { records = response });
        }

        public string FpdsCparsData(string UEI)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<CparsList> cparsList = new List<CparsList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Question_HDR_66_CPARS_UEI";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@UEI", UEI);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        CparsList cparsObject = new CparsList();
                        cparsObject.UEI = rdr["UEI"].ToString();
                        cparsObject.vendor_name = rdr["vendor_name"].ToString();
                        cparsObject.agency_name = rdr["agency_name"].ToString();
                        cparsObject.total_CPARS = Convert.ToInt32(rdr["total_CPARS"]);
                        cparsObject.Quality_Rating_Exceptional = rdr["Quality_Rating_Exceptional"].ToString();
                        cparsObject.Quality_Rating_VeryGood = rdr["Quality_Rating_VeryGood"].ToString();
                        cparsObject.Quality_Rating_Satisfactory = rdr["Quality_Rating_Satisfactory"].ToString();
                        cparsObject.Quality_Rating_Marginal = rdr["Quality_Rating_Marginal"].ToString();
                        cparsObject.Quality_Rating_UNSat = rdr["Quality_Rating_UNSat"].ToString();
                        cparsObject.Quality_Rating_NA = rdr["Quality_Rating_NA"].ToString();
                        cparsObject.Schedule_Rating_Exceptional = rdr["Schedule_Rating_Exceptional"].ToString();
                        cparsObject.Schedule_Rating_VeryGood = rdr["Schedule_Rating_VeryGood"].ToString();
                        cparsObject.Schedule_Rating_Satisfactory = rdr["Schedule_Rating_Satisfactory"].ToString();
                        cparsObject.Schedule_Rating_Marginal = rdr["Schedule_Rating_Marginal"].ToString();
                        cparsObject.Schedule_Rating_UNSat = rdr["Schedule_Rating_UNSat"].ToString();
                        cparsObject.Schedule_Rating_NA = rdr["Schedule_Rating_NA"].ToString();
                        cparsObject.Cost_Control_Rating_Exceptional = rdr["Cost_Control_Rating_Exceptional"].ToString();
                        cparsObject.Cost_Control_Rating_VeryGood = rdr["Cost_Control_Rating_VeryGood"].ToString();
                        cparsObject.Cost_Control_Rating_Satisfactory = rdr["Cost_Control_Rating_Satisfactory"].ToString();
                        cparsObject.Cost_Control_Rating_Marginal = rdr["Cost_Control_Rating_Marginal"].ToString();
                        cparsObject.Cost_Control_Rating_UNSat = rdr["Cost_Control_Rating_UNSat"].ToString();
                        cparsObject.Cost_Control_Rating_NA = rdr["Cost_Control_Rating_NA"].ToString();
                        cparsObject.Management_Rating_Exceptional = rdr["Management_Rating_Exceptional"].ToString();
                        cparsObject.Management_Rating_VeryGood = rdr["Management_Rating_VeryGood"].ToString();
                        cparsObject.Management_Rating_Satisfactory = rdr["Management_Rating_Satisfactory"].ToString();
                        cparsObject.Management_Rating_Marginal = rdr["Management_Rating_Marginal"].ToString();
                        cparsObject.Management_Rating_UNSat = rdr["Management_Rating_UNSat"].ToString();
                        cparsObject.Management_Rating_NA = rdr["Management_Rating_NA"].ToString();
                        cparsObject.Small_Business_Rating_Exceptional = rdr["Small_Business_Rating_Exceptional"].ToString();
                        cparsObject.Small_Business_Rating_VeryGood = rdr["Small_Business_Rating_VeryGood"].ToString();
                        cparsObject.Small_Business_Rating_Satisfactory = rdr["Small_Business_Rating_Satisfactory"].ToString();
                        cparsObject.Small_Business_Rating_Marginal = rdr["Small_Business_Rating_Marginal"].ToString();
                        cparsObject.Small_Business_Rating_UNSat = rdr["Small_Business_Rating_UNSat"].ToString();
                        cparsObject.Small_Business_Rating_NA = rdr["Small_Business_Rating_NA"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_Exceptional = rdr["Regulatory_Compliance_Rating_Exceptional"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_VeryGood = rdr["Regulatory_Compliance_Rating_VeryGood"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_Satisfactory = rdr["Regulatory_Compliance_Rating_Satisfactory"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_Marginal = rdr["Regulatory_Compliance_Rating_Marginal"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_UNSat = rdr["Regulatory_Compliance_Rating_UNSat"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_NA = rdr["Regulatory_Compliance_Rating_NA"].ToString();
                        cparsList.Add(cparsObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = cparsList });

        }

        public string FpdsCparsDataContract(string contract, string UEI)
        {
            var error = string.Empty;
            var response = string.Empty;
            List<CparsList> cparsList = new List<CparsList>();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    var sp = "Wizard_Question_HDR_66_CPARS_Contract";
                    SqlCommand cmd1 = new SqlCommand(sp, con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Parameters.AddWithValue("@contract", contract);
                    cmd1.Parameters.AddWithValue("@UEI", UEI);
                    con.Open();
                    SqlDataReader rdr = cmd1.ExecuteReader();
                    while (rdr.Read())
                    {
                        CparsList cparsObject = new CparsList();
                        cparsObject.CONTRACT_NUMBER = rdr["CONTRACT_NUMBER"].ToString();
                        cparsObject.vendor_name = rdr["vendor_name"].ToString();
                        cparsObject.agency_name = rdr["agency_name"].ToString();
                        cparsObject.total_CPARS = Convert.ToInt32(rdr["total_CPARS"]);
                        cparsObject.Quality_Rating_Exceptional = rdr["Quality_Rating_Exceptional"].ToString();
                        cparsObject.Quality_Rating_VeryGood = rdr["Quality_Rating_VeryGood"].ToString();
                        cparsObject.Quality_Rating_Satisfactory = rdr["Quality_Rating_Satisfactory"].ToString();
                        cparsObject.Quality_Rating_Marginal = rdr["Quality_Rating_Marginal"].ToString();
                        cparsObject.Quality_Rating_UNSat = rdr["Quality_Rating_UNSat"].ToString();
                        cparsObject.Quality_Rating_NA = rdr["Quality_Rating_NA"].ToString();
                        cparsObject.Schedule_Rating_Exceptional = rdr["Schedule_Rating_Exceptional"].ToString();
                        cparsObject.Schedule_Rating_VeryGood = rdr["Schedule_Rating_VeryGood"].ToString();
                        cparsObject.Schedule_Rating_Satisfactory = rdr["Schedule_Rating_Satisfactory"].ToString();
                        cparsObject.Schedule_Rating_Marginal = rdr["Schedule_Rating_Marginal"].ToString();
                        cparsObject.Schedule_Rating_UNSat = rdr["Schedule_Rating_UNSat"].ToString();
                        cparsObject.Schedule_Rating_NA = rdr["Schedule_Rating_NA"].ToString();
                        cparsObject.Cost_Control_Rating_Exceptional = rdr["Cost_Control_Rating_Exceptional"].ToString();
                        cparsObject.Cost_Control_Rating_VeryGood = rdr["Cost_Control_Rating_VeryGood"].ToString();
                        cparsObject.Cost_Control_Rating_Satisfactory = rdr["Cost_Control_Rating_Satisfactory"].ToString();
                        cparsObject.Cost_Control_Rating_Marginal = rdr["Cost_Control_Rating_Marginal"].ToString();
                        cparsObject.Cost_Control_Rating_UNSat = rdr["Cost_Control_Rating_UNSat"].ToString();
                        cparsObject.Cost_Control_Rating_NA = rdr["Cost_Control_Rating_NA"].ToString();
                        cparsObject.Management_Rating_Exceptional = rdr["Management_Rating_Exceptional"].ToString();
                        cparsObject.Management_Rating_VeryGood = rdr["Management_Rating_VeryGood"].ToString();
                        cparsObject.Management_Rating_Satisfactory = rdr["Management_Rating_Satisfactory"].ToString();
                        cparsObject.Management_Rating_Marginal = rdr["Management_Rating_Marginal"].ToString();
                        cparsObject.Management_Rating_UNSat = rdr["Management_Rating_UNSat"].ToString();
                        cparsObject.Management_Rating_NA = rdr["Management_Rating_NA"].ToString();
                        cparsObject.Small_Business_Rating_Exceptional = rdr["Small_Business_Rating_Exceptional"].ToString();
                        cparsObject.Small_Business_Rating_VeryGood = rdr["Small_Business_Rating_VeryGood"].ToString();
                        cparsObject.Small_Business_Rating_Satisfactory = rdr["Small_Business_Rating_Satisfactory"].ToString();
                        cparsObject.Small_Business_Rating_Marginal = rdr["Small_Business_Rating_Marginal"].ToString();
                        cparsObject.Small_Business_Rating_UNSat = rdr["Small_Business_Rating_UNSat"].ToString();
                        cparsObject.Small_Business_Rating_NA = rdr["Small_Business_Rating_NA"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_Exceptional = rdr["Regulatory_Compliance_Rating_Exceptional"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_VeryGood = rdr["Regulatory_Compliance_Rating_VeryGood"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_Satisfactory = rdr["Regulatory_Compliance_Rating_Satisfactory"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_Marginal = rdr["Regulatory_Compliance_Rating_Marginal"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_UNSat = rdr["Regulatory_Compliance_Rating_UNSat"].ToString();
                        cparsObject.Regulatory_Compliance_Rating_NA = rdr["Regulatory_Compliance_Rating_NA"].ToString();
                        cparsList.Add(cparsObject);
                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }

            return new JavaScriptSerializer().Serialize(new { records = cparsList });

        }
    }
}