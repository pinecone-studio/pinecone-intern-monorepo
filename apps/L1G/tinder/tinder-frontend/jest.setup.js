/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */

window.HTMLElement.prototype.scrollIntoView = jest.fn();

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
