module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv',
      {
        'envName': 'APP_ENV',
        'moduleName': '@env',
        'path': '.env',
        'blocklist': null,
        'allowlist': null,
        'safe': false,
        'allowUndefined': false,
        'verbose': false
      }
    ]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
    },
  },
};
