function formatToSlug(value) {
    return value.normalize("NFD").toLowerCase().trim().replace(/&/g, 'e').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function formatToPrice(value) {
    return Number(value).toFixed(2)
}

function formatToPercent(value) {
    let percent = Number(value.slice(0, 3))
    
    if (percent > 100) percent = 100
    else if (percent < 0) percent = 0

    return percent.toFixed(2)
}

export {formatToSlug, formatToPrice, formatToPercent}