module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { modController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/mods`, modController.getMod)
  app.get(`${basePath}/mods/:id`, modController.getModById)
  app.put(`${basePath}/mods/:id`, modController.updateMod)
  app.delete(`${basePath}/mods/:id`, modController.deleteMod)
  app.post(`${basePath}/mods`, modController.addMod)
}
