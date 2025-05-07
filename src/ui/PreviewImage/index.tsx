'use client'
import MotionDiv from '@/components/motion/MotionDiv'
import Mask from '@/ui/Mask'
import { useBoolean } from 'ahooks'
import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { GoX } from 'react-icons/go'

export interface PreviewImageProps extends ImageProps {
  src: string
}

export default function PreviewImage({ className, src, ...rest }: PreviewImageProps) {
  const id = useId()
  const imgRef = useRef<HTMLImageElement>(null)
  const [load, loadController] = useBoolean(false)
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    loadController.setFalse()
    setSize({
      width: 0,
      height: 0,
    })
  }, [src])

  const [preview, { setTrue, setFalse }] = useBoolean()

  return (
    <>
      <div className={className}>
        <MotionDiv
          layoutId={id}
          onClick={() => load && setTrue()}
          className={clsx('relative', className)}
        >
          <Image
            ref={imgRef}
            fill
            src={src}
            {...rest}
            className={className}
            onLoad={() => {
              size.width = imgRef.current!.naturalWidth
              size.height = imgRef.current!.naturalHeight
              loadController.setTrue()
            }}
          />
        </MotionDiv>
        {preview && (
          <Mask>
            <div>
              <MotionDiv layoutId={id} className={clsx('relative')}>
                <Image
                  className="max-w-[calc(100vw-12rem)] max-h-[calc(100vh-12rem)]"
                  width={size.width}
                  height={size.height}
                  src={src}
                  alt={rest.alt}
                />
              </MotionDiv>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-lg">
              <div onClick={setFalse}>
                <GoX />
              </div>
            </div>
          </Mask>
        )}
      </div>
    </>
  )
}
