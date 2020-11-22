//https://www.bookstack.cn/read/webpack-and-spa-guide/spilt.4.README.md
// 将 async/await 转换成 ES5 代码后需要这个运行时库来支持
import 'regenerator-runtime/runtime'
const routes = {
    // import() 返回 promise
    '/foo': () => import('./views/foo'),
    '/bar.do': () => import('./views/bar.do')
}
class Router {
    // ...
    // 加载 path 路径的页面
    // 使用 async/await 语法
    async load(path) {
        // 首页
        if (path === '/') path = '/foo'
        // 动态加载页面
        const View = (await routes[path]()).default
        // 创建页面实例
        const view = new View()
        // 调用页面方法，把页面加载到 document.body 中
        view.mount(document.body)
    }
}