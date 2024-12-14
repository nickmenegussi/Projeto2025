const connection = require("../config/db")

exports.viewLoans = (req, res) => {
    connection.query('SELECT * FROM Loans', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir os trabalhos voluntários.",
              success: true,
              data: result
            })
          }
    })
}

exports.createLoan = (req, res) => {
    const {book_idLibrary, User_idUser} = req.body 

    if(!book_idLibrary || !User_idUser){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    connection.query('INSERT INTO Book(book_idLibrary,User_idUser, returnDate) VALUES(?, ?,  DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY)) ',[book_idLibrary, User_idUser ], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Empréstimo cadastrado com sucesso",
                data: result,
            })
        }
    })
}

exports.updateReturnDate = (req, res) => {
    const idLoans = req.params.id
    const { returnDate  } = req.body

    if (!returnDate || !idLoans) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT idLoans FROM Loans WHERE idLoans = ?', [idLoans], (err, result) => {
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
                message: `O empréstimo do id ${idLoans} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Loans SET returnDate = ? WHERE idLoans = ?', [returnDate, idLoans], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a data do empréstimo do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Retorno do livro atualizada com sucesso.",
            })
        })
    })
}

exports.deleteLoan = (req, res) => {
    const idLoans = req.params.id

    connection.query('SELECT idLoans Loans Book where idLoans = ?', [idLoans], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `O empréstimo do livro com o id ${idLoans}, não existe no nosso sistema. `,
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM Loan where idLoans = ?', [idLoans], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }

                if(result.affectedRows === 0){
                    return res.status(400).json({
                        message: 'Erro ao deletar empréstimo. Verifique os dados e tente novamente.',
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(200).json({
                        message: 'Empréstimo deletado com sucesso',
                        success: true,
                        data: result
                    })
                }
                
            })
        }
    })
}