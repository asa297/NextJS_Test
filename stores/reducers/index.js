import { combineReducers } from 'redux'

import organizationReducer from './organizationReducer'
import groupReducer from './groupReducer'
import sellerReducer from './sellerReducer'
import itemReducer from './itemReducer'
import purchaseOrderReducer from './purchaseOrderReducer'
import reportReducer from './reportReducer'
import authReducer from './authReducer'

export default combineReducers({
  organizations: organizationReducer,
  groups: groupReducer,
  sellers: sellerReducer,
  items: itemReducer,
  poes: purchaseOrderReducer,
  reports: reportReducer,
  auth: authReducer,
})
