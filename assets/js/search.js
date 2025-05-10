// เพิ่มฟังก์ชันสำหรับการค้นหา
document.addEventListener('DOMContentLoaded', function () {
    // ค้นหาปุ่มค้นหาในส่วน mobile และ desktop
    const mobileSearchButton = document.getElementById('btnSearchMobile')
    const desktopSearchButton = document.getElementById('btnSearch')
    const searchOverlay = document.getElementById('searchOverlay')
    const searchPanel = document.getElementById('searchPanel')
    const closeSearch = document.getElementById('closeSearch')

    // Add event listener for mobile search button
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', function (e) {
            e.preventDefault()
            showSearch()
        })
    }

    // Add event listener for desktop search button
    if (desktopSearchButton) {
        desktopSearchButton.addEventListener('click', function (e) {
            e.preventDefault()
            showSearch()
        })
    }

    // Close search function
    if (closeSearch) {
        closeSearch.addEventListener('click', hideSearch)
    }

    // Click outside to close
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay) {
                hideSearch()
            }
        })
    }

    // Functions for showing and hiding search overlay
    function showSearch() {
        searchOverlay.classList.remove('hidden')
        // Delay for transition effect
        setTimeout(function () {
            searchOverlay.classList.add('opacity-100')
            searchPanel.classList.add('opacity-100')
            searchPanel.classList.remove('translate-y-[-20px]')
            document.body.classList.add('overflow-hidden')
        }, 10)
    }

    function hideSearch() {
        searchOverlay.classList.remove('opacity-100')
        searchPanel.classList.remove('opacity-100')
        searchPanel.classList.add('translate-y-[-20px]')

        setTimeout(function () {
            searchOverlay.classList.add('hidden')
            document.body.classList.remove('overflow-hidden')
        }, 300)
    }

    // เพิ่มฟังก์ชันสำหรับปุ่มค้นหาในส่วน Mobile Menu Header
    const searchButtonInMobileMenu = document.querySelector(
        '#mobileMenuPanel .flex.justify-between.items-center button:first-child'
    )
    if (searchButtonInMobileMenu) {
        searchButtonInMobileMenu.addEventListener('click', function (e) {
            e.preventDefault()

            // ซ่อน Mobile Menu ก่อนแสดง Search Overlay
            const mobileMenuPanel = document.getElementById('mobileMenuPanel')
            const mobileMenuOverlay =
                document.getElementById('mobileMenuOverlay')

            mobileMenuPanel.classList.add('translate-x-full')
            mobileMenuOverlay.classList.remove('opacity-100')
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden')
            }, 300)

            // แสดง Search Overlay
            setTimeout(() => {
                showSearch()
            }, 300)
        })
    }
})
