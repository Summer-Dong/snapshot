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

  命令行进入项目主目录snapshot，在运行机器上已安装Node的前提下命令行输入：

    $ npm install -g grunt bower 
		$ npm install
		$ bower install
		$ grunt serve


 **单元测试:**

  命令行进入项目主目录snapshot，命令行输入：

		$ grunt 
		
<br/>

## 2 项目说明：

 **操作提示：**

此项目中获取动物的坐标快照是在前端页面实现的。运行项目代码成功后，浏览器会自动打开[http://localhost:9000/#/](http://localhost:9000/#/)页面，根据页面提示，在左侧输入框输入historyData,并在右侧上方输入框输入查询日期的id，点击查询，右下方就会显示出当前查询时间的动物坐标快照。

 **函数getSnapshot()介绍：**

- 此函数位于项目代码目录中“snapshot/app/scripts/controllers/main.js”文件，因函数内部处理的参数vm.historyData、vm.ID是全局变量，两个全局变量的值通过AngularJS的双向数据绑定分别与前端页面内的两个输入框内容同步，故getSnapshot()函数没有设置参数。

- 函数getSnapshot()通过调用“snapshot/app/scripts/services”文件夹下的所有js文件内的函数实现对historyData的处理，可应对historyData中各变量间出现的任意多个空白符，当id输入有误时，函数会做出判断提示“Invalid id.”，并将各种可能出现的historyData错误考虑在内，有较好的容错处理机制。

 **解题思路梳理：**

- 将historyData拆分成nodes数组：先将字符串中的所有空字符替换成一个空格，然后根据正则表达式匹配每个时间字符串，并根据时间字符串的位置分割整个字符串。
- 拆分nodes数组项：先将所有的时间字符串替换成呢对应的毫秒值（方便后边的排序、坐标计算等），然后分离出数据ID、时间值、动物名字、动物对应的坐标值。 
- 按照时间对拆分后的数组项进行冒泡排序。
- 对输入的id验证合法性：如果不合法，输出“Invalid id.”并终止后续步骤；如果合法，继续后续步骤。
- 计算动物在所输入时间的位置、初始位置和位移长度并验证字符串的有效性。
- 按照动物名字排序输出并计算出最长的位移输出其对应的动物名字。 
