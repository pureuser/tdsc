document.addEventListener('DOMContentLoaded', function () {
    const reportTrack = document.getElementById('report-carousel-track')
    const reportPrevBtn = document.getElementById('report-prev-btn')
    const reportNextBtn = document.getElementById('report-next-btn')
    const reportIndicators = document.querySelectorAll(
        '#report-indicator-container button'
    )

    let currentIndex = 0
    const pageCount = document.querySelectorAll(
        '#report-carousel-track > div'
    ).length

    function updateCarousel() {
        reportTrack.style.transform = `translateX(-${currentIndex * 100}%)`
        reportIndicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.remove('bg-gray-300')
                indicator.classList.add('bg-yellow-400')
            } else {
                indicator.classList.remove('bg-yellow-400')
                indicator.classList.add('bg-gray-300')
            }
        })
    }

    function goToNext() {
        currentIndex = currentIndex === pageCount - 1 ? 0 : currentIndex + 1
        updateCarousel()
    }

    reportPrevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? pageCount - 1 : currentIndex - 1
        updateCarousel()
    })

    reportNextBtn.addEventListener('click', goToNext)

    reportIndicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'))
            updateCarousel()
        })
    })

    updateCarousel()

    let autoPlayInterval = setInterval(goToNext, 5000)

    reportTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval)
    })

    reportTrack.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(goToNext, 5000)
    })
})
