// controllers/CategoryController.js
const pool = require("../config/promise");

// GET /category  -> lista categorias (nome e id)
exports.getGroups = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM GROUPOFSTUDY ORDER BY CreatedAt DESC"
    );

    return res.status(200).json({
      message: "Sucesso ao exibir categorias de tópicos",
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar categorias.",
      success: false,
    });
  }
};

// GET /category/:nameCategory -> lista tópicos por categoria
exports.getGroupsByType = async (req, res) => {
  const { TypeGroup } = req.params;

  if (!TypeGroup) {
    return res
      .status(400)
      .json({
        message: "Parâmetro nameCategory é obrigatório.",
        success: false,
      });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        g.*,
        f.apelido AS FacilitatorName
      FROM GroupOfStudy g
      JOIN Facilitadores f ON f.idFacilitadores = g.IdFacilitador
      WHERE g.TypeGroup = ?
      ORDER BY g.CreatedAt DESC
      `,
      [TypeGroup]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({
          message: "Nenhum tópico encontrado para essa categoria.",
          success: false,
          data: [],
        });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir tópicos por categoria",
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar tópicos por categoria:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar tópicos por categoria.",
      success: false,
    });
  }
};

exports.createGroup = async (req, res) => {
  const {
    IdFacilitador,
    NameStudy,
    Description,
    DayOfWeek,
    StartTime,
    EndTime,
    TypeGroup,
    Requirements,
  } = req.body;

  if (!IdFacilitador || !NameStudy || !Description || !TypeGroup) {
    return res.status(400).json({
      message:
        "Dados incompletos! (Facilitador, Nome, Descrição e Tipo são obrigatórios)",
      success: false,
    });
  }
  
  try {
    const [exists] = await pool.query(
      `SELECT IdGroupOfStudy 
     FROM GroupOfStudy 
     WHERE NameStudy = ? AND TypeGroup = ? 
     LIMIT 1`,
      [NameStudy, TypeGroup]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        message: "Já existe um grupo com esse nome e tipo.",
        success: false,
      });
    }

    const [result] = await pool.query(
      `
    INSERT INTO GroupOfStudy
    (IdFacilitador, NameStudy, Description, DayOfWeek, StartTime, EndTime, TypeGroup, Requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        IdFacilitador,
        NameStudy,
        Description,
        DayOfWeek || null,
        StartTime || null,
        EndTime || null,
        TypeGroup,
        Requirements || null,
      ]
    );

    return res.status(201).json({
      message: "Grupo criado com sucesso",
      success: true,
      data: {
        IdGroupOfStudy: result.insertId,
        IdFacilitador,
        NameStudy,
        Description,
        DayOfWeek,
        StartTime,
        EndTime,
        TypeGroup,
        Requirements,
      },
    });
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao criar grupo de estudo.",
      success: false,
    })
  }
}
