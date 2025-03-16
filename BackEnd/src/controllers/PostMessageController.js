const connection = require("../config/db")

exports.viewPost = (req, res) => {
  connection.query(`SELECT * 
        FROM Post p
        JOIN Topic t on p.Topic_idTopic = t.idTopic
        ORDER BY p.created_at DESC
    `, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      })
    } else {
      return res.status(200).json({
        message: "Sucesso ao exibir as mensagens.",
        success: true,
        data: result,
      })
    }
  })
}
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de reserva e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewPostByUser = (req, res) => {
  const User_idUser = req.data.id

  connection.query(
    `SELECT * 
        FROM Post p
        JOIN User u on p.User_idUser = u.idUser
        WHERE u.idUser = ? 
        
        `,
    [User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        })
      }
      if (result.length === 0) {
        return response.status(400).json({
          success: false,
          message: `Nenhuma publicação encontrada para este usuário com o ID especificado.`,
        })
      } else {
        return res.status(200).json({
          message: "Publicação encontrada com sucesso.",
          success: true,
          data: result,
        })
      }
    }
  )
}

exports.createPost = (req, res) => {
  const { content, Topic_idTopic, User_idUser } = req.body
  const image = req.file ? req.file.filename : null

  if (!content || !image || !Topic_idTopic || !User_idUser) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
      data: console.log(content, image, Topic_idTopic, User_idUser)
    })
  }
  

  // verificar se a postagem já está publicada
  connection.query(
    "SELECT * FROM Post where content = ? AND User_idUser = ?",
    [content, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao verificar reservas realizados.",
          success: false,
          data: err,
        })
      }

      // Verifica se já existe uma postagem

      if (result.length > 0) {
        return res.status(400).json({
          message: "Já existe uma postagem igual. Por favor, tente novamente.",
          success: false,
        })
      }
      // adicionar um conexão aqui para ver se o topico existe e o usuario
      connection.query(
        "INSERT INTO Post(content, image ,User_idUser, Topic_idTopic) VALUES(?, ?, ?, ?) ",
        [content, image ,User_idUser, Topic_idTopic],
        (errInsert, resultInsert) => {
          if (errInsert) {
            return res.status(500).json({
              message: "Erro ao criar uma publicação.",
              success: false,
              data: errInsert,
            })
          } else {
            return res.status(201).json({
              success: true,
              message: "Publicação criada com sucesso.",
              data: resultInsert,
            })
          }
        }
      )
    }
  )
}

exports.updateContentPost = (req, res) => {
  const idPost = req.params.IdPost
  const User_idUser = req.data.id
  const { content } = req.body

  connection.query(
    "SELECT * FROM Post WHERE idPost = ?",
    [idPost],
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
          success: false,
          message: `A postagem não foi encontrada para ser atualizada!`,
        })
      } else {
        connection.query(
          `UPDATE FROM Post where idPost = ? AND User_idUser = ?`,
          [content, idPost, User_idUser],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao atualizar o conteudo da Postagem.",
                success: false,
                data: err,
              })
            } else {
              return res.status(201).json({
                message: "Conteúdo da postagem foi atualizado com sucesso!",
                success: true,
                data: result,
              })
            }
          }
        )
      }
    }
  )
}

exports.updateImagePost = (req, res) => {
  const idPost = req.params.idPost
  const User_idUser = req.data.id
  const image = req.file ? req.file.filename : null

  connection.query(
    "SELECT * FROM Post WHERE idPost = ?",
    [idPost],
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
          success: false,
          message: `A postagem não foi encontrada para ser atualizada!`,
        })
      } else {
        connection.query(
          `UPDATE Post SET image = ? where idPost = ? AND User_idUser = ?
          `,
          [image, idPost, User_idUser],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao atualizar a imagem da Postagem.",
                success: false,
                data: err,
              })
            } else {
              return res.status(201).json({
                message: "A imagem da postagem foi atualizada com sucesso!",
                success: true,
                data: result,
              })
            }
          }
        )
      }
    }
  )
}

exports.deletePost = (req, res) => {
  const idPost = req.params.idPost
  const User_idUser = req.data.id

  connection.query(
    "SELECT * FROM Post where idPost = ?",
    [idPost],
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
          message: `Não existe postagens ainda. Por favor, crie para poder deletar alguma.`,
          success: false,
          data: err,
        })
      } else {
        connection.query(
          `DELETE FROM Post WHERE idPost = ? AND User_idUser = ?
          `,
          [idPost, User_idUser],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao excluir a postagem. Tente novamente.",
                success: false,
                data: err,
              })
            }
           else {
              return res.status(201).json({
                message: "Exclusão da postagem realizada com sucesso",
                success: true,
                data: result,
              })
            }
          }
        )
      }
    }
  )
}
