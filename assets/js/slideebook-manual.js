document.addEventListener('DOMContentLoaded', function () {
    const manualTrack = document.getElementById('manual-carousel-track')
    const manualPrevBtn = document.getElementById('manual-prev-btn')
    const manualNextBtn = document.getElementById('manual-next-btn')
    const manualIndicators = document.querySelectorAll(
        '#manual-indicator-container button'
    )

    let currentIndex = 0
    const pageCount = document.querySelectorAll(
        '#manual-carousel-track > div'
    ).length

    function updateCarousel() {
        manualTrack.style.transform = `translateX(-${currentIndex * 100}%)`
        manualIndicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.remove('bg-[#FFFBEE]')
                indicator.classList.add('bg-yellow-400')
            } else {
                indicator.classList.remove('bg-yellow-400')
                indicator.classList.add('bg-[#FFFBEE]')
            }
        })
    }

    function goToNext() {
        currentIndex = currentIndex === pageCount - 1 ? 0 : currentIndex + 1
        updateCarousel()
    }

    manualPrevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? pageCount - 1 : currentIndex - 1
        updateCarousel()
    })

    manualNextBtn.addEventListener('click', goToNext)

    manualIndicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'))
            updateCarousel()
        })
    })

    updateCarousel()

    let autoPlayInterval = setInterval(goToNext, 5000)

    manualTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval)
    })

    manualTrack.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(goToNext, 5000)
    })
})
