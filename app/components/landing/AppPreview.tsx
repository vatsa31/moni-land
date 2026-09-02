import { motion, useReducedMotion } from 'motion/react'
import { Icon } from './Icons'
import { appEase } from './Motion'

const accounts = [
  { icon: 'cash' as const, name: 'Cash', detail: 'Wallet', amount: '₹4,200', tone: 'lime' },
  { icon: 'bank' as const, name: 'Everyday', detail: 'Bank account', amount: '₹38,650', tone: 'sky' },
]

const transactions = [
  { icon: 'food' as const, name: 'Zomato', detail: 'Food · 1:24 PM', amount: '-₹284' },
  { icon: 'card' as const, name: 'Uber', detail: 'Transport · 10:16 AM', amount: '-₹512' },
]

export function AppPreview() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="hero-product" aria-label="Preview of the moni dashboard">
      <div className="hero-product__shape" />
      <div className="hero-product__ring hero-product__ring--one" />
      <div className="hero-product__ring hero-product__ring--two" />

      <motion.div
        className="device"
        initial={reduceMotion ? false : { opacity: 0, y: 44, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.7, ease: appEase, delay: 0.12 }}
      >
        <span className="device__button device__button--silent" />
        <span className="device__button device__button--up" />
        <span className="device__button device__button--down" />
        <span className="device__button device__button--power" />

        <div className="device__screen">
          <div className="device__island" />
          <div className="phone-status">
            <span>9:41</span>
            <span className="phone-status__signals">
              <i /><i /><i />
              <b>5G</b>
              <span className="phone-status__battery" />
            </span>
          </div>

          <div className="phone-content">
            <header className="app-header">
              <div>
                <p>Today</p>
                <h3>Manual money flow</h3>
              </div>
              <button type="button" aria-label="Open theme settings">
                <Icon name="palette" />
              </button>
            </header>

            <motion.section
              className="budget-hero"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.42, ease: appEase, delay: 0.38 }}
            >
              <div className="budget-hero__topline">
                <span>Spent this month</span>
                <strong>64% used</strong>
              </div>
              <div className="budget-hero__amount">₹18,400</div>
              <div className="budget-hero__caption">₹10,200 left of ₹28,600</div>
              <div className="budget-hero__track" aria-hidden="true">
                <motion.span
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 0.64 }}
                  transition={{ duration: 0.7, ease: appEase, delay: 0.55 }}
                />
              </div>
            </motion.section>

            <section className="phone-section">
              <div className="phone-section__title">
                <h4>Accounts</h4>
                <span>₹42,850</span>
              </div>
              <div className="phone-list">
                {accounts.map((account, index) => (
                  <motion.div
                    className="phone-row"
                    key={account.name}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, ease: appEase, delay: 0.58 + index * 0.06 }}
                  >
                    <span className={`phone-row__icon phone-row__icon--${account.tone}`}>
                      <Icon name={account.icon} />
                    </span>
                    <span className="phone-row__copy">
                      <strong>{account.name}</strong>
                      <small>{account.detail}</small>
                    </span>
                    <b>{account.amount}</b>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="phone-section phone-section--transactions">
              <div className="phone-section__title">
                <h4>Today's transactions</h4>
                <span>2</span>
              </div>
              <div className="phone-list">
                {transactions.map((transaction, index) => (
                  <motion.div
                    className="phone-row"
                    key={transaction.name}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, ease: appEase, delay: 0.72 + index * 0.06 }}
                  >
                    <span className="phone-row__icon phone-row__icon--coral">
                      <Icon name={transaction.icon} />
                    </span>
                    <span className="phone-row__copy">
                      <strong>{transaction.name}</strong>
                      <small>{transaction.detail}</small>
                    </span>
                    <b>{transaction.amount}</b>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="app-dock">
            <button type="button" className="app-dock__tab app-dock__tab--active" aria-label="Home">
              <Icon name="home" />
              <span>Home</span>
            </button>
            <motion.button
              type="button"
              className="app-dock__add"
              aria-label="Add expense"
              animate={reduceMotion ? undefined : { scale: [1, 1.045, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.4 }}
            >
              <Icon name="plus" />
            </motion.button>
            <button type="button" className="app-dock__tab" aria-label="History">
              <Icon name="history" />
              <span>History</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-note hero-note--private"
        initial={reduceMotion ? false : { opacity: 0, x: -18, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.42, ease: appEase, delay: 0.72 }}
      >
        <span className="hero-note__icon"><Icon name="lock" /></span>
        <span><strong>On-device</strong><small>No moni cloud</small></span>
      </motion.div>

      <motion.div
        className="hero-note hero-note--speed"
        initial={reduceMotion ? false : { opacity: 0, x: 18, y: -6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.42, ease: appEase, delay: 0.84 }}
      >
        <span className="hero-note__number">~2s</span>
        <span><strong>Quick capture</strong><small>One thumb</small></span>
      </motion.div>
    </div>
  )
}
