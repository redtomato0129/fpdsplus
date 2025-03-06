var insertPeopleArray = [];
$(document).ready(function () {
    
    if (window.location.href.indexOf('CrmPeople/Index') != -1) {
        $("#gridSearch").show();
    }
    $('#peopleTable').on('click', 'td.dt-control', function (evt) {
      

        const openedActivities = $(this).hasClass("shown");
        const orgId = $(this).attr("orgId");
        /*    $(".container").load("AddActivities.html");*/

        $('.activities').remove();
        /*$('#DivPeople').children().addClass('activities');*/
        if (openedActivities) {
           // $('.Apploader').show();
            $(this).removeClass("shown");
            $(this).closest('tr').siblings().show();
            $(this).html(`<i class="fa fa-plus"></i>`);
          //  $('.Apploader').hide();
        }
        else {
          //  $('.Apploader').show();
          
            const data = "{'organizationId': " + parseInt(orgId) + "}";
            const url = "/CrmPeople/GetPeopleByOrganizationId";

            const result = AjaxPost(url, data);
            if (result && result.length > 0) {
                const len = result.length;

                let filldata = "";
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        filldata = filldata + peopleListRenderer(result[i])
                    }
                    $("#peopleListTableRenderer").html(filldata)
                    const html = '<tr orgId=' + orgId + ' class ="activities"><td colspan = 20><div>' + $('#DivPeople').html() + '</div></td></tr>';
                    $(this).addClass("shown");
                    $(this).html(`<i class="fa fa-minus"></i>`);
                    $(this).closest('tr').siblings().hide();
                    $(this).closest('tr').after(html);
                }
            } else {
                $("#peopleListTableRenderer").html(`<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>`);
                const html = '<tr orgId=' + orgId + ' class ="activities"><td colspan = 20><div>' + $('#DivPeople').html() + '</div></td></tr>';
                $(this).addClass("shown");
                $(this).html(`<i class="fa fa-minus"></i>`);
                $(this).closest('tr').siblings().hide();
                $(this).closest('tr').after(html);
            }
           
           
          
           // $('.Apploader').hide();

        }
    })

   /* $("#AddPeople").click(function () { 
      
    })*/
  
});

function peopleListRenderer(item) {

/*     <td style="max-width: 100px;text-overflow: ellipsis; overflow: hidden;">${item.city}</td>
               <td>${item.state}</td>
               <td style="max-width: 100px;text-overflow: ellipsis;overflow: hidden;">${item.zip_code}</td>*/
   return ` <tr>


               <td style="max-width: 150px;text-overflow: ellipsis; overflow: hidden;">${item.contact_name}</td>
               <td style="max-width: 150px;text-overflow: ellipsis;overflow: hidden;">${item.title}</td>
               <td>${item.phone}</td>
               <td style="max-width: 150px;text-overflow: ellipsis; overflow: hidden;">${item.email_address}</td>
             <td align="center"><i class="fas fa-edit" onclick="openEditOrganizationModal(${item.organization_id}, false, ${item.people_id})"></i></td>
           </tr>`
}

function addOrganizationModal() {
    $("#addOrganizationModal").modal('toggle')
    $("#peopleHtml").html('');
    $("#orgName").val('');
    $("#inputPhone").val('');
    $("#inputEmail4").val('');
    $("#inputAddress").val('');
    $("#inputCity").val('');
    $("#inputState").val('');
    $("#inputZip").val('');
    $("#inputUEI").val('');
    $("#inputCage").val('');
    $("#inputNotes").val('');
    insertPeopleArray = [];
    $("#poulateAddPeople").html('');
    addPeople("peopleHtml")

}

function closeOrgModal() {
    $("#addOrganizationModal").modal('hide');
    $("#peopleHtml").html('');
    insertPeopleArray = [];
    $("#poulateAddPeople").html('');
    $("#orgName").val('');
    $("#inputPhone").val('');
    $("#inputEmail4").val('');
    $("#inputAddress").val('');
    $("#inputCity").val('');
    $("#inputState").val('');
    $("#inputZip").val('');
    $("#inputUEI").val('');
    $("#inputCage").val('');
    $("#inputNotes").val('');
}

function addPeople(htmlId) {
    $(`#${htmlId}`).html(addPeopleRenderer( htmlId ));
    

}

function addPeopleRenderer(htmlId) {

    return `
<p > <em>To add contact, fill in minimum of name, title and email. </em></p>
<div class="row border p-2 mt-2" >
                                <div class="col-md-6 mb-3">
                                    <label for="contact_contactName" autocomplete="off" class="form-label">Contact Name <span style="color:red">*</span></label>
                                    <input type="text" class="form-control" id="contact_contactName" maxlength="100" name="contact_Name" autocomplete="contact_Name" >
                                </div>
                                <div class="col-md-6 mb-2">
                                    <label for="contact_inputTitle}" class="form-label">Title <span style="color:red">*</span></label>
                                    <input type="text" class="form-control" id="contact_inputTitle" maxlength="100"  name="contact_title" autocomplete="contact_title">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label for="contact_inputAddress" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="contact_inputAddress" maxlength="100" name="contact_title" autocomplete="contact_title">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label for="contact_inputContactCity" class="form-label">City</label>
                                    <input type="text" class="form-control" id="contact_inputContactCity" maxlength="20"  name="contact_city" autocomplete="contact_city">
                                </div>
                                <div class="col-md-2 mb-2">
                                    <label for="contact_inputContactState" class="form-label">State</label>
                                    <input type="text" class="form-control" id="contact_inputContactState" maxlength="5" name="contact_state" autocomplete="contact_state">
                                </div>
                                <div class="col-md-2 mb-2">
                                    <label for="contact_inputContactZip" class="form-label">Zip Code</label>
                                    <input type="text" class="form-control" id="contact_inputContactZip" maxlength="10" name="contact_zip" autocomplete="contact_zip">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label for="contact_inputPeoplePhone" class="form-label">Phone</label>
                                    <input type="text" class="form-control" id="contact_inputPeoplePhone" maxlength="20" name="contact_phone" autocomplete="contact_phone">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label for="contact_inputEmail" class="form-label">Email <span style="color:red">*</span></label>
                                    <input type="text" class="form-control" id="contact_inputEmail" maxlength="200" name="contact_email" autocomplete="contact_email">
                                </div>
                               
                              
                              

                                <div class="col-md-12 mb-3">
                                    <label for="contact_inputContactNotes" class="form-label">Notes</label>
                                    <textarea class="form-control" id="contact_inputContactNotes" rows="3" maxlength="500"  name="contact_notes" autocomplete="contact_notes"></textarea>
                                </div>
                                    <input type="hidden" id="contact_inputPeople" />
                                <div class="col-md-12 mb-3">
                                 ${htmlId ==="peopleHtml" ? ' <button class="btn dealbtn float-left" type="button" id="SaveOrganization" onclick="saveData()">Save</button>' :
                                    ' <button class="btn dealbtn float-left" type="button" id="EditOrganization" onclick="updateOrganizationData()">Save</button>'}
                                   <button class="btn dealbtn float-left ml-2" type="button" id="AddPeople" style="display:none" onclick="addPeople('${htmlId}')" >+ Add People</button>
                                </div>
                            </div>`;
}

function peopleListOrderRenderer(obj, divId) {
    return ` <li id="people_${obj.people_id}" class="tl-item" onclick="renderAddedPeople('${obj.people_id}','${divId}')">
                                        <div class="iconEmail"><i class="fa-solid fa-user"></i></div>
                                        <div class="msg_content">
                                            <div class="item-title" style="max-width: 400px;text-overflow: ellipsis; overflow: hidden;">${obj.contact_name}</div>
                                           
                                        </div>
                                    </li>`;
}

function renderAddedPeople(people_id, divId) {
    let item = "";
    //obj = JSON.parse(obj);
    for (let a in insertPeopleArray) {
        if (insertPeopleArray[a].people_id === parseInt(people_id)) {
            item = insertPeopleArray[a];
            break;
        }
    }
        $(`#contact_contactName`).val(item.contact_name);
        $(`#contact_inputTitle`).val(item.title);
        $(`#contact_inputEmail`).val(item.email_address);
        $(`#contact_inputPeoplePhone`).val(item.phone);
        $(`#contact_inputAddress`).val(item.address);
        $(`#contact_inputContactCity`).val(item.city);
        $(`#contact_inputContactState`).val(item.state);
        $(`#contact_inputContactZip`).val(item.zip_code);
        $(`#contact_inputContactNotes`).val(item.notes);
        $(`#contact_inputPeople`).val(item.people_id);
      
        $("#AddPeople").show()  
    

}

function saveData() {
    const organizationData = {
        name: $("#orgName").val(),
        phone: $("#inputPhone").val(),
        email_address: $("#inputEmail4").val(),
        address:  $("#inputAddress").val(),
        city : $("#inputCity").val(),
        state:  $("#inputState").val(),
        zip_code: $("#inputZip").val(),
        notes: $("#inputNotes").val(),
        uei: $("#inputUEI").val(),
        cage_code: $("#inputCage").val(),
    }
    if (!checkOrgValidation(organizationData)) {
        Swal.fire({
            icon: 'error',
            title: '',
            buttons: true,
            html: "Please fill in all required <span class='text-danger'>*</span> fields.",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        return
    }   
    const obj = {
        contact_name: $(`#contact_contactName`).val(),
        title: $(`#contact_inputTitle`).val(),
        email_address: $(`#contact_inputEmail`).val(),
        phone: $(`#contact_inputPeoplePhone`).val(),
        address: $(`#contact_inputAddress`).val(),
        city: $(`#contact_inputContactCity`).val(),
        state: $(`#contact_inputContactState`).val(),
        zip_code: $(`#contact_inputContactZip`).val(),
        notes: $(`#contact_inputContactNotes`).val(),
        people_id: $(`#contact_inputPeople`).val() ? parseInt($(`#contact_inputPeople`).val()) : 0
    }
    const peopleValidation = checkPeopleValidation(obj);
    const peopleArray = [];
    if (!peopleValidation) {
        Swal.fire({
            icon: 'error',
            title: 'People',
            buttons: true,
            html: "Please fill in all required <span class='text-danger'>*</span> fields.",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        return
    } else if (peopleValidation === "empty") {

    } else {
        peopleArray.push(obj)
    }

    var data = "{organization:" + JSON.stringify(organizationData) + "}";
    var url = "/CrmPeople/AddOrganization";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {
        //alert(' Please check your email and verify your account ');
        var data = "{'pageNo': 0,'pageSize':9}";
        var url = "/CrmPeople/GetOrganizationList";

        var result = AjaxPost(url, data);
        if (result && result.records.length > 0) {
            var len = result.records.length;

            if (len > 0) {
                const organizationId = result.records[0].organization_id;
                if (peopleArray.length != 0) {
                    
                    peopleArray.forEach(item => {
                        item.organization_id = organizationId
                    })
                    savePeople(peopleArray, "add")
                } else {
                    fetchOrganizationList();
                    closeOrgModal();

                    openEditOrganizationModal(organizationId)
                    swal.fire({
                        title: "People",
                        text: "Added",
                        type: "success",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    
                }
            }
        }
       
    }
    else if (result.response == "fail") {
        swal.fire({
            title: "People",
            text: result.error,
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }
    else {
        swal.fire(result);
    }


}
function savePeople(peopleArray, modal) {
    var data = JSON.stringify(peopleArray);
   
    var url = "/CrmPeople/AddPeople";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {
        fetchOrganizationList();
                
        if (modal == "edit") {
            openEditOrganizationModal(parseInt(peopleArray[0].organization_id), true)
           // $("#peopleHtmlEdit").html('');
          //  $("#EditOrganizationModal").modal('hide');
            swal.fire({
                title: "People",
                text: "Updated",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        } else {
            $("#addOrganizationModal").modal('hide');
            openEditOrganizationModal(parseInt(peopleArray[0].organization_id))
            $("#peopleHtml").html('');
            swal.fire({
                title: "People",
                text: "Added",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
        }
          
          
       

    }
    else{
        swal.fire({
            title: "People",
            text: result.error,
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }
}

function fetchOrganizationList(searchText = "", pageNo=0) {
    $('#pagingPeopleUL').twbsPagination('destroy');
    var data = searchText ? "{'keyword':'" + searchText + "', 'pageNo':" + pageNo + ",'pageSize':9}" : "{'pageNo':" + pageNo + ",'pageSize':9}";
    var url = "/CrmPeople/GetOrganizationList";

    var result = AjaxPost(url, data);
    if (result && result.records.length > 0) {
        var len = result.records.length;
      
        var filldata = "";
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                filldata = filldata + organizationListRenderer(result.records[i])
            }
            $("#organizationDataRenderer").html(filldata)
        } else {
            $('#organizationDataRenderer').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
        }
        GeneratePaging(searchText, result.pagesCount, pageNo)
    } else {
        $('#organizationDataRenderer').html("<tr><td  style='text-align: center;'' colspan='15'>  No record. </td></tr>");
    }
    
}

function GeneratePaging(searchKeyword, pagesCount, currentPage) {
    $('#pagingPeopleUL').twbsPagination({
        totalPages: pagesCount,
        startPage: currentPage + 1,
        visiblePages: 3,
        initiateStartPageClick: false,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            //fetch content and render here
            fetchOrganizationList(searchKeyword, page - 1)
        }
    });
   /* var html = "";
    if (currentPage == 1) {
        html += '<li class="page-item disabled"> <a class="page-link" href="#" tabindex="-1"> Previous</a> </li > ';
    }
    else {
        html += '<li class="page-item"  onclick=fetchOrganizationList("' + searchKeyword + '",' + (currentPage - 1) + ')> <a class="page-link" href = "#" tabindex = "-1"> Previous</a> </li> ';
    }

    for (var i = 0; i < pagesCount; i++) {
        var pageNo = i + 1;
        if (currentPage == pageNo) {
            html += ' <li class="page-item active"><a class="page-link" href="#">' + pageNo + '</a></li>'
        }
        else {
            html += ' <li onclick=fetchOrganizationList("' + searchKeyword + '",' + pageNo + ') class="page-item"><a class="page-link" href="#">' + pageNo + '</a></li>'
        }

    }

    if (currentPage == pagesCount) {
        html += '<li class="page-item disabled" > <a class="page-link" href = "#" > Next</a ></li> ';
    }
    else {
        html += '<li class="page-item" onclick=fetchOrganizationList("' + searchKeyword + '"",' + (currentPage + 1) + ')> <a class="page-link" href = "#" > Next</a ></li>';
    }



    $("#pagingPeopleUL").html(html);*/



}

function OnPeopleSearch(event) {
   /* if (event.keyCode === 13) {
        var searchKeyword = event.currentTarget.value;
        fetchOrganizationList(searchKeyword);
    }*/

    var searchKeyword = event.currentTarget.value;
    if (searchKeyword.length > 2) {

        fetchOrganizationList(searchKeyword);
    } else if (searchKeyword.length == 0) {
        fetchOrganizationList();
    }
}

function organizationListRenderer(data) {
    /*   < td > ${ data.address }</td >
                            <td>${data.city}</td>
                            <td>${data.state}</td>
                            <td>${data.zip_code}</td> */
    return `
  <tr>
                            <td orgId="${data.organization_id}" class="dt-control"><i class="fa fa-plus"></i></td>
                            <td>${data.name}</td>
                            <td>${data.phone}</td>
                            <td>${data.email_address}</td>
                       
                            <td align="center"><i class="fas fa-edit" onclick="openEditOrganizationModal(${data.organization_id})" ></i></td>
                        </tr>`
}


function openEditOrganizationModal(id, isModalOpen=false, peopleId = 0) {
    $("#poulateEditPeople").html("");
    var data = "{'organizationId': " + parseInt(id) + "}";
    var url = "/CrmPeople/GetOrganizationById";

    var result = AjaxPost(url, data);
    if (result && result.length > 0) {
        var len = result.length;

        
        if (len > 0) {
            const orgData = result[0];
            $("#editOrgId").val(orgData.organization_id)
            $("#orgNameEdit").val(orgData.name);
            $("#inputPhoneEdit").val(orgData.phone);
            $("#inputEmailEdit").val(orgData.email_address);
            $("#inputAddressEdit").val(orgData.address);
            $("#inputCityEdit").val(orgData.city);
            $("#inputStateEdit").val(orgData.state);
            $("#inputZipEdit").val(orgData.zip_code);
            $("#inputNotesEdit").val(orgData.notes);
           /* $("#inputUEIEdit").val(orgData.uei);
            $("#inputCageEdit").val(orgData.cage_code);*/
            insertPeopleArray=[]
            if (!isModalOpen) {
                $("#EditOrganizationModal").modal("toggle");
            }
            var data = "{'organizationId': " + parseInt(orgData.organization_id) + "}";
            var url = "/CrmPeople/GetPeopleByOrganizationId";

            var result = AjaxPost(url, data);
            if (result && result.length > 0) {
                var len = result.length;

               
                if (len > 0) { 
                   
                    for (var i = 0; i < len; i++) {
                        const obj = {
                            id: i,
                            contact_name: result[i].contact_name,
                            title: result[i].title,
                            email_address: result[i].email_address,
                            phone: result[i].phone,
                            address: result[i].address,
                            city: result[i].city,
                            state: result[i].state,
                            zip_code: result[i].zip_code,
                            notes: result[i].notes,
                            isInserted: false,
                            people_id: result[i].people_id

                        }
                        $("#poulateEditPeople").append(peopleListOrderRenderer(obj, "peopleHtmlEdit"))
                        insertPeopleArray.push(obj)

                    }
                 
                }
                addPeople("peopleHtmlEdit");
            } else {
                addPeople("peopleHtmlEdit");
            }
            if (peopleId) {
                $(`#people_${peopleId}`).click();

            }
        }
    }
  
}

function checkOrgValidation(obj) {
    //&& obj.city && obj.state && obj.address && obj.zip_code
    return obj.name && obj.email_address ? true : false;
}

function checkPeopleValidation(obj) {
    let hasField = false;
    for (const property in obj) {
        if (obj[property]) {
            hasField = true;
            break;
        }
    }
    if (!hasField) {
        return "empty"
    } else {
        return obj.contact_name && obj.title && obj.email_address ? true : false;
    }

    return false
   // return obj.name && obj.email_address && obj.city && obj.state && obj.address && obj.zip_code ? true : false;
}

function updateOrganizationData() {
    const organizationData = {
        organization_id: $("#editOrgId").val(),
        name: $("#orgNameEdit").val(),
        phone: $("#inputPhoneEdit").val(),
        email_address: $("#inputEmailEdit").val(),
        address: $("#inputAddressEdit").val(),
        city: $("#inputCityEdit").val(),
        state: $("#inputStateEdit").val(),
        zip_code: $("#inputZipEdit").val(),
        notes: $("#inputNotesEdit").val(),
       /* uei: $("#inputUEIEdit").val(),
        cage_code: $("#inputCageEdit").val(),*/
    }
    const orgValidation = checkOrgValidation(organizationData);
    if (!orgValidation) {
        Swal.fire({
            icon: 'error',
            title: '',
            buttons: true,
            html: "Please fill in all required <span class='text-danger'>*</span> fields.",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        return
    }
    const peopleArray = [];
    const obj = {
        contact_name: $(`#contact_contactName`).val(),
        title: $(`#contact_inputTitle`).val(),
        email_address: $(`#contact_inputEmail`).val(),
        phone: $(`#contact_inputPeoplePhone`).val(),
        address: $(`#contact_inputAddress`).val(),
        city: $(`#contact_inputContactCity`).val(),
        state: $(`#contact_inputContactState`).val(),
        zip_code: $(`#contact_inputContactZip`).val(),
        notes: $(`#contact_inputContactNotes`).val(),
        people_id: $(`#contact_inputPeople`).val() ? parseInt($(`#contact_inputPeople`).val()) : 0
    }
    const peopleValidation = checkPeopleValidation(obj);
    if (!peopleValidation) {
        Swal.fire({
            icon: 'error',
            title: 'People',
            buttons: true,
            html: "Please fill in all required <span class='text-danger'>*</span> fields.",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        return
    } else if (peopleValidation === "empty") {

    } else {
        peopleArray.push(obj)
    }
    var data = "{organization:" + JSON.stringify(organizationData) + "}";
    var url = "/CrmPeople/AddOrganization";

    var result = AjaxPost(url, data);
    if (result.response == "Success") {
          
        if (peopleArray.length != 0) {
            const organizationId = parseInt($("#editOrgId").val())
            peopleArray.forEach(item => {
                item.organization_id = organizationId
            })
            savePeople(peopleArray, "edit")
        } else {
            fetchOrganizationList();
            openEditOrganizationModal(parseInt($("#editOrgId").val()),true)
            swal.fire({
                title: "People",
                text: "Updated",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            })
           /* $("#addOrganizationModal").modal('hide');
            $("#EditOrganizationModal").modal('hide');
            $("#peopleHtml").html('');
            $("#peopleHtmlEdit").html('');*/
        }
    }
    else if (result.response == "fail") {
        swal.fire({
            title: "People",
            text: result.error,
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }
    else {
        swal.fire(result);
    }
}

function closeEditOrgModal() {
    $("#peopleHtmlEdit").html('');
    insertPeopleArray = [];
    $("#poulateEditPeople").html('');
    $("#EditOrganizationModal").modal("toggle")
}

function openAttchViewPeopleModal(dealId) {

    var data = "{dealId:" + dealId + "}";
    var result = AjaxPost("/CrmPeople/GetDealPeopleOrganization", data);
    if (result && result.length != 0) {
        var peopleList = result;
        const date = new Date(peopleList[0].deal_rfp_release_date);
        peopleList[0].deal_rfp_release_date =
            ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

        $("#dueDatePeople").html("&nbsp;&nbsp; | &nbsp;" + peopleList[0].deal_rfp_release_date)
        $("#statusPeople").html("&nbsp;&nbsp; | &nbsp;" + peopleList[0].deal_status)
        $("#titleStatusPeople").html(peopleList[0].deal_title)


        let fillData = '';
        for (var i = 0; i < peopleList.length; i++) {
            fillData = fillData + viewPeopleModelPeopleRenderer(peopleList[i])
        }
        $("#peopleListRender").html(fillData)
        $("#viewPeopleModal").modal('toggle');
        clickEventsPeople()
        //$('#errregemail').hide();
    }
    else {
        let fillData = `<div style = "display:flex;
        justify-content: center;
        align-items: center;
        width:100 %;
        font-size: 20px;
">No data to display</div> `;
        $("#peopleListRender").html(fillData)
        $("#viewPeopleModal").modal('toggle');
        /*   swal.fire({
               title: "Deal",
               text: "Something went wrong",
               type: "error",
               showCancelButton: false,
               showConfirmButton: false,
               timer: 3000,
           })*/
        //$('#errregemail').show();

    }
}

function clickEventsPeople() {
    $(".people-load").click(function () {
        const id = $(this).attr("people_id");

        const elemId = "#people_" + id
        $(elemId).toggle();

        /*  if ($(`${elemId}:visible`).length)
              $(elemId).hide();
          else
              $(elemId).show();*/



    });

}


function viewPeopleModelPeopleRenderer(obj) {
    return ` <div class="comment__sec ">
                                    <div class="item-icon item-peopleIcon"></div>
                                    <div class="companyblock">
                                        <div class="main_header">
                                            <div class="nameblock">

                                                <div class="text">
                                                    <h2  style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 150px;">${obj.people_contact_name}</h2>
                                                
                                                </div>
                                            </div>
                                            <div class="nameblock" style="float:right">
                                            <div class="text d-flex align-items-center">
                                                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 150px;  color:green">${obj.relation_description}</h2>&nbsp; | &nbsp;
                                                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 200px;">${obj.people_email}</h2>&nbsp; | &nbsp;
                                                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 120px;"> ${obj.people_phone}</h2>&nbsp; | &nbsp;
                                                    <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 100px;">${obj.people_address}</h2>
                                        </div>

                                            </div>
                                        </div>

                                        <div class="centerblock">
                                          ${obj.people_notes}
                                        </div>
                                       <!-- <hr>

                                        <div class="likeblock">
                                            <div class="likebtn d-flex justify-content-end">
                                              
                                            </div>
                                        </div> -->
                                        <hr>
                                        <div class="col-12">
                                                <div class="col-12 pd0">
                                                    <div class="comentico">
                                                       <i class="fa-solid fa-people-group"></i>
                                                        <div class="text">
                                                            <h4><button class="btn people-load" id="people_button_${obj.people_id}" people_id="${obj.people_id}">
                                                                View organization</button></h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div class="col-12 px-0 pb-2">
                                              
                                                <div class="people-show" id="people_${obj.people_id}" style="display:none">
<div class="companyblock">
                                        <div class="main_header">
                                            <div class="nameblock">

                                                <div class="text">
                                                    <h2>${obj.organization_name}</h2>
                                                
                                                </div>
                                            </div>
                                            <div class="nameblock" style="float:right">
                                                <div class="text d-flex align-items-center">
                                            <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 200px;">${obj.organization_email}</h2>&nbsp; | &nbsp;
                                            <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 200px;"> ${obj.organization_phone}</h2>&nbsp; | &nbsp;
                                            <h2 style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;max-width: 200px;"> ${obj.organization_address}</h2>
                                        </div>
                                              
                                            </div>
                                        </div>

                                        <div class="centerblock">
                                          ${obj.organization_notes}
                                        </div>
                                      
                                       
                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

`
}

function closePeopleModal() {

    $("#viewPeopleModal").modal('toggle');
    $("#peopleListRender").html('')
}


function openAttchPeopleModal(id, title, status, rfpDate) {
    fetchOrganizationList();
    var result = AjaxPost("/CrmPeople/GetRelationshipList", "{}");
    if (result) {


        if (result.length > 0) {
            let html = '<option selected disabled="disabled">Please Choose one</option>';
            $.each(result, function (i, item) {
                html = html + `<option value="${item.relationship_id}">${item.description}</option>`

            });
            $('#inputRelationShip').html(html)
            $('#dealAttachInput').val(id);
            $("#dueDateAttachPeople").html("&nbsp;&nbsp; | &nbsp;" + rfpDate)
            $("#statusAttachPeople").html("&nbsp;&nbsp; | &nbsp;" + status)
            $("#titleStatusAttachPeople").html(title)
            // $("#titleDeal").val(title)
            $('#attachPeopleModal').modal('toggle');
        }

    }

}


function closeAttachPeopleModal() {
    $('#attachPeopleModal').modal('hide');
    $('#inputRelationShip').html("")
    $('#peopleSearchInput').val('');
    // $("#titleDeal").val("")
}

function attachPeopleToDeal() {
    //const titleDeal = $("#titleDeal").val();
    const relationship = $("#inputRelationShip").val();
    const peopleSearch = selectedPeople;

    if (!relationship || !peopleSearch) {
        swal.fire({
            title: "Deal",
            text: "All fields are mandatory",
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        return
    }

    const attchDealInfo = {
        "deal_id": parseInt($('#dealAttachInput').val()),
        "people_id": peopleSearch.people_id,
        "user_id": parseInt($('#userid').val()),
        "relationship_id": parseInt(relationship),
        "organization_id": peopleSearch.organization_id,

    };

    var data = "{deal_people_organization:" + JSON.stringify(attchDealInfo) + "}";
    var result = AjaxPost("/CrmPeople/AddDealPeopleOrganization", data);
    if (result.response == "Success") {
        $('#peopleSearchInput').val('');
        swal.fire({
            title: "Deal",
            text: "People assigned to deal",
            type: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        $('#attachPeopleModal').modal('hide');

        //$('#errregemail').hide();
    }
    else {
        swal.fire({
            title: "Deal",
            text: "Something went wrong",
            type: "error",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        //$('#errregemail').show();

    }

}
