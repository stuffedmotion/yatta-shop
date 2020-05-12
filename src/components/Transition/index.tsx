import React from 'react'
import posed, { PoseGroup } from 'react-pose'

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    const RoutesContainer = posed.div()

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
