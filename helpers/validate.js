import * as Yup from 'yup'

export const OrganizationSchema = Yup.object().shape({
  org_name: Yup.string().required('Required'),
  org_comA: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.')
    .required('Required'),
  org_comB: Yup.number()
    .min(0, 'number must more than 0.')
    .max(100, 'maximum number is 100.'),
  org_code: Yup.string().required('Required'),
})
