# webpack(4.42.1)
## Webpack 流程概括

1. 初始化参数：从配置文件 和 Shell 语句中读取和合并参数，得到最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，通过执行对象的 run 方法开始编译
3. 确定人口：根据配置中的 entry 找出所有入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到每个模块被编译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再将每个 Chunk 转换成一个单独的文件加入输出列表中，这是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，将文件的内容写入文件系统中。



### 细节流程

初始化： 包括前面的1、2

编译：包括前面3、4、5

输出：包括前面的 6、7

### Compiler 和 Compilation

Compiler 和 Compilation 是plugin和wepback之间的桥梁。
Compiler 对象包含了 Webpack 环境的所有配置信息，包含 options，loaders，plugins 等信息。这个对象在 Webpack 启动时被实例化，它是全局唯一的，可以简单的将它理解为 Webpack 实例。

Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 webpack 以开发模式运行时，每当检测到一个文件发生变化，便有一次新的 Compilation 被创建。Compilation 对象也提供了很多事件回调供穿件进行扩展。通过 Compilation 也能取到 Compiler 对象。

Compiler 和 Compilation 对象都有继承自Tapable，都有着自己相应的事件勾子（主题）;此外还有JavascriptParser也是一个Tapable类型的实例，可以进行相关事件主题的订阅



### 初始化阶段

| **事件名**        | **解释**                                                     |
| ----------------- | ------------------------------------------------------------ |
| 初始化参数        | 从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。 这个过程中还会执行配置文件中的插件实例化语句 `new Plugin()`。 |
| 实例化 `Compiler` | 用上一步得到的参数初始化 `Compiler` 实例，`Compiler` 负责文件监听和启动编译。`Compiler` 实例中包含了完整的 `Webpack` 配置，全局只有一个 `Compiler` 实例。 |
| 加载插件          | 依次调用插件的 `apply` 方法，让插件可以监听后续的所有事件节点。同时给插件传入 `compiler` 实例的引用，以方便插件通过 `compiler` 调用 Webpack 提供的 API。 |
| `environment`     | 开始应用 Node.js 风格的文件系统到 compiler 对象，以方便后续的文件寻找和读取。 |
| `entry-option`    | 读取配置的 `Entrys`，为每个 `Entry` 实例化一个对应的 `EntryPlugin`，为后面该 `Entry` 的递归解析工作做准备。 |
| `after-plugins`   | 调用完所有内置的和配置的插件的 `apply` 方法。                |
| `after-resolvers` | 根据配置初始化完 `resolver`，`resolver` 负责在文件系统中寻找指定路径的文件。 |

### 编译阶段

| 事件名          | 解释                                                         |
| --------------- | ------------------------------------------------------------ |
| `run`           | 启动一次新的编译。                                           |
| `watch-run`     | 和 `run` 类似，区别在于它是在监听模式下启动的编译，在这个事件中可以获取到是哪些文件发生了变化导致重新启动一次新的编译。 |
| `compile`       | 该事件是为了告诉插件一次新的编译将要启动，同时会给插件带上 `compiler` 对象。 |
| `compilation`   | 当 `Webpack` 以开发模式运行时，每当检测到文件变化，一次新的 `Compilation` 将被创建。一个 `Compilation` 对象包含了当前的模块资源、编译生成资源、变化的文件等。`Compilation` 对象也提供了很多事件回调供插件做扩展。 |
| `make`          | 一个新的 `Compilation` 创建完毕，即将从 `Entry` 开始读取文件，根据文件类型和配置的 `Loader` 对文件进行编译，编译完后再找出该文件依赖的文件，递归的编译和解析。 |
| `after-compile` | 一次 `Compilation` 执行完成。                                |
| `invalid`       | 当遇到文件不存在、文件编译错误等异常时会触发该事件，该事件不会导致 Webpack 退出。 |



### 输出阶段

| 事件名        | 解释                                                         |
| ------------- | ------------------------------------------------------------ |
| `should-emit` | 所有需要输出的文件已经生成好，询问插件哪些文件需要输出，哪些不需要。 |
| `emit`        | 确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容。 |
| `after-emit`  | 文件输出完毕。                                               |
| `done`        | 成功完成一次完成的编译和输出流程。                           |
| `failed`      | 如果在编译和输出流程中遇到异常导致 Webpack 退出时，就会直接跳转到本步骤，插件可以在本事件中获取到具体的错误原因。 |
|               |                                                              |
|               |                                                              |


## webpack源码阅读
1. 命令行是如何运行的 webpack/bin  -> webpack-clic/bin
2. 不需要实力话webpack的相关命令	
```
const NON_COMPILATION_ARGS = [
	"init",  // 创建一份webpack 配置
	"migrate", // 进行webpack版本迁移
	"serve",  // 运行webpack-serve
	"generate-loader", // 生成webpack loader代码
	"generate-plugin", // 生成webpack plugin 代码
	"info" // 返回与本地环境相关的一些信息
];

```

3. Webapck-cli 会对配置文件和命令行参数进行转换最终生成配置选项参数 options



EventEmitter 事件的发布订阅者模式

![image-20200415210219444](/Users/chenliangfeng/Library/Application Support/typora-user-images/image-20200415210219444.png)





1. 先到webpack/bin/webpack.js 此处进行cli判断，如果已经安装了webpack-cli就引入webpack-cli

2. Webpack-cli 整合了一系列的命令行参数，在这里会对用户输入的命令行进行参数的分析，其中：

   1. NON_COMPILATION_CMD 是一些非编译相关的命令参数，会有另外一些特殊的行为
2. 内部使用yargs包进行命令行相关的操作，另外在webpack-cli中，需要对输入的参数进行处理（规范化）
   3. 将处理后的大包参数，传入给webpack.js，创建一个compiler实例，并进行实例化入进度条插件（根据参数来），最终会调用compiler.run方法

3. webpack.js：接收参数创建 compiler，并进行用户引入插件的apply方法调用，之后调用environment，afterEnvironment钩子，紧跟中处理webpack参数，并将处理后的结果赋值给compiler