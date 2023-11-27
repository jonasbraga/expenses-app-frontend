import { Typography } from '@mui/material'
import * as React from 'react'
import {  XAxis, YAxis, ResponsiveContainer, BarChart, CartesianGrid, Legend, Bar, DefaultTooltipContent } from 'recharts'

function createData(earnings: number, expenses: number) {
  return { earnings, expenses }
}

const data = [
  createData(211, 333),
]

export default function Chart() {
  return (
    <React.Fragment>
        <Typography variant='h4' align='center' > Dezembro, 2023 </Typography>
        <ResponsiveContainer>
            <BarChart width={730} height={250} margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <DefaultTooltipContent />
                <Legend />
                <Bar dataKey="earnings" name="Receitas" fill="#2ac41f" />
                <Bar dataKey="expenses" name="Despesas" fill="#c41f2f" />
            </BarChart>
        </ResponsiveContainer>
    </React.Fragment>
  )
}
