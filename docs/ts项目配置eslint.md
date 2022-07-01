<div align="center">
  <h1>ts项目配置eslint</h1>
  <p>这里用到的是普通ts脚本项目在vscode中eslint代码规范的配置，规规矩矩的代码给人的感觉是不一样的</p>
</div>

## 目录

- [目录](#目录)
- [项目初始化](#项目初始化)
- [eslint 配置](#eslint-配置)
  - [相关依赖安装](#相关依赖安装)
  - [eslint 配置](#eslint-配置-1)
  - [vscode 配置](#vscode-配置)
- [总结](#总结)

## 项目初始化

我是采用 vite cli 工具进行项目初始化的，如果有用到其他方式创建 ts 项目的话，后面 eslint 配置，依赖安装都是差不太多。

项目初始化

```sh
npm create vite@latest
```

然后就是填写自己项目名称，选择 pull 项目类型，这里我选择的是`vanilla-ts`,其实这些一系列的询问步骤是一些脚手架的基本功能，如果你不能看懂上面的内容，可以查看官方文档。

最后我们进入相对应的目录进行依赖安装，查看`package.json`文件中项目配置 script，执行相对应的命令即可运行项目。

## eslint 配置

配置的过程不是很繁琐，大致分为依赖安装，eslint 配置文件添加配置，vscode 设置保存自动校验

### 相关依赖安装

- eslint 安装

```sh
npm i eslint --save-dev
```

创建配置文件`.eslintrc.json`,也可以选择 js 后缀的文件

```json
{
  "extends": ["eslint:recommended"]
}
```

这里 extends 配置是用来采用什么规则进行代码规范校验，recommended 是 eslint 默认规则

- 安装支持 ts 的 eslint 解析器

```sh
npm install @typescript-eslint/parser --save-dev
```

eslint 配置文件可以添加解析器

```json
{
  "parser": "@typescript-eslint/parser"
}
```

- 安装支持 ts 语法检测的 plugin

```sh
npm i @typescript-eslint/eslint-plugin --save-dev
```

### eslint 配置

下面是我们经过上面依赖安装过后，进行 eslint 配置更改，修改为支持 ts 解析器编译，安装 plugin 支持 ts 语法规则校验。

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  "rules": {
    "linebreak-style": ["error", "windows"],
    "no-console": 0
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

其中 parserOptions 为编译配置项，extends 为采用校验规则，env 代码中使用到的全局变量，rules 为 extends 规则中，单独设立的规则，相关规则的配置，参考 eslint rules 的配置说明。

### vscode 配置

设置当前所在的环境为 ts，并在自动保存的时候按照 eslint 配置校验修改代码

```json
{
  "language": "typescript",
  "autoFix": true
}
```

## 总结

认认真真，做个人吧；规规矩矩，写代码啊
