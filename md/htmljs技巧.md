#### 前端html css 等基本技巧

* 移动端input 主动去除焦点，主要解决在手机端，input输入完成，键盘还是弹出状态。

```
var input = document.getElementById("your-input-id");
input.blur();
```
* vue input输入框绑定value写法

```
<input :value="(new Date(item.departureTime).format('yyyy-MM-dd hh:mm'))" readonly="readonly" type="text">

```


* !0=true，所以当值允许0时候,不允许为空需要排除!0
* 
=======
* 手动触发input -之前直接改变input value vue 模型不更新

```
_self.dispatchEvent(new Event('input'));



网上帖子
<input type="text" tip="手机号码" v-model="mobile" id="mobile" onkeyup="this.value=this.value.replace(/\D/g,'')" onclick="popupKey(this)" name="outerPrepareProposerModel[0].mobile" maxlength="20" class="am-input-sm">

如下即可实现数据的绑定

$(targetInput).val(value);
 //触发一下该input的input事件
  $(targetInput)[0].dispatchEvent(new Event('input'));
```

