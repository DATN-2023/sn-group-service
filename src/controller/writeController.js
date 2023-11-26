module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      UserGroup
    }
  } = container.resolve('models')
  const { joinStatusConfig } = UserGroup.getConfig()
  const {
    httpCode,
    serverHelper
  } = container.resolve('config')
  const {
    groupRepo,
    userGroupRepo,
    modRepo
  } = container.resolve('repo')
  const addGroup = async (req, res) => {
    try {
      const thoauoc = req.body
      thoauoc.memberTotal = 1
      const {
        error,
        value
      } = await schemaValidator(thoauoc, 'Group')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await groupRepo.addGroup(value)
      await userGroupRepo.addUserGroup({
        group: sp._id.toString(),
        user: sp.createdBy.toString(),
        status: joinStatusConfig.MEMBER
      })
      await modRepo.addMod({
        group: sp._id.toString(),
        user: sp.createdBy.toString()
      })
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteGroup = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await groupRepo.deleteGroup(id)
        await userGroupRepo.removeUserGroup({ group: id })
        await modRepo.removeMod({ group: id })
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const updateGroup = async (req, res) => {
    try {
      const { id } = req.params
      const group = req.body
      const {
        error,
        value
      } = await schemaValidator(group, 'Group')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && group) {
        const sp = await groupRepo.updateGroup(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const addMod = async (req, res) => {
    try {
      const thoauoc = req.body
      const {
        error,
        value
      } = await schemaValidator(thoauoc, 'Mod')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await modRepo.addMod(value)
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteMod = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await modRepo.deleteMod(id)
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const updateMod = async (req, res) => {
    try {
      const { id } = req.params
      const mod = req.body
      const {
        error,
        value
      } = await schemaValidator(mod, 'Mod')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && mod) {
        const sp = await modRepo.updateMod(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const addUserGroup = async (req, res) => {
    try {
      const userGroup = req.body
      userGroup.status = joinStatusConfig.PENDING
      const {
        error,
        value
      } = await schemaValidator(userGroup, 'UserGroup')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await userGroupRepo.addUserGroup(value)
      await groupRepo.updateGroup(sp.group.toString(), { $inc: { pendingMemberTotal: 1 } })
      res.status(httpCode.CREATED).send(sp)
    } catch
      (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteUserGroup = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const sp = await userGroupRepo.findOneAndRemove({ _id: new ObjectId(id) })
        const deleteBody = sp.status === joinStatusConfig.MEMBER ? { memberTotal: -1 } : { pendingMemberTotal: -1 }
        await groupRepo.updateGroup(sp.group.toString(), { $inc: deleteBody })
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const deleteUserGroupByUserAndGroup = async (req, res) => {
    try {
      const body = req.body
      if (body) {
        const sp = await userGroupRepo.findOneAndRemove(body)
        await groupRepo.updateGroup(sp.group.toString(), { $inc: { memberTotal: -1 } })
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const updateUserGroup = async (req, res) => {
    try {
      const { id } = req.params
      const userGroup = req.body
      // const {
      //   error,
      //   value
      // } = await schemaValidator(userGroup, 'UserGroup')
      // if (error) {
      //   return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      // }
      if (id && userGroup && userGroup.status) {
        const sp = await userGroupRepo.updateUserGroup(id, userGroup)
        await groupRepo.updateGroup(sp.group.toString(), { $inc: { pendingMemberTotal: -1, memberTotal: 1 } })
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  return {
    addGroup,
    updateGroup,
    deleteGroup,
    addMod,
    updateMod,
    deleteMod,
    addUserGroup,
    updateUserGroup,
    deleteUserGroup,
    deleteUserGroupByUserAndGroup
  }
}
