var Type = "";

$(document).ready(function () {

    set_Helpicon();
    Type = 'Type1';
    LoadUserReport();
});

$(document).on('click', '.TypeOne', function () {
        $("#opportunity").hide();
        $("#contract").show();
        $(this).removeClass("Com_005");
        $(this).addClass("Com_006");
        $('.TypeTwo').removeClass("Com_006");
        $('.TypeTwo').addClass("Com_005");
        $('.TypeThree').removeClass("Com_006");
        $('.TypeThree').addClass("Com_005");
        Type = 'Type1';
        LoadUserReport();

});
$(document).on('click', '.TypeTwo', function () {
        $("#opportunity").hide();
        $("#contract").show();
        $(this).removeClass("Com_005");
        $(this).addClass("Com_006");
        $('.TypeOne').removeClass("Com_006");
        $('.TypeOne').addClass("Com_005");
        $('.TypeThree').removeClass("Com_006");
        $('.TypeThree').addClass("Com_005");

        Type = 'Type2';
        LoadGlobalReport();
});

$(document).on('click', '.TypeThree', function () {
        $("#contract").hide();
        $("#opportunity").show();
        $(this).removeClass("Com_005");
        $(this).addClass("Com_006");
        $('.TypeOne').removeClass("Com_006");
        $('.TypeOne').addClass("Com_005");
        $('.TypeTwo').removeClass("Com_006");
        $('.TypeTwo').addClass("Com_005");
        Type = 'Type3';
        LoadDailyOpportunityEmail();
});

function LoadUserReport() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/UserReports/GetUserReportData",
        dataType: "json",
        async: true,
        success: function (result) {
            $('#UserReportGrid_tbody').html("");
            
            if (result.length > 0) {

                var filldata = "";


                for (var i = 0; i < result.length; i++) {

                    var app_report_path = result[i].app_report_path;
                    var app_report_name = result[i].app_report_name;
                    var app_report_datetime = result[i].app_report_datetime;
                    var app_report_note = result[i].app_report_note;
                    if (app_report_path === null) {
                        app_report_path = "-";
                    }
                    if (app_report_name === null) {
                        app_report_name = "-";
                    }
                    if (app_report_datetime === null) {
                        app_report_datetime = "-";
                    }
                    else {
                        var formattedDate = new Date(parseInt(app_report_datetime.replace('/Date(', '')));
                        app_report_datetime = (formattedDate.getMonth()) + "/" + (formattedDate.getUTCDate() + 1) + "/" + (formattedDate.getUTCFullYear());

                    }
                    if (app_report_note === null) {
                        app_report_note = "-";
                    }
                    filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td>' + app_report_name + '</td><td>' + app_report_datetime + '</td><td>' + app_report_note + '</td><td><a href=' + app_report_path + ' target="_blank" download=' + app_report_path + '><img class="excel-btn" src="/Content/assets/images/excel.png"/></a></td></tr>');
                }

                //$('.money').mask("#,##0.00", { reverse: true });
                $('#UserReportGrid_tbody').html(filldata);
                $('#UserReportGrid_tbl').DataTable();
            }
        },

        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

function LoadGlobalReport() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/UserReports/GetUserGlobalReportData",
        dataType: "json",
        async: true,
        success: function (result) {
            $('#UserReportGrid_tbody').html("");
           
            if (result.length > 0) {

                var filldata = "";


                for (var i = 0; i < result.length; i++) {

                    var app_report_path = result[i].app_report_path;
                    var app_report_name = result[i].app_report_name;
                    var app_report_datetime = result[i].app_report_datetime;
                    var app_report_note = result[i].app_report_note;
                    if (app_report_path === null) {
                        app_report_path = "-";
                    }
                    if (app_report_name === null) {
                        app_report_name = "-";
                    }
                    if (app_report_datetime === null) {
                        app_report_datetime = "-";
                    }
                    else {
                        var formattedDate = new Date(parseInt(app_report_datetime.replace('/Date(', '')));
                        app_report_datetime = (formattedDate.getMonth()) + "/" + (formattedDate.getUTCDate() + 1) + "/" + (formattedDate.getUTCFullYear());

                    }
                    if (app_report_note === null) {
                        app_report_note = "-";
                    }
                    filldata = filldata.concat('<tr><td>' + (i + 1) + '</td><td>' + app_report_name + '</td><td>' + app_report_datetime + '</td><td>' + app_report_note + '</td><td><a href=' + app_report_path + ' target="_blank" download=' + app_report_path + '><img class="excel-btn" src="/Content/assets/images/excel.png"/></a></td></tr>');
                }

                //$('.money').mask("#,##0.00", { reverse: true });
                $('#UserReportGrid_tbody').html(filldata);
                $('#UserReportGrid_tbl').DataTable();
            }
        },

        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

function LoadDailyOpportunityEmail() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/UserReports/GetDailyOpportunityEmail",
        dataType: "json",
        async: true,
        success: function (result) {
            $('#OpportunityGrid_tbody').html("");
            if (result.length > 0) {
                var filldata = "";
                for (var i = 0; i < result.length; i++) {

                    var solicitation_number = result[i].solicitation_number.length > 0 ? result[i].solicitation_number : "-";
                    var naics_code = result[i].naics_code.length > 0 ? result[i].naics_code : "-";
                    var funding_agency = result[i].funding_agency.length > 0 ? result[i].funding_agency : "-";
                    var funding_sub_agency = result[i].funding_sub_agency.length > 0 ? result[i].funding_sub_agency : "-";
                    var funding_agency_name = result[i].funding_agency_name.length > 0 ? result[i].funding_agency_name : "-";
                    var funding_sub_agency_name = result[i].funding_sub_agency_name.length > 0 ? result[i].funding_sub_agency_name : "-";
                    var keyword = result[i].keyword.length > 0 ? result[i].keyword : "-";
                    var socio_economic_designation = result[i].socio_economic_designation.length > 0 ? result[i].socio_economic_designation : "-";
                    var socio_economic_designation_name = result[i].socio_economic_designation_name.length > 0 ? result[i].socio_economic_designation_name : "-";
                    var base_type = result[i].base_type.length > 0 ? result[i].base_type : "-";
                    var daily_report_name = result[i].daily_report_name.length > 0 ? result[i].daily_report_name : "-";
                   
               
                    filldata = filldata.concat('<tr id="opportunity_' + i + '"><td>' + (i + 1) + '</td><td>' + daily_report_name +'</td><td>' + naics_code + '</td><td>' + funding_agency_name + '</td>' +
                        '<td>' + funding_sub_agency_name + '</td><td>' + keyword + '</td><td>' + socio_economic_designation_name + '</td>' +
                        '<td>' + base_type + '</td>' +
                        '<td><a onclick="deleteOpportunityEmail('+i+','+result[i].id+')" class="btn btn-custom"><i class="fa fa-trash"></i></td></tr > ');
                }

                //$('.money').mask("#,##0.00", { reverse: true });
                $('#OpportunityGrid_tbody').html(filldata);
                $('#OpportunityGrid_tbl').DataTable();
            }
        },

        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

function deleteOpportunityEmail(rowId,id) {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/UserReports/DeleteDailyOpportunityEmail?id="+id,
        dataType: "json",
        async: true,
        success: function (response) {
            if (response > 0) {
                var table = $('#OpportunityGrid_tbl').DataTable();
                //table.row("#opportunity_"+rowId).remove().draw();
                //table.ajax.reload();
                table.row("#opportunity_" + rowId).remove().draw();
                //table.ajax.reload();
                LoadDailyOpportunityEmail();
                swal("", "Opportunity Daily Email Record Deleted","success");
               
            }
            else {
                swal("",response, "error");
            }
        },

        error: function ajaxError(err) {
            swal("", err);

        }
    });
}