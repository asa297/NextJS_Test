import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuthFirebase, ModalLoading, PurchaseOrderReportTable, SearchBar, InputDatePickerRange } from '<components>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  componentWillMount() {
    const { FetchPurchaseOrder } = this.props
    FetchPurchaseOrder()
  }

  render() {
    const {
      reports: { isFetching, purchaseOrder },
    } = this.props

    return (
      <ReportContainer>
        <ActionContainer>
          <SearchContainer>
            <SearchBar placeholder="ค้นหารายการขาย" onChange={e => console.log(e)} />
          </SearchContainer>
          <DateRangeContainer>
            <InputDatePickerRange placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']} onChange={e => console.log(e)} />
          </DateRangeContainer>
        </ActionContainer>

        <PurchaseOrderReportTable data={purchaseOrder} />
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </ReportContainer>
    )
  }
}

index = connect(
  ({ reports }) => ({ reports }),
  { FetchPurchaseOrder: Action.FetchPurchaseOrder },
)(index)

export default withAuthFirebase([admin])(index)

const ReportContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 60px 5%;
  }
  padding: 3% 5% 60px 5%;
`

const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const SearchContainer = styled.div`
  @media (max-width: 576px) {
    width: 100%;
  }
  width: 45%;
`

const DateRangeContainer = styled.div`
  @media (max-width: 576px) {
    width: 100%;
  }
  width: 35%;
  display: flex;
  justify-content: flex-end;
`
