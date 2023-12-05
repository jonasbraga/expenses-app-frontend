import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import MoneyDataTable from './MoneyDataTable'

export default function MyMoney() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <h1>My Money</h1>
          <MoneyDataTable />
        </Paper>
      </Grid>
    </Grid>
  )
}
