export const playSvg = (
  width: number
) => `<svg width="${width}" viewBox = "0 0 300 1000">
<g transform="scale(0.5)">
  <path d="M210.82,134c.84-37.64-29.89-86.36-56.21-102.85C126.82,16.47,48.61-10.19,16.2,10.36c-33.63,18,1.38,93.26.29,124.61,1.14,31.26-7.74,78.81,25.85,96.73,32.39,20.51,69.63-11.14,97.39-25.92C166.74,188.88,212.81,173,210.82,134Z" fill-opacity="0.5">
    <animate
      dur='6s'
      attributeType="XML"
      attributeName='d'
      repeatCount='indefinite'

      values="M210.82,134c.84-37.64-29.89-86.36-56.21-102.85C126.82,16.47,48.61-10.19,16.2,10.36c-33.63,18,1.38,93.26.29,124.61,1.14,31.26-7.74,78.81,25.85,96.73,32.39,20.51,69.63-11.14,97.39-25.92C166.74,188.88,212.81,173,210.82,134Z;

          M194.63,135c.84-37.64-44.79-53.72-71.1-70.22-27.79-14.71-65-46.45-97.39-25.91C-7.48,56.9,1.38,104.62.3,136c1.14,31.26-7.74,78.81,25.85,96.73,32.38,20.51,69.62-11.14,97.38-25.92C150.54,189.88,196.62,174,194.63,135Z;

          M207.46,135c.84-37.64-32.62-72.11-58.93-88.61C120.74,31.72,71.39,18.37,39,38.91,5.35,56.9,1.08,144.11,0,175.46c1.14,31.26,5.39,39.32,39,57.24,32.38,20.51,112.37,25.8,140.12,11C206.12,226.82,209.45,174,207.46,135Z;

M194.63,117.79c.57-21.28-44.79-53.72-71.1-70.21-27.79-14.72-65-46.46-97.39-25.92C-7.48,39.65,1.38,87.37.3,118.72,1.44,150-7.44,197.53,26.15,215.46,58.53,236,139.9,248,167.66,233.24,194.67,216.34,196.62,156.78,194.63,117.79Z;

M215.35,127.15C216.19,89.5,230,21.54,203.71,5.05,175.92-9.67,79.28,10.47,46.87,31,13.24,49,4.75,108.21,3.67,139.56c1.14,31.25,9.61,67.33,43.2,85.25,32.38,20.5,69.62-11.14,97.38-25.92C171.26,182,217.34,166.14,215.35,127.15Z;

M210.82,134c.84-37.64-29.89-86.36-56.21-102.85C126.82,16.47,48.61-10.19,16.2,10.36c-33.63,18,1.38,93.26.29,124.61,1.14,31.26-7.74,78.81,25.85,96.73,32.39,20.51,69.63-11.14,97.39-25.92C166.74,188.88,212.81,173,210.82,134Z;"
    />

    <animate
      attributeName="fill"
      dur="20s"
      repeatCount="indefinite"
      values="red;green;red"
    />
    <animate
      attributeName="transform"
      dur="12s"
      repeatCount="indefinite"
      values="translate(0,0);translate(150,50);translate(320,120);translate(600,200);translate(320,120);translate(150,50);translate(0,0);"
    />

  </path>
  </g>
  <g transform="scale(0.8) translate(-100, 0)">
  <path d="M210.82,134c.84-37.64-29.89-86.36-56.21-102.85C126.82,16.47,48.61-10.19,16.2,10.36c-33.63,18,1.38,93.26.29,124.61,1.14,31.26-7.74,78.81,25.85,96.73,32.39,20.51,69.63-11.14,97.39-25.92C166.74,188.88,212.81,173,210.82,134Z" fill-opacity="0.5">
    <animate
      dur='10s'
      attributeType="XML"
      attributeName='d'
      repeatCount='indefinite'

      values="M210.82,134c.84-37.64-29.89-86.36-56.21-102.85C126.82,16.47,48.61-10.19,16.2,10.36c-33.63,18,1.38,93.26.29,124.61,1.14,31.26-7.74,78.81,25.85,96.73,32.39,20.51,69.63-11.14,97.39-25.92C166.74,188.88,212.81,173,210.82,134Z;

          M194.63,135c.84-37.64-44.79-53.72-71.1-70.22-27.79-14.71-65-46.45-97.39-25.91C-7.48,56.9,1.38,104.62.3,136c1.14,31.26-7.74,78.81,25.85,96.73,32.38,20.51,69.62-11.14,97.38-25.92C150.54,189.88,196.62,174,194.63,135Z;

          M207.46,135c.84-37.64-32.62-72.11-58.93-88.61C120.74,31.72,71.39,18.37,39,38.91,5.35,56.9,1.08,144.11,0,175.46c1.14,31.26,5.39,39.32,39,57.24,32.38,20.51,112.37,25.8,140.12,11C206.12,226.82,209.45,174,207.46,135Z;

M194.63,117.79c.57-21.28-44.79-53.72-71.1-70.21-27.79-14.72-65-46.46-97.39-25.92C-7.48,39.65,1.38,87.37.3,118.72,1.44,150-7.44,197.53,26.15,215.46,58.53,236,139.9,248,167.66,233.24,194.67,216.34,196.62,156.78,194.63,117.79Z;

M215.35,127.15C216.19,89.5,230,21.54,203.71,5.05,175.92-9.67,79.28,10.47,46.87,31,13.24,49,4.75,108.21,3.67,139.56c1.14,31.25,9.61,67.33,43.2,85.25,32.38,20.5,69.62-11.14,97.38-25.92C171.26,182,217.34,166.14,215.35,127.15Z;

M210.82,134c.84-37.64-29.89-86.36-56.21-102.85C126.82,16.47,48.61-10.19,16.2,10.36c-33.63,18,1.38,93.26.29,124.61,1.14,31.26-7.74,78.81,25.85,96.73,32.39,20.51,69.63-11.14,97.39-25.92C166.74,188.88,212.81,173,210.82,134Z;"
    />

    <animate
      attributeName="fill"
      dur="20s"
      repeatCount="indefinite"
      values="green;red;green"
    />
    <animate
      attributeName="transform"
      dur="12s"
      repeatCount="indefinite"
      values="translate(700,200);translate(500,150);translate(300,100);translate(100,0);translate(300,10);translate(500,150);translate(700,200);"
    />

  </path>
</g>
</svg>
`;
