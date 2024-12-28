const connection = require("../config/db")

exports.viewEventsByUser = (req, res) => {
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM calendar_events 
        WHERE User_idUser = ?
        ORDER BY createdDate DESC
        `, [User_idUser], (err, result) => {
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
        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhum evento encontrado.",
                success: false,
                data: result
            })
        }

        return res.status(200).json({ 
              message: "Eventos encontrados com sucesso.",
              success: true,
              data: result
         })
    })
}

exports.viewAllEvents = (req, res) => {
    connection.query(`SELECT * FROM calendar_events 
        ORDER BY createdDate DESC
        `, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        if(result.length === 0){
            return res.status(404).json({
                message: "Nenhum evento encontrado.",
                success: false,
                data: result
            })
        }

        return res.status(200).json({ 
              message: "Eventos encontrados com sucesso.",
              success: true,
              data: result
         })
    })
}

exports.createEvent = (req, res) => {
    const { title, description, start, end } = req.body
    const User_idUser = req.data.id

    connection.query(`SELECT * FROM CalendarEvents WHERE title = ? AND description = ? AND start = ? AND end = ? AND User_idUser = ?`, [title, description, start, end, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length > 0){
            return res.status(400).json({
                message: "Esse evento já foi criado.",
                success: false,
                data: result
            })
        }

        connection.query(`INSERT INTO CalendarEvents (title, description, start, end, User_idUser) 
        VALUES (?, ?, ?, ?, ?)`, [title, description, start, end, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 

        return res.status(201).json({
            message: "Evento criado com sucesso.",
            success: true,
            data: result
        })
    })
    })
}

exports.updateEventTitle = (req, res) => { 
    const { title } = req.body
    const User_idUser = req.data.id
    const idCalendarEvents = req.params.idCalendarEvents

    if(!title){
        return res.status(400).json({
            message: "Título do evento não informado.",    
            success: false
        })
    }

    connection.query(`SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: "Evento não encontrado.",
                success: false,
                data: result
            })
        }

        connection.query(`UPDATE CalendarEvents SET title = ? WHERE idCalendarEvents = ? AND User_idUser = ?`, [title, idCalendarEvents, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            return res.status(201).json({
                message: "Título do evento atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })

}

exports.updateEventdescription = (req, res) => {   
    const { description } = req.body
    const User_idUser = req.data.id
    const idCalendarEvents = req.params.idCalendarEvents

    if(!description){
        return res.status(400).json({
            message: "Descrição do evento não informada.",    
            success: false
        })
    }

    connection.query(`SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: "Evento não encontrado.",
                success: false,
                data: result
            })
        }

        connection.query(`UPDATE CalendarEvents SET description = ? WHERE idCalendarEvents = ? AND User_idUser = ?`, [description, idCalendarEvents, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            return res.status(201).json({
                message: "Descrição do evento atualizada com sucesso.",
                success: true,
                data: result
            })
        })
    })
}

exports.updateEventStart = (req, res) => {
    const { start } = req.body
    const User_idUser = req.data.id
    const idCalendarEvents = req.params.idCalendarEvents

    if(!start){
        return res.status(400).json({
            message: "Início do evento não informado.",    
            success: false
        })
    }

    connection.query(`SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: "Evento não encontrado.",
                success: false,
                data: result
            })
        }

        connection.query(`UPDATE CalendarEvents SET start = ? WHERE idCalendarEvents = ? AND User_idUser = ?`, [start, idCalendarEvents, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            return res.status(201).json({
                message: "Início do evento atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })
}

exports.updateEventEnd = (req, res) => {
    const { end } = req.body
    const User_idUser = req.data.id
    const idCalendarEvents = req.params.idCalendarEvents

    if(!end){
        return res.status(400).json({
            message: "Fim do evento não informado.",    
            success: false
        })
    }

    connection.query(`SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: "Evento não encontrado.",
                success: false,
                data: result
            })
        }

        connection.query(`UPDATE CalendarEvents SET end = ? WHERE idCalendarEvents = ? AND User_idUser = ?`, [end, idCalendarEvents, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            return res.status(201).json({
                message: "Fim do evento atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })

}

exports.updateAttachment = (req, res) => {
    const { attachment } = req.body
    const User_idUser = req.data.id
    const idCalendarEvents = req.params.idCalendarEvents

    if(!attachment){
        return res.status(400).json({
            message: "Anexo não informado.",    
            success: false
        })
    }

    connection.query(`SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: "Evento não encontrado.",
                success: false,
                data: result
            })
        }

        connection.query(`UPDATE CalendarEvents SET attachment = ? WHERE idCalendarEvents = ? AND User_idUser = ?`, [attachment, idCalendarEvents, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            return res.status(201).json({
                message: "Anexo do evento atualizado com sucesso.",
                success: true,
                data: result
            })
        })
    })

}

exports.deleteEvent = (req, res) => {   
    const User_idUser = req.data.id
    const idCalendarEvents = req.params.idCalendarEvents

    connection.query(`SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
              })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: "Evento não encontrado.",
                success: false,
                data: result
            })
        }

        connection.query(`DELETE FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`, [idCalendarEvents, User_idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err,
                  })
            } 

            return res.status(201).json({
                message: "Evento deletado com sucesso.",
                success: true,
                data: result
            })
        })
    })
}   