function routeTo(value) {
    //document.location = `/ReportsCentral/NewPage?graph=${value}`;
}

$(document).ready(function(){
    $("#fundingAgencyLabel").on("click", function () {
        $("#fundingAgencyModal").show();
        agencyHtml("#agencyHtml")
    });

    // Close modal on X
    $(".close").on("click", function () {
        $("#fundingAgencyModal").hide();
    });

    // Save funding agency name
    $("#saveAgency").on("click", function () {
        const agency = $("#txtdept_2").val().trim();
        if (agency) {
            $("#fundingAgencyLabel").text(agency);
        }
        $("#fundingAgencyModal").hide();
    });

    // Optional: close modal on outside click
    $(window).on("click", function (event) {
        if (event.target.id === "fundingAgencyModal") {
            $("#fundingAgencyModal").hide();
        }
    });
});

function toggleSection(id) {
    const sections = ['funding', 'awarding'];

    sections.forEach(sectionId => {
        const content = document.getElementById(sectionId);
        const icon = document.getElementById('icon-' + sectionId);

        if (sectionId === id) {
            const isActive = content.classList.contains('active');
            if (!isActive) {
                content.classList.add('active');
                icon.textContent = '–';
            }
        } else {
            document.getElementById(sectionId).classList.remove('active');
            document.getElementById('icon-' + sectionId).textContent = '+';
        }
    });
}

function agencyHtml(htmlId) {
    if (!$("#scriptEleSocio").length) {
        let scriptEleSocio = document.createElement("script");
        scriptEleSocio.id = "scriptEleSocio";
        scriptEleSocio.setAttribute("src", "/Scripts/AppJS/Search.js");
        document.body.appendChild(scriptEleSocio);
        scriptEleSocio.onload = function () {

        }
    }
    const html = `      <div class="col-md-12" >
                           <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                 <span class="input-group-text OpenDeptPopup btndeptrowclear" id="btndeptrowclear_2"
								 data-toggle="tooltip" title="Click to clear the data in this row"><i class="ti-close"></i></span>
                              </div>
                              <input type="text" class="DIS_002 form-control txtdept" id="txtdept_2"     />
								<label id="lbldept_2" style="display:none;" class="lbldept lblclr"></label>
                           </div>
                        </div>`;
    $(htmlId).html(html);
    // $("#editAgency").html(html);

}
