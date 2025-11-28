import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/DataTable";
import Button from "../../components/ui/Button";
import Input, { Label } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { fetchLecture } from "../../modules/services/ServiceLecture";
import { fetchBook } from "../../modules/services/ServiceBook";
import Swal from "sweetalert2";
import handleApiError from "../../modules/utils/habdleapiError";

export default function LibraryList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    namebook: "",
    authorBook: "",
    overviewBook: "",
    curiosityBook: "",
    tagsBook: "",
    bookQuantity: "",
    status_Available: "",
    bookCategory: "",
  });
  const [imageFile, setImageFile] = useState(null);

  async function load() {
    const res = await fetchBook();
    setItems(res);
  }
  useEffect(() => {
    load();
  }, [q]);

  const handleImageForm = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleOpenModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const resetForm = () => {
    setForm({
      namebook: "",
      authorBook: "",
      overviewBook: "",
      curiosityBook: "",
      tagsBook: "",
      bookQuantity: "",
      status_Available: "",
      bookCategory: "",
    });
    setImageFile(null);
  };

  const handleCloseModal = () => {
    resetForm();
    setOpenModal(false);
  };

  function startEdit(row) {
    setForm({ ...row, 
      namebook: row.nameBook, 
      authorBook: row.authorBook
    })
    setOpenModal(true)
  }

  async function save() {
    try {
      const formData = new FormData();
      formData.append("namebook", form.namebook);
      formData.append("authorBook", form.authorBook);
      formData.append("image", imageFile);
      formData.append("overviewBook", form.overviewBook);
      formData.append("curiosityBook", form.curiosityBook);
      formData.append("tagsBook", form.tagsBook);
      formData.append("bookQuantity", form.bookQuantity);
      formData.append("status_Available", form.status_Available);
      formData.append("bookCategory", form.bookCategory);

      const response = await api.post("/library/library/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          title: "Sucesso ao registrar um novo livro!",
          text: response.data.message,
          icon: "success",
        });
        load();
        handleCloseModal();
      }
    } catch (error) {
      handleApiError(error);
    }
  }
  async function remove(row) {
    if (confirm("Excluir?")) {
      await api.delete("/library/" + row.id);
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
          {
            key: "image",
            label: "Foto",
            render: (value, row) => (
              <div>
                {value ? (
                  <img
                    src={value}
                    alt={`Foto de ${row.namebook}`}
                    className="w-14 h-20 rounded-xl object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            ),
          },
          { key: "nameBook", label: "Título" },
          { key: "authorBook", label: "Autor" },
          { key: "bookCategory", label: "Categoria" },
          { key: "date_aquisition", label: "Aquisição" },
          { key: "status_Available", label: "Disponibilidade" },
        ]}
        rows={items}
        onEdit={startEdit}
        onDelete={remove}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        title={form.namebook ? `Editando livro ${form.namebook} `: 'Cadastrar novo Item'}
        footer={
          <>
            <Button onClick={save}>Salvar</Button>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label>Título</Label>
            <Input
              placeholder="Informe o nome do livro."
              className="outline-blue-800"
              value={form.namebook}
              onChange={(e) => setForm({ ...form, namebook: e.target.value })}
            />
          </div>
          <div>
            <Label>Autor do Livro</Label>
            <Input
              placeholder="Informe o autor do livro."
              className="outline-blue-800"
              value={form.authorBook}
              onChange={(e) => setForm({ ...form, authorBook: e.target.value })}
            />
          </div>
          <div>
            <Label>Gênero</Label>
            <select
              className="input outline-blue-800"
              value={form.tagsBook}
              onChange={(e) => setForm({ ...form, tagsBook: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option value="Obras Básicas">Obras Básicas</option>
              <option value="Obras complementares">Obras Complementares</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <Label>Categoria</Label>
            <select
              className="input outline-blue-800"
              value={form.bookCategory}
              onChange={(e) =>
                setForm({ ...form, bookCategory: e.target.value })
              }
            >
              <option value="">Selecione...</option>
              <option value="empréstimo">Empréstimo</option>
              <option value="reserva">Reserva</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <Label>Disponibilidade</Label>
            <select
              className="input outline-blue-800"
              value={form.status_Available}
              onChange={(e) =>
                setForm({ ...form, status_Available: e.target.value })
              }
            >
              <option value="">Selecione...</option>
              <option value="disponível">Disponível</option>
              <option value="reservado">reservado</option>
              <option value="emprestado">emprestado</option>
              <option value="indisponível">indisponível</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <Label>Quantidade de Livros</Label>
            <Input
              value={form.bookQuantity}
              onChange={(e) =>
                setForm({ ...form, bookQuantity: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <Label>Imagem</Label>
            <Input
              className="outline-blue-800"
              type="file"
              accept="image/*"
              onChange={handleImageForm}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Curiosidade do Livro</Label>
            <textarea
              placeholder="Informe algumas curiosidade sobre o livro."
              className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-blue-800"
              value={form.curiosityBook}
              onChange={(e) =>
                setForm({ ...form, curiosityBook: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <Label>Resumo do Livro</Label>
            <textarea
              placeholder="Informe um breve resumo sobre o livro."
              className="w-full border outline-blue-800 border-gray-300 rounded-xl px-3 py-2"
              value={form.overviewBook}
              onChange={(e) =>
                setForm({ ...form, overviewBook: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
