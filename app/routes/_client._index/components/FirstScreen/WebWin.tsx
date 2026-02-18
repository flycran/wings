import clsx from 'clsx'
import { useMemo } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import MotionDiv from '~/components/motion/MotionDiv'
import { useDelayActive } from '~/hooks/delayOpen'
import code from '../../../../../plugins/env?raw'

SyntaxHighlighter.registerLanguage('typescript', typescript)

export default function WebWin({ className }: { className?: string }) {
  const svgElement = useMemo(
    () => (
      <svg
        id="b"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 253.86 227.11"
        className="w-full drop-shadow"
      >
        <g id="c">
          {/* Window header */}
          <path
            d="M248.08,0H5.78C2.59,0,0,2.59,0,5.78v23.17h253.86V5.78C253.86,2.59,251.27,0,248.08,0Z"
            fill="var(--color-header)"
            strokeWidth="0"
          />
          {/* Window control buttons */}
          <circle cx="17.56" cy="14.36" r="4.67" fill="var(--color-close-btn)" strokeWidth="0" />
          <circle cx="31.79" cy="14.36" r="4.67" fill="var(--color-minimize-btn)" strokeWidth="0" />
          <circle cx="45.87" cy="14.36" r="4.67" fill="var(--color-maximize-btn)" strokeWidth="0" />

          {/* Window body */}
          <path
            d="M0,221.33c0,3.19,2.59,5.78,5.78,5.78h242.3c3.19,0,5.78-2.59,5.78-5.78V28.94H0v192.39Z"
            fill="var(--color-bg)"
            strokeWidth="0"
          />

          {/* Menu UI elements */}
          <circle cx="31.06" cy="46.11" r="5.89" fill="var(--color-secondary-ui)" strokeWidth="0" />
          <circle cx="39.06" cy="75.11" r="5.89" fill="var(--color-primary)" strokeWidth="0" />
          <rect
            x="41.2"
            y="43.08"
            width="45.61"
            height="6.06"
            rx="2.86"
            ry="2.86"
            fill="var(--color-secondary-ui)"
            strokeWidth="0"
          />

          {/* Window frame */}
          <rect
            x="0"
            width="253.86"
            height="227.11"
            rx="5.78"
            ry="5.78"
            fill="none"
            strokeWidth="0"
          />

          {/* Card element */}
          <rect
            x="165.81"
            y="39.11"
            width="74.25"
            height="71.42"
            rx="7.75"
            ry="7.75"
            fill="var(--color-secondary-ui)"
            strokeWidth="0"
          />

          {/* Grid layout */}
          <rect
            x="25.22"
            y="59.53"
            width="122.17"
            height="152.76"
            rx="2.87"
            ry="2.87"
            fill="none"
            stroke="var(--color-secondary-ui)"
            strokeMiterlimit="10"
          />
          <line
            x1="25.73"
            y1="134.28"
            x2="147.9"
            y2="134.28"
            fill="none"
            stroke="var(--color-secondary-ui)"
            strokeMiterlimit="10"
          />
          <line
            x1="25.22"
            y1="183.22"
            x2="147.39"
            y2="183.22"
            fill="none"
            stroke="var(--color-secondary-ui)"
            strokeMiterlimit="10"
          />
          <line
            x1="86.31"
            y1="183.22"
            x2="86.31"
            y2="212.28"
            fill="none"
            stroke="var(--color-secondary-ui)"
            strokeMiterlimit="10"
          />
          <line
            x1="86.31"
            y1="59.53"
            x2="86.31"
            y2="183.22"
            fill="none"
            stroke="var(--color-secondary-ui)"
            strokeMiterlimit="10"
          />

          {/* Text elements */}
          <rect
            x="174.47"
            y="49.82"
            width="36.25"
            height="5.6"
            rx="1.44"
            ry="1.44"
            fill="var(--color-text)"
            strokeWidth="0"
          />
          <rect
            x="174.47"
            y="80.26"
            width="32.58"
            height="5.6"
            rx="1.44"
            ry="1.44"
            fill="var(--color-text)"
            strokeWidth="0"
          />
          <rect
            x="174.47"
            y="65.04"
            width="21.42"
            height="5.6"
            rx="1.44"
            ry="1.44"
            fill="var(--color-text)"
            strokeWidth="0"
          />
          <rect
            x="174.47"
            y="95.49"
            width="43.64"
            height="5.6"
            rx="1.44"
            ry="1.44"
            fill="var(--color-text)"
            strokeWidth="0"
          />

          {/* Circle indicator */}
          <circle cx="227.28" cy="98.29" r="4.49" fill="var(--color-text)" strokeWidth="0" />

          {/* Feature button */}
          <rect
            x="71.24"
            y="99.22"
            width="33.32"
            height="14.15"
            rx="7.08"
            ry="7.08"
            fill="var(--color-primary-light)"
            stroke="var(--color-primary)"
            strokeMiterlimit="10"
          />
          <circle cx="97.48" cy="106.3" r="7.08" fill="var(--color-primary)" strokeWidth="0" />
          <polyline
            points="77.17 106.59 78.97 108.6 82.5 105.25"
            fill="none"
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Menu button */}
          <line
            x1="230.67"
            y1="11.39"
            x2="238.06"
            y2="11.39"
            fill="none"
            stroke="var(--color-text)"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />
          <line
            x1="230.67"
            y1="14.5"
            x2="238.06"
            y2="14.5"
            fill="none"
            stroke="var(--color-text)"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />
          <line
            x1="230.67"
            y1="17.89"
            x2="238.06"
            y2="17.89"
            fill="none"
            stroke="var(--color-text)"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />

          {/* Action buttons */}
          <rect
            x="113.37"
            y="189.89"
            width="22.06"
            height="4.67"
            rx="2.33"
            ry="2.33"
            fill="var(--color-primary)"
            strokeWidth="0"
          />
          <rect
            x="113.37"
            y="201.67"
            width="22.06"
            height="4.67"
            rx="2.33"
            ry="2.33"
            fill="var(--color-primary)"
            strokeWidth="0"
          />
          <rect
            x="37.81"
            y="189.2"
            width="35.33"
            height="4.67"
            rx="2.33"
            ry="2.33"
            fill="var(--color-primary)"
            strokeWidth="0"
          />
          <rect
            x="37.81"
            y="200.97"
            width="35.33"
            height="4.67"
            rx="2.33"
            ry="2.33"
            fill="var(--color-primary)"
            strokeWidth="0"
          />

          {/* Indicators */}
          <circle
            cx="105.26"
            cy="203.28"
            r="3.99"
            fill="var(--color-primary-light)"
            strokeMiterlimit="10"
            strokeWidth=".8"
          />
          <circle
            cx="105.26"
            cy="192.22"
            r="3.99"
            fill="var(--color-primary-light)"
            strokeMiterlimit="10"
            strokeWidth=".8"
          />

          {/* Additional UI elements */}
          <rect
            x="166.39"
            y="117.03"
            width="72.83"
            height="69.42"
            rx="4.42"
            ry="4.42"
            fill="none"
            stroke="var(--color-primary)"
            strokeMiterlimit="10"
          />
          <rect
            x="165.81"
            y="193.33"
            width="74.25"
            height="20.33"
            rx="10.17"
            ry="10.17"
            fill="var(--color-primary)"
            strokeWidth="0"
          />

          {/* Logo and brand */}
          <circle cx="179.31" cy="129.44" r="5.83" fill="var(--color-primary)" strokeWidth="0" />
          <text
            transform="translate(188.43 131.19)"
            fill="var(--color-primary)"
            fontSize="5.84"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              F
            </tspan>
            <tspan x="3.26" y="0" letterSpacing="-.08em">
              L
            </tspan>
            <tspan x="6.01" y="0" letterSpacing="-.03em">
              Y
            </tspan>
            <tspan x="9.64" y="0">
              CRAN
            </tspan>
          </text>

          {/* Setting controls */}
          <rect
            x="173.47"
            y="154.53"
            width="58.58"
            height="7.17"
            rx="3.58"
            ry="3.58"
            fill="var(--color-primary)"
            strokeWidth="0"
          />
          <rect
            x="173.47"
            y="140.61"
            width="47.53"
            height="7.17"
            rx="3.58"
            ry="3.58"
            fill="var(--color-primary)"
            strokeWidth="0"
          />

          {/* Chart element */}
          <path
            d="M86.31,67.9c-14.77,0-28.13,5.99-37.81,15.66l12.23,12.23c6.55-6.55,15.59-10.6,25.58-10.6,19.98,0,36.18,16.2,36.18,36.18h17.29c0-29.53-23.94-53.47-53.47-53.47Z"
            fill="var(--color-primary-light)"
            strokeWidth="0"
          />

          {/* Additional controls */}
          <rect
            x="173.47"
            y="168.11"
            width="58.58"
            height="7.17"
            rx="3.58"
            ry="3.58"
            fill="var(--color-primary)"
            strokeWidth="0"
          />

          {/* Chart border */}
          <path
            d="M86.31,67.9c-29.53,0-53.47,23.94-53.47,53.47h0c0,29.53,23.94,53.47,53.47,53.47s53.47-23.94,53.47-53.47h0c0-29.53-23.94-53.47-53.47-53.47ZM86.31,157.56c-19.98,0-36.18-16.2-36.18-36.18s16.2-36.18,36.18-36.18,36.18,16.2,36.18,36.18-16.2,36.18-36.18,36.18Z"
            fill="none"
            stroke="var(--color-secondary-ui)"
            strokeMiterlimit="10"
          />

          {/* Final indicator */}
          <circle cx="137.4" cy="101.37" r="6.74" fill="var(--color-primary)" strokeWidth="0" />
        </g>
      </svg>
    ),
    []
  )

  const codeElement = useMemo(
    () => (
      <div className="hljs max-w-full max-h-full atom-light dark:atom-dark p-2">
        <SyntaxHighlighter useInlineStyles={false} PreTag="div" language="typescript">
          {code}
        </SyntaxHighlighter>
      </div>
    ),
    []
  )

  const { active, enter, leave } = useDelayActive(100, 200)

  return (
    <MotionDiv
      initial={{
        opacity: 0,
        x: 0,
        y: 60,
        scale: 0.7,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
        visualDuration: 0.2,
        type: 'spring',
      }}
      className={clsx('relative aspect-[253.86/227.11] web-win-light dark:web-win-dark', className)}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <div
        className="w-full h-full absolute z-2 duration-400 ease-out"
        style={
          active
            ? {
                transform: 'translate(-100px, -250px) rotate(-20deg) scale(0.94)',
              }
            : {}
        }
      >
        {svgElement}
      </div>
      <div
        className="absolute top-8 left-8 w-full h-full z-1 bg-zinc-50 dark:bg-zinc-800 md:rounded-xl rounded-lg
        overflow-auto drop-shadow text-xs scroll-none duration-400 ease-out transition-transform"
        style={
          active
            ? {
                transform: 'translate(150px, 50px) rotate(5deg)',
              }
            : {}
        }
      >
        {codeElement}
      </div>
    </MotionDiv>
  )
}
