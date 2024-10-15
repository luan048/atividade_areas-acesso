import express from 'express'
import {setUser} from './middleware/authMiddleware.js'

import routerRoom from './routes/roomRoute.js'
import routerUser from './routes/userRoute.js'

const server = express()
const port = 3000

server.use(express.json())
server.use(setUser)

server.use('/room', routerRoom)
server.use('/user', routerUser)

server.listen(port, () => {
    console.log(`Running on port: ${port}`)
})