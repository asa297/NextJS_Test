import * as organizationAction from './organizationAction'
import * as groupAction from './groupAction'
import * as sellerAction from './sellerAction'
import * as itemAction from './itemAction'

export default {
  ...organizationAction,
  ...groupAction,
  ...sellerAction,
  ...itemAction,
}
