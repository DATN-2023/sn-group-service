module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Group,
      Mod,
      UserGroup
    }
  } = container.resolve('models')
  const {
    httpCode,
    serverHelper
  } = container.resolve('config')
  const {
    groupRepo,
    modRepo,
    userGroupRepo
  } = container.resolve('repo')
  const { joinStatusConfig } = UserGroup.getConfig()
  const getGroupById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const groupId = id.split('-')[0]
        const user = id.split('-')[1]
        const group = await groupRepo.getGroupById(groupId)
        if (!group) res.status(httpCode.BAD_REQUEST).json({ 'msg': 'BAD_REQUEST' })
        const mod = await modRepo.findOne({
          group: groupId,
          user
        })
        if (mod) {
          group.isMod = true
        }
        const userGroup = await userGroupRepo.findOne({
          group: groupId,
          user
        })
        if (userGroup) group.userStatus = userGroup.status
        res.status(httpCode.SUCCESS).send(group)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getGroup = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort,
        ids
      } = req.query
      page = +page || 1
      perPage = +perPage || 10
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const search = { ...req.query }
      if (ids) {
        if (ids.constructor === Array) {
          search.id = { $in: ids }
        } else if (ids.constructor === String) {
          search.id = { $in: ids.split(',') }
        }
      }
      delete search.ids
      delete search.page
      delete search.perPage
      delete search.sort
      const pipe = {}
      Object.keys(search).forEach(i => {
        const vl = search[i]
        const pathType = (Group.schema.path(i) || {}).instance || ''
        if (pathType.toLowerCase() === 'objectid') {
          pipe[i] = new ObjectId(vl)
        } else if (pathType === 'Number') {
          pipe[i] = +vl
        } else if (pathType === 'String' && vl.constructor === String) {
          pipe[i] = new RegExp(vl, 'gi')
        } else {
          pipe[i] = vl
        }
      })
      const data = await groupRepo.getGroup(pipe, perPage, skip, sort)
      const total = await groupRepo.getCount(pipe)
      res.status(httpCode.SUCCESS).send({
        perPage,
        skip,
        sort,
        data,
        total,
        page
      })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getModById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const mod = await modRepo.getModById(id)
        res.status(httpCode.SUCCESS).send(mod)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }

  const getMod = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort,
        ids
      } = req.query
      page = +page || 1
      perPage = +perPage || 10
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const search = { ...req.query }
      if (ids) {
        if (ids.constructor === Array) {
          search.id = { $in: ids }
        } else if (ids.constructor === String) {
          search.id = { $in: ids.split(',') }
        }
      }
      delete search.ids
      delete search.page
      delete search.perPage
      delete search.sort
      const pipe = {}
      Object.keys(search).forEach(i => {
        const vl = search[i]
        const pathType = (Mod.schema.path(i) || {}).instance || ''
        if (pathType.toLowerCase() === 'objectid') {
          pipe[i] = ObjectId(vl)
        } else if (pathType === 'Number') {
          pipe[i] = +vl
        } else if (pathType === 'String' && vl.constructor === String) {
          pipe[i] = new RegExp(vl, 'gi')
        } else {
          pipe[i] = vl
        }
      })
      const data = await modRepo.getMod(pipe, perPage, skip, sort)
      const total = await modRepo.getCount(pipe)
      res.status(httpCode.SUCCESS).send({
        perPage,
        skip,
        sort,
        data,
        total,
        page
      })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getUserGroupById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const userGroup = await userGroupRepo.getUserGroupById(id)
        res.status(httpCode.SUCCESS).send(userGroup)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getUserGroup = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort,
        ids
      } = req.query
      page = +page || 1
      perPage = +perPage || 10
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const search = { ...req.query }
      if (ids) {
        if (ids.constructor === Array) {
          search.id = { $in: ids }
        } else if (ids.constructor === String) {
          search.id = { $in: ids.split(',') }
        }
      }
      delete search.ids
      delete search.page
      delete search.perPage
      delete search.sort
      const pipe = {}
      Object.keys(search).forEach(i => {
        const vl = search[i]
        const pathType = (UserGroup.schema.path(i) || {}).instance || ''
        if (pathType.toLowerCase() === 'objectid') {
          pipe[i] = new ObjectId(vl)
        } else if (pathType === 'Number') {
          pipe[i] = +vl
        } else if (pathType === 'String' && vl.constructor === String) {
          pipe[i] = new RegExp(vl, 'gi')
        } else {
          pipe[i] = vl
        }
      })
      const data = await userGroupRepo.getUserGroup(pipe, perPage, skip, sort)
      const total = await userGroupRepo.getCount(pipe)
      res.status(httpCode.SUCCESS).send({
        perPage,
        skip,
        sort,
        data,
        total,
        page
      })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getJoiningGroups = async (req, res) => {
    try {
      const { user } = req.query
      const userGroups = await userGroupRepo.getUserGroup({
        user: new ObjectId(user),
        status: joinStatusConfig.MEMBER
      }, 10, 0, { createdAt: -1 })
      const ids = userGroups.map(userGroup => userGroup.group)
      const data = await groupRepo.getGroupNoPaging({ _id: { $in: ids } })
      const groups = data.map(group => ({ ...group, userStatus: joinStatusConfig.MEMBER }))
      res.status(httpCode.SUCCESS).send(groups)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  return {
    getGroup,
    getGroupById,
    getModById,
    getMod,
    getUserGroupById,
    getUserGroup,
    getJoiningGroups
  }
}
