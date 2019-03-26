### koa2

1:helloworld:
		a:安装node(7.6版本以上) 和koa
		 npm install koa

		b:初始化npm init
		 
		c:index代码
			const Koa = require('koa')
			const app = new Koa();//新建一个对象 本质是一个class
			app.use( async ( ctx ) => {
			  ctx.body = 'hello koa2'
			})
			app.listen(3000)
			console.log('[demo] start-quick is starting at port 3000')
			
		d:启动 node index

2:async/await使用
		a:chrome控制台执行;主要原因是chrome 对es6的支持已经很好，代码可以直接运行
		b:代码
		function getSyncTime() {
		  return new Promise((resolve, reject) => {
			try {
			  let startTime = new Date().getTime()
			  setTimeout(() => {
				let endTime = new Date().getTime()
				let data = endTime - startTime
				resolve( data )
			  }, 500)
			} catch ( err ) {
			  reject( err )
			}
		  })
		}

		async function getSyncData() {
		  let time = await getSyncTime()
		  let data = `endTime - startTime = ${time}`
		  return data
		}

		async function getData() {
		  let data = await getSyncData()
		  console.log( data )
		}

		getData()

		c:看出 async/await 的特点
		可以让异步逻辑用同步写法实现
		最底层的await返回需要是Promise对象
		可以通过多层 async function 的同步写法代替传统的callback嵌套
		
3:koa2简析结构
		├── lib
		│   ├── application.js
		│   ├── context.js
		│   ├── request.js
		│   └── response.js
		└── package.json
	    application.js 是整个koa2 的入口文件，封装了context，request，response，以及最核心的中间件处理流程。
		context.js 处理应用上下文，里面直接封装部分request.js和response.js的方法
		request.js 处理http请求
		response.js 处理http响应
		只提供封装好http上下文、请求、响应，以及基于async/await的中间件容器。
		利用ES7的async/await的来处理传统回调嵌套问题和代替koa@1的generator，但是需要在node.js 7.x的harmony模式下才能支持async/await。
		中间件只支持 async/await 封装的，如果要使用koa@1基于generator中间件，需要通过中间件koa-convert封装一下才能使用。