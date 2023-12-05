import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Chart from './Chart'
import Balance from './Balance'
import MoneyRecords from './MoneyRecords'

export default function Dashboard() {
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
          <Chart />
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
          <Balance />
        </Paper>
      </Grid>
      {/* Recent MoneyRecords */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <MoneyRecords />
        </Paper>
      </Grid>
    </Grid>
  )
}
