/**
 * router.js 路由模块
 * 职责：
 * 		处理路由
 * 		根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */
var fs = require('fs')
var Students = require('./student')

// Express 提供了一种更好的方式
// 专门用来包装路由
var express = require('express')

// 1.创建一个路由容器
var router = express.Router()
// 2.把路由都挂载到 router 路由器中

/**
 * 渲染学生列表页面
 */
router.get('/students', function (req, res) {
	// fs.readFile('./db.json', 'utf8', function (err, data) {
	// 	if (err) {
	// 		return res.status(500).send('Server error')
	// 	}
	// 	var students = JSON.parse(data).students
	// 	res.render('index.html', {
	// 		fruits: [
	// 			'苹果',
	// 			'石榴',
	// 			'榴莲'
	// 		],
	// 		students: students
	// 	})
	// })
	Students.find(function (err, students) {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('index.html', {
			fruits: [
				'苹果',
				'石榴',
				'榴莲'
			],
			students: students
		})
	})	
})

/**
 * 处理添加学生
 */
router.get('/students/new', function (req, res) {
	res.render('new.html')
})

/**
 * 渲染添加学生
 */
router.post('/students/new', function (req, res) {
	// 1.获取表单数据
	// 2.处理
	// 		将数据保存到 db.json 文件用以持久化
	// 3.发送响应
	// 先读取出来，转换对象
	// 然后往对象中push文件
	// 然后把对象转为 字符串
	// 然后把字符串再次写入文件
	Students.save(req.body, function (err) {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
	console.log(req.query.id)
	Students.findById(parseInt(req.query.id), function (err, student) {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('edit.html', {
			student: student
		})
	})
})

/**
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
	Students.updateById(req.body, function (err) {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

/**
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
	Students.deleteById(req.query.id, function (err) {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})
// 把router导出
module.exports = router
