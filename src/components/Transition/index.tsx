import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props

    return (
      <div style={{ position: `relative` }}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </div>
    )
  }
}

export default Transition
