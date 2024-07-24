import { formatToSlug, formatToPrice, formatToPercent } from "./format.js"

document.addEventListener("DOMContentLoaded", () => {
    handleSlugInput()
    handlePriceInput()
    handlePercentInput()
    handleSalePriceInput()
    handleImageInput()
    handleImageInputLabel()
    setSalePriceInputValue()
})

function handleSlugInput() {
    const slugInp = document.querySelector("#inp-slug")
    const nameInp = document.querySelector("#inp-name")

    if (slugInp) {
        slugInp.addEventListener("change", () => slugInp.value = formatToSlug(slugInp.value))

        nameInp && nameInp.addEventListener("change", () => slugInp.value = formatToSlug(nameInp.value))
    }
}

function handlePriceInput() {
    const priceInp = document.querySelector("#inp-price")
    
    if (priceInp) {
        priceInp.addEventListener("change", () => {
            priceInp.value = formatToPrice(priceInp.value)
            setSalePriceInputValue()
        })
    }
}

function handlePercentInput() {
    const percentInp = document.querySelector("#inp-discont")
    
    if (percentInp) {
        percentInp.addEventListener("change", () => {
            percentInp.value = formatToPercent(percentInp.value)
            setSalePriceInputValue()
        })
    }
}

function handleSalePriceInput() {
    const salePriceInp = document.querySelector("#inp-sale-price")
    
    if (salePriceInp) {
        salePriceInp.addEventListener("change", setSalePriceInputValue)
    }
}

function handleImageInputLabel() {
    const lables = document.querySelectorAll(".image-inp-label")
    
    if (lables) {
        lables.forEach(lable => {
            lable.addEventListener("dragleave", (e) => {
                lable.classList.remove("draging-over")
            })
            
            lable.addEventListener("dragover", (e) => {
                e.preventDefault()
                lable.classList.add("draging-over")
            })
            
            lable.addEventListener("drop", (e) => {
                e.preventDefault()
                
                const input = lable.parentNode.querySelector("input")
                
                input.files = e.dataTransfer.files
                lable.classList.remove("draging-over")
                setLabelImage(input)
            })
        })
    }
}

function handleImageInput() {
    const imgInputs = document.querySelectorAll(".image-input")

    if (imgInputs) {
        imgInputs.forEach(input => {
            input.addEventListener("change", () => setLabelImage(input))
        })
    }
}

function setSalePriceInputValue() {
    const salePriceInp = document.querySelector("#inp-sale-price")
    const priceInp = document.querySelector("#inp-price")
    const percentInp = document.querySelector("#inp-discont")
    
    if (salePriceInp) {
        const priceInpValue = priceInp.value
        const percentInpValue = percentInp.value
        
        salePriceInp.value = (priceInpValue - (percentInpValue / 100 * priceInpValue)).toFixed(2)
    }
}

function setLabelImage(input) {
    const labelImg = input.parentNode.querySelector("img")
    const {files} = input

    if (labelImg && files.length) {
        const reader = new FileReader()
        
        reader.readAsDataURL(input.files[0])
        
        reader.onload = (e) => {
            labelImg.src = e.target.result
        }

        labelImg.classList.remove("disabled")
    } else {
        labelImg.classList.add("disabled")
    }
}
