module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const enableFastRefresh = !api.env('production') && !api.env('test');

  return {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-env',
        {
          corejs: 3,
          modules: false,
          useBuiltIns: 'usage',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      // Applies the react-refresh Babel plugin on non-production modes only
      ...(enableFastRefresh ? ['react-refresh/babel'] : []),
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: 3,
              useBuiltIns: 'usage',
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          'dynamic-import-node',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-export-namespace-from',
        ],
      },
    },
  };
};
