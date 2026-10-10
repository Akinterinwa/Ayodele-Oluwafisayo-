declare module 'lucide-react' {
  import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from 'react';

  export type LucideIcon = ForwardRefExoticComponent<
    ComponentPropsWithoutRef<'svg'> &
      RefAttributes<SVGSVGElement> & {
        size?: number | string;
        color?: string;
        strokeWidth?: number;
        absoluteStrokeWidth?: boolean;
      }
  >;

  export const ArrowDown: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Camera: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Download: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Image: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const Moon: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Sun: LucideIcon;
  export const X: LucideIcon;
}