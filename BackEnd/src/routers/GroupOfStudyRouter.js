const express = require('express');
const router = express.Router();

const {
  getGroups,
  getGroupsByType,
  createGroup
} = require('../controllers/GroupOfStudyController');

const authMiddleware = require('../middleware/authMidleware');

// Lista todos os grupos
router.get('/groupOfStudy', getGroups);

// Lista grupos por tipo (ESDE, MEDIUNICO, EVANGELIZACAO, CIEDE)
router.get('/groupOfStudy/:TypeGroup', getGroupsByType);

// Cria novo grupo (somente autenticado)
router.post('/groupOfStudy', authMiddleware, createGroup);

module.exports = router;