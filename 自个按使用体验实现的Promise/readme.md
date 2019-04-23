JavaScript玩的就是异步，按照自己的ES6 Promise使用体验实现的Promise对象  
只能算是出版，因为并没有完全模拟实际体验  
new Promise()实例时间无论有没有then内部的异步或同步函数就已经执行，  
所以为了模拟这一体验，造成了Promise.all再监听是实际是执行了两次，待优化all,race！
