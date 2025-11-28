import { useState } from "react";
import { useAuth } from "../../modules/auth/AuthContext";
import { useTheme } from "../../modules/theme/ThemeProvider";
import api from "../../services/api";

import NotificationsIcon from '@mui/icons-material/Notifications'
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header({ openMobile }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const [q, setQ] = useState("");
  const [results, setResults] = useState(null);

  async function searchAll(query) {
    if (!query) {
      setResults(null);
      return;
    }
    const [lectures, users, library, volunteers] = await Promise.all([
      api.get("/lectures?search=" + encodeURIComponent(query)),
      api.get("/users?search=" + encodeURIComponent(query)),
      api.get("/library?search=" + encodeURIComponent(query)),
      api.get("/volunteers?search=" + encodeURIComponent(query)),
    ]);
    setResults({
      lectures: lectures.data.data.items.slice(0, 5),
      users: users.data.data.items.slice(0, 5),
      library: library.data.data.items.slice(0, 5),
      volunteers: volunteers.data.data.items.slice(0, 5),
    });
  }

  return (
    <header className="sticky top-0 z-30 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="h-20 flex p-4 items-center gap-3">
        {/* Botão mobile */}
        <button
          className="md:hidden btn-ghost"
          onClick={openMobile}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        {/* Barra de busca (debounce 400ms) */}
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            clearTimeout(window.__S);
            window.__S = setTimeout(() => searchAll(e.target.value), 400);
          }}
          placeholder="Pesquisar (palestras, usuários, biblioteca, voluntariado)"
          className="input max-w-xl flex-1"
          aria-label="Pesquisar no dashboard"
        />

        <div className="ml-auto flex items-center gap-2">
          <button className="btn-ghost">
            <NotificationsIcon />
          </button>
          <button className="btn-ghost" onClick={toggle} title="Alternar tema">
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          <img
            src={user?.image_profile || "https://i.pravatar.cc/45?img=12"}
            alt={user?.nameUser}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Resultados da busca (opcional) */}
      {results && (
        <div className="container pb-3">
          <div className="card p-3 grid md:grid-cols-4 gap-3 mt-3">
            {Object.entries(results).map(([key, items]) => (
              <div key={key}>
                <div className="font-semibold mb-2 capitalize">{key}</div>
                <ul className="space-y-1">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center justify-between"
                    >
                      <span className="truncate text-sm">
                        {it.title || it.name}
                      </span>
                    </li>
                  ))}
                  {!items.length && (
                    <li className="text-sm text-gray-500">Nada encontrado</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
