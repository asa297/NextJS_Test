import HeaderTable from './HeaderTable'
import Table from './Table'
import Header from './Header'
import FooterTable from './FooterTable'

export default ({ itemList, grandtotal, copy, credit, creditcharge }) => {
  return (
    <div>
      <Header copy={copy} />
      <HeaderTable />
      <Table itemList={itemList} />
      <FooterTable grandtotal={grandtotal} credit={credit} creditcharge={creditcharge} />
    </div>
  )
}
