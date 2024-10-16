import { randomUUID } from "crypto";

export class UserDB {
    #users = new Map()

    getUser(id) {
        return this.#users.get(id)
    }

    list() {
        return Array.from(this.#users.entries()).map((userArray) => {
            const id = userArray[0]
            const {user} = userArray[1]

            return {
                id,
                ...user,
            }
        })
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

// Criei uma intância, para quando criar o ROOM, utilizar da mesma intância para conseguir pegar os usuário
export const userDB = new UserDB