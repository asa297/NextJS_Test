import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, OrgFormRender } from '<components>'
import { default as Action } from '<actions>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

    // const { query } = ctx

    // console.log(query.id)
    return { pageName: name }
  }

  render() {
    const {
      organizations: { isFetching, Item },
      Insert,
    } = this.props

    return (
      <>
        <FormContainer>
          <OrgFormRender Item={Item} insert={Insert} />
        </FormContainer>

        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { Get: Action.GetOrganization, Insert: Action.InsertOrganization },
)(index)

export default withAuth([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 10% 5%;
  }

  padding: 3% 5%;
`
