module.exports = (container) => {
  const groupController = require('./groupController')(container)
  const userGroupController = require('./userGroupController')(container)
  const modController = require('./modController')(container)
  const readController = require('./readController')(container)
  const writeController = require('./writeController')(container)
  return { groupController, userGroupController, modController, readController, writeController }
}
