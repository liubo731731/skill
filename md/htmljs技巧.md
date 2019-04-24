#### 前端html css 等基本技巧

* 移动端input 主动去除焦点，主要解决在手机端，input输入完成，键盘还是弹出状态。

```
var input = document.getElementById("your-input-id");
input.blur();
```
