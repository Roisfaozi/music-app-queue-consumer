class Listener {
  constructor(playlistServices, mailSender) {
    this._playlistServices = playlistServices
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail, userId } = JSON.parse(
        message.content.toString()
      )
      const { name: playlistName, fullname: playlistUser } =
        await this._playlistServices.getPlaylist(playlistId, userId)
      const musics = await this._playlistServices.getMusicFromPlaylist(
        playlistId,
        userId
      )
      const result = await this._mailSender.sendEmail(
        targetEmail,
        playlistName,
        playlistUser,
        JSON.stringify(musics)
      )
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Listener
