const connection = require('../config/db')

exports.CreateReviewSociety = (req, res) => {
    const { descriptionReview, ratingReview, userId } = req.body

    if(!descriptionReview || !ratingReview || !userId){
        return res.status(400).json({
            message: 'Preencha todos os campos.',
            success: false
        })
    }

    connection.query(`SELECT * FROM ReviewSociety WHERE descriptionReview = ? and ratingReview and userId = ?`, [descriptionReview, ratingReview, userId], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        if(result.length > 0){
            return res.status(422).json({
                message: 'Você já fez uma avalição com os mesmos comentários e avaliações. Faça outro diferente.',
                success: false
            })
        }

        connection.query(`INSERT INTO ReviewSociety (descriptionReview, ratingReview, userId) VALUES (?, ?, ?)`, [descriptionReview, ratingReview, userId], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor.',
                    success: false,
                    data: err
                })
            }

            return res.status(200).json({
                message: 'Avaliação criada com sucesso.',
                success: true,
                data: result
            })
        })
    })
}

exports.ViewReviewSociety = (req, res) => {
    const sortOrder = req.query.sortOrder === 'newSet' ? 'ASC' : 'DESC'

    connection.query(`
        SELECT idReviewSociety, descriptionReview, ratingReview, userId, create_at, nameUser, image_profile FROM ReviewSociety as r
        INNER JOIN User as u on u.idUser = r.userId
        ORDER BY create_at ${sortOrder}

        `, (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Avaliações carregadas com sucesso.',
            success: true,
            data: result
        })
    })
}

exports.UpdateReviewSociety = (req, res) => {
    const {descriptionReview, ratingReview} = req.body 
    const {idReviewSociey} = req.params

    if(!idReviewSociey || !descriptionReview || !ratingReview){
        return res.status(400).json({
            message: 'Preencha todos os campos.',
            success: false
        })
    }

    connection.query('SELECT * FROM ReviewSociety WHERE idReviewSociety = ?', [idReviewSociey], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Essa avaliação ainda não existe.',
                success: false,
                data: err
            })
        }
        connection.query('Update ReviewSociety SET descriptionReview = ?, ratingReview = ? idReviewSociety = ? AND userId = ?', [idReviewSociey, userId], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor.',
                    success: false,
                    data: err
                })
            }

            return res.status(200).json({
                message: 'Avaliação deletada com sucesso.',
                success: true,
                data: result
            })
        })
    })

}

exports.DeleteReviewSociety = (req, res) => {
    const {idReviewSociey} = req.params 
    const {userId} = req.body

    if(!idReviewSociey || !userId){
        return res.status(400).json({
            message: 'Preencha todos os campos.',
            success: false
        })
    }

    connection.query('SELECT * FROM ReviewSociety WHERE idReviewSociety = ? and userId = ?', [idReviewSociey, userId], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Essa avaliação ainda não existe.',
                success: false,
                data: err
            })
        }
        connection.query('DELETE FROM ReviewSociety WHERE idReviewSociety = ? AND userId = ?', [idReviewSociey, userId], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor.',
                    success: false,
                    data: err
                })
            }

            return res.status(200).json({
                message: 'Avaliação deletada com sucesso.',
                success: true,
                data: result
            })
        })
    })
}