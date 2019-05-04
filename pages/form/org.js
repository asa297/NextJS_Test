import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, OrgFormRender } from '<components>'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)

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
    padding: 5% 5% 50px 5%;
  }
  padding: 3% 5% 50px 5%;
`
