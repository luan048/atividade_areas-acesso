import { Router } from "express";
import { userDB } from "../database/userDB.js";

const routerUser = Router()

routerUser.get('/users', (req, res) => {
    const users = userDB.list()

    return res.status(200).json(users)
})

routerUser.post('/createUser', (req, res) => {
    const {name, role} = req.body

    const user = {
        name,
        role,
    }

    const userId = userDB.create(user, role)

    return res.status(201).json({message: 'Created Sucessfully', userId})
})

routerUser.put('/upUser/:id', (req, res) => {
    const userId = req.params.id

    const {name, role} = req.body

    userDB.update(userId, {
        name,
        role,
    })

    return res.status(200).send('Update Sucessfully')
})

export default routerUser