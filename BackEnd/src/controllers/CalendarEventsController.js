const connection = require("../config/db");

exports.viewEventsByUser = (req, res) => {
  const User_idUser = req.data.id;

  connection.query(
    `SELECT * FROM CalendarEvents 
        WHERE User_idUser = ?
        ORDER BY createdDate DESC
        `,
    [User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }
      
      if (result.length === 0) {
        return res.status(404).json({
          message: "Nenhum evento encontrado.",
          success: false,
          data: result,
        });
      }

      return res.status(200).json({
        message: "Eventos encontrados com sucesso.",
        success: true,
        data: result,
      });
    }
  );
};

exports.viewAllEvents = (req, res) => {
  connection.query(
    `SELECT User_idUser, attachment, dateEvent, description, end, idCalendarEvents, link, start, title, status_permission FROM CalendarEvents 
    INNER JOIN User where status_permission = 'admin' OR status_permission = 'SuperAdmin'
        ORDER BY start DESC
        `,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          message: "Eventos não encontrados.",
          success: false,
          data: result,
        });
      }

      return res.status(200).json({
        message: "Eventos encontrados com sucesso.",
        success: true,
        data: result,
      });
    }
  );
};

exports.createEvent = (req, res) => {
  const attachment = req.file ? req.file.filename : null;
  const { title, description, start, end, link, dateEvent } = req.body;
  const User_idUser = req.data.id;
  console.log(dateEvent)
  if (
    !title ||
    !description ||
    !start ||
    !end ||
    !link ||
    !dateEvent ||
    !attachment
  ) {
    return res.status(400).json({
      message: "Preencha todos os campos.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM CalendarEvents WHERE title = ? AND description = ? AND start = ? AND end = ? AND User_idUser = ? AND link = ? AND dateEvent = ?`,
    [title, description, start, end, User_idUser, link, dateEvent],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Esse evento já foi criado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `INSERT INTO CalendarEvents (title, link, description, start, end, attachment, dateEvent, User_idUser) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          link,
          description,
          start,
          end,
          attachment,
          User_idUser,
          dateEvent,
        ],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Evento criado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateEventLink = (req, res) => {
  const { link } = req.body;
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  if (!link) {
    return res.status(400).json({
      message: "Link do evento não informado",
      success: false,
    });
  }

  connection.query(
    "SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?",
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          mesasge: "Link não encontrado",
          success: false,
          data: result,
        });
      }

      connection.query(
        "Update CalendarEvents SET link = ? WHERE idCalendarEvents = ? and User_idUser = ?",
        [link, idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor",
              success: false,
              data: err,
            });
          }

          return res.status(200).json({
            message: "Link atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateEventTitle = (req, res) => {
  const { title } = req.body;
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  if (!title) {
    return res.status(400).json({
      message: "Título do evento não informado.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Evento não encontrado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE CalendarEvents SET title = ? WHERE idCalendarEvents = ? AND User_idUser = ?`,
        [title, idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Título do evento atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateEventdescription = (req, res) => {
  const { description } = req.body;
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  if (!description) {
    return res.status(400).json({
      message: "Descrição do evento não informada.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Evento não encontrado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE CalendarEvents SET description = ? WHERE idCalendarEvents = ? AND User_idUser = ?`,
        [description, idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Descrição do evento atualizada com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateEventStart = (req, res) => {
  const { start } = req.body;
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  if (!start) {
    return res.status(400).json({
      message: "Início do evento não informado.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Evento não encontrado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE CalendarEvents SET start = ? WHERE idCalendarEvents = ? AND User_idUser = ?`,
        [start, idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Início do evento atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateEventEnd = (req, res) => {
  const { end } = req.body;
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  if (!end) {
    return res.status(400).json({
      message: "Fim do evento não informado.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Evento não encontrado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE CalendarEvents SET end = ? WHERE idCalendarEvents = ? AND User_idUser = ?`,
        [end, idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Fim do evento atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateAttachment = (req, res) => {
  const attachment = req.file ? req.file.filename : null;
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  if (!attachment) {
    return res.status(400).json({
      message: "Anexo não informado.",
      success: false,
    });
  }

  connection.query(
    `SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Evento não encontrado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE CalendarEvents SET attachment = ? WHERE idCalendarEvents = ? AND User_idUser = ?`,
        [attachment, idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Anexo do evento atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.deleteEvent = (req, res) => {
  const User_idUser = req.data.id;
  const idCalendarEvents = req.params.idCalendarEvents;

  connection.query(
    `SELECT * FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
    [idCalendarEvents, User_idUser],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Evento não encontrado.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `DELETE FROM CalendarEvents WHERE idCalendarEvents = ? AND User_idUser = ?`,
        [idCalendarEvents, User_idUser],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          return res.status(201).json({
            message: "Evento deletado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};
