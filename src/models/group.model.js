module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const groupStatus = {
    PUBLIC: 1,
    PRIVATE: 2
  }
  const groupJoi = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    banner: joi.string().default('').allow(''),
    thumbnail: joi.string().default('').allow(''),
    feedTotal: joi.number().default(0),
    memberTotal: joi.number().default(0),
    pendingMemberTotal: joi.number().default(0),
    createdBy: joi.string().required(),
    rules: joi.string().allow('').default(''),
    status: joi.number().valid(...Object.values(groupStatus)).default(groupStatus.PUBLIC)
  })
  const groupSchema = joi2MongoSchema(groupJoi, {
    createdBy: {
      type: ObjectId
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  groupSchema.statics.validateObj = (obj, config = {}) => {
    return groupJoi.validate(obj, config)
  }
  groupSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return groupJoi.validate(obj, config)
  }
  const groupModel = mongoose.model('Group', groupSchema)
  groupModel.syncIndexes()
  return groupModel
}
