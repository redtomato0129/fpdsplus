$(document).ready(() => {
    getDept();
    
    $(document).on('focus', '.txtdept', function () {

        var getId = (this.id);
        var splitid = getId.split('_');
        var id = parseInt(splitid[1]);
        $(".txtdept").addClass('ui-autocomplete-loading');

        //Complaints Auto Complete
        $(".txtdept").autocomplete({
            source: DeptCombo[0],
            select: function (event, ui) {

                $('#txtdept_' + id).val(ui.item.value);
                //lbldept_1
                //$('#lbldept_1').text(ui.item.id);
                $('#lbldept_' + id).text(ui.item.id);
                //alert($("#lbldept_1").text());
                var depcod = ui.item.id;//gets the select value from autocomplete
                //alert($(this).parent().find('label').text());
                
                getAgency(depcod);
            }
        });
    });
})
const DeptCombo = []

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

function getDept() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetDepartmentList",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                DeptCombo.push(result);
            }
            else {
                swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}
let department = "";
let agency = "";
function getAgency(DepartmentCode) {
    //Agencycombo = [];
    $.ajax({
        type: "POST",
        url: "/Taxonomy/GetAgencyListSearch",
        //data: "{'Agencycode': '" + DepartmentCode + "'}",
        //dataType: "json",
        data: { funding_agency_code:DepartmentCode, search_text:'All' },
        enctype: 'multipart/form-data',
        async: false,
        success: function (result) {
            department = DepartmentCode;
            result = jQuery.parseJSON(result);
          
            if (result && result.records.length > 0) {
                const records = result.records;
                $('#searchOfficeInput').val("");
                $("#agency_records").html("");
                $("#office_records").html("");
                $("#tableBodyAgency").html("");
                for (let b = 0; b < records.length; b++) {
                    let html = "";
                    $("#agency_records").html(`Showing ${records[0].total_records} Agencies`)
                    html = html + `<tr style ='cursor:pointer;' onclick='getOffice("${records[b].funding_agency_code}");'><td>${b + 1}</td><td>${records[b].funding_agency_name}</td></tr>`;
                    $("#tableBodyAgency").append(html);
                }
            }
            else {
                $("#agency_records").html(`No Agency Found`)
                $("#tableBodyAgency").html("");
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyAgency").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")

        }
    });
}

function getOffice(Agencycode) {
    //Officecombo = [];
    $.ajax({
        type: "POST",
     /*   url: "/Search/GetOfficeList",
        data: "{'Agencycode': '" + Agencycode + "'}",
        dataType: "json",*/
        data: { agency_code:Agencycode, search_text:'' },
        enctype: 'multipart/form-data',
        url: "/Taxonomy/GetOfficeListSearch",
        async: false,
        success: function (result) {
            agency = Agencycode;
            result = jQuery.parseJSON(result);
            if (result && result.records.length > 0) {
                const records = result.records;
                $("#office_records").html("");
                $("#tableBodyOffice").html("");
                for (let b = 0; b < records.length; b++) {
                    $("#office_records").html(`Showing ${records[0].total_records} Offices`)
                    let html = "";
                    html = html + `<tr><td>${b + 1}</td><td>${records[b].office_name}</td></tr>`;
                    $("#tableBodyOffice").append(html);
                }
            }
            else {
                $("#office_records").html(`No Office Found`)
                $("#tableBodyOffice").html("");
                let html = `<tr><td colspan = "2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyOffice").append(html);
            }

        },
        error: function ajaxError(err) {
            console.log("Error")

        }
    });
}

function searchAgency(event) {
    if (document.getElementById("lbldept_2").innerHTML) {
        $("#tableBodyOffice").html("");
        let searchKeyword = event.currentTarget.value;
        //console.log("----", department)
        if (searchKeyword.length > 2) {
            showSearchedAgency(department, searchKeyword);
        } else if (searchKeyword.length == 0) {
            showSearchedAgency(department,"");
        }
    }
}
function searchOffice(event) {
    let searchKeyword = event.currentTarget.value;
    console.log("----", agency)
    if (searchKeyword.length > 2) {
        showSearchedOffice(agency, searchKeyword);
    } else if (searchKeyword.length == 0) {
        showSearchedOffice(agency,"");
    }
}

function showSearchedAgency(funding_agency_code, search_text) {
    $.ajax({
        type: "POST",
        data: { funding_agency_code, search_text },
        enctype: 'multipart/form-data',
        url: "/Taxonomy/GetAgencyListSearch",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                $('#searchOfficeInput').val("");
                $("#agency_records").html("");
                $("#office_records").html("");
                $("#tableBodyAgency").html("");
                for (let b = 0; b < records.length; b++) {
                    console.log("total_records", records[b].total_records)
                    $("#agency_records").html(`Showing ${records[0].total_records} Agencies`)
                    let html = "";
                    html = html + `<tr style ='cursor:pointer;' onclick='getOffice("${records[b].funding_agency_code}");'><td>${b + 1}</td><td>${records[b].funding_agency_name}</td></tr>`;
                    $("#tableBodyAgency").append(html);
                }
            }
            else {
                $("#agency_records").html(`No Agency Found`)
                $("#tableBodyAgency").html("");
                let html = `<tr><td colspan="2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyAgency").append(html);
            }
        },
        error: function ajaxError(err) {
            console.log("Error")
        }
    });
}

function showSearchedOffice(agency_code, search_text) {
    $.ajax({
        type: "POST",
        data: { agency_code, search_text },
        enctype: 'multipart/form-data',
        url: "/Taxonomy/GetOfficeListSearch",
        success: function (result) {
            result = jQuery.parseJSON(result);
            if (result.records && result.records != 0) {
                const records = result.records;
                $("#office_records").html("");
                $("#tableBodyOffice").html("");                
                for (let b = 0; b < records.length; b++) {
                    let html = "";
                    $("#office_records").html(`Showing ${records[0].total_records} Offices`)
                    html = html + `<tr style ='cursor:pointer;'><td>${b + 1}</td><td>${records[b].office_name}</td></tr>`;
                    $("#tableBodyOffice").append(html);
                }
            }
            else {
                $("#office_records").html(`No Office Found`)
                $("#tableBodyOffice").html("");
                let html = `<tr><td colspan = "2" style="text-align:center">No Data Found</td></tr>`;
                $("#tableBodyOffice").append(html);
            }
        },
        error: function ajaxError(err) {
            console.log("Error")

        }
    });
}

$(document).on('click', '.btndeptrowclear', function () {
    var dept = this.id;
    var spl = dept.split('_');

    if (spl[1] == '2') {
        DepartmentAgencycode_1st = [];
        DepartmentAgencycode_1st.push({ DeptCode: $('#lbldept_' + spl[1]).text(), DeptDesc: $('#txtdept_' + spl[1]).val(), AgencyCode: $('#lblagency_' + spl[1]).text(), AgencyDesc: $('#txtagency_' + spl[1]).val() });
    }

    $('#tableBodyAgency').html("");
    $('#tableBodyOffice').html("");

    $('#searchAgencyInput').val("");
    $('#searchOfficeInput').val("");

    $("#agency_records").html("");
    $("#office_records").html("");

    //$('#tableBodyAgency').val("");
    //$('#tableBodyAgency').text("");
    //$('#tableBodyOffice').val("");
    //$('#tableBodyOffice').text("");
    $('#txtdept_' + spl[1]).val("");
    $('#lbldept_' + spl[1]).text("");
    
});