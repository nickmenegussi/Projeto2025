const verifyPermission = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.data

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado.",
      })
    }

    // aqui eu faço uma verificação para ver se as permissões que eu colocar quando chamar o middlware incluem o que está nas informações do usuário, bem como, a permissão dele.
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Permissão negada. Você não tem acesso a esta rota.",
      })
    }

    next()
  }
}
module.exports = verifyPermission;