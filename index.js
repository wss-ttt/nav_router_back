const express = require('express');
const app = express();
const mysql = require("mysql");
// 1 引入body-parser包
const bodyParser = require('body-parser');

// 2 配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());


var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'nav_router_back',
  user: 'root',
  password: 'root'
});
connection.connect(function (err) {
  if (err) {
    console.log('数据库连接失败');
    console.log('err:', err);
    return;
  }
  console.log('连接成功')
});

//设置跨域访问
/* app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
}); */

// 登录接口
app.post('/login', function (req, res) {
  // 获取参数
  let name = req.body.name
  let password = req.body.password
  let sql = 'select * from user where name = ? and password = ?'
  let params = [name, password]
  connection.query(sql, params, function (err, results) {
    if (results.length > 0) {
      return res.json({
        code: 0,
        msg: 'success',
        data: results
      })
    } else {
      return res.json({
        code: 1,
        msg: '用户名或密码不存在'
      });
    }
  })
})

// 查询
app.post('/user/list', function (req, res) {
  let sql = 'select * from user'
  connection.query(sql, function (err, results) {
    if (err) {
      return res.json({
        code: 1,
        msg: 'error'
      })
    }
    res.json({
      code: 0,
      msg: 'success',
      data: results
    })
  })
})

// remove接口
app.post('/user/remove', function (req, res) {
  let id = req.body.id
  let sql = 'delete from user where id = ?'
  let params = [id]
  connection.query(sql, params, function (err, results) {
    if (err) {
      return res.json({
        code: 1,
        msg: 'error'
      })
    }
    res.json({
      code: 0,
      msg: '删除成功'
    })
  })
})

// info接口
app.post('/user/info', function (req, res) {
  let id = req.body.id
  let sql = 'select * from user where id = ?';
  let params = [id];
  connection.query(sql, params, function (err, results) {
    if (err) {
      return res.json({
        code: 1,
        msg: 'error'
      })
    }
    res.json({
      code: 0,
      msg: 'success',
      data: results[0]
    })
  })
})

// edit 接口
app.post('/user/edit', function (req, res) {
  let sql = 'update user set name = ?, age = ?, sex = ? where id = ?';
  let params = [req.body.name, req.body.age, req.body.sex, req.body.id];
  connection.query(sql, params, function (err, results) {
    if (err) {
      return res.json({
        code: 1,
        msg: 'error'
      })
    }
    res.json({
      code: 0,
      msg: 'success'
    })
  })
})

// add 接口
app.post('/user/add', function (req, res) {
  let sql = 'insert into user(name, age, sex) values(?, ?, ?)';
  let params = [req.body.name, req.body.age, req.body.sex];
  connection.query(sql, params, function (err, results) {
    if (err) {
      return res.json({
        code: 1,
        msg: 'error'
      })
    }
    res.json({
      code: 0,
      msg: 'success'
    })
  })
})

app.listen(3001, function () {
  console.log('服务启动成功');
});