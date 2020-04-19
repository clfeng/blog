import {
    SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} from 'tapable';

export default class TapableDemo {
    constructor() {
        this.hooks = {
            syncHook: new SyncHook(),
            syncLoopHook: new SyncLoopHook(), // 重点看这里,
            syncWaterfallHook: new SyncWaterfallHook(["newSpeed"]),
            syncBailHook: new SyncBailHook(), // 这里我们要使用SyncBailHook钩子啦
            asyncParallelHook: new AsyncParallelHook(),
            asyncParallelBailHook: new AsyncParallelBailHook(),
            asyncSeriesHook: new AsyncSeriesHook(),
            asyncSeriesBailHook: new AsyncSeriesBailHook(),
            asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(['home'])
        }
    }

    callSyncHook () {
        this.hooks.syncHook.call();
    }

    callSyncLoopHook () {
        this.hooks.syncLoopHook.call();
    }

    callSyncWaterfallHook(speed) {
        this.hooks.syncWaterfallHook.call(speed);
    }

    callSyncBailHook() {
        this.hooks.syncBailHook.call();
    }

    callAsyncParallelHook(callback) {
        // this.hooks.asyncParallelHook.callAsync(callback);
        return this.hooks.asyncParallelHook.promise();
    }

    callAsyncParallelBailHook(callback) {
        this.hooks.asyncParallelBailHook.callAsync(callback);
    }

    callAsyncSeriesHook () {
        return this.hooks.asyncSeriesHook.promise();
    }

    callAsyncSeriesBailHook () {
        return this.hooks.asyncSeriesBailHook.promise();
    }

    callAsyncSeriesWaterfallHook () {
        return this.hooks.asyncSeriesWaterfallHook.promise();
    }
}