import clsx from 'clsx';

type CornersProps = {
  className?: string;
} & Omit<CornerProps, 'position'>;

export function Corners({ className, ...cornerProps }: CornersProps) {
  return (
    <div className={clsx('absolute inset-1', className)}>
      <Corner position='top-left' {...cornerProps} />
      <Corner position='top-right' {...cornerProps} />
      <Corner position='bottom-left' {...cornerProps} />
      <Corner position='bottom-right' {...cornerProps} />
    </div>
  );
}

type CornerProps = {
  color?: string;
  length?: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  radius?: number;
  width?: number;
};

const ROTATION_MAP = {
  'top-left': { top: 0, left: 0, rotate: '0deg' },
  'top-right': { top: 0, right: 0, rotate: '90deg' },
  'bottom-right': { bottom: 0, right: 0, rotate: '180deg' },
  'bottom-left': { bottom: 0, left: 0, rotate: '270deg' },
};

function Corner({ color = 'black', length = 30, position, radius = 5, width = 2 }: CornerProps) {
  const { rotate, ...positions } = ROTATION_MAP[position];

  return (
    <div
      className='corner'
      style={{
        width: length,
        height: length,
        border: `${width}px solid transparent`,
        borderTopColor: color,
        borderLeftColor: color,
        borderTopLeftRadius: radius,
        transform: `rotate(${rotate})`,
        position: 'absolute',
        ...positions,
      }}
    />
  );
}
