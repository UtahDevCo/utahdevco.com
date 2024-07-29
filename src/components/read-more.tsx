'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';

type ReadMoreProps = {
  children: React.ReactNode;
  className?: string;
  maxHeight: number;
};

export function ReadMore({ children, className, maxHeight }: ReadMoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx('relative overflow-hidden', className)}
      style={{
        maxHeight: isOpen ? '1000vh' : `${maxHeight}px`,
        transition: 'max-height 750ms ease',
      }}
    >
      {children}
      {isOpen ? (
        <div className='flex justify-center'>
          <Button className='self-center' onClick={() => setIsOpen(false)} style={{ bottom: 0 }} variant='ghost'>
            Close
          </Button>
        </div>
      ) : (
        <button className='absolute right-0 bottom-0 left-0 bg-primary/80' onClick={() => setIsOpen(true)}>
          Read more
        </button>
      )}
    </div>
  );
}
