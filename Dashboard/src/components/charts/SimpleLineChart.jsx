import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ChartCard from './ChartCard'

export default function SimpleLineChart({ title='Linha', subtitle, data, xKey, yKey, yLabel }){
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis label={{ value: yLabel || '', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" name={yLabel || yKey} dataKey={yKey} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
