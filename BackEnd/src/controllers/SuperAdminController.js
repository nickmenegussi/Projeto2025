const connection = require('../config/db')
const bcrypt = require('bcrypt')

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
    const userData = req.data   
    const idUser = req.params.idUser

    if(userData.role !== 'Admin' && userData.role !== 'SuperAdmin'){
        return res.status(403).json({
            message: "Você não tem permissão para visualizar um usuário.",
            success: false
        })
    }

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


exports.updateUserNoPermissionToAdmin = (req,res) => {
    const userData = req.data
    const idUser = req.params.idUser

    if(userData.role !== 'Admin' && userData.role !== 'SuperAdmin'){
        return res.status(403).json({
            message: "Você não tem permissão para atualizar um usuário.",
            success: false
        })
    }

    connection.query(`UPDATE User SET status_permission = 'Admin' WHERE idUser = ?`, [idUser], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Não foi possível encontrar o usuario desejado.`,
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao atualizar o usuario desejado.',
            success: true,
            data: result
        })
    })
}

exports.updateUserPermissionAdminToUser = (req,res) => {
    const userData = req.data
    const idUser = req.params.idUser

    if(userData.role !== 'SuperAdmin'){
        return res.status(403).json({
            message: "Você não tem permissão para atualizar um usuário.",
            success: false
        })
    }

    connection.query(`UPDATE User SET status_permission = 'User' WHERE idUser = ?`, [idUser], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Não foi possível encontrar o usuario desejado.`,
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Sucesso ao atualizar o usuario desejado.',
            success: true,
            data: result
        })
    })
}

