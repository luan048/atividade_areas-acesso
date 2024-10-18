export class RoomDB {
    #room = new Map()

    getRoomById(id) {
        return this.#room.get(id)
    }

    create(roomId, room) {
        this.#room.set(roomId, room)
        return roomId
    }

    update(id, room) {
        if(this.#room.has(id)) {
            this.#room.set(id, room)
        }
    }

    delete(id) {
        this.#room.delete(id)
    }
}