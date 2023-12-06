import React from 'react'
import {
  Button,
  TextField,
  Grid,
  Alert,
  Avatar,
  Box,
  Container,
  CssBaseline,
} from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { isAxiosError } from 'axios'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { decodeJwt } from 'jose'

type FormValues = {
  password: string
  passwordConfirm: string
}

type jwtClaims = {
  userId: string
  iat: number
  exp: number
  aud: string
  iss: string
  sub: string
  jti: string
}

const getDecodedToken = () => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return null
  }
  const claims = decodeJwt<jwtClaims>(token)

  return claims
}

export default function PasswordReset() {
  const [errorMsg, setError] = React.useState('')
  const [successMsg, setSuccess] = React.useState('')

  const userId = getDecodedToken()?.iss

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validationSchema = yup.object({
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
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/usuarios/${userId}/senha`,
        {
          senha: data.password,
        }
      )

      if (response.status !== 200) {
        throw response
      }
      setError('')
      setSuccess('Atualização realizada com sucesso!')
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errors = error.response?.data?.erros
        if (Array.isArray(errors)) {
          setError(errors.join(', '))
          return
        }
      }
      setError('Não foi possivel realizar a atualização no momento')
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <KeyIcon />
        </Avatar>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
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
            Alterar senha
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
