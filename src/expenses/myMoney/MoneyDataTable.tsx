import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import axios from 'axios'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { MenuItem, Select } from '@mui/material'
import AddMoneyModal from './AddMoneyModal'
import actionsButtons from './ActionsButtons'
import { paymentIdMethodsMapper, paymentMethodsIdMapper } from '../../utils'
import { MoneyData, ResponseMovimentacoes } from '../../types'

export default function MoneyDataTable() {
  const [rows, setRows] = React.useState<MoneyData[]>([])
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  )
  const [open, setOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/movimentacoes/filtro`, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (!response.data?.dados) {
          setRows([])
          return
        }
        const data = response.data.dados?.map((item: ResponseMovimentacoes) => {
          return {
            id: item.id,
            descricao: item.descricao,
            valor: item.valor,
            data: new Date(item.data),
            tipo: item.tipo,
            pago: item.pago,
            metodoPagamento: paymentIdMethodsMapper.get(item.idMetodoPagamento),
          } as MoneyData
        })
        setRows(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleClickOpenDeletePopup = () => {
    setOpen(true)
  }

  const handleCloseDeletePopup = () => {
    setOpen(false)
  }

  // @ts-expect-error ignoring type
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params: Record<string, unknown>,
    event: Record<string, unknown>
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setSelectedRow(id)
    handleClickOpenDeletePopup()
  }

  const deleteRow = () => {
    axios
      .delete(
        `${import.meta.env.VITE_SERVER_URL}/movimentacoes/${selectedRow}`,
        {
          headers: {
            Authorization: sessionStorage.getItem('token'),
          },
        }
      )
      .then(() => {
        setRows(rows.filter((row: GridRowsProp[0]) => row.id !== selectedRow))
        handleCloseDeletePopup()
      })
      .catch((error) => {
        console.error('Error deleting record:', error)
      })
  }

  const processRowUpdate = (updatedRow: MoneyData) => {
    const id = updatedRow.id
    axios
      .put(
        `${import.meta.env.VITE_SERVER_URL}/movimentacoes/${id}`,
        {
          descricao: updatedRow.descricao,
          valor: updatedRow.valor,
          data: updatedRow.data,
          tipo: updatedRow.tipo,
          pago: updatedRow.pago,
          idMetodoPagamento: paymentMethodsIdMapper.get(
            updatedRow.metodoPagamento
          ),
        },
        {
          headers: {
            Authorization: sessionStorage.getItem('token'),
          },
        }
      )
      .then(() => {
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View },
        })
      })
      .catch((error) => {
        console.error('Error deleting record:', error)
      })
    setRows(
      rows.map((row) =>
        row.id === updatedRow.id ? { ...updatedRow, isNew: false } : row
      )
    )
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns: GridColDef[] = [
    { field: 'id', hideable: true, editable: false },
    { field: 'descricao', headerName: 'Descrição', width: 200, editable: true },
    {
      field: 'valor',
      headerName: 'Valor',
      type: 'number',
      width: 110,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'data',
      headerName: 'Data',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 120,
      editable: true,
    },
    {
      field: 'pago',
      headerName: 'Pago?',
      width: 100,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'metodoPagamento',
      headerName: 'Método de pagamentos',
      width: 180,
      editable: true,
      renderCell: (params: GridRenderCellParams) => params.value as string,
      renderEditCell: (params: GridRenderCellParams) => (
        <Select
          value={params.value as string}
          onChange={(event) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
            })
          }
        >
          <MenuItem value="PIX">PIX</MenuItem>
          <MenuItem value="CRÉDITO">CRÉDITO</MenuItem>
          <MenuItem value="DÉBITO">DÉBITO</MenuItem>
          <MenuItem value="DINHEIRO">DINHEIRO</MenuItem>
        </Select>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: actionsButtons(rowModesModel, {
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        handleDeleteClick,
      }),
    },
  ]

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: AddMoneyModal,
        }}
        slotProps={{
          toolbar: { rows, setRows },
        }}
      />
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleCloseDeletePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Deseja realmente excluir este registro?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta ação não poderá ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeletePopup}>Cancelar</Button>
            <Button onClick={deleteRow} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Box>
  )
}
