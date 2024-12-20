const connection = require('../config/db')

exports.ViewAllAdmins = (req,res) => {
    connection.query(`SELECT * FROM User WHERE status_permission = 'Admin'`, (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Não foi possível encontrar um usuário com a permissão 'Admin'`,
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir os Admins.',
            success: true,
            data: result
        })
    })
}

exports.ViewOnlyAdminByUser = (req,res) => {
    const idUser = req.params.UserId
    connection.query(`SELECT * FROM User WHERE idUser = ? and status_permission = 'Admin'`, [idUser] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Não foi possível encontrar o usuario desejado.`,
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir o usuario desejado.',
            success: true,
            data: result
        })
    })
}

exports.updateUserNoPermission = (req,res) => {
    const idUser = req.params.UserId
        
    connection.query(`SELECT * FROM User WHERE idUser = ? and status_permission = 'User'`, [idUser] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Não foi possível encontrar o usuario desejado.`,
                success: false,
                data: err
            })
        }

        const user = result[0]

        if(user.status_permission === 'User'){
            connection.query(`UPDATE User SET status_permission = 'Admin' WHERE idUser = ? `, [idUser] , (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao atualizar o nome do livro.",
                        data: err,
                    })
                }

                return res.status(200).json({
                    message: 'Sucesso ao mudar a permissão do usuário.',
                    success: true,
                    data: result
                })
            })
        } 

        return res.status(400).json({
            message: 'Esse usuário já possui uma permissão elevada. Por isso, não tem como mudar.'
        })       
    })
}

exports.updateUserPermissionAdminToUser = (req,res) => {
    const idUser = req.params.UserId
        
    connection.query(`SELECT * FROM User WHERE idUser = ? and status_permission = 'Admin'`, [idUser] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Não foi possível encontrar o usuario desejado.`,
                success: false,
                data: err
            })
        }

        const user = result[0]

        if(user.status_permission === 'Admin'){
            connection.query(`UPDATE User SET status_permission = 'User' WHERE idUser = ? `, [idUser] , (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao atualizar o nome do livro.",
                        data: err,
                    })
                }

                return res.status(200).json({
                    message: 'Sucesso ao mudar a permissão do usuário.',
                    success: true,
                    data: result
                })
            })
        } 


        return res.status(400).json({
            message: 'Esse usuário já possui uma permissão elevada. Por isso, não tem como mudar.'
        })        
    })
}