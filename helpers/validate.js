import * as Yup from 'yup'

export const OrganizationSchema = Yup.object().shape({
  orgType: Yup.object().required('Required'),
  orgName: Yup.string().required('Required'),
  orgComA: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.')
    .required('Required'),
  orgComB: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.'),
  orgCode: Yup.string().required('Required'),
})

export const GroupSchema = Yup.object().shape({
  org: Yup.object().required('Required'),
  groupCode: Yup.string().required('Required'),
  groupStickerNumber: Yup.number().typeError('Number Only'),
  guideName: Yup.string().required('Required'),
})
