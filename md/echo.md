####  JavaScript图片延迟加载微型库Echo.js

###### Echo.js是一个标准的独立的Javascript图片懒加载（延迟加载）库，它非常小巧快速，只有2KB，它使用HTML5的 data-*属性，延迟请求加载图片资源，不依赖任意第三方插件库，特别适用于移动端需要加载大量图片的应用

1.引入文件 
 ```
 <script src="js/echo.min.js"></script> 
 ```
 
2.DOM结构  

 ```
 <img src="img/blank.gif" alt="Photo" data-echo="img/photo.jpg" />
 
 blank.gif 是一个 1 x 1 的图片，用做默认图片，
 data-echo 的属性值是图片的真实地址。
 你可以给图片设置宽度和高度，或者在 CSS 中设置，否则似乎很底部很底部的图片才会延迟加载
 
 ```
3. 初始化  

```
echo.init({  
offset: 100,  
throttle: 250,  
unload: false,  
callback: function (element, op) {  
console.log('loaded ok.');  
}  
});  

常用参数及方法说明
offset	离可视区域多少像素的图片可以被加载	0
throttle	图片延迟多少毫秒加载	250
debounce	防抖动	true
unload	告诉echo是加载还是卸载视图中的图片，当图片离开视图区域时触发	false
callback	回调函数，用来检测图片是否加载	function()


最后echo.js还提供了一个.render()方法，用法如下：

echo.render();  
应用场景：当你的页面没有发生滚动，而你想加载即将要显示的图片，如图片轮播，当第一张图片显示完，接着滑动展示第二张图片，这个时候使用

echo.render();
提前加载第二张图片，就不会出现图片加载卡顿白屏等现象
```