import { Upload, Icon } from 'antd'
import styled from 'styled-components'

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
      customRequest={({ file, onSuccess }) => {
        onSuccess('ok')
      }}
      {...rest}
    >
      {value ? <ImageWrapper image={value} /> : uploadButton}
    </UploadWrapper>
  )
}

const UploadWrapper = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
  }
`

const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  background: url(${props => props.image}) no-repeat center;
  background-size: contain;
`
