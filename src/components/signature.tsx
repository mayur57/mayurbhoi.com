'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Motif from './motif'

export const Signature = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showMotif, setShowMotif] = useState(false)

  // Timing constants (seconds)
  const SIGN_FADE_DELAY = 3.5
  const SIGN_FADE_DURATION = 2
  const MOTIF_FADE_DURATION = 1

  useEffect(() => {
    let motifTimeout: NodeJS.Timeout
    if (isInView) {
      motifTimeout = setTimeout(() => {
        setShowMotif(true)
      }, (SIGN_FADE_DELAY + SIGN_FADE_DURATION) * 1000)
    }
    return () => {
      if (motifTimeout) clearTimeout(motifTimeout)
    }
  }, [isInView])

  return (
    <div
      ref={ref}
      className='scale-75 flex flex-col items-center justify-center mt-6'
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isInView ? 0 : 1 }}
        transition={{ duration: SIGN_FADE_DURATION, delay: SIGN_FADE_DELAY }}
        className='dark:invert'
      >
        <motion.svg
          className='opacity-40'
          width='111'
          height='79'
          viewBox='0 0 111 79'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Mayur Bhoi @ mayurbhoi.com</title>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              delay: 1,
            }}
            d='M1.3583 51.1443C2.31618 44.2173 4.24237 37.5678 5.41272 30.7147C6.72455 23.0333 9.5614 15.5304 10.6297 7.80512C10.8152 6.46312 11.2307 6.42188 11.0379 7.81604C10.8234 9.36743 10.5023 10.9216 10.5965 12.4903C10.9656 18.6367 10.4845 25.3795 12.2023 31.3349C12.4036 32.033 12.267 32.7222 12.5051 33.4257C12.7299 34.0902 13.7543 29.6599 13.813 29.2355C14.899 21.382 17.8015 14.3113 20.193 6.80544C20.4373 6.03862 22.6503 0.888791 22.515 1.86759C21.1007 12.0949 22.0433 22.4596 22.3441 32.7373C22.442 36.0828 23.0014 39.2319 23.3575 42.5302C23.5041 43.8876 23.6578 43.9809 23.8521 42.5759C24.8516 35.3476 24.8897 31.4502 31.3273 24.2315C33.0153 22.9748 33.633 22.5967 35.2272 21.4967C36.9403 21.7336 34.4236 22.1567 34.0214 22.3772C28.0785 25.6354 25.2829 31.6872 30.1073 37.8404C34.2935 43.1796 37.8318 25.5002 37.5138 23.1334C37.3508 21.9194 34.7544 21.1536 35.165 21.5397C38.3089 21.1961 37.8702 27.0109 39.1632 29.6448C39.591 30.5163 42.6276 37.5435 43.4452 37.2034C44.2379 36.8735 44.2001 34.8155 44.3691 34.1439C44.9501 31.8357 45.3227 29.5533 45.6488 27.1951C45.7193 26.6848 45.9685 21.9197 45.6637 24.1238C45.2154 27.3657 47.1485 31.5287 48.7708 34.2517C50.3248 36.8599 51.4299 34.8334 52.355 32.6984C53.4907 30.0774 54.1881 27.504 54.6025 24.6769C54.847 23.0088 55.4953 20.8604 54.7407 19.2322C52.8748 15.2053 55.9029 28.0641 57.1181 32.3326C60.5164 44.2698 64.8203 55.9083 67.1941 68.1253C67.2534 68.4303 69.0928 76.7256 67.1731 75.5213C62.1693 72.3823 58.8138 63.9886 57.988 58.4744C57.0622 52.2913 58.3018 44.8308 60.4968 39.0149C61.7567 35.6767 62.9957 32.1389 63.4863 28.5917C63.8623 25.8727 63.2792 22.6645 61.5486 20.3785C59.2678 17.3657 63.6888 28.2014 66.7095 30.4717C70.1385 33.0488 71.526 19.8773 70.9853 18.1547C70.8143 17.61 69.0505 14.1084 69.3512 16.4717C69.8218 20.1708 71.6586 24.1694 73.8894 27.1163C75.3208 29.0071 76.1056 27.4517 76.5969 25.6466C77.5462 22.1588 79.1832 18.938 78.9454 15.2486C78.7986 12.9706 75.0976 13.2667 76.4002 15.2154C77.4652 16.8085 79.9019 18.4593 82.0028 17.8342C83.2386 17.4664 89.7522 14.1601 89.4342 15.7884C89.2407 16.7789 86.0558 20.1177 87.7315 20.8574C89.3344 21.565 91.7128 21.1989 93.2934 20.8069C98.0742 19.6213 102.55 17.5925 107.038 15.5819C109.356 14.5435 112.279 12.9561 114.852 12.7466C116.869 12.5824 116.46 12.969 115.136 13.1439C108.38 14.0363 103.366 17.4728 98.1226 19.3721C85.3946 23.9823 74.0119 30.8674 62.1059 37.2568C47.5253 45.0814 33.0189 53.4996 19.6297 63.2326C15.7316 66.0662 11.7507 68.7788 8.0146 71.8256C7.10776 72.5651 5.65463 73.1555 5.13579 74.2049'
            strokeWidth={1.25}
            strokeDasharray='0 1'
            fill='none'
            stroke='black'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </motion.svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showMotif ? 1 : 0 }}
        transition={{ duration: MOTIF_FADE_DURATION }}
        style={{ position: 'relative', zIndex: 1, marginTop: '-5rem' }}
      >
        {showMotif && (
          <Motif>Be curious. Read widely. Try new things.<br></br>— Aaron Swartz</Motif>
        )}
      </motion.div>
    </div>
  )
}
