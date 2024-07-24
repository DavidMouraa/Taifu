document.addEventListener("DOMContentLoaded", () => {
    setSidebarToggle()
    disableBackButtonOnMainPage()
})

function setSidebarToggle() {
    const toggle = document.querySelector("#sidebar-toggle")
    
    toggle.addEventListener("click", toggleSidebar)
}

function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar")

    sidebar.classList.toggle("actived")
}

function disableBackButtonOnMainPage() {
    const pageNavLink = document.querySelector(".nav-link.actived")
    const backButton = document.querySelector(".header .left .button")

    pageNavLink.href === window.location.href && backButton.classList.add("disabled")
}