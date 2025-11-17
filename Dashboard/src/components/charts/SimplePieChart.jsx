import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts'
import ChartCard from './ChartCard'

export default function SimplePieChart({ title='Pizza', subtitle, data, nameKey, valueKey }){
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie data={data} nameKey={nameKey} dataKey={valueKey} outerRadius={100} label />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
