function handleAsyncExceptions () {
  if (handleAsyncExceptions.hooked === false) {
    process.on('unhandledRejection', (err) => {
      throw err
    })

    handleAsyncExceptions.hooked = true
  }
}

module.exports = {
  handleAsyncExceptions,
  uuidRegex: /^\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
}
