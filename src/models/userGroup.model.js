module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const joinStatusConfig = {
    MEMBER: 1,
    PENDING: 2
  }
  const userGroupJoi = joi.object({
    group: joi.string().required(),
    user: joi.string().required(),
    status: joi.number().valid(...Object.values(joinStatusConfig)).default(joinStatusConfig.MEMBER)
  })
  const userGroupSchema = joi2MongoSchema(userGroupJoi, {
    createdBy: {
      type: ObjectId
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  userGroupSchema.statics.validateObj = (obj, config = {}) => {
    return userGroupJoi.validate(obj, config)
  }
  userGroupSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return userGroupJoi.validate(obj, config)
  }
  const userGroupModel = mongoose.model('UserGroup', userGroupSchema)
  userGroupModel.syncIndexes()
  return userGroupModel
}
