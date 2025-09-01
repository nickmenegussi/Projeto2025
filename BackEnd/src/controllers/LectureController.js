const connection = require("../config/db");

exports.viewAllLectures = (req, res) => {
  connection.query(`SELECT * FROM Lecture`, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        data: err,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
        data: result,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir palestras.",
      success: true,
      data: result,
    });
  });
};

exports.viewLecturesById = (req, res) => {
  const { idLecture } = req.params;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: result,
        });
      }

      return res.status(200).json({
        message: "Palestra encontrada.",
        success: true,
        data: result,
      });
    }
  );
};

exports.createLecture = (req, res) => {
  const {
    nameLecture,
    description,
    dateLecture,
    link_url,
    timeLecture,
    video_url,
  } = req.body;

  if (
    !nameLecture ||
    !description ||
    !dateLecture ||
    !link_url ||
    !timeLecture ||
    !video_url
  ) {
    return res.status(400).json({
      message: "Preencha todos os campos  de cadastro.",
      success: false,
    });
  }

  connection.query(
    "SELECT * FROM Lecture where nameLecture = ? AND description = ? AND dateLecture = ? AND link_url = ? AND timeLecture = ? AND video_url  = ?",
    [nameLecture, description, dateLecture, link_url, timeLecture, video_url],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          data: err,
        });
      }

      if (result.length > 0) {
        return res.status(409).json({
          message: "Palestra já cadastrada.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `INSERT INTO Lecture (nameLecture,dateLecture,timeLecture, description ,link_url, video_url ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          nameLecture,
          dateLecture,
          timeLecture,
          description,
          link_url,
          video_url,
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
            message: "Palestra criada com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateLectureName = (req, res) => {
  const { idLecture } = req.params;
  const { nameLecture } = req.body;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: err,
        });
      }

      connection.query(
        `UPDATE Lecture SET nameLecture = ? WHERE idLecture = ?`,
        [nameLecture, idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao atualizar palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "Palestra atualizada com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateLectureDate = (req, res) => {
  const { idLecture } = req.params;
  const { dateLecture } = req.body;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE Lecture SET dateLecture = ? WHERE idLecture = ?`,
        [dateLecture, idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao atualizar a data da palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "Data da Palestra atualizada com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateLectureTime = (req, res) => {
  const { idLecture } = req.params;
  const { timeLecture } = req.body;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: err,
        });
      }

      connection.query(
        `UPDATE Lecture SET timeLecture = ? WHERE idLecture = ?`,
        [timeLecture, idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao atualizar o horário da palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "Horário da Palestra atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateLectureDescription = (req, res) => {
  const { idLecture } = req.params;
  const { description } = req.body;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: err,
        });
      }

      connection.query(
        `UPDATE Lecture SET description = ? WHERE idLecture = ?`,
        [description, idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao atualizar a descrição da palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "Descrição da Palestra atualizada com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateLecturelink_url = (req, res) => {
  const { idLecture } = req.params;
  const { link_url } = req.body;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE Lecture SET link_url = ? WHERE idLecture = ?`,
        [link_url, idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao atualizar o link_url da palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "link_url da Palestra atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.updateLectureVideoUrl = (req, res) => {
  const { idLecture } = req.params;
  const { video_url } = req.body;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `UPDATE Lecture SET video_url  = ? WHERE idLecture = ?`,
        [video_url, idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao atualizar o link_url do vídeo da palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "link_url do vídeo da Palestra atualizado com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};

exports.deleteLecture = (req, res) => {
  const { idLecture } = req.params;

  connection.query(
    `SELECT * FROM Lecture WHERE idLecture = ?`,
    [idLecture],
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
          message: "Nenhuma palestra encontrada.",
          success: false,
          data: result,
        });
      }

      connection.query(
        `DELETE FROM Lecture WHERE idLecture = ?`,
        [idLecture],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erro ao se conectar com o servidor.",
              success: false,
              data: err,
            });
          }

          if (result.affectedRows === 0) {
            return res.status(400).json({
              message: "Erro ao deletar a palestra.",
              success: false,
              data: result,
            });
          }

          return res.status(200).json({
            message: "Palestra deletada com sucesso.",
            success: true,
            data: result,
          });
        }
      );
    }
  );
};
