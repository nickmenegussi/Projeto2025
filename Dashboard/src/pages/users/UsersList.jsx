import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/DataTable";
import Button from "../../components/ui/Button";
import Input, { Label } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { fetchUser } from "../../modules/services/ServiceUser";
import { SearchIcon, User } from "lucide-react";
import Swal from "sweetalert2";
import handleApiError from "../../modules/utils/habdleapiError";
import { useAuth } from "../../modules/auth/AuthContext";

export default function UsersList() {
  const { user, setUser } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  async function load() {
    try {
      const res = await fetchUser();
      setItems(res);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      alert("Erro ao carregar usuários.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setForm({
      nameUser: "",
      email: "",
      password: "",
      status_permission: "User",
    });
    setImageFile(null);
  }

  function startEdit(row) {
    setSelectedItem("");
    setForm({
      ...row,
      nameUser: row.nameUser || "",
      email: row.email || "",
      status_permission: row.status_permission || "User",
      targetUserId: 0,
    });
    setImageFile(null);
  }

  async function save() {
    try {
      if (form.idUser) {
        // Para edição - usar as rotas PATCH específicas
        await updateUser();
      } else {
        // Para criação - usar a rota de registro
        await createUser();
      }

      setForm(null);
      setImageFile(null);
      load();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário. Verifique os dados e tente novamente.");
    }
  }

  async function createUser() {
    const formData = new FormData();

    // Adicionar campos do formulário
    formData.append("nameUser", form.nameUser);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("status_permission", form.status_permission);

    // Adicionar arquivo de imagem se existir
    if (imageFile) {
      formData.append("image_profile", imageFile);
    }

    await api.post("/user/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const handleUpdateItems = async (field, value, targetUserId) => {
    try {
      let response;

      if (field === "image_profile") {
        // Para upload de imagem, usar FormData
        const formData = new FormData();
        formData.append("image_profile", imageFile); // value deve ser o arquivo
        formData.append("targetUserId", targetUserId);

        response = await api.patch(`/user/user/${field}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setUser((prevUser) => ({
          ...prevUser,
          image_profile: response.data.image_profile,
        }));
      } else {
        // Para outros campos (texto)
        response = await api.patch(
          `/user/user/${field}`,
          {
            [field]: value,
            targetUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
            },
          }
        );
      }

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
  };

  async function updateUser() {
    if (selectedItem || form?.targetUserId) {
      handleUpdateItems(
        selectedItem,
        form[selectedItem],
        form?.targetUserId ? form?.targetUserId : form?.idUser
      );
    } else {
      alert("Por favor, selecione um campo para atualizar.");
    }
  }

  async function remove(row) {
    if (confirm(`Excluir usuário ${row.nameUser}?`)) {
      try {
        await api.delete(`/user/${row.idUser}/delete`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        load();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário. Você tem permissão para excluir?");
      }
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Verificar tamanho do arquivo (opcional)
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert("A imagem deve ter no máximo 5MB");
        return;
      }
      setImageFile(file);
    }
  }

  // Filtrar itens baseado na busca
  const filteredItems = items.filter(
    (item) =>
      item.nameUser?.toLowerCase().includes(q.toLowerCase()) ||
      item.email?.toLowerCase().includes(q.toLowerCase()) ||
      item.status_permission?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Usuários
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie os usuários
          </p>
        </div>
        <Button
          onClick={startNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Novo Usuário
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <Input
            className="w-full pl-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/20 transition-colors"
            placeholder="Buscar por nome, email ou função..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={[
          {
            key: "image_profile",
            label: "Foto",
            render: (value, row) => (
              <div className="flex items-center justify-center">
                {value ? (
                  <img
                    src={value}
                    alt={`Foto de ${row.nameUser}`}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            ),
          },
          { key: "nameUser", label: "Nome" },
          { key: "email", label: "E-mail" },
          { key: "status_permission", label: "Função" },
        ]}
        rows={filteredItems}
        onEdit={startEdit}
        onDelete={remove}
      />

      <Modal
        open={!!form}
        onClose={() => {
          setForm(null);
          setImageFile(null);
        }}
        title={
          form?.idUser ? `Editar Usuário ${form.nameUser}` : "Novo Usuário"
        }
        footer={
          <>
            <Button onClick={save}>
              {form?.idUser ? "Atualizar" : "Criar"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setForm(null);
                setImageFile(null);
              }}
            >
              Cancelar
            </Button>
          </>
        }
      >
        {form &&
          (form?.idUser ? (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="md:col-span-2">
                <Label className="font-semibold size-5">
                  Qual item você deseja selecionar?
                </Label>
                <select
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar...</option>
                  <option value="nameUser">Nome</option>
                  <option value={"email"}>Email</option>
                  <option value={"status_permission"}>Permissão</option>
                  <option value={"password"}>Senha</option>
                  <option value={"image_profile"}>Foto de Perfil</option>
                </select>
              </div>
              {selectedItem === "nameUser" && (
                <>
                  <div className="md:col-span-2">
                    <Label>Nome *</Label>
                    <Input
                      value={form.nameUser || ""}
                      onChange={(e) =>
                        setForm({ ...form, nameUser: e.target.value })
                      }
                      placeholder="Digite o nome do usuário"
                      required
                    />
                  </div>
                  {user.idUser !== form?.idUser &&
                    ["admin", "SuperAdmin"].includes(
                      user.status_permission
                    ) && (
                      <div className="md:col-span-2">
                        <Label>Id do Usuário *</Label>
                        <select
                          onChange={(e) =>
                            setForm({ ...form, targetUserId: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outiline-none"
                        >
                          <option value={""}>Selecionando...</option>
                          <option value={`${form?.idUser}`}>
                            {form?.nameUser}
                          </option>
                        </select>
                      </div>
                    )}
                </>
              )}
              {selectedItem === "email" && (
                <div className="md:col-span-2">
                  <Label>Email *</Label>
                  <Input
                    value={form.email || ""}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Digite o nome do usuário"
                    required
                  />
                </div>
              )}
              {selectedItem === "status_permission" && (
                <div className="md:col-span-2">
                  <Label>Permissão *</Label>
                  <Input
                    value={form.status_permission || ""}
                    onChange={(e) =>
                      setForm({ ...form, status_permission: e.target.value })
                    }
                    placeholder="Digite o nome do usuário"
                    required
                  />
                </div>
              )}
              {selectedItem === "password" && (
                <div className="md:col-span-2">
                  <Label>Senha *</Label>
                  <Input
                    value={form.password || ""}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Digite o nome do usuário"
                    required
                  />
                </div>
              )}
              {selectedItem === "image_profile" && (
                <>
                  <div className="md:col-span-2">
                    <Label>Imagem de Perfil</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Formatos: JPG, PNG, GIF (máx. 5MB)
                    </p>
                    {imageFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Nova imagem selecionada: {imageFile.name}
                      </p>
                    )}
                    {form.image_profile && !imageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Imagem atual:</p>
                        <img
                          src={form.image_profile}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover mt-1 border"
                        />
                      </div>
                    )}
                  </div>

                  {user.idUser !== form?.idUser &&
                    ["admin", "SuperAdmin"].includes(
                      user.status_permission
                    ) && (
                      <div className="md:col-span-2">
                        <Label>Id do Usuário *</Label>
                        <select
                          onChange={(e) =>
                            setForm({ ...form, targetUserId: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outiline-none"
                        >
                          <option value={""}>Selecionando...</option>
                          <option value={`${form?.idUser}`}>
                            {form?.nameUser}
                          </option>
                        </select>
                      </div>
                    )}
                </>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Nome *</Label>
                <Input
                  value={form.nameUser || ""}
                  onChange={(e) =>
                    setForm({ ...form, nameUser: e.target.value })
                  }
                  placeholder="Digite o nome do usuário"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label>E-mail *</Label>
                <Input
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Digite o email do usuário"
                  required
                />
              </div>

              {!form.idUser && (
                <div className="md:col-span-2">
                  <Label>Senha *</Label>
                  <Input
                    type="password"
                    value={form.password || ""}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Digite a senha"
                    required
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <Label>Função</Label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.status_permission || "User"}
                  onChange={(e) =>
                    setForm({ ...form, status_permission: e.target.value })
                  }
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label>Imagem de Perfil</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Formatos: JPG, PNG, GIF (máx. 5MB)
                </p>
                {imageFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Nova imagem selecionada: {imageFile.name}
                  </p>
                )}
                {form.image_profile && !imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Imagem atual:</p>
                    <img
                      src={form.image_profile}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover mt-1 border"
                    />
                  </div>
                )}
              </div>

              {form.idUser && (
                <div className="md:col-span-2 text-sm text-gray-500">
                  <p>
                    💡 Para alterar a senha, use a funcionalidade específica de
                    redefinição de senha.
                  </p>
                </div>
              )}
            </div>
          ))}
      </Modal>
    </div>
  );
}
