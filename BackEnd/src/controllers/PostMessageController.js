const connection = require("../config/db");
const { getIO } = require("../socket/index");

exports.viewPost = (req, res) => {
  const query = `
    SELECT
      p.idPost,
      p.content,
      p.image AS image,
      p.created_at,
      p.updated_at,
      u.idUser AS user_id,
      u.nameUser,
      u.image_profile,
      t.idTopic,
      t.title AS topic_title,
      t.description AS topic_description,
      (SELECT COUNT(*) FROM Likes l WHERE l.Post_idPost = p.idPost) AS likes_count,
      (SELECT COUNT(*) FROM Comments c WHERE c.Post_idPost = p.idPost) AS comments_count
    FROM Post p
    JOIN User u ON p.User_idUser = u.idUser
    JOIN Topic t ON p.Topic_idTopic = t.idTopic
    ORDER BY p.created_at DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      });
    }
    return res.status(200).json({
      message: "Sucesso ao exibir as mensagens.",
      success: true,
      data: results,
    });
  });
};
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de reserva e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewPostByUser = (req, res) => {
  const User_idUser = req.data.id;

  connection.query(
    `SELECT
      p.idPost AS id,
      p.title,
      p.content,
      p.image AS image_url,
      p.created_at,
      p.updated_at,
      u.idUser AS user_id,
      u.username,
      u.profile_picture_url,
      t.idTopic,
      t.title as topic_title,
      t.description As topic_description,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.idPost) AS likes_count,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.idPost) AS comments_count
    FROM Post p
    JOIN User u ON p.User_idUser = u.idUser
    JOIN Topic t on p.Topic_idTopic = t.idTopic
    where u.idUser = ?
    ORDER BY p.created_at DESC
        `,
    [User_idUser],
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
          message: `Nenhuma publicação encontrada para este usuário com o ID especificado.`,
        });
      }
      return res.status(200).json({
        message: "Publicação encontrada com sucesso.",
        success: true,
        data: result,
      });
    }
  );
};

exports.createPost = (req, res) => {
  const { content, Topic_idTopic } = req.body;
  const image = req.file ? req.file.filename : null;
  const User_idUser = req.data.id;

  if (!content || !image || !Topic_idTopic || !User_idUser) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
      data: console.log(content, image, Topic_idTopic, User_idUser),
    });
  }

  // verificar se o topic existe
  connection.query(
    "SELECT idTopic, title, image, User_idUser, created_at FROM Topic where idTopic = ?",
    [Topic_idTopic],
    (errTopic, resultTopic) => {
      if (errTopic) {
        return res.status(500).json({
          message: "Erro ao verificar o tópico.",
          success: false,
          data: errTopic,
        });
      }

      if (resultTopic.length === 0) {
        return res.status(400).json({
          message: "Tópico informado não existe.",
          success: false,
        });
      }

      // verificar se a postagem já está publicada
      connection.query(
        "SELECT * FROM Post where content = ? AND User_idUser = ? ",
        [content, User_idUser],
        (errPost, resultPost) => {
          if (errPost) {
            return res.status(500).json({
              message: "Erro ao verificar post existente.",
              success: false,
              data: errPost,
            });
          }

          if (resultPost.length > 0) {
            return res.status(400).json({
              message:
                "Já existe uma postagem igual. Por favor, tente novamente.",
              success: false,
            });
          }
          connection.query(
            "INSERT INTO Post(content, image ,User_idUser, Topic_idTopic) VALUES(?, ?, ?, ?) ",
            [content, image, User_idUser, Topic_idTopic],
            (errInsert, resultInsert) => {
              if (errInsert) {
                return res.status(500).json({
                  message: "Erro ao criar uma publicação.",
                  success: false,
                  data: errInsert,
                });
              }

              const io = getIO();
              io.emit("postCreated", {
                id: resultInsert.insertId,
                content,
                image,
                User_idUser,
                Topic_idTopic,
              });

              return res.status(201).json({
                success: true,
                message: "Publicação criada com sucesso.",
                data: { id: resultInsert.insertId },
              });
            }
          );
        }
      );
    }
  );
};

exports.updateContentPost = (req, res) => {
  const idPost = req.params.IdPost;
  const User_idUser = req.data.id;
  const { content } = req.body;

  connection.query(
    "SELECT * FROM Post WHERE idPost = ?",
    [idPost],
    (errUpdate, resultUpdate) => {
      if (errUpdate) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: errUpdate,
        });
      }

      if (resultUpdate.length === 0) {
        return res.status(404).json({
          success: false,
          message: `A postagem não foi encontrada para ser atualizada!`,
        });
      }
      connection.query(
        `UPDATE Post SET content = ? where idPost = ? AND User_idUser = ?`,
        [content, idPost, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao atualizar o conteudo da Postagem.",
              success: false,
              data: err,
            });
          }
          return res.status(201).json({
            message: "Conteúdo da postagem foi atualizado com sucesso!",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateImagePost = (req, res) => {
  const idPost = req.params.idPost;
  const User_idUser = req.data.id;
  const image = req.file ? req.file.filename : null;

  connection.query(
    "SELECT * FROM Post WHERE idPost = ?",
    [idPost],
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
          message: `A postagem não foi encontrada para ser atualizada!`,
        });
      }
      connection.query(
        `UPDATE Post SET image = ? where idPost = ? AND User_idUser = ?
          `,
        [image, idPost, User_idUser],
        (errUpdate, resultUpdate) => {
          if (errUpdate) {
            return res.status(500).json({
              message: "Erro ao atualizar a imagem da Postagem.",
              success: false,
              data: errUpdate,
            });
          }
          return res.status(200).json({
            message: "A imagem da postagem foi atualizada com sucesso!",
            success: true,
            data: resultUpdate,
          });
        }
      );
    }
  );
};

exports.deletePost = (req, res) => {
  const idPost = req.params.idPost;
  const User_idUser = req.data.id;

  connection.query(
    "SELECT * FROM Post where idPost = ?",
    [idPost],
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
          message: `Não existe postagens ainda. Por favor, crie para poder deletar alguma.`,
          success: false,
          data: err,
        });
      }
      if (result[0].User_idUser !== User_idUser) {
        return res.status(403).json({
          success: false,
          message: "Você não tem permissão para excluir esta postagem.",
        });
      }
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
            });
          }

          // Emitindo um evento para o socket.io
          const io = getIO();
          io.emit("postDeleted", {
            id: idPost,
          });

          return res.status(200).json({
            message: "Exclusão da postagem realizada com sucesso",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};
