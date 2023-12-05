import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Alert, Paper } from '@mui/material'
import Container from '@mui/material/Container'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios, { isAxiosError } from 'axios'
import * as yup from 'yup'
import { decodeJwt } from 'jose'
import PasswordReset from './PasswordReset'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  cpf: string
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

type userData = {
  id: string
  nome: string
  email: string
  cpf: string
  ativo: boolean
}

const getDecodedToken = () => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return null
  }
  const claims = decodeJwt<jwtClaims>(token)

  return claims
}

export default function MyAccount() {
  const [errorMsg, setError] = React.useState('')
  const [successMsg, setSuccess] = React.useState('')
  const [userData, setUserData] = React.useState<userData>()

  React.useEffect(() => {
    getCurrentUserData()
  }, [])

  const getCurrentUserData = async () => {
    const claims = getDecodedToken()
    if (!claims) {
      return null
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + '/usuarios/' + claims.iss
      )

      if (response.status !== 200) {
        throw response
      }

      setUserData(response.data.dados as userData)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errors = error.response?.data?.erros
        if (Array.isArray(errors)) {
          setError(errors.join(', '))
          return
        }
      }
      setError('Não foi possivel carregar os dados no momento')
    }
  }

  const validationSchema = yup.object({
    firstName: yup.string().required('Nome obrigatório'),
    lastName: yup.string().required('Sobrenome obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    cpf: yup
      .string()
      .min(11, 'CPF inválido')
      .max(11, 'CPF inválidocMax')
      .required('CPF obrigatório'),
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
        import.meta.env.VITE_SERVER_URL + '/usuarios/' + userData?.id,
        {
          nome: data.firstName + ' ' + data.lastName,
          cpf: data.cpf,
          email: data.email,
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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
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
                <AccountCircleIcon />
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
                      {...(errors.firstName && {
                        error: true,
                        helperText: errors.firstName.message,
                      })}
                      id="firstName"
                      label="Nome"
                      autoComplete="given-name"
                      autoFocus
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...register('firstName')}
                      value={userData?.nome.split(' ')[0]}
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
                      InputLabelProps={{ shrink: true }}
                      {...register('lastName')}
                      value={userData?.nome.split(' ')[1]}
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
                      InputLabelProps={{ shrink: true }}
                      {...register('email')}
                      defaultValue={userData?.email}
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
                      InputLabelProps={{ shrink: true }}
                      {...register('cpf')}
                      value={userData?.cpf}
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
                  Alterar dados
                </Button>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <PasswordReset />
        </Paper>
      </Grid>
    </Grid>
  )
}
