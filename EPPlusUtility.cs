using FedPipelineApplication.Models;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using OfficeOpenXml.Table;
using OfficeOpenXml.Table.PivotTable;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Hosting;

namespace FedPipelineApplication
{
    public static class EPPlusUtility
    {
        public static void GenerateExcel(List<SearchReportModel> searchReportModels = null)
        {
            try
            {
                // Creating an instance
                // of ExcelPackage
                ExcelPackage excel = new ExcelPackage();

                // name of the sheet
                var workSheet = excel.Workbook.Worksheets.Add("FedPipeline");
                var pivotSheet = excel.Workbook.Worksheets.Add("Pivot");

                // setting the properties
                // of the work sheet 
                workSheet.TabColor = Color.Purple;
                workSheet.DefaultRowHeight = 15;
                //var pivotTableRange = pivotSheet.Cells["A1"].LoadFromCollection(searchReportModels.AsEnumerable());

                //Header Image
                #region Header Image
                Image img = Image.FromFile(@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\Content\assets\images\Fed\fedpipelogo.png");
                ExcelPicture pic = workSheet.Drawings.AddPicture("FedPipelinelogo", img);
                pic.SetPosition(0, 0, 0, 0);
                pic.AdjustPositionAndSize();
                #endregion

                //define the data range on the source sheet
                ExcelRangeBase dataRange = null;

                // Setting the properties
                // of the first row              

                // ws.Cells[Rowstart, ColStart, RowEnd, ColEnd]

                //Main Header
                #region Main Header Style
                workSheet.Cells[6, 1].Value = "Data Output";
                workSheet.Row(6).Height = 25;
                workSheet.Cells[6, 1, 6, 45].Style.Font.Color.SetColor(Color.White);
                workSheet.Cells[6, 1, 6, 45].Merge = true; //Merge columns start and end range
                workSheet.Cells[6, 1, 6, 45].Style.Font.Bold = true; //Font should be bold
                workSheet.Cells[6, 1, 6, 45].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left; // Alignment is center
                workSheet.Cells[6, 1, 6, 45].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                workSheet.Cells[6, 1, 6, 45].Style.Font.Size = 16;
                workSheet.Cells[6, 1, 6, 45].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells[6, 1, 6, 45].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 0, 164, 16));
                #endregion

                #region Data Column Style
                workSheet.Row(7).Height = 22;
                workSheet.DefaultColWidth = 30;
                workSheet.Cells[7, 1, 7, 45].Style.Font.Color.SetColor(Color.White);
                workSheet.Cells[7, 1, 7, 45].Style.Font.Bold = true; //Font should be bold
                workSheet.Cells[7, 1, 7, 45].AutoFilter = true;
                workSheet.Cells[7, 1, 7, 45].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // Alignment is center
                workSheet.Cells[7, 1, 7, 45].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                workSheet.Cells[7, 1, 7, 45].Style.Font.SetFromFont(new Font("Segoe UI", 8));
                workSheet.Cells[7, 1, 7, 45].Style.Font.Size = 8;
                workSheet.Cells[7, 1, 7, 45].Style.Fill.PatternType = ExcelFillStyle.Solid;
                workSheet.Cells[7, 1, 7, 45].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 87, 28, 122));
                workSheet.Cells[7, 4].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 58, 56, 56));
                workSheet.Cells[7, 5].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 51, 63, 79));
                workSheet.Cells[7, 6].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 197, 90, 17));
                workSheet.Cells[7, 7, 7, 9].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 123, 123, 123));
                workSheet.Cells[7, 21].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0, 84, 129, 53));
                #endregion

                #region Header Section
                //header columns
                workSheet.Cells[7, 1].Value = "Award ID";
                workSheet.Cells[7, 2].Value = "Reference IDV ID";
                workSheet.Cells[7, 3].Value = "Solicitation ID";
                workSheet.Cells[7, 4].Value = "Funding Agency Name";
                workSheet.Cells[7, 5].Value = "Funding Sub Agency Name";
                workSheet.Cells[7, 6].Value = "Funding Office Name";
                workSheet.Cells[7, 7].Value = "Awarding Agency Name";
                workSheet.Cells[7, 8].Value = "Awarding Sub Agency Name";
                workSheet.Cells[7, 9].Value = "Awarding Office Name";
                workSheet.Cells[7, 10].Value = "Award Type";
                workSheet.Cells[7, 11].Value = "Contract Pricing";
                workSheet.Cells[7, 12].Value = "Solicitation Date";
                workSheet.Cells[7, 13].Value = "Date Signed";
                workSheet.Cells[7, 14].Value = "Date Signed (FY)";
                workSheet.Cells[7, 15].Value = "Start Date";
                workSheet.Cells[7, 16].Value = "Completion Date";
                workSheet.Cells[7, 17].Value = "Est. Ultimate Completion Date";
                workSheet.Cells[7, 18].Value = "Contract Duration (MO)";
                workSheet.Cells[7, 19].Value = "Base and All Options Value";
                workSheet.Cells[7, 20].Value = "Base and All Options Value / 1000";
                workSheet.Cells[7, 21].Value = "Vendor Name";
                workSheet.Cells[7, 22].Value = "Duns";
                workSheet.Cells[7, 23].Value = "Cage";
                workSheet.Cells[7, 24].Value = "Still Small for NAICS Code";
                workSheet.Cells[7, 25].Value = "Vendor 8A Program Status";
                workSheet.Cells[7, 26].Value = "GSA Contract";
                workSheet.Cells[7, 27].Value = "Major Program";
                workSheet.Cells[7, 28].Value = "Principal Place of Performance";
                workSheet.Cells[7, 29].Value = "Product or Service Code";
                workSheet.Cells[7, 30].Value = "PSC Description";
                workSheet.Cells[7, 31].Value = "NAICS code";
                workSheet.Cells[7, 32].Value = "NAICS Description";
                workSheet.Cells[7, 33].Value = "Requirement Description";
                workSheet.Cells[7, 34].Value = "Extent Competed";
                workSheet.Cells[7, 35].Value = "Solicitation Procedures";
                workSheet.Cells[7, 36].Value = "SB Award";
                workSheet.Cells[7, 37].Value = "Type of Set Aside";
                workSheet.Cells[7, 38].Value = "Posted to FedBizOpps";
                workSheet.Cells[7, 39].Value = "# of Offers Received";
                workSheet.Cells[7, 40].Value = "Simplified Procedures for Certain Commercial Items";
                workSheet.Cells[7, 41].Value = "Contracting Officer's Business Size Determination";
                workSheet.Cells[7, 42].Value = "Contract URL (USAspending.gov)";
                workSheet.Cells[7, 43].Value = "Opportunity Link (Beta.sam.gov)";
                workSheet.Cells[7, 44].Value = "Award/IDV";
                workSheet.Cells[7, 45].Value = "Multiple / Single Award";
                #endregion


                //workSheet.Cells[9,"A1:A3"].Style.Fill.BackgroundColor.SetColor(System.Drawing.ColorTranslator.FromHtml("#f0f3f5"));

                #region Fill Excel Data
                // Inserting the article data into excel
                // sheet by using the for each loop
                // As we have values to the first row 
                // we will start with second row
                int recordIndex = 8;

                if (searchReportModels != null)
                {
                    foreach (var contractSearchData in searchReportModels)
                    {
                        workSheet.Cells[recordIndex, 1].Value = contractSearchData.Award_id;
                        workSheet.Cells[recordIndex, 2].Value = contractSearchData.Referenced_idv_id;
                        workSheet.Cells[recordIndex, 3].Value = contractSearchData.Solicitation_identifier;
                        workSheet.Cells[recordIndex, 4].Value = contractSearchData.Funding_agency_name;
                        workSheet.Cells[recordIndex, 5].Value = contractSearchData.Funding_sub_agency_name;
                        workSheet.Cells[recordIndex, 6].Value = contractSearchData.Funding_office_name;
                        workSheet.Cells[recordIndex, 7].Value = contractSearchData.Awarding_agency_name;
                        workSheet.Cells[recordIndex, 8].Value = contractSearchData.Awarding_sub_agency_name;
                        workSheet.Cells[recordIndex, 9].Value = contractSearchData.Awarding_office_name;
                        workSheet.Cells[recordIndex, 10].Value = contractSearchData.Award_type;
                        workSheet.Cells[recordIndex, 11].Value = contractSearchData.Type_of_contract_pricing;
                        workSheet.Cells[recordIndex, 12].Value = contractSearchData.Solicitation_date;
                        workSheet.Cells[recordIndex, 13].Value = contractSearchData.Action_date;
                        workSheet.Cells[recordIndex, 14].Value = contractSearchData.Action_date_fiscal_year;
                        workSheet.Cells[recordIndex, 15].Value = contractSearchData.Period_of_performance_start_date;
                        workSheet.Cells[recordIndex, 16].Value = contractSearchData.Period_of_performance_current_end_date;
                        workSheet.Cells[recordIndex, 17].Value = contractSearchData.Period_of_performance_potential_end_date;
                        workSheet.Cells[recordIndex, 18].Value = contractSearchData.Contract_Duration;
                        workSheet.Cells[recordIndex, 19].Value = contractSearchData.Base_and_all_options_value;
                        workSheet.Cells[recordIndex, 20].Value = contractSearchData.Base_options_k;
                        workSheet.Cells[recordIndex, 21].Value = contractSearchData.Vendor_name;
                        workSheet.Cells[recordIndex, 22].Value = contractSearchData.DUNS;
                        workSheet.Cells[recordIndex, 23].Value = contractSearchData.Cage;
                        workSheet.Cells[recordIndex, 24].Value = contractSearchData.SBI;
                        workSheet.Cells[recordIndex, 25].Value = contractSearchData.Contract_is_8a_program_vendor_still_8a_status;
                        workSheet.Cells[recordIndex, 26].Value = contractSearchData.ContractType;
                        workSheet.Cells[recordIndex, 27].Value = contractSearchData.Major_program;
                        workSheet.Cells[recordIndex, 28].Value = contractSearchData.Primary_place_of_performance_state_code;
                        workSheet.Cells[recordIndex, 29].Value = contractSearchData.Product_or_service_code;
                        workSheet.Cells[recordIndex, 30].Value = contractSearchData.Product_or_service_code_description;
                        workSheet.Cells[recordIndex, 31].Value = contractSearchData.Naics_code;
                        workSheet.Cells[recordIndex, 32].Value = contractSearchData.Naics_description;
                        workSheet.Cells[recordIndex, 33].Value = contractSearchData.Award_description;
                        workSheet.Cells[recordIndex, 34].Value = contractSearchData.Extent_competed;
                        workSheet.Cells[recordIndex, 35].Value = contractSearchData.Solicitation_procedures;
                        workSheet.Cells[recordIndex, 36].Value = contractSearchData.SB_Award;
                        workSheet.Cells[recordIndex, 37].Value = contractSearchData.Type_of_set_aside;
                        workSheet.Cells[recordIndex, 38].Value = contractSearchData.Fed_biz_opps;
                        workSheet.Cells[recordIndex, 39].Value = contractSearchData.Number_of_offers_received;
                        workSheet.Cells[recordIndex, 40].Value = contractSearchData.Simplified_procedures_for_certain_commercial_items;
                        workSheet.Cells[recordIndex, 41].Value = contractSearchData.BusinessSize;
                        workSheet.Cells[recordIndex, 42].Value = contractSearchData.Contract_URL;
                        workSheet.Cells[recordIndex, 43].Value = contractSearchData.OpportunityWebLink;
                        workSheet.Cells[recordIndex, 44].Value = contractSearchData.Award_or_idv_flag;
                        workSheet.Cells[recordIndex, 45].Value = contractSearchData.Multiple_or_single_award_idv;
                        recordIndex++;
                    }

                    dataRange = workSheet.Cells["A8"].LoadFromCollection(searchReportModels.AsEnumerable());
                }
                #endregion

                // By default, the column width is not 
                // set to auto fit for the content
                // of the range, so we are using
                // AutoFit() method here. 
                workSheet.Cells.AutoFitColumns();
                //workSheet.Column(1).AutoFit();

                #region Pivot Table Region
                if (dataRange != null)
                {
                    //create the pivot table
                    var pivotTable = pivotSheet.PivotTables.Add(pivotSheet.Cells["A1"], dataRange, "PivotTable");
                    ExcelTable excelTable = workSheet.Tables["tblData"];

                    // headers
                    pivotTable.ShowHeaders = true;
                    pivotTable.RowHeaderCaption = "Award ID";

                    // grand total
                    pivotTable.ColumnGrandTotals = true;
                    pivotTable.GrandTotalCaption = "Total";

                    //label field
                    pivotTable.RowFields.Add(pivotTable.Fields["Award ID"]);
                    pivotTable.DataOnRows = false;

                    //data fields
                    var field = pivotTable.DataFields.Add(pivotTable.Fields["Award ID"]);
                    field.Name = "Count of Column Award ID";
                    field.Function = DataFieldFunctions.Count;

                    //field = pivotTable.DataFields.Add(pivotTable.Fields["A3"]);
                    //field.Name = "Sum of Column C";
                    //field.Function = DataFieldFunctions.Sum;
                    //field.Format = "0.00";

                    //field = pivotTable.DataFields.Add(pivotTable.Fields["A4"]);
                    //field.Name = "Sum of Column D";
                    //field.Function = DataFieldFunctions.Sum;
                    //field.Format = "€#,##0.00";
                }
                #endregion

                // file name with .xlsx extension 
                string p_strPath = @"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\EPResult.xlsx";

                if (File.Exists(p_strPath))
                    File.Delete(p_strPath);

                // Create excel file on physical disk 
                FileStream objFileStrm = File.Create(p_strPath);
                objFileStrm.Close();

                // Write content to excel file 
                File.WriteAllBytes(p_strPath, excel.GetAsByteArray());
                //Close Excel package
                excel.Dispose();
            }
#pragma warning disable CS0168 // Variable is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // Variable is declared but never used
            {

            }
        }

        public static string ExportExcel()
        {
            try
            {
                var existingFile = new FileInfo(HostingEnvironment.MapPath("~/EPPlusExcels/ContractSearch/Template/Template.xlsx"));// +  new FileInfo(@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\Template.xlsx");
                var resultFile = HostingEnvironment.MapPath("~/EPPlusExcels/ContractSearch/EPIResult_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx"); //@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\EPIResult.xlsx";

                ExcelPackage excel = new ExcelPackage(new FileInfo(resultFile), existingFile);

                List<SearchReportModel> searchReportModels = new List<SearchReportModel>();
                SearchReportModel searchReportModel = new SearchReportModel
                {
                    Award_id = "692M1518F00383",
                    Referenced_idv_id = "DTFAWA11D00057",
                    Solicitation_identifier = "",
                    Funding_agency_name = "DEPARTMENT OF TRANSPORTATION (DOT)",
                    Funding_sub_agency_name = "FEDERAL AVIATION ADMINISTRATION",
                    Funding_office_name = "FAA",
                    Awarding_agency_name = "DEPARTMENT OF TRANSPORTATION (DOT)",
                    Awarding_sub_agency_name = "FEDERAL AVIATION ADMINISTRATION",
                    Awarding_office_name = "FAA",
                    Award_type = "DELIVERY ORDER",
                    Type_of_contract_pricing = "FIRM FIXED PRICE",
                    Solicitation_date = "",
                    Action_date = "Jul 19 2018",
                    Action_date_fiscal_year = "2018",
                    Period_of_performance_start_date = "2018-07-19 ",
                    Period_of_performance_current_end_date = "2018-08-18",
                    Period_of_performance_potential_end_date = "2018-08-18",
                    Contract_Duration = "1",
                    Base_and_all_options_value = "79933.6600",
                    Base_options_k = "79.9336",
                    Vendor_name = "CDW GOVERNMENT LLC",
                    DUNS = "026157235",
                    Cage = "",
                    SBI = "",
                    Contract_is_8a_program_vendor_still_8a_status = "",
                    ContractType = "",
                    Major_program = "SAVES IT HARDWARE PERSONAL COMPUTING DEVICES",
                    Primary_place_of_performance_state_code = "OK",
                    Product_or_service_code = "",
                    Product_or_service_code_description = "",
                    Naics_code = "",
                    Naics_description = "",
                    Award_description = "",
                    Extent_competed = "",
                    Solicitation_procedures = "",
                    SB_Award = "",
                    Type_of_set_aside = "",
                    Fed_biz_opps = "",
                    Number_of_offers_received = "",
                    Simplified_procedures_for_certain_commercial_items = "",
                    BusinessSize = "",
                    Contract_URL = "",
                    OpportunityWebLink = "",
                    Award_or_idv_flag = "AWARD",
                    Multiple_or_single_award_idv = ""
                };
                for (var i = 0; i < 8; i++)
                {
                    searchReportModels.Add(searchReportModel);
                }

                ExcelWorksheet fedPipelinesheet = excel.Workbook.Worksheets["FedPipeline"];

                fedPipelinesheet.InsertRow(8, (searchReportModels.Count - 1));

                for (int rowCount = 8; rowCount < searchReportModels.Count + 8; rowCount++)
                {
                    SearchReportModel searchData = searchReportModels[rowCount - 8];
                    fedPipelinesheet.Cells[rowCount, 1].Value = searchData.Award_id;
                    fedPipelinesheet.Cells[rowCount, 2].Value = searchData.Referenced_idv_id;
                    fedPipelinesheet.Cells[rowCount, 3].Value = searchData.Solicitation_identifier;
                    fedPipelinesheet.Cells[rowCount, 4].Value = searchData.Funding_agency_code;
                    fedPipelinesheet.Cells[rowCount, 5].Value = searchData.Funding_agency_name;
                    fedPipelinesheet.Cells[rowCount, 6].Value = searchData.Funding_sub_agency_code;
                    fedPipelinesheet.Cells[rowCount, 7].Value = searchData.Funding_sub_agency_name;
                    fedPipelinesheet.Cells[rowCount, 8].Value = searchData.Funding_office_code;
                    fedPipelinesheet.Cells[rowCount, 9].Value = searchData.Funding_office_name;
                    fedPipelinesheet.Cells[rowCount, 10].Value = searchData.Awarding_agency_code;
                    fedPipelinesheet.Cells[rowCount, 11].Value = searchData.Awarding_agency_name;
                    fedPipelinesheet.Cells[rowCount, 12].Value = searchData.Awarding_sub_agency_code;
                    fedPipelinesheet.Cells[rowCount, 13].Value = searchData.Awarding_sub_agency_name;
                    fedPipelinesheet.Cells[rowCount, 14].Value = searchData.Awarding_office_code;
                    fedPipelinesheet.Cells[rowCount, 15].Value = searchData.Awarding_office_name;
                    fedPipelinesheet.Cells[rowCount, 16].Value = searchData.Award_type;
                    fedPipelinesheet.Cells[rowCount, 17].Value = searchData.Type_of_contract_pricing;
                    fedPipelinesheet.Cells[rowCount, 18].Value = searchData.Solicitation_date;
                    fedPipelinesheet.Cells[rowCount, 19].Value = searchData.Action_date;
                    fedPipelinesheet.Cells[rowCount, 20].Value = searchData.Action_date_fiscal_year;
                    fedPipelinesheet.Cells[rowCount, 21].Value = searchData.Period_of_performance_start_date;
                    fedPipelinesheet.Cells[rowCount, 22].Value = searchData.Period_of_performance_current_end_date;
                    fedPipelinesheet.Cells[rowCount, 23].Value = searchData.Period_of_performance_potential_end_date;
                    fedPipelinesheet.Cells[rowCount, 24].Value = searchData.Contract_Duration;
                    fedPipelinesheet.Cells[rowCount, 25].Value = string.IsNullOrEmpty(searchData.Base_and_all_options_value) ? 0.00 : Convert.ToDouble(searchData.Base_and_all_options_value);
                    fedPipelinesheet.Cells[rowCount, 25].Style.Numberformat.Format = "#,##0.0000";
                    fedPipelinesheet.Cells[rowCount, 26].Value = string.IsNullOrEmpty(searchData.Base_options_k) ? 0.00 : Convert.ToDouble(searchData.Base_options_k);
                    fedPipelinesheet.Cells[rowCount, 26].Style.Numberformat.Format = "#,##0.0000";
                    fedPipelinesheet.Cells[rowCount, 27].Value = searchData.Vendor_name;
                    fedPipelinesheet.Cells[rowCount, 28].Value = searchData.Vendor_link;
                    fedPipelinesheet.Cells[rowCount, 29].Value = searchData.Cage;
                    fedPipelinesheet.Cells[rowCount, 30].Value = searchData.SBI;
                    fedPipelinesheet.Cells[rowCount, 31].Value = searchData.Contract_is_8a_program_vendor_still_8a_status;
                    fedPipelinesheet.Cells[rowCount, 32].Value = searchData.ContractType;
                    fedPipelinesheet.Cells[rowCount, 33].Value = searchData.Major_program;
                    fedPipelinesheet.Cells[rowCount, 34].Value = searchData.Primary_place_of_performance_state_code;
                    fedPipelinesheet.Cells[rowCount, 35].Value = searchData.Product_or_service_code;
                    fedPipelinesheet.Cells[rowCount, 36].Value = searchData.Product_or_service_code_description;
                    fedPipelinesheet.Cells[rowCount, 37].Value = searchData.Naics_code;
                    fedPipelinesheet.Cells[rowCount, 38].Value = searchData.Naics_description;
                    fedPipelinesheet.Cells[rowCount, 39].Value = searchData.Award_description;
                    fedPipelinesheet.Cells[rowCount, 40].Value = searchData.Extent_competed;
                    fedPipelinesheet.Cells[rowCount, 41].Value = searchData.Solicitation_procedures;
                    fedPipelinesheet.Cells[rowCount, 42].Value = searchData.SB_Award;
                    fedPipelinesheet.Cells[rowCount, 43].Value = searchData.Type_of_set_aside;
                    fedPipelinesheet.Cells[rowCount, 44].Value = searchData.Fed_biz_opps;
                    fedPipelinesheet.Cells[rowCount, 45].Value = searchData.Number_of_offers_received;
                    fedPipelinesheet.Cells[rowCount, 46].Value = searchData.Simplified_procedures_for_certain_commercial_items;
                    fedPipelinesheet.Cells[rowCount, 47].Value = searchData.BusinessSize;
                    fedPipelinesheet.Cells[rowCount, 48].Value = searchData.Contract_URL;
                    fedPipelinesheet.Cells[rowCount, 49].Value = searchData.OpportunityWebLink;
                    fedPipelinesheet.Cells[rowCount, 50].Value = searchData.Award_or_idv_flag;
                    fedPipelinesheet.Cells[rowCount, 51].Value = searchData.Multiple_or_single_award_idv;
                    fedPipelinesheet.Cells[rowCount, 52].Value = searchData.fpds_program;
                }


                //ExcelWorksheet pivotsheet = excel.Workbook.Worksheets["Pivot"];

                //ExcelPivotTable excelPivotTable = pivotsheet.PivotTables[0];//pivotsheet.PivotTables["PivotTable1"];
                //var awardRow = excelPivotTable.Fields["Award/IDV"];
                //awardRow.Items.Where(s => (string)s.Value == "AWARD").Select(z => z.Value);
                //awardRow.Items.Refresh();

                //package.Save();
                // file name with .xlsx extension 
                //string p_strPath = @"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\EPIResult.xlsx";

                if (File.Exists(resultFile))
                    File.Delete(resultFile);

                // Create excel file on physical disk 
                FileStream excelFileStrm = File.Create(resultFile);
                excelFileStrm.Close();

                // Write content to excel file 
                File.WriteAllBytes(resultFile, excel.GetAsByteArray());
                //Close Excel package
                excel.Dispose();

                return resultFile;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string ExportToExcel(List<SearchReportModel> searchReportModels)
        {
            try
            {
                var existingFile = new FileInfo(HostingEnvironment.MapPath("~/EPPlusExcels/ContractSearch/Template/Template.xlsx"));// +  new FileInfo(@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\Template.xlsx");
                var resultFile = HostingEnvironment.MapPath("~/EPPlusExcels/ContractSearch/EPIResult_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx"); //@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\EPIResult.xlsx";

                using (ExcelPackage excel = new ExcelPackage(new FileInfo(resultFile), existingFile))
                {
                    ExcelWorksheet fedPipelinesheet = excel.Workbook.Worksheets["FedPipeline"];

                    fedPipelinesheet.InsertRow(8, (searchReportModels.Count - 1));

                    for (int rowCount = 8; rowCount < searchReportModels.Count + 8; rowCount++)
                    {
                        SearchReportModel searchData = searchReportModels[rowCount - 8];
                        fedPipelinesheet.Cells[rowCount, 1].Value = searchData.Award_id;
                        fedPipelinesheet.Cells[rowCount, 2].Value = searchData.Referenced_idv_id;
                        fedPipelinesheet.Cells[rowCount, 3].Value = searchData.Solicitation_identifier;
                        fedPipelinesheet.Cells[rowCount, 4].Value = searchData.Funding_agency_code;
                        fedPipelinesheet.Cells[rowCount, 5].Value = searchData.Funding_agency_name;
                        fedPipelinesheet.Cells[rowCount, 6].Value = searchData.Funding_sub_agency_code;
                        fedPipelinesheet.Cells[rowCount, 7].Value = searchData.Funding_sub_agency_name;
                        fedPipelinesheet.Cells[rowCount, 8].Value = searchData.Funding_office_code;
                        fedPipelinesheet.Cells[rowCount, 9].Value = searchData.Funding_office_name;
                        fedPipelinesheet.Cells[rowCount, 10].Value = searchData.Awarding_agency_code;
                        fedPipelinesheet.Cells[rowCount, 11].Value = searchData.Awarding_agency_name;
                        fedPipelinesheet.Cells[rowCount, 12].Value = searchData.Awarding_sub_agency_code;
                        fedPipelinesheet.Cells[rowCount, 13].Value = searchData.Awarding_sub_agency_name;
                        fedPipelinesheet.Cells[rowCount, 14].Value = searchData.Awarding_office_code;
                        fedPipelinesheet.Cells[rowCount, 15].Value = searchData.Awarding_office_name;
                        fedPipelinesheet.Cells[rowCount, 16].Value = searchData.Award_type;
                        fedPipelinesheet.Cells[rowCount, 17].Value = searchData.Type_of_contract_pricing;
                        fedPipelinesheet.Cells[rowCount, 18].Value = searchData.Solicitation_date;
                        fedPipelinesheet.Cells[rowCount, 19].Value = searchData.Action_date;
                        fedPipelinesheet.Cells[rowCount, 20].Value = searchData.Action_date_fiscal_year;
                        fedPipelinesheet.Cells[rowCount, 21].Value = searchData.Period_of_performance_start_date;
                        fedPipelinesheet.Cells[rowCount, 22].Value = searchData.Period_of_performance_current_end_date;
                        fedPipelinesheet.Cells[rowCount, 23].Value = searchData.Period_of_performance_potential_end_date;
                        fedPipelinesheet.Cells[rowCount, 24].Value = searchData.Contract_Duration;
                        fedPipelinesheet.Cells[rowCount, 25].Value = string.IsNullOrEmpty(searchData.Base_and_all_options_value) ? 0.00 : Convert.ToDouble(searchData.Base_and_all_options_value);
                        fedPipelinesheet.Cells[rowCount, 25].Style.Numberformat.Format = "#,##0.0000";
                        fedPipelinesheet.Cells[rowCount, 26].Value = string.IsNullOrEmpty(searchData.Base_options_k) ? 0.00 : Convert.ToDouble(searchData.Base_options_k);
                        fedPipelinesheet.Cells[rowCount, 26].Style.Numberformat.Format = "#,##0.0000";
                        fedPipelinesheet.Cells[rowCount, 27].Value = searchData.Vendor_name;
                        fedPipelinesheet.Cells[rowCount, 28].Value = searchData.Vendor_link;
                        fedPipelinesheet.Cells[rowCount, 29].Value = searchData.Cage;
                        fedPipelinesheet.Cells[rowCount, 30].Value = searchData.SBI;
                        fedPipelinesheet.Cells[rowCount, 31].Value = searchData.Contract_is_8a_program_vendor_still_8a_status;
                        fedPipelinesheet.Cells[rowCount, 32].Value = searchData.ContractType;
                        fedPipelinesheet.Cells[rowCount, 33].Value = searchData.Major_program;
                        fedPipelinesheet.Cells[rowCount, 34].Value = searchData.Primary_place_of_performance_state_code;
                        fedPipelinesheet.Cells[rowCount, 35].Value = searchData.Product_or_service_code;
                        fedPipelinesheet.Cells[rowCount, 36].Value = searchData.Product_or_service_code_description;
                        fedPipelinesheet.Cells[rowCount, 37].Value = searchData.Naics_code;
                        fedPipelinesheet.Cells[rowCount, 38].Value = searchData.Naics_description;
                        fedPipelinesheet.Cells[rowCount, 39].Value = searchData.Award_description;
                        fedPipelinesheet.Cells[rowCount, 40].Value = searchData.Extent_competed;
                        fedPipelinesheet.Cells[rowCount, 41].Value = searchData.Solicitation_procedures;
                        fedPipelinesheet.Cells[rowCount, 42].Value = searchData.SB_Award;
                        fedPipelinesheet.Cells[rowCount, 43].Value = searchData.Type_of_set_aside;
                        fedPipelinesheet.Cells[rowCount, 44].Value = searchData.Fed_biz_opps;
                        fedPipelinesheet.Cells[rowCount, 45].Value = searchData.Number_of_offers_received;
                        fedPipelinesheet.Cells[rowCount, 46].Value = searchData.Simplified_procedures_for_certain_commercial_items;
                        fedPipelinesheet.Cells[rowCount, 47].Value = searchData.BusinessSize;
                        fedPipelinesheet.Cells[rowCount, 48].Value = searchData.Contract_URL;
                        fedPipelinesheet.Cells[rowCount, 49].Value = searchData.OpportunityWebLink;
                        fedPipelinesheet.Cells[rowCount, 50].Value = searchData.Award_or_idv_flag;
                        fedPipelinesheet.Cells[rowCount, 51].Value = searchData.Multiple_or_single_award_idv;
                        fedPipelinesheet.Cells[rowCount, 52].Value = searchData.fpds_program;
                    }


                    //ExcelWorksheet pivotsheet = excel.Workbook.Worksheets["Pivot"];

                    //ExcelPivotTable excelPivotTable = pivotsheet.PivotTables[0];//pivotsheet.PivotTables["PivotTable1"];
                    //var awardRow = excelPivotTable.Fields["Award/IDV"];
                    //awardRow.Items.Where(s => (string)s.Value == "AWARD").Select(z => z.Value);
                    //awardRow.Items.Refresh();

                    //package.Save();
                    // file name with .xlsx extension 

                    if (File.Exists(resultFile))
                        File.Delete(resultFile);

                    // Create excel file on physical disk 
                    FileStream excelFileStrm = File.Create(resultFile);
                    excelFileStrm.Close();

                    // Write content to excel file 
                    File.WriteAllBytes(resultFile, excel.GetAsByteArray());
                    //Close Excel package
                    excel.Dispose();

                    return resultFile;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //public static void MakeExcel()
        //{
        //    try
        //    {
        //        ExcelPackage ExcelPkg = new ExcelPackage();
        //        ExcelWorksheet wsSheet1 = ExcelPkg.Workbook.Worksheets.Add("Sheet1");
        //        using (ExcelRange Rng = wsSheet1.Cells[2, 2, 2, 2])
        //        {
        //            Rng.Value = "Welcome to Everyday be coding - tutorials for beginners";
        //            //Rng.Merge = true;  
        //            Rng.Style.Font.Size = 16;
        //            Rng.Style.Font.Bold = true;
        //            Rng.Style.Font.Italic = true;
        //        }
        //        //int rowIndex = 0;
        //        //int colIndex = 0;
        //        //int PixelTop = 88;
        //        //int PixelLeft = 129;
        //        //int Height = 102;
        //        //int Width = 248;
        //        Image img = Image.FromFile(@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\Content\assets\images\Fed\fedpipelogo.png");
        //        ExcelPicture pic = wsSheet1.Drawings.AddPicture("FedPipelinelogo", img);
        //        pic.SetPosition(0, 0, 0, 0);
        //        //pic.SetPosition(PixelTop, PixelLeft);  
        //        pic.AdjustPositionAndSize();// SetSize(Height, Width);
        //        //pic.SetSize(40);  
        //        wsSheet1.Column(1).AutoFit();
        //        wsSheet1.Protection.IsProtected = false;
        //        wsSheet1.Protection.AllowSelectLockedCells = false;
        //        ExcelPkg.SaveAs(new FileInfo(@"C:\Users\techbrain\Documents\FedPipeline\latest copy\FedPipelineApplication\EPResult.xlsx"));
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //}
    }
}