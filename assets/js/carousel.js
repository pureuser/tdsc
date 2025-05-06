document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel')
    const prevBtn = document.getElementById('prev-btn')
    const nextBtn = document.getElementById('next-btn')

    // Scroll amount for each click (adjust as needed)
    const scrollAmount = 300

    nextBtn.addEventListener('click', function () {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    })

    prevBtn.addEventListener('click', function () {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    })

    // Optional: Add drag scrolling
    let isDown = false
    let startX
    let scrollLeft

    carousel.addEventListener('mousedown', (e) => {
        isDown = true
        carousel.classList.add('active')
        startX = e.pageX - carousel.offsetLeft
        scrollLeft = carousel.scrollLeft
    })

    carousel.addEventListener('mouseleave', () => {
        isDown = false
        carousel.classList.remove('active')
    })

    carousel.addEventListener('mouseup', () => {
        isDown = false
        carousel.classList.remove('active')
    })

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - carousel.offsetLeft
        const walk = (x - startX) * 2 // Scroll speed multiplier
        carousel.scrollLeft = scrollLeft - walk
    })
})
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const carouselContainer = document.getElementById('carousel-container')
    const prevButton = document.getElementById('prev-button')
    const nextButton = document.getElementById('next-button')
    const indicators = document.querySelectorAll('#indicator-container button')

    let currentIndex = 0
    const slideCount = 3

    // Function to update the carousel
    function updateCarousel() {
        // Update the transform to show the current slide
        carouselContainer.style.transform = `translateX(-${
            currentIndex * 100
        }%)`

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
        currentIndex = currentIndex === 0 ? slideCount - 1 : currentIndex - 1
        updateCarousel()
    })

    // Next button click
    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex === slideCount - 1 ? 0 : currentIndex + 1
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
})
