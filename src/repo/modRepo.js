module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Mod } = schemas
  const addMod = (cate) => {
    const c = new Mod(cate)
    return c.save()
  }
  const getModById = (id) => {
    return Mod.findById(id)
  }
  const deleteMod = (id) => {
    return Mod.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updateMod = (id, n) => {
    return Mod.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Mod.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Mod.countDocuments(pipe)
  }
  const getModAgg = (pipe) => {
    return Mod.aggregate(pipe)
  }
  const getMod = (pipe, limit, skip, sort) => {
    return Mod.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getModNoPaging = (pipe) => {
    return Mod.find(pipe)
  }
  const removeMod = (pipe) => {
    return Mod.deleteMany(pipe)
  }
  const findOne = (pipe) => {
    return Mod.findOne(pipe)
  }
  return {
    getModNoPaging,
    removeMod,
    addMod,
    getModAgg,
    getModById,
    deleteMod,
    updateMod,
    checkIdExist,
    getCount,
    getMod,
    findOne
  }
}
