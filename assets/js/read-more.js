// Utility: หาคลาส line-clamp (เฉพาะตัวไม่ responsive เช่น 'line-clamp-3', ไม่แตะ 'xl:line-clamp-none')
function findNonResponsiveLineClampClass(el) {
    return Array.from(el.classList).find(
        (c) => c.startsWith('line-clamp-') && !c.includes(':')
    )
}

// Utility: หาคลาสความสูงเริ่มต้นของกล่อง (เช่น h-[136px], h-36) ที่ไม่มี responsive prefix
function findNonResponsiveHeightClass(el) {
    return Array.from(el.classList).find(
        (c) => c.startsWith('h-') && !c.includes(':')
    )
}

function setupReadMoreToggles() {
    // รองรับทั้งการใช้ id ขึ้นต้นด้วย read-more- และ/หรือ class .js-read-more
    const buttons = document.querySelectorAll(
        '[id^="read-more-"], .js-read-more'
    )

    buttons.forEach((btn) => {
        // หา container (div.relative ...) และย่อหน้าคอนเทนต์ (พี่ของปุ่ม)
        const container = btn.closest('.relative')
        if (!container) return

        // กรณีโครงสร้างเหมือนตัวอย่าง: ย่อหน้าคอนเทนต์คือ element ก่อนหน้า btn
        let contentP = btn.previousElementSibling
        // เผื่อมีการแทรก node อื่น ให้สำรองด้วยการค้นหา p ตัวแรกที่ไม่ใช่ปุ่ม
        if (!contentP || contentP.tagName !== 'P') {
            contentP = container.querySelector('p:not([id])')
        }
        if (!contentP) return

        // เก็บค่าเริ่มต้นไว้ใน dataset ของปุ่ม (ต่อบล็อค)
        if (!btn.dataset.initialized) {
            const initialClamp = findNonResponsiveLineClampClass(contentP) || ''
            const initialHeight = findNonResponsiveHeightClass(container) || ''
            btn.dataset.initialClamp = initialClamp // เช่น 'line-clamp-3' หรือ 'line-clamp-4' (อาจว่าง)
            btn.dataset.initialHeight = initialHeight // เช่น 'h-[136px]' หรือ 'h-36' (อาจว่าง)
            btn.dataset.expanded = 'false'
            btn.dataset.initialized = 'true'
        }

        // ตั้ง handler
        btn.addEventListener('click', () => {
            const expanded = btn.dataset.expanded === 'true'
            const initialClamp = btn.dataset.initialClamp
            const initialHeight = btn.dataset.initialHeight

            if (!expanded) {
                // ขยาย
                if (initialClamp) contentP.classList.remove(initialClamp)
                // ไม่แตะคลาสที่มี prefix responsive เช่น 'xl:line-clamp-none'
                contentP.classList.add('line-clamp-none')

                if (initialHeight) container.classList.remove(initialHeight)
                container.classList.add('h-auto')

                btn.textContent = 'READ LESS'
                btn.dataset.expanded = 'true'
            } else {
                // ย่อกลับ
                contentP.classList.remove('line-clamp-none')
                if (initialClamp) contentP.classList.add(initialClamp)

                container.classList.remove('h-auto')
                if (initialHeight) container.classList.add(initialHeight)

                btn.textContent = 'READ MORE'
                btn.dataset.expanded = 'false'
            }
        })
    })
}

// เรียกใช้เมื่อ DOM พร้อม
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReadMoreToggles)
} else {
    setupReadMoreToggles()
}
