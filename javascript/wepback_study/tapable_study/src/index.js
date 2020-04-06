// index.js
import TapableDemo from './TapableDemo.js';

const tapableDemo = new TapableDemo();

// tapableDemo.hooks.syncHook.tap('syncHookPlugin', () => {
//     console.log('syncHookPlugin');
// });

// tapableDemo.callSyncHook();

// let index = 1;
// tapableDemo.hooks.syncLoopHook.tap('syncLoopHookPlugin1', () => {
//     console.log(`syncLoopHookPlugin1`);
//     if (index < 5) {
//         index++;
//         return 1;
//     }
// });

// tapableDemo.hooks.syncLoopHook.tap('syncLoopHookPlugin2', () => {
//     console.log(`syncLoopHookPlugin2`);
// });

// tapableDemo.callSyncLoopHook();

// tapableDemo.hooks.syncWaterfallHook.tap('syncWaterfallHookPlugin1', (speed) => { console.log(`syncWaterfallHook ${speed}`); return speed + 100; });
// tapableDemo.hooks.syncWaterfallHook.tap('syncWaterfallHookPlugin2', (speed) => { console.log(`syncWaterfallHook ${speed}`); return speed + 100; });
// tapableDemo.hooks.syncWaterfallHook.tap('syncWaterfallHookPlugin3', (speed) => { console.log(`syncWaterfallHook ${speed}`); });
// tapableDemo.callSyncWaterfallHook(50); // 打印‘加速到50’‘加速到150’‘加速到250’

// tapableDemo.hooks.syncBailHook.tap('syncBailHookPlugin1', () => {
//     console.log(`syncBailHook 1`);
//     return;
// });
// // 上一个订阅者函数返回 undefined 才会执行下一个
// tapableDemo.hooks.syncBailHook.tap('syncBailHookPlugin2', () => { console.log(`syncBailHook 2`); return 1; });
// tapableDemo.hooks.syncBailHook.tap('syncBailHookPlugin3', () => console.log(`syncBailHook 3`));
// tapableDemo.callSyncBailHook();


// callAysnc demo
// tapableDemo.hooks.asyncParallelHook.tapAsync('asyncParallelHookPlugin1', (callback) => {
//   setTimeout(() => {
//     console.log('asyncParallelHookPlugin1');
//     console.log('plugin1 call', new Date());
//     callback();
//   }, 1000);
// });

// tapableDemo.hooks.asyncParallelHook.tapAsync('asyncParallelHookPlugin2', (callback) => {
//   setTimeout(() => {
//     console.log('asyncParallelHookPlugin2');
//     console.log('plugin2 call', new Date());
//     callback();
//   }, 2000);
// });
// console.log('start', new Date());
// tapableDemo.callAsyncParallelHook(() => { console.log('asyncParallelHook end'); });

// tapPromise demo
// tapableDemo.hooks.asyncParallelHook.tapPromise('asyncParallelHookPlugin1', () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('asyncParallelHookPlugin1');
//             resolve();
//         }, 1000);
//     });
// });

// tapableDemo.hooks.asyncParallelHook.tapPromise('asyncParallelHookPlugin2', () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('asyncParallelHookPlugin2');
//             resolve();
//         }, 2000);
//     });
// });

// tapableDemo.hooks.asyncParallelHook.tapAsync('asyncParallelHookPlugin3', (callback) => {
//     setTimeout(() => {
//         console.log('asyncParallelHookPlugin3');
//         callback();
//     }, 3000);
// });

// tapableDemo.callAsyncParallelHook().then(() => { console.log('asyncParallelHook end'); });

// tapableDemo.hooks.asyncParallelBailHook.tapAsync('asyncParallelBailHookPlugin1', (callback) => {
//     setTimeout(() => {
//         console.log('asyncParallelBailHook plugin 1');
//         callback(1); // 这里传递个1，不是undefined
//         // callback();
//     }, 1000);
// });

// tapableDemo.hooks.asyncParallelBailHook.tapAsync('asyncParallelBailHookPlugin2', (callback) => {
//     setTimeout(() => {
//         console.log('asyncParallelBailHook plugin 2');
//         callback(2);
//     }, 2000);

// });

// tapableDemo.callAsyncParallelBailHook((result) => { console.log('asyncParallelBailHook result', result); });


// tapableDemo.hooks.asyncSeriesHook.tapPromise('asyncSeriesHookPlugin1', () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('asyncSeriesHookPlugin1', new Date());
//             resolve();
//         }, 1000);
//     });
// });

// tapableDemo.hooks.asyncSeriesHook.tapPromise('asyncSeriesHookPlugin2', () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('asyncSeriesHookPlugin2', new Date());
//             resolve();
//         }, 2000);
//     });
// });

// console.log('start', new Date());
// tapableDemo.callAsyncSeriesHook().then(() => { console.log('asyncSeriesHookPlugin end', new Date()); });


// tapableDemo.hooks.asyncSeriesBailHook.tapPromise('asyncSeriesBailHookPlugin1', () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('asyncSeriesBailHookPlugin1');
//             resolve(1);
//         }, 1000);
//     });
// });

// tapableDemo.hooks.asyncSeriesBailHook.tapPromise('asyncSeriesBailHookPlugin2', () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('asyncSeriesBailHookPlugin2');
//             resolve(2);
//         }, 2000);
//     });
// });

// tapableDemo.callAsyncSeriesBailHook().then(() => { console.log('asyncSeriesBailHookPlugin end'); });

tapableDemo.hooks.asyncSeriesWaterfallHook.tapPromise('asyncSeriesWaterfallHookPlugin1', (result) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('asyncSeriesWaterfallHookPlugin1', result);

            resolve(1);
        }, 1000);
    });
});

tapableDemo.hooks.asyncSeriesWaterfallHook.tapPromise('asyncSeriesWaterfallHookPlugin2', (result) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('asyncSeriesWaterfallHookPlugin2', result);
            resolve(2);
        }, 2000);
    });
});

tapableDemo.callAsyncSeriesWaterfallHook().then((result) => { console.log('asyncSeriesWaterfallHookPlugin2 end, and result', result); });