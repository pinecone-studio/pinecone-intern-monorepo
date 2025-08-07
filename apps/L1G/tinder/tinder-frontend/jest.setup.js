window.HTMLElement.prototype.scrollIntoView = jest.fn();
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
