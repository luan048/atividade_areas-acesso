import { Router } from "express";
import {RoomDB} from '../database/roomDB.js'
import {authUser, setProject, authGetRoom} from '../middleware/authMiddleware.js'

const dbRoom = new RoomDB()

const routerRoom = Router()

routerRoom.get('/:roomId', setProject, authUser, authGetRoom, (req, res) => {
    res.json(req.room)
})

routerRoom.post('/createRoom', authUser, (req, res) => {
    const {name} = req.body

    const room = {
        name,
        userId: req.user.id,
    }

    const roomId = dbRoom.create(room)
    return res.status(201).json({message: 'Created Sucessfully', roomId})
})

export default routerRoom