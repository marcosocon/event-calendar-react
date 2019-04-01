import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const localizer = BigCalendar.momentLocalizer(moment) 

export default class Dnd extends React.Component {
  constructor(props) {
    super(props)
    debugger
    this.state = {
      events: this.props.events,
    }
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent = (event) => {
    const title = window.prompt('New Event name?')
    if (title) {
      let idList = this.state.events.map(a => a.id)
      let newId = Math.max(...idList) + 1
      let hour = {
        id: newId,
        title,
        allDay: event.slots.length == 1,
        start: event.start,
        end: event.end,
      }
      this.setState({
        events: this.state.events.concat([hour]),
      })
    }
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    const backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
    };
    return {
      style
    };
  }

  render() {
    return (
        <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          resizable
          onEventResize={this.resizeEvent}
          onSelectSlot={this.newEvent}
          defaultView={BigCalendar.Views.MONTH}
          defaultDate={new Date(2019, 3, 12)}
          eventPropGetter={this.eventStyleGetter}
        />
    )
  }
}
