const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
      buffer: require.resolve('buffer'),
    },
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  server: {
      port: 8081,
      enhanceMiddleware: (middleware)=>{
            return (req,res,next)=>{

              res.setHeader('Access-Control-Allow-Origin','*');
              return middleware(req,res,next);

            }
      }
  }

};

module.exports = mergeConfig(defaultConfig, config);