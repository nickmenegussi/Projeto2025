const connection = require("../config/db")

exports.viewCartAll = (req, res) => {
  const idUser = req.data.id
  connection.query(`SELECT c.*, b. *
FROM Cart c
JOIN Book b ON c.Book_idLibrary = b.idLibrary
WHERE c.User_idUser = ?`, [idUser] ,(err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      })
    } else {
      return res.status(200).json({
        message: "Sucesso ao exibir os livros reservados",
        success: true,
        data: result,
      })
    }
  })
}

exports.viewCartByUser = (req, res) => {
  const idUser = req.params.idUser
  const idLibrary = req.params.idLibrary

  connection.query(
    `SELECT * FROM Cart c, User u, Book b
            WHERE c.User_idUser = u.idUser 
            AND c.Book_idLibrary = b.idLibrary
            AND u.idUser = ? and b.idLibrary = ?
        `,
    [idUser, idLibrary],
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
          message: `Não há itens adicionados ao carrinho ainda!`,
        })
      } else {
        return res.status(200).json({
          message: "Sucesso ao exibir o carrinho.",
          success: true,
          data: result,
        })
      }
    }
  )
}

exports.updateAction = (req, res) => {
  const idCart = req.params.id
  const { action } = req.body

  if (!action || !idCart) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    })
  }

  connection.query(
    "SELECT * FROM Cart WHERE idCart = ?",
    [idCart],
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
          message: `Não foi possível encontrar o respectivo carrinho. Por favor, tente novamente.`,
        })
      }

      connection.query(
        "UPDATE Cart SET action = ? WHERE idCart = ?",
        [idCart],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Erro ao atualizar a categoria do item do carrinho",
              data: err,
            })
          }

          return res.status(201).json({
            success: true,
            message: "A categoria do item do carrinho foi atualizada com sucesso.",
            data: result
          })
        }
      )
    }
  )
}

exports.createCart = (req, res) => {
  const User_idUser = req.data.id
  const { Book_idLibrary, action, quantity } = req.body

  console.log(Book_idLibrary, action, quantity, User_idUser)
  if (!User_idUser || !Book_idLibrary || !action || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    })
  }

  // Verifica se o usuário existe
  connection.query(
    "SELECT * FROM User WHERE idUser = ?",
    [User_idUser],
    (err, userResult) => {
      if (err || userResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        })
      }

      // Verifica se o livro existe
      connection.query(
        "SELECT * FROM Book WHERE idLibrary = ?",
        [Book_idLibrary],
        (err, bookResult) => {
          if (err || bookResult.length === 0) {
            return res.status(404).json({
              success: false,
              message: "Livro não encontrado.",
            })
          }

          // Verifica se já existe no carrinho
          connection.query(
            "SELECT * FROM Cart WHERE User_idUser = ? AND Book_idLibrary = ? AND quantity = ?",
            [User_idUser, Book_idLibrary, quantity],
            (err, cartResult) => {
              if (err) {
                return res.status(500).json({
                  message: "Erro ao se conectar com o servidor.",
                  success: false,
                  data: err,
                })
              }
              if (cartResult.length > 0) {
                return res.status(200).json({
                  success: true,
                  message: "Quantidade do produto atualizada no carrinho",
                })
              } else {
                // Insere no carrinho
                connection.query(
                  "INSERT INTO Cart(User_idUser, Book_idLibrary, action, quantity) VALUES(?, ?, ?, ?)",
                  [User_idUser, Book_idLibrary, action, quantity],
                  (err, insertResult) => {
                    if (err) {
                      return res.status(500).json({
                        message: "Erro ao criar carrinho.",
                        success: false,
                        data: err,
                      })
                    } else {
                      return res.status(201).json({
                        success: true,
                        message: "Carrinho cadastrado com sucesso",
                        data: insertResult,
                      })
                    }
                  }
                )
              }
            }
          )
        }
      )
    }
  )
}

exports.deleteCart = (req, res) => {
  const idCart = req.params.id

  connection.query(
    "SELECT idCart FROM Cart where idCart = ?",
    [idCart],
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
          message: `Infelizmente, o item ainda não foi adicionado para o carrinho ser removido. `,
          success: false,
          data: err,
        })
      } else {
        connection.query(
          "DELETE FROM Cart where idCart = ?",
          [idCart],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
            }

            if (result.affectedRows === 0) {
              return res.status(400).json({
                message:
                  "Erro ao deletar carrinho. Verifique os dados e tente novamente.",
                success: false,
                data: err,
              })
            } else {
              return res.status(201).json({
                message: "Carrinho deletado com sucesso",
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
