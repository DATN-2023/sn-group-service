module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const modJoi = joi.object({
    group: joi.string().required(),
    user: joi.string().required()
  })
  const modSchema = joi2MongoSchema(modJoi, {
    createdBy: {
      type: ObjectId
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  modSchema.statics.validateObj = (obj, config = {}) => {
    return modJoi.validate(obj, config)
  }
  modSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return modJoi.validate(obj, config)
  }
  const modModel = mongoose.model('Mod', modSchema)
  modModel.syncIndexes()
  return modModel
}
