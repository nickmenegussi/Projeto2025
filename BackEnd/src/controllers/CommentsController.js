const connection = require('../config/db')

exports.viewCommentsByPostByUser = (req, res) => {
    const Post_idPost = req.params.idPost
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM comments 
        WHERE User_idUser = ? AND Post_idPost = ?
        ORDER BY createdDate DESC
        `, [User_idUser, Post_idPost], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result[0].User_idUser !== User_idUser) {
            return res.status(403).json({
                message: "Você não tem permissão para acessar essa seção.",
                success: false,
                data: result
            })
        }   
    })
}