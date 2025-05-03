import Image from 'next/image'

export default function NoData() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="relative h-full w-full max-w-80">
        <Image fill className="object-fill" src="/no-data.svg" alt="no data" />
      </div>
    </div>
  )
}
