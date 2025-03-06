var TotalData = [];
var DeptCombo = [];
var Agencycombo = [];

//To bind dept agency in popup //
var MarketContext_DepartmentBind = [];
// To bind naics/naicsfamily in popup //
var MarketContext_NaicsCode = [];
// To bind PSC in popup //
var MarketContext_PSC = [];

var NaicsCode_R = [];
var NaicsCode = [];
var NaicsCodeDesc = [];
var MC_NaicsCodeDesc = [];
var NaicsType = "Code";

var MC_DeptAgencyArr = [];
var MC_DeptAgencyArr_DB = [];
var DepartmentCode = [];
var Departmentcode_R = [];
var DepartmentDescription = [];

var AgencyCode = [];
var AgencyCode_R = [];


// DEPT-AGENCY //
var cntdept = 2;
var cntagency = 2;

// naics Family //
var maxFam = 6;
var cntFam = 2;

// naics code //
var max = 6;
var cnt = 2;

// PSC  //


var MC_PSCDesc = [];
var maxpsc = 6;
var cntpsc = 2;
var PSC = [];
var PSCDesc = [];

var DeleteMode = 0;


var MasterID = "";


var ColorArr = ["#f6f7e9", "#edeae5", "#f7f4c9", "#f1efd6"];

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

$(document).ready(function () {
    getDept();
    GetMasterData();
    GetMarketContextUseage();
    GetHelpingIcon();
    set_Helpicon();
    //$(".NC").attr('title', 'This is the hover-over text');
});

function GetMasterData() {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/GetMarketContextMasterID",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    MasterID = result[i].TransId;
                    var MarketContext_Name = result[i].MarketContext_Name;
                    $('.MarketContextMasterID').text(MasterID);

                    LoadData(MasterID);
                }
            }
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });
}

function LoadData(MasterID) {

    MarketContext_DepartmentBind = [];
    MarketContext_NaicsCode = [];
    MarketContext_PSC = [];
    var filldata_Naics = '';
    var filldata_PSC = '';
    var filldata_Department_Agency = '';
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/GetMarketContext",
        data: "{'MasterID': '" + MasterID + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.length > 0) {
                $("body").tooltip({
                    selector: '[data-toggle="tooltip"]'
                });

                TotalData.push(result);

                var newArray = TotalData.filter(function (el) {
                    el.forEach(test => {
                        var data = test.Type == 'Naics';
                        if (data == true) {
                            DeleteMode = 1; //'IF Naics'
                        }
                        var data1 = test.Type == 'NaicsFamily';
                        if (data1 == true) {
                            DeleteMode = 2; //'IF NaicsFamily'
                        }
                    });
                });




                var NaicsClr = 0; var DepAgenClr = 0; var PSCclr = 0;
                var getcolor = ColorArr.length;

                for (var i = 0; i < result.length; i++) {

                    if (result[i].Type == "Naics" || result[i].Type == "NaicsFamily") {


                        filldata_Naics = filldata_Naics + "<div style='Background-color:" + ColorArr[NaicsClr] + "' class='mc_004 row' id=" + result[i].MarketContextID + ">" +
                            "<div class='col-lg-11'>" +
                            "<label class='mc_005'>" + result[i].Description + " (<span>" + result[i].Code + "</span>)</label>" +
                            "</div>" +
                            "<div class='col-lg-1'>" +
                            "<i class='ti-close MC_RemoveNaics' id=" + result[i].Code + " data-toggle='tooltip' title='' data-original-title='Remove this NAICS CODE from market context'></i>" +
                            "</div>" +
                            "</div>";

                        MarketContext_NaicsCode.push({ Description: result[i].Description, Code: result[i].Code });
                        if (NaicsClr == ColorArr.length - 1) {
                            NaicsClr = 0;
                        }
                        else {
                            NaicsClr++;
                        }
                    }
                    else if (result[i].Type == "PSC") {



                        filldata_PSC = filldata_PSC + "<div style='Background-color:" + ColorArr[PSCclr] + "' class='mc_004 row' id=" + result[i].MarketContextID + ">" +
                            "<div class='col-lg-11'>" +
                            "<label class='mc_005'>" + result[i].Description + " (<span>" + result[i].Code + "</span>)</label>" +
                            "</div>" +
                            "<div class='col-lg-1'>" +
                            "<i class='ti-close MC_RemovePSC' id=" + result[i].Code + " data-toggle='tooltip' title='' data-original-title='Remove this PSC from market context'></i>" +
                            "</div>" +
                            "</div>";


                        MarketContext_PSC.push({ Description: result[i].Description, Code: result[i].Code });
                        if (PSCclr == ColorArr.length - 1) {
                            PSCclr = 0;
                        }
                        else {
                            PSCclr++;
                        }
                    }
                    else if (result[i].Type == "Department_Agency") {

                        var Code = result[i].Code.split('/');
                        var Description = result[i].Description.split('/');

                        var DeptDesc = Description[0];
                        var AgencyDesc = Description[1];

                        var DeptCode = Code[0];
                        var AgencyCode = Code[1];

                        MarketContext_DepartmentBind.push({ DeptDesc: DeptDesc, DeptCode: DeptCode, AgencyDesc: AgencyDesc, AgencyCode: AgencyCode });


                        filldata_Department_Agency = filldata_Department_Agency + "<div style='Background-color:" + ColorArr[DepAgenClr] + "' class='mc_004 row " + DeptCode + "' id=" + result[i].MarketContextID + ">" +
                            "<div class='col-lg-11' style='padding-right: 0'>" +
                            "<div>" +
                            "<div><label class='mc_006'>Funding Agency</label></div>" +
                            "<div><label class='mc_005'>" + DeptDesc + "</label></div>" +
                            "</div>" +
                            "<div>" +
                            "<div><label class='mc_006'>Funding Sub Agency</label></div>" +
                            "<div><label class='mc_005'>" + AgencyDesc + "</label></div>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-lg-1'>" +
                            "<i class='ti-close MC_RemoveDeptAgency' id=" + result[i].Code + " data-toggle='tooltip' title='' data-original-title='Remove this funding agency/sub agency from market context'></i>" +
                            "</div>" +
                            "</div>";

                        if (DepAgenClr == ColorArr.length - 1) {
                            DepAgenClr = 0;
                        }
                        else {
                            DepAgenClr++;
                        }
                    }
                }
            }
            if (filldata_Naics != "") {
                $(".BindNaicsCode").html(filldata_Naics);
                $("#NaicsBody").css("display", "block");
            }
            else {
                $(".BindNaicsCode").html('');
                $("#NaicsBody").css("display", "none");
            }
            if (filldata_Department_Agency != "") {
                $(".BindDeptAgency").html(filldata_Department_Agency);
                $("#DeptAgencyBody").css("display", "block");
            }
            else {
                $(".BindDeptAgency").html('');
                $("#DeptAgencyBody").css("display", "none");
            }
            if (filldata_PSC != "") {
                $(".BindPSC").html(filldata_PSC);
                $("#PSCBody").css("display", "block");
            }
            else {
                $(".BindPSC").html('');
                $("#PSCBody").css("display", "none");
            }
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });
}
// ########################## ADD NAICS CODE ############################# //
$(document).on("click", "#AddNaicsCode", function (e) {

    //$(".NaicsCode").each(function (i) {

    //    var naicscode = $(this).attr('id');

    //    var getNaicsCode = $('#' + naicscode).val();
    //    var spl = getNaicsCode.split('_');
    //    console.log(getNaicsCode);

    //    var n = NaicsCode.includes(getNaicsCode);
    //    if (n == true) {
    //        const index = NaicsCode.indexOf(getNaicsCode);
    //        if (index > -1) {
    //            NaicsCode.splice(index, 1);
    //        }
    //        console.log("yes", getNaicsCode);
    //    }
    //    else {
    //        if (getNaicsCode == $('#txtnaicscode_2').val()) {

    //        }
    //        console.log("No", getNaicsCode);
    //        $('#IDnaics_' + spl[1]).remove();
    //    }


    //    if ($('.NaicsCode').length == (i + 1)) {
    //        if ($('#txtnaicscode_2').val() == "") {

    //            $('#txtnaicscode_2').val($('#txtnaicscode_' + spl[1]).val());
    //            $('#txtnaicsdesc_2').val($('#txtnaicsdesc_' + spl[1]).val());

    //            console.log($('#txtnaicscode_2').val(), $('#txtnaicsdesc_2').val());

    //            $('.naics_' + spl[1]).remove();

    //        }

    //    }

    //});
    cnt = 2;
    if (MarketContext_NaicsCode.length > 0) {
        if (MarketContext_NaicsCode[0].Code.length == 6) {

            $('#txtnaicscode_2').val(MarketContext_NaicsCode[0].Code);
            $('#txtnaicsdesc_2').val(MarketContext_NaicsCode[0].Description);

            for (var i = 1; i < MarketContext_NaicsCode.length; i++) {
                addnaicscode();
                var NaicsCodeCount = cnt;

                $('#txtnaicscode_' + NaicsCodeCount).val(MarketContext_NaicsCode[i].Code);
                $('#txtnaicsdesc_' + NaicsCodeCount).val(MarketContext_NaicsCode[i].Description);

            }
        }
    }

    $('#NaicsCodeModal').modal('show');
    setTimeout(function () {
        $("#txtnaicscode_2").focus();
    }, 1000);
});
// ########################## ADD NAICS CODE ############################# //


// ########################## CHOOSE Naics / Naics family ############################# //
$(document).on('click', '.btn-toggle_Naics', function () {

    if (NaicsType == "Code") {
        NaicsType = "Family";
        //NaicsCode = [];
       // $("#NaicsBody").css("display", "none");
        $("#AddNaicsFamilyCode").css("display", "block");
        $("#AddNaicsCode").css("display", "none");
        $("#toggleNaicHeader").css("display", "none");
        $("#toggleNaicFamilyHeader").css("display", "block");
        
    }
    else if (NaicsType == "Family") {
        NaicsType = "Code";
        //NAICSFamCode = [];
        //$("#NaicsBody").css("display", "none");
        
        $("#AddNaicsFamilyCode").css("display", "none");
        $("#AddNaicsCode").css("display", "block");
        $("#toggleNaicFamilyHeader").css("display", "none");
        $("#toggleNaicHeader").css("display", "block");
       
    }

    $('#lbltotalnaics').text("");

});
// ########################## CHOOSE  Naics / Naics family ############################# //

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ NAICS CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// #################### Naics Code popup data Add & OK ################### //
$(document).on("click", "#btnmdnaicscodeclose", function (e) {

    NaicsCode = [];
    NaicsCodeDesc = []; MC_NaicsCodeDesc = [];
    //============= Remove blank rows =========//
    var len = "";
    NaicsCodeDesc.push({ code: $('#txtnaicscode_2').val(), Desc: $('#txtnaicsdesc_2').val() });
    MC_NaicsCodeDesc.push({ Code: $('#txtnaicscode_2').val(), Description: $('#txtnaicsdesc_2').val(), Type: 'Naics' });

    $(".NaicsCodeRow").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var N_Code = $('#txtnaicscode_' + spl[1]).val();
        if (N_Code == "" || N_Code == undefined) {
            $('.naics_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtnaicscode_2').val() == "") {

                $('#txtnaicscode_2').val($('#txtnaicscode_' + spl[1]).val());
                $('#txtnaicsdesc_2').val($('#txtnaicsdesc_' + spl[1]).val());


                $('.naics_' + spl[1]).remove();

            }
        }

        NaicsCodeDesc.push({ code: $('#txtnaicscode_' + spl[1]).val(), Desc: $('#txtnaicsdesc_' + spl[1]).val() });
        MC_NaicsCodeDesc.push({ Code: $('#txtnaicscode_' + spl[1]).val(), Description: $('#txtnaicsdesc_' + spl[1]).val(), Type: 'Naics' });

    });


    setTimeout(function () {

        $(".NaicsCode").each(function () {

            var naicscodecheck = $('#txtnaicscode_2').val();
            var naicscode = $(this).val();
            NaicsCode.push(naicscode);
            NaicsCode = NaicsCode.filter(item => item);
            NaicsCode = NaicsCode.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            if (naicscodecheck != "") {
                //console.log(NaicsCode.length)
                if (NaicsCode.length > 1) {
                    $('#lbltotalnaics').show();
                    $('#lbltotaladdedrownaics').text((NaicsCode.length - 1));
                }
                else {
                    $('#lbltotalnaics').hide();
                }
            }
        });


        $('.NaicsCodeRow').remove();
        $('#txtnaicscode_2').val('');
        $('#txtnaicsdesc_2').val('');


        $('#NaicsCodeModal').modal('toggle');

        BindNaicsCode();
    }, 200);

    //============= Remove blank rows =========//
});
// #################### Naics Code popup data Add & OK ################### //


//################### NAICS  code ###################
$(document).on('keyup', '.NaicsCode', function () {

    var NFC = this.id;

    var spl = NFC.split('_')

    var NaicsCodeval = $('#' + NFC).val();
    if (NaicsCodeval.length == '6') {
        $('#AlertMsg').text('');


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetNAICSFam",
            data: "{'Code': '" + NaicsCodeval + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    $('#txtnaicsdesc_' + spl[1]).val(result[0]);
                    //$(".dis_able0").attr('disabled', 'disabled');

                    ////NaicsCode.push(NaicsCodeval);
                    //$(".dis_able0").children().attr('disabled', 'disabled');
                    NAICS_mode = "NaicsCode";
                }
                else {
                    $(".NaicsCode").blur();
                    swal("", "No Data Found !");
                }



            },
            error: function ajaxError(err) {
                swal("", err);

            }
        });
        $('.AlertMsgNaics').text('');
    }
    else {
        $('.AlertMsgNaics').text('*** The NAICS Code should be exactly 6 Digits ! ***');
    }

});
//################### NAICS code ###################


// #################### Naics Code popup data Remove/Add Cancel ################### //
$(document).on('click', '#btnNaicsCodeCancel', function () {

    //============= Remove blank rows =========//
    var len = "";
    $(".NaicsCode").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var n = NaicsCode_R.includes($('#txtnaicscode_' + spl[1]).val());
        if (n != true) {
            //console.log($("yes", '#txtnaicscode_' + spl[1]).val())

            $('#txtnaicscode_' + spl[1]).val("");
            $('#txtnaicsdesc_' + spl[1]).val("");

            $('#IDnaics_' + spl[1]).remove();
        }
        else {
            //console.log("no", $('#txtnaicscode_' + spl[1]).val())
        }
    });
    //============= Remove blank rows =========//
    //console.log('==NaicsCode==', NaicsCode_R);
    $(".NaicsCode").each(function () {  // to get the removed values from "OK" array when "cancel" clicked
        var Naics = $(this).val();

        var n = NaicsCode_R.includes(Naics);
        if (n == true) {
            const index = NaicsCode_R.indexOf(Naics);
            if (index > -1) {
                NaicsCode_R.splice(index, 1);
            }
            //console.log("yes", Naics);
        }
        else {
            //console.log("No", Naics);
        }

    });


    $(NaicsCode_R).each(function (i) { // To add again the removed "ok" values


        addnaicscode(); // to add a new text box for ****** Naics Code ******

        var getcount = cnt;
        $('#txtnaicscode_' + getcount).val(NaicsCode_R[i]);// to add a value in text box

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetNAICSFam",
            data: "{'Code': '" + NaicsCode_R[i] + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.length > 0) {
                    $('#txtnaicsdesc_' + getcount).val(result[0]);
                }
            },
            error: function ajaxError(err) {
            }
        });
    });

    $('#NaicsCodeModal').modal('toggle');


});
// #################### Naics Code popup data Remove/Add Cancel ################### //
$(document).on('click', '#btnmdcancel', function () {
    $('#myModal').modal('toggle');
});

$(document).on('click', '#btnmdpsccancel', function () {
    $('#PscModal').modal('toggle');
});

$(document).on('click', '#btnNaicsFamilCancel', function () {
    $('#NaicsfamilyModal').modal('toggle');
});
// #################### Naics Code ADD NEW ROW IN POPUP ################### //
$(document).on("click", ".add-textboxcode", function () {
    var Naics = $("#txtnaicscode_2").val();
    if (Naics != "") { addnaicscode(); }
    else { swal("", "Please enter at least one Naics family field !", "Info"); }
});
// #################### Naics Code ADD NEW ROW IN POPUP ################### //


//#################### Add NaicsCode New fieds ####################//
function addnaicscode() {
    if (cnt < max) {
        cnt++;
        //console.log("addnaicscode()", cnt);

        var filldata = '<div class="naics_' + cnt + ' row NaicsCodeRow" id="IDnaics_' + cnt + '">' +

            '<div class="col-md-3 s004">' +

            '<div class="input-group mb-3" style="width:108%">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnnaicscoderowclear" id="btnnaicsfourrowclear_' + cnt + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtnaicscode_' + cnt + '" class="DIS_002 form-control NaicsCode dis_able1" name="textbox" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NC" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-9">' +
            '<div class="row">' +
            '<div class="col-md-11">' +

            '<div class="input-group mb-3">' +
            '<input disabled type="text" id="txtnaicsdesc_' + cnt + '" class="form-control lblnaicsdesc" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NCD" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            ' </div>' +

            '<div class="col-md-1">' +
            '<button type="button" id="btnremovenaicsfour_' + cnt + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxnaicsfour" data-toggle="tooltip" title="Click here to remove rows">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".naicsincr").append(filldata);
    }
    set_Helpicon();
}
//#################### Add NaicsCode New fieds ####################//


//#################### Clear naics code data from row ####################//
$(document).on('click', '.btnnaicscoderowclear', function () {
    var naicscode = this.id;
    var spl = naicscode.split('_');
    $('#txtnaicscode_' + spl[1]).val("");
    $('#txtnaicsdesc_' + spl[1]).val("");
    //NaicsCode = [];
    //clearNaicsPopup();
});
//#################### Clear naics code data from row ####################//


// #################### Remove NaicsCode New fieds #################### //
$(document).on("click", ".remove-textboxnaicsfour", function () {

    var getId = (this.id);
    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);
    
    cnt = cnt - 1;
    $('#txtnaicscode_' + id).val("");
    $('#txtnaicsdesc_' + id).val("");
    $('.naics_' + id).remove();
});

$(document).on("click", ".remove-textboxfam", function (e) {
    e.preventDefault();
    var getId = (this.id);

    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);
    cntFam = cntFam - 1;
    //var removeItem = $('#txtnaicsfamcode_' + id).val();
    //NaicsCode = jQuery.grep(NaicsCode, function (value) {
    //    return value != removeItem;
    //});

    $('#txtnaicsfamcode_' + id).val("");
    $('#txtnaicsfamdesc_' + id).val("");
    //$(this).parents(".naicsFam").remove();
    $(".naicsFam_" + id).remove();


});
// #################### Remove NaicsCode New fieds #################### //

// #################### Bind Naics Code in list #################### //
function BindNaicsCode() {



    var Mode = "Insert";
    if (MC_NaicsCodeDesc[0].Code != "") {

        var len = MC_NaicsCodeDesc[0].Code.length;
        if (len == '6') {
            if (DeleteMode == 1) {
                DeleteMode = 0;
            }
        }
        else if (len == '4') {
            if (DeleteMode == 2) {
                DeleteMode = 0;
            }
        }
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Dashboard/InsertMarketContext",
            data: "{'MarketContext':" + JSON.stringify(MC_NaicsCodeDesc) + ", 'Mode':'" + Mode + "', 'MasterID':'" + MasterID + "', 'NaicsMode':'" + DeleteMode + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                LoadData(MasterID);
            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }

}
// #################### Bind Naics Code in list #################### //
$(document).on("click", ".MC_RemoveNaics", function () {

    let MarketContext = {};
    var value = $(this).attr('id');
    //alert($(this).parent().parent().attr('id'));
    var MarketContextID = $(this).parent().parent().attr('id');

    MarketContext.Code = value;
    MarketContext.MarketContextID = MarketContextID;
    MarketContext.MasterID = MasterID;
    $(".MC_RemoveNaics").tooltip('hide');

    //NaicsCodeDesc = $.grep(NaicsCodeDesc, function (e) {
    //    return e.code != value;
    //});

    //NaicsCode = $.grep(NaicsCode, function (i) {
    //    return i != value;
    //});
    //console.log(NaicsCodeDesc);
    //BindNaicsCode();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/RemoveMarketContext",
        data: "{'MarketContext':" + JSON.stringify(MarketContext) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            LoadData(MasterID);
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });

});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ NAICS CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++//








// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEPARTHMENT / AGENCY ++++++++++++++++++++++++++++++++++++++++++++++++++++++//
$(document).on('click', '.btnclearagency', function () {
    var id = $(this).attr('id');
    var spl = id.split('_');
    $('#txtagency_' + spl[1]).val("");
    $('#lblagency_' + spl[1]).text("");
});


$(document).on('click', '#btnagencyrowclear', function () {

    $('#txtagency_2').val("");
    $('#lblagency_2').text("");
});



$(document).on("click", "#AddDeptAgency", function (e) {
    cntdept = 2;
    cntagency = 2;
    e.preventDefault();

    if (MarketContext_DepartmentBind.length > 0) {

        $('#txtdept_2').val(MarketContext_DepartmentBind[0].DeptDesc);
        $('#lbldept_2').text(MarketContext_DepartmentBind[0].DeptCode);

        $('#txtagency_2').val(MarketContext_DepartmentBind[0].AgencyDesc);
        $('#lblagency_2').text(MarketContext_DepartmentBind[0].AgencyCode);

        for (var i = 1; i < MarketContext_DepartmentBind.length; i++) {
            adddepartment();
            addagency();

            var DeptCount = cntdept;
            var AgencyCount = cntagency;

            $('#txtdept_' + DeptCount).val(MarketContext_DepartmentBind[i].DeptDesc);
            $('#lbldept_' + DeptCount).text(MarketContext_DepartmentBind[i].DeptCode);

            $('#txtagency_' + AgencyCount).val(MarketContext_DepartmentBind[i].AgencyDesc);
            $('#lblagency_' + AgencyCount).text(MarketContext_DepartmentBind[i].AgencyCode);
        }
    }

    $('#myModal').modal('show');
    setTimeout(function () {
        $("#txtdept_2").focus();
    }, 1000);

});


$(document).on('click', '.add-textboxdept', function (e) {
    var dept = $("#txtdept_2").val();

    if (dept != "") {
        e.preventDefault();
        adddepartment();
        addagency();
    }
    else {
        swal("", "Please enter at least one department field !", "info");
    }
});

function adddepartment() {

    var maxdept = 6;

    if (cntdept < maxdept) {
        cntdept++;

        var filldata = '<div class="dept_' + cntdept + ' row col-md-12 DeptMainrows" id="DeptRow_' + cntdept + '">' +

            '<div class="col-md-11 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btndeptrowclear" id="btndeptrowclear_' + cntdept + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtdept_' + cntdept + '" class="DIS_002 form-control  txtdept dis_able1" name="textbox" /><label id="lbldept_' + cntdept + '" style="display:none;" class="lbldept"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 DEPT" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremovedept_' + cntdept + '" class="s022 btn btn-sm dis_able1 B_s004 remove-textboxdept" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".deptincr").append(filldata);
    }
    set_Helpicon();
}
function addagency() {

    var maxagency = 6;


    if (cntagency < maxagency) {
        cntagency++;

        var filldata = '<div class="agency_' + cntagency + ' row col-md-12 AgencyMainrows">' +

            '<div class="col-md-12 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnclearagency" id="btnagencyrowclear_' + cntagency + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtagency_' + cntagency + '" class="DIS_002 form-control txtagency dis_able1" name="textbox" /><label id="lblagency_' + cntagency + '" style="display:none;" class="lblagency"></label>' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 AGCY" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-1" style="display:none">' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<button type="button" id="btnremoveagency_' + cntagency + '" class="s022 btn  btn-sm dis_able1 B_s004 remove-textboxagency" data-toggle="tooltip" title="Click here to remove row" style="margin-left:auto !important">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +



            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".agencyincr").append(filldata);
    }
    set_Helpicon();

}

//=============================== Remove Department New fieds ==========================================//
$(document).on("click", ".remove-textboxdept", function (e) {


    e.preventDefault();
    var getId = (this.id);
    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);
    cntdept = cntdept - 1;
    cntagency = cntagency - 1;
    var removeItem = $('#txtdept_' + id).val();
    NaicsCode = jQuery.grep(NaicsCode, function (value) {
        return value != removeItem;
    });


    $(".dept_" + id).remove();
    $(".agency_" + id).remove();

    //cntdept--;
    //cntagency--;

    //alert(cntdept);
});
//=============================== Remove Department New fieds ==========================================//

//=============================== Remove Agency New fieds ==============================================//
$(document).on("click", ".remove-textboxagency", function (e) {


    e.preventDefault();
    var getId = (this.id);
    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);
    cntdept = cntdept - 1;
    cntagency = cntagency - 1;
    var removeItem = $('#txtagency_' + id).val();
    NaicsCode = jQuery.grep(NaicsCode, function (value) {
        return value != removeItem;
    });

    $('#txtagency_' + id).val("");

    $(this).parents(".agency").remove();
    cntagency--;
    cntoffice--;





});


$(document).on('click', '.btndeptrowclear', function () {
    var dept = this.id;
    var spl = dept.split('_');
    $('#txtdept_' + spl[1]).val("");
    $('#txtagency_' + spl[1]).val("");
    $('#lbldept_' + spl[1]).text("");
    $('#lblagency_' + spl[1]).text("");
});


//#################### Load Department  ####################//
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

            $('#lbldept_' + id).text(ui.item.id);
            var depcod = ui.item.id;//gets the select value from autocomplete
            getAgency(depcod);
        }
    });
});

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


function getAgency(DepartmentCode) {
    Agencycombo = [];
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Search/GetAgencyList",
        data: "{'Agencycode': '" + DepartmentCode + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                //AgencyCode = result[0].funding_agency_code;
                Agencycombo.push(result);
                //$('#AgencyList').text(result[0].funding_agency_code);
                //$('#AgencyList').val(result[0].funding_agency_name);
            }
            else {
                //swal("", "No Data Found !");
            }

        },
        error: function ajaxError(err) {
            swal("", err);

        }
    });
}

$(document).on('click', '#btnmdclose', function () {

    MC_DeptAgencyArr = []; MC_DeptAgencyArr_DB = [];
    //============= Remove blank rows =========//
    var len = "";
    $(".DeptMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var DeptDesc = $('#txtdept_' + spl[1]).val();
        //console.log(DeptDesc);
        if (DeptDesc == "" || DeptDesc == undefined) {
            $('.dept_' + spl[1]).remove();
            $('.agency_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtdept_2').val() == "") {

                $('#txtdept_2').val($('#txtdept_' + spl[1]).val());
                $('#lbldept_2').text($('#lbldept_' + spl[1]).text());
                $('#txtagency_2').val($('#txtagency_' + spl[1]).val());
                $('#lblagency_2').text($('#lblagency_' + spl[1]).text());

                $('.dept_' + spl[1]).remove();
                $('.agency_' + spl[1]).remove();

            }
        }
    });
    //============= Remove blank rows =========//

    DepartmentCode = [];
    AgencyCode = [];

    //============= Count Agency =========//
    $(".lblagency").each(function () {

        var agency = $(this).text();
        AgencyCode.push(agency);
        AgencyCode = AgencyCode.filter(item => item);
        AgencyCode = AgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        $('#AgencyDDL').val(AgencyCode[0]);

    });
    //============= Count Agency =========//

    //============= Count Departmrnt =========//
    $(".lbldept").each(function () {
        var deptcheck = $('#txtdept_2').val();

        var getDeptID = $(this).attr('id');
        var spl = getDeptID.split('_');

        var Dept_Desc = $('#txtdept_' + spl[1]).val();
        var Dept_Code = $('#lbldept_' + spl[1]).text();

        var Agency_Desc = $('#txtagency_' + spl[1]).val();
        var Agency_Code = $('#lblagency_' + spl[1]).text();

        if (Dept_Code != "") {

            MC_DeptAgencyArr.push({ DeptDesc: Dept_Desc, DeptCode: Dept_Code, AgencyDesc: Agency_Desc, AgencyCode: Agency_Code });
            MC_DeptAgencyArr_DB.push({ Code: Dept_Code + '/' + Agency_Code, Description: Dept_Desc + '/' + Agency_Desc, Type: 'Department_Agency', });
        }
        var dept = $(this).text();
        DepartmentCode.push(dept);
        DepartmentCode = DepartmentCode.filter(item => item);
        DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        if (deptcheck != "") {
            if (DepartmentCode.length > 1) {
                $('#lbltotaldept').show();
                $('#lbltotaladdedrowdept').text((DepartmentCode.length - 1));
            }
            else {
                $('#lbltotaldept').hide();
                $('#lbltotaladdedrowdept').text('');
            }
        }
        $('#DepartmentDDL').val(DepartmentCode[0]);

    });


    //============= Count Departmrnt =========//



    if (AgencyCode.length > 0) {
        if (AgencyCode.length == DepartmentCode.length) {

        }
        else {
            swal("", "Please fix the following <br/>1.  Choose an agency on all rows <br/>OR<br/>  2.  Leave all agencies choices empty.", "info");
            return false;
        }
    }


    $('#lbltotaldept').click(function () {
        $('#myModal').modal('show');

    });

    // Bind Data to Search fields //
    $('#DepartmentDDL').val($('#txtdept_2').val());
    $('#AgencyDDL').val($('#txtagency_2').val());
    $("#AgencyDDL").prop('disabled', true);
    //$('#HD_Dept').text($('#txtdept_2').val());

    $('#myModal').modal('toggle');


    AgencyCode_R = [];
    AgencyCode_R = AgencyCode.slice();

   
});
//#################### Load Department  ####################//

//#################### Load Agency  ####################//
$(document).on('focus', '.txtagency', function () {

    var getId = (this.id);
    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);

    var GetDEptCpde = $('#lbldept_' + id).text();
    getAgency(GetDEptCpde);

    //console.log(Agencycombo);
    $(".txtagency").addClass('ui-autocomplete-loading');

    //Complaints Auto Complete
    $(".txtagency").autocomplete({
        minLength: 0,
        source: Agencycombo[0],
        select: function (event, ui) {
            $('#txtagency_' + id).val(ui.item.value);
            $('#lblagency_' + id).text(ui.item.id);
            //$(".txtagency").val(ui.item.value);
            AgencyCode = ui.item.id;//gets the select value from autocomplete

        }
    });

});
//#################### Load Agency  ####################//

$(document).on('click', '#btnmdclose', function () {

    //============= Remove blank rows =========//
    var len = "";
    $(".DeptMainrows").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var DeptDesc = $('#txtdept_' + spl[1]).val();

        if (DeptDesc == "" || DeptDesc == undefined) {
            $('.dept_' + spl[1]).remove();
            $('.agency_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtdept_2').val() == "") {

                $('#txtdept_2').val($('#txtdept_' + spl[1]).val());
                $('#lbldept_2').text($('#lbldept_' + spl[1]).text());
                $('#txtagency_2').val($('#txtagency_' + spl[1]).val());
                $('#lblagency_2').text($('#lblagency_' + spl[1]).text());

                $('.dept_' + spl[1]).remove();
                $('.agency_' + spl[1]).remove();

            }
        }
    });
    //============= Remove blank rows =========//

    DepartmentCode = [];
    AgencyCode = [];

    //============= Count Agency =========//
    $(".lblagency").each(function () {

        var agency = $(this).text();
        AgencyCode.push(agency);
        AgencyCode = AgencyCode.filter(item => item);
        AgencyCode = AgencyCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        //console.log("AgencyCode", AgencyCode);
        $('#AgencyDDL').val(AgencyCode[0]);

    });
    //============= Count Agency =========//

    //============= Count Departmrnt =========//
    $(".lbldept").each(function () {
        var deptcheck = $('#txtdept_2').val();

        var dept = $(this).text();
        DepartmentCode.push(dept);
        DepartmentCode = DepartmentCode.filter(item => item);
        DepartmentCode = DepartmentCode.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });

        if (deptcheck != "") {
            if (DepartmentCode.length > 1) {
                $('#lbltotaldept').show();
                $('#lbltotaladdedrowdept').text((DepartmentCode.length - 1));
            }
            else {
                $('#lbltotaldept').hide();
                $('#lbltotaladdedrowdept').text('');
            }
        }

        $('#DepartmentDDL').val(DepartmentCode[0]);

    });
    //console.log('DepartmentCode', DepartmentCode);




    //============= Count Departmrnt =========//



    if (AgencyCode.length > 0) {
        if (AgencyCode.length == DepartmentCode.length) {

        }
        else {
            swal("", "Please fix the following <br/>1.  Choose an agency on all rows <br/>OR<br/>  2.  Leave all agencies choices empty.", "info");
            return false;
        }
    }




    $('#lbltotaldept').click(function () {
        $('#myModal').modal('show');

    });

    $(".txtdept").each(function () {
        var dept = $(this).val();
        if (dept != "") {
            DepartmentDescription.push(dept);
            //console.log(dept);
        }
    });
    // Bind Data to Search fields //
    $('#DepartmentDDL').val($('#txtdept_2').val());
    $('#AgencyDDL').val($('#txtagency_2').val());
    $("#AgencyDDL").prop('disabled', true);
    //$('#HD_Dept').text($('#txtdept_2').val());


    BindDepartAgencyCode();

    $('#myModal').modal('toggle');

    ClearDeptAgencyBOX();



});

function BindDepartAgencyCode() {

    var Mode = "Insert";
    if (MC_DeptAgencyArr_DB.length > 0) {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Dashboard/InsertMarketContext",
            data: "{'MarketContext':" + JSON.stringify(MC_DeptAgencyArr_DB) + ", 'Mode':'" + Mode + "', 'MasterID':'" + MasterID + "', 'NaicsMode':''}",
            dataType: "json",
            async: false,
            success: function (result) {
                LoadData(MasterID);
            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }
}

function ClearDeptAgencyBOX() {
    $('.DeptMainrows').remove();
    $('.AgencyMainrows').remove();
    $('#txtdept_2').val('');
    $('#lbldept_2').text('');
    $('#txtagency_2').val('');
    $('#lblagency_2').text('');
}

$(document).on("click", ".MC_RemoveDeptAgency", function () {

    let MarketContext = {};
    var value = $(this).attr('id');
    var MarketContextID = $(this).parent().parent().attr('id');
    $(".MC_RemoveDeptAgency").tooltip('hide');
    MarketContext.Code = value;
    MarketContext.MarketContextID = MarketContextID;
    MarketContext.MasterID = MasterID;
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/RemoveMarketContext",
        data: "{'MarketContext':" + JSON.stringify(MarketContext) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            LoadData(MasterID);
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEPARTHMENT / AGENCY ++++++++++++++++++++++++++++++++++++++++++++++++++++++//





// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ NAICS FAMIL CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// ########################## ADD NAICS CODE ############################# //
$(document).on("click", "#AddNaicsFamilyCode", function (e) {
    cntFam = 2;
    if (MarketContext_NaicsCode.length > 0) {
        if (MarketContext_NaicsCode[0].Code.length == 4) {


            $('#txtnaicsfamcode_2').val(MarketContext_NaicsCode[0].Code);
            $('#txtnaicsfamdesc_2').val(MarketContext_NaicsCode[0].Description);

            for (var i = 1; i < MarketContext_NaicsCode.length; i++) {
                addnaicsfamily();
                var NaicsFamilyCodeCount = cntFam;

                $('#txtnaicsfamcode_' + NaicsFamilyCodeCount).val(MarketContext_NaicsCode[i].Code);
                $('#txtnaicsfamdesc_' + NaicsFamilyCodeCount).val(MarketContext_NaicsCode[i].Description);

            }
        }
    }
    $('#NaicsfamilyModal').modal('show');

    setTimeout(function () {
        $("#txtnaicscode_2").focus();
    }, 1000);
});
// ########################## ADD NAICS CODE ############################# //

$(document).on("click", "#btnmdnaicsfamilyclose", function (e) {

    MC_NaicsCodeDesc = [];
    MC_NaicsCodeDesc.push({ Code: $('#txtnaicsfamcode_2').val(), Description: $('#txtnaicsfamdesc_2').val(), Type: 'NaicsFamily' });

    //============= Remove blank rows =========//
    var len = "";
    $(".NaicsFamRow").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var N_FamCode = $('#txtnaicsfamcode_' + spl[1]).val();
        if (N_FamCode == "" || N_FamCode == undefined) {
            $('.naicsFam_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtnaicsfamcode_2').val() == "") {
                $('#txtnaicsfamcode_2').val($('#txtnaicsfamcode_' + spl[1]).val());
                $('#txtnaicsfamdesc_2').val($('#txtnaicsfamdesc_' + spl[1]).val());
                $('.naicsFam_' + spl[1]).remove();
            }
        }

        MC_NaicsCodeDesc.push({ Code: $('#txtnaicsfamcode_' + spl[1]).val(), Description: $('#txtnaicsfamdesc_' + spl[1]).val(), Type: 'NaicsFamily' });

    });

    $('#txtnaicsfamcode_1').val($('#txtnaicsfamcode_2').val());
    $('#txtnaicsfamdesc_1').val($('#txtnaicsfamdesc_2').val());

    $('.NaicsFamRow').remove();
    $('#txtnaicsfamcode_2').val('');
    $('#txtnaicsfamdesc_2').val('');


    $('#NaicsfamilyModal').modal('toggle');
    BindNaicsCode();
});

//#################### NAICS Family code ####################=========//
$(document).on('keyup', '.NaicsFamCode', function () {

    var NFC = this.id;

    var spl = NFC.split('_')

    var NAICSFamCode = $('#' + NFC).val();
    if (NAICSFamCode.length == '4') {
        $('#AlertMsg').text('');


        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Search/GetNAICSFam",
            data: "{'Code': '" + NAICSFamCode + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                if (result.length > 0) {
                    $('#txtnaicsfamdesc_' + spl[1]).val(result[0]);
                    //$(".dis_able1").attr('disabled', 'disabled');
                    NAICS_mode = "NaicsFamCode";

                    //NaicsCode.push(NAICSFamCode);

                }
                else {
                    $(".NaicsFamCode").blur();
                    swal("", "No Data Found !");
                }



            },
            error: function ajaxError(err) {
                swal("", err);

            }
        });
        $('.AlertMsgNaics').text('');
    }
    else {
        $('.AlertMsgNaics').text('*** The NAICS Family Code should be exactly 4 Digits ! ***');
    }

});
//#################### NAICS Family code ####################===========//

$(document).on("click", ".add-textboxfam", function (e) {

    var Naics = $("#txtnaicsfamcode_2").val();

    if (Naics != "") {
        e.preventDefault();
        addnaicsfamily();
        //NaicsCode = [];
        //NaicsCode.push(Naics);
    }
    else {
        swal("", "Please enter at least one Naics family field !");
    }

});

//#################### Add NaicsFamily New fieds ####################===========//
function addnaicsfamily() {
    if (cntFam < maxFam) {
        cntFam++;

        var fillData = '<div class="naicsFam_' + cntFam + ' row NaicsFamRow" id="NaicsFamilyRow_' + cntFam + '">' +

            '<div class="col-md-3 dis_able0 s004">' +
            '<div class="input-group mb-3" style="width: 108%;">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnnaicsfamilyrowclear" id="btnnaicsfamrowclear_' + cntFam + '" data-toggle="tooltip" title="Click to clear the data in this row">' +
            '<i class="ti-close"></i>' +
            '</span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtnaicsfamcode_' + cntFam + '" class="DIS_002 form-control NaicsFamCode dis_able0" name="textbox" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NFC" data-toggle="tooltip" ></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-9">' +
            '<div class="row">' +
            '<div class="col-md-11">' +
            '<div class="input-group mb-3">' +
            '<input disabled type="text" id="txtnaicsfamdesc_' + cntFam + '" class="form-control lblnaicsFamdesc" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 NFD" data-toggle="tooltip" ></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-1">' +
            '<button id= "btnremovenaicssix_' + cntFam + '"  type="button" class="s022 btn   btn-sm remove-textboxfam B_s004" data-toggle="tooltip" title="Click here to delete rows)">' +
            '<i class="ti-minus" ></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $(".naicsincrFam").append(fillData);

    }
    set_Helpicon();
}
//#################### Add NaicsFamily New fieds ####################//
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ NAICS FAMIL CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++//



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PSC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

// #################### open PSC  #################### //
$(document).on("click", "#AddPCS", function (e) {
    e.preventDefault();
    
    cntpsc = 2;
    if (MarketContext_PSC.length > 0) {

        $('#txtpsccode_2').val(MarketContext_PSC[0].Code);
        $('#txtpscdesc_2').val(MarketContext_PSC[0].Description);

        for (var i = 1; i < MarketContext_PSC.length; i++) {
            addpsc();

            var PSCCodeCount = cntpsc;

            $('#txtpsccode_' + PSCCodeCount).val(MarketContext_PSC[i].Code);
            $('#txtpscdesc_' + PSCCodeCount).val(MarketContext_PSC[i].Description);
        }
    }
    $('#PscModal').modal('show');
    setTimeout(function () {
        $("#txtpsccode_2").focus();
    }, 1000);
});
// #################### open PSC  #################### //


// #################### Add PSC New fieds #################### //
function addpsc() {

    if (cntpsc < maxpsc) {
        cntpsc++;


        var filldata = '<div class="psc_' + cntpsc + ' row col-md-12 PSCRow" id="IDpsc_' + cntpsc + '">' +

            '<div class="col-md-3 s004">' +

            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text btnpscrowclear" id="btnpscrowclear_' + cntpsc + '" data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>' +
            '</div>' +
            '<input style="font-size: 13px;" type="text" id="txtpsccode_' + cntpsc + '" class="DIS_002 form-control PSCode dis_able1" name="textbox" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 PSCC" data-toggle="tooltip"></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-9">' +
            '<div class="row">' +
            '<div class="col-md-11">' +

            '<div class="input-group mb-3">' +
            '<input disabled type="text" id="txtpscdesc_' + cntpsc + '" class="form-control txtpsc" name="textbox" style="margin-bottom: 4px;" />' +
            '<div class="input-group-append">' +
            '<span class="input-group-text s001">' +
            '<i class="ti-info-alt infoIcon s002 PSCD" data-toggle="tooltip" ></i>' +
            '</span>' +
            '</div>' +
            '</div>' +
            ' </div>' +

            '<div class="col-md-1">' +
            '<button type="button" id="btnremovepsc_' + cntpsc + '" class="s022 btn btn-danger btn-sm dis_able1 B_s004 remove-textboxpsc" data-toggle="tooltip" title="Click here to Remove selected row">' +
            '<i class="ti-minus"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'

        $(".pscincr").append(filldata);
    }
    set_Helpicon();
}
// #################### Add PSC New fieds #################### //


// #################### Psc  code #################### //
$(document).on('keyup', '.PSCode', function () {

    var PSC = this.id;

    var spl = PSC.split('_');

    var PSCCodeval = $('#' + PSC).val();

    $('#AlertMsg').text('');
    $('.Apploader').show();

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Opportunity/GetPSC",
        data: "{'Code': '" + PSCCodeval + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

            if (result.length > 0) {
                $('#txtpscdesc_' + spl[1]).val(result[0]);

                PSC_mode = "PSCCode";
                //console.log(PSCCode);

            }
            else {
                $(".PSCode").blur();
                swal("", "No Data Found !", "info");
            }

            $('.Apploader').hide();

        },
        error: function ajaxError(err) {
            swal("", err);
            $('.Apploader').hide();
        }
    });



});
// #################### NAICS code #################### //

//=============================== Add ProductServiceCode New fieds ==========================================//


$(document).on('click', '#txtpsccode_1', function () {

    $('.add-textboxmodalpsc').trigger('click');

});

$(document).on("click", ".add-textboxmodalpsc", function (e) {
    $('#PscModal').modal('show');
    PSC_R = [];
    PSC_R = NaicsCode.slice();
    setTimeout(function () {
        $("#txtpsccode_2").focus();
    }, 1000);


    $('#PscModal').modal('show');


});


$(document).on("click", ".add-textboxpsc", function () {

    var Psc = $("#txtpsccode_2").val();

    if (Psc != "") {
        addpsc();
    }
    else {
        swal("", "Please enter at least one Naics family field !", "Info");
    }

});
$(document).on('click', '#btnpscrowclear_1', function () {
    $('.add-textboxmodalpsc').trigger('click');

});

//===============================  Add ProductServiceCode New fieds ==========================================//


//=============================== modal popup Psc close start ==========================================//
$(document).on("click", "#btnmdpscclose", function (e) {


    PSC = [];
    MC_PSCDesc = [];
    MC_PSCDesc.push({ Code: $('#txtpsccode_2').val(), Description: $('#txtpscdesc_2').val(), Type: 'PSC' });
    //============= Remove blank rows =========//
    var len = "";
    $(".PSCRow").get().forEach(function (entry, index, array) {
        // Here, array.length is the total number of items
        var i = index;
        var e = entry.id;
        var spl = e.split('_');

        var PS_Code = $('#txtpsccode_' + spl[1]).val();
        if (PS_Code == "" || PS_Code == undefined) {
            $('.psc_' + spl[1]).remove();
        }

        len = array.length;
        if (len == (i + 1)) {
            if ($('#txtpsccode_2').val() == "") {

                $('#txtpsccode_2').val($('#txtpsccode_' + spl[1]).val());
                $('#txtpscdesc_2').val($('#txtpscdesc_' + spl[1]).val());

                $('.psc_' + spl[1]).remove();
            }
        }

        MC_PSCDesc.push({ Code: $('#txtpsccode_' + spl[1]).val(), Description: $('#txtpscdesc_' + spl[1]).val(), Type: 'PSC' });

    });

    setTimeout(function () {

        $('.PSCRow').remove();
        $('#txtpsccode_2').val('');
        $('#txtpscdesc_2').val('');

        $('#PscModal').modal('toggle');

        BindPSC();
    }, 200);
    //============= Remove blank rows =========//
});

// #################### Bind PCS in list #################### //
function BindPSC() {

    var Mode = "Insert";
    if (MC_PSCDesc[0].Code != "") {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/Dashboard/InsertMarketContext",
            data: "{'MarketContext':" + JSON.stringify(MC_PSCDesc) + ", 'Mode':'" + Mode + "', 'MasterID':'" + MasterID + "', 'NaicsMode':''}",
            dataType: "json",
            async: false,
            success: function (result) {
                LoadData(MasterID);
            },
            error: function ajaxError(err) {
                swal("", err);
            }
        });
    }

}
// #################### Bind PSC in list #################### //


// #################### Bind Naics Code in list #################### //
$(document).on("click", ".MC_RemovePSC", function () {

    let MarketContext = {};
    var value = $(this).attr('id');
    var MarketContextID = $(this).parent().parent().attr('id');
    $(".MC_RemovePSC").tooltip('hide');
    MarketContext.Code = value;
    MarketContext.MarketContextID = MarketContextID;
    MarketContext.MasterID = MasterID;
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/RemoveMarketContext",
        data: "{'MarketContext':" + JSON.stringify(MarketContext) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            LoadData(MasterID);
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });

});

$(document).on("click", ".remove-textboxpsc", function () {
    //e.preventDefault();
    var getId = (this.id);
    var splitid = getId.split('_');
    var id = parseInt(splitid[1]);

    //var removeItem = $('#txtpsccode_' + id).val();
    //NaicsCode = jQuery.grep(NaicsCode, function (value) {
    //    return value != removeItem;
    //});

    $('#txtpsccode_' + id).val("");
    $('#txtpscdesc_' + id).val("");
    //$(this).parents(".naics").remove();
    $('.psc_' + id).remove();
    //cnt--;

});

$(document).on('click', '.btnpscrowclear', function () {

    var psc = this.id;
    var spl = psc.split('_');
    $('#txtpsccode_' + spl[1]).val("");
    $('#txtpscdesc_' + spl[1]).val("");
    PSC = [];

});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PSC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //


$(document).on("change", "#chkMC", function () {

    let MarketContext = {};
    MarketContext.MasterID = MasterID;
    MarketContext.Active = '';

    if (this.checked) {
        MarketContext.Active = 1;
    }
    else {
        MarketContext.Active = 0;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/UpdateMarketContextUseage",
        data: "{'MarketContext':" + JSON.stringify(MarketContext) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            GetMarketContextUseage();
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });
});


function GetMarketContextUseage() {

    let MarketContext = {}
    MarketContext.MasterID = MasterID;
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/Dashboard/GetMarketContextUseage",
        data: "{'MarketContext':" + JSON.stringify(MarketContext) + "}",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result[0].Active == "True") {
                $('.container input:checkbox').prop('checked', true);
            }
        },
        error: function ajaxError(err) {
            swal("", err);
        }
    });

}

//$(document).on("mouseover", ".NC", function (e) {
//    $(this).attr('title', 'This is a hover text.');
//});