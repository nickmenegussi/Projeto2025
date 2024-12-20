// esse middleware serve para verificar se o usuário que for atualizar alguma coisa dele for o mesmo usuário que está logado, caso não, ele não pode alterar um id que não seja o que está

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