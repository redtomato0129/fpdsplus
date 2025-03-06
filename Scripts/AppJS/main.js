function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    
    $("#notes").hide();
    $("#calls").hide(); 
    $("#emails").hide();
    $("#files").hide();
    $(".recent-heading-title-notes").hide();
    $("#recent-heading-title-call").hide();
    $("#emails").hide();
    $("#files").hide();

    switch (cityName) {
        case "Notes":
            $("#notes").show();
            $(".recent-heading-title-notes").show();
            $(".recent-heading-title-email").hide();
            $(".recent-heading-title-file").hide();
            $(".recent-heading-title-call").hide();
            break;
        case "Calls":
            $("#calls").show();
            $(".recent-heading-title-notes").hide();
            $(".recent-heading-title-email").hide();
            $(".recent-heading-title-file").hide();
            $(".recent-heading-title-call").show();
            break;
        case "Emails":
            $("#emails").show();
            $(".recent-heading-title-notes").hide();
            $(".recent-heading-title-file").hide();
            $(".recent-heading-title-call").hide();
            $(".recent-heading-title-email").show();
            break;
        case "Files":
            $("#files").show();
            $(".recent-heading-title-notes").hide();
            $(".recent-heading-title-email").hide();
            $(".recent-heading-title-call").hide();
            $(".recent-heading-title-file").show();
            break;
        default:
    }
}

function openNotes() {
    // Declare all variables
    var cityName = 'Notes';
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    $('#btnNotes').addClass('active');

    
    $("#notes").hide();
    $("#calls").hide();
    $("#emails").hide();
    $("#files").hide();

    switch (cityName) {
        case "Notes":
            $("#notes").show();
            break;
        case "Calls":
            $("#calls").show();
            break;
        case "Emails":
            $("#emails").show();
            break;
        case "Files":
            $("#files").show();
            break;
        default:
    }
}


  $(function()
  {
    var CKEDITOR =window.CKEDITOR;
    CKEDITOR.replace("articleContent", {
        // Define the toolbar groups as it is a more accessible solution.
        toolbarGroups: [{
            "name": "basicstyles",
            "groups": ["basicstyles","Underline"]
          },
         
         
        ],
        // Remove the redundant buttons from toolbar groups defined above.
        removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
      });
    CKEDITOR.instances["articleContent"].setData("<h1> data to render</h1>")
  });