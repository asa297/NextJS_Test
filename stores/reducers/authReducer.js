import { actionTypes } from '<action_types>'

const initState = {
  User: undefined,
}

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH.TEST:
      return Object.assign({}, state, {
        User: { ...action.payload },
      })
    default:
      return state
  }
}
