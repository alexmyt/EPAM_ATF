const Calc = require('../../app/calc');
const {expect} = require('chai');

describe('Calc positive tests', function() {
  let calc;

  beforeEach(function() {
    calc = new Calc;
  });

  afterEach(function() {
    calc = undefined;
  });

  it('should do addition', function() {
    expect(calc.add(2, 3, 5)).to.be.eq(10);
  });

  it('should do addition', function() {
    expect(calc.add(2, 0, 5)).to.be.eq(7);
  });

  it('should do multiplication', function() {
    expect(calc.multiply(2, 3, 5)).to.be.eq(30);
  });

  it('should do multiplication', function() {
    expect(calc.multiply(2, 3, 0)).to.be.eq(0);
  });
});

describe('calc negative tests', function() {
  let calc;

  beforeEach(function() {
    calc = new Calc;
  });

  afterEach(function() {
    calc = undefined;
  });

  it('should be error on empty arguments', function() {
    expect(() => calc.add()).to.throw(calc.ERROR_NO_ARGS);
  });

  it('should be error on non-number arguments', function() {
    expect(function() {
      calc.add(1, undefined, 2);
    }).to.throw(calc.ERROR_ARGS_NOT_NUMBER);
  });
});
