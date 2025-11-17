export default function EmptyState({ title='Nada por aqui', subtitle='Comece criando um novo item.', action }){
  return (
    <div className="card p-8 text-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
