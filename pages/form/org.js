import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, OrgFormRender } from '<components>'
import Router from 'next/router'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    const { _id: formId } = ctx.query
    const isEditingForm = formId ? true : false

    return { pageName: name, formId, isEditingForm }
  }

  componentWillMount() {
    const { formId, Get } = this.props
    if (formId) Get(formId)
  }
  render() {
    const {
      isEditingForm,
      organizations: { isFetching, Item },
      Insert,
      Delete,
    } = this.props

    return (
      <>
        <FormContainer>
          <OrgFormRender Item={Item} isEditingForm={isEditingForm} Insert={Insert} Delete={Delete} goBack={() => Router.push({ pathname: '/org' })} />
        </FormContainer>
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ organizations }) => ({ organizations }),
  { Get: Action.GetOrganization, Insert: Action.InsertOrganization, Delete: Action.DeleteOrganization },
)(index)

export default withAuth([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 50px 5%;
  }
  padding: 3% 5% 50px 5%;
`
