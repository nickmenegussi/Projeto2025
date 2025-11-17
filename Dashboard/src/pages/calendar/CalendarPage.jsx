import { useEffect, useState } from "react";
import api from "../../services/api";
import { fetchEvents } from "../../modules/services/ServiceCalendar";
import Input, { Label } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import DataTable from "../../components/DataTable";
import { User } from "lucide-react";
import handleApiError from "../../modules/utils/habdleapiError";
import Swal from "sweetalert2";

export default function CalendarPage() {
  const [items, setItems] = useState([])
  console.log(items)
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    link: "",
    dateEvent: "",
    attachment: "",
  });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  async function load() {
    const res = await fetchEvents();
    setItems(res);
  }
  useEffect(() => {
    load();
  }, []);

  function handleOpenModal() {
    setOpen(true);
  }

  const fomatDateTimeForMySQL = (date, time) => {
    if (!date || !time) return "";
    return `${date} ${time}:00`;
  };

  async function save() {
    try {
      const data = {
        title: form.title,
        description: form.description,
        start: fomatDateTimeForMySQL(form.dateEvent, form.start),
        end: fomatDateTimeForMySQL(form.dateEvent, form.end),
        link: form.link,
        dateEvent: form.dateEvent,
        attachment: form.attachment,
      };

      const response = await api.post("/calendar/calendar/register", data, {
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

  async function remove(row) {
    if (confirm("Excluir?")) {
      await api.delete("/events/" + row.id);
      load();
    }
  }

  return (
    <div className="space-y-3">
      <div className="toolbar">
        <Input
          className="max-w-sm"
          placeholder="Buscar materiais..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button onClick={handleOpenModal}>Novo Material</Button>
      </div>
      <DataTable
        columns={[
          { key: "idCalendarEvents", label: "Id" },

          { key: "title", label: "Título" },
          { key: "dateEvent", label: "Dia do Evento" },
          { key: "start", label: "Início" },
          { key: "end", label: "Fim" },
          { key: "description", label: "Descrição" },
          { key: "link", label: "Link" },
        ]}
        rows={items}
        onEdit={() => setOpen(true)}
        onDelete={remove}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={
          form.title ? `Editando Evento ${form.title} ` : "Cadastrar novo Item"
        }
        footer={
          <>
            <Button onClick={save}>Salvar</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label>Título</Label>
            <Input
              placeholder="Informe o título do evento."
              className="outline-blue-800"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Horário do Começo</Label>
            <Input
              type="time"
              placeholder="Informe o horário de início."
              className="outline-blue-800"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
            />
          </div>
          <div>
            <Label>Horário do Fim</Label>
            <Input
              type="time"
              placeholder="Informe o horário de término."
              className="outline-blue-800"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
            />
          </div>
          <div>
            <Label>Link</Label>
            <Input
              placeholder="Informe o link do evento (opcional)."
              className="outline-blue-800"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </div>
          <div>
            <Label>Anexo</Label>
            <Input
              placeholder="Adicione um anexo, se necessário."
              className="outline-blue-800"
              value={form.attachment}
              onChange={(e) => setForm({ ...form, attachment: e.target.value })}
            />
          </div>
          <div>
            <Label>Data do Evento</Label>
            <Input
              type={"date"}
              placeholder="Selecione a data do evento."
              className="outline-blue-800"
              value={form.dateEvent}
              onChange={(e) => setForm({ ...form, dateEvent: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Descrição</Label>
            <textarea
              placeholder="Informe um breve resumo sobre o livro."
              className="w-full border outline-blue-800 border-gray-300 rounded-xl px-3 py-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
