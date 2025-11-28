const connection = require("../config/db");
const pool = require("../config/promise");
const bcrypt = require("bcrypt");

exports.viewOnlyUser = (req, res) => {
  const dataUser = req.data.id;
  const roleUser = req.data.role;
  const idUser = req.params.idUser;

  if (
    roleUser !== "Admin" &&
    roleUser !== "SuperAdmin" &&
    dataUser !== idUser
  ) {
    return res.status(403).json({
      message: "Você não tem permissão para acessar este usuário.",
      success: false,
    });
  }

  connection.query(
    "SELECT * FROM User where idUser = ?",
    [idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: `O usuário com o id ${idUser}, não existe no nosso sistema`,
          success: false,
          data: err,
        });
      } else {
        return res.status(200).json({
          message: "Sucesso ao exibir o usuario.",
          success: true,
          data: result,
        });
      }
    }
  );
};

exports.viewAllUser = (req, res) => {
  connection.query(`SELECT * FROM User`, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      });
    } else {
      return res.status(200).json({
        message: "Sucesso ao exibir os usuarios.",
        success: true,
        data: result,
      });
    }
  });
};

exports.register = async (req, res) => {
  const image_profile = null;
  const { nameUser, email, password } = req.body;

  if (!nameUser || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }
  const hash_password = await bcrypt.hash(password, 10);
  connection.query(
    "SELECT * FROM User where nameUser = ? AND email = ?",
    [nameUser, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length > 0) {
        return res.status(422).json({
          message: "Esse usário já existe, por favor, faça login.",
          success: false,
        });
      }

      connection.query(
        "SELECT idUser FROM User where email = ?",
        [email],
        (reqIsEmailAlreadyCreated, resEmailAlreadyCreated) => {
          if (reqIsEmailAlreadyCreated) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if(resEmailAlreadyCreated.length > 0){
            return res.status(409).json({
              message: "Esse email já foi cadastrado, tente fazer login.", 
              success: false
            })
          }

          connection.query(
            "INSERT INTO User(nameUser,email, password ,image_profile, status_permission) VALUES(?, ?, ?, ?, ?)",
            [nameUser, email, hash_password, image_profile, "User"],
            (err, result) => {
              if (err) {
                return res.status(500).json({
                  message: "Erro ao se conectar com o servidor.",
                  success: false,
                  data: err,
                });
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Usuário cadastrado com sucesso",
                  data: result,
                });
              }
            }
          );
        }
      );
    }
  );
};

exports.updateUser = (req, res) => {
  const idUser = req.data.id;
  const { email } = req.body;

  if (!idUser || !email) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  connection.query(
    "SELECT * FROM User WHERE idUser = ?",
    [idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message:
            "Usuario não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        });
      } else {
        const updateInformation = "UPDATE User set email = ? where idUser = ?";
        connection.query(updateInformation, [email, idUser], (err, result) => {
          if (result) {
            return res.status(200).json({
              message: "Sucesso ao alterar informações do usuário.",
              success: true,
              data: result,
            });
          } else {
            return res.status(400).json({
              message:
                "Não foi possível alterar as informações. Tente novamente.",
              success: false,
              data: err,
            });
          }
        });
      }
    }
  );
};

exports.updateUserName = (req, res) => {
  const idUser = req.data.id;
  const { nameUser } = req.body;

  if (!nameUser) {
    return res.status(400).json({
      success: false,
      message: "O campo 'nameUser' é obrigatório.",
    });
  }

  connection.query(
    "SELECT * FROM User WHERE idUser = ?",
    [idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Erro ao se conectar com o servidor.",
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }
      connection.query(
        "UPDATE User SET nameUser = ? WHERE idUser = ?",
        [nameUser, idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Erro ao se conectar com o servidor.",
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              success: false,
              message: "Erro ao atualizar o nome do Usuário.",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Nome atualizado com sucesso.",
            data: result,
          });
        }
      );
    }
  );
};

exports.updateUserPassword = (req, res) => {
  const idUser = req.data.id;
  const { newPassword, currentPassword, confirmedPassword } = req.body;

  if (!idUser || !newPassword || !currentPassword || !confirmedPassword) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  connection.query(
    "SELECT * FROM User WHERE idUser = ?",
    [idUser],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message:
            "Usuario não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        });
      }
      const user = result[0];

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        return res.status(404).json({
          message: "A senha atual está incorreta. Por favor, digite novamente.",
          success: false,
        });
      }

      if (newPassword !== confirmedPassword) {
        return res.status(404).json({
          message:
            "A nova senha digitado não coincide com a confirmada. Por favor, digite novamente.",
        });
      }

      const hashPassword = await bcrypt.hash(newPassword, 15);

      const updateInformation = "UPDATE User set password = ? where idUser = ?";
      connection.query(
        updateInformation,
        [hashPassword, idUser],
        (errPassword, resultPassword) => {
          if (errPassword) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (resultPassword.affectedRows > 0) {
            connection.query(
              "SELECT * FROM USER WHERE idUser = ?",
              [idUser],
              (errUpdatePassword, resultUpdatePassword) => {
                if (errUpdatePassword) {
                  return res.status(400).json({
                    message:
                      "Não foi possível alterar as informações. Tente novamente.",
                    success: true,
                    data: errUpdatePassword,
                  });
                } else {
                  return res.status(200).json({
                    message: "Sucesso ao alterar a senha",
                    success: false,
                    data: resultUpdatePassword,
                  });
                }
              }
            );
          } else {
            return res.status(400).json({
              message:
                "Nenhuma alteração foi feita. Por favor, tente novamente.",
              success: false,
            });
          }
        }
      );
    }
  );
};

exports.updateUserImageProfile = (req, res) => {
  const image_profile = req.file ? req.file.filename : null;
  const idUser = req.data.id;

  if (!idUser) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  connection.query(
    "SELECT * FROM User WHERE idUser = ?",
    [idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message:
            "Usuario não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        });
      } else {
        const updateInformation =
          "UPDATE User set image_profile = ? where idUser = ?";
        connection.query(
          updateInformation,
          [image_profile, idUser],
          (errUpdateImgProfile, resultUpdateImgProfile) => {
            if (errUpdateImgProfile) {
              return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              });
            }

            if (resultUpdateImgProfile.affectedRows === 0) {
              return res.status(500).json({
                message:
                  "Erro ao alterar foto de perfil. Por favor, tente novamente.",
                success: false,
                data: errUpdateImgProfile,
              });
            } else {
              return res.status(200).json({
                message: "Sucesso ao alterar foto de perfil.",
                success: true,
                data: { image_profile: image_profile },
              });
            }
          }
        );
      }
    }
  );
};

exports.deleteAccountUser = (req, res) => {
  const idUser = req.params.idUser;
  const roleUser = req.data.role;
  const dataUser = req.data.id;

  if (!idUser) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  if (
    roleUser !== "Admin" ||
    (roleUser !== "SuperAdmin" && dataUser !== idUser)
  ) {
    return res.status(403).json({
      message: "Você não tem permissão para deletar este usuário.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM User WHERE idUser = ? WHERE status_permission = 'User'`,
    [idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message:
            "Usuario não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        });
      } else {
        connection.query(
          "DELETE FROM User WHERE idUser = ?",
          [idUser],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              });
            }

            if (result.affectedRows === 0) {
              return res.status(400).json({
                message:
                  "Usuario não encontrado. Verifique os dados e tente novamente.",
                success: false,
                data: err,
              });
            } else {
              return res.status(200).json({
                message: "Usuário deletado com sucesso",
                success: true,
                data: result,
              });
            }
          }
        );
      }
    }
  );
};

exports.updateUserForgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email e nova senha de redefinição são obrigatórios",
      });
    }

    const [user] = await pool.query("SELECT * FROM user Where email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "Nenhum usuário encontrado." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [updateForgotPassword] = await pool.query(
      "UPDATE USER SET password = ? WHERE idUser = ?",
      [hashedPassword, user[0].idUser]
    );

    if (updateForgotPassword.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível atualizar a senha.",
      });
    }

    return res.status(200).json({
      message: "Sucesso ao atualizar senha!",
      success: true,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário: ", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar usuário",
      success: false,
    });
  }
};
