import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { TextInput } from '../../shared/inputs'
import { Bottom, Top } from '../../shared/styles'
import { Text } from '../../shared/typography'

interface Props {
  onSubmitError: string | null
}

export const signupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const signupInitialValues = { username: '', address: '', password: '' }

const SignupForm = ({ onSubmitError }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { handleChange, touched, errors, resetForm }: any = useFormikContext()

  useEffect(() => {
    resetForm()
  }, [resetForm])

  return (
    <>
      <Top>
        <TextInput
          variant="primary"
          name="username"
          label="Username"
          autoComplete="off"
          onChange={handleChange}
          sx={{ marginRight: '1rem' }}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />

        <TextInput
          variant="primary"
          name="address"
          label="Address"
          autoComplete="off"
          onChange={handleChange}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
      </Top>

      <Bottom>
        <TextInput
          variant="primary"
          type="password"
          name="password"
          label="Password"
          autoComplete="off"
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />

        {onSubmitError && (
          <Text type="Error" sx={{ paddingTop: '1rem' }}>
            {onSubmitError}
          </Text>
        )}
      </Bottom>
    </>
  )
}

export default SignupForm
