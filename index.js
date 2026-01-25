document.addEventListener("DOMContentLoaded", function()  {
    var menuToggle = document.getElementById ("menu-toggle");
    var menu = document.getElementById("menu");
    var menuOverlay = document.getElementById("menu-overlay");
    var dropdownToggle = document.getElementById("dropdown-toggle");
    var dropdown = document.querySelector(".dropdown");

    menuToggle.addEventListener("click", function() {
        menu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
    });

    menuOverlay.addEventListener("click", function() {
        menu.classList.remove("active");
        menuOverlay.classList.remove("active");
        dropdown.classList.remove("active");
    });

    dropdownToggle.addEventListener("click", function(event) {
        event.preventDefault(); 
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target) && !dropdownToggle.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    });

   
});
