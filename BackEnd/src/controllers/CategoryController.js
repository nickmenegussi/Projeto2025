const pool = require('../config/promise')

// para executar uma estrutura mais limpa no backend teremos que usar uma promise para o async await e try catch funcionarem
exports.getCategories = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT nameCategory, idCategory FROM Category")

        if(rows.length === 0){

        }
        return res.status(200).json({message: "Sucesso ao exibir categorias de tópicos", success: true, data: rows})
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar categoria de tópico.', success: false, data: error });
    }
}

exports.getTopicbyCategory = async (req, res) => {
    const {nameCategory} = req.params
    try {
        const [rows] = await pool.query(`
            
        SELECT *
        FROM Topic t
        JOIN Category c on c.idCategory = t.Category_id 
        WHERE c.nameCategory = ?
        ORDER BY created_at DESC`, [nameCategory])

        if(rows.length === 0){
            return res.status(404).json({ message: "Nenhum tópico encontrado para essa categoria." });
        }

        return res.status(200).json({message: "Sucesso ao exibir tópico por categoria", success: true, data: rows})
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar categoria de tópico.' });
    }
}

exports.createCategory = async (req, res) => {
    const {nameCategory} = req.body
    const user_id = req.data.id 

    if(!user_id || !nameCategory) {return res.status(400).json({message: "Dados incomplementos!", success: false})}

    try {
        const [isAlreadyCreated] = await pool.query('SELECT * FROM Category WHERE nameCategory = ? AND User_id = ?', [nameCategory, user_id])

        if(isAlreadyCreated.length > 0){
            return res.status(409).json({
                message: "Categoria já existe",
                success: false,
            })
        }

        const[result] = await pool.query('INSERT INTO Category(nameCategory, User_idUser) VALUES (?, ?)', [nameCategory, user_id])

        return res.status(201).json({
            message: "Categoria criada com sucesso",
            success: true,
            data: {
                idCategory: result.insertId,
                nameCategory,
                user_id
            }
        })
    } catch (error) {
        console.error('Erro ao criar uma categoria: ', error)
        return res.status(500).json({message: "Erro interno do servidor ao criar uma categoria" ,success: false})
    }
}
