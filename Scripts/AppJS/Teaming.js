$(document).ready(() => {
    fetchTeamingActiveForm()
})

function fetchTeamingActiveForm() {

    const payload = "{}";
    const url = "/Teaming/GetTeamingQuestionDetail";
    const result = AjaxPost(url, payload);
    const data = result.records;
    const len = data.length;

    if (len > 0) {
        $("#heading").html(data[0].title)
        $("#survey-form").attr("form-id", data[0].wizard_teaming_question_id)
        let html = "";
        for (let i = 0; i < len; i++) {
            html = html+ htmlRenderer(data[i],i)
        }
        $("#htmlRender").html(html)
    }

}

function htmlRenderer(obj,index) {
    let html = "";
    switch (obj.response_type) {
        case 'text':
            html = `<div class="col-md-12 field-box">
				<div class="form-group" type="${obj.response_type}" question_id="${obj.wizard_teaming_question_id}">
					<label id="${obj.question_name}-label" for="${obj.wizard_teaming_question_id}">${obj.question_name} ${obj.required ? `<span class="required_star" >*</span>` : ''}</label >
                    ${obj.description ?`<p>${obj.description}</p>`:''}
					<input type="text" name="${obj.question_name}" id="${obj.wizard_teaming_question_id}" placeholder="Your answer" class="form-control" ${obj.required ?'required':''}>
					<div class="error-message">
						This is a required question
					</div>
				</div>
			</div>`;
            break;
        case 'checkbox':
            let checkboxOptionRenderer = '';
            obj.response_data.split('|').forEach((item,itemIndex) => {
                checkboxOptionRenderer = checkboxOptionRenderer +`<div class="custom-control custom-checkbox">
						<input type="checkbox" class="custom-control-input" name="${obj.question_name}" value="${item}" id="${index}_${itemIndex}" >
						<label class="custom-control-label" for="${index}_${itemIndex}">${item}</label>
                        ${item.includes('Other') ? `<input type="text" otherId="${index}_${itemIndex}" name="Other:" value="" id="${index}${item}input" class="other__input" onkeyup="otherInputHanlde(event)" >`:''}
					</div>`
            })
            html =`<div class="col-md-12 field-box">
				<div class="form-group  ${ obj.required ?'required':''}" type="${obj.response_type}" question_id="${obj.wizard_teaming_question_id}">
					<label>${obj.question_name}  ${obj.required ? `<span class="required_star" >*</span>` : ''}</label>
                    ${obj.description ? `<p>${obj.description}</p>` : ''}
                  ${checkboxOptionRenderer}
					<div class="error-message">
						This is a required question
					</div>
				</div>
			</div>`
            break;
        case 'radio':
            let radioOptionRenderer = '';
            obj.response_data.split('|').forEach(item => {
                radioOptionRenderer = radioOptionRenderer + `<div class="custom-control custom-radio ">
						<input type="radio" id="radioOption${index}${item}" value="${item}" name="customRadioInline${index}" class="custom-control-input">
						<label class="custom-control-label" for="radioOption${index}${item}">${item}</label>
					</div>`
            })
            html =`<div class="col-md-12 field-box">
				<div class="form-group ${ obj.required ? 'required' : ''}" type="${obj.response_type}" question_id="${obj.wizard_teaming_question_id}">
					<label>${obj.question_name}  ${obj.required ? `<span class="required_star" >*</span>` : ''}</label>
					${radioOptionRenderer}
					<div class="error-message">
						This is a required question
					</div>
				</div>
			</div>`
            break;
        case 'radio-group':
            let radioGroupRenderer = "<table class='small__bus table table-borderless'>";
            obj.response_data = JSON.parse(obj.response_data);
            let headers = '<thead><tr><td></td>';
            obj.response_data.heading.forEach(item => {
                headers = headers + `<td>${item}</td>`
            })
            headers = headers+'</tr></thead>'
            let body = "<tbody>";
            obj.response_data.radioLable.forEach((item,indexRadio) => {
                body = body + `<tr><td>${item}</td>`
                let radioButtonRender = '';
                for (let i = 0; i < obj.response_data.heading.length; i++) {
                    radioButtonRender = radioButtonRender + `<td><div class="custom-control custom-radio ">
						<input type="radio" id="radioOption${i}${item}" value="${obj.response_data.heading[i]}|${item}" name="customRadioInline${indexRadio}" class="custom-control-input">
						<label class="custom-control-label" for="radioOption${i}${item}"></label>
					</div></td>`
                }
                body = body + radioButtonRender +'</tr>'
            })
            body = body +"</tbody>"
            radioGroupRenderer = radioGroupRenderer+headers+body+'</table>'
            html = `<div class="col-md-12 field-box">
				<div class="form-group ${ obj.required ? 'required' : ''}" type="${obj.response_type}" question_id="${obj.wizard_teaming_question_id}">
					<label>${obj.question_name}  ${obj.required ? `<span class="required_star" >*</span>` : ''}</label>
			           ${radioGroupRenderer}
					<div class="error-message">
						This is a required question
					</div>
				</div>
			</div>`;
            break;

    }
    return html
}

function otherInputHanlde(event) {
    const id = `#${event.currentTarget.getAttribute("otherid")}`
    $(`${id}`).prop('checked', true);
}

function submitData() {
    if (validateField()) {
        const form_data = JSON.stringify(createPayLoad());
        $.ajax({
            type: "POST",
            data: { form_data, wizard_teaming_id: $("#survey-form").attr('form-id') },
            enctype: 'multipart/form-data',
            url: "/Teaming/InsertTeamingForm",
            success: function (result) {
                result = jQuery.parseJSON(result);
                document.location = 'Index';
            },
            error: function (error) {
                //debugger
            }
        });
    }
}

function validateField() {
    let flag = true;
    const requiredFields = [];
    $("*div[type]").each(function () {
        const question_id = $(this).attr('question_id');
        if (!question_id) {
            return;
        } 
        if ($(`div[question_id='${question_id}']div[type='text']  input[type="text"]`).length != 0) {
            if ($(`div[question_id='${question_id}'] input[type="text"]`).prop('required')
                && $(`div[question_id='${question_id}'] input[type="text"]`)[0].style.display != "none") {
                if (!$(`div[question_id='${question_id}'] input[type="text"]`)[0].value) {
                    requiredFields.push($(`div[question_id='${question_id}'] label`).html())
                }
            }
        } else if ($(`div[question_id='${question_id}']div[type='checkbox'] input[type="checkbox"]`).length != 0) {
            if ($(`div[question_id='${question_id}']`).hasClass('required')
                && $(`div[question_id='${question_id}'] input[type="checkbox"]`)[0].style.display != "none") {
              
                if (!$(`div[question_id='${question_id}'] input[type="checkbox"]:checked`).length) {
                    
                    requiredFields.push($(`div[question_id='${question_id}'] label`).html())
                }
            }
        } else if ($(`div[question_id='${question_id}']div[type='radio'] input[type="radio"]`).length != 0) {
            if ($(`div[question_id='${question_id}']`).hasClass('required')
                && $(`div[question_id='${question_id}'] input[type="radio"]`)[0].style.display != "none") {

                if (!$(`div[question_id='${question_id}'] input[type="radio"]:checked`).length) {

                    requiredFields.push($(`div[question_id='${question_id}'] label`).html())
                }
            }
        } else if ($(`div[question_id='${question_id}']div[type='radio-group'] input[type="radio"]`).length != 0) {
            if ($(`div[question_id='${question_id}']`).hasClass('required')
                && $(`div[question_id='${question_id}'] input[type="radio"]`)[0].style.display != "none") {

                if ($(`div[question_id='${question_id}'] input[type="radio"]:checked`).length!=3) {

                    requiredFields.push($(`div[question_id='${question_id}'] label`).html())
                }
            }
        }
    });

    if (requiredFields.length != 0) {
        let html = ""
        requiredFields.forEach(item => {
            html = html + item + ', '
        })
        html = html.replace(/,\s*$/, "");
        Swal.fire({
            icon: 'error',
            title: '',
            buttons: true,
            html: `Please fill in all required <span class='text-danger'>*</span> fields (${html}).`,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
        })
        flag = false

    }
    return flag;
}

function createPayLoad() {
    const obj = {};
    $("*div[type]").each(function () {
        const fieldType = $(this).attr('type');
        const question_id = $(this).attr('question_id');
        switch (fieldType) {
            case 'text':
                obj[question_id] = {
                    value: $(`div[question_id='${question_id}'][type='text'] input[type="text"]`)[0].value,
                    type: fieldType
                };
                break;
            case 'checkbox':
                const checkboxValue =[];
                $(`div[question_id='${question_id}'][type='checkbox'] input[type='checkbox']:checked`).each(function () {
                   checkboxValue.push($(this).val())
                })
                obj[question_id] = {
                    value: checkboxValue,
                    type: fieldType
                };
                break;
            case 'radio':
                obj[question_id] = {
                    value: $(`div[question_id='${question_id}'][type='radio'] input[type="radio"]:checked`)[0].value,
                    type: fieldType
                };
                break;
            case 'radio-group':
                const radioGroupValue = [];
                $(`div[question_id='${question_id}'][type='radio-group'] input[type='radio']:checked`).each(function () {
                    radioGroupValue.push($(this).val())
                })
                obj[question_id] = {
                    value: radioGroupValue,
                    type: fieldType
                };
                break;

        }
    });
    console.log(obj)
    return obj
}

