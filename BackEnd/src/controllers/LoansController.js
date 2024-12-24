const connection = require("../config/db")

exports.viewAllLoans = (req, res) => {
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
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de empréstimo e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewLoansByUser = (req, res) => {
    const Cart_idCart = req.params.Cart_idCart 
    const idUser = req.data.id

    // Fazer um join, pois, eu só vou querer algumas informações ou todas do empréstimo que eu armazenei no carrinho para ,por fim, armazenado como um Empréstimo.
    connection.query(`SELECT * FROM 
        Loans l, Cart c, Book b, User u
        WHERE l.Cart_idCart = c.idCart
        AND b.idLibrary = c.Book_idLibrary
        AND u.idUser = c.User_idUser
        And u.idUser = ? and l.Cart_idCart = ?

        
        `,[idUser, Cart_idCart] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } 
        if(result.length === 0){
            return res.status(404).json({
                success: false,
                message: `Não conseguimos achar os empréstimos dete usuário. Por favor, verifique os dados e tente novamente.`,
            })
            
        }

        // verificar se o usuário logado é o mesmo que criou o tópico
        if(result[0].User_idUser !== idUser){{
            return res.status(403).json({
                message: 'Você não tem permissão para alterar o tópico.',   
                success: false,
                data: err
            })  
        }}
        
            return res.status(200).json({
              message: `Sucesso ao exibir os empréstimos do usuario ${idUser}`,
              success: true,
              data: result
            })
          
    })
}

exports.createLoan = (req, res) => {
    const Cart_idCart = req.params.Cart_idCart 

    if(!Cart_idCart){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    // Primeiro verifica se o carrinho existe e se a ação é de empréstimo, se não, quer dizer que depois ele pode cadastrar se a ação for de empréstimo
    connection.query(`
            SELECT * FROM Cart where idCart = ?
            
        `, [Cart_idCart], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: "Erro ao se conectar com o servidor.",
                    success: false,
                    data: err
                })
            }
            if(result.length === 0){
                return res.status(404).json({
                    success: false,
                    message: `Não conseguimos localizar o carrinho do item. Por favor, verifique os dados e tente novamente.`,
                })
                
            } else if (result[0].action !== 'empréstimo') {
                return res.status(400).json({
                    success: false,
                    message: "Ação inválida. Apenas carrinhos com a ação 'empréstimo' podem gerar empréstimos.",
                })
            }
            
            else {
                // verificar duplicidade de empréstimos
                if(result[0].action === 'empréstimo'){
                    connection.query('SELECT Cart_idCart FROM Loans where Cart_idCart = ?', [Cart_idCart], (err, result) => {
                        if(err){
                            return res.status(500).json({
                                message: "Erro ao verificar Empréstimos realizados.",
                                success: false,
                                data: err
                            })
                        }

                        // Verifica se já existe um empréstimo para este carrinho

                        if(result.length > 0){
                            return res.status(400).json({
                                message: 'Esse pedido já foi finalizado.',
                                success: false
                            })
                        }

                        connection.query('INSERT INTO Loans(returnDate, Cart_idCart) VALUES(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY), ?) ',[Cart_idCart], (errInsert, resultInsert) => {
                            if(errInsert){
                                return res.status(500).json({
                                    message: "Erro ao criar empréstimo.",
                                    success: false,
                                    data: errInsert
                                })
                            } else {
                                return res.status(201).json({
                                    success: true,
                                    message: "Empréstimo cadastrado com sucesso.",
                                    data: resultInsert,
                                })
                            }
                
                        })     
                    })
                }  else {
                return res.status(400).json({
                    success: false,
                    message: "Ação inválida. Apenas carrinhos com a ação 'empréstimo' podem gerar empréstimos.",
                })
            }            
        }
    })
    
}

exports.updateReturnDate = (req, res) => {
    const idLoans = req.params.LoansId
    const { returnDate  } = req.body
    const idUser = req.data.id


    if (!returnDate || !idLoans) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos.",
        })
    }

    connection.query(`SELECT * FROM Loans where idLoans = ?`, [idLoans], (err, result) => {
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

        // verificar se o usuário logado é o mesmo que criou o tópico
        if(result[0].User_idUser !== idUser){{
            return res.status(403).json({
                message: 'Você não tem permissão para alterar o tópico.',   
                success: false,
                data: err
            })  
        }}

        connection.query(` UPDATE Loans l
            JOIN Cart c on l.Cart_idCart = c.idCart
            JOIN User u on c.User_idUser = u.idUser
            SET l.returndate = ? 
            WHERE l.idLoans = ? AND u.idUser = ?

            `, [returnDate, idLoans, idUser], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar a data do empréstimo do livro.",
                    data: err,
                })
            }

            return res.status(201).json({
                success: true,
                message: "Retorno do livro atualizada com sucesso.",
                data: result
            })
        })
    })
}

exports.deleteLoan = (req, res) => {
    const idLoans = req.params.LoansId
    const idUser = req.data.id

    connection.query(`
        SELECT * FROM Loans where idLoans = ?`, [idLoans], (err, result) => {
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
        } 

        // verificar se o usuário logado é o mesmo que criou o tópico
        if(result[0].User_idUser !== User_idUser){{
            return res.status(403).json({
                message: 'Você não tem permissão para alterar o tópico.',   
                success: false,
                data: err
            })  
        }}
            connection.query(`DELETE l FROM Loans l
                    JOIN Cart c on l.Cart_idCart = c.idCart
                    JOIN User u on c.User_idUser = u.idUser
                    WHERE l.idLoans = ? AND u.idUser = ?`, [idLoans, idUser], (err, result) => {
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
                    return res.status(201).json({
                        message: 'Empréstimo deletado com sucesso',
                        success: true,
                        data: result
                    })
                }
                
            })
        
    })
}