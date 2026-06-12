gsap.registerPlugin(ScrollTrigger, TextPlugin);

const mm = gsap.matchMedia();

/* ==============================================
   HERO ANIMATION
   ============================================== */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
    .to('.hero-tagline', { opacity: 1, y: 0, duration: 1.2 })
    .to('.hero-title', { opacity: 1, duration: 0.01 })
    .from('.hero-title .line1', { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.3')
    .from('.hero-title .line2', { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.8')
    .from('.hero-title .line3', { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.8')
    .to('.hero-sub', { opacity: 1, duration: 1 }, '-=0.5')
    .to('.hero-scroll-hint', { opacity: 1, duration: 1 }, '-=0.3');

/* ==============================================
   CHAPTER HEADERS – Fade in on scroll
   ============================================== */
document.querySelectorAll('.ch-header').forEach((header) => {
    ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        end: 'top 30%',
        invalidateOnRefresh: true,
        onEnter: () => gsap.to(header, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    });
});

/* ==============================================
   QUOTE BLOCKS – Typewriter reveal
   ============================================== */
document.querySelectorAll('.quote-block').forEach((block) => {
    const textEl = block.querySelector('.quote-text');
    if (!textEl) return;

    const origText = textEl.textContent;
    textEl.textContent = '';
    const chars = origText.split('');
    chars.forEach((ch) => {
        const span = document.createElement('span');
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        textEl.appendChild(span);
    });

    const spans = textEl.querySelectorAll('span');

    /* Reveal block + typewriter */
    ScrollTrigger.create({
        trigger: block,
        start: 'top 85%',
        end: 'top 35%',
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.to(block, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        }
    });

    gsap.fromTo(spans,
        { opacity: 0 },
        {
            opacity: 1,
            stagger: 0.035,
            duration: 0.01,
            ease: 'none',
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
                invalidateOnRefresh: true
            }
        }
    );
});

/* ==============================================
   CHAPTER NARRATIVE – Fade in
   ============================================== */
document.querySelectorAll('.ch-narrative').forEach((narr) => {
    ScrollTrigger.create({
        trigger: narr,
        start: 'top 85%',
        end: 'top 40%',
        invalidateOnRefresh: true,
        onEnter: () => gsap.to(narr, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    });
    gsap.set(narr, { opacity: 0, y: 30 });
});

/* ==============================================
   PSYCHO CARDS – Staggered reveal
   ============================================== */
gsap.utils.toArray('.psycho-card').forEach((card, i) => {
    ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        end: 'top 30%',
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.3,
                ease: 'power3.out'
            });
        }
    });
});

/* ==============================================
   CAGE CHAPTER – Screen Shake on Vaas quote
   ============================================== */
const vaasQuotes = document.querySelectorAll('#ch-cage .quote-block');
ScrollTrigger.create({
    trigger: '#ch-cage',
    start: 'top 60%',
    end: 'top 20%',
    invalidateOnRefresh: true,
    onEnter: () => {
        document.body.classList.add('shake-active');
        gsap.delayedCall(1.2, () => document.body.classList.remove('shake-active'));
    }
});

/* ==============================================
   HOYT CHAPTER – Screen Shake on poker quote
   ============================================== */
ScrollTrigger.create({
    trigger: '#ch-hoyt .quote-block',
    start: 'top 70%',
    end: 'top 30%',
    invalidateOnRefresh: true,
    onEnter: () => {
        document.body.classList.add('shake-active');
        gsap.delayedCall(1, () => document.body.classList.remove('shake-active'));
    }
});

/* ==============================================
   POKER CARDS – Deal animation
   ============================================== */
gsap.utils.toArray('.poker-card').forEach((card, i) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '#ch-hoyt',
            start: 'top 60%',
            end: 'top 25%',
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
});

gsap.to('.poker-chip', {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
        trigger: '#ch-hoyt',
        start: 'top 55%',
        end: 'top 20%',
        scrub: 1,
        invalidateOnRefresh: true
    }
});

/* ==============================================
   FINAL QUOTE – Fade in
   ============================================== */
ScrollTrigger.create({
    trigger: '.final-quote',
    start: 'top 85%',
    end: 'top 50%',
    invalidateOnRefresh: true,
    onEnter: () => gsap.to('.final-quote', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
});
gsap.set('.final-quote', { opacity: 0, y: 20 });

/* ==============================================
   CHOICE SECTION – Hover split effect (Desktop)
   ============================================== */
mm.add('(min-width: 769px)', () => {
    const leftSide = document.querySelector('.left-choice');
    const rightSide = document.querySelector('.right-choice');
    const choiceSides = document.querySelectorAll('.choice-side');

    choiceSides.forEach((side) => {
        side.addEventListener('mouseenter', () => {
            gsap.to(side, { flex: 1.5, duration: 0.6, ease: 'power3.out' });
            const other = side.classList.contains('left-choice') ? rightSide : leftSide;
            gsap.to(other, { flex: 0.8, duration: 0.6, ease: 'power3.out' });
        });

        side.addEventListener('mouseleave', () => {
            gsap.to([leftSide, rightSide], { flex: 1, duration: 0.5, ease: 'power3.out' });
        });
    });

    /* Choice overlay glow on hover */
    choiceSides.forEach((side) => {
        const overlay = side.querySelector('.choice-overlay');
        side.addEventListener('mouseenter', () => {
            gsap.to(overlay, { opacity: 1, duration: 0.5 });
        });
        side.addEventListener('mouseleave', () => {
            gsap.to(overlay, { opacity: 0, duration: 0.5 });
        });
    });
});

/* ==============================================
   CHOICE SECTION – Tap effect (Mobile)
   ============================================== */
mm.add('(max-width: 768px)', () => {
    document.querySelectorAll('.choice-side').forEach((side) => {
        side.addEventListener('click', () => {
            const overlay = side.querySelector('.choice-overlay');
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
            gsap.to(overlay, { opacity: 0, duration: 0.3, delay: 0.8 });
        });
    });
});

/* ==============================================
   CHARACTER IMAGES – Lazy load + reveal on scroll
   ============================================== */
document.querySelectorAll('.character-image').forEach((el) => {
    const img = el.querySelector('img');
    const isGlitch = el.dataset.glitch === 'true';
    const isDualSecond = el.classList.contains('second');

    gsap.set(el, { opacity: 0, scale: 0.85, clipPath: 'inset(0 100% 0 0)' });

    ScrollTrigger.create({
        trigger: el.closest('.chapter'),
        start: 'top 75%',
        end: 'top 30%',
        invalidateOnRefresh: true,
        onEnter: () => {
            if (img && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }

            const fromX = isDualSecond ? -100 : 100;
            gsap.to(el, {
                opacity: 1,
                scale: 1,
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.2,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            if (isGlitch) {
                gsap.fromTo(el, { x: 0 }, {
                    x: '+=4',
                    duration: 0.04,
                    repeat: 7,
                    yoyo: true,
                    ease: 'none',
                    delay: 0.6
                });
            }
        }
    });
});

/* ==============================================
   WEAPONS – Floating Animation (Desktop)
   ============================================== */
mm.add('(min-width: 769px)', () => {
    document.querySelectorAll('.weapon-image img').forEach((img, i) => {
        gsap.to(img, {
            y: -8,
            duration: 2.5 + i * 0.8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    });
});

/* ==============================================
   WEAPONS – Floating Animation (Mobile, slower)
   ============================================== */
mm.add('(max-width: 768px)', () => {
    document.querySelectorAll('.weapon-image img').forEach((img, i) => {
        gsap.to(img, {
            y: -4,
            duration: 4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    });
});

/* ==============================================
   DAGGER – Neon Glow (Desktop hover)
   ============================================== */
mm.add('(min-width: 769px)', () => {
    const daggerWrapper = document.querySelector('.dagger-wrapper');
    if (!daggerWrapper) return;
    daggerWrapper.addEventListener('mouseenter', () => {
        gsap.to('.dagger-glow', { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(daggerWrapper.querySelector('img'), {
            filter: 'drop-shadow(0 0 12px #00ffff) drop-shadow(0 0 30px rgba(0,255,255,0.3))',
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    daggerWrapper.addEventListener('mouseleave', () => {
        gsap.to('.dagger-glow', { opacity: 0, duration: 0.5, ease: 'power2.out' });
        gsap.to(daggerWrapper.querySelector('img'), {
            filter: 'none',
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

/* ==============================================
   DAGGER – Neon Glow (Mobile tap toggle)
   ============================================== */
mm.add('(max-width: 768px)', () => {
    const daggerWrapper = document.querySelector('.dagger-wrapper');
    if (!daggerWrapper) return;
    const glow = daggerWrapper.querySelector('.dagger-glow');
    const img = daggerWrapper.querySelector('img');
    if (!glow || !img) return;

    daggerWrapper.addEventListener('click', () => {
        const isActive = glow.dataset.active === 'true';
        if (!isActive) {
            gsap.to(glow, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(img, {
                filter: 'drop-shadow(0 0 12px #00ffff) drop-shadow(0 0 30px rgba(0,255,255,0.3))',
                duration: 0.3,
                ease: 'power2.out'
            });
            glow.dataset.active = 'true';
        } else {
            gsap.to(glow, { opacity: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(img, {
                filter: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
            glow.dataset.active = 'false';
        }
    });
});

/* Weapon Cards – Scroll reveal */
document.querySelectorAll('.weapon-card').forEach((card, i) => {
    ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        end: 'top 30%',
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.3,
                ease: 'power3.out'
            });
        }
    });
});

/* ==============================================
   LOST EXPEDITION – Map cinematic reveal
   ============================================== */
ScrollTrigger.create({
    trigger: '#ch-expedition',
    start: 'top 80%',
    end: 'top 30%',
    invalidateOnRefresh: true,
    onEnter: () => {
        const mapBg = document.querySelector('.map-bg');
        if (mapBg) mapBg.classList.add('revealed');
    }
});

/* Expedition narrative reveal */
const expNarr = document.querySelector('.expedition-narrative');
if (expNarr) {
    ScrollTrigger.create({
        trigger: expNarr,
        start: 'top 85%',
        end: 'top 40%',
        invalidateOnRefresh: true,
        onEnter: () => gsap.to(expNarr, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    });
}

/* Treasure items stagger reveal */
gsap.utils.toArray('.treasure-item').forEach((item, i) => {
    ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        end: 'top 30%',
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: i * 0.2,
                ease: 'power3.out'
            });
        }
    });
});

/* ==============================================
   SPLIT SCREEN – Hover 70/30 Effect (Desktop)
   ============================================== */
mm.add('(min-width: 769px)', () => {
    const leftSplit = document.querySelector('.left-split');
    const rightSplit = document.querySelector('.right-split');
    const splits = document.querySelectorAll('.split-side');

    if (!leftSplit || !rightSplit) return;

    splits.forEach((side) => {
        side.addEventListener('mouseenter', () => {
            const isLeft = side.classList.contains('left-split');
            const expand = isLeft ? leftSplit : rightSplit;
            const shrink = isLeft ? rightSplit : leftSplit;

            gsap.to(expand, {
                flex: '0 0 70%',
                width: '70%',
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(shrink, {
                flex: '0 0 30%',
                width: '30%',
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        side.addEventListener('mouseleave', () => {
            gsap.to([leftSplit, rightSplit], {
                flex: '0 0 50%',
                width: '50%',
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
});

/* ==============================================
   SPLIT SCREEN – Tap hint (Mobile)
   ============================================== */
mm.add('(max-width: 768px)', () => {
    document.querySelectorAll('.split-hint').forEach(h => {
        h.textContent = 'Tap to choose your fate';
    });
});

/* ==============================================
   ENDING TRIGGER – Click/Tap Handlers
   ============================================== */
let endingTriggered = false;

function triggerFriendsEnding() {
    if (endingTriggered) return;
    endingTriggered = true;

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.split-screen', { opacity: 0 });
        }
    });

    /* Collapse right side, expand left to 100% */
    tl.to('.left-split', {
        flex: '0 0 100%', width: '100%',
        duration: 0.7, ease: 'power3.inOut'
    })
    .to('.right-split', {
        flex: '0 0 0%', width: '0%',
        duration: 0.7, ease: 'power3.inOut'
    }, '<')
    .to('.split-divider', { opacity: 0, duration: 0.3 }, '-=0.4')

    /* Show friends ending overlay */
    .set('#friends-ending', { display: 'flex' })
    .fromTo('#friends-ending', { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: 'power2.out'
    })

    /* Typewriter quote */
    .to('#friends-quote', {
        text: "I saved my friends... But I've killed so many people. I can't come back from this. The monster inside me is alive.",
        duration: 4, ease: 'none'
    })

    /* Pause 3s, then fade to black */
    .to('#friends-ending', { opacity: 0, duration: 1, ease: 'power2.in' }, '+=3')

    /* Show credits */
    .set('#credits-screen', { display: 'block', opacity: 0 })
    .to('#credits-screen', { opacity: 1, duration: 0.6 });
}

function triggerCitraEnding() {
    if (endingTriggered) return;
    endingTriggered = true;

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set('.split-screen', { opacity: 0 });
        }
    });

    /* Screen shake on split-screen */
    tl.to('.split-screen', {
        x: '+=5', duration: 0.04, repeat: 12, yoyo: true, ease: 'none'
    })
    .to('.split-screen', { x: 0, duration: 0.1, ease: 'power2.out' }, '-=0.1')

    /* Expand right side, collapse left */
    .to('.right-split', {
        flex: '0 0 100%', width: '100%',
        duration: 0.6, ease: 'power3.inOut'
    }, '-=0.2')
    .to('.left-split', {
        flex: '0 0 0%', width: '0%',
        duration: 0.6, ease: 'power3.inOut'
    }, '<')
    .to('.split-divider', { opacity: 0, duration: 0.3 }, '-=0.4')

    /* Show citra ending with flash effect */
    .set('#citra-ending', { display: 'flex', opacity: 0 })
    .to('#citra-ending', { opacity: 1, duration: 0.15 })
    .to('#citra-ending', { opacity: 0.2, duration: 0.06 })
    .to('#citra-ending', { opacity: 1, duration: 0.06 })
    .to('#citra-ending', { opacity: 0.4, duration: 0.06 })
    .to('#citra-ending', { opacity: 1, duration: 0.1 })

    /* Typewriter quote with glitch */
    .to('#citra-quote', {
        text: "Our child will lead the Rakyat. You died as a true warrior...",
        duration: 3, ease: 'none'
    })

    /* Glitch shake during typing */
    .to('#citra-quote', {
        x: '+=3', duration: 0.03, repeat: 24, yoyo: true, ease: 'none'
    }, '-=3')

    /* Pause then credits */
    .to('#citra-ending', { opacity: 0, duration: 0.8, ease: 'power2.in' }, '+=2')

    .set('#credits-screen', { display: 'block', opacity: 0 })
    .to('#credits-screen', { opacity: 1, duration: 0.6 });
}

/* Register click/tap on both split sides */
document.querySelectorAll('.split-side').forEach((side) => {
    side.addEventListener('click', (e) => {
        e.stopPropagation();
        if (endingTriggered) return;
        if (side.classList.contains('left-split')) {
            triggerFriendsEnding();
        } else if (side.classList.contains('right-split')) {
            triggerCitraEnding();
        }
    });
});

/* Animation: credits scroll up after screen appears */
const creditsObserver = new MutationObserver(() => {
    const screen = document.getElementById('credits-screen');
    if (screen && screen.style.display !== 'none' && parseFloat(getComputedStyle(screen).opacity) > 0) {
        creditsObserver.disconnect();
        const scrollEl = document.querySelector('.credits-scroll');
        if (!scrollEl) return;
        const totalH = scrollEl.scrollHeight;
        const viewH = window.innerHeight;
        gsap.fromTo(scrollEl,
            { y: viewH + 60 },
            {
                y: -(totalH + 100),
                duration: 14,
                ease: 'none',
                onComplete: () => {
                    document.getElementById('replay-overlay')?.classList.add('show');
                }
            }
        );
    }
});
creditsObserver.observe(document.getElementById('credits-screen'), {
    attributes: true, attributeFilter: ['style']
});

/* ==============================================
   REPLAY – Reset and go back to choice
   ============================================== */
document.querySelector('.replay-btn')?.addEventListener('click', (e) => {
    e.preventDefault();

    endingTriggered = false;

    /* Hide all overlays */
    document.getElementById('friends-ending').style.display = 'none';
    document.getElementById('citra-ending').style.display = 'none';
    document.getElementById('credits-screen').style.display = 'none';
    document.getElementById('replay-overlay')?.classList.remove('show');

    /* Reset split-screen to clean CSS state */
    gsap.set('.split-screen', { clearProps: 'opacity,x' });
    gsap.set('.split-side', { clearProps: 'flex,width,opacity' });
    gsap.set('.split-divider', { clearProps: 'opacity' });

    /* Clear quote text */
    document.getElementById('friends-quote').textContent = '';
    document.getElementById('citra-quote').textContent = '';

    /* Reset dagger glow data */
    document.querySelector('.dagger-glow')?.setAttribute('data-active', 'false');

    /* Re-enable scroll triggers */
    ScrollTrigger.refresh();

    /* Smooth scroll back to choice */
    document.getElementById('ch-choice').scrollIntoView({ behavior: 'smooth' });
});

/* Split screen bg lazy load */
document.querySelectorAll('.split-bg img').forEach((img) => {
    if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    }
});

/* ==============================================
   RE-REGISTER on resize/orientation change
   ============================================== */
window.addEventListener('resize', () => ScrollTrigger.refresh());
window.addEventListener('orientationchange', () => {
    setTimeout(() => ScrollTrigger.refresh(), 300);
});
