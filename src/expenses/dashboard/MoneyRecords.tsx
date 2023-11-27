import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses }  from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))
  
// Generate Order Data
function createData(
    id: number,
    date: string,
    type: string,
    description: string,
    value: number,
    paymentType: string,
    recurrence: string,
  ) {
    return { id, date, type, description, value, paymentType, recurrence }
  }
  
const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Despesa',
        'Compra de equipamento',
        312.44,
        'Cartão de Crédito',
        'Única vez',
    ),
    createData(
        1,
        '17 Mar, 2019',
        'Receita',
        'Venda de produto',
        866.99,
        'Transferência Bancária',
        'Mensal',
    ),
    createData(
        2,
        '18 Mar, 2019',
        'Despesa',
        'Pagamento de serviços',
        200.00,
        'Débito',
        'Única vez',
    ),
    createData(
        3,
        '19 Mar, 2019',
        'Receita',
        'Venda de serviço',
        500.00,
        'Dinheiro',
        'Única vez',
    ),
    createData(
        4,
        '20 Mar, 2019',
        'Despesa',
        'Compra de suprimentos',
        150.00,
        'Cartão de Crédito',
        'Única vez',
    ),
    createData(
        5,
        '21 Mar, 2019',
        'Receita',
        'Contrato de serviço',
        1200.00,
        'Transferência Bancária',
        'Anual',
    ),
    createData(
        6,
        '22 Mar, 2019',
        'Despesa',
        'Pagamento de impostos',
        300.00,
        'Débito',
        'Anual',
    ),
    createData(
        7,
        '23 Mar, 2019',
        'Receita',
        'Venda de produto',
        100.00,
        'Dinheiro',
        'Única vez',
    ),
    createData(
        8,
        '24 Mar, 2019',
        'Despesa',
        'Compra de equipamento',
        400.00,
        'Cartão de Crédito',
        'Única vez',
    ),
    createData(
        9,
        '25 Mar, 2019',
        'Receita',
        'Venda de serviço',
        600.00,
        'Transferência Bancária',
        'Mensal',
    ),
]

export default function MoneyRecords() {
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
            <StyledTableCell align="right">Recorrencia</StyledTableCell>
          </TableRow>
        </TableHead>
        
<TableBody>
  {rows.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.value}</TableCell>
      <TableCell>{row.paymentType}</TableCell>
      <TableCell align="right">{row.recurrence}</TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
      <Link color="primary" to="#">
        Ver mais lançamentos
      </Link>
    </React.Fragment>
  )
}
