process.nextTick()，效率最高，消费资源小，但会阻塞CPU的后续调用； 
setTimeout()，精确度不高，可能有延迟执行的情况发生，且因为动用了红黑树，所以消耗资源大； 
setImmediate()，消耗的资源小，也不会造成阻塞，但效率也是最低的。
