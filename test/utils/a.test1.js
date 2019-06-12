// add.test.js
import {add, minx} from '../../src/lib/test.js'
var expect = require('chai').expect;
describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});

describe('加法减法的测试', function() {
  it('3 - 1 应该等于 2', function() {
    expect(minx(3, 1)).to.be.equal(2);
  });
});
