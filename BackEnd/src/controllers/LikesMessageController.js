const connection = require("../config/db")

exports.viewLikeMessages = (req, res) => {
    connection.query('SELECT * FROM Likes', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir as mensagens curtidas.",
              success: true,
              data: result
            })
          }
    })
}
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de reserva e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewLikeMessagesByUser = (req, res) => {
    const Post_idPost = req.params.id 
    const User_idUser = req.params.id

    connection.query(`SELECT * 
        FROM Likes l
        JOIN Post p on l.Post_idPost = p.idPost
        JOIN User u l.User_idUser = u.idUser
        And u.idUser = ? AND l.Post_idPost = ? 
        
        `, [User_idUser, Post_idPost] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } 
        if(result.length === 0) {
            return response.status(400).json({
                success: false,
                message: `Não há likes ainda em nenhuma publicação`,
              })
        }
        else {
            return res.status(200).json({
              message: "Sucesso ao exibir as curtidas das postagens.",
              success: true,
              data: result
            })
          }
    })
}

exports.createLikes = (req, res) => {
    const idLikes = req.params.LikesId 
    const Post_idPost = req.params.PostId 
    const User_idUser = req.params.UserId 


    if(!idLikes){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    // Primeiro verifica se o carrinho existe e se a ação é de empréstimo, se não, quer dizer que depois ele pode cadastrar se a ação for de empréstimo
    connection.query(`
            SELECT Post_idPost, User_idUser FROM Likes where idLIkes = ?
            
        `, [idLikes], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err
                })
            }
            if(result.length === 0){
                return res.status(404).json({
                    success: false,
                    message: `Não conseguimos localizar as curtidas da postagem. Por favor, verifique os dados e tente novamente.`,
                })
                
            } 
            else {
                // verificar se a postagem já está curtida
                    connection.query('SELECT * FROM Likes where Post_idPost = ? AND User_idUser = ?', [Post_idPost, User_idUser], (err, result) => {
                        if(err){
                            return res.status(500).json({
                                message: "Erro ao verificar reservas realizados.",
                                success: false,
                                data: err
                            })
                        }

                        // Verifica se já existe uma curtida para a publicação

                        if(result.length > 0){
                            return res.status(400).json({
                                message: 'Essa mensagem já foi curtida.',
                                success: false
                            })
                        }

                        connection.query('INSERT INTO Likes(Post_idPost, User_idUser) VALUES(?, ?) ',[Post_idPost,User_idUser], (errInsert, resultInsert) => {
                            if(errInsert){
                                return res.status(500).json({
                                    message: "Erro ao curtir postagem",
                                    success: false,
                                    data: errInsert
                                })
                            } else {
                                return res.status(200).json({
                                    success: true,
                                    message: "Mensagem curtida com sucesso.",
                                    data: resultInsert,
                                })
                            }
                
                        })     
                    })
                //  else {
                // return res.status(400).json({
                //     success: false,
                //     message: "Ação inválida. Apenas carrinhos com a ação 'reserva' podem gerar reserva.",
                // })
            }            
        }
    )
    
}


exports.deleteLike = (req, res) => {
    const idLikes = req.params.id

    connection.query('SELECT idLikes FROM Likes Book where idLikes = ?', [idLikes], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Não existe curtidas da atual mensagem no nosso sistema ainda.`,
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM Likes where idLikes = ?', [idLikes], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }

                if(result.affectedRows === 0){
                    return res.status(400).json({
                        message: `Erro ao desfazer curtida da postagem. Verifique os dados e tente novamente.`,
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(200).json({
                        message: 'Curtida desfeita com sucesso',
                        success: true,
                        data: result
                    })
                }
                
            })
        }
    })
}