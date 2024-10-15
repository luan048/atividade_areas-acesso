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
    const userId = req.body
    if(userId) {
        req.user = UserDB.#users.get(userId)
    }
}

export function setProject(req, res, next) {
    const roomId = parseInt(req.params)
    req.room = RoomDB.#room.get(roomId)

    if(req.room === null || req.room === undefined) {
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