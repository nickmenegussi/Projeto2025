import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/DataTable";
import Button from "../../components/ui/Button";
import Input, { Label } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import InputMask from "react-input-mask";
import { fetchVolunteerWork } from "../../modules/services/ServiceVolunteerWork";
import Swal from "sweetalert2";
import handleApiError from "../../modules/utils/habdleapiError";

export default function LecturesList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState(null);

  async function load() {
    const res = await fetchVolunteerWork();
    setItems(res);
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setForm({
      nameVolunteerWork: "",
      address: "",
      dateVolunteerWork: "",
      work_description: "",
  
    });
  }

  async function handleCreateNewVolunterWork() {
    try {
      const data = {
        nameVolunteerWork: form.nameVolunteerWork,
        address: form.address,
        dateVolunteerWork: form.dateVolunteerWork,
        work_description: form.work_description,
      };
      const response = await api.post("/volunteerWork/work/Create", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          title: "Sucesso ao alterar item!",
          text: response.data.message,
          icon: "success",
        });
        load();
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  function startEdit(row) {
    setForm({ ...row });
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
            Trabalho Voluntário
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie os trabalhos voluntários
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
            { key: "idVolunteerWork", label: "ID" },
            { key: "nameVolunteerWork", label: "Nome Trabalho" },
            { key: "work_description", label: "Descrição" },
            { key: "address", label: "Endereço" },
            { key: "dateVolunteerWork", label: "Data" },
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
                !form?.nameVolunteerWork ||
                !form?.address ||
                !form?.dateVolunteerWork ||
                !form?.work_description 
              }
              onClick={handleCreateNewVolunterWork}
              className={`
                bg-blue-600 text-white hover:bg-blue-700 transition-colors
                ${
                  !form?.nameVolunteerWork ||
                  !form?.address ||
                  !form?.dateVolunteerWork ||
                  !form?.work_description 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed hover:bg-slate-300"
                    : ""
                }
              `}
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
                  Título do trabalho
                </Label>
                <Input
                  id="title"
                  value={form.nameVolunteerWork}
                  onChange={(e) =>
                    setForm({ ...form, nameVolunteerWork: e.target.value })
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
                  Endereço
                </Label>
                <Input
                  id="speaker"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nome do palestrante"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Data do trabalho
                </Label>
                <Input
                  type="date"
                  value={form.dateVolunteerWork || ""}
                  onChange={(e) =>
                    setForm({ ...form, dateVolunteerWork: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="work_description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descrição do trabalho
              </Label>
              <textarea
                id="work_description"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-colors"
                rows="4"
                value={form.work_description}
                onChange={(e) =>
                  setForm({ ...form, work_description: e.target.value })
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
