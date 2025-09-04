// หา line-clamp ที่ไม่ใช่แบบ responsive (ไม่มี prefix 'xl:' ฯลฯ)
function findNonResponsiveLineClampClass(el) {
    return Array.from(el.classList).find(
        (c) => c.startsWith('line-clamp-') && !c.includes(':')
    )
}

// หา class ความสูงที่ไม่ใช่แบบ responsive (เช่น h-[120px], h-36)
function findNonResponsiveHeightClass(el) {
    return Array.from(el.classList).find(
        (c) => c.startsWith('h-') && !c.includes(':')
    )
}

// หา <p> เนื้อหาก่อนปุ่ม แม้มี <hr> คั่นอยู่
function getContentParagraph(btn, container) {
    // ไล่ย้อนพี่ก่อน ถ้าติด <hr> จะข้ามให้จนกว่าจะเจอ <p>
    let n = btn.previousElementSibling
    while (n && n.tagName !== 'P') n = n.previousElementSibling
    if (n && n.tagName === 'P') return n

    // สำรอง: หา <p> ที่ "น่าจะเป็นเนื้อหา" (มี line-clamp-* หรือเป็น <p> ตัวแรกที่ไม่ใช่ปุ่ม)
    return (
        container.querySelector('p[class*="line-clamp-"]') ||
        container.querySelector('p:not([id])')
    )
}

function setupReadMoreToggles() {
    // รองรับทั้ง id แบบ read-more-*, readmore* และคลาส .js-read-more
    const buttons = document.querySelectorAll(
        '[id^="read-more-"], [id^="readmore"], .js-read-more'
    )

    buttons.forEach((btn) => {
        const container = btn.closest('div') // ใช้ div ใกล้สุดของปุ่มเป็น container เบื้องต้น
        if (!container) return

        const contentP = getContentParagraph(btn, container)
        if (!contentP) return

        // บันทึกค่าเริ่มต้นต่อบล็อค
        if (!btn.dataset.initialized) {
            const initialClamp = findNonResponsiveLineClampClass(contentP) || ''
            // ตรวจให้ได้ว่า h-* อยู่ที่ p หรือ container
            const pHeight = findNonResponsiveHeightClass(contentP) || ''
            const containerHeight =
                findNonResponsiveHeightClass(container) || ''

            let heightOwner = ''
            let initialHeight = ''

            if (pHeight) {
                heightOwner = 'content'
                initialHeight = pHeight
            } else if (containerHeight) {
                heightOwner = 'container'
                initialHeight = containerHeight
            }

            btn.dataset.initialClamp = initialClamp // เช่น 'line-clamp-4' (อาจว่าง)
            btn.dataset.initialHeight = initialHeight // เช่น 'h-[120px]' หรือ 'h-36' (อาจว่าง)
            btn.dataset.heightOwner = heightOwner // 'content' | 'container' | ''
            btn.dataset.expanded = 'false'
            btn.dataset.initialized = 'true'
        }

        btn.addEventListener('click', () => {
            const expanded = btn.dataset.expanded === 'true'
            const initialClamp = btn.dataset.initialClamp
            const initialHeight = btn.dataset.initialHeight
            const heightOwner = btn.dataset.heightOwner

            // ตัวที่ต้องใส่/เอา h-auto
            const heightTarget =
                heightOwner === 'content'
                    ? contentP
                    : heightOwner === 'container'
                    ? container
                    : null

            if (!expanded) {
                // === ขยาย ===
                if (initialClamp) contentP.classList.remove(initialClamp)
                contentP.classList.add('line-clamp-none') // ไม่แตะ xl:line-clamp-none

                if (heightTarget) {
                    if (initialHeight)
                        heightTarget.classList.remove(initialHeight)
                    heightTarget.classList.add('h-auto')
                }

                btn.textContent = 'READ LESS'
                btn.dataset.expanded = 'true'
            } else {
                // === ย่อกลับ ===
                contentP.classList.remove('line-clamp-none')
                if (initialClamp) contentP.classList.add(initialClamp)

                if (heightTarget) {
                    heightTarget.classList.remove('h-auto')
                    if (initialHeight) heightTarget.classList.add(initialHeight)
                }

                btn.textContent = 'READ MORE'
                btn.dataset.expanded = 'false'
            }
        })
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReadMoreToggles)
} else {
    setupReadMoreToggles()
}
// ขยายอย่างเดียว: กดแล้วเปิด panel และซ่อนปุ่ม overlay ถาวร (จนกว่าจะรีเฟรช)
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.xpen-toggle[data-expands]')
    if (!btn) return

    const sel = btn.getAttribute('data-expands')
    const panel = document.querySelector(sel)
    if (!panel) return

    // ถ้ายังไม่เปิด -> เปิด + ซ่อนปุ่ม
    if (!panel.classList.contains('open')) {
        panel.classList.add('open')
        btn.setAttribute('aria-expanded', 'true')

        // เอาข้อความ/ไอคอนออก (กันซ้อน) แล้วซ่อนปุ่ม
        const label = btn.querySelector('[data-label]')
        if (label) label.textContent = ''
        const icon = btn.querySelector('svg[data-icon]')
        if (icon) icon.remove()

        btn.classList.add('xpen-gone') // << หาย overlay ทันที
    }

    // ถ้าเปิดอยู่แล้ว ไม่ทำอะไร (ไม่ย่อ)
})
