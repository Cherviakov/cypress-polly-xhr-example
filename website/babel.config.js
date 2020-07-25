module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        corejs: '3',
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-arrow-functions'
  ]
};
