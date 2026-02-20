'use client'
import NumberAnimation from '~/components/NumberAnimation'
import { countUnit } from '~/utils/unit'

export default function Visits({ visitCount }: { visitCount: number }) {
  return <NumberAnimation value={visitCount} delay={2} format={(v) => countUnit.format(v, '-1')} />
}
