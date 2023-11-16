module.exports = (container) => {
  const groupController = require('./groupController')(container)
  const userGroupController = require('./userGroupController')(container)
  const modController = require('./modController')(container)
  return { groupController, userGroupController, modController }
}
