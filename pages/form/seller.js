import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, SellerFormRender } from '<components>'
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
      sellers: { isFetching, Item },
      Insert,
      Delete,
      Update,
    } = this.props

    return (
      <>
        <FormContainer>
          <SellerFormRender
            Item={Item}
            isEditingForm={isEditingForm}
            Insert={Insert}
            Delete={Delete}
            Update={Update}
            goBack={() => Router.push({ pathname: '/seller' })}
          />
        </FormContainer>
        <ModalLoading loading={isFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ sellers }) => ({ sellers }),
  { Get: Action.GetSeller, Insert: Action.InsertSeller, Delete: Action.DeleteSeller, Update: Action.UpdateSeller },
)(index)

export default withAuth([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 60px 5%;
  }
  padding: 3% 5% 60px 5%;
`
