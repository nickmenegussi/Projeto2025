const connection = require('../config/db')

// menos verboso, mais elegante e seguro... evita callbacks
// callbacks = É uma função passada como argumento para ser executada depois que uma operação terminar.
exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT c.idComments, c.message, c.createdDate as create_at, u.idUser as user_id, u.nameUser, u.image
        FROM Comments c
        JOIN User u on c.User_idUser = u.user_id
        WHERE c.Post_idPost = ?
        ORDER BY c.created_at ASC
    `, [postId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar comentários.' });
  }
};

exports.createComment = (req, res) => {
    const { Post_idPost, message } = req.body
    const User_idUser = req.data.id

    if (!Post_idPost || !message) {
        return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
    }

    connection.query(`SELECT * FROM posts WHERE Post_idPost = ? AND User_idUser = ? AND message = ?`, [Post_idPost, User_idUser, message], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length > 0){
            return res.status(409).json({
                message: "Comentário duplicado: tente escrever algo diferente.",
                success: false,
                data: err
            })
        } 
        
        connection.query(`INSERT INTO comments (Post_idPost, User_idUser, message) 
        VALUES (?, ?, ?)
        `, [Post_idPost, User_idUser, message], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro interno do servidor ao criar comentário.",
                success: false,
                data: err,
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

        connection.query(`UPDATE comments SET message = ? WHERE idComments = ? AND User_idUser = ?`, [message, idComments, User_idUser], (err, result) => {
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

            // Emitindo um evento para o socket.io
            const io = getIO()
            io.emit('commentDeleted', { idComments, User_idUser })
    
            return res.status(201).json({
                message: "Comentário deletado com sucesso.",
                success: true,
                data: result
            })
        })
    })
}