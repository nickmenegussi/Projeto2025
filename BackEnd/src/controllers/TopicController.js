const connection = require("../config/db")

exports.viewOnlyTopicById = (req, res) => {
    const idTopic = req.params.idTopic 
    connection.query('SELECT * FROM Topic where idTopic = ?', [idTopic] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: `O tópico com o id ${idTopic}, não existe no nosso sistema`,
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir o topico da postagem.",
              success: true,
              data: result
            })
          }
    })
}

exports.viewAllTopic = (req, res) => {
    connection.query('SELECT * FROM Topic', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir todos os tópicos das postagens.",
              success: true,
              data: result
            })
          }
    })
}

exports.createTopic = async (req, res) => {
    const image = req.file ? req.file.filename : null
    const {title, description} = req.body

    if(!title || !description){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    connection.query('SELECT * FROM Topic WHERE title = ? AND description = ?', [title, description] , (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            }) 
        }

        if(result.length > 0){
            return res.status(409).json({
                message: "Já existe um tópico com o mesmo título e descrição. Por favor, tente novamente.",
                success: false,
              })
        } else {
            connection.query('INSERT INTO Topic(title,description,image) VALUES(?, ?, ?)', [title, description, image] ,(err,result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao criar um novo tópico",
                        success: false,
                        data: err
                    })
                } 
                return res.status(200).json({
                    success: true,
                    message: "Tópico cadastrado com sucesso",
                    data: result,
                })
                
            })
        }
    })
}

exports.updateTitle = (req, res) => {
    const idTopic = req.params.TopicId 
    const {title} = req.body
 
    if(!idTopic || !title){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    connection.query('SELECT * FROM Topic WHERE idTopic = ?', [idTopic] ,(err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: 'Tópico não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            const updateInformation = 'UPDATE Topic set title = ? where idTopic = ?'
            connection.query(updateInformation, [title, idTopic], (err, result) => {
                if(result){
                    return res.status(200).json({
                        message: 'Sucesso ao alterar o tópico da postagem.',
                        success: true,
                        data: result
                    })
                } 
                return res.status(400).json({
                    message: 'Não foi possível alterar as informações. Tente novamente.',
                    success: false,
                    data: err
                })
                
            })
        }
    })
}

exports.updateDescription = (req, res) => {
    const idTopic = req.params.idTopic
    const { description } = req.body

    if (!description) {
        return res.status(400).json({
            success: false,
            message: "O campo 'descrição' é obrigatório.",
        })
    }
    connection.query('SELECT * FROM Topic WHERE idTopic = ?', [idTopic], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Não foi possível mudar o tópico. Tente novamente.",
            })
        }
    })
    connection.query('UPDATE Topic SET description = ? WHERE idTopic = ?', [description, idTopic], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Tópico atualizado com sucesso.",
        })
    })
}

exports.updateTopicImage = (req, res) => {
    const image = req.file ? req.file.filename : null 
    const idTopic = req.params.id 

    if(!image){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    connection.query('SELECT * FROM Topic WHERE idTopic = ?', [idTopic] ,(err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }
        
        if(result.length === 0){
            return res.status(404).json({
                message: 'Topico não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            const updateInformation = 'UPDATE Topic set image = ? where idTopic = ?'
            connection.query(updateInformation, [image ,idTopic], (errUpdateImgProfile, resultUpdateImgProfile) => {
                if(errUpdateImgProfile){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err,
                    })  
                }
                return res.status(200).json({
                    message: "Sucesso ao alterar a imagem do tópico.",
                    success: true,
                    data: resultUpdateImgProfile,
                })   
                
            })
        }
    }
    )
}

exports.deleteTopic = (req, res) => {
    const idTopic = req.params.id 

    if(!idTopic){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }
    connection.query('SELECT * FROM Topic WHERE idTopic = ?', [idTopic] ,(err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }
        
        if(result.length === 0){
            return res.status(400).json({
                message: 'Tópico não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM Topic WHERE idTopic = ?', [idTopic] ,(err, result) => {
                if(err) {
                    return res.status(500).json({
                        message: "Erro ao deletar tópico.",
                        success: false,
                        data: err
                    })
                }
                return res.status(200).json({
                    message: 'Tópico deletado com sucesso',
                    success: true,
                    data: result
                })
                
             })
    
        }
    })
}

