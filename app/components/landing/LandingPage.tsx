import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { AppPreview } from './AppPreview'
import { Icon, MoniMark } from './Icons'
import { Pressable, Reveal, appEase } from './Motion'
import { QuickCaptureSection } from './QuickCapture'

const githubUrl = 'https://github.com/vatsa31/moni'

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="moni home">
          <MoniMark className="wordmark__mark" />
          <span>moni</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#capture">Quick capture</a>
          <a href="#budgets">Budgets</a>
          <a href="#automation">Automation</a>
          <a href="#privacy">Privacy</a>
        </nav>

        <Pressable>
          <a className="source-link" href={githubUrl} target="_blank" rel="noreferrer">
            <Icon name="github" />
            <span>View source</span>
          </a>
        </Pressable>
      </div>
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero" id="top">
      <span className="hero__orb hero__orb--leaf" />
      <span className="hero__orb hero__orb--sky" />
      <span className="hero__scribble" aria-hidden="true">₹</span>

      <div className="section-shell hero__grid">
        <div className="hero__copy">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: appEase }}
          >
            <span className="eyebrow"><i />Private money tracking for iPhone</span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: appEase, delay: 0.06 }}
          >
            Spend.<br />
            Swipe.<br />
            <em>Done.</em>
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: appEase, delay: 0.12 }}
          >
            An offline expense tracker designed around your thumb. Log a purchase
            in seconds, read your budget at a glance, and keep every rupee on-device.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: appEase, delay: 0.18 }}
          >
            <Pressable>
              <a className="button button--primary" href="#capture">
                Try quick capture <Icon name="arrow" />
              </a>
            </Pressable>
            <Pressable>
              <a className="button button--quiet" href={githubUrl} target="_blank" rel="noreferrer">
                <Icon name="github" /> Open source
              </a>
            </Pressable>
          </motion.div>

          <motion.ul
            className="hero__facts"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.26 }}
          >
            <li><Icon name="shield" /> No account</li>
            <li><Icon name="cloudOff" /> No network calls</li>
            <li><span className="fact-swift">S</span> Native SwiftUI</li>
          </motion.ul>
        </div>

        <div className="hero__visual">
          <AppPreview />
        </div>
      </div>
    </section>
  )
}

function IntentStatement() {
  return (
    <section className="intent">
      <div className="section-shell intent__inner">
        <Reveal>
          <p>
            Most expense trackers ask for your bank login.
            <span> moni asks for two seconds.</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="intent__footnote">
            <span>Built around manual entry</span>
            <i />
            <span>Designed to stay out of the way</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const budgetStates = [
  { id: 'healthy', label: 'Healthy', percent: 64, spent: 18400, detail: '₹10,200 left', tone: 'leaf' },
  { id: 'watch', label: 'Watch', percent: 88, spent: 25168, detail: '₹3,432 left', tone: 'amber' },
  { id: 'over', label: 'Over', percent: 112, spent: 32032, detail: '₹3,432 over', tone: 'coral' },
] as const

function BudgetStory() {
  const [activeId, setActiveId] = useState<(typeof budgetStates)[number]['id']>('healthy')
  const reduceMotion = useReducedMotion()
  const active = budgetStates.find((state) => state.id === activeId) ?? budgetStates[0]

  return (
    <section className="budget-story" id="budgets">
      <div className="section-shell story-grid">
        <div className="story-copy">
          <Reveal>
            <span className="section-index">02 · Budget signals</span>
            <h2>Your budget<br /><em>speaks in color.</em></h2>
            <p>
              No chart-reading required. Green means comfortable, amber means
              pay attention, and coral means the line has been crossed.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="budget-tabs" role="group" aria-label="Preview a budget state">
              {budgetStates.map((state) => (
                <button
                  type="button"
                  key={state.id}
                  className={activeId === state.id ? `is-active is-${state.tone}` : ''}
                  onClick={() => setActiveId(state.id)}
                  aria-pressed={activeId === state.id}
                >
                  <i /> {state.label} <span>{state.percent}%</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="budget-canvas" delay={0.1} distance={28}>
          <div className={`budget-card budget-card--${active.tone}`}>
            <div className="budget-card__header">
              <span>Spent this month</span>
              <b>{active.percent}% used</b>
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.strong
                className="budget-card__amount"
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: appEase }}
              >
                ₹{active.spent.toLocaleString('en-IN')}
              </motion.strong>
            </AnimatePresence>
            <span className="budget-card__detail">{active.detail} of ₹28,600</span>
            <div className="budget-card__track">
              <motion.span
                animate={{ scaleX: Math.min(active.percent / 100, 1) }}
                transition={{ duration: 0.34, ease: appEase }}
              />
            </div>
          </div>

          <div className="signal-list">
            <div className="signal-list__heading"><strong>Budget signals</strong><span>August</span></div>
            {[
              { name: 'Food', amount: '₹4,340 of ₹7,000', percent: 62, tone: 'leaf' },
              { name: 'Travel', amount: '₹4,400 of ₹5,000', percent: 88, tone: 'amber' },
              { name: 'Shopping', amount: '₹3,360 of ₹3,000', percent: 112, tone: 'coral' },
            ].map((item) => (
              <div className="signal-row" key={item.name}>
                <span className={`signal-row__dot signal-row__dot--${item.tone}`} />
                <div><strong>{item.name}</strong><small>{item.amount}</small></div>
                <span>{item.percent}%</span>
                <i><b className={`signal-row__bar--${item.tone}`} style={{ transform: `scaleX(${Math.min(item.percent / 100, 1)})` }} /></i>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function AutomationDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState(0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setPhase(3)
      return
    }

    setPhase(0)
    const timers = [
      window.setTimeout(() => setPhase(1), 480),
      window.setTimeout(() => setPhase(2), 1050),
      window.setTimeout(() => setPhase(3), 1580),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [inView, reduceMotion, run])

  return (
    <div className="automation-demo" ref={ref}>
      <div className="automation-demo__topline">
        <span>Shortcut running</span>
        <button type="button" onClick={() => setRun((value) => value + 1)}>
          <Icon name="replay" /> Replay
        </button>
      </div>

      <motion.div
        className="sms-notification"
        key={`sms-${run}`}
        initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: appEase }}
      >
        <span className="sms-notification__icon"><Icon name="message" /></span>
        <div><strong>HDFC Bank</strong><small>now</small><p>₹284.00 debited from A/c XX4242 via UPI to ZOMATO on 02-09.</p></div>
      </motion.div>

      <div className="automation-demo__flow" aria-hidden="true"><i className={phase >= 1 ? 'is-live' : ''} /></div>

      <div className="parser-card">
        <div className="parser-card__heading"><Icon name="spark" /><span>moni found</span></div>
        <div className="parser-chips">
          {[
            ['Amount', '₹284'],
            ['Type', 'Expense'],
            ['Payee', 'Zomato'],
            ['Category', 'Food'],
          ].map(([label, value], index) => (
            <motion.span
              key={`${run}-${label}`}
              className={phase >= 1 ? 'is-visible' : ''}
              initial={false}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.2, delay: reduceMotion ? 0 : index * 0.06 }}
            >
              <small>{label}</small><strong>{value}</strong>
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        className={`parsed-transaction ${phase >= 2 ? 'is-visible' : ''}`}
        initial={false}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.28, ease: appEase }}
      >
        <span className="parsed-transaction__icon"><Icon name="food" /></span>
        <div><strong>Zomato</strong><small>Food · Today</small></div>
        <b>-₹284</b>
        <motion.i
          animate={phase >= 3 ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.28, bounce: 0.45 }}
        ><Icon name="check" /></motion.i>
      </motion.div>

      <span className="sr-only" aria-live="polite">
        {phase === 3 ? 'SMS parsed and Zomato expense saved' : 'Parsing bank SMS'}
      </span>
    </div>
  )
}

function AutomationStory() {
  return (
    <section className="automation-story" id="automation">
      <div className="section-shell story-grid story-grid--automation">
        <div className="story-copy">
          <Reveal>
            <span className="section-index">03 · Automations</span>
            <h2>Your bank text,<br /><em>already organized.</em></h2>
            <p>
              A Shortcuts automation hands the message to moni. Amount, payee,
              type, and category are recognized locally, then saved to SwiftData.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="automation-badges">
              {['HDFC', 'ICICI', 'SBI', 'Axis'].map((bank) => <span key={bank}>{bank}</span>)}
            </div>
            <p className="automation-note"><Icon name="lock" /> Message content never goes to a moni server.</p>
          </Reveal>
        </div>

        <Reveal className="automation-visual" delay={0.1} distance={28}>
          <AutomationDemo />
          <div className="siri-card">
            <span className="siri-card__wave"><i /><i /><i /><i /><i /></span>
            <div><small>Siri Shortcut</small><strong>"Add debit in moni"</strong></div>
            <span className="siri-card__status">Ready</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function EverydayFeatures() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="everyday" id="features">
      <div className="section-shell">
        <Reveal className="everyday__heading">
          <span className="section-index">04 · The everyday details</span>
          <h2>Everything else is<br /><em>quietly where it should be.</em></h2>
        </Reveal>

        <div className="product-grid">
          <Reveal className="product-panel product-panel--accounts">
            <motion.div whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.28, ease: appEase }}>
              <div className="product-panel__title"><span><Icon name="bank" /></span><div><small>Accounts</small><strong>Know what is where.</strong></div></div>
              <div className="account-stack">
                {[
                  { icon: 'cash' as const, title: 'Cash', sub: 'Wallet', amount: '₹4,200', tone: 'lime' },
                  { icon: 'bank' as const, title: 'Everyday', sub: 'Bank', amount: '₹38,650', tone: 'sky' },
                  { icon: 'card' as const, title: 'Credit card', sub: 'Credit', amount: '-₹6,240', tone: 'amber' },
                ].map((account) => (
                  <div className="account-item" key={account.title}>
                    <span className={`account-item__icon account-item__icon--${account.tone}`}><Icon name={account.icon} /></span>
                    <div><strong>{account.title}</strong><small>{account.sub}</small></div>
                    <b>{account.amount}</b>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>

          <Reveal className="product-panel product-panel--history" delay={0.05}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.28, ease: appEase }}>
              <div className="product-panel__title"><span><Icon name="history" /></span><div><small>History</small><strong>A calm paper trail.</strong></div></div>
              <div className="history-list">
                <div><i className="history-list__dot history-list__dot--coral" /><span><strong>Swiggy</strong><small>Today, 8:42 PM</small></span><b>-₹420</b></div>
                <div><i className="history-list__dot history-list__dot--leaf" /><span><strong>Salary</strong><small>01 Sep</small></span><b className="is-income">+₹85,000</b></div>
                <div><i className="history-list__dot history-list__dot--sky" /><span><strong>Bank transfer</strong><small>31 Aug</small></span><b>-₹2,000</b></div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal className="product-panel product-panel--theme" delay={0.1}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.28, ease: appEase }}>
              <div className="theme-copy">
                <div className="product-panel__title"><span><Icon name="palette" /></span><div><small>Themes</small><strong>Make the palette yours.</strong></div></div>
                <p>Ten color tokens, a live preview, and a dark mode for late-night check-ins.</p>
              </div>
              <div className="theme-palette" aria-label="Example custom color palette">
                <span className="theme-swatch theme-swatch--canvas" /><span className="theme-swatch theme-swatch--leaf" /><span className="theme-swatch theme-swatch--lime" /><span className="theme-swatch theme-swatch--sky" /><span className="theme-swatch theme-swatch--amber" /><span className="theme-swatch theme-swatch--coral" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PrivacyStory() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="privacy" id="privacy">
      <span className="privacy__word" aria-hidden="true">LOCAL</span>
      <div className="section-shell privacy__grid">
        <div className="privacy-copy">
          <Reveal>
            <span className="section-index section-index--dark">05 · Private by architecture</span>
            <h2>There is no cloud<br /><em>to trust.</em></h2>
            <p>
              moni has no backend, no account system, and no bank connection.
              Transactions live in SwiftData on your iPhone. That is the entire architecture.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="privacy-proof">
              <li><Icon name="check" /><span><strong>No login</strong><small>Open the app and start.</small></span></li>
              <li><Icon name="check" /><span><strong>No bank linking</strong><small>Your credentials are never requested.</small></span></li>
              <li><Icon name="check" /><span><strong>No network calls</strong><small>Your ledger does not leave the device.</small></span></li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="privacy-visual" delay={0.1} distance={28}>
          <div className="privacy-device">
            <span className="privacy-device__island" />
            <motion.div
              className="vault-card vault-card--one"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, ease: appEase, delay: 0.12 }}
            ><Icon name="card" /><span><strong>Transactions</strong><small>SwiftData</small></span><i><Icon name="lock" /></i></motion.div>
            <motion.div
              className="vault-card vault-card--two"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, ease: appEase, delay: 0.2 }}
            ><Icon name="bank" /><span><strong>Accounts</strong><small>On-device</small></span><i><Icon name="lock" /></i></motion.div>
            <motion.div
              className="vault-card vault-card--three"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, ease: appEase, delay: 0.28 }}
            ><Icon name="shield" /><span><strong>Budgets</strong><small>On-device</small></span><i><Icon name="lock" /></i></motion.div>
            <div className="privacy-device__seal"><Icon name="shield" /><span>Stays here</span></div>
          </div>
          <div className="blocked-cloud"><Icon name="cloudOff" /><span>No moni server</span></div>
          <div className="privacy-boundary"><span>Device boundary</span></div>
        </Reveal>
      </div>
    </section>
  )
}

function FinalCallout() {
  return (
    <section className="final-callout">
      <div className="section-shell">
        <Reveal>
          <div className="final-card">
            <span className="final-card__orbit final-card__orbit--one" />
            <span className="final-card__orbit final-card__orbit--two" />
            <div className="final-card__copy">
              <span className="section-index">Built natively for iOS 18.5+</span>
              <h2>Track it.<br /><em>Then move on.</em></h2>
              <p>SwiftUI, SwiftData, AppIntents, and not a single server in between.</p>
              <div className="final-card__actions">
                <Pressable><a className="button button--ink" href={githubUrl} target="_blank" rel="noreferrer"><Icon name="github" /> View source on GitHub</a></Pressable>
                <a className="text-link" href="#capture">Replay quick capture <Icon name="arrow" /></a>
              </div>
            </div>
            <MoniMark className="final-card__mark" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <a className="wordmark" href="#top"><MoniMark className="wordmark__mark" /><span>moni</span></a>
        <p>Offline expense tracking for iPhone.</p>
        <div><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><span>MIT License</span></div>
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="landing-page">
        <Header />
        <main>
          <Hero />
          <IntentStatement />
          <QuickCaptureSection />
          <BudgetStory />
          <AutomationStory />
          <EverydayFeatures />
          <PrivacyStory />
          <FinalCallout />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
