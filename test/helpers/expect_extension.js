// Add custom expect methods

expect.extend({
  // `expect().toBeTypeof(typeof)`
  toBeTypeof(actual, want) {
    if (typeof actual === want) {
      return {
        pass: true,
        message: () => "",
      };
    } else {
      return {
        pass: false,
        message: () => `Expected "${want}" but got "${typeof actual}"`,
      };
    }
  },
  // `expect().toBeArray()`
  toBeArray(actual) {
    if (Array.isArray(actual)) {
      return {
        pass: true,
        mesage: () => "",
      };
    } else {
      return {
        pass: false,
        message: () => `Expected "${actual}" to be an array.`,
      };
    }
  },
  
});
