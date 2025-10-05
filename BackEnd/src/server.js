require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { initializerSocket, getIO } = require("./socket/index");
const dotenv = require("dotenv");
const port = process.env.PORT || 3001;

const userRouter = require("./routers/UserRouter");
const adminRouter = require("./routers/AdminRouter");
const calendarRouter = require("./routers/CalendarEventsRouter");
const libraryRouter = require("./routers/LibraryRouter");
const volunteerWorkRouter = require("./routers/VolunteerWorkRouter");
const topicPostRouter = require("./routers/TopicRouter");
const postRouter = require("./routers/PostMessageRouter");
const cart = require("./routers/CartRouter");
const reserves = require("./routers/ReservesRouter");
const otpRouter = require("./routers/OtpRouter");
const notifications = require("./routers/Notifications");
const facilitadores = require("./routers/FacilitadoresUser");
const loans = require("./routers/LoansRouter");
const comments = require("./routers/CommentsRouter");
const lecture = require("./routers/LectureRouter");
const auth = require("./routers/AuthRouter");
const review = require("./routers/ReviewRouter");
const category = require("./routers/CategoryRouter");
const favorite = require("./routers/FavoriteRouter");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const groupOfStudy = require("./routers/GroupOfStudyRouter");
const swaggerDocs = require("./docs/swagger.json");
const { group } = require("console");

const app = express();
const server = http.createServer(app);
// Inicializa o socket.io junto ao servidor HTTP
initializerSocket(server);

app.use(
  cors({
    origin: [
      "http://localhost:19006", // dev web se usar
      "exp://*",
      "http://localhost:*",
      "http://192.168.*:*", // mobile dev
      "https://SEU_DOMINIO_FRONT.com", // prod
    ],
    credentials: true,
  })
); // permitir que os navegadores acessem diferentes domíniose
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/uploads", express.static("./uploads"));
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/calendar", calendarRouter);
app.use("/library", libraryRouter);
app.use("/volunteerWork", volunteerWorkRouter);
app.use("/topic", topicPostRouter);
app.use("/post", postRouter);
app.use("/cart", cart);
app.use("/reserves", reserves);
app.use("/loan", loans);
app.use("/otp", otpRouter);
app.use("/notifications", notifications);
app.use("/facilitadores", facilitadores);
app.use("/comments", comments);
// app.use('/likes', likeMessages)
app.use("/lectures", lecture);
app.use("/review", review);
app.use("/auth", auth);
app.use("/favorite", favorite);
app.use("/category", category);
app.use("/groupOfStudy", groupOfStudy);

app.get("/teste", (req, res) => {
  res.send("Bem-vindo à API do Fórum!");
});

server.listen(port, () =>
  console.log(
    `Rodando na porta ${port}\nDocumentação do Swagger disponível em http://localhost:${port}/api-docs`
  )
);
