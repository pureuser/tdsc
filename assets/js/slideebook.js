document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const carouselTrack = document.getElementById('carousel-track')
    const prevButton = document.getElementById('prev-button')
    const nextButton = document.getElementById('next-button')
    const indicators = document.querySelectorAll('#indicator-container button')

    let currentIndex = 0
    const pageCount = document.querySelectorAll('#carousel-track > div').length

    // Function to update the carousel
    function updateCarousel() {
        // Update the transform to show the current page
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`

        // Update indicator dots
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.remove('bg-gray-300')
                indicator.classList.add('bg-yellow-400')
            } else {
                indicator.classList.remove('bg-yellow-400')
                indicator.classList.add('bg-gray-300')
            }
        })
    }

    // Previous button click
    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? pageCount - 1 : currentIndex - 1
        updateCarousel()
    })

    // Next button click
    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex === pageCount - 1 ? 0 : currentIndex + 1
        updateCarousel()
    })

    // Indicator dots click
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'))
            updateCarousel()
        })
    })

    // Initialize carousel
    updateCarousel()

    // Optional: Auto-play functionality
    let autoPlayInterval = setInterval(() => {
        goToNext()
    }, 5000)

    // // Pause auto-play on mouse enter
    carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval)
    })

    // // Resume auto-play on mouse leave
    carouselTrack.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            goToNext()
        }, 5000)
    })
})
