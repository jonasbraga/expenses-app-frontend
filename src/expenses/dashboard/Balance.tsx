import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'

export default function Balance() {
  return (
    <React.Fragment>
      <Typography variant='h4' align='center' > Saldo </Typography>
      <Box sx={{mt: 3}}>
        <Typography component="p" variant="h4">
            R$3,024.00
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            em 26 de Novembro de 2023
        </Typography>
      </Box>
      <Box margin={{mt: 10}}>
        <Link color="primary" to="#">
          Ver lançamentos
        </Link>
      </Box>
    </React.Fragment>
  )
}
