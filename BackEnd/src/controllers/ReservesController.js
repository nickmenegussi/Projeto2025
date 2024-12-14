const connection = require("../config/db")

exports.viewReserves = (req, res) => {
    connection.query('SELECT * FROM Reserves', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir os livros reservados",
              success: true,
              data: result
            })
          }
    })
}

exports.viewReservesByUser = (req, res) => {
    connection.query('SELECT * FROM Reserves', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir os livros reservados",
              success: true,
              data: result
            })
          }
    })
}

exports.createReserves = (req, res) => {
    const {User_idUser, Book_idLibrary} = req.body 

    if(!User_idUser || !Book_idLibrary){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    connection.query('INSERT INTO Reserves(User_idUser,Book_idLibrary, reserveDate) VALUES(?, ?, CURRENT_TIMESTAMP, INTERVAL 7 DAY) ',[User_idUser, Book_idLibrary ], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Livro reservado cadastrado com sucesso",
                data: result,
            })
        }
    })
}

exports.updatereserveDate = (req, res) => {
    const idReserved = req.params.id
    const { reserveDate  } = req.body

    if (!reserveDate || !idReserved) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT idReserved FROM Reserves WHERE idReserved = ?', [idReserved], (err, result) => {
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
                message: `a reserva do livro com o id ${idReserved} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Reserves SET reserveDate = ? WHERE idReserved = ?', [reserveDate, idReserved], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a quantidade do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Retorno da reserva do livro atualizada com sucesso.",
            })
        })
    })
}

exports.deleteReserve = (req, res) => {
    const idReserved = req.params.id

    connection.query('SELECT idReserved Reserves Book where idReserved = ?', [idReserved], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `A reserva do livro com o id ${idReserved}, não existe no nosso sistema. `,
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM Loan where idReserved = ?', [idReserved], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }

                if(result.affectedRows === 0){
                    return res.status(400).json({
                        message: `Erro ao deletar reserva do livro ${idReserved}. Verifique os dados e tente novamente.`,
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(200).json({
                        message: 'Reserva do livro deletado com sucesso',
                        success: true,
                        data: result
                    })
                }
                
            })
        }
    })
}