import { motion, useReducedMotion } from 'motion/react'
import { Icon } from './Icons'
import { Reveal, appEase } from './Motion'

const setupSteps = [
  { n: '01', title: 'Settings → Accessibility → Touch', note: 'Find Back Tap at the bottom' },
  { n: '02', title: 'Choose Double Tap', note: 'Assign “Quick Expense”' },
  { n: '03', title: 'Tap the back of your iPhone', note: 'No need to open the app' },
]

const categories = [
  { k: 'food' as const, label: 'Food' },
  { k: 'basket' as const, label: 'Groceries' },
  { k: 'bill' as const, label: 'Bills' },
  { k: 'health' as const, label: 'Health' },
  { k: 'bank' as const, label: 'Travel' },
]

function BackTapDevice() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="backtap-device" aria-hidden="true">
      <div className="backtap-phone">
        <span className="backtap-phone__camera">
          <i /><i /><i />
        </span>
        <span className="backtap-phone__flash" />
        <span className="backtap-phone__apple"></span>
        <span className="backtap-hotspot">
          <motion.span
            className="backtap-ring"
            animate={reduceMotion ? undefined : { scale: [1, 1.6], opacity: [0.45, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.2, ease: 'easeOut' }}
          />
          <motion.span
            className="backtap-ring backtap-ring--2"
            animate={reduceMotion ? undefined : { scale: [1, 1.7], opacity: [0.35, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.2, delay: 0.35, ease: 'easeOut' }}
          />
          <span className="backtap-dot">
            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 0.92, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.9 }}
            >
              <Icon name="tap" />
            </motion.span>
          </span>
          <span className="backtap-label">Double tap</span>
        </span>
      </div>

      <motion.div
        className="backtap-snippet"
        initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.42, ease: appEase, delay: 0.18 }}
      >
        <div className="backtap-snippet__header">
          <span><Icon name="plus" /> Quick Expense</span>
          <small>moni</small>
        </div>
        <div className="backtap-snippet__amount">
          <small>Amount</small>
          <strong>₹284</strong>
          <span className="backtap-snippet__cursor" />
        </div>
        <div className="backtap-snippet__grid">
          {categories.map((c) => (
            <span key={c.label}>
              <Icon name={c.k} />
              <small>{c.label}</small>
            </span>
          ))}
        </div>
        <p className="backtap-snippet__hint">Pick a category — no app launch needed</p>
      </motion.div>
    </div>
  )
}

export function BackTapSection() {
  return (
    <section className="backtap" id="shortcut">
      <div className="section-shell backtap__grid">
        <div className="backtap__copy">
          <Reveal>
            <span className="section-index">04 · Back Tap shortcut</span>
            <h2>
              Double-tap the back
              <br />
              <em>of your iPhone.</em>
            </h2>
            <p>
              moni exposes a system shortcut so you can log an expense without opening the app.
              Double-tap the back of your phone, type the amount, and choose a category — done.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="backtap-steps" aria-label="How to enable Back Tap">
              {setupSteps.map((s) => (
                <li key={s.n}>
                  <b>{s.n}</b>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.note}</small>
                  </span>
                </li>
              ))}
            </ol>
            <p className="backtap-note">
              <Icon name="shield" /> Works with the system Shortcuts app. No extra permissions, no background tracking.
            </p>
          </Reveal>
        </div>

        <Reveal className="backtap__visual" delay={0.1} distance={28}>
          <BackTapDevice />
        </Reveal>
      </div>
    </section>
  )
}
