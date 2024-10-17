export class RoomDB {
    #room = new Map()
    #idCounter = 1

    getRoomById(id) {
        return this.#room.get(id)
    }

    create(room) {
        const roomId = this.#idCounter++

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