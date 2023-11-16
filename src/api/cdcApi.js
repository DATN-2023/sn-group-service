module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { writeController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.put(`${basePath}/cdc/groups/:id`, writeController.updateGroup)
  app.delete(`${basePath}/cdc/groups/:id`, writeController.deleteGroup)
  app.post(`${basePath}/cdc/groups`, writeController.addGroup)

  app.put(`${basePath}/cdc/mods/:id`, writeController.updateMod)
  app.delete(`${basePath}/cdc/mods/:id`, writeController.deleteMod)
  app.post(`${basePath}/cdc/mods`, writeController.addMod)

  app.put(`${basePath}/cdc/userGroups/:id`, writeController.updateUserGroup)
  app.delete(`${basePath}/cdc/userGroups/:id`, writeController.deleteUserGroup)
  app.post(`${basePath}/cdc/userGroups`, writeController.addUserGroup)
}
