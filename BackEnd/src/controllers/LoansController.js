const connection = require("../config/db");
const nodemailer = require('nodemailer')

exports.viewAllLoans = (req, res) => {
  connection.query("SELECT * FROM Loans", (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      });
    } else {
      return res.status(200).json({
        message: "Sucesso ao exibir os trabalhos voluntários.",
        success: true,
        data: result,
      });
    }
  });
};
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de empréstimo e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewLoansByUser = (req, res) => {
  const idUser = req.data.id;

  // Fazer um join, pois, eu só vou querer algumas informações ou todas do empréstimo que eu armazenei no carrinho para ,por fim, armazenado como um Empréstimo.
  connection.query(
    `SELECT idLoans, quantity, User_idUser, Book_idLibrary,  nameBook, authorBook, image, tagsBook, bookCategory, date_aquisition, returnDate FROM 
    Loans l, Book b, User u
    where b.idLibrary = l.Book_idLibrary
    AND u.idUser = l.User_idUser
    And u.idUser = ?

        
        `,
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
          success: false,
          message: `Não conseguimos achar os empréstimos dete usuário. Por favor, verifique os dados e tente novamente.`,
        });
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== idUser) {
        {
          return res.status(403).json({
            message: "Você não tem permissão para alterar o empréstimo.",
            success: false,
            data: err,
          });
        }
      }

      return res.status(200).json({
        message: `Sucesso ao exibir os empréstimos do usuario ${idUser}`,
        success: true,
        data: result,
        isBookHasALoan: true,
      });
    }
  );
};

async function sendEmailPurchase(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou outro SMTP
    auth: {
      user: process.env.EMAILAPP,
      pass: process.env.SENHAEMAILAPP,
    },
  });

  await transporter.sendMail({
  from: process.env.EMAILAPP,
  to: data.email,
  subject: "📘 Confirmação de Empréstimo Realizado",
  html: `
  <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9f9f9; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
    
    <!-- Header -->
    <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
      <h2 style="color: white; margin: 0;">📚 Empréstimo Confirmado</h2>
    </div>

    <!-- Body -->
    <div style="padding: 24px; text-align: center;">
      <p style="font-size: 16px; color: #333;">Olá <strong>${data.nameUser}</strong>,</p>
      <p style="font-size: 15px; color: #333;">
        Seu empréstimo foi registrado com sucesso. Abaixo estão os detalhes do seu pedido:
      </p>

      <div style="margin: 20px 0;">
        <img
          src="http://192.168.1.10:3001/uploads/${data.image}"
          alt="Capa do livro ${data.nameBook}"
          style="max-width: 180px; width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
        />
        <p style="font-size: 14px; color: #666; margin-top: 8px;">
          Capa do livro <strong>${data.nameBook}</strong>
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📖 Livro</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.nameBook}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">✍️ Autor</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.authorBook}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">🔢 Quantidade</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.quantity}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📅 Retirada</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.date_at_create}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📅 Devolução</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${data.returnDate}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 15px; color: #333;">
        Agradecemos por utilizar nossa biblioteca. Desejamos uma ótima leitura! 😊
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #555;">
      — Equipe da Biblioteca Espírita Digital
      <br />
      Este e-mail é automático, por favor, não responda.
    </div>
  </div>
`
});
}

exports.createLoan = (req, res) => {
  const Cart_idCart = req.params.Cart_idCart;
  const User_idUser = req.data.id;
  const { Book_idLibrary, quantity } = req.body;

  if (!User_idUser || !Book_idLibrary || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  // Primeiro verifica se o carrinho existe e se a ação é de empréstimo, se não, quer dizer que depois ele pode cadastrar se a ação for de empréstimo
  connection.query(
    `SELECT * FROM Cart where idCart = ?

        `,
    [Cart_idCart],
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
          success: false,
          message: `Não conseguimos localizar o carrinho do item. Por favor, verifique os dados e tente novamente.`,
        });
      }
      if (result[0].action !== "emprestar") {
        return res.status(400).json({
          success: false,
          message:
            "Ação inválida. Apenas carrinhos com a ação 'empréstimo' podem gerar empréstimos.",
        });
      }

      // verificar duplicidade de empréstimos
      if (result[0].action === "emprestar") {
        connection.query(
          "SELECT * FROM Loans where Book_idLibrary = ? and User_idUser = ?",
          [Book_idLibrary, User_idUser],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Erro ao verificar Empréstimos realizados.",
                success: false,
                data: err,
              });
            }

            if (result.length === 0) {
              return res.status(400).json({
                message: "Dados não encontrados com os critérios informados.",
                success: false,
              });
            }

            connection.query(
              "SELECT bookQuantity FROM Book WHERE idLibrary = ?",
              [Book_idLibrary],
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
                    message: "Livro não encontrado ou erro ao acessar estoque.",
                    data: err,
                  });
                }
                const available = result[0].bookQuantity;

                if (available < quantity) {
                  return res.status(400).json({
                    success: false,
                    message: `Quantidade indisponível. Só há ${available} unidade(s) disponível(is).`,
                  });
                }

                connection.query(
                  `INSERT INTO Loans(User_idUser, Book_idLibrary, quantity, returnDate) 
         VALUES(?, ?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY))`,
                  [User_idUser, Book_idLibrary, quantity],
                  (errInsert, resultInsert) => {
                    if (errInsert) {
                      return res.status(500).json({
                        success: false,
                        message: "Erro ao criar empréstimo.",
                        data: errInsert,
                      });
                    }

                    connection.query(
                      "UPDATE Book SET bookQuantity = bookQuantity - ? WHERE idLibrary = ?",
                      [quantity, Book_idLibrary],
                      (errUpdate, result) => {
                        if (errUpdate) {
                          return res.status(500).json({
                            success: false,
                            message:
                              "Erro ao atualizar a quantidade de livros.",
                            data: errUpdate,
                          });
                        }

                        // Verifica a nova quantidade para definir o status
                        connection.query(
                          "SELECT bookQuantity FROM Book WHERE idLibrary = ?",
                          [Book_idLibrary],
                          (errQty, resultQty) => {
                            if (errQty) {
                              return res.status(500).json({
                                success: false,
                                message:
                                  "Erro ao verificar nova quantidade de livros.",
                                data: errQty,
                              });
                            }

                            const newQty = resultQty[0].bookQuantity;
                            let newStatus = "disponível";
                            if (newQty === 0) {
                              newStatus = "emprestado";
                            } else if (newQty < 0) {
                              newStatus = "indisponível"; // só se houve erro de lógica
                            }

                            // Atualiza o status_Available
                            connection.query(
                              "UPDATE Book SET status_Available = ? WHERE idLibrary = ?",
                              [newStatus, Book_idLibrary],
                              (errStatusUpdate) => {
                                if (errStatusUpdate) {
                                  return res.status(500).json({
                                    success: false,
                                    message:
                                      "Erro ao atualizar o status do livro.",
                                    data: errStatusUpdate,
                                  });
                                }

                                connection.query(
                                  `
                                    SELECT 
                                      l.idLoans,
                                      u.nameUser,
                                      u.email,
                                      b.nameBook,
                                      b.authorBook,
                                      b.image,
                                      l.quantity,
                                      DATE_FORMAT(l.date_at_create, '%d/%m/%Y') AS date_at_create,
                                      DATE_FORMAT(l.returnDate, '%d/%m/%Y') AS returnDate
                                    FROM Loans l
                                    JOIN user u ON l.User_idUser = u.idUser
                                    JOIN book b ON l.Book_idLibrary = b.idLibrary
                                    WHERE u.idUser = ? AND b.idLibrary = ?
                                    ORDER BY l.idLoans DESC
                                    LIMIT 1
  `,
                                  [User_idUser, Book_idLibrary],
                                  async (errRecibo, resultRecibo) => {
                                    if (errRecibo) {
                                      return res.status(500).json({
                                        success: false,
                                        message:
                                          "Erro ao buscar dados do recibo.",
                                        data: errRecibo,
                                      });
                                    }

                                    if (
                                      
                                      resultRecibo.length === 0
                                    ) {
                                      return res.status(404).json({
                                        success: false,
                                        message:
                                          "Nenhum empréstimo encontrado para gerar recibo.",
                                      });
                                    }

                                    const recibo = resultRecibo[0];

                                    try {
                                      await sendEmailPurchase(recibo); // envia o e-mail antes de deletar o carrinho
                                    } catch (emailError) {
                                      console.error(
                                        "Erro ao enviar e-mail:",
                                        emailError
                                      );
                                    }

                                    connection.query(
                                      `DELETE FROM Cart WHERE idCart = ?`,
                                      [Cart_idCart],
                                      (errDelete) => {
                                        if (errDelete) {
                                          return res.status(500).json({
                                            success: false,
                                            message:
                                              "Erro ao remover o item do carrinho.",
                                            data: errDelete,
                                          });
                                        }

                                        return res.status(201).json({
                                          success: true,
                                          message:
                                            "Empréstimo realizado com sucesso! Recibo enviado por e-mail.",
                                        });
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    }
  );
};

exports.updateReturnDate = (req, res) => {
  const idLoans = req.params.LoansId;
  const { returnDate } = req.body;
  const idUser = req.data.id;

  if (!returnDate || !idLoans) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  connection.query(
    `SELECT * FROM Loans where idLoans = ?`,
    [idLoans],
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
          message: `O empréstimo do id ${idLoans} não existe no nosso sistema.`,
        });
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== idUser) {
        {
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          });
        }
      }

      connection.query(
        ` UPDATE Loans l
            JOIN Cart c on l.Cart_idCart = c.idCart
            JOIN User u on c.User_idUser = u.idUser
            SET l.returndate = ? 
            WHERE l.idLoans = ? AND u.idUser = ?

            `,
        [returnDate, idLoans, idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Erro ao atualizar a data do empréstimo do livro.",
              data: err,
            });
          }

          return res.status(201).json({
            success: true,
            message: "Retorno do livro atualizada com sucesso.",
            data: result,
          });
        }
      );
    }
  );
};

exports.deleteLoan = (req, res) => {
  const idLoans = req.params.LoansId;
  const idUser = req.data.id;

  connection.query(
    `
        SELECT * FROM Loans where idLoans = ?`,
    [idLoans],
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
          message: `O empréstimo do livro com o id ${idLoans}, não existe no nosso sistema. `,
          success: false,
          data: err,
        });
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (result[0].User_idUser !== User_idUser) {
        {
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          });
        }
      }
      connection.query(
        `DELETE l FROM Loans l
                    JOIN Cart c on l.Cart_idCart = c.idCart
                    JOIN User u on c.User_idUser = u.idUser
                    WHERE l.idLoans = ? AND u.idUser = ?`,
        [idLoans, idUser],
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
                "Erro ao deletar empréstimo. Verifique os dados e tente novamente.",
              success: false,
              data: err,
            });
          } else {
            return res.status(201).json({
              message: "Empréstimo deletado com sucesso",
              success: true,
              data: result,
            });
          }
        }
      );
    }
  );
};
