module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { groupController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/groups`, groupController.getGroup)
  app.get(`${basePath}/groups/joining`, groupController.getJoiningGroups)
  app.get(`${basePath}/groups/:id`, groupController.getGroupById)
  app.put(`${basePath}/groups/:id`, groupController.updateGroup)
  app.delete(`${basePath}/groups/:id`, groupController.deleteGroup)
  app.post(`${basePath}/groups`, groupController.addGroup)
}
