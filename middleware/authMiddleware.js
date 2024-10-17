import { RoomDB } from '../database/roomDB.js'
import { userDB } from '../database/userDB.js'
import { canViewProject } from '../permissions/viewRoom.js'

const roomDB = new RoomDB()

export function authUser(req, res, next) {
    if(req.user === null || req.user === undefined) {
        return res.status(403).send('You need to sign in')
    }

    next()
}

export function authRole(role) {
    return (req, res, next) => {
        if(!role.includes(req.user.role)) { 
            return res.status(401).send('Not allowed')
        }

        next()
    }
}

export function setUser(req, res, next) {
    console.log('Request body: ', req.body)
    const userId = req.body.userId

    if (userId) {
        const userData = userDB.getUser(userId)
        console.log('This is the USERDATA: ', userData)

        if (!userData) {
            return res.status(404).send('User not found')
        }

        req.user = userData.user
        req.userRole = userData.user.role || 'Guest'

        console.log('USER ROLE: ', req.user.role)
    }

    next()
}

export function setProject(req, res, next) {
    const roomId = parseInt(req.params.roomId, 10)

    if (isNaN(roomId)) {
        return res.status(400).send('Invalid room ID format')
    }

    req.room = roomDB.getRoomById(roomId)

    if(!req.room) {
        return res.status(404).send('Project not found')
    }

    req.room.role = req.room.role || 'DefaultRole'

    next()
}

export function authGetRoom(req, res, next) {
    console.log("User Role: ", req.user.role)
    console.log("Room Role: ", req.room.role)

    if(!canViewProject(req.user, req.room)) {
        return res.status(401).send("You don't have access to this room")
    }

    next()
}

// Para usar a mesma instância em outra parte do código
export default roomDB