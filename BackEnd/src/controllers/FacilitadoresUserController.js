const connection = require("../config/db")

exports.viewAllFacilitadores = (req, res) => {
    connection.query('SELETC * FROM Facilitadores', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Successo ao exibir os usuários facilitadores.',
            success: true,
            data: result
        })
    })
}

exports.viewOnlyFacilitadorById = (req, res) => {
    const User_idUser = req.params.User_idUser

    connection.query(`SELECT * 
        FROM Facilitadores f
        JOIN User u ON u.idUser = f.User_idUser
        WHERE f.User_idUser = ?`, [User_idUser], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Facilitador não encontrado.",
                success: false,
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir o facilitador desejado.',
            success: true,
            data: result
        })
    })
}


exports.viewFacilitadoresByGroupoESDE = (req, res) => {
    connection.query(`SELECT * FROM Facilitadores where category = 'ESDE'`, (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Facilitadores não encontrado.",
                success: false,
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir os facilitadores do grupo ESDE.',
            success: true,
            data: result
        })
    })
}

exports.viewFacilitadoresByGroupoCIEDE = (req, res) => {
    connection.query(`SELECT * FROM Facilitadores where category = 'CIEDE'`, (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Facilitadores não encontrado.",
                success: false,
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir os facilitadores do grupo CIEDE.',
            success: true,
            data: result
        })
    })
}

exports.viewFacilitadoresByGroupoMEDIUNICO = (req, res) => {
    connection.query(`SELECT * FROM Facilitadores where category = 'MEDIUNIDADE'`, (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Facilitadores não encontrado.",
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir os facilitadores do grupo MEDIUNIDADE.',
            success: true,
            data: result
        })
    })
}

exports.createFacilitadores = (req, res) => {
    const {User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen } = req.body

    if(!User_idUser || !description || !apelido || !espiritaSinceTime || !category || !memberSinceWhen){
        return res.status(400).json({
            message: "Dados inválidos.",
            success: false
        })
    }

    connection.query(`INSERT INTO Facilitadores(User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen) VALUES (?, ?, ?, ?, ?, ?)`, [User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        return res.status(201).json({
            message: 'Facilitador criado com sucesso.',
            success: true,
            data: result
        })
    })
}

exports.deleteFacilitadores = (req, res) => {
    const idFacilitador = req.params.idFacilitador

    connection.query('SELECT * FROM Facilitadores WHERE idFacilitador = ?', [idFacilitador], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "Facilitador não encontrado.",
                success: false,
                data: err
            })
        }
        connection.query(`DELETE FROM Facilitadores WHERE idFacilitador = ?`, [idFacilitador], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err
                })
            }
            
            return res.status(201).json({
                message: 'Facilitador deletado com sucesso.',
                success: true,
                data: result
            })
        })
    })
}