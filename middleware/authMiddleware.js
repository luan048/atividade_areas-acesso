import {RoomDB} from '../database/roomDB.js'
import {UserDB} from '../database/userDB.js'

import {canViewProject} from '../permissions/viewRoom.js'

export function authUser(req, res, next) {
    if(req.user === null || req.user === undefined) {
        return res.status(403).send('You need to sign in')
    }

    next()
}

export function authRole(role) {
    return (req, res, next) => {
        if(!role.includes(req.user)) {
            return res.status(401).send('Not allowed')
        }

        next()
    }
}

export function setUser(req, res, next) {
    const userId = req.body.userId

    if(userId) {
        const userData = UserDB.getUser(userId)

        if(!userData) {
            return res.status(404).send('User not found')
        }

        req.user = userData.user
        req.userRole = userData.role
    }

    next()
}

export function setProject(req, res, next) {
    const roomId = parseInt(req.params.roomId)

    req.room = RoomDB.getRoomById(roomId)

    if(!req.room) {
        return res.status(404).send('Project not found')
    }

    next()
}

export function authGetRoom(req, res, next) {
    if(!canViewProject(req.user, req.room)) {
        return res.status(401).send('Not Allowed')
    }

    next()
}