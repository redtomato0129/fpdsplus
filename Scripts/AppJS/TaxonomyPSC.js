$(document).ready(() => {

    if (!$("#scriptEleSocio").length) {
        let scriptEleSocio = document.createElement("script");
        scriptEleSocio.id = "scriptEleSocio";
        scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
        document.body.appendChild(scriptEleSocio);
        scriptEleSocio.onload = function () {
           // $(`#${obj.wizard_question_parameter_id}`).click();
        }
    }
    if (!$("#scriptElePsc").length) {
        let scriptElePsc = document.createElement("script");
        scriptElePsc.id = "scriptElePsc";
        scriptElePsc.setAttribute("src", "/Scripts/AppJS/QuestionParamsPSC.js");
        document.body.appendChild(scriptElePsc);
        scriptElePsc.onload = function () {
           // $(`#${obj.wizard_question_parameter_id}`).click();
        }
    }
    let subAgency = '';
    let fundingOffice = '';
  
            $("#funding-sub-agency-label").html('Agency Name')

            subAgency = ` 
						
					
                        <div class="col-lg-3"  fieldtype="funding-sub-agency">
                           <label for="basic-url">Agency Name</label>
						    <span style="color:red;">*</span>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenAgencyPopup " id="btnagencyrowclear" data-toggle="tooltip" 
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtagency" id="txtagency_2"  required/>
								<label id="lblagency_2" style="display:none;" class="lblagency lblclr"></label>
                           </div>
                        </div>
                   `
        
            $("#funding-office-label").html('Office Name')
            fundingOffice = `                  
                        <div class="col-lg-3" >
                           <label for="basic-url">Office Name</label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenOffcPopup" data-toggle="tooltip" id="btnofficerowclear"
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtoffice" id="txtoffice_2" required />
							  <label id="lbloffice_2" style="display:none;" class="lbloffice lblclr"></label>
                           </div>
                        </div>`
   
    $("#funding-agency-label").html('Department Name')
    let html = ` 
					
                        <div class="col-lg-3" >
                           <label for="basic-url">Department Name</label>
								 <span style="color:red;">*</span>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenDeptPopup btndeptrowclear" id="btndeptrowclear_2"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtdept" id="txtdept_2"  required="true"  />
								<label id="lbldept_2" style="display:none;" class="lbldept lblclr"></label>
                           </div>
                        </div>
                     
						   ${subAgency}
							${fundingOffice}
							`;
    $("#htmlRenderer").prepend(html)

    let htmlNaics = `
                        <div class="col-lg-3">
                           <label for="basic-url">NAICS Code</label>
                           <div class="input-group mb-3">
                              <input type="text" class="DIS_002 form-control NaicsCode dis_able1" id="txtnaicscode_2" onkeyup="clearPsc()" aria-describedby="basic-addon5"/>
                           </div>
                        </div>                    
                        <div class="col-lg-3">
                           <label for="basic-url">NAICS Description</label>
                           <div class="input-group mb-3">
                              
                              <input type="text" disabled class="form-control dis_able1" id="txtnaicsdesc_2" aria-describedby="basic-addon6">
                           </div>
                        </div>
                        `
    $("#htmlNaicsRenderer").append(htmlNaics)
    const pscHtml = ` 
                        <div class="col-lg-3">
                           <label for="basic-url">Product or Service Code</label>								
                           <div class="input-group mb-3">
                              <input type="text" class="DIS_002 form-control txtPsc" id="txt_Psc" onkeyup="clearNaics()" />
								<label id="lblPsc_2" style="display:none;" class="lblPsc lblclr"></label>
                           </div>
                        </div>
                        <div class="col-lg-3">
                           <label for="basic-url">Product or Service Description</label>
                           <div class="input-group mb-3">
                              <input type="text" disabled class="DIS_002 form-control txtPsc" id="txt_Psc_Desc" />
								<label id="lblPsc_2" style="display:none;" class="lblPsc lblclr"></label>
                           </div>
                        </div>
                     `
    $("#htmlNaicsRenderer").append(pscHtml)
})

function copyToClipboard() {
    var tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    swal.fire({
        title: "",
        text: "URL copied to clipboard!",
        type: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })
}

function clearPsc() {
    $('#txt_Psc').val('');
    $('#txt_Psc_Desc').val('');
    //$('#tableBodyNAICS').html("");
}

function clearNaics() {
    $('#txtnaicscode_2').val('');
    $('#txtnaicsdesc_2').val('');
    //$('#tableBodyPSC').html("");
}

function searchData() {
    $('#tableBodyNAICS').html("");
    $('#tableBodyPSC').html("");
    $('#naicsTable').hide();
    $('#pscTable').hide();
    let DepartmentCode = $('#lbldept_2').text();
    let AgencyCode = $('#lblagency_2').text();
    let OfficeCode = $('#lbloffice_2').text();
    let yearsVal = $('#yearsVal').val();
    let naicsVal = $('#txtnaicscode_2').val();
    let pscVal = $('#txt_Psc').val();
    console.log("DepartmentCode: ", DepartmentCode)
    console.log("AgencyCode: ", AgencyCode)
    console.log("OfficeCode: ", OfficeCode)
    console.log("yearsVal: ", yearsVal)
    console.log("naicsVal: ", naicsVal)
    console.log("pscVal: ", pscVal)
    if (DepartmentCode == "" || AgencyCode == "" || yearsVal == "") {
        swal.fire({
            title: "",
            text: "Input all required fields",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })      
    }
    else if (naicsVal == "" && pscVal == "")
    {
        swal.fire({
            title: "",
            text: "Input either NAICS or Product or Service Code",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
    }
    else
    {
        $.ajax({
            type: "POST",
            url: "/TaxonomyPSC/NaicsPscTaxonomy",
            data: { agency_code: DepartmentCode, sub_agency_code: AgencyCode, office_code: OfficeCode, naics_code: naicsVal, psc_code: pscVal, years: yearsVal },
            enctype: 'multipart/form-data',
            async: false,
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result && result.records.length > 0) {
                    const records = result.records;
                    //console.log(records);
                    if (records[0].naics_code) {
                        $('#naicsTable').show();
                        for (let b = 0; b < records.length; b++) {
                            let html = "";
                            html = html + `<tr style ='cursor:pointer;' onclick='searchNAICS("${records[b].naics_code}","${records[b].naics_description}")'>
                            <td>${b + 1}</td><td>${records[b].naics_code}</td><td>${records[b].naics_description}</td><td>${records[b].total_uses}</td></tr>`;
                            $("#tableBodyNAICS").append(html);
                        }
                    }
                    else if (records[0].product_or_service_code) {
                        $('#pscTable').show();
                        for (let b = 0; b < records.length; b++) {
                            let html = "";
                            html = html + `<tr style ='cursor:pointer;' onclick='searchPSC("${records[b].product_or_service_code}","${records[b].product_or_service_code_description}")'>
                            <td>${b + 1}</td><td>${records[b].product_or_service_code}</td><td>${records[b].product_or_service_code_description}</td><td>${records[b].total_uses}</td></tr>`;
                            $("#tableBodyPSC").append(html);
                        }
                    }
                    else {
                        $('#pscTable').show();
                        let html = `<tr><td colspan="4" style="text-align:center">No Data Found</td></tr>`;
                        $("#tableBodyPSC").append(html);
                    }
                }
                else {
                    $('#naicsTable').show();
                    let html = `<tr><td colspan="4" style="text-align:center">No Data Found</td></tr>`;
                    $("#tableBodyNAICS").append(html);
                                       
                }

            },
            error: function ajaxError(err) {
                console.log("Error")
            }
        });
    }
}

function searchPSC(pscVal, pscDesc) {
    console.log("PSC searched")
    clearNaics();
    $('#txt_Psc').val(pscVal);
    $('#txt_Psc_Desc').val(pscDesc);
    $('#tableBodyNAICS').html("");
    $('#tableBodyPSC').html("");
    $('#naicsTable').hide();
    $('#pscTable').hide();
    let DepartmentCode = $('#lbldept_2').text();
    let AgencyCode = $('#lblagency_2').text();
    let OfficeCode = $('#lbloffice_2').text();
    let yearsVal = $('#yearsVal').val();
    let naicsVal = $('#txtnaicscode_2').val();
    //let pscVal = $('#txt_Psc').val();
    console.log("DepartmentCode: ", DepartmentCode)
    console.log("AgencyCode: ", AgencyCode)
    console.log("OfficeCode: ", OfficeCode)
    console.log("yearsVal: ", yearsVal)
    console.log("naicsVal: ", naicsVal)
    console.log("pscVal: ", pscVal)
    if (DepartmentCode == "" || AgencyCode == "" || yearsVal == "") {
        swal.fire({
            title: "",
            text: "Input all required fields",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/TaxonomyPSC/NaicsPscTaxonomy",
            data: { agency_code: DepartmentCode, sub_agency_code: AgencyCode, office_code: OfficeCode, naics_code: naicsVal, psc_code: pscVal, years: yearsVal },
            enctype: 'multipart/form-data',
            async: false,
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result && result.records.length > 0) {
                    const records = result.records;
                    //console.log(records);
                    if (records[0].naics_code) {
                        $('#naicsTable').show();
                        for (let b = 0; b < records.length; b++) {
                            let html = "";
                            html = html + `<tr style ='cursor:pointer;' onclick='searchNAICS("${records[b].naics_code}","${records[b].naics_description}")'>
                            <td>${b + 1}</td><td>${records[b].naics_code}</td><td>${records[b].naics_description}</td><td>${records[b].total_uses}</td></tr>`;
                            $("#tableBodyNAICS").append(html);
                        }
                    }
                    else if (records[0].product_or_service_code) {
                        $('#pscTable').show();
                        for (let b = 0; b < records.length; b++) {
                            let html = "";
                            html = html + `<tr style ='cursor:pointer;' onclick='searchPSC("${records[b].product_or_service_code}","${records[b].product_or_service_code_description}")'>
                            <td>${b + 1}</td><td>${records[b].product_or_service_code}</td><td>${records[b].product_or_service_code_description}</td><td>${records[b].total_uses}</td></tr>`;
                            $("#tableBodyPSC").append(html);
                        }
                    }
                    else {
                        $('#naicsTable').show();
                        let html = `<tr><td colspan="4" style="text-align:center">No Data Found</td></tr>`;
                        $("#tableBodyNAICS").append(html);
                    }
                }
                else {
                    swal.fire({
                        title: "",
                        text: "Input either NAICS or Product or Service Code",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }

            },
            error: function ajaxError(err) {
                console.log("Error")
            }
        });
    }
}

function searchNAICS(naicsVal, naicsDesc) {
    console.log("NAICS searched")
    clearPsc();
    $('#txtnaicscode_2').val(naicsVal);
    $('#txtnaicsdesc_2').val(naicsDesc);
    $('#tableBodyNAICS').html("");
    $('#tableBodyPSC').html("");
    $('#naicsTable').hide();
    $('#pscTable').hide();
    let DepartmentCode = $('#lbldept_2').text();
    let AgencyCode = $('#lblagency_2').text();
    let OfficeCode = $('#lbloffice_2').text();
    let yearsVal = $('#yearsVal').val();
    //let naicsVal = $('#txtnaicscode_2').val();
    let pscVal = $('#txt_Psc').val();
    console.log("DepartmentCode: ", DepartmentCode)
    console.log("AgencyCode: ", AgencyCode)
    console.log("OfficeCode: ", OfficeCode)
    console.log("yearsVal: ", yearsVal)
    console.log("naicsVal: ", naicsVal)
    console.log("pscVal: ", pscVal)
    if (DepartmentCode == "" || AgencyCode == "" || yearsVal == "") {
        swal.fire({
            title: "",
            text: "Input all required fields",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/TaxonomyPSC/NaicsPscTaxonomy",
            data: { agency_code: DepartmentCode, sub_agency_code: AgencyCode, office_code: OfficeCode, naics_code: naicsVal, psc_code: pscVal, years: yearsVal },
            enctype: 'multipart/form-data',
            async: false,
            success: function (result) {
                result = jQuery.parseJSON(result);
                if (result && result.records.length > 0) {
                    const records = result.records;
                    //console.log(records);
                    if (records[0].naics_code) {
                        $('#naicsTable').show();
                        for (let b = 0; b < records.length; b++) {
                            let html = "";
                            html = html + `<tr style ='cursor:pointer;' onclick='searchNAICS("${records[b].naics_code}","${records[b].naics_description}")'>
                            <td>${b + 1}</td><td>${records[b].naics_code}</td><td>${records[b].naics_description}</td><td>${records[b].total_uses}</td></tr>`;
                            $("#tableBodyNAICS").append(html);
                        }
                    }
                    else if (records[0].product_or_service_code) {
                        $('#pscTable').show();
                        for (let b = 0; b < records.length; b++) {
                            let html = "";
                            html = html + `<tr style ='cursor:pointer;' onclick='searchPSC("${records[b].product_or_service_code}","${records[b].product_or_service_code_description}")'>
                            <td>${b + 1}</td><td>${records[b].product_or_service_code}</td><td>${records[b].product_or_service_code_description}</td><td>${records[b].total_uses}</td></tr>`;
                            $("#tableBodyPSC").append(html);
                        }
                    }
                    else {
                        $('#naicsTable').show();
                        let html = `<tr><td colspan="4" style="text-align:center">No Data Found</td></tr>`;
                        $("#tableBodyNAICS").append(html);
                    }
                }
                else {
                    swal.fire({
                        title: "",
                        text: "Input either NAICS or Product or Service Code",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }

            },
            error: function ajaxError(err) {
                console.log("Error")
            }
        });
    }
}
