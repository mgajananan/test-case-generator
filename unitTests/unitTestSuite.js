const assert = require('assert');
const { add, subtract, multiply, divide } = require('../codeFiles/sampleCode');

describe('Math functions', () => {
  it('should add two numbers correctly', () => {
    assert.strictEqual(add(2, 3), 5);
    assert.strictEqual(add(-2, 3), 1);
    assert.strictEqual(add(0, 0), 0);
  });

  it('should subtract two numbers correctly', () => {
    assert.strictEqual(subtract(5, 3), 2);
    assert.strictEqual(subtract(-2, -3), 1);
    assert.strictEqual(subtract(0, 0), 0);
  });

  it('should multiply two numbers correctly', () => {
    assert.strictEqual(multiply(2, 3), 6);
    assert.strictEqual(multiply(-2, 3), -6);
    assert.strictEqual(multiply(0, 5), 0);
  });

  it('should divide two numbers correctly', () => {
    assert.strictEqual(divide(6, 3), 2);
    assert.strictEqual(divide(-6, 3), -2);
    assert.strictEqual(divide(0, 5), 0);
  });

  it('should throw an error when dividing by zero', () => {
    assert.throws(() => {
      divide(5, 0);
    }, Error);
  });
});