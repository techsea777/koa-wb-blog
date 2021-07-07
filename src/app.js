const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler 页面上打印错误的
onerror(app)

// middlewares
// 处理postData数据的
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(logger())

// 将文件静态化
app.use(require('koa-static')(__dirname + '/public'))
// 指定服务端渲染模板 为ejs模板
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger 
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
