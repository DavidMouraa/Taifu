document.addEventListener("DOMContentLoaded", () => {
    setPageLink()
    setNavToggles()
})

function setPageLink() {
    const navLinks = document.querySelectorAll(".nav-link")
    let toggle = null

    for (const link of navLinks) {
        if (window.location.href.includes(link.href) && link.href) {
            link.classList.add("actived")

            toggle = getPageLinkToggle(link)
            toggle && collapseToggle(toggle)
            break
        }
    }
}

function setNavToggles() {
    const navToggles = document.querySelectorAll(".nav-toggle")

    navToggles.forEach(toggle => {
        toggle.addEventListener("click", () => collapseToggle(toggle))
    })
}

function getPageLinkToggle(link) {
    let currentElement = link
    
    while (!currentElement.classList.contains("nav-menu")) {
        currentElement = currentElement.parentNode
    }

    return currentElement.previousElementSibling.classList.contains("nav-toggle") && currentElement.previousElementSibling
}

function collapseToggle(toggle) {
    const menu = toggle.nextElementSibling
    
    toggle.classList.toggle("actived")
    toggle.classList.contains("actived") ? menu.style.height = `${menu.scrollHeight}px` : menu.style.height = "0px"
}

