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

exports.updateUserPermission = (req,res) => {
    const userData = req.data
    const idUser = req.params.idUser
    const {status_permission} = req.body  

    
    if(userData.role !== 'SuperAdmin'){
        return res.status(403).json({
            message: "Você não tem permissão para alterar a permissão de um usuário.",
            success: false
        })
    } 

    
    connection.query(`SELECT * FROM User WHERE idUser = ? and (status_permission = 'User' or status_permission = 'Admin')`, [idUser] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `Usuário não encontrado ou já possui permissão elevada.`,
                success: false,
            })
        }   
         
            connection.query(`UPDATE User SET status_permission = ? WHERE idUser = ? `, [status_permission ,idUser] , (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao atualizar o status do user.",
                        data: err,
                    })
                }

                
                    return res.status(200).json({
                        message: 'Sucesso ao mudar a permissão do usuário.',
                        success: true,
                        data: result
                    })
                

               
            })
        
    })
}

exports.DeleteUserAdmin = (req, res) => {
    const idUser = req.params.idUser
    const role = req.data.role



}