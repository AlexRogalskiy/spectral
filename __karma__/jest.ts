// @ts-ignore
process.stdout = {};

import { Expect } from 'expect/build/types';
import * as JestMock from 'jest-mock';

declare let global: NodeJS.Global & {
  jest: typeof JestMock;
  expect: Expect;
  test: jest.It;
};

global.jest = require('jest-mock');
global.expect = require('expect');
global.test = it;
global.test.concurrent = it;

const message = () => "Good try. An email has been sent to Vincenzo and Jakub, and they'll find you. :troll: ;)";

expect.extend({
  toMatchSnapshot: () => ({ pass: false, message }),
  toMatchInlineSnapshot: () => ({ pass: false, message }),
});

// @ts-ignore
test.each = input => (name: string, fn: Function) => {
  // very simple stub-like implementation needed by src/rulesets/oas/__tests__/valid-example.ts and src/rulesets/__tests__/validation.test.ts
  for (const value of input) {
    it(name, () => {
      if (Array.isArray(value) && fn.length !== 1) {
        return fn(...value);
      } else {
        return fn(value);
      }
    });
  }
};

// @ts-ignore
describe.each = input => (name: string, fn: Function) => {
  for (const value of input) {
    describe(name, () => {
      if (Array.isArray(value) && fn.length !== 1) {
        return fn(...value);
      } else {
        return fn(value);
      }
    });
  }
};
