import { combineReducers } from 'redux'

import organizationReducer from './organizationReducer'
import groupReducer from './groupReducer'
import sellerReducer from './sellerReducer'
import itemReducer from './itemReducer'

export default combineReducers({
  organizations: organizationReducer,
  groups: groupReducer,
  sellers: sellerReducer,
  items: itemReducer,
})
