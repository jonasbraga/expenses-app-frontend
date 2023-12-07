import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link, useNavigate } from 'react-router-dom'
import axios, { isAxiosError } from 'axios'
import { Alert } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const [errorMsg, setError] = React.useState('')

  const schema = yup.object({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(2, 'Campo Senha Obrigatório').required(),
  })

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const { register, handleSubmit, formState } = form

  const { errors } = formState

  const submit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + '/usuarios/login',
        {
          login: data.email,
          senha: data.password,
        }
      )

      if (response.status !== 200) {
        throw response
      }

      sessionStorage.setItem('token', response.data.dados)

      return navigate('/expenses/dashboard')
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log(error.code)
        console.log(error.response?.data)
      }
      setError('Email ou senha incorretos')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
          <TextField
            {...(errors.email && {
              error: true,
              helperText: errors.email.message,
            })}
            id="email"
            label="Email"
            margin="normal"
            autoComplete="email"
            fullWidth
            autoFocus
            {...register('email')}
          />
          <TextField
            {...(errors.password && {
              error: true,
              helperText: errors.password.message,
            })}
            id="password"
            label="Senha"
            type="password"
            margin="normal"
            autoComplete="current-password"
            fullWidth
            {...register('password')}
          />
          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Link to="/create-user">
            {'Ainda não tem uma conta? Cadastre-se!'}
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
