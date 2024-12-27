const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const port = 3001
const userRouter = require('./routers/UserRouter');
const adminRouter = require('./routers/AdminRouter');   
const calendarRouter = require('./routers/CalendarEventsRouter');
const libraryRouter = require('./routers/LibraryRouter');
const volunteerWorkRouter = require('./routers/VolunteerWorkRouter');

const app = express()
app.use(cors()) // permitir que os navegadores acessem diferentes domíniose
app.use(express.json())
dotenv.config()
app.use(express.urlencoded({ extended: true }));

// app.use('/user', userRouter)
// app.use('/admin', adminRouter)
// app.use('/calendar', calendarRouter)
// app.use('/library', libraryRouter)
// app.use('/volunteerWokr', volunteerWorkRouter)

app.listen(port, () => console.log(`Rodando na porta ${port}`));
