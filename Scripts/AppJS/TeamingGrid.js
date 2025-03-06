$(document).ready(async () => {
    try {
        $("#loader").show();
        const formData = await fetchTeamingFormData();
        const activeForm = await fetchTeamingActiveForm(1);
        const headers = [];
        activeForm.records.forEach(item => {
            headers.push({
                id: item.wizard_teaming_question_id,
                name: item.list_question_name,
                type: item.response_type,
                col: item.class_col,
                isHeader: item.isHeader
            })
        })

        let tbodyHtml = '';
        formData.records.forEach((item, index) => {
            let headerField = '';
            const formDataObject = JSON.parse(item.form_data);
            for (let a in headers) {
                if (formDataObject[headers[a].id] && headers[a].isHeader) {
                    headerField = formDataObject[headers[a].id].value
                    break;
                }
            }
            tbodyHtml = tbodyHtml + `
		<div class="row p-1 mx-3 fpds__heading justify-content-between align-items-end">
			<h4 style="font-size: 15px;"><strong >${headerField}</strong></h4>
            <button type="button" class="btn modalBtn"
            onclick="showModal('${item.wizard_teaming_form_data_id}')">
              Contact Information
            </button>
		</div> 

		<div class="row mx-3 mb-2 py-3 company__row">`
            for (let a in headers) {
                if (formDataObject[headers[a].id] && !headers[a].isHeader) {
                    let html = '';
                    if (headers[a].type == 'text' || headers[a].type == "checkbox" || headers[a].type == "radio") {
                        html = formDataObject[headers[a].id].value;
                    } else if (headers[a].type == "radio-group") {
                        html = html + "<ul>"
                        formDataObject[headers[a].id].value.forEach(item => {
                            item=item.replace('Unknown', 'Unk');                      
                            item=item.replace('No', ' No ');                      
                            item=item.replace('Yes', ' Yes ');                      
                            let temp = item.replaceAll('|', ': ')
                            html = html + `<li>${temp}</li>`
                        })
                        html = html + "</ul>"
                    }
                    //tbodyHtml = tbodyHtml + `<div class="col-4 ${['0', '1', '2'].includes(a) ? '' :'pb-5'} ">
                    tbodyHtml = tbodyHtml + `<div class="${headers[a].col}">
                     <div class="corporate__info"><div class="corporate__title">
						<strong>${headers[a].name}</strong>
					</div><div class="corporate__descp">
						${html}
					</div></div></div>`
                }
            }
            tbodyHtml = tbodyHtml + '</div>';
            $("#HTMLRenderer").html(tbodyHtml)
          
          
        })
        $("#loader").hide();
    } catch (error) {
        console.log(error)
        $("#loader").hide();
    }
})
async function showModal(id) {
    const formData = await fetchModalData(id);
    const activeForm = await fetchTeamingActiveForm(0);
  
    const headers = [];
    activeForm.records.forEach(item => {
        headers.push({
            id: item.wizard_teaming_question_id,
            name: item.list_question_name,
            type: item.response_type,
            col: item.class_col,
            isHeader: item.isHeader
        })
    });
    let tbodyHtml = '';
    $("#modalRenderer").html(tbodyHtml)
    formData.records.forEach((item, index) => {
        const formDataObject = JSON.parse(item.form_data);
        for (let a in headers) {
            if (formDataObject[headers[a].id] && !headers[a].isHeader) {
                let html = '';
                if (headers[a].type == 'text' || headers[a].type == "checkbox" || headers[a].type == "radio") {
                    html = formDataObject[headers[a].id].value;
                } else if (headers[a].type == "radio-group") {
                    html = html + "<ul>"
                    formDataObject[headers[a].id].value.forEach(item => {

                        let temp = item.replaceAll('|', ': ')
                        html = html + `<li>${temp}</li>`
                    })
                    html = html + "</ul>"
                }
                //tbodyHtml = tbodyHtml + `<div class="col-4 ${['0', '1', '2'].includes(a) ? '' :'pb-5'} ">
                tbodyHtml = tbodyHtml + `	<div class="modal__title">
							<strong>${headers[a].name}</strong>
						</div>
						<div class="modal__desc pb-3">
							${formDataObject[headers[a].id].value}
						</div>`
            }
        }
        tbodyHtml = tbodyHtml + '</div>';
      
        
    })
    $("#modalRenderer").html(tbodyHtml)

    $('#exampleModalCenter').modal('toggle');
}

async function fetchModalData(id) {    
    const body = JSON.stringify({ show_grid: 0, wizard_teaming_form_data_id:parseInt(id) });
    const response = await fetch('/Teaming/GetTeamingListModalData', {
        method: "POST",
        body, headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json();
    return json;
}
async function fetchTeamingFormData() {
  
    const response = await fetch('/Teaming/GetTeamingFormData', { method: "POST", data: {}, enctype: 'multipart/form-data', });
    const json = await response.json();
    return json;
}
async function fetchTeamingActiveForm(flag) {
    const body = JSON.stringify({ show_grid: flag });
    const response = await fetch('/Teaming/GetTeamingListQuestionDetail', {
        method: "POST",
        body, headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json();
    return json;
}
