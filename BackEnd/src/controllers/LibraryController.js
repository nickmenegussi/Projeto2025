const connection = require("../config/db")

exports.viewAllBooks = (req, res) => {
    connection.query('SELECT * FROM Book',(err, result) => {
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

exports.viewOnlyOneBook = (req, res) => {
    const idLibrary = req.params.LibraryId
    connection.query('SELECT * FROM Book where idLibrary = ?', [idLibrary] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }  
        
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
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

exports.createBook = (req, res) => {
    const {namebook, authorBook,overviewBook,curiosityBook  ,tagsBook , bookQuantity ,status_Available} = req.body

    if(!namebook || !authorBook || !tagsBook  || !overviewBook|| !curiosityBook  || !bookQuantity || !status_Available){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    if(tagsBook !== 'Obras Básicas' && tagsBook !== "Obras complementares"){
        return res.status(400).json({
            success: false,
            message: 'Você digitou uma opção que não é válida no nosso sistema. Tente novamente.'        })
    } 
    else if(status_Available !== 'disponível' && status_Available !== 'reservado' && status_Available !== 'emprestado' && status_Available !== 'indisponível'){
        return res.status(400).json({
            success: false,
            message: 'Você digitou uma opção que não é válida no nosso sistema. Tente novamente.'
        })
    } else {
        connection.query('INSERT INTO Book(namebook,author,overviewBook,curiosityBook ,tagsBook, bookQuantity ,status_Available) VALUES(?, ?, ?, ?, ?, ?, ?) ',[namebook, authorBook, overviewBook,curiosityBook ,tagsBook, bookQuantity ,status_Available], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err
                })
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Livro cadastrado com sucesso",
                    data: result,
                })
            }
        })
    }
}

// Atualizar Nome do Livro
exports.updateNameBook = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { nameBook } = req.body

    if (!nameBook) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Book SET nameBook = ? WHERE idLibrary = ?', [nameBook, idLibrary], (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o nome do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Nome do livro atualizado com sucesso.",
            })
        })
    })
}

// Atualizar Autor do Livro
exports.updateAuthorBook = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { authorBook } = req.body

    if (!authorBook) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Book SET author = ? WHERE idLibrary = ?', [authorBook, idLibrary], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o autor.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Autor atualizado com sucesso.",
            })
        })
    })
}

// Atualizar Data do Livro
exports.updateTagBook = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { tagsBook } = req.body

    if (!tagsBook) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Book SET tagsBook = ? WHERE idLibrary = ?', [tagsBook, idLibrary], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a classificação do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Classificação do livro atualizada com sucesso.",
                data: result
            })
        })
    })
}

// Atualizar Descrição do Livro
exports.updateOverView = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { overviewBook } = req.body

    if (!overviewBook) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Book SET overviewBook = ? WHERE idLibrary = ?', [overviewBook, idLibrary], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a descrição do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Descrição do livro atualizada com sucesso.",
                data: result
            })
        })
    })
}

// Atualizar Descrição do Livro
exports.updateCuriosityBook = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { curiosityBook } = req.body

    if (!curiosityBook) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Book SET curiosityBook = ? WHERE idLibrary = ?', [curiosityBook, idLibrary], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a curiosidade do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Curiosidade do livro atualizada com sucesso.",
                data: result
            })
        })
    })
}

exports.updateBookQuantity = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { bookQuantity } = req.body

    if (!bookQuantity) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }

        connection.query('UPDATE Book SET bookQuantity = ? WHERE idLibrary = ?', [bookQuantity, idLibrary], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a quantidade do livro.",
                    data: err,
                })
            }

            return res.status(200).json({
                success: true,
                message: "Quantidade do livro atualizada com sucesso.",
            })
        })
    })
}

exports.updateStatusAvailable = (req, res) => {
    const idLibrary = req.params.LibraryId
    const { status_Available } = req.body

    if (!status_Available) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query('SELECT * FROM Book WHERE idLibrary = ?', [idLibrary], (err, result) => {
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
                message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
            })
        }
        
        if(status_Available !== 'disponível' && status_Available !== 'reservado' && status_Available !== 'emprestado' && status_Available !== 'indisponível'){
            return res.status(400).json({
                success: false,
                message: 'Você digitou uma opção que não é válida no nosso sistema. Tente novamente.',
                data: err
            })
        } else {
            connection.query('UPDATE Book SET status_Available = ? WHERE idLibrary = ?', [status_Available, idLibrary], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao atualizar a disponibilidade do livro.",
                        data: err,
                    })
                }

                return res.status(200).json({
                    success: true,
                    message: "Disponibilidade do livro atualizada com sucesso.",
                    data: result
                })
            })
        }
    })
}

exports.deleteBook = (req, res) => {
    const idLibrary = req.params.LibraryId

    connection.query('SELECT * FROM Book where idLibrary = ?', [idLibrary], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `O Livro com o id ${idLibrary} não existe no nosso sistema. `,
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM Book where idLibrary = ?', [idLibrary], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }

                if(result.affectedRows === 0){
                    return res.status(404).json({
                        message: 'Erro ao deletar Livro. Verifique os dados e tente novamente.',
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(200).json({
                        message: 'Livro deletado com sucesso',
                        success: true,
                        data: result
                    })
                }
                
            })
        }
    })
}