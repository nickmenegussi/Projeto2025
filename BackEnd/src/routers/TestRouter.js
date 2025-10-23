const express = require('express');
const router = express.Router();
const connection = require("../config/db");

// Rota para testar conexão com banco
router.get('/test-db-connection', async (req, res) => {
  try {
    console.log('🔍 Testando conexão com banco...');
    console.log('📊 Banco:', process.env.MYSQL_ADDON_DB);
    console.log('🏠 Host:', process.env.MYSQL_ADDON_HOST);
    
    // Teste simples
    const [results] = await connection.promise().query('SELECT 1 + 1 AS result');
    
    // Tentar contar usuários
    const [users] = await connection.promise().query('SELECT COUNT(*) as userCount FROM User');
    
    // Listar tabelas
    const [tables] = await connection.promise().query('SHOW TABLES');
    
    res.status(200).json({
      success: true,
      message: '✅ Conexão com banco estabelecida!',
      database: process.env.MYSQL_ADDON_DB,
      host: process.env.MYSQL_ADDON_HOST,
      testResult: results[0].result,
      totalUsers: users[0].userCount,
      totalTables: tables.length,
      tables: tables.map(t => Object.values(t)[0]),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Erro na conexão com banco:', error);
    res.status(500).json({
      success: false,
      message: '❌ Erro na conexão com banco',
      error: error.message,
      database: process.env.MYSQL_ADDON_DB,
      host: process.env.MYSQL_ADDON_HOST
    });
  }
});

// Health check completo
router.get('/health', async (req, res) => {
  try {
    // Testar banco
    await connection.promise().query('SELECT 1');
    
    res.status(200).json({
      success: true,
      message: '✅ Backend + Banco funcionando perfeitamente!',
      status: 'online',
      database: 'Conectado ao MySQL Cloud',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '⚠️ Backend online mas banco offline',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Teste de registro
router.post('/test-register', async (req, res) => {
  try {
    const { nameUser, email, password } = req.body;
    
    if (!nameUser || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Verificar se email já existe
    const [existing] = await connection.promise().query(
      'SELECT idUser FROM User WHERE email = ?', 
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Inserir usuário (sem bcrypt para teste simples)
    const [result] = await connection.promise().query(
      'INSERT INTO User (nameUser, email, password, status_permission) VALUES (?, ?, ?, ?)',
      [nameUser, email, 'senha_temporaria', 'User']
    );

    res.status(200).json({
      success: true,
      message: '✅ Usuário registrado com sucesso!',
      userId: result.insertId,
      data: { nameUser, email }
    });

  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no registro',
      error: error.message
    });
  }
});

module.exports = router;