const connection = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')
const OtpGenerator = require('otp-generator')


exports.login = (req, res) => {
    const {email, senha} = req.body

    if(!email || !senha){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de login",
            
        })
    }

    connection.query('SELECT * FROM User where email = ?', [email], (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                body: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Usuário não existe.',
                success: false
            })
        }

        const user = result[0]
        const hashPawword = bcrypt.compare(senha, user.senha)

        if(!hashPawword){
            return res.status(400).json({
                message: 'Email ou senha estão incorretos.',
                success: false,
                body: err
            })
        }

        const token = jwt.sign({id: user.idUser, email: user.email, role: user.status_permission}, process.env.JWT_SECRET, {
            expiresIn: '2h'
        })

        return res.status(201).json({
            message: "Login realizado com sucesso",
            success: true,
            data: {user: user, token: token}
        })
    })
}

exports.GenerateOtp = (req, res) => {
    const {email} = req.body 

    if(!email){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
            
        })
    } else {
        connection.query('SELECT email FROM Usuario WHERE email = ?', [email], async (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor.',
                    success: false,
                    body: err
                })
            }

            if(result.length === 0){
                return res.status(400).json({
                    message: 'Esse email não foi cadastrado no nosso sistema, por favor, se cadastre caso não possuir cadastro. Entretanto, caso possuas, digite novamente. '
                })
            } else {
                const otp = OtpGenerator.generate(6, {
                    digits: true,
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false
                })

                connection.query('INSERT INTO Otp(email, otp, expiresAt) VALUES(?, ?, ?)', [email, otp, ' DATE_ADD(CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)'], (err,result) => {
                    if(err){
                        return res.status(500).json({
                            message: 'Erro ao se conectar com o servidor.',
                            success: false,
                            body: err
                        })
                    } else {
                        try {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAILAPP,
                                    pass: process.env.SENHAEMAILAPP
                                }
                            })
                            transporter.sendMail({
                                from: process.env.EMAILAPP,
                                to: email,
                                subject: 'Verificação de duas Etapas',
                                text: `Seu código para esse Otp é ${otp}`
                            })
    
                            return res.status(201).json({
                                message: 'Succeso ao gerar a OTP',
                                success: true,
                                data: result
                            })
                        } catch (erro){
                            res.status(400).send('Erro ao gerar OTP')
                            throw erro
                        }
                    }
                })
            }
        })
    }
}

exports.VerificationOtp = (req, res) => {
    const {email, otp} = req.body
     
    if(!email || !otp){
        return res.status(400).json({
            message: 'Preencha todos os campos',
            success: true
        })
    }

    connection.query('SELECT * FROM Otp where email = ? and otp = ?', [email, otp], (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                body: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: `Não foi encontrado no nosso sistema essas informações.`,
                success: false,
                data: err
            })
        } else {
            const otpInformation = result[0]

            // verificar se o OTP expirou
            const currentTime = new Date()
            if(currentTime > new Date(otpInformation.expiresAt)){
                return res.status(400).json({
                    message: "Otp expirado",
                    success: false,
                    data: err
                })
            } else {
                return res.status(201).json({
                    message: 'Otp verificado com sucesso!'
                })
            }
        }
    })
}

exports.viewOtp = (req, res) => {
    connection.query('SELECT * FROM OTP', (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                body: err
            })
        } else {
            return res.status(200).json({
                message: 'Successo ao exibir as informações',
                success: true,
                data: result
            })
        }
    })
}