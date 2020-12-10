/**
 * 1.获取compilation
 * 2.监听钩子
 * compilation.hooks.htmlWebpackPluginAlterAssetTags = new AsyncSeriesWaterfallHook([''])
 */

class PrefetchPlugin {
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('PrefetchPlugin', compilation => {
            console.log('----The compiler is starting a new compilation...-----------------------------');
            // console.log(compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing)
            //生成标签的时候做一些事情
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('PrefetchPlugin', (htmlData, cb) => {
                //如何拿到文件名
                let chunkMap = {};//所有代码块都在chunks上
                let tags = [];
                compilation.chunks.forEach(chunk => {
                    chunkMap[chunk.id]= chunk;
                })
                compilation.chunks.forEach(chunk => {//循坏每个代码块
                    let prefetchChunkIds = chunk.getChildIdsByOrders().prefetch;

                    console.log('====================================');
                    console.log(prefetchChunkIds);
                    console.log('====================================');
                    if (prefetchChunkIds) {
                        prefetchChunkIds.forEach(prefetchChunkId => {
                            let files = chunkMap[prefetchChunkId].files;
                            files.forEach(file => {
                                tags.push({
                                    tagName: 'link',
                                    closeTag: true,
                                    attributes: {ref: 'prefetch', as: 'script', href: file}
                                })
                            })
                        });
                    }
                })
                htmlData.head.push(...tags);
                cb();

                // htmlData.head.push(
                //     {
                //         tagName: 'link',
                //         closeTag: true,
                //         attributes: {ref: 'prefetch', as: 'script', href: 'hello.bundle.js'}
                //     }
                // )
                // htmlData.head.push({
                //     tagName: 'link',
                //     closeTag: true,
                //     attributes: {ref: 'prefetch', as: 'script', href: 'world.bundle.js'}
                // })

            })
        })
    }
}

module.exports = PrefetchPlugin;
