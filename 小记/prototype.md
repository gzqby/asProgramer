Demo.prototype === demo.\_\_proto\_\_|Object.getPrototypeOf(demo)  //true
1.对象的实例化指向类或者构造函数的prototype,即可访问prototype的方法；  
2.对象的实例可访问类或者构造函数的this.propety;   
3.对象可访问父级的this.  
4.类或者函数.属性即是静态属性，自己所有。  
所以根据这个逻辑可自己写出extends逻辑！  
即：1》子类的prototype有父类prototype方法，但是引用不同！实现这部分要注意的是不能直接把父类prototype赋值给子类的prototype，需要包装
父类的prototype再赋值于它！
2》把父类的this转到子类this上！Demo.call(Parent);
