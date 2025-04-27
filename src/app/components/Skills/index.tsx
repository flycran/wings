'use client'
import { skills } from '@/app/components/Skills/skills'
import { splitIntoParts } from '@/utils/skills'
import { useMemo, useState } from 'react'
import { motion } from "motion/react"

export interface SkillsProps {}

export default function Skills(props: SkillsProps) {
  const skillLines = useMemo(() => splitIntoParts(skills), [])

  const [play, setPlay] = useState(true)

  return (
    <div className="flex flex-col gap-6" onMouseEnter={() => setPlay(false)} onMouseLeave={() => setPlay(true)}>

    </div>
  )
}
