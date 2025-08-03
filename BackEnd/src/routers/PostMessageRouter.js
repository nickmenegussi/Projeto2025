const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  getPostById,
  toggleLike,
  updateContentPost,
  updateImagePost,
  deletePost,
} = require("../controllers/PostMessageController");
const authMiddleware = require('../middleware/authMidleware');
const upload = require("../multerConfig/multer");

// Rota para listar todos os posts
router.get("/postMessages", authMiddleware,getAllPosts);

// Rota para criar post
router.post("/postMessages", upload.single('image') ,authMiddleware,createPost);

// Rota para obter post por ID
router.get("/postMessages/:postId",authMiddleware ,getPostById);

// Rota para curtir/descurtir post
router.post("/posts/:postId/like",authMiddleware  ,toggleLike);

// Rota para atualizar conteúdo
router.put("/posts/:postId/content",authMiddleware ,updateContentPost);

// Rota para atualizar imagem
router.put("/posts/:postId/image", authMiddleware,updateImagePost);

// Rota para deletar post
router.delete("/posts/:postId", authMiddleware,deletePost);

module.exports = router;
