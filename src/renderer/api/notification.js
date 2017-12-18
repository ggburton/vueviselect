import store from '../store'

function notifyChatMessage (message, username) {
  console.log(username)
  const foundUser = store.getters.getActiveUsers.find(user => user.username === username)
  console.log('found user', foundUser)
  const photourl = `http://${store.getters.getServer}${foundUser.photo}`
  const notification = new Notification(`${foundUser.first_name} says:`,
    {
      body: message,
      icon: photourl,
      silent: store.getters.getSilentNotifications
    })
  notification.onclick = () => {
    console.log('clicked')
  }
}

export { notifyChatMessage }
