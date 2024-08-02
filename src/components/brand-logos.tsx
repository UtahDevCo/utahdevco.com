'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

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
const OFFSET_INDEX = 4;

export function BrandLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const offsetActiveIndex = useMemo(() => {
    const resultIndex = activeIndex + OFFSET_INDEX;
    const resultEl = scrollRef.current?.querySelector(`svg:nth-child(${resultIndex + 1})`);
    if (resultEl) {
      resultEl.scrollIntoView({
        behavior: activeIndex === 0 ? 'instant' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });

      if (activeIndex === 0) {
        setActiveIndex(1);
      }
    }

    return resultIndex;
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const activeIndex = (prev + 1) % TRIPLE_BRAND_LOGOS.length;
        const shouldLoop = activeIndex >= BRAND_LOGOS.length + 1;

        return shouldLoop ? 0 : activeIndex;
      });
    }, 1000 * 5);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='hidden-scroll relative p-5 mx-5 mb-5 rounded-md bg-white overflow-x-scroll scroll-behavior-instant'
      ref={scrollRef}
      style={{ height: 97 }}
    >
      <div className='brand-logos absolute left-0 flex flex-row items-center'>
        {TRIPLE_BRAND_LOGOS.map(({ alt, component: SvgComponent }, i) => {
          return <SvgComponent alt={alt} data-highlighted={i === offsetActiveIndex} key={alt + i} />;
        })}
      </div>
    </div>
  );
}
