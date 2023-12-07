import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'

type Props = {
  balance: number
}

export default function Balance({ balance }: Props) {
  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        {' '}
        Saldo{' '}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography component="p" variant="h4">
          R$ {balance}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          em{' '}
          {new Date().toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
      </Box>
      <Box margin={{ mt: 10 }}>
        <Link color="primary" to="/expenses/mymoney">
          Ver lançamentos
        </Link>
      </Box>
    </React.Fragment>
  )
}
