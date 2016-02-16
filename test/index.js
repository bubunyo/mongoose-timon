var assert = require('assert')

describe('module', function() {
  it('module is an object', function() {
    assert.ok(typeof require('../index') === 'object')
  })
  it('module exposes timestamps', function() {
    var timestamps = require('../index').timestamps;
    assert.ok(timestamps);
  })
})