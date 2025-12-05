
// interface SvgShapeBase
export interface SvgShapeBase {
  x: number;
  y: number;
  id: string;
}

// interface SvgCircle
export interface SvgCircle extends SvgShapeBase {
  type: 'circle';
  radius: number;
  fill: string;
  label: string;
}

// interface SvgRect
export interface SvgRect extends SvgShapeBase {
  type: 'rect';
  width: number;
  height: number;
  rx?: number;
  fill: string;
  label: string | string[];
}


// interface SvgLine
export interface SvgLine {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type SvgElement = SvgCircle | SvgRect | SvgLine;
