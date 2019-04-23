import React from 'react'
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import styled from 'styled-components'

const menu = [
  { name: 'PurchaseOrder', sub_name: 'PO', path: '/report/po' },
  { name: 'DeliveryNote', sub_name: 'DN', path: '/report/po' },
  { name: 'Inventory', sub_name: 'Inventory', path: '/report/po' },
  { name: 'InBoundInventory', sub_name: 'IN-Inventory', path: '/report/po' },
  { name: 'OutBoundInventory', sub_name: 'OUT-Inventory', path: '/report/po' },
  { name: 'DailyInventory', sub_name: 'D-Inventory', path: '/report/po' },
  { name: 'DailyCashBalance', sub_name: 'D-CashBalance', path: '/report/po' },
  { name: 'DailyCommission', sub_name: 'D-Commission', path: '/report/po' },
]

const ReportMenu = ({ open, classes, MenuFunction, ...rest }) => {
  return (
    <Collapse in={open} timeout="auto">
      <List component="div" disablePadding>
        {menu.map(({ name, sub_name, path }) => {
          return (
            <ListItemWrapper button key={name} onClick={() => MenuFunction(path)}>
              <ListItemTextWrapper inset primary={sub_name} />
            </ListItemWrapper>
          )
        })}
      </List>
    </Collapse>
  )
}

export default ReportMenu

const ListItemWrapper = styled(ListItem)`
  white-space: nowrap;
`
const ListItemTextWrapper = styled(ListItemText)`
  padding-left: 20px !important;
`
