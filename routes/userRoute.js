import { Router } from "express";
import {UserDB} from '../database/userDB'

const dbUser = new UserDB()

const routerUser = Router()

routerUser.post('/createUser', (req, res) => {
    const {name, role} = req.body

    const user = {
        name,
        role,
    }

    dbUser.create(user)

    return res.status(201).send('Created Sucessfully')
})

routerUser.put('/upUser/:id', (req, res) => {
    const userId = req.params.id

    const {name, role} = req.body

    dbUser.update(userId, {
        name,
        role,
    })
})

export default routerUser