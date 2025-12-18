import { WebSocketServer } from "ws"

const PORT = process.env.PORT || 8080
const wss = new WebSocketServer({ port: PORT })

const clients = new Map()

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = message.toString()
    clients.set(ws, data)

    for (const client of wss.clients) {
      if (client.readyState === 1) {
        client.send(data)
      }
    }
  })

  ws.on("close", () => {
    clients.delete(ws)
  })
})

console.log(`WebSocket running on port ${PORT}`)
