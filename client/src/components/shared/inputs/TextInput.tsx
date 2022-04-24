import { SxProps, TextField } from '@mui/material'

const textFieldSx = {
  input: {
    color: 'white',
  },
  label: {
    color: '#A6ACAF',
  },
  fieldSet: {
    borderColor: '#A6ACAF',
    borderRadius: '.7rem',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
  },
}

interface Props {
  variant: 'primary'
  type?: 'password'
  name: string
  label: string
  autoComplete?: 'off' | 'on'
  onChange?: () => void
  sx?: SxProps
  error?: boolean
  helperText?: string
}

interface TextFieldProps {
  primary: {
    fullWidth: boolean
    color: 'primary'
    name: string
    label: string
    onChange?: () => void
    error?: boolean
    helperText?: string
  }
}

const TextInput = ({
  variant,
  type,
  name,
  label,
  autoComplete,
  onChange,
  sx,
  error,
  helperText,
}: Props) => {
  const textInputProps: TextFieldProps = {
    primary: {
      fullWidth: true,
      color: 'primary',
      name: name,
      label: label,
      onChange: onChange,
      error: error,
      helperText: helperText,
    },
  }

  return (
    <TextField
      fullWidth={textInputProps[variant].fullWidth}
      type={type}
      color={textInputProps[variant].color}
      name={name}
      label={label}
      autoComplete={autoComplete}
      onChange={textInputProps[variant].onChange}
      sx={{ ...textFieldSx, ...sx }}
      error={textInputProps[variant].error}
      helperText={textInputProps[variant].helperText}
    />
  )
}

export default TextInput
