// A instância io representa o servidor socket inteiro.
let io = null;

// inicializa o socket.io com o servidor HTTP

function initializerSocket(server) {
  const socketio = require("socket.io");
  io = socketio(server, {
    cors: {
      origin: "*", // Permite acesso de qualquer origem (ideal para dev)
    },
  });

  // Evento de conexão de um novo cliente
  io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado:", socket.id);

    // Escuta um evento de novo comentário vindo do cliente
    socket.on("newComment", (data) => {
      // Emite o comentário para todos os outros clientes
      socket.broadcast.emit("commentAdded", data);
    });

    // Evento de desconexão
    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado:", socket.id);
    });
  });
}

// Retorna a instância do socket.io
function getIO() {
  if (!io) {
    throw new Error('Socket.io não foi inicializado!');
  }
  return io;
}

module.exports = {initializerSocket, getIO}