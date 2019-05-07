import { Upload, Icon, message } from 'antd'
import styled from 'styled-components'

const beforeUpload = file => {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

const uploadButton = (
  <div>
    <Icon type={'plus'} />
    <div className="ant-upload-text">Upload</div>
  </div>
)

export default ({ value, ...rest }) => {
  return (
    <UploadWrapper
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      {...rest}
    >
      {value ? <img src={value} alt="avatar" /> : uploadButton}
    </UploadWrapper>
  )
}

const UploadWrapper = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
  }
`
