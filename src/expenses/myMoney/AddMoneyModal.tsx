import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import Modal from '@mui/material/Modal'
import { GridToolbarContainer } from '@mui/x-data-grid'
import {
  Container,
  CssBaseline,
  Avatar,
  Grid,
  TextField,
  Alert,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  SelectChangeEvent,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios, { isAxiosError } from 'axios'
import { paymentIdMethodsMapper, paymentMethodsIdMapper } from '../../utils'
import { MoneyData } from './MoneyDataTable'

type FormValues = {
  description: string
  value: number
  date: Date
  type: string
  paid: boolean
  paymentMethod: string
}

export default function AddMoneyModal({
  rows,
  setRows,
}: {
  rows: MoneyData[]
  setRows: React.Dispatch<React.SetStateAction<MoneyData[]>>
}) {
  const [open, setOpen] = React.useState(false)
  const [errorMsg, setError] = React.useState('')
  const [successMsg, setSuccess] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('PIX')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string)
  }

  const validationSchema = yup.object({
    description: yup.string().required('Descrição obrigatória'),
    value: yup.number().required('Valor obrigatório'),
    date: yup.date().required('Data obrigatória'),
    type: yup.string().required('Tipo obrigatório'),
    paid: yup.boolean().required('Pago obrigatório'),
    paymentMethod: yup.string().required('Método de pagamento obrigatório'),
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
        `${import.meta.env.VITE_SERVER_URL}/movimentacoes`,
        {
          descricao: data.description,
          valor: data.value,
          data: data.date,
          tipo: data.type,
          pago: data.paid,
          idMetodoPagamento: paymentMethodsIdMapper.get(data.paymentMethod),
        },
        {
          headers: {
            Authorization: sessionStorage.getItem('token'),
          },
        }
      )

      if (response.status !== 201) {
        throw response
      }
      setError('')
      setSuccess('Adicionado com sucesso!')
      const newRegister: MoneyData = {
        id: response.data.dados.id,
        descricao: response.data.dados.descricao,
        valor: response.data.dados.valor,
        data: new Date(response.data.dados.data),
        tipo: response.data.dados.tipo,
        pago: response.data.dados.pago,
        metodoPagamento: paymentIdMethodsMapper.get(
          response.data.dados.idMetodoPagamento
        )!,
      }

      setRows([...rows, newRegister])
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errors = error.response?.data?.erros
        if (Array.isArray(errors)) {
          setError(errors.join(', '))
          return
        }
      }
      setError('Não foi possivel realizar a ação no momento')
    }
  }

  return (
    <React.Fragment>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
          Novo registro
        </Button>
      </GridToolbarContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            <Paper sx={{ padding: 4 }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Novo registro
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(submit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      {...(errors.description && {
                        error: true,
                        helperText: errors.description.message,
                      })}
                      id="description"
                      label="Descrição"
                      fullWidth
                      {...register('description')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...(errors.value && {
                        error: true,
                        helperText: errors.value.message,
                      })}
                      id="value"
                      label="Valor"
                      type="number"
                      fullWidth
                      {...register('value')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...(errors.date && {
                        error: true,
                        helperText: errors.date.message,
                      })}
                      id="date"
                      label="Data"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      {...register('date')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...(errors.type && {
                        error: true,
                        helperText: errors.type.message,
                      })}
                      id="type"
                      label="Tipo"
                      fullWidth
                      {...register('type')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox {...register('paid')} color="primary" />
                      }
                      label="Pago"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      {...(errors.paymentMethod && {
                        error: true,
                      })}
                      fullWidth
                    >
                      <InputLabel id="paymentMethod-label">
                        Método de pagamento
                      </InputLabel>
                      <Select
                        id="paymentMethod"
                        value={paymentMethod}
                        labelId="paymentMethod-label"
                        {...register('paymentMethod')}
                        onChange={handleChange}
                      >
                        <MenuItem value="PIX">PIX</MenuItem>
                        <MenuItem value="CRÉDITO">CRÉDITO</MenuItem>
                        <MenuItem value="DÉBITO">DÉBITO</MenuItem>
                        <MenuItem value="DINHEIRO">DINHEIRO</MenuItem>
                      </Select>
                      {errors.paymentMethod && (
                        <FormHelperText>
                          {errors.paymentMethod.message}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                  Adicionar
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Modal>
    </React.Fragment>
  )
}
