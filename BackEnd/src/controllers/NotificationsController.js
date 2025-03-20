const connection = require("../config/db")

exports.viewNotificationsByUser = (req, res) => {
    const idNotifications = req.params.idNotification
    const User_idUser = req.data.id

    connection.query(`"SELECT * FROM notifications 
        WHERE User_idUser = ? AND idNotifications = ?
        ORDER BY created_at DESC"
        `, [User_idUser, idNotifications], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result[0].User_idUser !== User_idUser) {
            return res.status(403).json({
                message: "Você não tem permissão para acessar essa seção.",
                success: false,
                data: result
            })
        }


        return res.status(200).json({
            message: "Sucesso ao exibir as notificações do usuário desejado.",
            success: true,
            data: result,
        })
        
    })
}

exports.viewAllNotifications = (req, res) => {
    connection.query(`SELECT * FROM notifications 
        ORDER BY created_at DESC
        `, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        return res.status(200).json({
            message: "Sucesso ao exibir as mensagens curtidas.",
            success: true,
            data: result,
        })
    })
}

exports.createNotification = (req, res) => {
    const {message } = req.body
    const User_idUser = req.data.id

    if(!message){
        return res.status(400).json({
            message: "Por favor, insira uma mensagem.",
            success: false,
        })
    }

    connection.query(`INSERT INTO notifications (message, isRead ,User_idUser)
        VALUES (?, ? ,?)
        `, [message, false, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        return res.status(201).json({
            message: "Sucesso ao criar a mensagem.",
            success: true,
            data: result,
        })
    })
}

exports.getNotificationsStatusofRead = (req, res) => {
    const idNotifications = req.params.idNotification
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM notifications 
        WHERE User_idUser = ? AND idNotifications = ?
        
        `, [User_idUser, idNotifications], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Mensagem não encontrada.",
                success: false,
                data: err,
            })
        }

        if(result[0].isRead === true){
            return res.status(201).json({
                message: "Mensagem lida.",
                success: true,
                data: result,
            })
        } 
        return res.status(201).json({
            message: "Mensagem não lida.",
            success: true,
            data: result,
        })
        
    })
}

exports.updateNotificationStatusofRead = (req, res) => {
    const idNotifications = req.params.idNotification
    const User_idUser = req.data.id

    connection.query('SELECT * FROM notifications WHERE User_idUser = ? AND idNotifications = ?', [User_idUser, idNotifications], (err, result) => { 
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Notificação não encontrada.",
                success: false,
                data: err,
            })
        }
        
        if(result[0].User_idUser !== User_idUser){
            return res.status(403).json({
                message: "Você não tem permissão para deletar essa notificação.",
                success: false,
                data: err,
            })
        }

        connection.query(`UPDATE notifications 
            SET isRead = true
            WHERE User_idUser = ? AND idNotification = ?
            
            `, [User_idUser, idNotifications], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 
    
            return res.status(201).json({
                message: "O status da mensagem foi atualizado.",
                success: true,
                data: result,
            })
            
        })
    })

}

exports.updateNotificationMessage = (req, res) => {
    const idNotifications = req.params.idNotifications
    const User_idUser = req.data.id
    const {message } = req.body

    if(!message){
        return res.status(400).json({
            message: "Por favor, insira uma mensagem.",
            success: false,
            data: null,
        })
    }
    connection.query(`SELECT * FROM notifications 
        WHERE User_idUser = ? AND idNotifications = ?
        
        `, [User_idUser, idNotifications], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Notificação não encontrada.",
                success: false,
                data: err,
            })
        }

        if(result[0].User_idUser !== User_idUser){
            return res.status(403).json({
                message: "Você não tem permissão para deletar essa notificação.",
                success: false,
                data: err,
            })
        }

        connection.query(`UPDATE notifications 
            SET message = ?
            WHERE User_idUser = ? AND idNotifications = ?
            
            `, [message, User_idUser, idNotifications], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 
    
            return res.status(201).json({
                message: "A mensagem foi atualizada.",
                success: true,
                data: result,
            })
            
        })
    })
}

exports.deleteNotification = (req, res) => {
    const idNotifications = req.params.idNotifications
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM notifications 
        WHERE User_idUser = ? AND idNotifications = ?
        
        `, [User_idUser, idNotifications], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        if(result.length === 0){
            return res.status(404).json({
                message: "Notificação não encontrada.",
                success: false,
                data: err,
            })
        }

        if(result[0].User_idUser !== User_idUser){
            return res.status(403).json({
                message: "Você não tem permissão para deletar essa notificação.",
                success: false,
                data: err,
            })
        }

        connection.query(`DELETE FROM notifications 
            WHERE User_idUser = ? AND idNotifications = ?
            
            `, [User_idUser, idNotifications], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 
    
            return res.status(201).json({
                message: "A notificação foi deletada.",
                success: true,
                data: result,
            })
            
        })
    })

}