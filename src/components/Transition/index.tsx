import React from 'react'
import posed, { PoseGroup } from 'react-pose'

const timeout = 2000

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    console.log(location.pathname)

    const RoutesContainer = posed.div({
      enter: {
        opacity: 1,
        transition: {
          ease: 'linear',
          duration: 100,
          delay: 100,
          //   delayChildren: 100,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          ease: 'linear',
          duration: 100,
        },
      },
    })

    // To enable page transitions on mount / initial load,
    // use the prop `animateOnMount={true}` on `PoseGroup`.
    return (
      <div style={{ position: `relative` }}>
        <PoseGroup>
          <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
        </PoseGroup>
      </div>
    )
  }
}

export default Transition
