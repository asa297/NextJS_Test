import { actionTypes } from '<action_types>'

export const TestAction = (user, role) => async dispatch => {
  try {
    dispatch({ type: actionTypes.AUTH.STORE_AUTH, payload: { ...user, role } })
  } catch (e) {
    return e
  } finally {
    // dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}
