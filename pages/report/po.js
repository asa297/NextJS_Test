import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, PurchaseOrderReportTable } from '<components>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    return { pageName: name }
  }

  render() {
    const {} = this.props

    const data = [
      {
        name: 'Tanner Linsley',
        age: 26,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        },
      },
    ]

    return (
      <ReportContainer>
        <PurchaseOrderReportTable data={data} />
        <ModalLoading loading={false} text={'Loading...'} />
      </ReportContainer>
    )
  }
}

index = connect(
  ({ items }) => ({ items }),
  { Fetch: Action.FetchItem },
)(index)

export default withAuth([admin])(index)

const ReportContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 60px 5%;
  }
  padding: 3% 5% 60px 5%;
`
