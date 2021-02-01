const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


module.exports = {
  mode: 'development',
  devtool: 'eval', //hidden-source-map
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
        "@" : path.resolve(__dirname, "dist")
    }
    // modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  entry: {
    //extensions로 확장자 생략가능 
    app: './client',
  },
  //공식문서 loders == modules
  module: {
    rules: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            //presets에 대한 설정
            targets: {
              //크롬 69랑 70만 호환되게
              //한국에서 5%이상인 브라우저 다 지원
              browsers: ['> 5% in KR', 'last 2 chrome versions'],
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        //babel loader에 plugin넣어주기 => babel이 최신문법을 옛날 js로 transfile할때 hot reloading기능까지 추가해줌
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel'
        ]
      },
      exclude: /node_modules/
    }],
  },
  plugins: [
    new RefreshWebpackPlugin()
  ],
  output: {
    //path: 실제경로, publicPath: 가상경로
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'//webpack-dev serve에서는 가상경로가 필요
  },
  //개발 편의를 위한 서버
  devServer: {
    //결과물을 dist에 저장함
    publicPath: '/dist/',
    //hotReloading 변경점 감지
    hot: true
  }

}