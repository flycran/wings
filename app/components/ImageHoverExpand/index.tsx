import { useSize } from 'ahooks'
import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode, Ref, useEffect, useMemo, useRef, useState } from 'react'
import { mergeRefs } from 'react-merge-refs'

type ImageHoverExpandChildren = (event: {
  onLoad: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onError: () => void
  className: string
  ref: Ref<HTMLImageElement>
}) => ReactNode

export interface ImageHoverExpandProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src?: string
  alt?: string
  ref?: Ref<HTMLDivElement>
  imageClassName?: string
  children?: ImageHoverExpandChildren
}

export default function ImageHoverExpand({
  src,
  alt,
  className,
  imageClassName,
  children,
  ...rest
}: ImageHoverExpandProps) {
  const [hover, setHover] = useState(false)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerSize = useSize(boxRef)
  const [imageSize, setImageSize] = useState<
    | {
        width: number
        height: number
      }
    | undefined
  >()

  const coverSize = useMemo(() => {
    if (!imageSize || !containerSize) return
    if (imageSize.width / imageSize.height < containerSize.width / containerSize.height) {
      return {
        width: containerSize.width,
        height: (containerSize.width * imageSize.height) / imageSize.width,
      }
    } else {
      return {
        width: (containerSize.height * imageSize.width) / imageSize.height,
        height: containerSize.height,
      }
    }
  }, [containerSize, imageSize])

  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      })
    }
  }, [])

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgEl = e.target as HTMLImageElement

    setImageSize({
      width: imgEl.naturalWidth,
      height: imgEl.naturalHeight,
    })
  }

  const onError = () => {
    setImageSize(undefined)
  }

  return (
    <div
      {...rest}
      ref={mergeRefs([boxRef, rest.ref])}
      className={clsx('inline-flex items-center justify-center transition-transform', className)}
      onMouseOver={(e) => {
        setHover(true)
        rest.onMouseOver?.(e)
      }}
      onMouseOut={(e) => {
        setHover(false)
        rest.onMouseOut?.(e)
      }}
    >
      <div
        className={clsx(
          imageClassName,
          hover ? 'relative z-1 shadow-card' : '',
          'overflow-hidden transition-2 transition-[width,height] inline-flex items-center justify-center shrink-0 w-full h-full'
        )}
        style={hover ? coverSize : containerSize}
      >
        {children?.({
          onLoad,
          onError,
          className: 'w-full h-full object-cover',
          ref: imageRef,
        })}
      </div>
    </div>
  )
}
