### echarts容器动态设置高度

之前在做手机端mui的时候，图标的横轴数量是变化的，一开始用vue动态计算高度，发现不管用，后来从网上搜到以下方法，亲测可用
所以记录下来！

<img src="./img/echarts/1.png"  width="50%" height="200px">

```
// getDom() 获取 ECharts 实例容器的 dom 节点
          let chartName = this.$echarts.init(document.getElementById("myChart1"));
          this.autoHeight = counts.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
          chartName.getDom().style.height = this.autoHeight + "px";
          chartName.getDom().childNodes[0].style.height = this.autoHeight + "px";
          chartName.getDom().childNodes[0].childNodes[0].setAttribute("height",this.autoHeight);
          chartName.getDom().childNodes[0].childNodes[0].style.height = this.autoHeight + "px";
          chartName.resize()；
```