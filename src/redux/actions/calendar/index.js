export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';

/**
 * Get initial calendar eventsss
 * @param  {Array}  events
 * @return {Object}
 */
export const getEvents = (events) => ({
  type: GET_EVENTS,
  payload: { events }
})

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event
});

export const removeEvent = (event) => ({
  type: REMOVE_EVENT,
  payload: event
});