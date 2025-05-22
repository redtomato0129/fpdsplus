$(document).ready(() => {
	localStorage.setItem('answerWidgetPage3Url', document.location.href);
	$("#searchNameInput").on("input", function () {
		const value = this.value
		if (value) {
			$("#saveSearchButton").prop("disabled",false)
		}

	})
	fetchQuestionParams();
	$(document).on('click', '.btnpscclear', function () {
		$('.rowPSC').val('');
	});
})

function saveSearchModal() {
	if (validateField()) {
		$("#exampleModal").modal("show")
		$("#saveSearchButton").prop("disabled", true)
		$("#searchNameInput").val("")
		//$("#exampleModal").modal("hide")
	}
}

function saveSearch() {
	if (validateField()) {
		const localStorageFields = {};
		const urlParams = new URLSearchParams(window.location.search);
		const question_id = urlParams.get('id') 
		const category = encodeURIComponent(urlParams.get('category'))
		let queryParam = `?question_id=${question_id}&&category=${category}`;

		const obj = createLocalStorageAndQueryParam(localStorageFields, queryParam)
		console.log(obj.localStorageFields, JSON.stringify(obj.localStorageFields))
		$.ajax({
			type: "POST",
			data: { search_results: JSON.stringify(obj.localStorageFields), question_id, search_name: $("#searchNameInput").val(), category },
			enctype: 'multipart/form-data',
			url: "/QuestionSearchHistory/AddSearchHistory",
			success: function (result) {
				result = jQuery.parseJSON(result);
				if (result.response == "Success") {
					swal.fire({
						title: "Search History",
						text: "Added",
						type: "success",
						showCancelButton: false,
						showConfirmButton: false,
						timer: 3000,
					})
					$("#exampleModal").modal("hide")
				}
				else {
					swal.fire({
						title: "Search History",
						text: "Something went wrong",
						type: "error",
						showCancelButton: false,
						showConfirmButton: false,
						timer: 3000,
					})
					//$("#exampleModal").modal("hide")
				}
			},
			error: function (error) { }
		});
		
		
	}
}

function renderSetAsideForFixedUI() {
	$('#tbody_Aside input').each(function () {
		if (OKSocioAside[0] && OKSocioAside[0].value.indexOf(this.value) != -1) {
			this.checked = true;
		}
	});
	$("#OKSocioAside").click();
}

function checkLocalStorage() {
	
	const fields = JSON.parse(localStorage.getItem("answerWidgetPage3Fields"));
	if (fields) {
		populateLocalStorageFields(fields)
	}	
}

let searchHistoryData = [];
function fetchSearchHistoryById(searchId) {
	$.ajax({
		type: "POST",
		data: { searchId },
		enctype: 'multipart/form-data',
		url: "/QuestionSearchHistory/GetSearchResultById",
		success: function (result) {
			result = jQuery.parseJSON(result);
			if (result.records && result.records != 0) {
				searchHistoryData = result.records[0];
				populateLocalStorageFields(JSON.parse(searchHistoryData.search_results))
			}
		},
		error: function (error) { }
	});
}

function populateLocalStorageFields(fields) {
	for (let key in fields) {
		switch (fields[key].fieldType) {
			case 'dropdown':
			case 'agency_name':
				$(`div[parentdiv='${key}'] select`)[0].value = fields[key].value;
				if (fields[key].name === "Business Size") {
					$(`div[parentdiv='${key}'] select`).trigger("change")
				}
				break;
			case 'text':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.value;
				break;
			case 'date':

				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.value;
				break;
			case 'naics':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.value;
				$(`div[parentdiv='${key}'] input`)[1].value = fields[key].value.description;
				if (key.includes("naics_family_code")) {
					setTimeout(() => {
						$(".naicsincrFam1 .btn-toggle_Naics")[0].click();

					}, 500)
				}
				break;
			case 'funding-sub-agency':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.description;
				$(`div[parentdiv='${key}'] label:last`).text(fields[key].value.value);
				break;
			case 'funding-agency':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.description;
				$(`div[parentdiv='${key}'] label:last`).text(fields[key].value.value);

				break;
			case 'funding-office':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.description;
				$(`div[parentdiv='${key}'] label:last`).text(fields[key].value.value);

				break;
			case 'vendor_uei':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.description;
				$(`div[parentdiv='${key}'] label:last`).text(fields[key].value.value);

				break;
			case 'set-aside':
			case 'set-aside-1':
			case 'set-aside-2':
				OKSocioAside = fields[key].OKSocioAside
				$('.OpenMinContSizeAside').val(OKSocioAside[0].text);
				$("#Res_totalSocio_Aside").css("display", "block");
				$('#lblRes_SocioAside').text(OKSocioAside.length - 1);
				break;
			case 'opportunity_type':
				OKOpportunityType = fields[key].OKOpportunityType
				$('.OpenMinOpportunityType').val(OKOpportunityType[0].text);
				$("#lblOpporttunityType_2").css("display", "block");
				$('#lblRes_OpportunityType').text(OKOpportunityType.length - 1);
				break;
			case 'project_list':
				$(`div[parentdiv='${key}'] select`)[0].value = fields[key].value.value;
				break;
			case 'text_clear':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.value;
				break;
			case 'company_name':
				$(`div[parentdiv='${key}'] input`)[0].value = fields[key].value.description;
				$(`div[parentdiv='${key}'] label:last`).text(fields[key].value.value);

				break;
			default:
				break;
		}
	}
}

function answerWidgetSocioAsideCheck() {
	
	const fields = typeof searchHistoryData == 'object' && searchHistoryData.search_results ?
		JSON.parse(searchHistoryData.search_results) : JSON.parse(localStorage.getItem("answerWidgetPage3Fields"));
	if (fields) {
		for (let key in fields) {
			if (fields[key].fieldType === "set-aside" || fields[key].fieldType === "set-aside-2" || fields[key].fieldType==="set-aside-1") {
			
				const values = fields[key].value.value.split(",")
				$('#tbody_Aside input').each(function () {
					if (values.indexOf(this.value) != -1) {

						this.checked = true;
					}
				});
				$("#OKSocioAside").click();
				break;
			}
		}
	}
}

function answerWidgetOpportunityTypeCheck() {

	const fields = typeof searchHistoryData == 'object' && searchHistoryData.search_results ?
		JSON.parse(searchHistoryData.search_results) : JSON.parse(localStorage.getItem("answerWidgetPage3Fields"));
	if (fields) {
		for (let key in fields) {
			if (fields[key].fieldType === "opportunity_type") {

				const values = fields[key].value.value.split(",")
				$('#tbody_OpportunityType input').each(function () {
					if (values.indexOf(this.value) != -1) {

						this.checked = true;
					}
				});
				$("#OkOpportunityType").click();
				break;
			}
		}
	}
}

function answerWidgetSocioCheck() {
	const fields = typeof searchHistoryData == 'object' && searchHistoryData.search_results ?
		JSON.parse(searchHistoryData.search_results) : JSON.parse(localStorage.getItem("answerWidgetPage3Fields"));
	if (fields) {
		for (let key in fields) {
			if (fields[key].name === "Socio-Economic Designation") {
				const values = fields[key].value.value.split(",")
				$('#tbody_Socio input').each(function () {

					//OKSocio.push({ value: this.value, text: this.id });
					if (values.indexOf(this.value) != -1) {
						console.log(this.value)
						this.checked = true;
					}
				});
				$("#OKSocio").click();
				break;
			}
		}
	}
}

var questionParamsResponse;
function fetchQuestionParams() {
	const urlParams = new URLSearchParams(window.location.search);
	console.log("urlParams: ", urlParams)
	const question_id = urlParams.get('id');
	const category = urlParams.get('category')
	$("#categoryQuestion").html(`<a href="${localStorage.getItem("answerWidgetPage2Url")}">${category.charAt(0).toUpperCase() + category.slice(1)} Question List</a>`)
	
	$.ajax({
		type: "POST",
		data: { question_id },
		enctype: 'multipart/form-data',
		url: "/AnswerWizard/GetQuestionParams",
		success: function (result) {
			result = jQuery.parseJSON(result);
			let html = "";
			if (result.records && result.records != 0) {
				questionParamsResponse = result.records;
				console.log(questionParamsResponse)
				$("#heading").html(`<strong>${questionParamsResponse[0].question_name}</strong>`)
				$("#sub_heading").html(`<strong>${questionParamsResponse[0].description}</strong>`)
				if (questionParamsResponse[0].ui_style == 'fixed') {

					const fields = [
						{ "wizard_question_parameter_id": 1, "question_id": questionParamsResponse[0].question_id, "parameter_id": 1, "required_field": 0, "parameter_name": "Solicitation #", "parameter_type": "text", "parameter_data": "", "parameter_query_param": "solicitation_number", "toggle_button": 0, parentInput:1 },
						{ "wizard_question_parameter_id": 2, "question_id": questionParamsResponse[0].question_id, "parameter_id": 2, "required_field": 1, "parameter_name": "NAICS", "parameter_type": "naics", "parameter_data": "", "parameter_query_param": "naics_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 3, "question_id": questionParamsResponse[0].question_id, "parameter_id": 3, "required_field": 1, "parameter_name": "Department", "parameter_type": "funding-agency", "parameter_data": "", "parameter_query_param": "agency_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 4, "question_id": questionParamsResponse[0].question_id, "parameter_id": 4, "required_field": 0, "parameter_name": "Agency", "parameter_type": "funding-sub-agency", "parameter_data": "", "parameter_query_param": "sub_agency_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 5, "question_id": questionParamsResponse[0].question_id, "parameter_id": 5, "required_field": 0, "parameter_name": "Set-Aside type", "parameter_type": "set-aside", "parameter_data": "", "parameter_query_param": "set_aside", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 6, "question_id": questionParamsResponse[0].question_id, "parameter_id": 6, "required_field": 1, "parameter_name": "Business Size", "parameter_type": "dropdown", "parameter_data": "All,OTSB,SB", "parameter_query_param": "business_size", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 7, "question_id": questionParamsResponse[0].question_id, "parameter_id": 7, "required_field": 0, "parameter_name": "Socio-Economic Designation", "parameter_type": "socio-ecnomic", "parameter_data": "", "parameter_query_param": "socio_economic_designation", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 8, "question_id": questionParamsResponse[0].question_id, "parameter_id": 8, "required_field": 1, "parameter_name": "# of Vendors", "parameter_type": "dropdown", "parameter_data": "Select, 5,10,15,20", "parameter_query_param": "total_vendors", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 9, "question_id": questionParamsResponse[0].question_id, "parameter_id": 9, "required_field": 1, "parameter_name": "Years", "parameter_type": "dropdown", "parameter_data": "1,2,3,4,5", "parameter_query_param": "Years", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 10, "question_id": questionParamsResponse[0].question_id, "parameter_id": 10, "required_field": 1, "parameter_name": "Min # of Prime Contracts", "parameter_type": "dropdown", "parameter_data": "1,5,10,20", "parameter_query_param": "minimum_number_of_contracts", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 11, "question_id": questionParamsResponse[0].question_id, "parameter_id": 11, "required_field": 1, "parameter_name": "Min Size of Prime Contract", "parameter_type": "dropdown", "parameter_data": "$10K,$250K,$1M,$10M,$50M", "parameter_query_param": "minimum_contract_size", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 12, "question_id": questionParamsResponse[0].question_id, "parameter_id": 12, "required_field": 1, "parameter_name": "Max Size of Prime Contract", "parameter_type": "dropdown", "parameter_data": "$10K,$250K,$1M,$10M,$50M", "parameter_query_param": "maximum_contract_size", "toggle_button": 0 }]
					for (let a = 0; a < fields.length; a++) {
						html = html + fixedFieldsRenderer(fields[a], fields);
					}
					//html = html + `<div class="col-md-8 text-center my-2 SearchFields">
					//<button type="button"  class="btn waves-effect waves-light btn-custom serchcss fixedFieldButton Searchbtn" onclick="searchData('36')">Past Performance/Top 20</button>
					//<button type="button"  class="btn waves-effect waves-light btn-custom Searchbtn serchcss fixedFieldButton" onclick="searchData('37')">Teammates</button>
					//<button type="button"  class="btn waves-effect waves-light btn-custom Searchbtn serchcss fixedFieldButton" onclick="searchData('38')">Competitors</button></div>`
					html = html + `<div class="col-md-8 text-center my-2 SearchFields">
					<button type="button"  class="btn waves-effect waves-light btn-custom Searchbtn serchcss fixedFieldButton" onclick="searchData('37')">Search</button>
					<button type="button"  class="btn waves-effect waves-light btn-custom serchcss fixedFieldButton" onclick="clearData()">X Clear</button>
					<button type="button"  class="btn waves-effect waves-light btn-custom Searchbtn serchcss fixedFieldButton" onclick="saveSearchModal()">Add To Search History</button></div>`
				} else if (questionParamsResponse[0].ui_style == 'fixedOpportunity') {
					
					const fields = [
						{ "wizard_question_parameter_id": 1, "question_id": questionParamsResponse[0].question_id, "parameter_id": 1, "required_field": 1, "parameter_name": "Contract #", "parameter_type": "text", "parameter_data": "", "parameter_query_param": "contract_number", "toggle_button": 0, parentInput: 1 },
						{ "wizard_question_parameter_id": 2, "question_id": questionParamsResponse[0].question_id, "parameter_id": 2, "required_field": 1, "parameter_name": "NAICS", "parameter_type": "naics", "parameter_data": "", "parameter_query_param": "naics_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 3, "question_id": questionParamsResponse[0].question_id, "parameter_id": 3, "required_field": 1, "parameter_name": "Department", "parameter_type": "funding-agency", "parameter_data": "", "parameter_query_param": "agency_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 4, "question_id": questionParamsResponse[0].question_id, "parameter_id": 4, "required_field": 1, "parameter_name": "Agency", "parameter_type": "funding-sub-agency", "parameter_data": "", "parameter_query_param": "sub_agency_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 5, "question_id": questionParamsResponse[0].question_id, "parameter_id": 5, "required_field": 0, "parameter_name": "Office", "parameter_type": "funding-office", "parameter_data": "", "parameter_query_param": "office_code", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 6, "question_id": questionParamsResponse[0].question_id, "parameter_id": 6, "required_field": 0, "parameter_name": "Set-Aside type", "parameter_type": "set-aside", "parameter_data": "", "parameter_query_param": "set_aside", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 7, "question_id": questionParamsResponse[0].question_id, "parameter_id": 7, "required_field": 0, "parameter_name": "Product or Service Code", "parameter_type": "text_clear", "parameter_data": "", "parameter_query_param": "psc", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 8, "question_id": questionParamsResponse[0].question_id, "parameter_id": 8, "required_field": 0, "parameter_name": "Opportunity Type", "parameter_type": "opportunity_type", "parameter_data": "", "parameter_query_param": "opportunity_type", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 9, "question_id": questionParamsResponse[0].question_id, "parameter_id": 9, "required_field": 1, "parameter_name": "Posted Date (On or After)", "parameter_type": "date", "parameter_data": "", "parameter_query_param": "PostedDate", "toggle_button": 0 }]
					for (let a = 0; a < fields.length; a++) {
						html = html + fixedFieldsRenderer(fields[a], fields);
					}
					html = html + `<div class="col-md-8 text-center my-2 SearchFields">
					<button type="button"  class="btn waves-effect waves-light btn-custom serchcss fixedFieldButton Searchbtn" onclick="searchDataOpportunity('51')">Search</button>
					<button type="button"  class="btn waves-effect waves-light btn-custom serchcss fixedFieldButton" onclick="clearData()">X Clear</button>
					<button type="button"  class="btn waves-effect waves-light btn-custom Searchbtn serchcss fixedFieldButton" onclick="saveSearchModal()">Add To Search History</button></div>`
				} else if (questionParamsResponse[0].ui_style == 'fixedHDR') {

					const fields = [
						{ "wizard_question_parameter_id": 1, "question_id": questionParamsResponse[0].question_id, "parameter_id": 1, "required_field": 1, "parameter_name": "Company Name", "parameter_type": "company_name", "parameter_data": "", "parameter_query_param": "company_name", "toggle_button": 0 },
						{ "wizard_question_parameter_id": 2, "question_id": questionParamsResponse[0].question_id, "parameter_id": 2, "required_field": 1, "parameter_name": "Expiration Date Start", "parameter_type": "date", "parameter_data": "", "parameter_query_param": "expiration_date_start", "toggle_button": 0, parentInput: 1 },
						{ "wizard_question_parameter_id": 3, "question_id": questionParamsResponse[0].question_id, "parameter_id": 3, "required_field": 1, "parameter_name": "Expiration Date End", "parameter_type": "date", "parameter_data": "", "parameter_query_param": "expiration_date_end", "toggle_button": 0 }]
					for (let a = 0; a < fields.length; a++) {
						html = html + fixedFieldsRenderer(fields[a], fields);
					}
					html = html + `<div class="col-md-8 text-center my-2 SearchFields">
					<button type="button"  class="btn waves-effect waves-light btn-custom serchcss fixedFieldButton Searchbtn" onclick="DataGridHDR('CPARS')">CPARS</button>
					<button type="button"  class="btn waves-effect waves-light btn-custom Searchbtn serchcss fixedFieldButton" onclick="DataGridHDR('Obligations')">Obligations</button></div>`
				} else {
					for (let a = 0; a < questionParamsResponse.length; a++) {
						html = html + htmlRenderer(questionParamsResponse[a], result.records);
					}
				}
			
				$("#htmlRenderer").html(html)

			}
			else {
				$("#htmlRenderer").html(html)
			}
			const id = checkSocioEcnomicFieldExists()
			if (id) {
				id !== 'SB' ? $(`#${id}`).parent().parent().hide() : $(`#${id}`).parent().parent().show()
				$('#OKSocio').on('click', (e) => {
					$('#69').val("SB")
				})
            }
			
			const searchHistoryId = urlParams.get('searchHistory')
			searchHistoryId ? fetchSearchHistoryById(searchHistoryId) : checkLocalStorage();
		},
		error: function (error) { }
	});

}

function validateField() {
	let flag = true;
	const requiredFields = [];    
	$("*[parentdiv]").each(function () {
		const parentDiv = $(this).attr('parentdiv');
		if (!parentDiv) {
			return;
		}
		if ($(`div[parentdiv='${parentDiv}'] select`).length!=0) {
			if ($(`div[parentdiv='${parentDiv}'] select`).prop('required')) {
				if (!$(`div[parentdiv='${parentDiv}'] select`).val() || $(`div[parentdiv='${parentDiv}'] select`).val()==='Select') {
					requiredFields.push( $(`div[parentdiv='${parentDiv}'] label`).html() )
				}
			}
		} else if ($(`div[parentdiv='${parentDiv}'] input`).length != 0) {   
			if ($(`div[parentdiv='${parentDiv}'] input`).prop('required') && $(`div[parentdiv='${parentDiv}'] input`)[0].style.display != "none" ) { 
				if (!$(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					console.log($(`div[parentdiv='${parentDiv}'] input`)[0])
					requiredFields.push($(`div[parentdiv='${parentDiv}'] label`).html())
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

function checkSocioEcnomicFieldExists() {
	let id = '';
	for (let a = 0; a < questionParamsResponse.length; a++) {
		if (questionParamsResponse[a].parameter_type === "socio-ecnomic") {
			id = questionParamsResponse[a].wizard_question_parameter_id;
			break;
		}
	}
	return id
}

function onBussinessSizeChange(event) {
	const val = event.target.value
	const id = checkSocioEcnomicFieldExists()
	if (!id) {
		return;
	}
	(val !== 'SB') ? $(`#${id}`).parent().parent().hide() : $(`#${id}`).parent().parent().show()
}

function clearData() {
	$("*[parentdiv]").each(function () {
		const parentDiv = $(this).attr('parentdiv');
		const fieldType = $(`div[parentdiv='${parentDiv}`).attr('fieldtype');
		if (fieldType === "set-aside" || fieldType==="set-aside-1" || fieldType === "set-aside-2") {
			$('#tbody_Aside input').each(function () {
					this.checked = false;
			});
			$("#OKSocioAside").click();
		}
		if (fieldType === "socio-ecnomic") {
			$('#tbody_Socio input').each(function () {
				//OKSocio.push({ value: this.value, text: this.id });
					this.checked = false;
			});
			$("#OKSocio").click();
		}

	});

	var inputElements = document.getElementsByTagName('input');

	for (var i = 0; i < inputElements.length; i++) {
		if (inputElements[i].type == 'text') {
			inputElements[i].value = '';
		}
	}

	$('select').prop('selectedIndex', 0);

	if ($('#Res_totalSocio')) {
		$('#Res_totalSocio').empty();

	}
	localStorage.removeItem("answerWidgetPage6Url");
	localStorage.removeItem("answerWidgetPage3Fields");
	fetchQuestionParams();
}

function searchData( id='' ) {
	const localStorageFields = {};
	if (validateField()) {
		const urlParams = new URLSearchParams(window.location.search);
		const question_id = !id ? urlParams.get('id') : id;
		const categroy = encodeURIComponent(urlParams.get('category'))
		let queryParam = `?question_id=${question_id}&&category=${categroy}`;
		const obj = createLocalStorageAndQueryParam(localStorageFields, queryParam)
		localStorage.setItem('answerWidgetPage3Fields', JSON.stringify(obj.localStorageFields));
		queryParam = queryParam.replace("?&&", "?")
		document.location = `/AnswerWizard/QuestionDashboard${obj.queryParam}`;
	}
	
}

function searchDataOpportunity(id = '') {
	const localStorageFields = {};
	if (validateField()) {
		const urlParams = new URLSearchParams(window.location.search);
		const question_id = !id ? urlParams.get('id') : id;
		const categroy = encodeURIComponent(urlParams.get('category'))
		let queryParam = `?question_id=${question_id}&&category=${categroy}`;
		const obj = createLocalStorageAndQueryParam(localStorageFields, queryParam)
		localStorage.setItem('answerWidgetPage3Fields', JSON.stringify(obj.localStorageFields));
		queryParam = queryParam.replace("?&&", "?")
		document.location = `/AnswerWizard/OpportunityDataGrid${obj.queryParam}`;
	}

}

function DataGridHDR(hdr_type = '') {
	const localStorageFields = {};
	if (validateField()) {
		const urlParams = new URLSearchParams(window.location.search);
		const question_id = urlParams.get('id');
		const category = encodeURIComponent(urlParams.get('category'))
		let queryParam = !hdr_type ? `?question_id=${question_id}&&category=${category}` :
			`?question_id=${question_id}&&category=${category}&&hdr=${hdr_type}`;
		const obj = createLocalStorageAndQueryParam(localStorageFields, queryParam)
		localStorage.setItem('answerWidgetPage3Fields', JSON.stringify(obj.localStorageFields));
		queryParam = queryParam.replace("?&&", "?")
		document.location = `/AnswerWizard/HdrDataGrid${obj.queryParam}`;
	}

}

function createLocalStorageAndQueryParam(localStorageFields, queryParam) {
	$("*[parentdiv]").each(function () {
		const parentDiv = $(this).attr('parentdiv');
		let jsonString = ''
		const label = $(`div[parentdiv='${parentDiv}'] label`).html()
		const fieldType = $(`div[parentdiv='${parentDiv}`).attr('fieldtype');
		const queryParamField = $(`div[parentdiv='${parentDiv}`).attr('queryparam');

		switch (fieldType) {
			case 'dropdown':
			case 'agency_name':
				if ($(`div[parentdiv='${parentDiv}'] select`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] select`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = { name: label, fieldType: 'dropdown', value: $(`div[parentdiv='${parentDiv}'] select`)[0].value }
				}
				break;
			case 'text':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'text', value: { label, value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;
			case 'date':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'date', value: { label, value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;
			case 'naics':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					console.log("value ", $(`div[parentdiv='${parentDiv}'] input`)[0].value)
					console.log("description ", $(`div[parentdiv='${parentDiv}'] input`)[1].value)
					jsonString = JSON.stringify({ label: 'Naics', value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[1].value })
					queryParam = queryParam + `&&${queryParamField} =${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'naics',
						value: { label: 'Naics', value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[1].value }
					}
				}
				break;
			case 'NAICS Family Code':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {

					jsonString = JSON.stringify({ label: 'Naics Family', value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[1].value })
					queryParam = queryParam + `&&naics_code =${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: 'NAICS Family Code', fieldType: 'naics',
						value: { label: 'Naics Family', value: $(`div[parentdiv='${parentDiv}'] input`)[0].value, description: $(`div[parentdiv='${parentDiv}'] input`)[1].value }
					}
				}
				break;
			case 'funding-sub-agency':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'funding-sub-agency',
						value: { label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;
			case 'funding-agency':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {

					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: 'Department', fieldType: 'funding-agency',
						value: { label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;
			case 'funding-office':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'funding-office',
						value: { label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;
			case 'socio-ecnomic':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					let value = ''
					let text = ''
					OKSocio?.forEach((item, idx) => {
						value = `${value}${item.value}${idx < OKSocio?.length - 1 ? "," : ""}`
						text = `${text}${item.text || item.value}${idx < OKSocio?.length - 1 ? ", " : "."}`
					})
					jsonString = JSON.stringify({ label, value, description: text })
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'socio-ecnomic',
						value: { label, value, description: text }
					}
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
				}
				break;
			case 'set-aside':
			case 'set-aside-1':
			case 'set-aside-2':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					let value = ''
					let text = ''
					OKSocioAside?.forEach((item, idx) => {
						value = `${value}${item.value}${idx < OKSocioAside?.length - 1 ? "," : ""}`
						text = `${text}${item.text || item.value}${idx < OKSocioAside?.length - 1 ? ", " : "."}`
					})

					jsonString = JSON.stringify({ label, value, description: text })
					localStorageFields[parentDiv] = {
						name: label, fieldType: fieldType,
						value: { label, value, description: text },
						OKSocioAside
					}
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
				}
				break;
			case 'opportunity_type':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					let value = ''
					OKOpportunityType?.forEach((item, idx) => {
						value = `${value}${item.text}${idx < OKOpportunityType?.length - 1 ? "," : ""}`
					})

					jsonString = JSON.stringify({ label, value })
					localStorageFields[parentDiv] = {
						name: label, fieldType: fieldType,
						value: { label, value },
						OKOpportunityType
					}
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
				}
				break;
			case 'vendor_uei':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'vendor_uei',
						value: { label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;			
			case 'project_list':
				if ($(`div[parentdiv='${parentDiv}'] select`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] select`)[0].value, description: $(`div[parentdiv='${parentDiv}'] option:selected`)[0].innerText })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'project_list', value: {
							description: $(`div[parentdiv='${parentDiv}'] option:selected`)[0].innerText, value:$(`div[parentdiv='${parentDiv}'] select`)[0].value
					}  }
				}
				break;
			case 'company_name':
				if ($(`div[parentdiv='${parentDiv}'] input`)[0].value) {
					jsonString = JSON.stringify({ label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value })
					queryParam = queryParam + `&&${queryParamField}=${encodeURIComponent(jsonString)}`
					localStorageFields[parentDiv] = {
						name: label, fieldType: 'company_name',
						value: { label, value: $(`div[parentdiv='${parentDiv}'] label`)[1].innerText, description: $(`div[parentdiv='${parentDiv}'] input`)[0].value }
					}
				}
				break;			
			default:
				break;
		}
	});

	return {
		localStorageFields, queryParam
	}
}

const getLastFilterDays=(lastXday)=>{
	const date = new Date(Date.now() - lastXday * 24 * 60 * 60 * 1000);
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;
	return yyyy + '-' + mm + '-' + dd;
}

const getExpirationDateStart=()=>{
	const date = new Date(Date.now());
	const yyyy = date.getFullYear() + 1;
	return yyyy + '-' + '01' + '-' + '01';
}

const getExpirationDateEnd = () => {
	const date = new Date(Date.now());
	const yyyy = date.getFullYear() + 3;
	return yyyy + '-' + '12' + '-' + '31';
}

function htmlRenderer(obj, records) {
	let html = "";
	
	switch (obj.parameter_type) {
		case 'dropdown':
			const data = obj.parameter_data.split(',');
			let innerHtml = '';
			for (let a = 0; a < data.length; a++) {
				innerHtml = innerHtml + `<option value="${data[a]}">${data[a]}</option>`
			}
			const onchangeEvent = obj.parameter_name === "Business Size" ? 'onchange="onBussinessSizeChange(event)"' : '';
			html = `<div class="row">
						<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="dropdown" queryparam="${obj.parameter_query_param}">
						   <div class="input-box">
							  <label class="label-text req" for="${obj.wizard_question_parameter_id}">${obj.parameter_name}</label>
								
							  <div class="form-group input-group-success">
								 <select name="education" style="font-size: 14px !important"
									class="ui-dropdown education form-control form-control-styled chosen-with-icon-edu" id="${obj.wizard_question_parameter_id}" required="${obj.required_field ? true : false}" ${onchangeEvent}
									autocomplete="off" tabindex="-1">
									${innerHtml}
								 </select>
							  </div>
						   </div>
						</div>
					 </div>`;
			break;
		case 'text':
			html = `<div class="row"><div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="text" queryparam="${obj.parameter_query_param}">
					<label for="${obj.wizard_question_parameter_id}" class="">${obj.parameter_name}</label>
					 ${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
					<input type="text" value="" class="form-control"  id="${obj.wizard_question_parameter_id}" ${obj.required_field ? 'required="true"' : ''} /> </div></div>`
			break;
		case 'date':
			html = `<div class="row"><div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}"  fieldtype="date" queryparam="${obj.parameter_query_param}">
						<label for="${obj.wizard_question_parameter_id}" class="">${obj.parameter_name}</label>
						 ${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
						<input type="date" class="form-control" data-date-format='mm/dd/yyyy' id="${obj.wizard_question_parameter_id}" aria-describedby="emailHelp" 
						max="12-31-2099" min="01-01-2000"  ${obj.required_field ? 'required="true"' : ''} value="${eval(obj.parameter_data)}">
					 </div></div>`
			break;
		case 'set-aside':
		case 'set-aside-1':
		case 'set-aside-2':
			$(document).on('click', `#${obj.wizard_question_parameter_id}`, function () {
				if (!$("#scriptEleSetAside").length) {
					let scriptEleSetAside = document.createElement("script");
					scriptEleSetAside.id = "scriptEleSetAside"
					scriptEleSetAside.setAttribute("src", "/Scripts/AppJS/QuestionParamsSetAside.js");
					document.body.appendChild(scriptEleSetAside);
					scriptEleSetAside.onload = function () {
						GetSocioEconomicAside(obj.parameter_type);
						$(`div[parentdiv='${obj.wizard_question_parameter_id}'] .OpenMinContSizeAside`)[0].click()
						$('#MysocioAside').modal('toggle');

					}
				}
			});
			html = `<div class="row"><div class="col-lg-8"  parentdiv = "${obj.wizard_question_parameter_id}"  fieldtype="${obj.parameter_type}" queryparam="${obj.parameter_query_param}">
											<div class="clsSocioeconomic">
													<label class="label-text">${obj.parameter_name}</label>
													 ${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
													<div class="input-group mb-3">

														<input type="text" class="DIS_002 form-control  OpenMinContSizeAside" id="${obj.wizard_question_parameter_id}"  ${obj.required_field ? 'required="true"' : ''}>
														<div class="input-group-append">
															<span class="input-group-text s001 pr-0">
																<i class="ti-info-alt infoIcon s002 SOE" data-toggle="tooltip" title="" data-original-title="Refine your search by adding Socio Economic Designations such as 8(a) sole source, Emerging small business, etc"></i>
															</span>
														</div>
													</div>
													<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline" id="Res_totalSocio_Aside">
														+
														<label class="lbl_S001" id="lblRes_SocioAside" style="text-decoration:underline;"></label> more
													</label>
											</div>
									</div> </div>`
			break;
		case 'socio-ecnomic':
			$(document).on('click', `#${obj.wizard_question_parameter_id}`, function () {
				if (!$("#scriptEleSocio").length) {
					let scriptEleSocio = document.createElement("script");
					scriptEleSocio.id = "scriptEleSocio";
					scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
					document.body.appendChild(scriptEleSocio);
					scriptEleSocio.onload = function () {
						$(`#${obj.wizard_question_parameter_id}`).click();
					}

				}
				$("#socioHeading").html("Choose Socio-Economic Designation(s)")
			});
			html = `
				<div class="row">
					<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="socio-ecnomic" queryparam="${obj.parameter_query_param}">
						<div class="clsSocioeconomic ">
								<label >${obj.parameter_name}</label>
									${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
								<div class="input-group mb-3">

									<input type="text" class="DIS_002 form-control  OpenMinContSize" id="${obj.wizard_question_parameter_id}">
									
								</div>
								<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline" id="Res_totalSocio">
									+
									<label class="lbl_S001" id="lblRes_Socio" style="text-decoration:underline;"></label> more
								</label>
						</div>
					</div>
				</div>
`
			break;
		case 'opportunity_type':
			//$(document).on('click', `#${obj.wizard_question_parameter_id}`, function () {
			if (!$("#scriptEleOpportunity").length) {
				let scriptEleSocio = document.createElement("script");
				scriptEleSocio.id = "scriptEleOpportunity";
				scriptEleSocio.setAttribute("src", "/Scripts/AppJS/QuestionParamsOpportunityType.js");
				document.body.appendChild(scriptEleSocio);
				scriptEleSocio.onload = function () {

					GetOpportunityType();
				}

			}
			$("#set-opportunity-modal-heading").html("Choose Opportunity Type(s)")
			//});
			html = `
				<div class="row">
					<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="opportunity_type" queryparam="${obj.parameter_query_param}">
						<div class="clsOpporatunity ">
								<label >${obj.parameter_name}</label>
									${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
								<div class="input-group mb-3">

									<input type="text" class="DIS_002 form-control  OpenMinOpportunityType" id="${obj.wizard_question_parameter_id}" ${obj.required_field ? 'required="true"' : ''}>
									
								</div>
								<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline" id="lblOpporttunityType_2">
									+
									<label class="lbl_S001" id="lblRes_OpportunityType" style="text-decoration:underline;"></label> more
								</label>
						</div>
					</div>
				</div>
`
			break;
		case 'radio':
			const dataRadio = obj.parameter_data.split(',');
			let innerHtmlRadio = '';
			for (let a = 0; a < dataRadio.length; a++) {
				innerHtmlRadio = innerHtmlRadio + ` <div class="col-md-4 s004" >
											<label class="container">
												${dataRadio[a]}
												${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
												<input type="radio" name="businessize" class="DIS_002 radiocheck" checked="" value="${dataRadio[a]}">
												<span class="DIS_002 checkmark"></span>
											</label>
										</div>`
			}
			html = `<div class="col-12" parentdiv= "${obj.wizard_question_parameter_id}"  fieldtype="radio"><div class="col-lg-3">
								<div class="col-md-12 s019">
									<div class="col-md-12 s004">
										<label class="lbl_S001">Business Size</label> <span class="req"></span>
									</div>
									<div class="input-group mb-3">
												${innerHtmlRadio}
										
									</div>
								</div>

							</div> </div>`
			break;
		case 'naics':
			if (!$("#scriptEleSocio").length) {
				let scriptEleSocio = document.createElement("script");
				scriptEleSocio.id = "scriptEleSocio";
				scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
				document.body.appendChild(scriptEleSocio);
				scriptEleSocio.onload = function () {
					$(`#${obj.wizard_question_parameter_id}`).click();
				}

			}
			html = ` 
					<div class="naicsincrFam1" style="display: none;">
                     <div class="row">
                        <div class="col-lg-8 mt-2">
                           <button type="button" class="btn btn-toggle_Naics active" data-toggle="button" aria-pressed="false"
                              autocomplete="off">
                              <div class="handle"></div>
                           </button>
                        </div>
                     </div>
					<div parentdiv="naics_family_code_${obj.wizard_question_parameter_id}" fieldtype="naics" queryparam="${obj.parameter_query_param}">
                     <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Family Code</label>
							${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text btnnaicsfamilyrowclear" id="basic_2">&#215;</span>
                              </div>
                              <input type="text"  style="display:none" class="DIS_002 form-control NaicsFamCode dis_able0" name="textbox" id="txtnaicsfamcode_2" aria-describedby="basic-addon3" ${obj.required_field ? 'required="true"' : ''}>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Family Description</label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text" id="basic-addon4">&#215;</span>
                              </div>
                              <input disabled type="text" class="form-control dis_able0" name="textbox" id="txtnaicsfamdesc_2" aria-describedby="basic-addon4" ${obj.required_field ? 'required="true"' : ''}>
                           </div>
                        </div>
						<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline;" id="lbltotalnaicsfamily">+<label class="lbl_S001" style="text-decoration:underline" id="lbltotaladdedrownaicsfamily"></label> more</label>
                     </div>
					</div>
					</div>

					<div class="naicsincr1 ">	
                     <div class="row naics1">
                        <div class="col-lg-8 mt-2" style= "${obj.toggle_button == 1 ? 'display : none' : ''}">
                           <button type="button" class="btn btn-toggle_Naics" data-toggle="button" aria-pressed="true" autocomplete="off">
                              <div class="handle"></div>
                           </button>
                        </div>
                     </div>
					<div parentdiv= "naics_code_${obj.wizard_question_parameter_id}"  fieldtype="naics" queryparam="${obj.parameter_query_param}">
					  <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Code</label>
							${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text btnnaicscoderowclear" id="basic_2">&#215;</span>
                              </div>
                              <input type="text" class="DIS_002 form-control NaicsCode dis_able1" id="txtnaicscode_2" aria-describedby="basic-addon5" ${obj.required_field ? 'required="true"' : ''} />
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Description</label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text" id="basic-addon6">&#215;</span>
                              </div>
                              <input type="text" disabled class="form-control dis_able1" id="txtnaicsdesc_2" aria-describedby="basic-addon6" ${obj.required_field ? 'required="true"' : ''}>
                           </div>
                        </div>
                     </div>
					</div>
					</div>
`
			break;
		case 'funding-agency':
			if (!$("#scriptEleSocio").length) {
				let scriptEleSocio = document.createElement("script");
				scriptEleSocio.id = "scriptEleSocio";
				scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
				document.body.appendChild(scriptEleSocio);
				scriptEleSocio.onload = function () {
					$(`#${obj.wizard_question_parameter_id}`).click();
				}
			}
			let subAgency = '';
			let fundingOffice = '';
			for (let a = 0; a < records.length; a++) {
				if (records[a].parameter_type === "funding-sub-agency") {
					$("#funding-sub-agency-label").html(records[a].parameter_name)

					subAgency = `	
					<div class="row">
                        <div class="col-lg-8" parentdiv="awarding_sub_agency_${records[a].wizard_question_parameter_id}"  fieldtype="funding-sub-agency" queryparam="${records[a].parameter_query_param}">
                           <label for="basic-url">${records[a].parameter_name}</label>
							${records[a].required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenAgencyPopup " id="btnagencyrowclear" data-toggle="tooltip" 
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtagency" id="txtagency_2" ${records[a].required_field ? "required" : ""} />
								<label id="lblagency_2" style="display:none;" class="lblagency lblclr"></label>
                           </div>
                        </div>
                     </div>`
				}
				if (records[a].parameter_type === "funding-office") {
					$("#funding-office-label").html(records[a].parameter_name)
					fundingOffice = `
							
                     <div class="row">
                        <div class="col-lg-8" parentdiv="awarding_office_${records[a].wizard_question_parameter_id}" fieldtype="funding-office" queryparam="${records[a].parameter_query_param}">
                           <label for="basic-url">${records[a].parameter_name}</label>
							 ${records[a].required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenOffcPopup" data-toggle="tooltip" id="btnofficerowclear"
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtoffice" id="txtoffice_2" ${records[a].required_field ? "required" : ""} />
							  <label id="lbloffice_2" style="display:none;" class="lbloffice lblclr"></label>
                           </div>
                        </div>
                     </div>

					`
				}
			}
			$("#funding-agency-label").html(obj.parameter_name)
			html = ` 
					 <div class="row">
                        <div class="col-lg-8" parentdiv="awarding_agency_${obj.wizard_question_parameter_id}" fieldtype="funding-agency" queryparam="${obj.parameter_query_param}">
                           <label for="basic-url">${obj.parameter_name}</label>
								${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenDeptPopup btndeptrowclear" ${obj.question_id != 69? 'id="btndeptrowclear_2"':''}
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtdept" id="txtdept_2" ${obj.question_id == 69 ? 'disabled value="GENERAL SERVICES ADMINISTRATION(GSA)"' : ''}  ${obj.required_field ? 'required="true"' : ''}   />
								<label id="lbldept_2" style="display:none;" class="lbldept lblclr">${obj.question_id == 69 ? '047':''}</label>
                           </div>
                        </div>
                     </div>

						   ${subAgency}
							${fundingOffice}

							`;
			break;
		case 'vendor_uei':
			if (!$("#scriptEleVendor").length) {
				let scriptEleVendor = document.createElement("script");
				scriptEleVendor.id = "scriptEleVendor";
				scriptEleVendor.setAttribute("src", "/Scripts/AppJS/QuestionParamsVendorUei.js");
				document.body.appendChild(scriptEleVendor);
				scriptEleVendor.onload = function () {
					$(`#${obj.wizard_question_parameter_id}`).click();
				}
			}
			html = ` <div class="row">
                        <div class="col-lg-8" parentdiv="vendor_uei_${obj.wizard_question_parameter_id}" fieldtype="vendor_uei" queryparam="${obj.parameter_query_param}">
                           <label for="basic-url">${obj.parameter_name}</label>
								${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenVendorPopup btndeptrowclear" id="btndeptrowclear_vendor"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtvendor" id="txt_vendor" ${obj.required_field ? 'required="true"' : ''}  />
								<label id="lblvendor_2" style="display:none;" class="lblvendor lblclr"></label>
                           </div>
                        </div>
                     </div>
					`
			break;
		case 'agency_name':
			$.ajax({
				type: "POST",
				data: {},
				enctype: 'multipart/form-data',
				url: "/AnswerWizard/GetAgencyName",
				success: function (result) {
					result = jQuery.parseJSON(result);
					if (result.records && result.records != 0) {
						const records = result.records;
						console.log("+++++++++++++++++++", records)
						//let innerHtml = '';
						//for (let a = 0; a < records.length; a++) {
						//	const data = records[a];
						//	innerHtml = innerHtml + `<option value="${data}">${data}</option>`
						//}

						let innerHtml = '<option value="Select">Select</option>';
						for (let a = 0; a < records.length; a++) {
							const data = records[a].agency_name;
							innerHtml = innerHtml + `<option value="${data}">${data}</option>`
						}
						$("#theSelect").html(innerHtml);

						//var options = $("#theSelect");
						//$.each(records, function (item) {
						//	options.append($("<option />").val(item.agency_name).text(item.agency_name));
						//});
					}
					else {
						console.log("Something wrong")
					}
				},
				error: function (error) { }
			});
			
			html = `<div class="row">
						<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="dropdown" queryparam="${obj.parameter_query_param}">
						   <div class="input-box">
							  <label class="label-text req" for="${obj.wizard_question_parameter_id}">${obj.parameter_name}</label>
								
							  <div class="form-group input-group-success">
								 <select name="education" style="font-size: 14px !important"
									class="ui-dropdown education form-control form-control-styled chosen-with-icon-edu" id="theSelect" required="${obj.required_field ? true : false}"
									autocomplete="off" tabindex="-1">
									
								 </select>
							  </div>
						   </div>
						</div>
					 </div>`
			break;
		case 'project_list':
			let innerHtmlProject = '<option value="Select">Select</option>';
			
			for (let a = 0; a < obj.ProjectList.length; a++) {
				innerHtmlProject = innerHtmlProject + `<option value="${obj.ProjectList[a].Project_id}">${obj.ProjectList[a].project_name}</option>`
			}
			html = `<div class="row">
						<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="project_list" queryparam="${obj.parameter_query_param}">
						   <div class="input-box">
							  <label class="label-text req" for="${obj.wizard_question_parameter_id}">${obj.parameter_name}</label>
								
							  <div class="form-group input-group-success">
								 <select name="education" style="font-size: 14px !important"
									class="ui-dropdown education form-control form-control-styled chosen-with-icon-edu" id="${obj.wizard_question_parameter_id}" required="${obj.required_field ? true : false}"
									autocomplete="off" tabindex="-1">
									${innerHtmlProject}
								 </select>
							  </div>
						   </div>
						</div>
					 </div>
`;
			break;

		default:
			break;
	}
	return html;
}

function fixedFieldsRenderer(obj, records) {
	let html = "";

	switch (obj.parameter_type) {
		case 'dropdown':
			const data = obj.parameter_data.split(',');
			let innerHtml = '';
			for (let a = 0; a < data.length; a++) {
				innerHtml = innerHtml + `<option value="${data[a]}">${data[a]}</option>`
			}
			const onchangeEvent = obj.parameter_name === "Business Size" ? 'onchange="onBussinessSizeChange(event)"' : '';
			html = ` 	   
					 <div class="row">
						<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="dropdown" queryparam="${obj.parameter_query_param}">
						   <div class="input-box">
							  <label class="label-text req" for="${obj.wizard_question_parameter_id}">${obj.parameter_name}</label>
								
							  <div class="form-group input-group-success">
								 <select name="education" style="font-size: 14px !important"
									class="ui-dropdown education form-control form-control-styled chosen-with-icon-edu" id="${obj.wizard_question_parameter_id}" required="${obj.required_field ? true : false}" ${onchangeEvent}
									autocomplete="off" tabindex="-1">
									${innerHtml}
								 </select>
							  </div>
						   </div>
						</div>
					 </div>
`;
			break;
		case 'text':
			html = `<div class="row"><div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="text" queryparam="${obj.parameter_query_param}">
					<label for="${obj.wizard_question_parameter_id}" class="">${obj.parameter_name}</label>
					 ${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
					<input type="text" value="" class="form-control"  id="${obj.wizard_question_parameter_id}" ${obj.required_field ? 'required="true"' : ''} ${obj.parentInput ? `onkeyup="parentInputChangeEvent(event, ${obj.question_id})"` : ''}/> </div></div>`
			break;
		case 'date':
			html = `<div class="row"><div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}"  fieldtype="date" queryparam="${obj.parameter_query_param}">
						<label for="${obj.wizard_question_parameter_id}" class="">${obj.parameter_name}</label>
						 ${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
						<input type="date" class="form-control" data-date-format='mm/dd/yyyy' id="${obj.wizard_question_parameter_id}" aria-describedby="emailHelp" 
						max="12-31-2099" min="01-01-2000"  ${obj.required_field ? 'required="true"' : ''} value="${obj.parameter_name.includes('Posted Date')
					? getLastFilterDays(7) : ''}">
					 </div></div>`
			break;
		case 'set-aside':
		case 'set-aside-1':
		case 'set-aside-2':
			//$(document).on('click', `#${obj.wizard_question_parameter_id}`, function () {
				if (!$("#scriptEleSetAside").length) {
					let scriptEleSetAside = document.createElement("script");
					scriptEleSetAside.id = "scriptEleSetAside"
					scriptEleSetAside.setAttribute("src", "/Scripts/AppJS/QuestionParamsSetAside.js");
					document.body.appendChild(scriptEleSetAside);
					scriptEleSetAside.onload = function () {

						GetSocioEconomicAside(obj.parameter_type);
						$(`div[parentdiv='${obj.wizard_question_parameter_id}'] .OpenMinContSizeAside`)[0].click()
						//$('#MysocioAside').modal('toggle');

					}
				}
			//});
			//$("#MysocioAside #OKSocioAside").hide()
			html = `<div class="row"><div class="col-lg-8"  parentdiv = "${obj.wizard_question_parameter_id}"  fieldtype="${obj.parameter_type}" queryparam="${obj.parameter_query_param}">
											<div class="clsSocioeconomic">
													<label class="label-text">${obj.parameter_name}</label>
													 ${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
													<div class="input-group mb-3">

														<input type="text" class="DIS_002 form-control  OpenMinContSizeAside" id="${obj.wizard_question_parameter_id}"  ${obj.required_field ? 'required="true"' : ''}>
														<div class="input-group-append">
															<span class="input-group-text s001 pr-0">
																<i class="ti-info-alt infoIcon s002 SOE" data-toggle="tooltip" title="" data-original-title="Refine your search by adding Socio Economic Designations such as 8(a) sole source, Emerging small business, etc"></i>
															</span>
														</div>
													</div>
													<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline" id="Res_totalSocio_Aside">
														+
														<label class="lbl_S001" id="lblRes_SocioAside" style="text-decoration:underline;"></label> more
													</label>
											</div>
									</div> </div>`
			break;
		case 'socio-ecnomic':
			$(document).on('click', `#${obj.wizard_question_parameter_id}`, function () {
				if (!$("#scriptEleSocio").length) {
					let scriptEleSocio = document.createElement("script");
					scriptEleSocio.id = "scriptEleSocio";
					scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
					document.body.appendChild(scriptEleSocio);
					scriptEleSocio.onload = function () {
						$(`#${obj.wizard_question_parameter_id}`).click();
					}

				}
				$("#socioHeading").html("Choose Socio-Economic Designation(s)")
			});
			html = `
				<div class="row">
					<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="socio-ecnomic" queryparam="${obj.parameter_query_param}">
						<div class="clsSocioeconomic ">
								<label >${obj.parameter_name}</label>
									${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
								<div class="input-group mb-3">

									<input type="text" class="DIS_002 form-control  OpenMinContSize" id="${obj.wizard_question_parameter_id}">
									
								</div>
								<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline" id="Res_totalSocio">
									+
									<label class="lbl_S001" id="lblRes_Socio" style="text-decoration:underline;"></label> more
								</label>
						</div>
					</div>
				</div>
`
			break;
		case 'naics':
			if (!$("#scriptEleSocio").length) {
				let scriptEleSocio = document.createElement("script");
				scriptEleSocio.id = "scriptEleSocio";
				scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
				document.body.appendChild(scriptEleSocio);
				scriptEleSocio.onload = function () {
					$(`#${obj.wizard_question_parameter_id}`).click();
				}

			}

			html = ` 
					<div class="naicsincrFam1" style="display: none;">
                     <div class="row">
                        <div class="col-lg-8 mt-2">
                           <button type="button" class="btn btn-toggle_Naics active" data-toggle="button" aria-pressed="false"
                              autocomplete="off">
                              <div class="handle"></div>
                           </button>
                        </div>
                     </div>
					<div parentdiv="naics_family_code_${obj.wizard_question_parameter_id}" fieldtype="naics" queryparam="${obj.parameter_query_param}">
                     <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Family Code</label>
							${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text btnnaicsfamilyrowclear" id="basic_2">&#215;</span>
                              </div>
                              <input type="text"  style="display:none" class="DIS_002 form-control NaicsFamCode dis_able0" name="textbox" id="txtnaicsfamcode_2" aria-describedby="basic-addon3" required="${obj.required_field ? true : false}">
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Family Description</label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text" id="basic-addon4">&#215;</span>
                              </div>
                              <input disabled type="text" class="form-control dis_able0" name="textbox" id="txtnaicsfamdesc_2" aria-describedby="basic-addon4">
                           </div>
                        </div>
						<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline;" id="lbltotalnaicsfamily">+<label class="lbl_S001" style="text-decoration:underline" id="lbltotaladdedrownaicsfamily"></label> more</label>
                     </div>
					</div>
					</div>

					<div class="naicsincr1 ">	
                     <div class="row naics1">
                        <div class="col-lg-8 mt-2" style= "${obj.toggle_button == 1 ? 'display : none' : ''}">
                           <button type="button" class="btn btn-toggle_Naics" data-toggle="button" aria-pressed="true" autocomplete="off">
                              <div class="handle"></div>
                           </button>
                        </div>
                     </div>
					<div parentdiv= "naics_code_${obj.wizard_question_parameter_id}"  fieldtype="naics" queryparam="${obj.parameter_query_param}">
					  <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Code</label>
							${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text btnnaicscoderowclear" id="basic_2">&#215;</span>
                              </div>
                              <input type="text" class="DIS_002 form-control NaicsCode dis_able1"  id="txtnaicscode_2" aria-describedby="basic-addon5" required="${obj.required_field ? true : false}" />
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-lg-8">
                           <label for="basic-url">NAICS Description</label>
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text" id="basic-addon6">&#215;</span>
                              </div>
                              <input type="text" disabled class="form-control dis_able1" id="txtnaicsdesc_2" aria-describedby="basic-addon6" readonly="true">
                           </div>
                        </div>
                     </div>
					</div>
					</div>
`
			break;
		case 'funding-agency':
			if (!$("#scriptEleSocio").length) {
				let scriptEleSocio = document.createElement("script");
				scriptEleSocio.id = "scriptEleSocio";
				scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
				document.body.appendChild(scriptEleSocio);
				scriptEleSocio.onload = function () {
					$(`#${obj.wizard_question_parameter_id}`).click();
				}
			}
			let subAgency = '';
			let fundingOffice = '';
			for (let a = 0; a < records.length; a++) {
				if (records[a].parameter_type === "funding-sub-agency") {
					$("#funding-sub-agency-label").html(records[a].parameter_name)

					subAgency = ` 
						
					<div class="row">
                        <div class="col-lg-8" parentdiv="awarding_sub_agency_${obj.wizard_question_parameter_id}"  fieldtype="funding-sub-agency" queryparam="${records[a].parameter_query_param}">
                           <label for="basic-url">${records[a].parameter_name}</label>
							${records[a].required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenAgencyPopup " id="btnagencyrowclear" data-toggle="tooltip" 
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text"  class="DIS_002 form-control txtagency" id="txtagency_2" ${records[a].required_field ? "required" : ""} />
								<label id="lblagency_2" style="display:none;" class="lblagency lblclr"></label>
                           </div>
                        </div>
                     </div>`
				}
				if (records[a].parameter_type === "funding-office") {
					$("#funding-office-label").html(records[a].parameter_name)
					fundingOffice = `
							
                     <div class="row">
                        <div class="col-lg-8" parentdiv="awarding_office_${obj.wizard_question_parameter_id}" fieldtype="funding-office" queryparam="${records[a].parameter_query_param}">
                           <label for="basic-url">${records[a].parameter_name}</label>
							 ${records[a].required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenOffcPopup" data-toggle="tooltip" id="btnofficerowclear"
								 title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input  type="text" class="DIS_002 form-control txtoffice" id="txtoffice_2" ${records[a].required_field ? "required" : ""} />
							  <label id="lbloffice_2" style="display:none;" class="lbloffice lblclr"></label>
                           </div>
                        </div>
                     </div>

					`
				}
			}
			$("#funding-agency-label").html(obj.parameter_name)
			html = ` 
					 <div class="row">
                        <div class="col-lg-8" parentdiv="awarding_agency_${obj.wizard_question_parameter_id}" fieldtype="funding-agency" queryparam="${obj.parameter_query_param}">
                           <label for="basic-url">${obj.parameter_name}</label>
								${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenDeptPopup btndeptrowclear" id="btndeptrowclear_2"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input  type="text" class="DIS_002 form-control txtdept" id="txtdept_2" required="${obj.required_field ? true : false}"  />
								<label id="lbldept_2" style="display:none;" class="lbldept lblclr"></label>
                           </div>
                        </div>
                     </div>

						   ${subAgency}
							${fundingOffice}

							`;
			break;
		case 'opportunity_type':
			//$(document).on('click', `#${obj.wizard_question_parameter_id}`, function () {
			if (!$("#scriptEleOpportunity").length) {
				let scriptEleSocio = document.createElement("script");
				scriptEleSocio.id = "scriptEleOpportunity";
				scriptEleSocio.setAttribute("src", "/Scripts/AppJS/QuestionParamsOpportunityType.js");
				document.body.appendChild(scriptEleSocio);
				scriptEleSocio.onload = function () {

					GetOpportunityType();
				}

			}
			$("#set-opportunity-modal-heading").html("Choose Opportunity Type(s)")
			//});
			html = `
				<div class="row">
					<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="opportunity_type" queryparam="${obj.parameter_query_param}">
						<div class="clsOpporatunity ">
								<label >${obj.parameter_name}</label>
									${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
								<div class="input-group mb-3">

									<input type="text" class="DIS_002 form-control  OpenMinOpportunityType" id="${obj.wizard_question_parameter_id}" ${obj.required_field ? 'required="true"' : ''}>
									
								</div>
								<label class="lbl_S001" style="cursor:pointer;display:none;color:#581e7b;text-decoration:underline" id="lblOpporttunityType_2">
									+
									<label class="lbl_S001" id="lblRes_OpportunityType" style="text-decoration:underline;"></label> more
								</label>
						</div>
					</div>
				</div>
`
			break;
		case 'text_clear':
			html = `<div class="row">
						
						<div class="col-lg-8" parentdiv = "${obj.wizard_question_parameter_id}" fieldtype="text" queryparam="${obj.parameter_query_param}">
								<label for="${obj.wizard_question_parameter_id}" class="">${obj.parameter_name}</label>
								${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text btnpscclear" data-toggle="tooltip" 
										title="Click to clear the data in this row"><i class="ti-close"></i></span>
									</div>
								<input type="text" value="" class="form-control rowPSC"  id="${obj.wizard_question_parameter_id}" ${obj.required_field ? 'required="true"' : ''} /> 
							</div>
						</div>
					</div>`

			break;
		case 'company_name':
			if (!$("#scriptEleCompany").length) {
				let scriptEleCompany = document.createElement("script");
				scriptEleCompany.id = "scriptEleCompany";
				scriptEleCompany.setAttribute("src", "/Scripts/AppJS/QuestionParamsCompanyName.js");
				document.body.appendChild(scriptEleCompany);
				scriptEleCompany.onload = function () {
					$(`#${obj.wizard_question_parameter_id}`).click();
				}
			}
			html = ` <div class="row">
                        <div class="col-lg-8" parentdiv="company_${obj.wizard_question_parameter_id}" fieldtype="company_name" queryparam="${obj.parameter_query_param}">
                           <label for="basic-url">${obj.parameter_name}</label>
								${obj.required_field ? ' <span style="color:red;">*</span>' : ''}
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenCompanyPopup btndeptrowclear" id="btndeptrowclear_company"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtcompany" id="txt_company"
							  ${obj.required_field ? 'required="true"' : ''}  />
								<label id="lblcompany_2" style="display:none;" class="lblcompany lblclr"></label>
                           </div>
                        </div>
                     </div>
					`
			break;
		default:
			break;
	}
	$("#buttons").remove();
	return html;
}

const parentInputChangeEvent=(event,question_id)=> {
	if (event.target.value.length < 3) { return }
	$.ajax({
		type: "POST",
		data: { solicitation_number: event.target.value, question_id },
		enctype: 'multipart/form-data',
		url: "/AnswerWizard/GetQuestionParamsFields",
		success: function (result) {
			result = jQuery.parseJSON(result);			
			if (result.records && result.records != 0) {
				const resp = result.records[0];
				$("#txtnaicscode_2").val(resp.naics_code).trigger('keyup')
				if (resp.funding_sub_agency_name) {
					//
					$(`div[parentdiv='awarding_sub_agency_3'] input`)[0].value = resp.funding_sub_agency_name;
					$(`div[parentdiv='awarding_sub_agency_3'] label:last`).text(resp.funding_sub_agency_code);
				}
				if (resp.funding_agency_name) {
					$(`div[parentdiv='awarding_agency_3'] input`)[0].value = resp.funding_agency_name;
					$(`div[parentdiv='awarding_agency_3'] label:last`).text(resp.funding_agency_code)
				}
				if (resp.funding_office_name) {
					$(`div[parentdiv='awarding_office_3'] input`)[0].value = resp.funding_office_name;
					$(`div[parentdiv='awarding_office_3'] label:last`).text(resp.funding_office_code)
				}
				// 'funding-agency'
				
				if ((resp.set_aside && resp.set_aside_code) && (resp.set_aside_code !='NONE')) {
					
					OKSocioAside = [{
						text: resp.set_aside,
						value: resp.set_aside_code
					}]
					renderSetAsideForFixedUI();
					$('#lblRes_SocioAside').text(OKSocioAside.length - 1);
					$('.OpenMinContSizeAside').val(resp.set_aside);
					$("#Res_totalSocio_Aside").css("display", "block");
				}
				if (resp.product_or_service_code) {
					$(`div[parentdiv='7'] input`)[0].value = resp.product_or_service_code;
				}

				if ($(`div[parentdiv='8'] select`).length!=0) {
					$(`div[parentdiv='8'] select`)[0].value = 20;
				}
				if ($(`div[parentdiv='9'] select`).length != 0) {
					$(`div[parentdiv='9'] select`)[0].value = 3;
				}
				
				
			}
			else {
			
			}
			
		},
		error: function (error) { }
	});


}

