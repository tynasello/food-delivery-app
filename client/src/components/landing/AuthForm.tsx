import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation, useSignupMutation } from '../../graphql/generated/schema'
import { SignupLogin } from '../../graphql/types/signup-login.types'
import { ButtonCustom } from '../shared/inputs'
import {
  LoginForm,
  loginInitialValues,
  loginSchema,
  SignupForm,
  signupInitialValues,
  signupSchema,
} from './authForms'
import ClipLoader from 'react-spinners/ClipLoader'

interface Props {
  method: 'signUp' | 'signIn'
}

interface FormikOnSubmitProps {
  setSubmitting: (arg0: boolean) => void
  resetForm: () => void
}

const AuthForm = ({ method }: Props) => {
  const navigate = useNavigate()
  const [signup] = useSignupMutation()
  const [login] = useLoginMutation()
  const [loginError, setLoginError] = useState<null | string>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupError, setSignupError] = useState<null | string>(null)

  const onSubmit = async (
    values: SignupLogin,
    { setSubmitting, resetForm }: FormikOnSubmitProps
  ) => {
    try {
      setIsSubmitting(true)
      const { data } =
        method === 'signUp'
          ? await signup({
              variables: {
                createUserInput: {
                  username: values.username,
                  address: values.address ?? '',
                  password: values.password,
                },
              },
            })
          : await login({
              variables: {
                loginInput: {
                  username: values.username,
                  password: values.password,
                },
              },
            })
      // @ts-ignore
      if (data?.signup || data?.login) {
        // @ts-ignore
        const { at, rt } = data.signup ?? data.login

        localStorage.setItem('at', at ?? null)
        localStorage.setItem('rt', rt ?? null)

        resetForm()
        navigate('/home')
      }
      method === 'signUp' ? setSignupError(null) : setLoginError(null)
    } catch (error) {
      if (error instanceof Error) {
        if (error?.message)
          method === 'signUp' ? setSignupError(error.message) : setLoginError(error.message)
      }
    }
    setIsSubmitting(false)
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={method === 'signUp' ? signupInitialValues : loginInitialValues}
      validationSchema={method === 'signUp' ? signupSchema : loginSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      <Form>
        {method === 'signUp' ? (
          <SignupForm onSubmitError={signupError} />
        ) : (
          <LoginForm onSubmitError={loginError} />
        )}

        <ButtonCustom
          variant="contained"
          rounded
          color="success"
          type="submit"
          sx={{ padding: '1rem 2rem' }}
        >
          {method === 'signUp' ? 'Create Account' : 'Login'}
        </ButtonCustom>
        {isSubmitting && (
          <>
            <br />
            <br />
            <ClipLoader color={'#fff'} size={20} />
          </>
        )}
      </Form>
    </Formik>
  )
}

export default AuthForm
