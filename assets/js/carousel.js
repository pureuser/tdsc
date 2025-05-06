document.addEventListener('DOMContentLoaded', function () {
    const seminarCarousel = document.getElementById('seminar-carousel')
    const seminarPrevBtn = document.getElementById('seminar-prev-btn')
    const seminarNextBtn = document.getElementById('seminar-next-btn')

    const scrollAmount = 300

    seminarNextBtn.addEventListener('click', function () {
        seminarCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    })

    seminarPrevBtn.addEventListener('click', function () {
        seminarCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    })

    let isDown = false
    let startX
    let scrollLeft

    seminarCarousel.addEventListener('mousedown', (e) => {
        isDown = true
        seminarCarousel.classList.add('active')
        startX = e.pageX - seminarCarousel.offsetLeft
        scrollLeft = seminarCarousel.scrollLeft
    })

    seminarCarousel.addEventListener('mouseleave', () => {
        isDown = false
        seminarCarousel.classList.remove('active')
    })

    seminarCarousel.addEventListener('mouseup', () => {
        isDown = false
        seminarCarousel.classList.remove('active')
    })

    seminarCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - seminarCarousel.offsetLeft
        const walk = (x - startX) * 2
        seminarCarousel.scrollLeft = scrollLeft - walk
    })
})
