import { type CSSProperties, useEffect, useState } from 'react'

const cells = Array.from({ length: 112 }, (_, index) => ({
  index,
  falling: index % 17 < 3,
  bright: index % 11 === 0,
  delay: (index % 13) * 55,
}))

export default function GravityDemo() {
  const [running, setRunning] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRunning(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`p-demo p-demo--gravity${running ? ' is-running' : ''}`}>
      <div className="p-demo-head">
        <span>LIVE SVG / github-gravity</span>
        <button
          className="p-demo-badge p-demo-action"
          type="button"
          onClick={() => setRun((value) => value + 1)}
        >
          重播
        </button>
      </div>
      <div className="p-gravity-stage" aria-hidden="true" key={run}>
        <div className="p-gravity-text">FLY</div>
        <div className="p-gravity-grid">
          {cells.map((cell) => (
            <span
              key={cell.index}
              className={[
                'p-gravity-cell',
                cell.falling ? 'is-falling' : '',
                cell.bright ? 'is-bright' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--d': `${cell.delay}ms` } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
