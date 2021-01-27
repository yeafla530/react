const path = require('path');
const webpack = require('webpack');
// const ROOT_DIR = path.resolve(__dirname, '..');
// const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);


module.exports = {
  mode: 'development',
  devtool: 'eval', //hidden-source-map
  resolve: {
    // extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    extensions: [".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
              //browsersList참고하기! 
              //크롬 69랑 70만 호환되게
              //한국에서 5%이상인 브라우저 다 지원
              browsers: ['> 5% in KR', 'last 2 chrome versions'],
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
      },
      exclude: /node_modules/
    }],
  },
  //그냥 plugins: 확장프로그램 느낌
  //plugin이 너무 많으면 느림 
  //처음엔 다 주석처리 후 오류를 보며 하나씩 추가해가기
  plugins: [
    new webpack.LoaderOptionsPlugin({debug:true})
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }

}