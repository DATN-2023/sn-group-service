module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { userGroupController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/userGroups`, userGroupController.getUserGroup)
  app.get(`${basePath}/userGroups/:id`, userGroupController.getUserGroupById)
  app.put(`${basePath}/userGroups/:id`, userGroupController.updateUserGroup)
  app.delete(`${basePath}/userGroups/:id`, userGroupController.deleteUserGroup)
  app.post(`${basePath}/userGroups`, userGroupController.addUserGroup)
}
