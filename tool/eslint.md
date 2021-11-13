# ESLint

基本配置

```javascript
// .eslintrc.js
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

以上配置，第一个值配置错误的级别；可以有以下的值

- `"off"` or `0` - 关闭规则
- `"warn"` or `1` - 开启规则，报告警提示
- `"error"` or `2` - 开启规则，报错误提示



eslint 的几个关键配置项：

Environments: 代码的运行环境，每个环境都有其特定的一些列预设变量

Globals: 代码运行中可以访问的额外的全局变量

Rules：那些规则被启用以及处理什么错误级别

Plugins: 哪些第三方插件定义了 ESLint 使用的额外规则、环境、配置等。



## 配置查找

```javascript
{
  // 默认情况下，ESLint 会按照目录结构一层层往上去找
  // 当 eslint 找到这份配置文件之后就不会接着往上找了
  "root": true,
}
```



## 继承

一份可分享的配置是一个npm包，这个包导出一个配置对象。包名满足：`eslint-config-xxx`格式，在通过 extends 关键字的时候，可以省略 `eslint-config-` 前缀

```javascript
{
  // 默认情况下，ESLint 会按照目录结构一层层往上去找
  // 当 eslint 找到这份配置文件之后就不会接着往上找了
  "root": true,
  // 配置继承的 eslint 配置
  // 整个继承是递归进行的，也就是说被继承的配置本身可能也继承了其他的规则
  "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended"
   ],
}
```



## 插件

命名格式 `eslint-plugin-xxx`

```javascript
{
    "plugins": [
        "react" // 等价于 eslint-plugin-react
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
       "react/no-set-state": "off"
    }
}
```



`--ext` 只有在参数是目录的时候会起作用，如果参数是 glob pattern 或者文件名都将不会起作用。

#### `--fix-type

1. problem - 修复代码中的潜在错误 
2. suggestion - 对改进它的代码应用修复 
3. layout - 应用不改变程序结构 (AST) 的修复 
4. directive - 对内联指令应用修复，例如 // eslint-disable 