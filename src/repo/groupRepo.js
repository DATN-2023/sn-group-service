module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Group } = schemas
  const addGroup = (cate) => {
    const c = new Group(cate)
    return c.save()
  }
  const getGroupById = (id) => {
    return Group.findById(id).lean()
  }
  const deleteGroup = (id) => {
    return Group.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updateGroup = (id, n) => {
    return Group.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Group.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Group.countDocuments(pipe)
  }
  const getGroupAgg = (pipe) => {
    return Group.aggregate(pipe)
  }
  const getGroup = (pipe, limit, skip, sort) => {
    return Group.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getGroupNoPaging = (pipe) => {
    return Group.find(pipe)
  }
  const removeGroup = (pipe) => {
    return Group.deleteMany(pipe)
  }
  return {
    getGroupNoPaging,
    removeGroup,
    addGroup,
    getGroupAgg,
    getGroupById,
    deleteGroup,
    updateGroup,
    checkIdExist,
    getCount,
    getGroup
  }
}
