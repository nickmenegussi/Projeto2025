// const connection = require("../config/db");
// const { getIO } = require("../socket/index");

// exports.viewLikeMessages = (req, res) => {
//   connection.query("SELECT * FROM Likes", (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Erro ao se conectar com o servidor.",
//         success: false,
//         data: err,
//       });
//     }
//     return res.status(200).json({
//       message: "Sucesso ao exibir as mensagens curtidas.",
//       success: true,
//       data: result,
//     });
//   });
// };
// // Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de reserva e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

// exports.viewLikeMessagesByPost = (req, res) => {
//   const Post_idPost = req.params.PostId;
//   const idUser = req.data.id;

//   connection.query(
//     `SELECT * 
//         FROM Likes l
//         JOIN Post p on l.Post_idPost = p.idPost
//         WHERE l.Post_idPost = ? 
        
//         `,
//     [Post_idPost],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({
//           message: "Erro ao se conectar com o servidor.",
//           success: false,
//           data: err,
//         });
//       }
//       if (result.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: `Não há likes ainda em nenhuma publicação`,
//           liked: false,
//         });
//       }

//       return res.status(200).json({
//         message: "Sucesso ao exibir as curtidas das postagens.",
//         success: true,
//         data: result,
//         liked: true,
//       });
//     }
//   );
// };

// exports.createLikes = (req, res) => {
//   const Post_idPost = req.params.PostId;
//   const User_idUser = req.data.id;

//   if (!Post_idPost) {
//     return res.status(400).json({
//       success: false,
//       message: "ID da publicação é obrigatório.",
//     });
//   }

//   // verificar se a postagem já está curtida
//   connection.query(
//     "SELECT * FROM Likes where Post_idPost = ? AND User_idUser = ?",
//     [Post_idPost, User_idUser],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({
//           message: "Erro ao verificar postagens curtidas.",
//           success: false,
//           data: err,
//         });
//       }

//       // Verifica se já existe uma curtida para a publicação

//       if (result.length > 0) {
//         return res.status(400).json({
//           message: "Essa mensagem já foi curtida.",
//           success: false,
//           liked: true,
//         });
//       }

//       connection.query(
//         "INSERT INTO Likes(Post_idPost, User_idUser) VALUES(?, ?) ",
//         [Post_idPost, User_idUser],
//         (errInsert, resultInsert) => {
//           if (errInsert) {
//             return res.status(500).json({
//               message: "Erro ao curtir postagem",
//               success: false,
//               data: errInsert,
//             });
//           }
//           connection.query(
//             "SELECT COUNT(*) AS totalLikes FROM Likes WHERE Post_idPost = ?",
//             [Post_idPost],
//             (errCount, resultCount) => {
//               if (errCount) {
//                 return res.status(500).json({
//                   success: false,
//                   message: "Erro ao contar o número de likes que a postagem possui.",
//                   data: errCount,
//                 });
//               }

//               return res.status(201).json({
//                 success: true,
//                 message: "Mensagem curtida com sucesso.",
//                 data: resultCount,
//               });
//             }
//           );
//         }
//       );
//     }
//   );
// };

// exports.deleteLike = (req, res) => {
//   const idLikes = req.params.LikesId;
//   const User_idUser = req.data.id;

//   connection.query(
//     "SELECT * FROM Likes where idLikes = ?",
//     [idLikes],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({
//           message: "Erro ao se conectar com o servidor.",
//           success: false,
//           data: err,
//         });
//       }

//       if (result.length === 0) {
//         return res.status(404).json({
//           message: `Não existe curtidas na atual mensagem no nosso sistema ainda.`,
//           success: false,
//           data: err,
//         });
//       }

//       // verificar se o usuário logado é o mesmo que criou o tópico
//       if (result[0].User_idUser !== User_idUser) {
//         {
//           return res.status(403).json({
//             message: "Você não tem permissão para alterar o tópico.",
//             success: false,
//             data: err,
//           });
//         }
//       }
//       connection.query(
//         `DELETE FROM Likes WHERE idLikes = ? AND User_idUser = ?`,
//         [idLikes, User_idUser],
//         (err, result) => {
//           if (err) {
//             return res.status(500).json({
//               message: "Erro ao se conectar com o servidor.",
//               success: false,
//               data: err,
//             });
//           }

//           if (result.affectedRows === 0) {
//             return res.status(400).json({
//               message: `Erro ao desfazer curtida da postagem. Verifique os dados e tente novamente.`,
//               success: false,
//               data: err,
//             });
//           }
//           return res.status(200).json({
//             message: "Curtida desfeita com sucesso",
//             success: true,
//             data: result,
//           });
//         }
//       );
//     }
//   );
// };
