import {
  GET_EVENTS,
} from '../../actions/calendar'

const initialState = {
  events: [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    }
  ]
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {
    
  }
}