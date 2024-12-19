const connection = require("../config/db")
const bcrypt = require("bcrypt")

exports.viewOnlyUser = (req, res) => {
    const idUser = req.params.userId 
    connection.query('SELECT * FROM Usuario where idUser = ?', [idUser] ,(err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } 
        
        if(result.length === 0){
            return res.status(404).json({
                message: `O usuário com o id ${idUser}, não existe no nosso sistema`,
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir o usuario.",
              success: true,
              data: result
            })
          }
    })
}

exports.viewAllUser = (req, res) => {
    connection.query('SELECT * FROM Usuario', (err, result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
              message: "Sucesso ao exibir os usuarios.",
              success: true,
              data: result
            })
          }
    })
}

exports.register = async (req, res) => {
    const image_profile = req.file ? req.file.filename : null
    const {nameUser, email, password} = req.body

    if(!nameUser || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    const hash_password = await bcrypt.hash(password, 15)
    connection.query('INSERT INTO User(nameUser,email, password ,image_profile, status_permissao) VALUES(?, ?, ?, ?, ?)', [nameUser, email, hash_password, image_profile, 'User'] ,(err,result) => {
        if(err){
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: result,
            })
        }
    })
}

exports.updateUser = (req, res) => {
    const idUser = req.params.userId  
    const {email} = req.body
 
    if(!idUser || !email){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }


    connection.query('SELECT * FROM User WHERE idUser = ?', [idUser] ,(err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }

        if(result.length === 0){
            return res.status(404).json({
                message: 'Usuario não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            const updateInformation = 'UPDATE User set email = ? where idUser = ?'
            connection.query(updateInformation, [email, idUser], (err, result) => {
                if(result){
                    return res.status(200).json({
                        message: 'Sucesso ao alterar informações do usuário.',
                        success: true,
                        data: result
                    })
                } else {
                    return res.status(400).json({
                        message: 'Não foi possível alterar as informações. Tente novamente.',
                        success: false,
                        data: err
                    })
                }
            })
        }
    })
}

exports.updateUserName = (req, res) => {
    const idUser = req.params.userId ;
    const { nameUser } = req.body;

    if (!nameUser) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nameUser' é obrigatório.",
        });
    }

    connection.query('UPDATE User SET nameUser = ? WHERE idUser = ?', [nameUser, idUser], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o servidor.",
                data: err,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Nome atualizado com sucesso.",
        });
    });
};

exports.updateUserPassword = (req, res) => {
    const idUser = req.params.userId  
    const {newPassword, currentPassword, confirmedPassword} = req.body
 
    if(!idUser || !newPassword || !currentPassword || !confirmedPassword){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    } 


    connection.query('SELECT * FROM User WHERE idUser = ?', [idUser] , async (err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }
        
        if(result.length === 0){
            return res.status(404).json({
                message: 'Usuario não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            const user = result[0]
            
            const passwordMatch = await bcrypt.compare(currentPassword, user.password)
            if(!passwordMatch){
                return res.status(404).json({
                    message: 'A senha atual está incorreta. Por favor, digite novamente.',
                    success: false
                                
                })
            } else if (newPassword !== confirmedPassword){
                return res.status(404).json({
                    message: 'A nova senha digitado não coincide com a confirmada. Por favor, digite novamente.'
                })
            } else {
            
                const hashPassword = await bcrypt.hash(newPassword, 15)

                const updateInformation = 'UPDATE User set password = ? where idUser = ?'
                connection.query(updateInformation, [hashPassword ,idUser], (errPassword, resultPassword) => {
                if(errPassword){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err,
                    })
                } 
                
                if (resultPassword.affectedRows > 0){
                    connection.query('SELECT * FROM USER WHERE idUser = ?', [idUser] , (errUpdatePassword,resultUpdatePassword) => {
                        if(errUpdatePassword){
                            return res.status(400).json({
                                message: 'Não foi possível alterar as informações. Tente novamente.',
                                success: true,
                                data: errUpdatePassword
                            })
                        } else {
                            return res.status(200).json({
                                message: 'Sucesso ao alterar a senha',
                                success: false,
                                data: resultUpdatePassword
                            })
                        }
                    })
                }  else {
                    return res.status(400).json({
                        message: 'Nenhuma alteração foi feita. Por favor, tente novamente.',
                        success: false,
                    });
                }
            })
        }
    }
    })
}

exports.updateUserImageProfile = (req, res) => {
    const image_profile = req.file ? req.file.filename : null 
    const idUser = req.params.userId  

    if(!idUser){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }

    connection.query('SELECT idUser FROM User WHERE idUser = ?', [idUser] ,(err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }
        
        if(result.length === 0){
            return res.status(400).json({
                message: 'Usuario não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            const updateInformation = 'UPDATE User set image_profile = ? where idUser = ?'
            connection.query(updateInformation, [image_profile ,idUser], (errUpdateImgProfile, resultUpdateImgProfile) => {
                if(errUpdateImgProfile){
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err,
                    })  
                }

                if(resultUpdateImgProfile.affectedRows === 0){
                    return res.status(500).json({
                        message: "Erro ao alterar foto de perfil. Por favor, tente novamente.",
                        success: false,
                        data: errUpdateImgProfile,
                    })   
                } else {
                    return res.status(200).json({
                        message: "Sucesso ao alterar foto de perfil.",
                        success: true,
                        data: resultUpdateImgProfile,
                    })   
                }
            })
        }
    }
    )
}

exports.deleteAccountUser = (req, res) => {
    const idUser = req.params.userId  

    if(!idUser){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
    }
    connection.query('SELECT * FROM User WHERE idUser = ?', [idUser] ,(err, result) => {
        if(err) {
            return res.status(500).json({
                message: "Erro ao se conectar com o servidor.",
                success: false,
                data: err,
            })
        }
        
        if(result.length === 0){
            return res.status(400).json({
                message: 'Usuario não encontrado. Verifique os dados e tente novamente.',
                success: false,
                data: err
            })
        } else {
            connection.query('DELETE FROM User WHERE idUser = ?', [idUser] ,(err, result) => {
                if(err) {
                    return res.status(500).json({
                        message: "Erro ao se conectar com o servidor.",
                        success: false,
                        data: err
                    })
                }
        
                if(result.affectedRows === 0){
                    return res.status(400).json({
                        message: 'Usuario não encontrado. Verifique os dados e tente novamente.',
                        success: false,
                        data: err
                    })
                } else {
                    return res.status(200).json({
                        message: 'Usuário deletado com sucesso',
                        success: true,
                        data: result
                    })
                }
             })
    
        }
    })
}

