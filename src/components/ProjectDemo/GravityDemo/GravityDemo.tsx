import { type CSSProperties, useEffect, useRef, useState } from 'react'
import gravitySvgUrl from '@/assets/gravity.svg?url'
import { m } from '@/paraglide/messages'
import shared from '../demo.module.css'
import styles from './GravityDemo.module.css'

const fallbackDuration = 10.496

function parseDuration(value: string | null | undefined) {
  const match = value?.trim().match(/^([\d.]+)(ms|s)$/)
  if (!match) return fallbackDuration
  const amount = Number(match[1])
  return match[2] === 'ms' ? amount / 1000 : amount
}

function formatTime(seconds: number) {
  return `0:${String(Math.floor(seconds)).padStart(2, '0')}`
}

function readAnimationRoot(object: HTMLObjectElement | null) {
  const root = object?.contentDocument?.documentElement as unknown as SVGSVGElement | undefined
  return root && typeof root.pauseAnimations === 'function' ? root : null
}

export default function GravityDemo() {
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [duration, setDuration] = useState(fallbackDuration)
  const [progress, setProgress] = useState(0)

  const objectRef = useRef<HTMLObjectElement>(null)
  const rootRef = useRef<SVGSVGElement | null>(null)
  const durationRef = useRef(fallbackDuration)
  const scrubbingRef = useRef(false)
  const resumeRef = useRef(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!playing) return

    let frame = 0
    const step = () => {
      const root = rootRef.current
      if (!root) return

      const time = root.getCurrentTime()
      if (time >= durationRef.current) {
        root.pauseAnimations()
        setProgress(durationRef.current)
        setPlaying(false)
        setEnded(true)
        return
      }

      setProgress(time)
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  const handleLoad = () => {
    const root = readAnimationRoot(objectRef.current)
    if (!root) return

    // 产物按 900×450 固定尺寸生成，缩放到卡片的 2:1 视口
    root.setAttribute('width', '100%')
    root.setAttribute('height', '100%')
    root.style.display = 'block'

    rootRef.current = root
    const nextDuration = parseDuration(root.querySelector('animateTransform')?.getAttribute('dur'))
    durationRef.current = nextDuration
    setDuration(nextDuration)

    root.pauseAnimations()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startAt = reduceMotion ? nextDuration : 0
    root.setCurrentTime(startAt)
    setProgress(startAt)
    setEnded(reduceMotion)
    setReady(true)

    if (!reduceMotion) {
      root.unpauseAnimations()
      setPlaying(true)
    }
  }

  const start = (fromStart = false) => {
    const root = rootRef.current
    if (!root) return

    if (fromStart || ended || root.getCurrentTime() >= durationRef.current) {
      root.setCurrentTime(0)
      setProgress(0)
      setEnded(false)
    }

    root.unpauseAnimations()
    setPlaying(true)
  }

  const pause = () => {
    const root = rootRef.current
    if (!root) return

    root.pauseAnimations()
    setProgress(Math.min(root.getCurrentTime(), durationRef.current))
    setPlaying(false)
  }

  const beginScrub = () => {
    if (scrubbingRef.current) return

    const root = rootRef.current
    if (!root) return

    scrubbingRef.current = true
    resumeRef.current = playing
    root.pauseAnimations()
    setPlaying(false)
  }

  const seek = (value: string) => {
    const root = rootRef.current
    if (!root) return

    const raw = Math.min(Math.max(Number(value), 0), durationRef.current)
    // range 的 step 吸附会差几毫秒到不了 dur，末帧按结束处理
    const atEnd = durationRef.current - raw <= 0.05
    const time = atEnd ? durationRef.current : raw
    root.setCurrentTime(time)
    setProgress(time)
    setEnded(atEnd)
  }

  const endScrub = () => {
    if (!scrubbingRef.current) return
    scrubbingRef.current = false

    const root = rootRef.current
    if (!root) return

    if (resumeRef.current && root.getCurrentTime() < durationRef.current) {
      root.unpauseAnimations()
      setPlaying(true)
    }
    resumeRef.current = false
  }

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div className={`${shared.demo} ${styles.demo}`}>
      <div className={`${shared.head} ${styles.head}`}>
        <span>LIVE SVG / github-gravity</span>
      </div>

      <div className={`${styles.stage}${ready ? ` ${styles.ready}` : ''}`}>
        {mounted && (
          <object
            ref={objectRef}
            className={styles.art}
            data={gravitySvgUrl}
            type="image/svg+xml"
            aria-label={m.demoGravityArtwork()}
            onLoad={handleLoad}
          />
        )}
        <span className={styles.loading}>{m.demoGravityLoading()}</span>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.action} ${styles.primary}`}
          type="button"
          disabled={!ready}
          onClick={() => (playing ? pause() : start())}
        >
          {playing ? m.demoGravityPause() : m.demoGravityPlay()}
        </button>
        <button
          className={styles.action}
          type="button"
          disabled={!ready}
          onClick={() => start(true)}
        >
          {m.demoGravityReplay()}
        </button>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={progress}
          disabled={!ready}
          aria-label={m.demoGravityProgress()}
          aria-valuetext={`${formatTime(progress)} / ${formatTime(duration)}`}
          style={{ '--progress': `${progressPercent}%` } as CSSProperties}
          onChange={(event) => seek(event.currentTarget.value)}
          onPointerDown={beginScrub}
          onPointerUp={endScrub}
          onPointerCancel={endScrub}
          onKeyDown={(event) => {
            if (event.key.startsWith('Arrow') || event.key === 'Home' || event.key === 'End') {
              beginScrub()
            }
          }}
          onKeyUp={endScrub}
          onBlur={endScrub}
        />
      </div>
    </div>
  )
}
