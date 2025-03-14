const connection = require("../config/db")

exports.viewOnlyTopicById = (req, res) => {
  const idTopic = req.params.topicId
  connection.query(
    "SELECT * FROM Topic where idTopic = ?",
    [idTopic, ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        })
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: `O tópico com o id ${idTopic} não existe no nosso sistema.`,
          success: false,
        })
      } else {
        return res.status(200).json({
          message: "Sucesso ao exibir o topico da postagem.",
          success: true,
          data: result,
        })
      }
    }
  )
}

exports.viewAllTopic = (req, res) => {
  connection.query("SELECT * FROM Topic", (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      })
    } else {
      return res.status(200).json({
        message: "Sucesso ao exibir todos os tópicos das postagens.",
        success: true,
        data: result,
      })
    }
  })
}

exports.createTopic = async (req, res) => {
  const { title, description } = req.body
  const User_idUser = req.data.id

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    })
  }



  connection.query(
    "SELECT * FROM Topic WHERE title = ? AND description = ?",
    [title, description],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        })
      }

      if (result.length > 0) {
        return res.status(409).json({
          message:
            "Já existe um tópico com o mesmo título e descrição. Por favor, tente novamente.",
          success: false,
        })
      } else {
        connection.query(
          "INSERT INTO Topic(title,description, User_idUser) VALUES(?, ?, ?)",
          [title, description, User_idUser],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao criar um novo tópico",
                success: false,
                data: err,
              })
            }
            return res.status(200).json({
              success: true,
              message: "Tópico cadastrado com sucesso",
              data: result,
            })
          }
        )
      }
    }
  )
}

exports.updateTitle = (req, res) => {
  const idTopic = req.params.topicId
  const { title } = req.body
  const User_idUser = req.data.id

  if (!idTopic || !title) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    })
  }

  connection.query(
    "SELECT * FROM Topic WHERE idTopic = ? and User_idUser = ?",
    [idTopic, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        })
      }

      if (result.length === 0) {
        return res.status(404).json({
          message:
            "Tópico não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        })
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== User_idUser) {
        
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          })
        
      }

      const updateInformation = ` UPDATE Topic
                        SET title = ?
                        WHERE idTopic = ? AND User_idUser = ?
                `
      connection.query(
        updateInformation,
        [title, idTopic, User_idUser],
        (err, result) => {
          if (result) {
            return res.status(200).json({
              message: "Sucesso ao alterar o tópico da postagem.",
              success: true,
              data: result,
            })
          }
          return res.status(400).json({
            message:
              "Não foi possível alterar as informações. Tente novamente.",
            success: false,
            data: err,
          })
        }
      )
    }
  )
}

exports.updateDescription = (req, res) => {
  const idTopic = req.params.topicId
  const { description } = req.body
  const User_idUser = req.data.id

  if (!description) {
    return res.status(400).json({
      success: false,
      message: "O campo 'descrição' é obrigatório.",
    })
  }

  connection.query(
    "SELECT * FROM Topic WHERE idTopic = ? WHERE User_idUser = ?",
    [idTopic, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Erro ao se conectar com o servidor.",
          data: err,
        })
      }
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Não foi possível mudar o tópico. Tente novamente.",
        })
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== User_idUser) {
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          })
        
      }

      connection.query(
        ` UPDATE Topic
            SET description = ?
            WHERE idTopic = ? AND User_idUser = ?`,
        [description, idTopic, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Erro ao se conectar com o servidor.",
              data: err,
            })
          }

          return res.status(200).json({
            success: true,
            message: "Tópico atualizado com sucesso.",
          })
        }
      )
    }
  )
}

exports.updateTopicImage = (req, res) => {
  const image = req.file ? req.file.filename : null
  const idTopic = req.params.topicId
  const User_idUser = req.data.id

  if (!image) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    })
  }

  connection.query(
    "SELECT * FROM Topic WHERE idTopic = ? WHERE User_idUser = ?",
    [idTopic, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        })
      }

      if (result.length === 0) {
        return res.status(404).json({
          message:
            "Topico não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        })
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== User_idUser) {
        
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          })
        
      }

      const updateInformation = `UPDATE Topic
                    SET image = ?
                    WHERE idTopic = ? AND User_idUser = ?`
      connection.query(
        updateInformation,
        [image, idTopic, User_idUser],
        (errUpdateImgProfile, resultUpdateImgProfile) => {
          if (errUpdateImgProfile) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            })
          }
          return res.status(201).json({
            message: "Sucesso ao alterar a imagem do tópico.",
            success: true,
            data: resultUpdateImgProfile,
          })
        }
      )
    }
  )
}

exports.deleteTopic = (req, res) => {
  const idTopic = req.params.topicId
  const User_idUser = req.data.id

  if (!idTopic) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    })
  }
  connection.query(
    "SELECT * FROM Topic WHERE idTopic = ? WHERE User_idUser = ?",
    [idTopic, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        })
      }

      if (result.length === 0) {
        return res.status(400).json({
          message:
            "Tópico não encontrado. Verifique os dados e tente novamente.",
          success: false,
          data: err,
        })
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== User_idUser) {
        
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          })
        
      }

      connection.query(
        `DELETE FROM Topic WHERE idTopic = ? AND User_idUser = ?
                `,
        [idTopic, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao deletar tópico.",
              success: false,
              data: err,
            })
          }
          return res.status(201).json({
            message: "Tópico deletado com sucesso",
            success: true,
            data: result,
          })
        }
      )
    }
  )
}
