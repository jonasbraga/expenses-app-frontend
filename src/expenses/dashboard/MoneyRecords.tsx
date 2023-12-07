import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material'
import { MoneyData } from '../../types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

type Props = {
  moneyRecords: MoneyData[]
}

export default function MoneyRecords({ moneyRecords: rows }: Props) {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Descrição</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell>Tipo de pagamento</StyledTableCell>
            <StyledTableCell>Pago?</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.data.toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.descricao}</TableCell>
              <TableCell>{row.valor}</TableCell>
              <TableCell>{row.metodoPagamento}</TableCell>
              <TableCell>
                {row.pago ? <CheckCircleIcon /> : <CancelIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" to="/expenses/mymoney">
        Ver mais lançamentos
      </Link>
    </React.Fragment>
  )
}
