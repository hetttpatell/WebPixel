/**
 * GSAP Animations — Reusable scroll reveal utilities
 * Respects prefers-reduced-motion globally
 */
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Initialize GSAP ScrollTrigger reveals on elements
 * @param {gsap} gsap - GSAP instance
 * @param {ScrollTrigger} ScrollTrigger - ScrollTrigger plugin
 */
export function initScrollReveals(gsap, ScrollTrigger) {
  if (prefersReducedMotion) return

  gsap.registerPlugin(ScrollTrigger)

  // Fade-in-up for elements with data-reveal attribute
  const revealElements = document.querySelectorAll('[data-reveal]')
  revealElements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: (i % 3) * 0.1,
      }
    )
  })
}

/**
 * Staggered reveal for gallery images
 */
export function staggerReveal(gsap, ScrollTrigger, containerSelector, itemSelector) {
  if (prefersReducedMotion) return

  gsap.registerPlugin(ScrollTrigger)

  const containers = document.querySelectorAll(containerSelector)
  containers.forEach((container) => {
    const items = container.querySelectorAll(itemSelector)
    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  })
}

/**
 * Count-up animation for KPI numbers
 */
export function countUp(gsap, ScrollTrigger, selector) {
  if (prefersReducedMotion) return

  gsap.registerPlugin(ScrollTrigger)

  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => {
    const target = parseInt(el.dataset.target, 10)
    if (isNaN(target)) return

    const obj = { value: 0 }
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toLocaleString()
      },
    })
  })
}
