import {
  GET_EVENTS,
  ADD_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT
} from '../../actions/calendar'
import moment from 'moment';

const initialState = {
  events: [{
    id: 1,
    title: 'Title',
    start: moment().add('days', 2).toDate(),
    end: moment().add('days', 2).toDate(),
    color: 'red'
  },
  {
    id: 2,
    title: 'Title2',
    start: moment().add('days', 2).toDate(),
    end: moment().add('days', 2).toDate(),
    color: 'blue'
  },
  {
    id: 3,
    title: 'Title3',
    start: moment().add('days', 2).toDate(),
    end: moment().add('days', 2).toDate(),
    color: 'blue'
  },
  {
    id: 4,
    title: 'Title4',
    start: moment().add('days', 2).toDate(),
    end: moment().add('days', 2).toDate(),
    color: 'grey'
  }
  ,
  {
    id: 5,
    title: 'Title5',
    start: moment().add('days', 2).toDate(),
    end: moment().add('days', 2).toDate(),
    color: 'grey'
  }]
}

export default function Reducer (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS: {
      return state.events
    }
    case ADD_EVENT: {
      return {...state, events: [...state.events, action.payload]}
    }
    case UPDATE_EVENT: {
      const newEvents = state.events.map((item, index) => (action.payload.id === item.id) ? action.payload : item);
      return {...state, events: newEvents}
    }
    case REMOVE_EVENT:
      return { ...state, events: state.events.filter(item => item !== action.payload) };
    default:
      return state
  }
}