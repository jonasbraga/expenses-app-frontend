import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios, { isAxiosError } from 'axios'
import { Alert } from '@mui/material'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  cpf: string
  password: string
  passwordConfirm: string
}

export default function SignUp() {
  const navigate = useNavigate()
  const [errorMsg, setError] = React.useState('')
  const [successMsg, setSuccess] = React.useState('')

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validationSchema = yup.object({
    firstName: yup.string().required('Nome obrigatório'),
    lastName: yup.string().required('Sobrenome obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    cpf: yup
      .string()
      .min(11, 'CPF inválido')
      .max(11, 'CPF inválidocMax')
      .required('CPF obrigatório'),
    password: yup
      .string()
      .min(8, 'Senha com no mínimo 8 caracteres')
      .matches(
        passwordRegex,
        'A senha deve possuir ao menos 1 letra maiúscula, 1 minuscula, 1 numero e 1 caracter especial'
      )
      .required(),
    passwordConfirm: yup
      .string()
      .required('Confirme a senha')
      .oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const submit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + '/usuarios',
        {
          email: data.email,
          senha: data.password,
          nome: data.firstName + ' ' + data.lastName,
          cpf: data.cpf,
          login: data.email,
        }
      )

      if (response.status !== 201) {
        throw response
      }
      setError('')
      setSuccess('Cadastro realizado com sucesso! Faça login para continuar')
      setTimeout(() => {
        return navigate('/')
      }, 2500)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errors = error.response?.data?.erros
        if (Array.isArray(errors)) {
          setError(errors.join(', '))
          return
        }
      }
      setError('Não foi possivel cadastrar no momento')
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
          Cadastro
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName.message,
                })}
                id="firstName"
                label="Nome"
                autoComplete="given-name"
                autoFocus
                fullWidth
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName.message,
                })}
                id="lastName"
                label="Sobrenome"
                autoComplete="family-name"
                fullWidth
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...(errors.email && {
                  error: true,
                  helperText: errors.email.message,
                })}
                id="email"
                label="Email"
                autoComplete="email"
                fullWidth
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...(errors.cpf && {
                  error: true,
                  helperText: errors.cpf.message,
                })}
                id="cpf"
                type="number"
                label="CPF"
                autoComplete="cpf"
                fullWidth
                {...register('cpf')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...(errors.password && {
                  error: true,
                  helperText: errors.password.message,
                })}
                id="password"
                label="Senha"
                type="password"
                autoComplete="new-password"
                fullWidth
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...(errors.passwordConfirm && {
                  error: true,
                  helperText: errors.passwordConfirm.message,
                })}
                id="passwordConfirm"
                label="Confirmação da senha"
                type="password"
                autoComplete="confirm-password"
                fullWidth
                {...register('passwordConfirm')}
              />
            </Grid>
          </Grid>
          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMsg}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/">Já tem uma conta? Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
