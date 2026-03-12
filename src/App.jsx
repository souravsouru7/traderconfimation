import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, Info, Target, TrendingUp, Zap, Waves, ShieldAlert, Award } from 'lucide-react'
import './App.css'

const CRITERIA = [
  { id: '1hr-trend', text: 'First 1hr trend confirmed', icon: <TrendingUp size={20} /> },
  { id: '15min-sweep', text: '15min sweep occurred', icon: <Waves size={20} /> },
  { id: '1min-mss', text: '1min MSS present', icon: <Zap size={20} /> },
  { id: '1min-fvg', text: '1min FVG present', icon: <Target size={20} /> },
  { id: 'fvg-retest', text: 'Last entry on FVG retest', icon: <ShieldAlert size={20} /> },
{ id: 'timing', text: 'Timing: 12:30PM-4PM or 6:45PM-9PM', icon: <Clock size={20} /> }
]

function App() {
  const [checkedItems, setCheckedItems] = useState({})

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const allChecked = CRITERIA.every(item => checkedItems[item.id])
  const countChecked = CRITERIA.filter(item => checkedItems[item.id]).length

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card main-card"
      >
        <header>
          <h1 className="gradient-text">Trade Confirmer</h1>
          <p className="subtitle">Verify your edge before clicking execution.</p>
        </header>

        <div className="checklist-container">
          {CRITERIA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="checkbox-container"
              onClick={() => toggleItem(item.id)}
            >
              <div className={`checkbox-visual ${checkedItems[item.id] ? 'checked' : ''}`}>
                <AnimatePresence>
                  {checkedItems[item.id] && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -45 }}
                    >
                      <Check size={16} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="item-content">
                <span className="icon-wrapper">{item.icon}</span>
                <span className={`item-text ${checkedItems[item.id] ? 'checked' : ''}`}>
                  {item.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="status-section">
          <AnimatePresence mode="wait">
            {allChecked ? (
              <motion.div
                key="aplus"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="status-badge aplus-status"
              >
                <Award size={48} className="status-icon" />
                <div className="status-text">
                  <h2>A+ SETUP CONFIRMED</h2>
                  <p>All conditions met. High probability opportunity.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="notaplus"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="status-badge not-aplus-status"
              >
                <Info size={48} className="status-icon" />
                <div className="status-text">
                  <h2>NOT A+ SETUP</h2>
                  <p>{countChecked < CRITERIA.length ? `${CRITERIA.length - countChecked} more conditions to meet` : "Checking validity..."}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </motion.div>

      <footer className="footer">
        Professional Setup Confirmation System V1.0
      </footer>
    </div>
  )
}

export default App
