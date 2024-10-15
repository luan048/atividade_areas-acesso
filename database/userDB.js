import { randomUUID } from "crypto";

export class UserDB {
    #users = new Map()

    create(user) {
        const userId = randomUUID()

        this.#users.set(userId, user)
    }

    update(id, user) {
        this.#users.set(id, user)
    }

    delete(id, user) {
        this.#users.delete(id)
    }
}