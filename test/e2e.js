var expect = require('chai').expect;
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;

describe('E2E tests:', function() {

  it('a', function(done) {

    var cmd = 'gulp html --gulpfile=test/gulpfile.js';
    exec(cmd, function(err, stdout, stderr) {
      if (err) done(err);
      console.log(err);
      console.log(stdout);
      // expect(result).to.eql(actual);
      done();
    });

  });

});
