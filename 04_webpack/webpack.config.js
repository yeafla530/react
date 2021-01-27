const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// const ROOT_DIR = path.resolve(__dirname, '..');
// const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);


module.exports = {
  mode: 'development',
  devtool: 'eval', //hidden-source-map
  resolve: {
    // extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    extensions: [".js", ".jsx", ".json"],
    // modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    // alias: {
    //     "@": path.resolve(__dirname,"dist"),
    // }
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
  //그냥 plugins: 확장프로그램 느낌
  //plugin이 너무 많으면 느림 
  //처음엔 다 주석처리 후 오류를 보며 하나씩 추가해가기
  plugins: [
    //presets마다 debug:true를 해준다는 의미
    // new webpack.LoaderOptionsPlugin({debug:true})

    //build할 때마다 실행됨
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