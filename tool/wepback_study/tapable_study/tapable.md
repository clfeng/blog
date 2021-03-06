# Tapable
理解：Tapable 本身是一个发布订阅者模式的封装库，内部实现了许多的钩子类，每一个钩子类可以理解为一类主题，这些主题具备着自己的特点，具体的特点可以根据类名识别出来

## 类理解
| 类名 | 特性 |
| - | - |
| SyncHook | 同步串行执行订阅者函数 |
| SyncBailHook | 同步串行执行订阅者函数，且会根据如果上一个订阅者函数返回值为 非undefined 时才会执行后面的函数 |
| SyncWaterfallHook | 同步串行执行订阅者函数，上一个订阅者函数的执行结果会传递给下一个订阅者函数 |
| SyncLoopHook | 同步串行执行订阅者函数，上一个订阅者函数的执行结果为undefined时，才会执行下一个订阅者函数，否则会一直执行着上一个订阅者函数 |
| AsyncSeriesHook | 异步串行执行订阅者函数 |
| AsyncSeriesBailHook | 异步串行执行订阅者函数，并且上一个订阅者函数的执行结果为 非undefined 的时候才会执行下一个订阅者函数 |
| AsyncSeriesWaterfallHook | 异步串行执行订阅者函数，并且上一个订阅者函数的执行结果会传递给下一个订阅者函数 |
| AsyncParallelHook | 异步并行执行订阅者函数，所有的订阅者函数并行执行 |
| AsyncParallelBailHook | 异步并行执行订阅者函数，并且当并行执行的订阅者函数中有一个的返回值为 非undefined 的时候便执行最终回调 |


### 类名的关键字

| 关键字    | 特点                                    |
| --------- | --------------------------------------- |
| sync      | 同步                                    |
| async     | 异步                                    |
| bail      | 返回结果为 非undefined 才执行后面的函数 |
| waterfall | 上一个函数的返回值会传递给下一个函数    |
| parallel  | 并行执行多个异步函数 |
| loop      | 循环执行函数，知道函数的返回值为 undefined 才往下执行 |
