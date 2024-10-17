import { Router } from "express";
import { authUser, setProject, authGetRoom, setUser } from '../middleware/authMiddleware.js'
import roomDB from "../middleware/authMiddleware.js";

const routerRoom = Router()

routerRoom.get('/:roomId', setUser, authUser, setProject, authGetRoom, (req, res) => {
    res.json(req.room)
})

routerRoom.post('/createRoom', setUser, authUser, (req, res) => {
    const { name } = req.body

    const room = {
        name,
        userId: req.user.id,
    }

    const roomId = roomDB.create(room)
    console.log("Created room with ID: ", roomId) //TESTE
    return res.status(201).json({ message: 'Created Successfully', roomId })
})

export default routerRoom