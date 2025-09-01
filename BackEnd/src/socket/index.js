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

  io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado:", socket.id);

    // Evento de desconexão
    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado:", socket.id);
    });
  });
}

// Retorna a instância do socket.io
function getIO() {
  if (!io) {
    throw new Error("Socket.io não foi inicializado!");
  }
  return io;
}

module.exports = { initializerSocket, getIO };
