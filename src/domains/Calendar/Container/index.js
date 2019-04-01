import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Calendar from '../components/Calendar'

class Container extends Component {
  render () {
    const { actions, agenda, profile, ui, sync } = this.props

    const props = {
      actions,
      calendar
    }

    return <Calendar {...props} />
  }
}

const mapStateToProps = state => {
  const { agenda, profile, auth, sync, ui } = state

  return {
    agenda,
    profile,
    auth,
    sync,
    ui
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {

    },
    dispatch
  )
})

const component = connect(mapStateToProps, mapDispatchToProps)(Container)

export default component
