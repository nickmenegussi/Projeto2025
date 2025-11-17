import { Pencil, Trash2 } from "lucide-react";
import EmptyState from "./ui/EmptyState";
import { useState } from "react";

// Componente para visualização em card (mobile-friendly)
function CardView({ columns, row, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm mb-3">
      <div className="space-y-2">
        {columns.map((c) => (
          <div key={c.key} className="flex justify-between">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {c.label}:
            </span>
            <span
              className="text-sm text-gray-900 dark:text-gray-100 text-right max-w-[150px] truncate"
              title={row[c.key]}
            >
              {row[c.key] || "-"}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button
          className="flex-1 btn-outline py-2 text-xs rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          onClick={() => onEdit?.(row)}
        >
          Editar
        </button>
        <button
          className="flex-1 btn-ghost py-2 text-xs rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => onDelete?.(row)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

// Componente para células com conteúdo longo
function TableCell({ value, maxWidth = "200px" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!value || value.length <= 50) {
    return <span>{value || "-"}</span>;
  }

  return (
    <div className="relative">
      <div
        className={`cursor-pointer hover:text-blue-600 transition-colors ${
          isExpanded ? "" : "truncate"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ maxWidth: isExpanded ? "none" : maxWidth }}
        title={isExpanded ? "Clique para recolher" : "Clique para expandir"}
      >
        {value}
      </div>
      {!isExpanded && <span className="text-xs text-blue-500 ml-1">⋯</span>}
    </div>
  );
}

// Componente de Paginação
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      <div className="flex gap-1">
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
      </button>
    </div>
  );
}

export default function DataTable({
  columns,
  rows,
  onEdit,
  onDelete,
  itemsPerPage = 10,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage);

  if (!rows?.length) {
    return (
      <EmptyState
        title="Sem registros"
        subtitle="Adicione um novo para começar."
      />
    );
  }

  // Configuração de paginação
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / localItemsPerPage);
  const startIndex = (currentPage - 1) * localItemsPerPage;
  const endIndex = startIndex + localItemsPerPage;
  const currentItems = rows.slice(startIndex, endIndex);

  // Ordenação aplicada aos itens da página atual
  const sortedRows = [...currentItems].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Configurações de largura para diferentes tipos de colunas
  const getColumnWidth = (key) => {
    const widthConfig = {
      image: "100px",
      image_profile: "100px",
      nameLecture: "minmax(200px, 1fr)",
      description: "minmax(250px, 2fr)",
      dateLecture: "120px",
      status_permission: "170px",
      timeLecture: "100px",
      link_url: "minmax(150px, 1fr)",
      nameUser: "minmax(200px, 1fr)",
      email: "minmax(200px, 1fr)",
      title: "minmax(200px, 1fr)",
      actions: "140px",
      idVolunteerWork: "80px",
      idCalendarEvents: "80px",
      idUser: "80px",
      idLecture: "80px",
    };
    return widthConfig[key] || "minmax(150px, 1fr)";
  };

  // Função para renderizar o conteúdo da célula
  const renderCellContent = (column, value, row) => {
    if (column.render) {
      return column.render(row);
    }
    
    // Verificação específica para colunas de ID
    const isIdColumn = 
      column.key === "idCalendarEvents" || 
      column.key === "idVolunteerWork" || 
      column.key === "idUser" || 
      column.key === "idLecture";
    
    if (isIdColumn) {
      return <span>{value || "-"}</span>;
    }

    // Verificação específica para colunas de data
    const isDateColumn = 
      column.key === "dateVolunteerWork" ||
      column.key === "dateLecture" ||
      column.key === "date_aquisition" ||
      column.key === "dateEvent";
    
    if (isDateColumn) {
      if (!value) return "-";
      try {
        const date = new Date(value);
        return <span>{date.toLocaleDateString("pt-BR")}</span>;
      } catch {
        return <span>{value}</span>;
      }
    }

    // Verificação EXATA para colunas de horário
    const isTimeColumn = column.key === "start" || column.key === "end";
    
    if (isTimeColumn) {
      if (!value) return "-";
      try {
        const horaUTC = new Date(value).toISOString().split("T")[1].split(".")[0];
        return <span>{horaUTC}</span>;
      } catch {
        return <span>{value}</span>;
      }
    }

    return (
      <TableCell
        value={value}
        maxWidth={getColumnWidth(column.key)
          .replace("minmax(", "")
          .replace(", 1fr)", "")
          .replace(", 2fr)", "")}
      />
    );
  };

  return (
    <div className="space-y-4 p-6">
      {/* Controles */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              viewMode === "table"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setViewMode("table")}
          >
            Visualização em Tabela
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              viewMode === "card"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setViewMode("card")}
          >
            Visualização em Cards
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems}{" "}
            registro{totalItems !== 1 ? "s" : ""}
          </div>

          <select
            value={localItemsPerPage}
            onChange={(e) => {
              setLocalItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
          </select>
        </div>
      </div>

      {/* Visualização em Tabela */}
      {viewMode === "table" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full"
              style={{
                tableLayout: "fixed",
                minWidth: "600px",
              }}
            >
              <colgroup>
                {columns.map((c) => (
                  <col key={c.key} style={{ width: getColumnWidth(c.key) }} />
                ))}
                <col style={{ width: getColumnWidth("actions") }} />
              </colgroup>
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      onClick={() => handleSort(c.key)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{c.label}</span>
                        <div className="flex flex-col ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-gray-400 leading-none">
                            {sortConfig.key === c.key
                              ? sortConfig.direction === "asc"
                                ? "▲"
                                : "▼"
                              : "↕"}
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[140px]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedRows.map((r, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className="max-w-full break-words px-4 py-3 text-sm text-gray-900 dark:text-gray-100 align-top"
                      >
                        {renderCellContent(c, r[c.key], r)}
                      </td>
                    ))}
                    <td className="py-2 align-top">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1.5 text-xs rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors whitespace-nowrap active:scale-95 transition-all duration-150"
                          onClick={() => onEdit?.(r)}
                          title="Editar registro"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          className="px-2 py-1.5 text-xs rounded-md border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap active:scale-95 transition-all duration-150"
                          onClick={() => onDelete?.(r)}
                          title="Excluir registro"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer da tabela com paginação */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Ordenado por:{" "}
                {sortConfig.key
                  ? columns.find((c) => c.key === sortConfig.key)?.label
                  : "Nenhum"}
              </div>

              {totalPages > 1 && (
                <div className="flex-1 max-w-md">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Página {currentPage} de {totalPages}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visualização em Cards */}
      {viewMode === "card" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedRows.map((r, index) => (
              <CardView
                key={index}
                columns={columns}
                row={r}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Paginação para cards */}
          {totalPages > 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Página {currentPage} de {totalPages}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}