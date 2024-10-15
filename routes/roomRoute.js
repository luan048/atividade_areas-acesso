import { Router } from "express";
import {authUser} from '../middleware/authMiddleware.js'
import {RoomDB} from '../database/roomDB.js'

const dbRoom = new RoomDB()

const routerRoom = Router()

routerRoom.post('/createRoom', authUser, (req, res) => {
    const {name} = req.body

    const room = {
        name,
        userId: req.user.id,
    }

    dbRoom.create(room)
    return res.status(201).send('Created Sucessfully')
})

export default routerRoom