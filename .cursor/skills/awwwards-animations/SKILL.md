---
name: awwwards-animations
description: Adds premium animation and motion direction to celebrant sites. Use when building scroll-driven scenes, reveals, transitions, parallax, or other high-quality animation work in the React app.
---

# Awwwards Animations

Use this skill for premium animation work in `site/`.

## Read First

Before animating, read:

1. `AGENTS.md`
2. `docs/celebrant-website-guidelines.md`
3. `design-system.md` if it exists
4. `build-prompt.md` if it exists

## Default Stack

- use GSAP with `ScrollTrigger` for complex scroll and timeline work
- use `motion` for React-native UI motion
- keep the setup React-first and maintainable

## Repo Motion Rules

- keep native browser scroll by default
- do not introduce Lenis or another smooth-scroll system unless explicitly requested
- animation should feel graceful, intentional, and premium
- motion must not damage readability, accessibility, or performance

## Preferred Patterns

- staggered text reveals
- image mask reveals
- layered parallax
- section entrances
- hover transitions with personality
- timeline-based storytelling where it suits the page

## Performance Rules

- prioritise 60fps
- animate `transform` and `opacity` wherever possible
- clean up GSAP effects properly
- reduce motion for mobile and `prefers-reduced-motion`

## Celebrant Context

Animation is there to heighten mood and distinctiveness, not to make the site feel like a tech demo.

The site should still feel warm, ceremonial, and client-led.
