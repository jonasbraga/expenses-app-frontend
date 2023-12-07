export type MoneyData = {
  id: string
  descricao: string
  valor: number
  data: Date
  tipo: string
  pago: boolean
  metodoPagamento: string
}

export type ResponseMovimentacoes = {
  id: string
  descricao: string
  valor: number
  data: string
  tipo: string
  pago: boolean
  metodoPagamento: string
  idMetodoPagamento: string
  idUsuario: string
}
