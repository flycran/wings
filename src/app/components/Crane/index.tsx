'use client'
import { motion } from 'motion/react'
import './index.css'

export default function Crane() {
  return (
    <motion.div
      className="frame-crane-container"
      initial={{
        '--angle': '50deg',
      }}
      whileHover={{
        '--angle': '120deg',
        y: -20,
      }}
      transition={{ visualDuration: 0.2, type: 'spring' }}
    >
      <div className="frame-crane-adjust-view">
        <div className="frame-crane">
          <svg xmlns="http://www.w3.org/2000/svg" id="b" viewBox="0 0 348.57 294">
            <polygon
              points="53.53 121.83 201.35 121.83 161.87 210.48 53.53 121.83"
              className="frame-crane-color-2"
              strokeWidth="0"
            />
            <polygon points="0 65.73 45.56 81.27 38.18 43.69 0 65.73" className="frame-crane-color-1" strokeWidth="0" />
            <polygon
              points="38.18 43.69 201.35 121.83 53.53 121.83 38.18 43.69"
              className="frame-crane-color-2"
              strokeWidth="0"
            />
            <polygon
              points="154.54 227.01 215.53 294 201.35 121.83 154.54 227.01"
              className="frame-crane-color-1"
              strokeWidth="0"
            />
          </svg>
          <svg className="frame-crane-wings-1" xmlns="http://www.w3.org/2000/svg" id="b" viewBox="0 0 348.57 294">
            <polygon
              points="201.35 0 348.57 0 201.35 121.83 201.35 0"
              className="frame-crane-color-2"
              strokeWidth="0"
            />
            <polygon
              points="201.35 0 201.35 121.83 53.53 121.83 201.35 0"
              className="frame-crane-color-1"
              strokeWidth="0"
            />
          </svg>
          <svg className="frame-crane-wings-2" xmlns="http://www.w3.org/2000/svg" id="b" viewBox="0 0 348.57 294">
            <polygon
              points="201.35 0 348.57 0 201.35 121.83 201.35 0"
              className="frame-crane-color-2"
              strokeWidth="0"
            />
            <polygon
              points="201.35 0 201.35 121.83 53.53 121.83 201.35 0"
              className="frame-crane-color-1"
              strokeWidth="0"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
