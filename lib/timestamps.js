module.exports = exports = function timestampsPlugin (schema, options) {
  schema.add({ createdAt: {type:Date,default:Date.now},updatedAt: {type:Date,default:Date.now} })
  
  schema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  })
  schema.path('createdAt').index(true);
  schema.path('updatedAt').index(true);
}

