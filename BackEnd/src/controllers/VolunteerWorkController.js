const connection = require("../config/db")

exports.viewVolunteerWork = (req, res) => {
    connection.query('SELECT * FROM VolunteerWork',(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }  else {
            return res.status(200).json({
              message: "Sucesso ao exibir os trabalhos voluntários.",
              success: true,
              data: result
            })
          }
    })
}

exports.createVolunteerWork = (req, res) => {
    const {nameVolunteerWork, address, dateVolunteerWork, work_description} = req.body

    if(!nameVolunteerWork || !address || !dateVolunteerWork  || !work_description){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }
    connection.query('INSERT INTO VolunteerWork(nameVolunteerWork,address,dateVolunteerWork,work_description) VALUES(?, ?, ?, ?, ?) ',[nameVolunteerWork, address, dateVolunteerWork, work_description], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Trabalho Voluntário cadastrado com sucesso",
                data: result,
            })
        }
    })
}

exports.updateNameVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.id
    const { nameVolunteerWork } = req.body

    if (!nameVolunteerWork) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('UPDATE idVolunteerWork SET nameVolunteerWork = ? WHERE idVolunteerWork = ?', [nameVolunteerWork, idVolunteerWork], (err, result) => {
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
                message: "Trabalho voluntário não encontrado.",
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Nome atualizado com sucesso.",
            })
        }
    })
}

exports.updateAddressVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.id
    const { address } = req.body

    if (!address) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('UPDATE idVolunteerWork SET address = ? WHERE idVolunteerWork = ?', [address, idVolunteerWork], (err, result) => {
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
                message: "Trabalho voluntário não encontrado.",
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Endereço atualizado com sucesso.",
            })
        }
    })
}

exports.updateDateVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.id
    const { dateVolunteerWork } = req.body

    if (!dateVolunteerWork) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('UPDATE idVolunteerWork SET dateVolunteerWork = ? WHERE idVolunteerWork = ?', [dateVolunteerWork, idVolunteerWork], (err, result) => {
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
                message: "Trabalho voluntário não encontrado.",
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Horário do trabalho atualizado com sucesso.",
            })
        }
    })
}

exports.updateWorkDescriptionVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.id
    const { work_description } = req.body

    if (!work_description) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('UPDATE idVolunteerWork SET work_description = ? WHERE idVolunteerWork = ?', [work_description, idVolunteerWork], (err, result) => {
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
                message: "Trabalho voluntário não encontrado.",
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Descrição do trabalho atualizado com sucesso.",
            })
        }
    })
}



exports.deleteVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.id

    connection.query('SELECT idVolunteerWork FROM VolunteerWork where idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status().json({
                message: `O usuário com o id ${idVolunteerWork}, não existe no nosso sistema. `,
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM VolunteerWork where idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }

                if(result.affectedRows === 0){
                    return res.status(400).json({
                        message: 'Trabalho voluntario não encontrado. Verifique os dados e tente novamente.',
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(200).json({
                        message: 'Trabalho voluntário deletado com sucesso',
                        success: true,
                        data: err
                    })
                }
                
            })
        }
    })
}