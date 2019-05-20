import * as organizationAction from './organizationAction'
import * as groupAction from './groupAction'
import * as sellerAction from './sellerAction'
import * as itemAction from './itemAction'
import * as purchaseOrderAction from './purchaseOrderAction'
import * as reportAction from './reportAction'

export default {
  ...organizationAction,
  ...groupAction,
  ...sellerAction,
  ...itemAction,
  ...purchaseOrderAction,
  ...reportAction,
}
