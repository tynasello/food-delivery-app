import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { TextInput } from '../../shared/inputs'
import { Bottom, Top } from '../../shared/styles'
import { Text } from '../../shared/typography'

interface Props {
  onSubmitError: string | null
}

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export const loginInitialValues = { username: '', password: '' }

const LoginForm = ({ onSubmitError }: Props) => {
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
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
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

export default LoginForm
