'use client'
import { PlatformMate } from '@/app/components/FirstScreen/index'
import ExteLink from '@/components/ExteLink'
import MotionDiv from '@/components/motion/MotionDiv'
import { useDelayOpen } from '@/hooks/delayOpen'
import { AnimatePresence } from 'motion/react'
import Link from 'next/link'

export interface PlatformProps {
  platform: PlatformMate
}

export function Platform({ platform }: PlatformProps) {
  const { open, enter, leave } = useDelayOpen(500)
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
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {platform.href ? (
        <Link target="_blank" href={platform.href}>
          {icon}
        </Link>
      ) : (
        <div className="inline-flex h-full w-full items-center justify-center">{icon}</div>
      )}
      <AnimatePresence>
        {open && (
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
                {icon}
                <div className="text-center flex-1">
                  {platform.href ? (
                    <ExteLink className="font-bold" href={platform.href}>
                      {platform.name}
                    </ExteLink>
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
