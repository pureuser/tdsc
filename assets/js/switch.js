function toggleDropdownswitch() {
    document.getElementById('lang-dropdown').style.display =
        document.getElementById('lang-dropdown').style.display === 'block'
            ? 'none'
            : 'block'
}

function setLanguage(lang) {
    const flag = document.getElementById('flag')
    const code = document.getElementById('lang-code')

    if (lang === 'th') {
        flag.src = 'https://flagcdn.com/th.svg'
        code.textContent = 'TH'
    } else {
        flag.src = 'https://flagcdn.com/gb.svg'
        code.textContent = 'EN'
    }

    document.getElementById('lang-dropdown').style.display = 'none'

    // 👉 ถ้าคุณใช้ระบบ i18n หรือ redirect page, สามารถเปลี่ยน URL ที่นี่
    // window.location.href = `/${lang}/`;
}

// ปิด dropdown เมื่อคลิกนอกพื้นที่
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('lang-dropdown')
    const switcher = document.querySelector('.language-switcher')

    if (!switcher.contains(event.target)) {
        dropdown.style.display = 'none'
    }
})
function switchLanguage(lang) {
    console.log('Language switched to:', lang)

    // Remove active class from all language options
    const langOptions = document.querySelectorAll('.lang-option')
    langOptions.forEach((option) => {
        option.classList.remove('active')
    })

    // Add active class to clicked language option
    event.currentTarget.classList.add('active')

    // Add visual feedback
    langOptions.forEach((option) => {
        option.style.opacity = '0.7'
    })

    setTimeout(() => {
        langOptions.forEach((option) => {
            option.style.opacity = '1'
        })
    }, 200)
}
