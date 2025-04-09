function routeTo(value) {
    //document.location = `/ReportsCentral/NewPage?graph=${value}`;
}

$(document).ready(function(){
    $("#funding-label").on("click", function () {
        $("#fundingModal").show();
        $("#fundingInput").val(""); // Clear input on open
    });

    // Close modal on X
    $(".close").on("click", function () {
        $("#fundingModal").hide();
    });

    // Save funding agency name
    $("#saveFunding").on("click", function () {
        const agency = $("#fundingInput").val().trim();
        if (agency) {
            $("#funding-label").text(agency);
        }
        $("#fundingModal").hide();
    });

    // Optional: close modal on outside click
    $(window).on("click", function (event) {
        if (event.target.id === "fundingModal") {
            $("#fundingModal").hide();
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

function fundingAgencyModal() {
    $("#fundingAgencyModal").modal('show')
    $("#fundingInput").val('');
    $("#txtdept_2").val('');
}