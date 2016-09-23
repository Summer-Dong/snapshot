# 动物群体研究坐标快照[![Build Status](https://travis-ci.org/Summer-Dong/snapshot.svg?branch=master)](https://travis-ci.org/Summer-Dong/snapshot)

<br/>


## 1 项目简介

 **项目地址：**

 [https://github.com/Summer-Dong/snapshot](https://github.com/Summer-Dong/snapshot)

 **项目框架:**

  AngularJS + Bootstrap
  
 **开发工具:**

  Node + grunt + bower + karma 
  
 **运行项目:**

  命令行进入项目主目录snapShot，在运行机器上已安装Node的前提下命令行输入：

    $ npm install -g grunt bower 
		$ npm install
		$ bower install
		$ grunt serve


 **单元测试:**

  命令行进入项目主目录snapShot，在运行机器上已安装Node、grunt、karma的前提下命令行输入：

		$ grunt 
<br/>
## 2 项目说明：

 **操作提示：**

此项目中获取动物的坐标快照是在前端页面实现的。运行项目代码成功后，浏览器会自动打开[http://localhost:9000/#/](http://localhost:9000/#/)页面，根据页面提示，在左侧输入框输入historyData,并在右侧上方输入框输入查询日期的id，点击查询，右下方就会显示出当前查询时间的动物坐标快照。

 **函数getSnapshot()介绍：**

- 此函数位于项目代码目录中“snapshot/app/scripts/controllers/main.js”文件，因函数内部处理的参数vm.historyData、vm.ID是全局变量，两个全局变量的值通过AngularJS的双向数据绑定分别与前端页面内的两个输入框内容同步，故getSnapshot()函数没有设置参数。



- 函数getSnapshot()通过调用“snapshot/app/scripts/services”文件夹下的所有js文件内的函数实现对historyData的处理，可应对historyData中各变量间出现的任意多个空白符，当id输入有误时，函数会做出判断提示“Invalid id.”，并将各种可能出现的historyData错误考虑在内，有较好的容错处理机制。
