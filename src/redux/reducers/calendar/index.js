import {
  GET_EVENTS,
} from '../../actions/calendar'

const initialState = {
  events: [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2019, 4, 0),
      end: new Date(2019, 4, 1),
    }
  ]
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS: {
      return state.events
    }
    default:
      return state
  }
}