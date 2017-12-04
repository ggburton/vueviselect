import { WebSocketBridge } from 'django-channels'
import store from '../store'

const webSocketBridge = new WebSocketBridge()

function connectSocket () {
  const server = store.getters.getServer
  const key = store.getters.getSessionKey
  if (key !== null) {
    webSocketBridge.connect(`ws://${server}/binding/?session_key=${key}`)
    webSocketBridge.listen()
  }
}

export { connectSocket, webSocketBridge }
