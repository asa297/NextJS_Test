import styled from 'styled-components'
import SubmitButton from './SubmitButton'
import DeleteButton from './DeleteButton'

export default ({ isEditingForm, onDelete, onSubmit, goBack, popupTitle, ...rest }) => {
  const handleDelete = async () => {
    await onDelete()
    goBack()
  }
  return (
    <ActionBarContainer>
      {isEditingForm && <DeleteButton title={popupTitle} onConfirm={handleDelete} />}
      <SubmitButton onClick={() => onSubmit()} {...rest} />
    </ActionBarContainer>
  )
}

const ActionBarContainer = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  @media (max-width: 1366px) {
    position: fixed;
    left: 0;
    bottom: 0;

    z-index: 10;
  }
`
