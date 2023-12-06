import {
  GridRowParams,
  GridRowModes,
  GridActionsCellItem,
  GridRowId,
} from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'

const actionsButtons =
  (
    rowModesModel: any,
    callbacks: {
      handleSaveClick: (id: GridRowId) => () => void
      handleCancelClick: (id: GridRowId) => () => void
      handleEditClick: (id: GridRowId) => () => void
      handleDeleteClick: (id: GridRowId) => () => void
    }
  ) =>
  (params: GridRowParams) => {
    const { id } = params
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          sx={{
            color: 'primary.main',
          }}
          onClick={callbacks.handleSaveClick(id)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          className="textPrimary"
          onClick={callbacks.handleCancelClick(id)}
          color="inherit"
        />,
      ]
    }

    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={callbacks.handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={callbacks.handleDeleteClick(id)}
        color="inherit"
      />,
    ]
  }

export default actionsButtons
