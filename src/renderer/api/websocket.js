import { WebSocketBridge } from 'django-channels'
import store from '../store'

const webSocketBridge = new WebSocketBridge()

function connectSocket () {
  const key = store.getters.getSessionKey
  if (key !== null) {
    webSocketBridge.connect(`ws://localhost:8000/binding/?session_key=${key}`)
    webSocketBridge.listen()
  }
}

export { connectSocket, webSocketBridge }
