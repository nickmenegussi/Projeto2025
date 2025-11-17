import React, { useEffect, useMemo, useState } from "react";
import {
  Search, Plus, Bell, BookOpen, Users, CalendarDays, Star,
  BarChart3, PieChart as PieIcon, PanelsTopLeft, LayoutGrid, Settings, Filter,
  Eye, EyeOff, ChevronLeft, ChevronRight
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip,
  LineChart, Line, CartesianGrid, Legend, AreaChart, Area, LabelList
} from "recharts";

/**
 * CEODashboard (Mock) — PRO (responsivo sem scroll lateral + donuts com números)
 * Dependências: recharts, lucide-react
 *   npm i recharts lucide-react
 */

const LS_KEY = "ceo-dashboard-mock-v1";

// =============== Seed (COLE O SEU COMPLETO AQUI) ===============
const seed = {
  User: [
    { idUser: 1, email: "admin@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=11", status_permission: "SuperAdmin", date_at_create: "2025-08-10 09:30" },
    { idUser: 2, email: "ana@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=12", status_permission: "Admin", date_at_create: "2025-08-15 14:10" },
    { idUser: 3, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 4, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 5, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 6, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 7, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 8, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 9, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 10, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
    { idUser: 11, email: "duda@ceo.org", password: "hashed:***", image_profile: "https://i.pravatar.cc/150?img=13", status_permission: "User", date_at_create: "2025-08-18 16:50" },
  ],
  Book: [
    { idLibrary: 1, nameBook: "O Evangelho Segundo o Espiritismo", authorBook: "Allan Kardec", image: "https://picsum.photos/seed/book1/200/300", overviewBook: "Obra básica com princípios morais do cristianismo sob a ótica espírita.", curiosityBook: "Publicado em 1864.", tagsBook: "Obras Básicas", bookCategory: "emprestimo", bookQuantity: 6, date_aquisition: "2025-08-05", status_Available: "disponível" },
    { idLibrary: 2, nameBook: "O Livro dos Espíritos", authorBook: "Allan Kardec", image: "https://picsum.photos/seed/book2/200/300", overviewBook: "Fundamentos filosóficos da Doutrina Espírita.", curiosityBook: "Publicado em 1857.", tagsBook: "Obras Básicas", bookCategory: "reserva", bookQuantity: 4, date_aquisition: "2025-08-01", status_Available: "reservado" },
    { idLibrary: 3, nameBook: "Nosso Lar", authorBook: "André Luiz (Chico Xavier)", image: "https://picsum.photos/seed/book3/200/300", overviewBook: "Relato do espírito André Luiz sobre a vida no plano espiritual.", curiosityBook: "Inspirou filme em 2010.", tagsBook: "Obras Complementares", bookCategory: "emprestimo", bookQuantity: 2, date_aquisition: "2025-07-28", status_Available: "emprestado" },
    { idLibrary: 4, nameBook: "Livro dos Médiuns", authorBook: "Allan Kardec", image: "https://picsum.photos/seed/book4/200/300", overviewBook: "Guia prático para a mediunidade.", curiosityBook: "Complementa O Livro dos Espíritos.", tagsBook: "Obras Básicas", bookCategory: "emprestimo", bookQuantity: 0, date_aquisition: "2025-06-12", status_Available: "indisponível" },
  ],
  Loans: [
    { idLoans: 1, User_idUser: 3, Book_idLibrary: 3, quantity: 1, returnDate: "2025-09-02", date_at_create: "2025-08-20" },
    { idLoans: 2, User_idUser: 2, Book_idLibrary: 1, quantity: 1, returnDate: "2025-09-05", date_at_create: "2025-08-21" },
    { idLoans: 3, User_idUser: 3, Book_idLibrary: 1, quantity: 1, returnDate: "2025-09-10", date_at_create: "2025-08-22" },
  ],
  Cart: [
    { idCart: 1, User_idUser: 3, Book_idLibrary: 2, action: "reservar", quantity: 1, added_at: "2025-08-19" },
    { idCart: 2, User_idUser: 2, Book_idLibrary: 1, action: "emprestar", quantity: 1, added_at: "2025-08-21" },
  ],
  Reserves: [
    { idReserved: 1, reserveDate: "2025-08-19", Cart_idCart: 1 },
  ],
  ReviewSociety: [
    { idReviewSociety: 1, descriptionReview: "Ótimo projeto! Contribuiu bastante para a comunidade.", ratingReview: 5, userId: 1, create_at: "2025-08-19" },
    { idReviewSociety: 2, descriptionReview: "Gostei da iniciativa, mas pode melhorar em alguns pontos.", ratingReview: 4, userId: 1, create_at: "2025-08-20" },
    { idReviewSociety: 3, descriptionReview: "Faltou organização nas atividades propostas.", ratingReview: 3, userId: 2, create_at: "2025-08-21" },
  ],
  VolunteerWork: [
    { idVolunteerWork: 1, nameUser: "Ana", nameVolunteerWork: "Mutirão de Doações", address: "Rua da Luz, 123", dateVolunteerWork: "2025-08-24 14:00", work_description: "Triagem de roupas", date_at_create: "2025-08-18" },
    { idVolunteerWork: 2, nameUser: "Duda", nameVolunteerWork: "Biblioteca Viva", address: "Av. Esperança, 45", dateVolunteerWork: "2025-08-30 10:00", work_description: "Leitura para crianças", date_at_create: "2025-08-20" },
  ],
  Notifications: [
    { idNotifications: 1, message: "Devolução do livro 'Nosso Lar' vence em 7 dias.", isRead: false, created_at: "2025-08-23", User_idUser: 3 },
    { idNotifications: 2, message: "Nova palestra adicionada.", isRead: true, created_at: "2025-08-22", User_idUser: 2 },
  ],
  Lecture: [
    { idLecture: 1, nameLecture: "Palestra: Ética e Caridade", dateLecture: "2025-08-28", timeLecture: "19:00", description: "Reflexões práticas no cotidiano.", link_url: "https://meet.example/etica", video_url: "https://video.example/etica", created_at: "2025-08-18" },
  ],
  CalendarEvents: [
    { idCalendarEvents: 1, title: "Reunião de Voluntários", link: "https://meet.example/voluntarios", description: "Alinhamento de ações.", start: "2025-08-26 19:30", end: "2025-08-26 20:30", attachment: "", dateEvent: "2025-08-26", User_idUser: 1 },
  ],
  Facilitadores: [
    { idFacilitadores: 1, User_idUser: 2, description: "Facilitadora do ESDE", apelido: "Ana", espiritaSinceTime: 5, memberSinceWhen: "2021-03-10", category: "ESDE" },
    { idFacilitadores: 2, User_idUser: 3, description: "Apoio à Mediunidade", apelido: "Duda", espiritaSinceTime: 3, memberSinceWhen: "2022-07-01", category: "MEDIUNIDADE" },
  ],
  Topic: [
    { idTopic: 1, title: "Evangelização Infantil", description: "Práticas e materiais.", image: "https://picsum.photos/seed/topic1/400/200", User_idUser: 2, Category_id: 1, created_at: "2025-08-15" },
  ],
  Category: [
    { idCategory: 1, nameCategory: "Educação", User_idUser: 2, create_at: "2025-08-10" },
    { idCategory: 2, nameCategory: "Mediunidade", User_idUser: 3, create_at: "2025-08-12" },
  ],
  Post: [
    { idPost: 1, content: "Novo ciclo de estudos aberto!", title: "CIEDE 2025", image: "https://picsum.photos/seed/post1/600/300", User_idUser: 2, Topic_idTopic: 1, created_at: "2025-08-19", updated_at: "2025-08-19" },
  ],
  Comments: [
    { idComments: 1, Post_idPost: 1, User_idUser: 3, message: "Quero participar!", createdDate: "2025-08-20" },
  ],
  Likes: [
    { idLikes: 1, Post_idPost: 1, User_idUser: 1, created_at: "2025-08-20" },
    { idLikes: 2, Post_idPost: 1, User_idUser: 3, created_at: "2025-08-20" },
  ],
  OTP: [
    { idOtp: 1, email: "duda@ceo.org", otp: "123456", createdAt: "2025-08-23 12:00", expiresAt: "2025-08-23 12:10" }
  ],
};

// =============== Helpers & Store ===============
const k = (arr) => Array.isArray(arr) ? arr.length : 0;
function loadState(){ const raw = localStorage.getItem(LS_KEY); if(!raw) return seed; try { return JSON.parse(raw); } catch { return seed; } }
function saveState(data){ localStorage.setItem(LS_KEY, JSON.stringify(data)); }
function useStore(){ const [db, setDb] = useState(loadState()); useEffect(()=>{ saveState(db); }, [db]); return [db, setDb]; }

const dateOnly = (s) => (s || "").slice(0,10);
const groupCount = (arr, keyFn) => { const m = new Map(); arr.forEach(x=>{ const k=keyFn(x); m.set(k,(m.get(k)||0)+1); }); return Array.from(m, ([name, value])=>({ name, value })); };
const sumBy = (arr, keyFn, qtyFn=(x)=>x.quantity||1) => { const m=new Map(); arr.forEach(x=>{ const key=keyFn(x); m.set(key,(m.get(key)||0)+qtyFn(x)); }); return Array.from(m, ([name,total])=>({ name,total })); };
const orderBy = (arr, key, dir='asc') => [...arr].sort((a,b)=> (a[key] > b[key] ? 1 : -1) * (dir==='asc'?1:-1));

// ======= Paleta de cores para gráficos (respeita tema via CSS vars)
const COLORS = ['var(--c1)','var(--c2)','var(--c3)','var(--c4)','var(--c5)','var(--c6)','var(--c7)','var(--c8)'];

// =============== Global Styles ===============
const GlobalStyles = () => (
  <style>{`
    :root{
       --card:#ffffff; --muted:#64748b; --border:#e2e8f0; --ink:#0f172a;
      --radius:16px; --pad:16px; --gap:16px; --shadow:0 6px 22px rgba(15,23,42,0.06);
      --container-max: 1600px;
      --chart-h:240px;

      /* === Cores dos gráficos (Light) === */
      --grid:#e5e7eb;
      --axis:#475569;
      --line:#0ea5e9;
      --area: rgba(14,165,233,.15);

      --c1:#6366f1; /* indigo */
      --c2:#22c55e; /* green */
      --c3:#f59e0b; /* amber */
      --c4:#ef4444; /* red   */
      --c5:#0ea5e9; /* sky   */
      --c6:#a855f7; /* violet*/
      --c7:#14b8a6; /* teal  */
      --c8:#3b82f6; /* blue  */
      --kpi-spot-bg: #ffffff;     /* branco no dark */
    --kpi-spot-border: #e5e7eb; /* pode manter a mesma */
    }
 
    /* Somente variáveis de GRÁFICOS para dark mode */
    

    @media (min-width:1800px){ :root{ --container-max: 1760px; } }

    *{box-sizing:border-box}
    html,body,#root{height:100%}
    html,body{overflow-x:hidden}
    body{margin:0; background:var(--bg); color:var(--ink); font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial}
    img{max-width:100%; height:auto; display:block}

    .container{
      max-width: min(var(--container-max), 96vw);
      margin-inline:auto;
      padding-inline: clamp(8px, 1vw, 16px);
      display:grid; gap:24px;
    }

    header.app-header{display:flex; align-items:center; justify-content:space-between; gap:12px; min-width:0}
    header .title{min-width:0}
    header .title h1{margin:0; font-size:28px; font-weight:800; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
    header .title p{margin:2px 0 0; color:var(--muted); font-size:14px}

    .grid{display:grid; gap:var(--gap); min-width:0}
    .grid-1{display:grid; grid-template-columns:1fr; gap:var(--gap)}
    .grid-2{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:var(--gap)}
    .grid-3{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:var(--gap)}
    .grid-5{display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:var(--gap)}
    @media (max-width:1200px){ .grid-5{grid-template-columns:repeat(4,minmax(0,1fr))} }
    @media (max-width:1024px){ .grid-5{grid-template-columns:repeat(3,minmax(0,1fr))} }
    @media (max-width:900px){ .grid-3{grid-template-columns:repeat(2,minmax(0,1fr))} }
    @media (max-width:768px){
      .grid-5,.grid-3,.grid-2{grid-template-columns:1fr}
      :root{ --chart-h:220px; }
    }

    

    @media (prefers-color-scheme: dark){
      thead > tr {
        background-color:  #0b1422; /* fundo escuro */
        color: var(--ink);         /* texto claro, herdado do tema */
        
      }
    }
  :is(.dark *) .card { border-color: var(--card) !important; }
  :is(.dark *) tr:nth-child(even) {
    background: rgb(31 41 55) !important;
}

    @media (max-width:420px){ :root{ --chart-h:200px; } }

    .card{background:var(--card); border:1px solid var(--border);  border-radius:var(--radius); box-shadow:var(--shadow); min-width:0}
    .card-body{padding: clamp(12px, 1.1vw, var(--pad)); min-width:0}
    .btn{padding: clamp(8px, .9vw, 10px) clamp(10px, 1.2vw, 14px); border-radius:12px; border:1px solid var(--border);  cursor:pointer; white-space:nowrap}
    .btn-ghost{padding: clamp(6px, .7vw, 8px) clamp(8px, 1vw, 10px); border-radius:10px; border:1px solid transparent; background:transparent; cursor:pointer}
    .input, select, textarea{padding:10px 12px; border-radius:12px; border:1px solid var(--border); width:100%; background:#fbfbfc; min-width:0}
    .badge{display:inline-block; padding:4px 8px; border-radius:999px; background:#f1f5f9; border:1px solid var(--border); font-size:12px}

    .topnav{position:relative}
    .topnav-track{
      display:flex;
      flex-wrap:wrap;
      gap:8px 10px;
      padding:8px;
      overflow:visible;
    }
    .topnav-track > .btn{
      flex:0 1 auto;
    }
@media (prefers-color-scheme: dark){
  /* grade */
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line{
    stroke:#334155 !important;
  }
 --kpi-spot-bg: black;
  --kpi-spot-border: black;
  /* eixos (ticks) */
  .recharts-cartesian-axis-tick tspan{
    fill:var(--muted) !important;
  }

  /* legenda */
  .recharts-legend-item-text{
    color:var(--muted) !important;
  }

  /* tooltip já fica bom; se quiser, nada a fazer aqui */
}
    .table-wrap{overflow:auto; border:1px solid var(--border); border-radius:12px}
    table{width:100%; border-collapse:collapse; font-size:14px; table-layout:auto}
    thead th{ position:sticky; top:0; z-index:1; background:#f8fafc; font-weight:700 }
    th,td{ padding:12px; border-top:1px solid #edf2f7; text-align:left; vertical-align:top; word-break:break-word }
    tr:nth-child(even){ background:#fcfcfd }

    .stack-list{display:grid; gap:12px}
    .stack-card{background:#fff; border:1px solid var(--border); border-radius:12px}
    .stack-head{display:flex; align-items:center; justify-content:space-between; padding:12px; min-width:0}
    .stack-head strong{overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
    .stack-item{display:grid; grid-template-columns:160px 1fr; gap:12px; padding:10px 12px; border-top:1px solid var(--border)}
    .stack-item:first-child{border-top:none}
    .stack-label{font-size:12px; color:var(--muted)}
    @media (max-width:520px){ .stack-item{grid-template-columns:1fr} .stack-label{margin-bottom:4px} }

    .overlay{position:fixed; inset:0; background:rgba(0,0,0,.35); display:flex; align-items:center; justify-content:center; padding:16px}
    .modal{width:100%; max-width:780px; background:#fff; border-radius:16px; border:1px solid var(--border)}
    .modal-head{padding:16px; border-bottom:1px solid #eef2f7; font-weight:800}
    .modal-body{padding:16px; display:grid; gap:12px}
    .modal-foot{padding:16px; border-top:1px solid #eef2f7; display:flex; justify-content:flex-end; gap:8px}

    .row{display:flex; align-items:center; gap:12px; min-width:0}
    .between{display:flex; align-items:center; justify-content:space-between; min-width:0}
    .h6{font-size:18px; font-weight:800}

    .chart-box{height:var(--chart-h)}
  `}</style>
);
// =============== Micro UI ===============
const Card = ({children, className=""}) => <section className={`card ${className}`}>{children}</section>;
const CardContent = ({children, className=""}) => <div className={`card-body ${className}`}>{children}</div>;
const Button = ({children, onClick, variant="solid", className=""}) => (
  <button onClick={onClick} className={`${variant==="ghost"?"btn-ghost":"btn"} ${className}`}>{children}</button>
);
const Input = (props)=> <input {...props} className={`input ${props.className||""}`}/>;
const Badge = ({children, className=""})=> <span className={`badge ${className}`}>{children}</span>;

// =============== Hook: breakpoint ===============
function useMedia(query){
  const [matches, setMatches] = useState(()=> window.matchMedia(query).matches);
  useEffect(()=>{
    const mq = window.matchMedia(query);
    const handler = (e)=> setMatches(e.matches);
    mq.addEventListener?.("change", handler) || mq.addListener(handler);
    return ()=> mq.removeEventListener?.("change", handler) || mq.removeListener(handler);
  }, [query]);
  return matches;
}

// =============== DataTable (desktop / mobile) ===============
function DataTable({ columns, data, pageSize=5 }){
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(()=> Object.fromEntries(columns.map(c=>[c.key, true])));
  const [q, setQ] = useState("");
  const isMobile = useMedia('(max-width: 768px)');

  const filtered = useMemo(()=> data.filter(row=> {
    if(!q) return true; const txt = JSON.stringify(row).toLowerCase(); return txt.includes(q.toLowerCase());
  }), [data, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = useMemo(()=> filtered.slice((page-1)*pageSize, page*pageSize), [filtered, page, pageSize]);
  useEffect(()=>{ if(page>pages) setPage(pages); }, [pages, page]);

  return (
    <Card>
      <CardContent>
        <div className="between" style={{marginBottom:12}}>
          <div style={{position:"relative", flex:1, marginRight:12}}>
            <Search size={16} style={{position:"absolute", left:10, top:10, opacity:.6}}/>
            <Input style={{paddingLeft:32}} placeholder="Buscar em todas as colunas..." value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <ColumnToggler columns={columns} visible={visible} setVisible={setVisible}/>
        </div>

        {isMobile ? (
          <div className="stack-list">
            {rows.map((row, idx)=> (
              <article key={row.id || row.idUser || row.idLibrary || row.idPost || idx} className="stack-card">
                <div className="stack-head">
                  <strong>{row.nameBook || row.email || row.title || row.nameLecture || row.nameVolunteerWork || row.apelido || 'Registro'}</strong>
                </div>
                {columns.filter(c=>visible[c.key]).map((c,i)=>{
                  const value = c.render ? c.render(row[c.key], row) : (row[c.key] ?? '—');
                  return (
                    <div key={c.key+i} className="stack-item">
                      <div className="stack-label">{c.header}</div>
                      <div>{value}</div>
                    </div>
                  );
                })}
              </article>
            ))}
            {!rows.length && <div className="stack-card"><div className="stack-head">Nenhum registro.</div></div>}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.filter(c=>visible[c.key]).map(c=> (
                    <th key={c.key}>{c.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx)=> (
                  <tr key={row.id || row.idUser || row.idLibrary || row.idPost || idx}>
                    {columns.filter(c=>visible[c.key]).map(c=> (
                      <td key={c.key}>{c.render ? c.render(row[c.key], row) : String(row[c.key] ?? "—")}</td>
                    ))}
                  </tr>
                ))}
                {!rows.length && (
                  <tr><td colSpan={columns.filter(c=>visible[c.key]).length} style={{padding:24, textAlign:"center", color:"#6b7280"}}>Nenhum registro.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="between" style={{marginTop:12}}>
          <div className="muted">Total: {filtered.length}</div>
          <div className="row">
            <Button variant="ghost" onClick={()=> setPage(p=> Math.max(1, p-1))}><ChevronLeft size={16}/></Button>
            <Badge>Página {page} / {pages}</Badge>
            <Button variant="ghost" onClick={()=> setPage(p=> Math.min(pages, p+1))}><ChevronRight size={16}/></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ColumnToggler({ columns, visible, setVisible }){
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:"relative"}}>
      <Button variant="ghost" onClick={()=>setOpen(o=>!o)} title="Mostrar/ocultar colunas"><Filter size={16}/></Button>
      {open && (
        <div style={{position:"absolute", right:0, top:40, background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:12, boxShadow:"var(--shadow)", width:240}}>
          <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Colunas</div>
          <div className="grid">
            {columns.map(c=> (
              <label key={c.key} className="between" style={{fontSize:13}}>
                <span>{c.header}</span>
                <button onClick={()=> setVisible(v=> ({...v, [c.key]: !v[c.key]}))} className="btn-ghost" style={{border:"1px solid #e5e7eb"}}>
                  {visible[c.key] ? <Eye size={14}/> : <EyeOff size={14}/>}
                </button>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============== Seções & KPIs ===============
function Section({ title, right, children }){
  return (
    <section className="grid" aria-label={title}>
      <div className="between">
        <h3 className="h6" style={{margin:0}}>{title}</h3>
        {right}
      </div>
      <div className="grid">{children}</div>
    </section>
  );
}

function KPI({ icon:Icon, label, value, hint }){
  return (
    <Card>
      <CardContent>
        <div className="row">
          <div
            style={{
              padding: 10,
              borderRadius: 12,
              background: "var(--kpi-spot-bg)",
              border: "1px solid var(--kpi-spot-border)",
              display: "inline-flex",
            }}
          >
            <Icon size={18}/>
          </div>
          <div>
            <div  style={{fontSize:12}}>{label}</div>
            <div style={{fontSize:24, fontWeight:800, lineHeight:1}}>{value}</div>
            {hint && <div className="muted" style={{fontSize:12, marginTop:4}}>{hint}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============== Dialogs ===============
function Dialog({ open, title, onClose, children, footer }){ if(!open) return null; return (
  <div className="overlay" onClick={onClose}>
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-head">{title}</div>
      <div className="modal-body">{children}</div>
      <div className="modal-foot">
        {footer}
        <Button variant="ghost" onClick={onClose}>Fechar</Button>
      </div>
    </div>
  </div>
);} 

function UserDialog({ open, initial, onClose, onSave }){
  const [form, setForm] = useState(initial || { email:"", status_permission:"User", image_profile:"" });
  useEffect(()=>{ setForm(initial || { email:"", status_permission:"User", image_profile:"" }); }, [initial]);
  return (
    <Dialog open={open} title={initial?"Editar usuário":"Novo usuário"} onClose={onClose}
      footer={<Button onClick={()=>onSave(form)}>{initial?"Salvar":"Criar"}</Button>}>
      <Input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
      <select value={form.status_permission} onChange={(e)=>setForm({...form, status_permission:e.target.value})} className="input">
        <option>SuperAdmin</option><option>Admin</option><option>User</option>
      </select>
      <Input placeholder="URL da foto (opcional)" value={form.image_profile||""} onChange={e=>setForm({...form, image_profile:e.target.value})}/>
    </Dialog>
  );
}

function BookDialog({ open, initial, onClose, onSave }){
  const empty = { nameBook:"", authorBook:"", tagsBook:"Obras Básicas", bookCategory:"emprestimo", bookQuantity:1, status_Available:"disponível", image:"", overviewBook:"", curiosityBook:"" };
  const [form, setForm] = useState(initial || empty);
  useEffect(()=>{ setForm(initial || empty); }, [initial]);
  return (
    <Dialog open={open} title={initial?"Editar livro":"Novo livro"} onClose={onClose}
      footer={<Button onClick={()=>onSave(form)}>{initial?"Salvar":"Criar"}</Button>}>
      <Input placeholder="Título" value={form.nameBook} onChange={e=>setForm({...form, nameBook:e.target.value})}/>
      <Input placeholder="Autor" value={form.authorBook} onChange={e=>setForm({...form, authorBook:e.target.value})}/>
      <select value={form.tagsBook} onChange={(e)=>setForm({...form, tagsBook:e.target.value})} className="input">
        <option>Obras Básicas</option><option>Obras Complementares</option>
      </select>
      <select value={form.bookCategory} onChange={(e)=>setForm({...form, bookCategory:e.target.value})} className="input">
        <option>reserva</option><option>emprestimo</option>
      </select>
      <Input type="number" placeholder="Quantidade" value={form.bookQuantity} onChange={e=>setForm({...form, bookQuantity:Number(e.target.value)})}/>
      <select value={form.status_Available} onChange={(e)=>setForm({...form, status_Available:e.target.value})} className="input">
        <option>disponível</option><option>reservado</option><option>emprestado</option><option>indisponível</option>
      </select>
      <Input placeholder="Capa (URL)" value={form.image||""} onChange={e=>setForm({...form, image:e.target.value})}/>
      <Input placeholder="Visão geral" value={form.overviewBook} onChange={e=>setForm({...form, overviewBook:e.target.value})}/>
      <Input placeholder="Curiosidade" value={form.curiosityBook} onChange={e=>setForm({...form, curiosityBook:e.target.value})}/>
    </Dialog>
  );
}

// =============== Donut (labels com valor e %) ===============
const donutLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, value } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = (percent * 100).toFixed(0);

  return (
    <text
      x={x}
      y={y}
      /* use a cor corrente do tema */
      fill="currentColor"
      /* e define a cor via CSS var do app */
      style={{ color: "var(--ink)" }}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {value}{pct > 0 ? ` (${pct}%)` : ""}
    </text>
  );
};

function SimpleDonut({ title, data, outer=90, inner=60 }){
  const cleaned = (data||[]).filter(d=> (d.value ?? 0) > 0);
  return (
    <Card><CardContent>
      <div className="h6" style={{marginBottom:8}}>{title}</div>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={cleaned}
              dataKey="value"
              nameKey="name"
              innerRadius={inner}
              outerRadius={outer}
              paddingAngle={4}
              label={donutLabel}
              labelLine={false}
            >
              <LabelList dataKey="value" position="outside" offset={6} fontSize={11}/>
              {cleaned.map((_,i)=><Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <RTooltip/>
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent></Card>
  );
}

// =============== CHARTS ===============
function BooksCharts({ books=[], loans=[] }){
  const status = useMemo(()=> groupCount(books, b=> b.status_Available || "—"), [books]);
  const tags = useMemo(()=> groupCount(books, b=> b.tagsBook || "—"), [books]);
  const cat  = useMemo(()=> groupCount(books, b=> b.bookCategory || "—"), [books]);
  const barData = useMemo(()=> [...tags, ...cat.map(c=> ({...c, name:`${c.name} (cat)`}))], [tags, cat]);
  const loansPerDay = useMemo(()=> groupCount(loans, l=> dateOnly(l.date_at_create)).map(x=>({date:x.name, total:x.value})).sort((a,b)=> a.date.localeCompare(b.date)), [loans]);

  return (
    <div className="grid-3">
      <SimpleDonut title="Status dos Livros" data={status}/>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Tags x Categoria</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/>
              <XAxis dataKey="name" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="value" radius={[6,6,0,0]}>
                {barData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Empréstimos por dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loansPerDay} margin={{top:8,right:8,left:0,bottom:8}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/>
              <XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Line dataKey="total" type="monotone" dot={{r:3}} stroke="var(--line)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function UsersCharts({ users=[] }){
  const byPerm = useMemo(()=> groupCount(users, u=> u.status_permission || "—"), [users]);
  const signups = useMemo(()=> groupCount(users, u=> dateOnly(u.date_at_create)), [users]);
  const signupsData = useMemo(()=> orderBy(signups.map(x=>({date:x.name, total:x.value})), 'date'), [signups]);

  return (
    <div className="grid-2">
      <SimpleDonut title="Permissões" data={byPerm}/>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Cadastros por Dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={signupsData}> 
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Area dataKey="total" type="monotone" stroke="var(--line)" fill="var(--area)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function LoansCharts({ loans=[], users=[], books=[] }){
  const byUser = useMemo(()=> sumBy(loans, l=> users.find(u=>u.idUser===l.User_idUser)?.email || `user#${l.User_idUser}`), [loans, users]);
  const byBook = useMemo(()=> sumBy(loans, l=> books.find(b=>b.idLibrary===l.Book_idLibrary)?.nameBook || `book#${l.Book_idLibrary}`), [loans, books]);
  const byDay  = useMemo(()=> groupCount(loans, l=> dateOnly(l.date_at_create)).map(x=>({date:x.name, total:x.value})).sort((a,b)=> a.date.localeCompare(b.date)), [loans]);

  const byUserData = useMemo(()=> orderBy(byUser, 'total', 'desc'), [byUser]);
  const byBookData = useMemo(()=> orderBy(byBook, 'total', 'desc'), [byBook]);

  return (
    <div className="grid-3">
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Empréstimos por Usuário</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byUserData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="name" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="total">
                {byUserData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Empréstimos por Livro</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byBookData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="name" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="total">
                {byBookData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Empréstimos por Dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Line dataKey="total" type="monotone" stroke="var(--line)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function CartReserveCharts({ cart=[], reserves=[] }){
  const actions = useMemo(()=> groupCount(cart, c=> c.action), [cart]);
  const reservesByDay = useMemo(()=> groupCount(reserves, r=> dateOnly(r.reserveDate)).map(x=>({date:x.name, total:x.value})), [reserves]);
  const reservesData = useMemo(()=> orderBy(reservesByDay,'date'), [reservesByDay]);

  return (
    <div className="grid-2">
      <SimpleDonut title="Carrinho: Ações" data={actions}/>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Reservas por Dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reservesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="total">
                {reservesData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function ReviewsCharts({ reviews=[] }){
  const dailyAvg = useMemo(()=> {
    const map={}; reviews.forEach(r=>{ const d=dateOnly(r.create_at); (map[d]??=[]).push(r.ratingReview); });
    return Object.entries(map).map(([date,arr])=>({date, avg:arr.reduce((a,b)=>a+b,0)/arr.length})).sort((a,b)=> a.date.localeCompare(b.date));
  }, [reviews]);
  const dist = useMemo(()=> { const b={1:0,2:0,3:0,4:0,5:0}; reviews.forEach(r=> b[r.ratingReview]=(b[r.ratingReview]||0)+1); return Object.entries(b).map(([rating,value])=>({rating, value})); }, [reviews]);

  return (
    <div className="grid-2">
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Média diária</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyAvg}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis domain={[0,5]} stroke="var(--axis)"/><RTooltip/>
              <Line dataKey="avg" type="monotone" stroke="var(--line)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Distribuição de notas</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dist}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="rating" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="value">
                {dist.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function NotificationsCharts({ notifications=[] }){
  const status = useMemo(()=> [
    { name:"Não lidas", value: notifications.filter(n=>!n.isRead).length },
    { name:"Lidas", value: notifications.filter(n=>n.isRead).length },
  ], [notifications]);
  const byDay = useMemo(()=> groupCount(notifications, n=> dateOnly(n.created_at)).map(x=>({date:x.name, total:x.value})), [notifications]);
  const byDayData = useMemo(()=> orderBy(byDay,'date'), [byDay]);

  return (
    <div className="grid-2">
      <SimpleDonut title="Status" data={status}/>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Notificações por Dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="total">
                {byDayData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function FacilitadoresCharts({ facilitadores=[] }){
  const byCat = useMemo(()=> groupCount(facilitadores, f=> f.category||"—"), [facilitadores]);
  const histYears = useMemo(()=> groupCount(facilitadores, f=> String(f.espiritaSinceTime??0)).map(x=>({years:x.name, q:x.value})), [facilitadores]);
  return (
    <div className="grid-2">
      <SimpleDonut title="Por Categoria" data={byCat}/>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Tempo de Vivência (anos)</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={histYears}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="years" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Bar dataKey="q">
                {histYears.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function EventsCharts({ lectures=[], events=[] }){
  const lecByDay = useMemo(()=> groupCount(lectures, l=> dateOnly(l.dateLecture)).map(x=>({date:x.name, total:x.value})), [lectures]);
  const evtByDay = useMemo(()=> groupCount(events, e=> dateOnly(e.dateEvent)).map(x=>({date:x.name, total:x.value})), [events]);
  const lecData = useMemo(()=> orderBy(lecByDay,'date'), [lecByDay]);
  const evtData = useMemo(()=> orderBy(evtByDay,'date'), [evtByDay]);

  return (
    <div className="grid-2">
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Palestras por Dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lecData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Line dataKey="total" type="monotone" stroke="var(--line)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
      <Card><CardContent>
        <div className="h6" style={{marginBottom:8}}>Eventos por Dia</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="date" stroke="var(--axis)"/><YAxis stroke="var(--axis)"/><RTooltip/>
              <Area dataKey="total" type="monotone" stroke="var(--line)" fill="var(--area)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent></Card>
    </div>
  );
}

function OTPCards({ otps=[] }){
  const now = Date.now();
  const rows = otps.map(o=>{
    const created = new Date(o.createdAt).getTime();
    const expires = new Date(o.expiresAt).getTime();
    const ageMin = Math.max(0, Math.round((now - created)/60000));
    const ttlMin = Math.max(0, Math.round((expires - now)/60000));
    return { ...o, ageMin, ttlMin };
  });
  return (
    <div className="grid-3">
      {rows.map((r, i)=> (
        <Card key={i}><CardContent>
          <div className="grid" style={{gap:6}}>
            <div style={{fontWeight:700}}>{r.email}</div>
            <div><Badge>OTP: {r.otp}</Badge></div>
            <div className="muted">Criado há {r.ageMin} min</div>
            <div className="muted">Expira em {r.ttlMin} min</div>
          </div>
        </CardContent></Card>
      ))}
      {!rows.length && <Card><CardContent>Nenhum OTP.</CardContent></Card>}
    </div>
  );
}

// =============== Página ===============
export default function CEODashboardPRO(){
  const [db, setDb] = useStore();
  const [tab, setTab] = useState("overview");
  const [qUser, setQUser] = useState("");
  const [qBook, setQBook] = useState("");
  const [userDialog, setUserDialog] = useState({ open:false, initial:null });
  const [bookDialog, setBookDialog] = useState({ open:false, initial:null });

  const totalUsers = k(db.User);
  const totalBooks = k(db.Book);
  const booksDisp = db.Book.filter(b=>b.status_Available==="disponível").length;
  const totalLoans = db.Loans.reduce((s,l)=> s+(l.quantity||0), 0);
  const totalReserves = k(db.Reserves);
  const avgRating = db.ReviewSociety.length ? (db.ReviewSociety.reduce((s,r)=> s+r.ratingReview, 0)/db.ReviewSociety.length).toFixed(1) : "0.0";

  const usersFiltered = db.User.filter(u=> [u.email, u.status_permission].join(" ").toLowerCase().includes(qUser.toLowerCase()));
  const booksFiltered = db.Book.filter(b=> [b.nameBook,b.authorBook,b.tagsBook,b.status_Available].join(" ").toLowerCase().includes(qBook.toLowerCase()));

  return (
    <>
      <GlobalStyles/>

      <div className="container">
        {/* HEADER */}
        <header className="app-header">
          <div className="title">
            <h1>CEO — Dashboard</h1>
            <p className="muted">Navegação no topo • Donuts com números • Layout fluido</p>
          </div>
          <nav className="row">
            <Button><Bell size={16}/> <span style={{marginLeft:6}}>Notificações</span> <span className="badge" style={{marginLeft:8}}>{db.Notifications.filter(n=>!n.isRead).length}</span></Button>
            <Button variant="ghost"><Settings size={16}/></Button>
          </nav>
        </header>

        {/* NAV (topo, sem empurrar a página) */}
        <Card className="topnav">
          <CardContent>
            <div className="topnav-track">
              {[
                {id:"overview", icon:<PanelsTopLeft size={16}/>, label:"Visão geral"},
                {id:"users", icon:<Users size={16}/>, label:"Usuários"},
                {id:"books", icon:<BookOpen size={16}/>, label:"Livros"},
                {id:"loans", icon:<BarChart3 size={16}/>, label:"Empréstimos/Reservas"},
                {id:"community", icon:<LayoutGrid size={16}/>, label:"Comunidade"},
                {id:"events", icon:<CalendarDays size={16}/>, label:"Eventos"},
                {id:"notifs", icon:<Bell size={16}/>, label:"Notificações"},
                {id:"fac", icon:<PieIcon size={16}/>, label:"Facilitadores"},
                {id:"topics", icon:<PieIcon size={16}/>, label:"Tópicos/Categorias"},
                {id:"otp", icon:<PieIcon size={16}/>, label:"OTP"},
              ].map(item=> (
                <button
                  key={item.id}
                  onClick={()=>setTab(item.id)}
                  className="btn"
                  style={{display:"flex", alignItems:"center", gap:8, background: tab===item.id?"#0f172a":"#fff", color: tab===item.id?"#fff":"#0f172a"}}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <section aria-label="Indicadores" className="grid-5">
          <KPI icon={Users} label="Usuários" value={totalUsers} hint={`${db.User.filter(u=>u.status_permission!=="User").length} gestores`}/>
          <KPI icon={BookOpen} label="Livros" value={totalBooks} hint={`${booksDisp} disponíveis`}/>
          <KPI icon={CalendarDays} label="Empréstimos" value={totalLoans} hint={`${totalReserves} reservas`}/>
          <KPI icon={Star} label="Média Reviews" value={avgRating} hint={`${k(db.ReviewSociety)} avaliações`}/>
          <KPI icon={PieIcon} label="Posts/Engaj." value={`${k(db.Post)}/${k(db.Comments)+k(db.Likes)}`} hint={`${k(db.Comments)} coments • ${k(db.Likes)} likes`}/>
        </section>

        {/* CONTEÚDO */}
        <main className="grid" aria-live="polite">
          {tab==="overview" && (
            <>
              <BooksCharts books={db.Book} loans={db.Loans}/>
              <UsersCharts users={db.User}/>
              <div className="grid-1">
                <Section title="Palestras" right={<Badge>{k(db.Lecture)}</Badge>}>
                  <DataTable columns={[
                    {key:"nameLecture", header:"Nome"},
                    {key:"dateLecture", header:"Data"},
                    {key:"timeLecture", header:"Hora"},
                    {key:"description", header:"Descrição"},
                    {key:"link_url", header:"Link", render:(v)=> v? <a href={v} target="_blank" rel="noreferrer">acessar</a> : "—" },
                  ]} data={db.Lecture} pageSize={5}/>
                </Section>
                <Section title="Próximos Eventos" right={<Badge>{k(db.CalendarEvents)}</Badge>}>
                  <DataTable columns={[
                    {key:"title", header:"Título"},
                    {key:"dateEvent", header:"Data"},
                    {key:"start", header:"Início"},
                    {key:"end", header:"Fim"},
                    {key:"link", header:"Link", render:(v)=> v? <a href={v} target="_blank" rel="noreferrer">acessar</a> : "—" },
                  ]} data={db.CalendarEvents} pageSize={5}/>
                </Section>
              </div>
              <ReviewsCharts reviews={db.ReviewSociety}/>
            </>
          )}

          {tab==="users" && (
            <>
              <UsersCharts users={db.User}/>
              <Section title="Usuários" right={<div className="row">
                <div style={{position:"relative", width:280, maxWidth:"100%"}}>
                  <Search size={16} style={{position:"absolute", left:10, top:10, opacity:.6}}/>
                  <Input style={{paddingLeft:32}} placeholder="Buscar por email/permissão..." value={qUser} onChange={e=>setQUser(e.target.value)}/>
                </div>
                <Button onClick={()=> setUserDialog({ open:true, initial:null })}><Plus size={16}/> Novo</Button>
              </div>}>
                <DataTable columns={[
                  {key:"image_profile", header:"Foto", render:(v)=> v? <img src={v} alt="foto" style={{width:32,height:32,borderRadius:999}}/>:"—"},
                  {key:"email", header:"Email"},
                  {key:"status_permission", header:"Permissão", render:(v)=> <Badge>{v}</Badge>},
                  {key:"date_at_create", header:"Criado em"},
                ]} data={usersFiltered} pageSize={8}/>
              </Section>
              <UserDialog
                open={userDialog.open}
                initial={userDialog.initial}
                onClose={()=> setUserDialog({ open:false, initial:null })}
                onSave={(form)=>{
                  setDb(prev=>{
                    if(userDialog.initial){ return { ...prev, User: prev.User.map(u=> u.idUser===userDialog.initial.idUser ? { ...u, ...form } : u )}; }
                    const nextId = Math.max(0, ...prev.User.map(u=>u.idUser)) + 1;
                    return { ...prev, User: [...prev.User, { ...form, idUser: nextId, password:"hashed:***", date_at_create: new Date().toISOString().slice(0,16).replace('T',' ') }] };
                  });
                  setUserDialog({ open:false, initial:null });
                }}
              />
            </>
          )}

          {tab==="books" && (
            <>
              <BooksCharts books={db.Book} loans={db.Loans}/>
              <Section title="Livros" right={<div className="row">
                <div style={{position:"relative", width:320, maxWidth:"100%"}}>
                  <Search size={16} style={{position:"absolute", left:10, top:10, opacity:.6}}/>
                  <Input style={{paddingLeft:32}} placeholder="Buscar por título, autor, tag, status..." value={qBook} onChange={e=>setQBook(e.target.value)}/>
                </div>
                <Button onClick={()=> setBookDialog({ open:true, initial:null })}><Plus size={16}/> Novo</Button>
              </div>}>
                <DataTable columns={[
                  {key:"image", header:"Capa", render:(v,row)=> v? <img src={v} alt={row.nameBook} style={{width:40,height:56,objectFit:"cover",borderRadius:8}}/>:"—"},
                  {key:"nameBook", header:"Livro"},
                  {key:"authorBook", header:"Autor"},
                  {key:"tagsBook", header:"Tag", render:(v)=> <Badge>{v}</Badge>},
                  {key:"bookCategory", header:"Categoria"},
                  {key:"bookQuantity", header:"Qtd"},
                  {key:"status_Available", header:"Status", render:(v)=> <Badge>{v}</Badge>},
                ]} data={booksFiltered} pageSize={10}/>
              </Section>

              <div className="grid-1">
                <Section title="Empréstimos recentes" right={<Badge>{k(db.Loans)}</Badge>}>
                  <DataTable columns={[
                    {key:"date_at_create", header:"Data"},
                    {key:"User_idUser", header:"Usuário", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                    {key:"Book_idLibrary", header:"Livro", render:(v)=> db.Book.find(b=>b.idLibrary===v)?.nameBook || `#${v}`},
                    {key:"quantity", header:"Qtd"},
                    {key:"returnDate", header:"Devolução"},
                  ]} data={db.Loans} pageSize={6}/>
                </Section>

                <Section title="Reservas / Carrinho" right={<Badge>{k(db.Reserves)}</Badge>}>
                  <DataTable columns={[
                    {key:"reserveDate", header:"Reserva"},
                    {key:"Cart_idCart", header:"Carrinho", render:(v)=>{ const c=db.Cart.find(x=>x.idCart===v); if(!c) return `#${v}`; const user=db.User.find(u=>u.idUser===c.User_idUser)?.email||`user#${c.User_idUser}`; const book=db.Book.find(b=>b.idLibrary===c.Book_idLibrary)?.nameBook||`book#${c.Book_idLibrary}`; return <span>{user} → <b>{book}</b> ({c.action})</span>; }},
                  ]} data={db.Reserves} pageSize={6}/>
                </Section>
              </div>

              <LoansCharts loans={db.Loans} users={db.User} books={db.Book}/>
              <CartReserveCharts cart={db.Cart} reserves={db.Reserves}/>

              <BookDialog
                open={bookDialog.open}
                initial={bookDialog.initial}
                onClose={()=> setBookDialog({ open:false, initial:null })}
                onSave={(form)=>{
                  setDb(prev=>{
                    if(bookDialog.initial){ return { ...prev, Book: prev.Book.map(b=> b.idLibrary===bookDialog.initial.idLibrary ? { ...b, ...form } : b )}; }
                    const nextId = Math.max(0, ...prev.Book.map(b=>b.idLibrary)) + 1;
                    return { ...prev, Book: [...prev.Book, { ...form, idLibrary: nextId, date_aquisition: new Date().toISOString().slice(0,10) }] };
                  });
                  setBookDialog({ open:false, initial:null });
                }}
              />
            </>
          )}

          {tab==="loans" && (
            <>
              <LoansCharts loans={db.Loans} users={db.User} books={db.Book}/>
              <CartReserveCharts cart={db.Cart} reserves={db.Reserves}/>
            </>
          )}

          {tab==="community" && (
            <>
              <div className="grid-1">
                <Section title="Posts" right={<Badge>{k(db.Post)}</Badge>}>
                  <DataTable columns={[
                    {key:"title", header:"Título"},
                    {key:"created_at", header:"Criado em"},
                    {key:"User_idUser", header:"Autor", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                  ]} data={db.Post} pageSize={6}/>
                </Section>
                <Section title="Comentários" right={<Badge>{k(db.Comments)}</Badge>}>
                  <DataTable columns={[
                    {key:"Post_idPost", header:"Post", render:(v)=> db.Post.find(p=>p.idPost===v)?.title || `#${v}`},
                    {key:"User_idUser", header:"Autor", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                    {key:"message", header:"Mensagem"},
                    {key:"createdDate", header:"Data"},
                  ]} data={db.Comments} pageSize={6}/>
                </Section>
              </div>
              <ReviewsCharts reviews={db.ReviewSociety}/>
              <Section title="Likes" right={<Badge>{k(db.Likes)}</Badge>}>
                <DataTable columns={[
                  {key:"Post_idPost", header:"Post", render:(v)=> db.Post.find(p=>p.idPost===v)?.title || `#${v}`},
                  {key:"User_idUser", header:"Autor", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                  {key:"created_at", header:"Data"},
                ]} data={db.Likes} pageSize={6}/>
              </Section>
            </>
          )}

          {tab==="events" && (
            <>
              <EventsCharts lectures={db.Lecture} events={db.CalendarEvents}/>
              <div className="grid-1">
                <Section title="Atividades Voluntárias" right={<Badge>{k(db.VolunteerWork)}</Badge>}>
                  <DataTable columns={[
                    {key:"nameVolunteerWork", header:"Atividade"},
                    {key:"nameUser", header:"Voluntário"},
                    {key:"address", header:"Endereço"},
                    {key:"dateVolunteerWork", header:"Data"},
                    {key:"work_description", header:"Descrição"},
                  ]} data={db.VolunteerWork} pageSize={6}/>
                </Section>
                <Section title="Palestras" right={<Badge>{k(db.Lecture)}</Badge>}>
                  <DataTable columns={[
                    {key:"nameLecture", header:"Nome"},
                    {key:"dateLecture", header:"Data"},
                    {key:"timeLecture", header:"Hora"},
                    {key:"description", header:"Descrição"},
                    {key:"link_url", header:"Link", render:(v)=> v? <a href={v} target="_blank" rel="noreferrer">acessar</a> : "—" },
                  ]} data={db.Lecture} pageSize={6}/>
                </Section>
              </div>
            </>
          )}

          {tab==="notifs" && (
            <>
              <NotificationsCharts notifications={db.Notifications}/>
              <Section title="Notificações" right={<Badge>{k(db.Notifications)}</Badge>}>
                <DataTable columns={[
                  {key:"message", header:"Mensagem"},
                  {key:"created_at", header:"Criado em"},
                  {key:"isRead", header:"Lida?", render:(v)=> v? <Badge>Sim</Badge> : <Badge>NÃO</Badge>},
                  {key:"User_idUser", header:"Usuário", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                ]} data={db.Notifications} pageSize={10}/>
              </Section>
            </>
          )}

          {tab==="fac" && (
            <>
              <FacilitadoresCharts facilitadores={db.Facilitadores}/>
              <Section title="Facilitadores" right={<Badge>{k(db.Facilitadores)}</Badge>}>
                <DataTable columns={[
                  {key:"apelido", header:"Nome"},
                  {key:"description", header:"Descrição"},
                  {key:"category", header:"Categoria"},
                  {key:"espiritaSinceTime", header:"Tempo Espírita (anos)"},
                  {key:"memberSinceWhen", header:"Membro desde"},
                ]} data={db.Facilitadores} pageSize={8}/>
              </Section>
            </>
          )}

          {tab==="topics" && (
            <>
              <div className="grid-1">
                <Section title="Tópicos" right={<Badge>{k(db.Topic)}</Badge>}>
                  <DataTable columns={[
                    {key:"title", header:"Título"},
                    {key:"description", header:"Descrição"},
                    {key:"image", header:"Imagem", render:(v,row)=> v? <img src={v} alt={row.title} style={{width:120, height:64, objectFit:"cover", borderRadius:8}}/>: "—"},
                    {key:"User_idUser", header:"Autor", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                    {key:"Category_id", header:"Categoria", render:(v)=> db.Category.find(c=>c.idCategory===v)?.nameCategory || `#${v}`},
                    {key:"created_at", header:"Criado em"},
                  ]} data={db.Topic} pageSize={6}/>
                </Section>
                <Section title="Categorias" right={<Badge>{k(db.Category)}</Badge>}>
                  <DataTable columns={[
                    {key:"nameCategory", header:"Nome"},
                    {key:"User_idUser", header:"Autor", render:(v)=> db.User.find(u=>u.idUser===v)?.email || `#${v}`},
                    {key:"create_at", header:"Criado em"},
                  ]} data={db.Category} pageSize={6}/>
                </Section>
              </div>
            </>
          )}

          {tab==="otp" && (
            <>
              <OTPCards otps={db.OTP}/>
              <Section title="OTP (Tabela)" right={<Badge>{k(db.OTP)}</Badge>}>
                <DataTable columns={[
                  {key:"email", header:"Email"},
                  {key:"otp", header:"Código"},
                  {key:"createdAt", header:"Criado em"},
                  {key:"expiresAt", header:"Expira em"},
                ]} data={db.OTP} pageSize={8}/>
              </Section>
            </>
          )}
        </main>

        
      </div>
    </>
  );
}
