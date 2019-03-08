setBIgPriceColor函数，保持其传入值一致；在index2中能正常输出结果；在index1中会出现变量被定义在for循环中的一样的效果！(即每次对数组中一个值赋值会覆盖上一次的赋值！ )  
(代码运行在在老版本微软JS解析器，在node11和chrome71依然会出现这个情况)


最终解决：  
如果把这个函数单独拿出来，即index2中，只需把引用改写即可：returnArr = [].contac(returnArr);把returnArr中的二个二级数组拿出来也可以结果;再次测试引用不变也可以。  
在index1中，把returnArr里面的二级数组分别赋值，并且把引用改写，两个一起才能起到作用！
