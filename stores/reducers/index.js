import { combineReducers } from 'redux'

import organizationReducer from './organizationReducer'
import groupReducer from './groupReducer'

export default combineReducers({
  organizations: organizationReducer,
  groups: groupReducer,
})
