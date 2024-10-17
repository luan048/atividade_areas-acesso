export function canViewProject(user, room) {
    return user.role === 'Admin' || user.role === room.role
}

export function scopedProject(user, room) {
    if(user.role === admin) {
        return room
    }

    return room.filter(room => room.userId === user.id)
}

export function canPostProject(user, room) {
    return (
        user.role === admin || room.userId == user.id
    )
}