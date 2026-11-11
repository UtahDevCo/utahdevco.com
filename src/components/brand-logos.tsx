'use client';
import React, { useState, useRef, useEffect } from 'react';

import * as LogoSvgs from './logos';

const BRAND_LOGOS = [
  { alt: 'Adobe', component: LogoSvgs.AdobeSvg },
  { alt: 'BoomPop', component: LogoSvgs.BoomPopSvg },
  { alt: 'Domo', component: LogoSvgs.DomoSvg },
  { alt: 'Pluralsight', component: LogoSvgs.PluralsightSvg },
  { alt: 'Route', component: LogoSvgs.RouteSvg },
  { alt: 'Toyota', component: LogoSvgs.ToyotaSvg },
];

const TRIPLE_BRAND_LOGOS = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];
const OFFSET_INDEX = 3;

export function BrandLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const offsetActiveIndex = activeIndex + OFFSET_INDEX;

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const resultEl = scrollEl?.querySelector(`div:nth-child(${offsetActiveIndex + 1})`) as HTMLDivElement;

    if (!resultEl || !scrollEl) return;

    const containerWidth = scrollEl.clientWidth;
    const elementWidth = resultEl.clientWidth;
    const elementLeft = resultEl.offsetLeft;
    const targetScrollLeft = elementLeft - containerWidth / 2 + elementWidth / 2;

    if (activeIndex === 0) {
      /** Instant scroll to restart the rotation */
      scrollEl.scrollLeft = targetScrollLeft;
      const frame = requestAnimationFrame(() => setActiveIndex(1));

      return () => cancelAnimationFrame(frame);
    }

    /** Manual slow-scroll */
    let start: number | null = null;
    let frame = 0;
    const initialScrollLeft = scrollEl.scrollLeft;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollAmount = initialScrollLeft + (targetScrollLeft - initialScrollLeft) * (progress / 1000);
      scrollEl.scrollLeft = scrollAmount;

      if (progress < 1000) {
        frame = requestAnimationFrame(step);
      } else {
        scrollEl.scrollLeft = targetScrollLeft;
      }
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [activeIndex, offsetActiveIndex]);

  useEffect(() => {
    const resultIndex = activeIndex + OFFSET_INDEX;
    const resultEl = scrollRef.current?.querySelector(`div:nth-child(${resultIndex + 1})`) as HTMLDivElement;

    resultEl?.scrollIntoView({ behavior: 'instant', block: 'center' });

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const activeIndex = (prev + 1) % TRIPLE_BRAND_LOGOS.length;
        const shouldLoop = activeIndex >= BRAND_LOGOS.length + 1;

        return shouldLoop ? 0 : activeIndex;
      });
    }, 1000 * 2);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='hidden-scroll relative p-5 mx-5 mb-5 rounded-md bg-white overflow-x-scroll scroll-behavior-instant'
      ref={scrollRef}
      style={{ height: 97 }}
    >
      <div className='brand-logos absolute left-0 flex flex-row items-center'>
        {TRIPLE_BRAND_LOGOS.map(({ alt, component: SvgComponent }, i) => {
          return (
            <div key={alt + i}>
              <SvgComponent alt={alt} data-highlighted={i === offsetActiveIndex} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
