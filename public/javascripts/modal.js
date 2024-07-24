document.addEventListener("DOMContentLoaded", () => {
    setCloseButtons()
    setModalButtons()
})

function setCloseButtons() {
    const closeButtons = document.querySelectorAll(".close-button")

    
    closeButtons.forEach(button => {
        button.addEventListener("click", () => closeModalByButton(button))
    })
}

function setModalButtons() {
    const modalButtons = document.querySelectorAll("[data-modal-target]")

    modalButtons.forEach(button => {
        const target = button.getAttribute("data-modal-target")

        button.addEventListener("click", () => openTargetModal(target))
    })
}

function openTargetModal(target) {
    const modal = document.querySelector(`#${target}`)
    const bgModal = modal.parentNode

    modal.classList.remove("close")
    bgModal.classList.remove("close")
}

function closeModalByButton(button) {
    let currentElement = button
    let bgModal = null
    let modal = null

    while(currentElement.parentNode) {
        currentElement = currentElement.parentNode

        if (currentElement.classList.contains("modal")) modal = currentElement
        if (currentElement.classList.contains("background-modal")) {
            bgModal = currentElement
            break
        }
    }

    modal.classList.add("close")
    bgModal.classList.add("close")
}