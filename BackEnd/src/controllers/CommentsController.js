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

exports.viewCommentsAllByPost = (req, res) => {
    const Post_idPost = req.params.idPost

    connection.query(`SELECT * FROM comments 
        WHERE Post_idPost = ?
        ORDER BY createdDate DESC
        `, [Post_idPost], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhum comentário encontrado.",
                success: false,
                data: result
            })
        } 

    })
}

exports.createComment = (req, res) => {
    const { Post_idPost, message } = req.body
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM posts WHERE Post_idPost = ? AND User_idUser = ? AND message = ?`, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length > 0){
            return res.status(404).json({
                message: "Esse post já possui um comentário.",
                success: false,
                data: result
            })
        } 
        connection.query(`INSERT INTO comments (Post_idPost, User_idUser, message) 
        VALUES (?, ?, ?)
        `, [Post_idPost, User_idUser, message], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.affectedRows === 0){
            return res.status(400).json({
                message: "Erro ao criar comentário.",
                success: false,
                data: result
            })
        } 

        return res.status(201).json({
            message: "Comentário criado com sucesso.",
            success: true,
            data: result
        })
    })
    })
}

exports.updateComment = (req, res) => {
    const idComments = req.params.idComments
    const { message } = req.body
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM comments WHERE idComments = ? AND User_idUser = ?`, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Comentário não encontrado.",
                success: false,
                data: result
            })
        } 

        if(result[0].User_idUser !== User_idUser) {
            return res.status(403).json({
                message: "Você não tem permissão para acessar essa seção.",
                success: false
            })
        }

        connection.query(`UPDATE comments SET message = ? WHERE idComment = ? AND User_idUser = ?`, [message, idComments, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 
    
            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar comentário.",
                    success: false,
                    data: result
                })
            } 
    
            return res.status(201).json({
                message: "Comentário atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })
}

exports.deleteComment = (req, res) => { 

    const idComments = req.params.idComments
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM comments WHERE idComments = ? AND User_idUser = ?`, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Comentário não encontrado.",
                success: false,
                data: result
            })
        } 

        if(result[0].User_idUser !== User_idUser) {
            return res.status(403).json({
                message: "Você não tem permissão para acessar essa seção.",
                success: false
            })
        }

        connection.query(`DELETE FROM comments WHERE idComments = ? AND User_idUser = ?`, [idComments, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 
    
            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao deletar comentário.",
                    success: false,
                    data: result
                })
            } 
    
            return res.status(201).json({
                message: "Comentário deletado com sucesso.",
                success: true,
                data: result
            })
        })
    })
}