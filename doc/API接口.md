# API接口



## 档案(File)

### 汇总
| 说明                     | 请求URL                | **请求方式** |      |
| ------------------------ | ---------------------- | ------------ | ---- |
| 获取所有SingleFile       | /file/single           | GET          |      |
| 获取某SingleFile详情     | /file/single/:id       | GET          |      |
| 获取某SingleFile附件列表 | /file/single/:id/annex | GET          |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |
|                          |                        |              |      |



## 借阅(Borrow)

| 说明           | 请求URL     | 请求方式 |      |
| -------------- | ----------- | -------- | ---- |
| 借阅SingleFile | /borrow/:id |          |      |
|                |             |          |      |
|                |             |          |      |
|                |             |          |      |

## User
### 汇总

### 详情
#### 获取所有用户

##### URL
/user
    
##### 返回
```JSON
{
    "key": "1",
    "userName": "admin",
    "role": "SuperAdmin",
    "time": "2019-08-18 07:37:11",
    "remark": "超管啥都能干",
    "status": 1
}
```
