import { formatToSlug, formatToPrice, formatToPercent } from "./format.js"

document.addEventListener("DOMContentLoaded", () => {
    // Configurações de eventos
    setSlugInpEvents()
    setPriceInpEvents()
    setDiscontInpEvents()
    setSalePriceInpEvents()
    setImgInpEvents()
    setImgInpLabelEvents()

    // Definição de valores
    setSalePriceInpValue()
})

// Input do slug
function setSlugInpEvents() {
    const slugInp = document.querySelector("#inp-slug")
    const nameInp = document.querySelector("#inp-name")
    const descInp = document.querySelector("#inp-desc")

    if (slugInp) {
        // Define e formata o value do slug quando o inp-slug é alterado
        slugInp.addEventListener("change", () => slugInp.value = formatToSlug(slugInp.value))
        
        // Define Formata o value do slug quando outros inputs são alterados
        nameInp?.addEventListener("change", () => {
            slugInp.value = formatToSlug(nameInp.value)
        })

        descInp?.addEventListener("change", () => {
            slugInp.value = formatToSlug(descInp.value)
        })
    }
}

// Input do preço
function setPriceInpEvents() {
    const priceInp = document.querySelector("#inp-price")
    
    if (priceInp) {
        priceInp.addEventListener("change", () => {
            priceInp.value = formatToPrice(priceInp.value)
            setSalePriceInpValue()
        })
    }
}

// Input do disconto
function setDiscontInpEvents() {
    const discontInp = document.querySelector("#inp-discont")
    
    if (discontInp) {
        discontInp.addEventListener("change", () => {
            discontInp.value = formatToPercent(discontInp.value)
            setSalePriceInpValue()
        })
    }
}

// Input do preço e venda
function setSalePriceInpEvents() {
    const salePriceInp = document.querySelector("#inp-sale-price")
    
    if (salePriceInp) {
        salePriceInp.addEventListener("change", setSalePriceInpValue)
    }
}

function setSalePriceInpValue() {
    const salePriceInp = document.querySelector("#inp-sale-price")
    const priceInp = document.querySelector("#inp-price")
    const percentInp = document.querySelector("#inp-discont")
    
    if (salePriceInp) {
        const priceInpValue = priceInp.value
        const percentInpValue = percentInp.value
        
        salePriceInp.value = (priceInpValue - (percentInpValue / 100 * priceInpValue)).toFixed(2)
    }
}

// Inputs de imagem
function setImgInpEvents() {
    const imgInps = document.querySelectorAll(".img-inp")

    if (imgInps) {
        imgInps.forEach(inp => {
            const imgDefaultPath = inp.getAttribute("data-default-file-path")

            inp.addEventListener("change", () => {
                setSrcLabelImg(inp)
            })

            setSrcLabelImg(inp, imgDefaultPath)
        })
    }
}

function setSrcLabelImg(inp, img=null) {
    const labelImg = inp.parentNode.querySelector("img")
    const {files} = inp
    const reader = new FileReader()
    
    if (labelImg && files.length) {
        reader.readAsDataURL(inp.files[0])
        
        reader.onload = (e) => {
            labelImg.src = e.target.result
            setDragDropAreaVisibilite()
        }
        
        labelImg.classList.remove("disabled")
    } else if(img) {
        labelImg.src = `/images/products/${img}`
        labelImg.classList.remove("disabled")
    } else {
        labelImg.classList.add("disabled")
    }

    setDragDropAreaVisibilite()
}

function setDragDropAreaVisibilite() {
    const imgInpLabels = document.querySelectorAll(".img-inp-label")
    
    if (imgInpLabels.length) {
        imgInpLabels.forEach(label => {
            const dragArea = label.querySelector(".drag-area")
            const labelImg = label.querySelector(".label-img")
            
            console.log(labelImg)
            !labelImg.src ? dragArea.classList.add("visible") : dragArea.classList.remove("visible")
        })
    }
}

// Label do input de imagens
function setImgInpLabelEvents() {
    const imgLables = document.querySelectorAll(".img-inp-label")
    
    if (imgLables) {
        imgLables.forEach(lable => {
            const dragArea = lable.querySelector(".drag-area")

            lable.addEventListener("dragleave", () => {
                setDragDropAreaVisibilite()
            })
            
            lable.addEventListener("dragover", (e) => {
                e.preventDefault()
                dragArea.classList.add("visible")
            })
            
            lable.addEventListener("drop", (e) => {
                e.preventDefault()
                
                const inp = lable.parentNode.querySelector("input")
                
                inp.files = e.dataTransfer.files
                setSrcLabelImg(inp)
            })
        })
    }
}

