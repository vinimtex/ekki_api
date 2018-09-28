function handleAsyncExceptions () {
  if (handleAsyncExceptions.hooked === false) {
    process.on('unhandledRejection', (err) => {
      throw err
    })

    handleAsyncExceptions.hooked = true
  }
}

module.exports = {
  handleAsyncExceptions
}
