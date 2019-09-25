/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
var fs = require('fs')
var dbPath = './db.json'

/**
 * 获取所有学生列表
 * return[]
 */
exports.find = function (callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number} id 学生id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find( function (item) {
			return item.id === parseInt(id)
		})
		callback(null, ret)
	})
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students

		// 处理id 唯一的，不重复
		student.id = students[students.length - 1].id + 1

		// 把用户传递的对象保存到数组中
		students.push(student)

		// 把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})

		// 把字符串保存到文件中
		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		student.id = parseInt(student.id)

		// ES6中：find() 函数
		// 当某个遍历项符合 item.id === student.id 条件的时候，find会终止遍历, 同时会返回遍历项
		var stu = students.find(function (item) {
			return item.id === student.id
		})

		// 遍历拷贝对象
		for (var key in student) {
			stu[key] = student[key]
		}

		// 把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})

		// 把字符串保存到文件中
		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

/**
 * 删除学生
 */
exports.deleteById = function (id, callback) {
	fs.readFile(dbPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var deleteId = students.findIndex(function (item) {
			return item.id === parseInt(id)
		})
		students.splice(deleteId, 1)
		// 把对象数据转换为字符串
		var fileData = JSON.stringify({
			students: students
		})

		// 把字符串保存到文件中
		fs.writeFile(dbPath, fileData, function (err) {
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}
