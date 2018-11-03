Tree Shaking 就是把项目中没有使用的代码会在打包时候丢掉，在webpack4中只需要配置mode为"production" 就可以了

<!-- more -->

**下面是示例代码：**

## 文件结构
```
├── package-lock.json
├── package.json
├── src
│   ├── pageA.js
│   └── util.js
└── webpack.config.js
```

<br />


## package.json

```js
 "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
  }
```

<br />


## webpack.config.js

```js
const path = require("path")

module.exports = {
  // development production
  mode: 'production',
  entry: {
    pageA: "./src/pageA.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};

```

<br />


## pageA.js
```js
import { a } from "./util";
console.log(a());

```

<br />

## util.js

```js
export function a() {
  return 'this is function "a"';
}

export function b() {
  return 'this is function "b"';
}

export function c() {
  return 'this is function "c"';
}

```

#### 运行 `npm run build` 编译后，查看编译后的文件，发现只有 a这个方法代码


