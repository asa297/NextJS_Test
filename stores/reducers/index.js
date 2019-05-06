import { combineReducers } from 'redux'

import organizationReducer from './organizationReducer'
import groupReducer from './groupReducer'
import sellerReducer from './sellerReducer'

export default combineReducers({
  organizations: organizationReducer,
  groups: groupReducer,
  sellers: sellerReducer,
})
