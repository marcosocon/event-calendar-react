import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Calendar from '../components/Calendar'
import { getEvents } from '../../../redux/actions/calendar'

class Container extends Component {
  render () {
    const { actions, events } = this.props
    const props = {
      actions,
      events
    }
    return <Calendar {...props} />
  }
}

const mapStateToProps = state => {
  const { events } = state.calendar
  return {
    events
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getEvents
    },
    dispatch
  )
})

const component = connect(mapStateToProps, mapDispatchToProps)(Container)

export default component
