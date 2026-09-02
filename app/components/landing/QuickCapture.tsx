import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Icon, type IconName } from './Icons'
import { Reveal, appEase } from './Motion'

const amounts = [10, 20, 50, 100, 200, 500, 1000, 1500, 2000, 3000, 4000, 5000]

const categories: Array<{ name: string; icon: IconName }> = [
  { name: 'Bills', icon: 'bill' },
  { name: 'Entertainment', icon: 'play' },
  { name: 'Food', icon: 'food' },
  { name: 'Groceries', icon: 'basket' },
  { name: 'Health', icon: 'health' },
]

type Stage = 'ready' | 'scrubbing' | 'categories' | 'saved'

function pointOnCircle(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: 150 + radius * Math.cos(radians),
    y: 150 + radius * Math.sin(radians),
  }
}

function sectorPath(index: number) {
  const slice = 360 / categories.length
  const startAngle = index * slice + 2
  const endAngle = (index + 1) * slice - 2
  const outerStart = pointOnCircle(startAngle, 126)
  const outerEnd = pointOnCircle(endAngle, 126)
  const innerEnd = pointOnCircle(endAngle, 64)
  const innerStart = pointOnCircle(startAngle, 64)

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A 126 126 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A 64 64 0 0 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ')
}

function RadialCategories({
  amount,
  onSelect,
}: {
  amount: number
  onSelect: (category: string) => void
}) {
  const [active, setActive] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="category-wheel"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.34, ease: appEase }}
    >
      <svg className="category-wheel__sectors" viewBox="0 0 300 300" aria-hidden="true">
        {categories.map((category, index) => (
          <motion.path
            key={category.name}
            d={sectorPath(index)}
            animate={{
              fill: active === index ? '#C4EC5D' : '#252e28',
              stroke: active === index ? '#d8f58d' : '#354239',
            }}
            transition={{ duration: 0.14 }}
          />
        ))}
      </svg>

      {categories.map((category, index) => {
        const point = pointOnCircle(index * (360 / categories.length) + 36, 95)
        return (
          <motion.button
            key={category.name}
            type="button"
            className={`category-wheel__target ${active === index ? 'is-active' : ''}`}
            style={{ left: `${(point.x / 300) * 100}%`, top: `${(point.y / 300) * 100}%` }}
            onPointerEnter={() => setActive(index)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            onClick={() => onSelect(category.name)}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            aria-label={`Save ₹${amount.toLocaleString('en-IN')} to ${category.name}`}
          >
            <Icon name={category.icon} />
          </motion.button>
        )
      })}

      <div className="category-wheel__center" aria-live="polite">
        <strong>₹{amount.toLocaleString('en-IN')}</strong>
        <span>{active === null ? 'Pick a category' : categories[active].name}</span>
      </div>
    </motion.div>
  )
}

function CaptureDevice() {
  const reduceMotion = useReducedMotion()
  const [stage, setStage] = useState<Stage>('ready')
  const [amountIndex, setAmountIndex] = useState(5)
  const [distance, setDistance] = useState(0)
  const [savedCategory, setSavedCategory] = useState('')
  const drag = useRef<{ pointerId: number; startY: number; distance: number } | null>(null)

  const amount = amounts[amountIndex]
  const progress = Math.min(distance / 240, 1)

  const reset = () => {
    setStage('ready')
    setAmountIndex(5)
    setDistance(0)
    setSavedCategory('')
    drag.current = null
  }

  const beginDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (stage === 'saved' || stage === 'categories') return
    drag.current = { pointerId: event.pointerId, startY: event.clientY, distance: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
    setStage('scrubbing')
  }

  const updateDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    const nextDistance = Math.max(0, Math.min(240, drag.current.startY - event.clientY))
    drag.current.distance = nextDistance
    setDistance(nextDistance)
    const eased = Math.pow(nextDistance / 240, 1.35)
    setAmountIndex(Math.min(amounts.length - 1, Math.round(eased * (amounts.length - 1))))
  }

  const endDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    const validDrag = drag.current.distance >= 24
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (validDrag) {
      setStage('categories')
      setDistance(0)
    } else {
      setStage('ready')
      setDistance(0)
    }
  }

  const cancelDrag = () => {
    drag.current = null
    setDistance(0)
    setStage('ready')
  }

  const handleKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setStage('scrubbing')
      setAmountIndex((current) => Math.min(amounts.length - 1, current + 1))
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setStage('scrubbing')
      setAmountIndex((current) => Math.max(0, current - 1))
    }
    if (event.key === 'Enter' && stage === 'scrubbing') {
      event.preventDefault()
      setStage('categories')
    }
  }

  const save = (category: string) => {
    setSavedCategory(category)
    setStage('saved')
  }

  return (
    <div className="capture-device">
      <div className="capture-device__frame">
        <div className="capture-device__screen">
          <div className="capture-device__island" />
          <div className="capture-status"><span>9:41</span><span>5G&nbsp;&nbsp;▰</span></div>

          <AnimatePresence mode="wait">
            {stage === 'categories' && (
              <motion.div className="capture-categories" key="categories" exit={{ opacity: 0 }}>
                <div className="capture-categories__heading">
                  <span>Quick expense</span>
                  <button type="button" onClick={reset}>Cancel</button>
                </div>
                <RadialCategories amount={amount} onSelect={save} />
                <p>Tap a sector to save</p>
              </motion.div>
            )}

            {stage === 'saved' && (
              <motion.div
                className="capture-saved"
                key="saved"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.34, ease: appEase }}
              >
                <motion.span
                  className="capture-saved__check"
                  initial={reduceMotion ? false : { scale: 0, rotate: -18 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.34, bounce: 0.5 }}
                >
                  <Icon name="check" />
                </motion.span>
                <p>Expense added</p>
                <strong>₹{amount.toLocaleString('en-IN')}</strong>
                <small>{savedCategory}</small>
                <button type="button" onClick={reset}><Icon name="replay" /> Try again</button>
              </motion.div>
            )}

            {(stage === 'ready' || stage === 'scrubbing') && (
              <motion.div className="capture-scrub" key="scrub" exit={{ opacity: 0 }}>
                <motion.div
                  className="capture-scrub__backdrop"
                  animate={{ opacity: stage === 'scrubbing' ? 0.42 : 1, filter: `blur(${progress * 8}px)` }}
                  transition={{ duration: 0.16 }}
                >
                  <div className="capture-mini-header"><span>Today</span><strong>₹42,850</strong></div>
                  <div className="capture-mini-budget">
                    <span>August budget</span><strong>64%</strong>
                    <i><b /></i>
                  </div>
                  <div className="capture-mini-row"><span /><div><b /><i /></div></div>
                  <div className="capture-mini-row"><span /><div><b /><i /></div></div>
                </motion.div>

                <AnimatePresence>
                  {stage === 'scrubbing' && (
                    <motion.div
                      className="capture-amount"
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>Expense</span>
                      <strong>₹{amount.toLocaleString('en-IN')}</strong>
                      <small>Keep dragging up</small>
                    </motion.div>
                  )}
                </AnimatePresence>

                {stage === 'ready' && (
                  <motion.div
                    className="capture-hint"
                    animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.5 }}
                  >
                    <span>Drag the + upward</span>
                    <i />
                  </motion.div>
                )}

                <div className="capture-dock">
                  <span><Icon name="home" /></span>
                  <motion.button
                    type="button"
                    className="capture-add"
                    onPointerDown={beginDrag}
                    onPointerMove={updateDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={cancelDrag}
                    onKeyDown={handleKeyboard}
                    animate={{
                      y: -Math.min(distance, 132),
                      rotate: progress * 135,
                      scale: stage === 'scrubbing' ? 1.12 : 1,
                    }}
                    transition={{ duration: drag.current ? 0 : 0.16 }}
                    aria-label={`Quick expense amount ₹${amount.toLocaleString('en-IN')}. Drag upward, or use arrow keys.`}
                  >
                    <Icon name="plus" />
                  </motion.button>
                  <span><Icon name="history" /></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {stage === 'scrubbing' && `Amount ₹${amount.toLocaleString('en-IN')}`}
        {stage === 'categories' && 'Choose a category'}
        {stage === 'saved' && `Saved ₹${amount.toLocaleString('en-IN')} to ${savedCategory}`}
      </span>
    </div>
  )
}

export function QuickCaptureSection() {
  return (
    <section className="capture-section" id="capture">
      <div className="section-shell capture-section__grid">
        <div className="capture-copy">
          <Reveal>
            <span className="section-index section-index--dark">01 · Quick capture</span>
            <h2>One gesture.<br /><em>Not five fields.</em></h2>
            <p>
              Hold the center button, drag up through a tactile amount ladder,
              then drop onto a category. The thing you do every day should be
              the fastest thing in the app.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="capture-steps">
              <li><b>01</b><span><strong>Hold</strong><small>The center action wakes instantly.</small></span></li>
              <li><b>02</b><span><strong>Scrub</strong><small>Amounts climb non-linearly under your thumb.</small></span></li>
              <li><b>03</b><span><strong>Drop</strong><small>Choose a category and get on with your day.</small></span></li>
            </ol>
          </Reveal>
        </div>

        <Reveal className="capture-demo-wrap" delay={0.12} distance={30}>
          <div className="capture-demo-label"><span>Interactive demo</span><i>Drag it</i></div>
          <CaptureDevice />
        </Reveal>
      </div>
    </section>
  )
}
