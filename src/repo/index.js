const repo = (container) => {
  const groupRepo = require('./groupRepo')(container)
  const userGroupRepo = require('./userGroupRepo')(container)
  const modRepo = require('./modRepo')(container)
  return { groupRepo, userGroupRepo, modRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}

module.exports = { connect }
