import webpack from 'webpack';
import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  target: 'web',
  entry: {
    app: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@types': path.resolve(process.cwd(), 'src/app/types'),
      '@utils': path.resolve(process.cwd(), 'src/app/utils'),
    },
  },
  output: {
    // filename: '[name].[hash].js',
    filename: '[name].js',
    // chunkFilename: '[name].[chunkhash].js',
    path: path.join(process.cwd(), 'dist/'),
  },
  plugins: [
    // new HtmlWebpackPlugin(),
    // new HtmlWebpackInlineSourcePlugin()
  ],
};

export default config;
