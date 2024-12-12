const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Caminho absoluto para o diretório `uploads`
const uploadPath = path.resolve(__dirname, "../../../uploads");

// Certifique-se de que a pasta existe
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Define o caminho correto para o diretório `uploads`
  },
  filename: (req, file, cb) => {
    const fileName = req.body.nomeArquivo || file.originalname;
    cb(null, fileName + path.extname(file.originalname)); // Define o nome do arquivo salvo
  },
});

const upload = multer({ storage });

module.exports = upload;