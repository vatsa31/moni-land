import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const appEase = [0.32, 0.72, 0, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
}: {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.42, bounce: 0, ease: appEase, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Pressable({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      className={className}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.16, bounce: 0.26 }}
    >
      {children}
    </motion.span>
  )
}
