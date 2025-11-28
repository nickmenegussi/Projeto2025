export default function KpiCard({ title, value, subtitle }){
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-2">{subtitle}</div>}
    </div>
  )
}
