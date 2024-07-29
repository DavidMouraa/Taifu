document.addEventListener("DOMContentLoaded", () => {
    setSidebarToggle()
})

function setSidebarToggle() {
    const toggle = document.querySelector("#sidebar-toggle")
    
    toggle.addEventListener("click", toggleSidebar)
}

function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar")

    sidebar.classList.toggle("actived")
}