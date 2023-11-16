module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { readController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/sdp/groups`, readController.getGroup)
  app.get(`${basePath}/sdp/groups/:id`, readController.getGroupById)

  app.get(`${basePath}/sdp/mods`, readController.getMod)
  app.get(`${basePath}/sdp/mods/:id`, readController.getModById)

  app.get(`${basePath}/sdp/userGroups`, readController.getUserGroup)
  app.get(`${basePath}/sdp/userGroups/:id`, readController.getUserGroupById)
}
