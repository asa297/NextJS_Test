import numeral from 'numeral'
import moment from 'moment'

export default [
  {
    Header: '#',
    accessor: 'index',
    width: 30,
    style: { textAlign: 'center' },
  },
  {
    accessor: 'orderId',
    width: 50,
    Cell: row => <div>test</div>,
  },
  {
    Header: 'Order Id',
    accessor: 'orderId',
    width: 150,
    style: { fontWeight: 'bold', textAlign: 'center' },
  },
  {
    Header: 'Date',
    accessor: 'RecordDate',
    Cell: row => <div>{moment(row.value).format('DD-MM-YYYY (HH:mm:ss)')}</div>,
    style: { textAlign: 'center' },
  },
  {
    Header: 'Org Name',
    accessor: 'org.orgName',
    width: 350,
    style: { textAlign: 'center' },
  },
  {
    Header: 'Org Type',
    accessor: 'org.orgTypeName',
    width: 100,
  },
  {
    Header: 'GroupCode',
    accessor: 'group.groupCode',
    style: { textAlign: 'center' },
  },
  {
    Header: 'Sticker Number',
    accessor: 'group.groupStickerNumber',
    style: { textAlign: 'center' },
  },
  {
    Header: 'Total',
    accessor: 'subTotal',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right' },
  },
  {
    Header: 'Discount',
    accessor: 'discount',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right' },
  },
  {
    Header: 'Credit',
    accessor: 'credit',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right' },
  },
  {
    Header: 'Credit Charge',
    accessor: 'creditCharge',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right' },
  },
  {
    Header: 'Grand Total',
    accessor: 'grandTotal',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right', fontWeight: 'bold', color: 'blue' },
  },
  {
    Header: 'Receive Cash',
    accessor: 'receiveCash',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right', fontWeight: 'bold', color: 'green' },
  },
  {
    Header: 'Change Cash',
    accessor: 'changeCash',
    Cell: row => <div>{numeral(row.value).format('0,0.00')}</div>,
    style: { textAlign: 'right', fontWeight: 'bold', color: 'red' },
  },
  {
    Header: 'RecordBy',
    accessor: 'RecordNameBy',
    style: { textAlign: 'center' },
  },
]
