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

exports.viewOnlyVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    
    connection.query('SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?', [idVolunteerWork] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }  
        if(result.length === 0){
            return res.status(404).json({
                message: `Erro ao exibir o trabalho voluntário com o id ${idVolunteerWork}. Tente novamente!`
            })
        }
        else {
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

    connection.query('SELECT * FROM VolunteerWork where nameVolunteerWork = ? AND address = ? AND dateVolunteerWork AND work_description = ?', [nameVolunteerWork, address, dateVolunteerWork, work_description], (err, result) => {
        if(err){
            return res.status(500).json({   
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }
        
        if(result.length > 0){ 
            return res.status(409).json({
                message: "Trabalho voluntário já cadastrado.",
                success: false,
                data: err
            })
        }
        connection.query('INSERT INTO VolunteerWork(nameVolunteerWork,address,dateVolunteerWork,work_description) VALUES(?, ?, ?, ?) ',[nameVolunteerWork, address, dateVolunteerWork, work_description], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err
                })
            } 
            return res.status(201).json({
                success: true,
                message: "Trabalho Voluntário cadastrado com sucesso",
                data: result,
            })
            
        })
    })
}

exports.updateNameVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    const { nameVolunteerWork } = req.body

    if (!nameVolunteerWork) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM VolunteerWork where idVolunteerWokr =?', [idVolunteerWork], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Trabalho voluntário não encontrado no nosso sistema. `,
                success: false,
                data: err
            })
        } 

        connection.query('UPDATE VolunteerWork SET nameVolunteerWork = ? WHERE idVolunteerWork = ?', [nameVolunteerWork, idVolunteerWork], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao se conectar com o servidor.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Nome atualizado com sucesso.",
            })
                
         })
    })
}

exports.updateTimeVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    const {timeVolunteerWork} = req.body

    if(!timeVolunteerWork) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE VolunteerWork SET timeVolunteerWork = ? WHERE idVolunteerWork = ?', [timeVolunteerWork, idVolunteerWork], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o nome.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Horário atualizado com sucesso.",
            })
        })
    })
}

// Atualizar Nome do Trabalho Voluntário
exports.updateNameVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    const { nameVolunteerWork } = req.body

    if (!nameVolunteerWork) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE VolunteerWork SET nameVolunteerWork = ? WHERE idVolunteerWork = ?', [nameVolunteerWork, idVolunteerWork], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o nome.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Nome atualizado com sucesso.",
            })
        })
    })
}

// Atualizar Endereço do Trabalho Voluntário
exports.updateAddressVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    const { address } = req.body

    if (!address) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE VolunteerWork SET address = ? WHERE idVolunteerWork = ?', [address, idVolunteerWork], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o endereço.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Endereço atualizado com sucesso.",
            })
        })
    })
}

// Atualizar Data do Trabalho Voluntário
exports.updateDateVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    const { dateVolunteerWork } = req.body

    if (!dateVolunteerWork) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE VolunteerWork SET dateVolunteerWork = ? WHERE idVolunteerWork = ?', [dateVolunteerWork, idVolunteerWork], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a data.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Data do trabalho atualizada com sucesso.",
            })
        })
    })
}

// Atualizar Descrição do Trabalho Voluntário
exports.updateWorkDescriptionVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork
    const { work_description } = req.body

    if (!work_description) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE VolunteerWork SET work_description = ? WHERE idVolunteerWork = ?', [work_description, idVolunteerWork], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a descrição.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Descrição do trabalho atualizada com sucesso.",
            })
        })
    })
}



exports.deleteVolunteerWork = (req, res) => {
    const idVolunteerWork = req.params.idVolunteerWork

    connection.query('SELECT * FROM VolunteerWork where idVolunteerWork = ?', [idVolunteerWork], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
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
                    return res.status(404).json({
                        message: 'Trabalho voluntario não encontrado. Verifique os dados e tente novamente.',
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(201).json({
                        message: 'Trabalho voluntário deletado com sucesso',
                        success: true,
                        data: err
                    })
                }
                
            })
        }
    })
}