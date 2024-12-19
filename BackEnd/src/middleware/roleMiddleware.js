const verifyPermission = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.data

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado.",
      })
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Permissão negada. Você não tem acesso a esta rota.",
      })
    }

    next()
  }
}

