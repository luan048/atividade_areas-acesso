import { randomUUID } from "crypto";

export class UserDB {
    #users = new Map()

    getUser(id) {
        return this.#users.get(id)
    }

    create(user, role) {
        const userId = randomUUID()

        this.#users.set(userId, {user, role})
    }

    update(id, user, role) {
        this.#users.set(id, {user, role})
    }

    delete(id, user) {
        this.#users.delete(id)
    }
}