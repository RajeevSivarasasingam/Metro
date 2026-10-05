import React, { useEffect, useState } from 'react';

import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';

const slides = [hero3, hero1, hero2];
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stopForReducedMotion = event => { if (event.matches) setPaused(true); };
    preference.addEventListener('change', stopForReducedMotion);
    return () => preference.removeEventListener('change', stopForReducedMotion);
  }, []);
  useEffect(() => {
    if (paused || hovered || focused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(current => (current + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused]);

  return <div className="hero-photo hero-carousel" role="region" aria-roledescription="carousel" aria-label="Metro Cool AC service photos"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
      {slides.map((src, i) => <div className="carousel-slide" key={src} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} aria-hidden={i !== index}>
        <img src={src} alt="Metro Cool air-conditioning service" width="2048" height="1143" fetchPriority={i === 0 ? 'high' : 'auto'} />
      </div>)}
    </div>
    <span className="photo-tag"><i /> COMFORT STARTS HERE</span>
    <button className="carousel-accessible-toggle" type="button" onClick={() => setPaused(current => !current)}>{paused ? 'Play slideshow' : 'Pause slideshow'}</button>
  </div>;
}

