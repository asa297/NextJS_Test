import React from 'react'
import { connect } from 'react-redux'
import { default as Action } from '<actions>'
import styled from 'styled-components'
import { admin } from '<helpers>/role'
import { getPageNameFromReq } from '<helpers>/utils'
import { withAuth, ModalLoading, GroupFormRender } from '<components>'
import Router from 'next/router'

class index extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { name } = await getPageNameFromReq(ctx)
    const { _id: formId } = ctx.query
    const isEditingForm = formId ? true : false

    return { pageName: name, formId, isEditingForm }
  }

  componentWillMount() {
    const { formId, Get, FetchOrganization } = this.props
    FetchOrganization(false)
    if (formId) Get(formId)
  }
  render() {
    const {
      isEditingForm,
      groups: { isFetching, Item },
      organizations: { isFetching: orgisFetching, List: orgList },
      Insert,
      Delete,
      Update,
    } = this.props

    return (
      <>
        <FormContainer>
          <GroupFormRender
            Item={Item}
            isEditingForm={isEditingForm}
            Insert={Insert}
            Delete={Delete}
            Update={Update}
            goBack={() => Router.push({ pathname: '/group' })}
            orgList={orgList}
          />
        </FormContainer>
        <ModalLoading loading={isFetching || orgisFetching} text={'Loading...'} />
      </>
    )
  }
}

index = connect(
  ({ groups, organizations }) => ({ groups, organizations }),
  {
    Get: Action.GetGroup,
    Insert: Action.InsertGroup,
    Delete: Action.DeleteGroup,
    Update: Action.UpdateGroup,
    FetchOrganization: Action.FetchOrganization,
  },
)(index)

export default withAuth([admin])(index)

const FormContainer = styled.div`
  @media (max-width: 576px) {
    padding: 5% 5% 50px 5%;
  }
  padding: 3% 5% 50px 5%;
`
