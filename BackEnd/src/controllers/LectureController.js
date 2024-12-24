const connection = require('../config/db')

exports.viewAllLectures = (req, res) => {
    connection.query(`SELECT * FROM lectures`, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma aula encontrada.",
                success: false,
                data: result
            })
        } 
    })
}

exports.viewLecturesById = (req, res) => { 
    const { idLecture } = req.params.idLecture

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        return res.status(200).json({
            message: "Palestra encontrada.",
            success: true,
            data: result
        })
    })
}

exports.createLecture = (req, res) => {
    const { nameLecture, description, dateLecture, link, timeLecture, link_url} = req.body

    connection.query('SELECT * FROM Lecture where nameLecture = ? AND description = ? AND dateLecture = ? AND link = ? AND timeLecture = ? AND link_url = ?', [nameLecture, description, dateLecture, link, timeLecture, link_url], (err, result) => {  
    
    
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length > 0){
            return res.status(409).json({
                message: "Palestra já cadastrada.",
                success: false,
                data: result
            })
        } 
            
         connection.query(`INSERT INTO lectures (nameLecture, description, dateLecture, link, timeLecture, link_url) VALUES (?, ?, ?, ?, ?, ?)`, [nameLecture, description, dateLecture, link, timeLecture, link_url], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                })
                } 
            })

            return res.status(201).json({
                message: "Palestra criada com sucesso.",
                success: true,
                data: result
            })
    })
}

exports.updateLectureName = (req, res) => {
    const { idLecture } = req.params.idLecture 
    const { nameLecture } = req.body

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`UPDATE lectures SET nameLecture = ? WHERE idLecture = ?`, [nameLecture, idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Palestra atualizada com sucesso.",
                success: true,
                data: result
            })
        })
    })
}

exports.updateLectureDate = (req, res) => {
    const { idLecture } = req.params.idLecture
    const { dateLecture } = req.body

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`UPDATE lectures SET dateLecture = ? WHERE idLecture = ?`, [dateLecture, idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar a data da palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Data da Palestra atualizada com sucesso.",
                success: true,
                data: result
            })
        })
    })

}

exports.updateLectureTime = (req, res) => {
    const { idLecture } = req.params.idLecture
    const { timeLecture } = req.body

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`UPDATE lectures SET timeLecture = ? WHERE idLecture = ?`, [timeLecture, idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar o horário da palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Horário da Palestra atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })

}

exports.updateLectureDescription = (req, res) => {
    const { idLecture } = req.params.idLecture
    const { description } = req.body

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`UPDATE lectures SET description = ? WHERE idLecture = ?`, [description, idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar a descrição da palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Descrição da Palestra atualizada com sucesso.",
                success: true,
                data: result
            })
        })
    })


}

exports.updateLectureLink = (req, res) => {
    const { idLecture } = req.params.idLecture
    const { link } = req.body

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`UPDATE lectures SET link = ? WHERE idLecture = ?`, [link, idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar o link da palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Link da Palestra atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })

}

exports.updateLectureVideoUrl = (req, res) => {
    const { idLecture } = req.params.idLecture
    const { link_url } = req.body

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`UPDATE lectures SET link_url = ? WHERE idLecture = ?`, [link_url, idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao atualizar o link do vídeo da palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Link do vídeo da Palestra atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })
}

exports.deleteLecture = (req, res) => {
    const { idLecture } = req.params.idLecture

    connection.query(`SELECT * FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhuma palestra encontrada.",
                success: false,
                data: result
            })
        } 

        connection.query(`DELETE FROM lectures WHERE idLecture = ?`, [idLecture], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            if(result.affectedRows === 0){
                return res.status(400).json({
                    message: "Erro ao deletar a palestra.",
                    success: false,
                    data: result
                })
            } 

            return res.status(200).json({
                message: "Palestra deletada com sucesso.",
                success: true,
                data: result
            })
        })
    })
}   