import * as organizationAction from './organizationAction'
import * as groupAction from './groupAction'
import * as sellerAction from './sellerAction'

export default {
  ...organizationAction,
  ...groupAction,
  ...sellerAction,
}
