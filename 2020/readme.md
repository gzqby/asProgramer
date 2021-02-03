# 时间线—2020.7.2后

1. `var _BOM = /^\uFEFF/;` **字节顺序标记**（英语：byte-order mark，**BOM**）是位于码点`U+FEFF`的统一码字符的名称
2. react-router: Router组件需要传入history，mount之后history.listen，保存与state并传递下去给Route
3. 浏览器渲染出来，下发html同时带出一些数据，比如通过script绑定在window上，然后react
```
ReactDOM.hydrate(
        <App initCount={window.__initCount__} />
    , document.getElementById('app'))
```
4. react-redux：使用redux的subscribe或contextValue.sub机制，绑定handleChangeWrapper，带动执行checkForUpdates，校验。