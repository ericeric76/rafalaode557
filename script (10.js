/**
 * ERIC.DEV - ADVANCED INTERACTION SCRIPT 2026
 * Konsep: Modern, Fluid, & Interactive
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. EFEK MESIN TIK (TYPING EFFECT) PADA HERO
    const typewriterElement = document.querySelector('.hero p');
    const text = typewriterElement.innerText;
    typewriterElement.innerText = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();

    // 2. CUSTOM CURSOR (EFEK BULATAN MENGIKUTI MOUSE)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Tambahkan CSS untuk cursor secara dinamis via JS
    Object.assign(cursor.style, {
        width: '20px',
        height: '20px',
        border: '2px solid #764ba2',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.1s ease, background 0.3s ease'
    });

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Efek membesar saat kursor menyentuh link/tombol
    document.querySelectorAll('a, button').forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(3)';
            cursor.style.background = 'rgba(118, 75, 162, 0.2)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });

    // 3. SCROLL REVEAL (EFEK ELEMEN MUNCUL PERLAHAN)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });

    // 4. ANIMASI SKILL BAR (SMOOTH FILL)
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.progress-bar');
                bars.forEach(bar => {
                    // Ambil persentase dari class atau style
                    const targetWidth = bar.classList.contains('html') ? '90%' : 
                                      bar.classList.contains('css') ? '85%' : '75%';
                    bar.style.width = targetWidth;
                });
            }
        });
    }, { threshold: 0.5 });

    const skillSection = document.querySelector('#skills');
    if (skillSection) skillObserver.observe(skillSection);

    // 5. DOWNLOAD CV DENGAN EFEK LOADING
    window.downloadCV = function() {
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "⚡ Processing...";
        btn.disabled = true;

        setTimeout(() => {
            alert("🚀 CV Eric siap diunduh! (Hubungkan file PDF Anda di sini)");
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    };

    // 6. CONTACT FORM INTERACTIVE FEEDBACK
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerText = "Sending...";
            
            // Simulasi API delay
            setTimeout(() => {
                const formMessage = document.getElementById('formMessage');
                formMessage.innerHTML = "✨ <b>Terima kasih!</b> Pesan Anda telah masuk ke sistem.";
                formMessage.style.color = "#764ba2";
                contactForm.reset();
                btn.innerText = "Kirim Pesan";
            }, 2000);
        });
    }
});