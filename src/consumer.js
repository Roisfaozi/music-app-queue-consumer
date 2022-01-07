require('dotenv').config()
const amqp = require('amqplib')
const PlaylistServices = require('./PlaylistServices')
const MailSender = require('./MailSender')
const Listener = require('./Listener')

const init = async () => {
  const playlistServices = new PlaylistServices()
  const mailSender = new MailSender()
  const listener = new Listener(playlistServices, mailSender)

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue(process.env.PLAYLIST_CHANNEL_NAME, {
    durable: true,
  })

  channel.consume(process.env.PLAYLIST_CHANNEL_NAME, listener.listen, { noAck: true })
}

init()
