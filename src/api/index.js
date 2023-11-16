module.exports = (app, container) => {
  require('./groupApi')(app, container)
  require('./userGroupApi')(app, container)
  require('./modApi')(app, container)

  require('./cdcApi')(app, container)
  require('./sdpApi')(app, container)
}
