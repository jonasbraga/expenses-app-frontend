import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Chart from './Chart'
import Balance from './Balance'
import MoneyRecords from './MoneyRecords'
import React from 'react'
import { MoneyData, ResponseMovimentacoes } from '../../types'
import { paymentIdMethodsMapper } from '../../utils'
import axios from 'axios'
import { Box, CircularProgress } from '@mui/material'

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [moneyRecords, setMoneyRecords] = React.useState<MoneyData[]>([])
  const [balance, setBalance] = React.useState(0)
  const [incomeExpensesTotal, setIncomeExpensesTotal] = React.useState({
    income: 0,
    expenses: 0,
  })

  const getDashboardInfo = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/usuarios/dashboard`, {
        params: {
          mes: new Date().getMonth() + 1,
          ano: new Date().getFullYear(),
        },
        headers: {
          Authorization: sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (!response.data?.dados) {
          setMoneyRecords([])
          return
        }

        const balance = response.data.dados.saldoAtual
        setBalance(balance)

        const incomeExpensesTotal = {
          income: response.data.dados.valorReceitasPagas,
          expenses: response.data.dados.valorDespesasPagas,
        }
        setIncomeExpensesTotal(incomeExpensesTotal)

        const data = response.data.dados?.movimentacoesPeriodo?.map(
          (item: ResponseMovimentacoes) => {
            return {
              id: item.id,
              descricao: item.descricao,
              valor: item.valor,
              data: new Date(item.data),
              tipo: item.tipo,
              pago: item.pago,
              metodoPagamento: paymentIdMethodsMapper.get(
                item.idMetodoPagamento
              ),
            } as MoneyData
          }
        )
        const limitedData = data.slice(0, 15)
        setMoneyRecords(limitedData)
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  React.useEffect(() => {
    getDashboardInfo()
  }, [])

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart incomeExpensesTotal={incomeExpensesTotal} />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Balance balance={balance} />
        </Paper>
      </Grid>
      {/* Recent MoneyRecords */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <MoneyRecords moneyRecords={moneyRecords} />
        </Paper>
      </Grid>
    </Grid>
  )
}
