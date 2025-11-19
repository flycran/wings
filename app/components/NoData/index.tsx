import clsx from 'clsx'

export default function NoData({ className }: { className?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className={clsx('relative h-full w-full', className)}>
        <img className="object-fill" src="/no-data.svg" alt="no data" />
      </div>
    </div>
  )
}
