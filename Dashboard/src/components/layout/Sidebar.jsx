import { NavLink } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthContext";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MicIcon from "@mui/icons-material/Mic";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  BellIcon,
  BookIcon,
  CalendarSearch,
  ChevronDown,
  FunnelIcon,
  GroupIcon,
  KeyIcon,
  MessageSquare,
  MessageSquareIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  StarIcon,
  Text,
  ThumbsUpIcon,
  UserLock,
} from "lucide-react";
import { useState } from "react";

const items = [
  {
    type: "single",
    to: "/dashboard/overview",
    label: "Overview",
    icon: <DashboardIcon />,
  },
  {
    type: "submenu",
    label: "Palestras",
    icon: <MicIcon />,
    submenu: [
      { to: "/dashboard/lectures", label: "Palestras", icon: <MicIcon /> },
    ],
  },
  {
    type: "submenu",
    label: "Usuários & Permissões",
    icon: <PeopleIcon />,
    submenu: [
      { to: "/dashboard/users", label: "Todos Usuários", icon: <PeopleIcon /> },
      { to: "/dashboard/admins", label: "Administradores", icon: <UserLock size={18} /> },
      { to: "/dashboard/facilitators", label: "Facilitadores", icon: <GroupIcon size={18} /> },
      { to: "/dashboard/permissions", label: "Permissões", icon: <KeyIcon size={18} /> },
    ],
  },
  {
    type: "submenu",
    label: "Biblioteca & Recursos",
    icon: <LibraryBooksIcon />,
    submenu: [
      { to: "/dashboard/library", label: "Livros", icon: <BookIcon size={18} /> },
      { to: "/dashboard/categories", label: "Categorias", icon: <FunnelIcon size={18} /> },
      { to: "/dashboard/loans", label: "Empréstimos", icon: <LibraryBooksIcon /> },
      { to: "/dashboard/reserves", label: "Reservas", icon: <EventIcon /> },
      { to: "/dashboard/favorites", label: "Favoritos", icon: <StarIcon size={18} /> },
      { to: "/dashboard/cart", label: "Carrinho", icon: <ShoppingCartIcon size={18} /> },
    ],
  },
  {
    type: "submenu",
    label: "Comunidade",
    icon: <MessageSquareIcon size={20} />,
    submenu: [
      { to: "/dashboard/posts", label: "Posts", icon: <Text size={18} /> },
      { to: "/dashboard/groups", label: "Grupos de Estudo", icon: <GroupIcon size={18} /> },
      { to: "/dashboard/topics", label: "Tópicos", icon: <Text size={18} /> },
      { to: "/dashboard/reviews", label: "Reviews", icon: <StarIcon size={18} /> },
    ],
  },
  {
    type: "submenu",
    label: "Calendário & Atividades",
    icon: <EventIcon />,
    submenu: [
      { to: "/dashboard/calendar", label: "Calendário", icon: <EventIcon /> },
      { to: "/dashboard/volunteers", label: "Trabalho Voluntário", icon: <VolunteerActivismIcon /> },
      { to: "/dashboard/notifications", label: "Notificações", icon: <BellIcon size={18} /> },
    ],
  },
  {
    type: "submenu",
    label: "Segurança",
    icon: <ShieldCheckIcon size={20} />,
    submenu: [
      { to: "/dashboard/otp", label: "OTP & 2FA", icon: <KeyIcon size={18} /> },
      { to: "/dashboard/audit", label: "Auditoria", icon: <ShieldCheckIcon size={18} /> },
    ],
  },
  {
    type: "single",
    to: "/dashboard/settings",
    label: "Configurações",
    icon: <SettingsIcon />,
  },
];

function SubMenu({ item, isOpen, onToggle, onNavigate }) {
  return (
    <div className="space-y-1">
      <button 
        onClick={onToggle} 
        className={`
          flex items-center justify-between w-full px-4 py-3 rounded-2xl 
          transition-all duration-200 text-[15px]
          hover:bg-brand-50 dark:hover:bg-brand-900/20
          border border-transparent hover:border-brand-100 dark:hover:border-brand-800
          ${isOpen ? 'bg-brand-50 dark:bg-brand-900/30 border-brand-200 dark:border-brand-700' : ''}
        `}
      >
        <div className="flex items-center gap-3">
          <span className={`
            text-lg transition-all duration-200
            ${isOpen ? 'text-brand-600 dark:text-brand-400 scale-110' : 'text-gray-600 dark:text-gray-400'}
          `}>
            {item.icon}
          </span>
          <span className={`
            font-medium transition-colors
            ${isOpen ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}
          `}>
            {item.label}
          </span>
        </div>
        
        <ChevronDown 
          size={16} 
          className={`
            transition-transform duration-200
            ${isOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500'}
          `}
        />
      </button>
      
      {isOpen && (
        <div className="ml-4 space-y-1 border-l-2 border-brand-200 dark:border-brand-700 pl-3">
          {item.submenu.map((subItem) => (
            <NavLink
              to={subItem.to} 
              key={subItem.to} 
              onClick={onNavigate}
              className={({ isActive }) => `
                flex items-center gap-3 py-2.5 px-3 rounded-xl text-[14px] 
                transition-all duration-200 group
                ${
                  isActive 
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-semibold' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-300'
                }
              `}
            >
              <span className={`
                transition-transform duration-200
                ${isOpen ? ' scale-110 dark:text-white' : 'text-brand-500 group-hover:scale-105'}
              `}>
                {subItem.icon}
              </span>
              <span>{subItem.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function Avatar({ name, email }) {
  const initial = (name || email || "?").trim()[0]?.toUpperCase() || "?";
  return (
    <div className="w-10 h-10 rounded-full bg-brand-600 text-white grid place-items-center font-bold">
      {initial}
    </div>
  );
}

export default function Sidebar({ onNavigate }) {
  const [openSubMenu, setOpenSubMenu] = useState({})
  const { user } = useAuth()

  const toggleMenu = (menuLabel) => {
    setOpenSubMenu(prev => ({
      ...prev, 
      [menuLabel]: !prev[menuLabel]
    }))
  }

  return (
    <div className="border-r-4 p-3 h-full flex flex-col">
      {/* Topo */}
      <div className="pb-3">
        <div className="font-bold text-lg">CEO Dashboard</div>
        <div className="text-xs text-gray-500">
          {user?.email || "admin@pro.app"}
        </div>
      </div>

      {/* Navegação */}
      <nav className="space-y-1 overflow-y-auto">
        {items.map((i) => {
          if (i.type.trim().toLowerCase() === "single") {
            return (
              <NavLink
                key={i.to}
                to={i.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200",
                    "text-[15px] hover:bg-brand-700 dark:hover:bg-brand-900/20",
                    "border border-transparent hover:border-brand-100 dark:hover:border-brand-800",
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-semibold"
                      : "hover:text-gray-100 dark:text-gray-300",
                  ].join(" ")
                }
              >
                <span className={`
                  text-lg transition-transform duration-200 
                  ${openSubMenu ? 'hover:text-white dark:text-white scale-110' : 'text-brand-500'}
                `}>
                  {i.icon}
                </span>
                <span>{i.label}</span>
              </NavLink>
            )
          }
          if(i.type.trim().toLowerCase() === "submenu"){
            return (
              <SubMenu 
                item={i}
                key={i.label}
                isOpen={openSubMenu[i.label]}
                onToggle={() => toggleMenu(i.label)}
                onNavigate={onNavigate}
              />
            )
          }
        })}
      </nav>

      {/* Rodapé com usuário */}
      <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mt-3">
          <Avatar name={user?.name} email={user?.email} />
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">
              {user?.name || "Usuário"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.email || "email@exemplo.com"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}