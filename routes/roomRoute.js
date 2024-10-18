import { Router } from "express";
import { authUser, setProject, authGetRoom, setUser } from '../middleware/authMiddleware.js'
import roomDB from "../middleware/authMiddleware.js";

const routerRoom = Router()

routerRoom.get('/:roomId', setUser, authUser, setProject, authGetRoom, (req, res) => {
    res.json(req.room)
})

routerRoom.post('/createRoom', setUser, authUser, (req, res) => {
    const { roomId, name } = req.body

    const room = {
        name,
        userId: req.user.id,
        role: req.user.role,
    }


    const createdRoom = roomDB.create(roomId, room)
    return res.status(201).json({ message: 'Created Successfully', roomId: createdRoom })

})

export default routerRoom