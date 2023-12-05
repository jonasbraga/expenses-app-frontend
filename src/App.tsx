//Ponto onde as paginas serão inseridas
import { Box, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <Box>
      <header>
        <Typography
          variant="h2"
          sx={{
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Bem vindo ao sistema de gerência de gastos
        </Typography>
      </header>
      <Outlet />
    </Box>
  )
}
