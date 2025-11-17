import { useState } from 'react'
import { useAuth } from '../../modules/auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Register(){
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{ await register(name, email, password); alert('Conta criada! Faça login.'); navigate('/auth/login') }catch(e){ alert(e?.response?.data?.message || 'Erro') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="card p-6 w-full max-w-md space-y-4">
        <div className="text-2xl font-bold">Cadastro</div>
        <input className="input" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn w-full" type="submit">Criar conta</button>
        <div className="text-sm text-center">Já tem conta? <Link to="/auth/login" className="link">Entrar</Link></div>
      </form>
    </div>
  )
}
