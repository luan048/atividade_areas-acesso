export class RoomDB {
    #room = new Map()
    #idCounter = 1

    list(id) {
        return this.#room.find((user) => user.id === id)
    }

    create(room) {
        const roomId = this.#idCounter++

        this.#room.set(roomId, room)
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