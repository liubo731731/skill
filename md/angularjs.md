### angularjs知识点汇聚
一次性数据绑定::

#### 1:ui-router详解
1. 导入js文件, 先angular,再ui-router
2. 注入angular模块,var app = angular.module('myApp', ['ui.router']),名字是输出exports="name"决定
3. ui-view替代的是ngroute路由的ng-view。
4. 配置路由状态  
```
app.config(["$stateProvider", function ($stateProvider){       
    $stateProvider     
    .state("home", { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/',    //访问路径 
        template:'<div>模板内容......</div>'
    })      

 }]);
```
5. 简单实例 https://blog.csdn.net/zcl_love_wx/article/details/52034193

### 2:嵌套路由

```
 <body >    
    <div ng-app="myApp" >
        <a ui-sref="parent">点我显示父view内容</a>
        <a ui-sref="parent.child">点我显示父view与子view内容</a>
        <div ui-view></div> <!-- 父View -->      
    </div>  
  </body>
      var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("parent", {//父路由
            url: '/parent',  
            template:'<div>parent'
                    +'<div ui-view><div>'// 子View
                    +'</div>'
        })      
        .state("parent.child", {//子路由
            url: '/child',    
            template:'<div>child</div>'
        })     
    }]);
  
  
```
注:上面的是相对路径方式： 
'parent'将匹配…./index.html#/parent； 'parent.child'将匹配…./index.html#/parent/child。   
若改成绝对路径方式  
则需要在子url里加上^:
此时，'parent'将匹配…./index.html#/parent； 'parent.child'将匹配…./index.html#/child。


### 3:通过views实现多视图
使用views属性。该属性里包含了哪些ui-view，则对应的template或templateUrl里的内容就会填充该ui-view。

```
	<div ui-view="header"></div>  
	<div ui-view="nav"></div>  
	<div ui-view="body"></div> 
js
	var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("index", {
            url: '/index',  
            views:{
                'header':{template:"<div>头部内容</div>"},
                'nav':{template:"<div>菜单内容</div>"},
                'body':{template:"<div>展示内容</div>"}
            }
        })      

    }]); 
```
### 4:绝对定位
@的作用 是用来绝对定位view，即说明该ui-view属于哪个模板。  
如：’header@index’表示名为header的view属于index模板。  
绝对和相对路径的效果一样，请看如下代码：
```
<body >    
    <div ng-app="myApp" >
        <a ui-sref="index">show index</a>
        <a ui-sref="index.content1">content111111</a>
        <a ui-sref="index.content2">content222222</a>
        <div ui-view="index"><div>             
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("index", {
            url: '/index',  
            views:{
                'index':{template:"<div><div ui-view='header'></div>  <div ui-view='nav'></div> <div ui-view='body'></div>  </div>"},
                //这里必须要绝对定位
                'header@index':{template:"<div>头部内容header</div>"},
                'nav@index':{template:"<div>菜单内容nav</div>"},
                'body@index':{template:"<div>展示内容contents</div>"}
            }
        })    
        //绝对定位
        .state("index.content1", {
            url: '/content1',  
            views:{
                'body@index':{template:"<div>content11111111111111111</div>"}
                //'body@index'表时名为body的view使用index模板
            }
        })  
        //相对定位：该状态的里的名为body的ui-view为相对路径下的（即没有说明具体是哪个模板下的）
        .state("index.content2", {
            url: '/content2',  
            views:{
                'body':{template:"<div>content2222222222222222222</div>"}//
            }
        })      

    }]);
  </script>


```

### 5:URL路由传参（通过$stateParams服务获取参数）
有url: '/index/:id',和url: '/index/{id}',两种形式传参  
ui-serf使用路由{id:30这种形式}  
一看就懂的代码  
```
 <body >    
    <div ng-app="myApp" >
        <a ui-sref="index({id:30})">show index</a>    
        <a ui-sref="test({username:'peter'})">show test</a>
        <div ui-view></div>
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("home", {
            url: '/',  
            template:"<div>homePage</div>"

        })
        .state("index", {
            url: '/index/:id',  
            template:"<div>indexcontent</div>",
            controller:function($stateParams){
                alert($stateParams.id)
            }
        })  
        .state("test", {
            url: '/test/:username',  
            template:"<div>testContent</div>",
            controller:function($stateParams){
                alert($stateParams.username)
            }
        })          

    }]);
  </script>
```


### 6:Resolve（预载入）
参考资料:有助理解,注入值/方法/异步promise  
开发者可以预先载入一系列依赖或者数据，然后注入到控制器中。  在ngRoute中resolve选项可以允许开发者在路由到达前载入数据保证（promises）。在使用这个选项时比使用angular-route有更大的自由度。

预载入选项需要一个对象，这个对象的key即要注入到控制器的依赖，这个对象的value为需要被载入的factory服务。

如果传入的时字符串，angular-route会试图匹配已经注册的服务  
如果传入的是函数，该函数将会被注入，并且该函数返回的值便是控制器的依赖之一。  
如果该函数返回一个数据保证（promise），这个数据保证将在控制器被实例化前被预先载入并且数据会被注入到控制器中。  
一看就懂的代码
```
<body >    
    <div ng-app="myApp" >
        <a ui-sref="index">show index</a>    
        <div ui-view></div>
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("home", {
            url: '/',  
            template:"<div>homePage</div>"

        })
        .state("index", {
            url: '/index/{id}',  
            template:"<div>indexcontent</div>",
            resolve: {
                //这个函数的值会被直接返回，因为它不是数据保证
                user: function() {
                  return {
                    name: "peter",
                    email: "audiogroup@qq.com"
                  }
                },
                //这个函数为数据保证, 因此它将在控制器被实例化之前载入。
                detail: function($http) {
                  return $http({
                    method: 'JSONP',
                    url: '/current_details'
                  });
                },
                //前一个数据保证也可作为依赖注入到其他数据保证中！（这个非常实用）
                myId: function($http, detail) {
                  $http({
                    method: 'GET',
                    url: 'http://facebook.com/api/current_user',
                    params: {
                      email: currentDetails.data.emails[0]
                    }
                  })
                }

            },
            controller:function(user,detail,myId$scope){
                alert(user.name)
                alert(user.email)
                console.log(detail)
            }
        })                  

    }]);

  </script>

```
