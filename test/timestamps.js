var assert = require('assert');

require('sugar');



var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('../lib/timestamps');


mongoose.connect('mongodb://localhost/test',function(err){
  if (err) {throw(err);}
});

var postSchema = new Schema({});
postSchema.plugin(timestamps);
var Post = mongoose.model('Post',postSchema);


describe('timestamps', function(){
  before(function(done){
    mongoose.connection.on('open',function(){
      mongoose.connection.db.dropDatabase(function(err) {
        if (err) {throw err;}
        done();
      });
    });
  })
  it('should automatically set createdAt to now', function(done){
    var before = new Date();
    var post = new Post();
    
    post.save(function(err,post) {

      var after = new Date();
      if(err) {throw err;}
      assert.ok(post.createdAt instanceof Date);
      assert.ok(before <= post.createdAt);
      assert.ok(after >= post.createdAt);
      done();
    });
  })
  it('should automatically set updatedAt to now', function(done){
    var before = new Date();
    var post = new Post();
    post.save(function(err,post) {
      var after = new Date();
      
      if(err) {throw err;}
      assert.ok(post.updatedAt instanceof Date);
      assert.ok(before <= post.updatedAt);
      assert.ok(after >= post.updatedAt);

      done();
    });
  })
  it('should not change createdAt when changed', function(done){
      var before = new Date();
      var post = new Post();
      post.save(function(err) {
        var after = new Date();
        var createdAt = post.createdAt;
        if(err) {throw err;}
        post.save(function(err){
          if(err) {throw err;}
          assert.equal(createdAt,post.createdAt);
          done();
        });
      });
    })
    it('should update updatedAt when changed', function(){
      var post = new Post();
      post.save(function(err) {
        var before = new Date();
        if(err) {throw err;}
        post.save(function(err) {
          var after = new Date();
          assert.ok(post.createdAt < post.upatedAt);
          assert.ok(before <= post.upatedAt);
          assert.ok(after >= post.updatedAt);
          done();
        });
      });
    })
    
  
})