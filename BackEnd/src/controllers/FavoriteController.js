const connection = require("../config/db");

exports.viewAllFavoritesByUser = (req, res) => {
  const User_idUser = req.data.id;

  connection.query(
    `SELECT idFavorite, User_idUser, Book_idLibrary, nameBook, authorBook, image, tagsBook, bookCategory, f.date_at_create
FROM Favorite f, Book b, User u
WHERE b.idLibrary = f.Book_idLibrary
AND u.idUser = f.User_idUser
AND u.idUser = ?`,
    [User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Erro ao se conectar com o backend",
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Erro ao encontrar os dados procurados.",
          data: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Sucesso ao Exibir os itens favoritados.",
        data: result,
      });
    }
  );
};

exports.createFavoriteBook = (req, res) => {
  const User_idUser = req.data.id;
  const { Book_idLibrary } = req.body;

  if (!User_idUser || !Book_idLibrary) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  connection.query(
    "SELECT * FROM Favorite where User_idUser = ? and Book_idLibrary = ?",
    [User_idUser, Book_idLibrary],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Esse item já está favoritado!",
          success: false,
        });
      }

      connection.query(
        "INSERT INTO Favorite(User_idUser, Book_idLibrary) VALUES(?, ?)",
        [User_idUser, Book_idLibrary],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Livro Favoritado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};
