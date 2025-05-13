function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId)
    const arrowId = 'arrow' + menuId.substring(4)
    const arrow = document.getElementById(arrowId)

    menu.classList.toggle('hidden')

    if (menu.classList.contains('hidden')) {
        arrow.classList.remove('rotate-180')
    } else {
        arrow.classList.add('rotate-180')
    }
}
// Menu Toggle Functionality for Mobile
document.addEventListener('DOMContentLoaded', function () {
    // Only run this code if the mobile elements exist
    const mobileMenuToggle = document.getElementById('mobileMenuToggle')
    const closeMobileMenu = document.getElementById('closeMobileMenu')
    const mobileMenuPanel = document.getElementById('mobileMenuPanel')
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay')

    if (
        mobileMenuToggle &&
        closeMobileMenu &&
        mobileMenuPanel &&
        mobileMenuOverlay
    ) {
        // Open Mobile Menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuPanel.classList.remove('translate-x-full')
            mobileMenuOverlay.classList.remove('hidden')
            setTimeout(() => {
                mobileMenuOverlay.classList.add('opacity-100')
            }, 10)
            document.body.style.overflow = 'hidden'
        })

        // Close Mobile Menu (both from X button and from overlay)
        function closeMobileMenuFunc() {
            mobileMenuPanel.classList.add('translate-x-full')
            mobileMenuOverlay.classList.remove('opacity-100')
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden')
            }, 300)
            document.body.style.overflow = ''
        }

        closeMobileMenu.addEventListener('click', closeMobileMenuFunc)
        mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc)

        // Mobile Submenu Toggle
        const mobileSubmenuToggle = document.querySelectorAll('[data-submenu]')

        mobileSubmenuToggle.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const submenuId = toggle.getAttribute('data-submenu')
                const submenu = document.getElementById(submenuId)
                const arrow = toggle.querySelector('.mobile-arrow-icon')

                if (
                    submenu.style.maxHeight === '0px' ||
                    submenu.style.maxHeight === ''
                ) {
                    submenu.style.maxHeight = '400px'
                    arrow.style.transform = 'rotate(180deg)'
                } else {
                    submenu.style.maxHeight = '0px'
                    arrow.style.transform = 'rotate(0)'
                }
            })
        })
    }
})
