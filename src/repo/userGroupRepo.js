module.exports = container => {
  const { schemas } = container.resolve('models')
  const { UserGroup } = schemas
  const addUserGroup = (cate) => {
    const c = new UserGroup(cate)
    return c.save()
  }
  const getUserGroupById = (id) => {
    return UserGroup.findById(id)
  }
  const deleteUserGroup = (id) => {
    return UserGroup.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updateUserGroup = (id, n) => {
    return UserGroup.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return UserGroup.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return UserGroup.countDocuments(pipe)
  }
  const getUserGroupAgg = (pipe) => {
    return UserGroup.aggregate(pipe)
  }
  const getUserGroup = (pipe, limit, skip, sort) => {
    return UserGroup.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getUserGroupNoPaging = (pipe) => {
    return UserGroup.find(pipe)
  }
  const removeUserGroup = (pipe) => {
    return UserGroup.deleteMany(pipe)
  }
  const findOne = (pipe) => {
    return UserGroup.findOne(pipe)
  }

  const findOneAndRemove = (pipe) => {
    return UserGroup.where().findOneAndRemove(pipe)
  }
  return {
    getUserGroupNoPaging,
    removeUserGroup,
    addUserGroup,
    getUserGroupAgg,
    getUserGroupById,
    deleteUserGroup,
    updateUserGroup,
    checkIdExist,
    getCount,
    getUserGroup,
    findOne,
    findOneAndRemove
  }
}
