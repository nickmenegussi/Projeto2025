import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ChartCard from './ChartCard'

export default function SimpleBarChart({ title='Barras', subtitle, data, xKey, yKey, yLabel }){
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis label={{ value: yLabel || '', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar name={yLabel || yKey} dataKey={yKey} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
