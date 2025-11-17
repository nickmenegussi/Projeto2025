// import MockAdapter from 'axios-mock-adapter'
// import api from '../services/api'
// import dayjs from 'dayjs'

// const storageKey = 'mock-db-v1'

// const seed = {
//   users: [
//     { id: 'u1', name: 'Admin', email: 'admin@casa.com', role: 'admin', password: '123456' },
//     { id: 'u2', name: 'Maria', email: 'maria@casa.com', role: 'staff', password: '123456' }
//   ],
//   lectures: [
//     { id: 'l1', title: 'Boas-vindas', description: 'Abertura da casa', date: dayjs().add(1,'day').format('YYYY-MM-DD'), time: '19:00', speaker: 'Ana', capacity: 80, enrolled: 50 },
//     { id: 'l2', title: 'Tecnologia & Comunidade', description: 'Tecnologia a serviço social', date: dayjs().add(7,'day').format('YYYY-MM-DD'), time: '18:30', speaker: 'Carlos', capacity: 100, enrolled: 74 }
//   ],
//   library: [
//     { id: 'b1', title: 'Guia do Voluntário', type: 'pdf', url: '#', category: 'Interno', tags: ['boas práticas'] }
//   ],
//   events: [
//     { id: 'e1', title: 'Feira Solidária', start: dayjs().add(10,'day').toISOString(), end: dayjs().add(10,'day').add(3,'hour').toISOString() }
//   ],
//   volunteers: [
//     { id: 'v1', role: 'Recepção', description: 'Acolhida dos visitantes', slots: 4, skills: ['comunicação'], status: 'aberto' }
//   ],
//   otp: {} // email -> code
// }

// function loadDb(){
//   try{
//     const s = localStorage.getItem(storageKey)
//     return s ? JSON.parse(s) : seed
//   }catch(e){ return seed }
// }
// function saveDb(db){ localStorage.setItem(storageKey, JSON.stringify(db)) }

// export function setupMockApi(){
//   const mock = new MockAdapter(api, { delayResponse: 500 })
//   let db = loadDb()

//   const ok = (data) => [200, { data }]
//   const created = (data) => [201, { data }]
//   const noContent = () => [204]

// //   // AUTH
// //   mock.onPost('/auth/register').reply(({data}) => {
// //     const { name, email, password } = JSON.parse(data||'{}')
// //     if (db.users.find(u => u.email === email)) return [400, { message: 'E-mail já cadastrado.' }]
// //     const newU = { id: 'u'+Math.random().toString(36).slice(2,7), name, email, role: 'staff', password }
// //     db.users.push(newU); saveDb(db)
// //     return created({ user: { id: newU.id, name, email, role: newU.role } })
// //   })
// // mock.onPost('/auth/login').reply(() => {
// //   const u = db.users[0] || { id: 'u0', name: 'User', email: 'user@mock', role: 'staff' }
// //   // token fixo “infinito”
// //   return [200, { data: { user: { id: u.id, name: u.name, email: u.email, role: u.role }, token: 'infinite-token' } }]
// // })
// // mock.onPost('/auth/otp/send').reply(() => {
// //   return [200, { data: { message: 'OTP reenviado', code: '000000' } }]
// // })

// // mock.onPost('/auth/otp/verify').reply(() => {
// //   return [200, { data: { verified: true, token: 'infinite-token' } }]
// // })

// //   // helper for auth (very light)
// //   function requireAuth(config){
// //     const auth = config.headers.Authorization || ''
// //     if (!auth) return [401, { message: 'Não autorizado' }]
// //     return null
// //   }
// //   mock.onPost('/auth/login').reply(({data}) => {
// //   const { email, password } = JSON.parse(data||'{}')
// //   const u = db.users.find(x => x.email === email && x.password === password)
// //   if (!u) return [401, { message: 'Credenciais inválidas' }]

// //   // OTP infinito
// //   const code = String(Math.floor(100000 + Math.random()*900000))
// //   db.otp[email] = { code, expires: new Date('9999-12-31T23:59:59Z').getTime() }
// //   saveDb(db)

// //   return ok({
// //     user: { id: u.id, name: u.name, email: u.email, role: u.role },
// //     otpMessage: 'Código enviado ao e-mail (simulado).',
// //     token: 'infinite-token' // token mock que nunca expira
// //   })
// // })

// //   mock.onPost('/auth/otp/send').reply(({data}) => {
// //     const { email } = JSON.parse(data||'{}')
// //     if (!db.users.find(u => u.email === email)) return [404, { message: 'E-mail não encontrado' }]
// //     const code = String(Math.floor(100000 + Math.random()*900000))
// //     db.otp[email] = { code, expires: Date.now() + 888885*9999960*988888888 }
// //     saveDb(db)
// //     return ok({ message: 'OTP reenviado', code }) // code retornado apenas no mock
// //   })

// //   mock.onPost('/auth/otp/verify').reply(({data}) => {
// //   const { email, code } = JSON.parse(data||'{}')
// //   const entry = db.otp[email]
// //   if (!entry) return [400, { message: 'Solicite o OTP primeiro' }]
// //   // ignora expiração no mock
// //   if (entry.code !== code) return [401, { message: 'OTP inválido' }]
// //   return ok({ verified: true, token: 'infinite-token' })
// // })

//   // helper for auth (very light)
//   function requireAuth(config){
//     const auth = config.headers.Authorization || ''
//     if (!auth) return [401, { message: 'Não autorizado' }]
//     return null
//   }

//   // USERS CRUD
//   mock.onGet(/\/users.*/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const url = new URL(config.url, 'http://x')
//     const q = url.searchParams.get('search') || ''
//     const role = url.searchParams.get('role') || ''
//     let items = db.users.map(({password, ...u}) => u)
//     if (q) items = items.filter(u => (u.name+u.email).toLowerCase().includes(q.toLowerCase()))
//     if (role) items = items.filter(u => u.role === role)
//     return ok({ items })
//   })
//   mock.onPost('/users').reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const body = JSON.parse(config.data||'{}')
//     const nu = { id: 'u'+Math.random().toString(36).slice(2,8), ...body }
//     db.users.push({ ...nu, password: '123456' }); saveDb(db)
//     return created({ item: nu })
//   })
//   mock.onPut(/\/users\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     const body = JSON.parse(config.data||'{}')
//     const idx = db.users.findIndex(u => u.id===id)
//     if (idx<0) return [404]
//     db.users[idx] = { ...db.users[idx], ...body }; saveDb(db)
//     const { password, ...safe } = db.users[idx]
//     return ok({ item: safe })
//   })
//   mock.onDelete(/\/users\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     db.users = db.users.filter(u => u.id!==id); saveDb(db)
//     return noContent()
//   })

//   // LECTURES CRUD
//   mock.onGet(/\/lectures.*/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const url = new URL(config.url, 'http://x')
//     const search = url.searchParams.get('search') || ''
//     let items = db.lectures
//     if (search) items = items.filter(l => (l.title+l.description+l.speaker).toLowerCase().includes(search.toLowerCase()))
//     return ok({ items })
//   })
//   mock.onGet(/\/lectures\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     const item = db.lectures.find(l => l.id===id)
//     if (!item) return [404]
//     return ok({ item })
//   })
//   mock.onPost('/lectures').reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const body = JSON.parse(config.data||'{}')
//     const item = { id: 'l'+Math.random().toString(36).slice(2,8), enrolled: 0, ...body }
//     db.lectures.push(item); saveDb(db)
//     return created({ item })
//   })
//   mock.onPut(/\/lectures\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     const body = JSON.parse(config.data||'{}')
//     const idx = db.lectures.findIndex(l => l.id===id)
//     if (idx<0) return [404]
//     db.lectures[idx] = { ...db.lectures[idx], ...body }; saveDb(db)
//     return ok({ item: db.lectures[idx] })
//   })
//   mock.onDelete(/\/lectures\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     db.lectures = db.lectures.filter(l => l.id!==id); saveDb(db)
//     return noContent()
//   })

//   // LIBRARY CRUD
//   mock.onGet(/\/library.*/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const url = new URL(config.url,'http://x')
//     const search = url.searchParams.get('search') || ''
//     let items = db.library
//     if (search) items = items.filter(b => (b.title+b.category+(b.tags||[]).join(',')).toLowerCase().includes(search.toLowerCase()))
//     return ok({ items })
//   })
//   mock.onPost('/library').reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const body = JSON.parse(config.data||'{}')
//     const item = { id: 'b'+Math.random().toString(36).slice(2,8), ...body }
//     db.library.push(item); saveDb(db)
//     return created({ item })
//   })
//   mock.onPut(/\/library\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     const body = JSON.parse(config.data||'{}')
//     const idx = db.library.findIndex(b => b.id===id)
//     if (idx<0) return [404]
//     db.library[idx] = { ...db.library[idx], ...body }; saveDb(db)
//     return ok({ item: db.library[idx] })
//   })
//   mock.onDelete(/\/library\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     db.library = db.library.filter(b => b.id!==id); saveDb(db)
//     return noContent()
//   })

//   // EVENTS CRUD
//   mock.onGet(/\/events.*/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     return ok({ items: db.events })
//   })
//   mock.onPost('/events').reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const body = JSON.parse(config.data||'{}')
//     const item = { id: 'e'+Math.random().toString(36).slice(2,8), ...body }
//     db.events.push(item); saveDb(db)
//     return created({ item })
//   })
//   mock.onPut(/\/events\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     const body = JSON.parse(config.data||'{}')
//     const idx = db.events.findIndex(e => e.id===id)
//     if (idx<0) return [404]
//     db.events[idx] = { ...db.events[idx], ...body }; saveDb(db)
//     return ok({ item: db.events[idx] })
//   })
//   mock.onDelete(/\/events\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     db.events = db.events.filter(e => e.id!==id); saveDb(db)
//     return noContent()
//   })

//   // VOLUNTEERS CRUD
//   mock.onGet(/\/volunteers.*/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     return ok({ items: db.volunteers })
//   })
//   mock.onPost('/volunteers').reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const body = JSON.parse(config.data||'{}')
//     const item = { id: 'v'+Math.random().toString(36).slice(2,8), status: 'aberto', ...body }
//     db.volunteers.push(item); saveDb(db)
//     return created({ item })
//   })
//   mock.onPut(/\/volunteers\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     const body = JSON.parse(config.data||'{}')
//     const idx = db.volunteers.findIndex(v => v.id===id)
//     if (idx<0) return [404]
//     db.volunteers[idx] = { ...db.volunteers[idx], ...body }; saveDb(db)
//     return ok({ item: db.volunteers[idx] })
//   })
//   mock.onDelete(/\/volunteers\/[^/]+/).reply((config) => {
//     const err = requireAuth(config); if (err) return err
//     const id = config.url.split('/').pop()
//     db.volunteers = db.volunteers.filter(v => v.id!==id); saveDb(db)
//     return noContent()
//   })
// }
