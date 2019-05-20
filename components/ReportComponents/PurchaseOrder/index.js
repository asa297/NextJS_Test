import 'react-table/react-table.css'
import ReactTable from 'react-table'
import columns from './columns'

export default ({ data, ...rest }) => {
  return <ReactTable data={data} columns={columns} showPaginationBottom={false} showPaginationTop={true} showPageSizeOptions={false} defaultPageSize={20} />
}
