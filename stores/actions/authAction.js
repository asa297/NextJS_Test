import { actionTypes } from '<action_types>'

export const TestAction = user => async dispatch => {
  try {
    console.log('action')
    dispatch({ type: actionTypes.AUTH.TEST, payload: user })
  } catch (e) {
    return e
  } finally {
    // dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}
