const connection = require("../config/db");
const pool = require("../config/promise");
const nodemailer = require("nodemailer");

exports.viewReserves = (req, res) => {
  connection.query("SELECT * FROM Reserves", (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      });
    } else {
      return res.status(200).json({
        message: "Sucesso ao exibir os livros reservados",
        success: true,
        data: result,
      });
    }
  });
};
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de reserva e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewReservesByUser = (req, res) => {
  const idUser = req.data.id;
  const userData = req.data;

  connection.query(
    `SELECT idReserved, quantity, User_idUser, Book_idLibrary,  nameBook, authorBook, image, tagsBook, bookCategory, r.date_at_create, returnDate
        FROM Reserves r
        JOIN Book b ON r.Book_idLibrary = b.idLibrary 
        JOIN User u on r.User_idUser = u.idUser 
        WHERE u.idUser = ? 
        
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
        return response.status(400).json({
          success: false,
          message: `Não há itens reservados ainda!`,
          reserves: [],
          HasAReserve: false,
        });
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (
        result[0].User_idUser !== idUser &&
        userData.role !== "Admin" &&
        userData.role !== "SuperAdmin"
      ) {
        {
          return res.status(403).json({
            message: "Você não tem permissão para ver o tópico.",
            success: false,
          });
        }
      }

      return res.status(200).json({
        message: "Sucesso ao exibir os livros reservados",
        success: true,
        data: result,
        HasAReserve: true,
      });
    }
  );
};
exports.processReservation = async (item, User_idUser) => {
  const { idCart, Book_idLibrary, quantity } = item;

  try {
    const [cartResult] = await pool.query(
      "SELECT * FROM Cart WHERE idCart = ?",
      [idCart]
    );

    if (cartResult.length === 0) {
      throw new Error("Carrinho não encontrado");
    }

    if (cartResult[0].action !== "reservar") {
      throw new Error("Ação inválida para reservar");
    }

    const [bookResult] = await pool.query(
      "SELECT bookQuantity, status_Available FROM Book WHERE idLibrary = ?",
      [Book_idLibrary]
    );

    if (bookResult.length === 0) {
      throw new Error("Livro não encontrado");
    }

    const available = bookResult[0].bookQuantity;
    const currentStatus = bookResult[0].status_Available;

    // Verificar se o livro está disponível para reserva
    if (available < quantity || currentStatus === "indisponível") {
      throw new Error(
        `Livro indisponível para reserva. Disponível: ${available}`
      );
    }

    // Inserir na tabela Reserves (permite múltiplas reservas)
    const [reserveResult] = await pool.query(
      `INSERT INTO Reserves(User_idUser, Book_idLibrary, quantity, returnDate) 
       VALUES(?, ?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY))`,
      [User_idUser, Book_idLibrary, quantity]
    );

    // Diminuir a quantidade disponível
    await pool.query(
      "UPDATE Book SET bookQuantity = bookQuantity - ? WHERE idLibrary = ?",
      [quantity, Book_idLibrary]
    );

    const [newQtyResult] = await pool.query(
      "SELECT bookQuantity FROM Book WHERE idLibrary = ?",
      [Book_idLibrary]
    );

    const newQty = newQtyResult[0].bookQuantity;
    let newStatus = "disponível";
    if (newQty === 0) {
      newStatus = "reservado";
    } else if (newQty < 0) {
      newStatus = "indisponível";
    }

    await pool.query(
      "UPDATE Book SET status_Available = ? WHERE idLibrary = ?",
      [newStatus, Book_idLibrary]
    );

    // Gerar recibo
    const [receiptResult] = await pool.query(
      `SELECT 
        r.idReserved,
        u.nameUser,
        u.email,
        b.nameBook,
        b.authorBook,
        b.image,
        r.quantity,
        DATE_FORMAT(r.date_at_create, '%d/%m/%Y') AS date_at_create,
        DATE_FORMAT(r.returnDate, '%d/%m/%Y') AS returnDate
      FROM Reserves r
      JOIN user u ON r.User_idUser = u.idUser
      JOIN book b ON r.Book_idLibrary = b.idLibrary
      WHERE u.idUser = ? AND b.idLibrary = ?
      ORDER BY r.idReserved DESC
      LIMIT 1`,
      [User_idUser, Book_idLibrary]
    );

    if (receiptResult.length === 0) {
      throw new Error("Erro ao gerar recibo da reserva");
    }

    const recibo = receiptResult[0];

    try {
      await sendEmailPurchase(recibo);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
    }

    // Remover do carrinho após sucesso
    await pool.query("DELETE FROM Cart WHERE idCart = ?", [idCart]);

    return {
      success: true,
      message: "Reserva realizada com sucesso",
      reserveId: reserveResult.insertId,
    };
  } catch (error) {
    console.error("Erro no processReservation:", error);
    throw new Error(`Falha em reservar o livro: ${error.message}`);
  }
};

exports.deleteReserve = (req, res) => {
  const idReserved = req.params.ReserveId;
  const idUser = req.data.id;
  const userData = req.data;

  connection.query(
    `SELECT * FROM Reserve where idReserved = ?`,
    [idReserved],
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
          message: `A reserva do livro respectivo não existe no nosso sistema. `,
          success: false,
          data: err,
        });
      }

      // verificar se o usuário logado é o mesmo que criou o tópico
      if (
        result[0].User_idUser !== idUser &&
        userData.role !== "Admin" &&
        userData.role !== "SuperAdmin"
      ) {
        {
          return res.status(403).json({
            message: "Você não tem permissão para alterar o tópico.",
            success: false,
            data: err,
          });
        }
      }
      connection.query(
        `DELETE r FROM Reserves r
                JOIN Cart c on r.Cart_idCart = c.idCart
                JOIN User u on c.User_idUser = ? u.idUser
                WHERE r.idReserved = ? AND u.idUser = ?`,
        [idReserved, idUser],
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
              message: `Erro ao deletar reserva do livro. Verifique os dados e tente novamente.`,
              success: false,
              data: err,
            });
          } else {
            return res.status(201).json({
              message: "Reserva do livro deletado com sucesso",
              success: true,
              data: result,
            });
          }
        }
      );
    }
  );
};

async function sendEmailPurchase(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou outro SMTP
    auth: {
      user: process.env.EMAILAPP,
      pass: process.env.SENHAEMAILAPP,
    },tls: {
    rejectUnauthorized: false 
  }
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
`,
  });
}
