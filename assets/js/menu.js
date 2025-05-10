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
