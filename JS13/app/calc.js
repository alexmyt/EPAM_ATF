/**
 *
 *
 * @class Calc
 */
class Calc {
  // eslint-disable-next-line require-jsdoc
  constructor() {}

  ERROR_NO_ARGS = new Error(`No arguments passed`);
  ERROR_ARGS_NOT_NUMBER = new Error(`All arguments must be a number type`);

  /**
   * Throw error if args is not passed or if any of args non number
   *
   * @param {*} args
   * @memberof Calc
   */
  verifyArgs(...args) {
    if (args.length ===0) {
      throw this.ERROR_NO_ARGS;
    }

    if (!args.every((arg) => typeof arg === 'number')) {
      throw this.ERROR_ARGS_NOT_NUMBER;
    }
  }

  /**
   * Addidional numbers
   *
   * @param {Array<Numbers>} args Array of numbers for addition
   * @return {Number}
   * @memberof Calc
   */
  add(...args) {
    this.verifyArgs(...args);

    return args.reduce((sum, current) => sum += current, 0 );
  }

  /**
   * Multiply numbers
   *
   * @param {Array<Numbers>} args Array of numbers for multiplication
   * @return {Number}
   * @memberof Calc
   */
  multiply(...args) {
    this.verifyArgs(...args);

    return args.reduce((sum, current) => sum *= current, 1);
  }
}

module.exports = Calc;
