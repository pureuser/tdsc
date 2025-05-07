document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide')
    const prevButton = document.getElementById('prevSlide')
    const nextButton = document.getElementById('nextSlide')
    let currentSlide = 0
    const totalSlides = slides.length

    // Create bullet navigation
    createBulletNavigation()

    // Initialize first slide
    slides[currentSlide].classList.add('active')
    updateBulletNavigation()

    // Function to create bullet navigation
    function createBulletNavigation() {
        // Remove existing bullet navigation if any
        const existingBullets = document.querySelector('.bullets-container')
        if (existingBullets) {
            existingBullets.remove()
        }

        // Create container for bullets
        const bulletContainer = document.createElement('div')
        bulletContainer.className =
            'bullets-container absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 bg-[#FFFBEE]  rounded-[40px] w-full max-w-[120px] justify-center items-center h-3 lg;block hidden'

        // Create a bullet for each slide
        for (let i = 0; i < totalSlides; i++) {
            const bullet = document.createElement('div')
            bullet.className =
                'bullet h-3 rounded-full cursor-pointer transition-all duration-300'
            bullet.style.width = i === currentSlide ? '50%' : '50%'
            bullet.style.backgroundColor =
                i === currentSlide ? '#FADA54' : 'rgba(255, 255, 255, 0.5)'
            bullet.dataset.index = i

            // Add click event to each bullet
            bullet.addEventListener('click', function () {
                goToSlide(parseInt(this.dataset.index))
            })

            bulletContainer.appendChild(bullet)
        }

        // Add bullet container to the slider
        document.getElementById('slider-container').appendChild(bulletContainer)
    }

    // Function to update bullet navigation
    function updateBulletNavigation() {
        const bullets = document.querySelectorAll('.bullet')
        bullets.forEach((bullet, index) => {
            // Apply animation for active/inactive states
            if (index === currentSlide) {
                bullet.style.width = '50%'
                bullet.style.backgroundColor = '#FACC15'
                bullet.classList.add('animate-pulse')
                setTimeout(() => {
                    bullet.classList.remove('animate-pulse')
                }, 500)
            } else {
                bullet.style.width = '50%'
                bullet.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
            }
        })
    }

    // Function to go to specific slide
    function goToSlide(index) {
        if (index === currentSlide) return

        // Determine direction for animation
        const direction = index > currentSlide ? 'next' : 'prev'

        // Hide current slide with animation
        const currentSlideElement = slides[currentSlide]
        currentSlideElement.classList.add(
            direction === 'next' ? 'slide-out-left' : 'slide-out-right'
        )
        currentSlideElement.classList.remove('active')

        // Update current slide index
        currentSlide = index

        // Show new slide with animation
        const newSlideElement = slides[currentSlide]
        newSlideElement.classList.add(
            'active',
            direction === 'next' ? 'slide-in-right' : 'slide-in-left'
        )

        // Remove animation classes after transition
        setTimeout(() => {
            currentSlideElement.classList.remove(
                'slide-out-left',
                'slide-out-right'
            )
            newSlideElement.classList.remove('slide-in-right', 'slide-in-left')
        }, 500)

        // Update bullet navigation
        updateBulletNavigation()
    }

    // Function to change slides
    function changeSlide(direction) {
        // Calculate new slide index
        const newIndex =
            direction === 'next'
                ? (currentSlide + 1) % totalSlides
                : (currentSlide - 1 + totalSlides) % totalSlides

        // Go to the new slide
        goToSlide(newIndex)
    }

    // Add event listeners to buttons
    prevButton.addEventListener('click', function () {
        changeSlide('prev')
    })

    nextButton.addEventListener('click', function () {
        changeSlide('next')
    })

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            changeSlide('prev')
        } else if (e.key === 'ArrowRight') {
            changeSlide('next')
        }
    })

    // Auto slideshow
    let slideInterval = setInterval(function () {
        changeSlide('next')
    }, 10000) // Change slide every 5 seconds

    // Pause slideshow on hover
    const sliderContainer = document.getElementById('slider-container')
    sliderContainer.addEventListener('mouseenter', function () {
        clearInterval(slideInterval)
    })

    sliderContainer.addEventListener('mouseleave', function () {
        slideInterval = setInterval(function () {
            changeSlide('next')
        }, 10000)
    })
})
