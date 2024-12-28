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
// Aqui eu faço diferente das demais, pois, futuramente eu posso querer exibir um histórico pedidos de reserva e para eu mostrar para o usuário eu tenho que fazer uma ligação de todas as tabelas responsáveis por isso.

exports.viewReservesByUser = (req, res) => {
    const Cart_idCart = req.params.cartId
    const idUser = req.params.userId
    const userData = req.data
    
    connection.query(`SELECT * 
        FROM Reserves r, Cart c, User u, Book b
        WHERE r.Cart_idCart = c.idCart
        AND u.idUser = c.User_idUser
        AND b.idLibrary = c.Book_idLibrary
        And u.idUser = ? AND r.Cart_idCart = ? 
        
        `, [idUser, Cart_idCart] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } 
        if(result.length === 0) {
            return response.status(400).json({
                success: false,
                message: `Não há itens reservados ainda!`,
              })
        }

        // verificar se o usuário logado é o mesmo que criou o tópico
        if(result[0].User_idUser !== idUser && userData.role !== 'Admin' && userData.role !== 'SuperAdmin'){{
            return res.status(403).json({
                message: 'Você não tem permissão para ver o tópico.',   
                success: false
            })  
        }}

        return res.status(200).json({
            message: "Sucesso ao exibir os livros reservados",
            success: true,
            data: result
        })
          
    })
}

exports.createReserves = (req, res) => {
    const {Cart_idCart} = req.body

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
                
            } else if (result[0].action !== 'reserva') {
                return res.status(400).json({
                    success: false,
                    message: "Ação inválida. Apenas carrinhos com a ação 'reserva' podem gerar reserva.",
                })
            }
            
            else {
                // verificar duplicidade de empréstimos
                if(result[0].action === 'reserva'){
                    connection.query('SELECT Cart_idCart FROM Reserves where Cart_idCart = ?', [Cart_idCart], (err, result) => {
                        if(err){
                            return res.status(500).json({
                                message: "Erro ao verificar reservas realizados.",
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

                        connection.query('INSERT INTO Reserves(Cart_idCart) VALUES(?) ',[Cart_idCart], (errInsert, resultInsert) => {
                            if(errInsert){
                                return res.status(500).json({
                                    message: "Erro ao reservar livro.",
                                    success: false,
                                    data: errInsert
                                })
                            } else {
                                return res.status(201).json({
                                    success: true,
                                    message: "Livro reservado foi cadastrado com sucesso.",
                                    data: resultInsert,
                                })
                            }
                
                        })     
                    })
                }  else {
                return res.status(400).json({
                    success: false,
                    message: "Ação inválida. Apenas carrinhos com a ação 'reserva' podem gerar reserva.",
                })
            }            
        }
    })
    
}


exports.deleteReserve = (req, res) => {
    const idReserved = req.params.ReserveId
    const idUser = req.data.id
    const userData = req.data

    connection.query(`SELECT * FROM Reserve where idReserved = ?`, [idReserved], (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: `A reserva do livro respectivo não existe no nosso sistema. `,
                success: false,
                data: err
            })
        } 

        // verificar se o usuário logado é o mesmo que criou o tópico
        if(result[0].User_idUser !== idUser && userData.role !== 'Admin' && userData.role !== 'SuperAdmin'){{
            return res.status(403).json({
                message: 'Você não tem permissão para alterar o tópico.',   
                success: false,
                data: err
            })  
        }}
            connection.query(`DELETE r FROM Reserves r
                JOIN Cart c on r.Cart_idCart = c.idCart
                JOIN User u on c.User_idUser = ? u.idUser
                WHERE r.idReserved = ? AND u.idUser = ?`, [idReserved, idUser], (err, result) => {
                if(err){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }

                if(result.affectedRows === 0){
                    return res.status(400).json({
                        message: `Erro ao deletar reserva do livro. Verifique os dados e tente novamente.`,
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(201).json({
                        message: 'Reserva do livro deletado com sucesso',
                        success: true,
                        data: result
                    })
                }
                
            })
        
    })
}