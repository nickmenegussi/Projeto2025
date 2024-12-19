const verifyOwnerShip = (req, res, next) => {
    const UserId = req.data.id 
    const requesrOwnerId = req.params.userId 

    if(UserId !== requesrOwnerId){
        return res.status(403).json({ 
            success: false, message: "Acesso negado ao recurso." 
        })
    }

    next()
}

export default verifyOwnerShip