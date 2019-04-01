export const GET_EVENTS = 'GET_EVENTS'

/**
 * Get initial calendar eventsss
 * @param  {Array}  events
 * @return {Object}
 */
export const getEvents = (events) => ({
  type: GET_EVENTS,
  payload: { events }
})