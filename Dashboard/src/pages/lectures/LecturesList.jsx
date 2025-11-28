import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/DataTable";
import Button from "../../components/ui/Button";
import Input, { Label } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { fetchLecture } from "../../modules/services/ServiceLecture";
import { Calendar } from "primereact/calendar";

export default function LecturesList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState(null);


  async function load() {
    const res = await fetchLecture();
    setItems(res);
  }
  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setForm({
    nameLecture: "",
    dateLecture: null,
    timeLecture: "",
    description: "",
    link_url: "",
    video_url: "",
  });
  }
  function startEdit(row) {
    setForm({ ...row });
  }

  async function save() {
    if (form.id) await api.put("/lectures/" + form.id, form);
    else await api.post("/lectures", form);
    setForm(null);
    load();
  }
  async function remove(row) {
    if (confirm("Excluir?")) {
      await api.delete("/lectures/" + row.id);
      load();
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Palestras
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie as palestras do evento
          </p>
        </div>
        <Button
          onClick={startNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Nova Palestra
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Input
            className="pl-14 w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 transition-colors"
            placeholder="Buscar por título, descrição ou palestrante..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <DataTable
          columns={[
            { key: "idLecture", label: "Id" },
            { key: "nameLecture", label: "Título" },
            { key: "description", label: "Descrição" },
            { key: "dateLecture", label: "Data" },
            { key: "timeLecture", label: "Hora" },
            { key: "link_url", label: "Link" },
          ]}
          rows={items}
          onEdit={startEdit}
          onDelete={remove}
        />
      </div>

      {/* Modal */}
      <Modal
        open={!!form}
        onClose={() => setForm(null)}
        title={form?.id ? "Editar Palestra" : "Nova Palestra"}
        footer={
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={() => setForm(null)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button
              disabled={
                !form?.nameLecture ||
                !form?.dateLecture ||
                !form?.timeLecture ||
                !form?.description ||
                !form?.link_url ||
                !form?.video_url
              }
              onClick={save}
              className={[
                "bg-blue-600 text-white hover:bg-blue-700 transition-colors",
                {
                  "bg-slate-300 text-slate-500 cursor-not-allowed hover:bg-slate-300":
                    !form?.nameLecture ||
                    !form?.dateLecture ||
                    !form?.timeLecture ||
                    !form?.description ||
                    !form?.link_url ||
                    !form?.video_url,
                },
              ]}
            >
              Salvar Palestra
            </Button>
          </div>
        }
      >
        {form && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Título da Palestra
                </Label>
                <Input
                  id="title"
                  value={form.nameLecture}
                  onChange={(e) =>
                    setForm({ ...form, nameLecture: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Digite o título da palestra"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="speaker"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Palestrante
                </Label>
                <Input
                  id="speaker"
                  value={form.speaker}
                  onChange={(e) =>
                    setForm({ ...form, speaker: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nome do palestrante"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={form.dateLecture}
                  onChange={(e) =>
                    setForm({ ...form, dateLecture: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="time"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Hora
                </Label>
                <Calendar
                  placeholder="DD/MM/YYYY"

                  value={form.timeLecture}
                  onChange={(e) =>
                    setForm({ ...form, timeLecture: e.target.value })
                  }
                  showIcon
                  dateFormat="dd/mm/yy"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="capacity"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Video Url
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={form.video_url}
                  onChange={(e) =>
                    setForm({ ...form, video_url: Number(e.target.value) })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="link"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Link (Opcional)
                </Label>
                <Input
                  id="link"
                  value={form.link_url || ""}
                  onChange={(e) =>
                    setForm({ ...form, link_url: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descrição
              </Label>
              <textarea
                id="description"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-colors"
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Descreva os detalhes da palestra..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
