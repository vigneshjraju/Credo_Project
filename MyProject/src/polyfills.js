// Polyfills for React Native Hermes engine
if (typeof globalThis === 'undefined') {
  // Polyfill for globalThis
  var globalThis = (function () {
    if (typeof self !== 'undefined') {
      return self;
    } else if (typeof window !== 'undefined') {
      return window;
    } else if (typeof global !== 'undefined') {
      return global;
    } else {
      return Function('return this')();
    }
  })();
}

// Polyfill for Symbol.toStringTag
if (typeof Symbol === 'undefined') {
  global.Symbol = function Symbol(description) {
    return '@@' + description;
  };
  Symbol.toStringTag = '@@toStringTag';
} else if (!Symbol.toStringTag) {
  Symbol.toStringTag = Symbol('Symbol.toStringTag');
}

// Polyfill for process
if (typeof process === 'undefined') {
  global.process = {
    env: {
      NODE_ENV: __DEV__ ? 'development' : 'production'
    },
    version: '',
    nextTick: (callback) => {
      setTimeout(callback, 0);
    }
  };
}

// Basic crypto polyfill (minimal implementation)
if (typeof crypto === 'undefined') {
  global.crypto = {
    getRandomValues: (array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}

console.log('Polyfills loaded successfully');