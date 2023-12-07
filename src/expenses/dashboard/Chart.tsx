import { Typography } from '@mui/material'
import * as React from 'react'
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  Bar,
  DefaultTooltipContent,
  Tooltip,
} from 'recharts'

type Props = {
  incomeExpensesTotal: { income: number; expenses: number }
}

export default function Chart({ incomeExpensesTotal }: Props) {
  const date = new Date()
  const month =
    date.toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() +
    date.toLocaleString('pt-BR', { month: 'long' }).slice(1)
  const year = date.getFullYear()
  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        {month}, {year}
      </Typography>
      <ResponsiveContainer>
        <BarChart
          width={730}
          height={250}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          data={[incomeExpensesTotal]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <DefaultTooltipContent />
          <Legend />
          <Bar dataKey="income" name="Receitas" fill="#2ac41f" />
          <Bar dataKey="expenses" name="Despesas" fill="#c41f2f" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
