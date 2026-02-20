'use client'
import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ReactNode, useEffect, useRef } from 'react'
import { GoLink } from 'react-icons/go'
import MotionDiv from '~/components/motion/MotionDiv'
import { useIsMobile } from '~/hooks'
import { useDelayActive } from '~/hooks/delayOpen'

export interface PlatformMate {
  key: string
  name: string | undefined
  href: string | undefined
  icon: ReactNode
  description?: ReactNode
}

export interface PlatformProps {
  platform: PlatformMate
}

// 社交平台
export function Platform({ platform }: PlatformProps) {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  const { active, setActive, enter, leave } = useDelayActive(500)

  const handleClick = (e: React.MouseEvent) => {
    if (active) return
    e.preventDefault()
    setActive(true)
  }

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (!active) return
      if (containerRef.current?.contains(e.target as Node)) return
      setActive(false)
    }
    if (isMobile && active) {
      document.addEventListener('click', handleClose)
    }
    return () => {
      document.removeEventListener('click', handleClose)
    }
  }, [isMobile, active])

  const icon = (
    <div className="cursor-pointer inline-flex text-2xl aspect-square w-10 items-center justify-center">
      {platform.icon}
    </div>
  )

  return (
    <div
      className="relative aspect-square w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
      style={{
        gridArea: platform.key,
      }}
      ref={containerRef}
      onMouseEnter={isMobile ? undefined : enter}
      onMouseLeave={isMobile ? undefined : leave}
      onClick={isMobile ? handleClick : undefined}
    >
      {platform.href ? (
        <Link
          target="_blank"
          onClick={isMobile ? (e) => e.preventDefault() : undefined}
          href={platform.href || ''}
        >
          {icon}
        </Link>
      ) : (
        <div className="inline-flex h-full w-full items-center justify-center">{icon}</div>
      )}
      <AnimatePresence>
        {active && (
          <MotionDiv
            initial={{
              width: '2.5rem',
              height: '2.5rem',
              boxShadow: 'none',
            }}
            animate={{
              width: 'auto',
              height: 'auto',
              boxShadow: '',
            }}
            exit={{
              width: '2.5rem',
              height: '2.5rem',
              boxShadow: 'none',
            }}
            className="absolute bottom-0 left-0 bg-zinc-100 z-10 dark:bg-zinc-800 shadow-card rounded-2xl flex items-end overflow-hidden"
          >
            <div className="shrink-0 min-w-max">
              {platform.description && <div className="p-2 pb-0">{platform.description}</div>}
              <div className="flex mr-4 items-center">
                <Link target="_blank" href={platform.href || ''}>
                  {icon}
                </Link>
                <div className="text-center flex-1">
                  {platform.href ? (
                    <Link
                      target="_blank"
                      className="inline-flex items-center font-bold hover:underline"
                      href={platform.href}
                    >
                      {platform.name}
                      <GoLink />
                    </Link>
                  ) : (
                    <div className="text-sm">暂时没有数据</div>
                  )}
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}
