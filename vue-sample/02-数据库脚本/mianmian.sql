/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50556
Source Host           : localhost:3306
Source Database       : mianmian

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2020-05-07 13:16:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for a_permission_permission_group
-- ----------------------------
DROP TABLE IF EXISTS `a_permission_permission_group`;
CREATE TABLE `a_permission_permission_group` (
  `pgid` bigint(20) NOT NULL COMMENT '权限组ID',
  `pid` bigint(20) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`pgid`,`pid`),
  KEY `FK74qx7rkbtq2wqms78gljv87a0` (`pid`),
  CONSTRAINT `FK74qx7rkbtq2wqms78gljv87a0` FOREIGN KEY (`pid`) REFERENCES `pe_permission` (`id`),
  CONSTRAINT `FKee9dk0vg99shvsytflym6egxd` FOREIGN KEY (`pgid`) REFERENCES `pe_permission_group` (`id`)
)  DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of a_permission_permission_group
-- ----------------------------
INSERT INTO `a_permission_permission_group` VALUES ('2', '28');
INSERT INTO `a_permission_permission_group` VALUES ('2', '29');
INSERT INTO `a_permission_permission_group` VALUES ('2', '30');
INSERT INTO `a_permission_permission_group` VALUES ('2', '31');
INSERT INTO `a_permission_permission_group` VALUES ('2', '32');
INSERT INTO `a_permission_permission_group` VALUES ('2', '33');
INSERT INTO `a_permission_permission_group` VALUES ('2', '34');
INSERT INTO `a_permission_permission_group` VALUES ('2', '35');
INSERT INTO `a_permission_permission_group` VALUES ('3', '35');
INSERT INTO `a_permission_permission_group` VALUES ('2', '36');
INSERT INTO `a_permission_permission_group` VALUES ('3', '36');
INSERT INTO `a_permission_permission_group` VALUES ('2', '37');
INSERT INTO `a_permission_permission_group` VALUES ('3', '37');
INSERT INTO `a_permission_permission_group` VALUES ('2', '38');
INSERT INTO `a_permission_permission_group` VALUES ('3', '38');
INSERT INTO `a_permission_permission_group` VALUES ('2', '39');
INSERT INTO `a_permission_permission_group` VALUES ('3', '39');
INSERT INTO `a_permission_permission_group` VALUES ('2', '40');
INSERT INTO `a_permission_permission_group` VALUES ('3', '40');
INSERT INTO `a_permission_permission_group` VALUES ('2', '41');
INSERT INTO `a_permission_permission_group` VALUES ('3', '41');
INSERT INTO `a_permission_permission_group` VALUES ('2', '42');
INSERT INTO `a_permission_permission_group` VALUES ('3', '42');
INSERT INTO `a_permission_permission_group` VALUES ('2', '43');
INSERT INTO `a_permission_permission_group` VALUES ('3', '43');
INSERT INTO `a_permission_permission_group` VALUES ('2', '44');
INSERT INTO `a_permission_permission_group` VALUES ('2', '46');
INSERT INTO `a_permission_permission_group` VALUES ('2', '47');
INSERT INTO `a_permission_permission_group` VALUES ('2', '48');
INSERT INTO `a_permission_permission_group` VALUES ('2', '49');
INSERT INTO `a_permission_permission_group` VALUES ('2', '50');
INSERT INTO `a_permission_permission_group` VALUES ('2', '51');
INSERT INTO `a_permission_permission_group` VALUES ('3', '51');

-- ----------------------------
-- Table structure for bs_user
-- ----------------------------
DROP TABLE IF EXISTS `bs_user`;
CREATE TABLE `bs_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `introduction` text COMMENT '介绍',
  `last_update_time` datetime DEFAULT NULL COMMENT '最后修改时间',
  `password` text COMMENT '密码',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号码',
  `status` int(11) DEFAULT '0' COMMENT '账号状态 0为启用，1为禁用',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `sex` varchar(10) NOT NULL COMMENT '性别',
  `role` varchar(50) DEFAULT NULL COMMENT '角色',
  `permission_group_id` bigint(20) DEFAULT NULL COMMENT '权限组ID',
  PRIMARY KEY (`id`),
  KEY `permission_group_id` (`permission_group_id`),
  CONSTRAINT `bs_user_ibfk_1` FOREIGN KEY (`permission_group_id`) REFERENCES `pe_permission_group` (`id`)
)  AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bs_user
-- ----------------------------
INSERT INTO `bs_user` VALUES ('2', null, '2018-08-22 03:32:11', 'root@admin.com', null, '2020-05-07 12:46:36', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', null, '0', '超级管理员', '男', 'admin', '2');
INSERT INTO `bs_user` VALUES ('3', '', '2019-02-14 10:26:17', 'editor@admin.com', '', '2020-04-27 09:26:32', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', '0', ' 录入管理员', '男', 'editor', '3');

-- ----------------------------
-- Table structure for hm_articles
-- ----------------------------
DROP TABLE IF EXISTS `hm_articles`;
CREATE TABLE `hm_articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `title` varchar(256) NOT NULL COMMENT '标题',
  `articleBody` text COMMENT '文章正文',
  `videoURL` varchar(256) DEFAULT NULL COMMENT '视频地址',
  `visits` int(11) DEFAULT NULL COMMENT '阅读数',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `createTime` datetime DEFAULT NULL,
  `creatorID` int(11) NOT NULL COMMENT '录入人',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='文章';

-- ----------------------------
-- Records of hm_articles
-- ----------------------------
INSERT INTO `hm_articles` VALUES ('6', '不负时光，不负你——大数据就业38期开班啦！', '<p class=\"ql-align-center\">不负时光，不负你！</p><p class=\"ql-align-center\">阳光正好的下午，</p><p class=\"ql-align-center\">直播间里讲师激情澎湃地讲着每个知识点，</p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/202003/14/233412ymcs6j18ged2o2gk.png.thumb.jpg\" height=\"487\" width=\"720\"></p><p class=\"ql-align-center\">班级考勤显示全勤，</p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/202003/14/233412bwezy5caw515k1pg.png.thumb.jpg\" height=\"228\" width=\"370\"></p><p class=\"ql-align-center\">我发布了考勤信息之后整理了一下电脑，</p><p class=\"ql-align-center\">猫咪的猫砂盆也收拾了，安安静静趴在我的床上，</p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/202003/14/234004h5x89wvz2fd6jbfx.jpg.thumb.jpg\" height=\"540\" width=\"720\"></p><p class=\"ql-align-center\">收拾了一下阳台上的位置，梳理一下情绪，准备记录下我们开班的瞬间！</p><p class=\"ql-align-center\">3月9号我们如约顺利在大数据就业38期的直播间开班了。</p><p class=\"ql-align-center\">前一天晚上我睡的比较晚，光PPT就改了n个版本，哪怕是一个背景图片，我知道展示可能也就2-3s，但是我还是想尽力把PPT准备好！我只想给你们展示班主任认真的一面！</p><p class=\"ql-align-center\">我想了n种跟大家见面的方式，奈何我的电脑不给力，没法在线上跟大家见面，不过线下我们会有机会，那就请耐心再等等吧！</p><p class=\"ql-align-center\">开班当天大家都没有迟到，开班典礼上虽然看不到你们的脸，但是我感受到那天我们是充满欢乐的！</p><p class=\"ql-align-center\">线下班级的时候按照开班流程我们应该一起拍一张专属我们的全班大合影，线上我们也不能少的仪式感！</p><p><br></p>', 'https://v-cdn.zjol.com.cn/277003.mp4', '11', '1', '2020-05-01 17:40:21', '2');
INSERT INTO `hm_articles` VALUES ('7', '生命不是要超越别人，而是要超越自己', '<p class=\"ql-align-center\">生命不是要超越别人，而是要超越自己</p><p><br></p><p><br></p><p><br></p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/static/image/smiley/bozai/40.gif\"><img src=\"http://bbs.itheima.com/static/image/smiley/bozai/40.gif\"><img src=\"http://bbs.itheima.com/static/image/smiley/bozai/40.gif\"></p><p><br></p><p class=\"ql-align-center\">理想并不是没有目的的去空想</p><p><br></p><p class=\"ql-align-center\">而是需要以奋斗为基石</p><p><br></p><p class=\"ql-align-center\">没有理想的奋斗是不明智的</p><p><br></p><p class=\"ql-align-center\">不去奋斗的理想同样也是无用的</p><p><br></p><p class=\"ql-align-center\">同学们，要想实现你心中的那个梦想</p><p><br></p><p class=\"ql-align-center\">就行动起来吧</p><p><br></p><p class=\"ql-align-center\">去为之努力</p><p><br></p><p class=\"ql-align-center\">为之奋斗</p><p><br></p><p class=\"ql-align-center\">这样你的理想才会实现，才会成为现实。</p><p><br></p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/98.gif\"><img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/98.gif\"><img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/98.gif\"><img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/98.gif\"></p><p><br></p><p class=\"ql-align-center\">大数据基础39期的同学们，你们是最棒的<img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/84.gif\"></p><p><br></p>', 'https://v-cdn.zjol.com.cn/277003.mp4', '23', '1', '2020-05-16 17:40:24', '2');
INSERT INTO `hm_articles` VALUES ('8', '深圳黑马前端与移动开发就业50期开班啦！', '<p><span style=\"color: rgb(54, 54, 54);\">和冬日一起肆长的求知欲</span></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;在这个1月盛放&nbsp;&nbsp;​​</span></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;寒冷也挡不住的</span></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;是每一位学员炽热的求知之心</span></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;和冬日一起盛放的</span></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;是每一位学员对无人机的探索之欲&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><img src=\"http://bbs.itheima.com/data/attachment/forum/202001/17/115940xmhi5cjxw1wsr5ww.jpg.thumb.jpg\" height=\"540\" width=\"720\"></p><p><br></p><p><span style=\"color: rgb(54, 54, 54);\">1月12日，深圳黑马前端与移动开发开班之日 迎来第50期班级队伍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><span style=\"color: rgb(54, 54, 54);\">不同的班级团队 对前端开发同样的热枕</span></p><p><br></p><p><br></p><p><img src=\"http://bbs.itheima.com/data/attachment/forum/202001/17/115944qd4ucpumjzd7assm.jpg.thumb.jpg\" height=\"540\" width=\"720\"></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一丝不苟地研读教材&nbsp;&nbsp;认真细致的开课笔记&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><span style=\"color: rgb(54, 54, 54);\">首先是班主任对大家的到来表示了欢迎 同时对每一位学员寄予深切的期望 让每一位学员 扎实领会it理论知识 用爱成就每一位学员 是学院教学的使命和责任 学员们来黑马学习&nbsp;&nbsp;…… 铿锵有力的嗓音 细致生动的讲述 hold住全场 除了全神贯注的听，别无念想&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><span style=\"color: rgb(54, 54, 54);\">我们是认真的 平日是好伙伴好朋友 但触及教学秩序和要求可是铁面无私 宿舍要保持干净、休息时间勿扰人 也暖心提醒，注意防晒防中暑&nbsp;&nbsp;&nbsp;&nbsp;</span></p><p><span style=\"color: rgb(54, 54, 54);\">开班典礼上 代表教员面向全体学员起誓传 递着本次教学的态度和决心&nbsp;&nbsp;</span></p><p><span style=\"color: rgb(54, 54, 54);\">&nbsp;&nbsp;接下来 是每一位学员的自我介绍&nbsp;&nbsp;“我为什么来黑马学习呢 ？”老父亲一脸腼腆 台下瞬间乐开了花&nbsp;&nbsp;</span></p><p><span style=\"color: rgb(54, 54, 54);\">一张张鲜活可爱的面孔 写满了这个1月将会与深圳黑马前端的故事</span></p><p><span style=\"color: rgb(54, 54, 54);\">期待5个月后的你们 带着饱满的知识技能 顺利结业 满载而归！</span></p>', 'https://v-cdn.zjol.com.cn/276984.mp4', '1112', '1', '2020-05-26 17:40:28', '2');
INSERT INTO `hm_articles` VALUES ('9', '前端小白无基础入门HTML5+CSS3', '<p><strong>教程简介</strong></p><p>前端基础入门HTML5+CSS3----站在一门入门标签语言的角度，重点讲解了常见的HTML5标签，CSS3最常用的样式，最后站在实际开发的角度讲解一个PC端的品优购项目。梳理出PC端静态页面开发流程和规范。</p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/201911/06/161838rgjr6jjjxm5ynmki.jpg.thumb.jpg\" height=\"309\" width=\"720\"></p><p><strong>教程内容</strong></p><p>先讲解HTML5常用标签，接着讲解CSS3常见样式，主要学习盒子模型，浮动，定位还有高级布局技巧，之后讲解HTML5和CSS3提高，讲解新增加的新特性，新语法，最后讲解PC端品优购项目。</p><p><br></p><p><strong>课程亮点</strong></p><p>1，代码也可以讲解的有趣，生动，好玩，让你快乐的学习。</p><p>2，一些枯燥的理论，采取生动的生活案例相辅助，让你理解的更深刻。</p><p>3，视频讲解有趣，完全站在小白角度讲解课程，前端小白的最佳入门学习视频。</p><p>4，最后品优购项目，采取模块化，结构与样式相分离等，更贴近实际开发。</p><p><br></p><p><strong>讲解方式</strong></p><p>站在初学者角度来讲解课程，完全可以让你从零基础小白到独立完成PC端静态页面布局。</p><p><br></p><p><strong>适用人群</strong></p><p>希望未来从事前端行业的小伙伴最佳入门学习视频。</p><p><br></p><p><strong>课程目录</strong></p><p>1. HTML5基础-基本常用标签</p><p>2. CSS3基础- 常见样式、选择器</p><p>3. 盒子模型</p><p>4. 浮动详解</p><p>5. PC端学成在线页面开发</p><p>6. 定位分类详解</p><p>7. CSS高级技巧(精灵图、字体图标、三角等）</p><p>8. 常见布局技巧</p><p>9. HTML5CSS3提高-新属性新样式</p><p>10. 页面开发流程规范</p><p>11. 品优购项目开发流程规范</p><p>12. 网页TDK标签SEO优化</p><p>13. 网页logo SEO优化</p><p>14. 品优购首页、列表页、注册页面开发</p><p>15. 服务器概念</p><p>16. 网站上传以及域名注册</p><p><br></p>', null, '1233', '1', '2020-05-18 21:40:32', '2');
INSERT INTO `hm_articles` VALUES ('10', '【视频教程】javaScript进阶面向对象ES6', '<p><strong>本次主讲内容：</strong></p><p>首先讲解什么是面向对象，然后从ES6类面向对象语法，面向对象案例，原型和原型链，如何利用组合继承模拟类的继承。高阶函数，call、apply、bind 的使用，严格模式、闭包、递归函数、正则表达式、ES6新语法。</p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/201908/14/104615m9loaaego7zcpkra.jpg.thumb.jpg\" height=\"309\" width=\"720\"></p><p><br></p><p><strong>课程讲解方式：</strong></p><p>站在初学者角度来讲解课程，完全可以让你从JavaScript小白到高级。</p><p><br></p><p><strong>本次课程亮点：</strong></p><p>1，代码也可以讲解的有趣，生动。</p><p>2，一些枯燥的理论，结合实际生活场景更加容易理解。</p><p>3，知识的连贯性，pink老师从 最基础的html+css 带你到 JavaScript，完全一条体系。</p><p><br></p><p><strong style=\"color: rgb(54, 54, 54);\">课程适用人群：</strong></p><p>1、希望未来从事前端行业的小伙伴进行入门学习。</p><p>2、学习完毕js基础和js API的同学。</p><p><br></p><p><strong>课程目录：</strong></p><p>1. 面向对象和面向过程</p><p>2. ES6 类语法</p><p>3. 继承</p><p>4. 面向对象案例</p><p>5. 原型和原型链</p><p>6. 组合继承</p><p>7. 严格模式</p><p>8. 闭包</p><p>9. 递归函数</p><p>10. 深拷贝浅拷贝</p><p>11. 高阶函数</p><p>12. call、apply、bind</p><p>13. ES6</p><p>14. 对象解构</p><p>15. 箭头函数</p><p>16. 扩展运算符</p><p>17. 模板字符串</p>', null, '30012', '1', '2020-04-28 17:40:44', '2');
INSERT INTO `hm_articles` VALUES ('11', '你的努力就是你的底气', '<p class=\"ql-align-center\"><strong>你的努力就是你的底气</strong></p><p><br></p><p class=\"ql-align-center\">“努力”一词很抽象。</p><p class=\"ql-align-center\">这就代表着这是次‘只可意会，不可言传’的经历。</p><p class=\"ql-align-center\">因为你总是无法向别人证明你的努力，</p><p class=\"ql-align-center\">就像我无法告诉你努力到什么地步才能成为最好的那个自己。</p><p class=\"ql-align-center\">但，这更能突出“努力”的意义。</p><p class=\"ql-align-center\">虽过程艰难辛苦，结果深浅不一，</p><p class=\"ql-align-center\">但带来的，都是一件事情最大程度的蜕变转机。</p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\">。&nbsp;<img src=\"http://bbs.itheima.com/data/attachment/forum/201911/09/162646uajde42l8ljl22x4.jpg.thumb.jpg\" height=\"549\" width=\"720\"></p><p><br></p><p class=\"ql-align-center\">在人生这条路上，只要努力，你就能得到你想要的东西。</p><p class=\"ql-align-center\">但是努力的经历是艰难的，是痛苦的；</p><p class=\"ql-align-center\">人需要历练，而痛苦，便是最好的历练。</p><p class=\"ql-align-center\">因为痛苦能使内心变得更加强大，</p><p class=\"ql-align-center\">而只有拥有强大的内心，才能闯出并支撑起一片广阔的未来。</p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/201911/09/162646e0bebwzo9iegpnj9.jpg.thumb.jpg\"></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\">人生不过是一道道关卡组成的。</p><p class=\"ql-align-center\">整个游戏或许会因为你的懒惰而结束的。</p><p class=\"ql-align-center\">没有哪一支笔能决定落笔和绝笔，</p><p class=\"ql-align-center\">而它却试图将波磔走的更淋漓丰韵，让宣纸以鉴。</p><p class=\"ql-align-center\">没有一种喜悦，是你不努力就能得来的!</p><p><br></p>', null, '33', '1', '2020-05-19 10:40:38', '2');
INSERT INTO `hm_articles` VALUES ('12', '路在脚下，梦在前方，加油！', '<p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">习主席说过“一切向前走，都不能忘记走过的路；</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">走的再远，走到再光辉的未来，</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">也不能忘记走过的过去，不能忘记为什么出发。”</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">当你达成了人生所追求的目标之时，</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">你的视野就会变得越来越开阔，</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">开阔的视野不仅会给你带来更多的机遇、更多的财富，</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong style=\"color: rgb(54, 54, 54);\">同时还使你更具创造性，让你一步步走向成功的明天</strong></p><p><br></p>', null, '577', '1', '2020-04-29 14:40:48', '2');
INSERT INTO `hm_articles` VALUES ('13', ' 传统行业成功转型产品经理，来黑马是最明智的选择！', '<p>&nbsp;&nbsp;&nbsp;&nbsp;大家好，我是深圳产品六期的学员，之前一直在传统行业工作，之后转行到产品，转行是意外也是必然选择。转行前，我思考了很久，差不多一年吧，没错，纠结星人就是这么纠结。也跟亲朋好友交流了一番，大家都觉得没必要，毕竟我的工作相对来说一家比老家很多人都好了，能在家里上班，公司又是大型快消食品公司，薪资比平均工资高40%左右，还可以双休，虽然也忙，但是大部分时候都可以准时下班，可以说实现了简版的钱多事少离家近。已经是很多人都理想生活了。这也曾经也是我的理想生活，但是工作好几年后，看着一成不变的工作内容，我突然觉得这样下去不行，于是决定转行。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;转入互联网，选择产品是因为大学同学，她毕业就进入互联网干产品，讲了很多相关行业内容，我也去搜了相关招聘信息看，结合未来发展和自己情况，觉得可以干，决定报名培训班学习专业知识。黑马作为一个成立多年的互联网培训机构，其专业度和知名度在互联网行业还是很有名的，在同学的推荐下，我选择了黑马。</p><p>从一个小白到现在的产品经理，黑马功不可没，不但有着最专业的讲师，丰富经验的就业指导，认真负责的班主任老师，还有一群志同道合的同学们。整个教学过程感觉重回学生时代。黑马的老师非常认真，并且更让我喜欢的是教学模式，每个人带着自己的电脑跟老师电脑连接，直接看电脑就可以上课了，不用看大屏幕，并且每节课都录课，方便随时复习。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;现在回想起来整个培训过程大致是分为这么几个阶段</p><p>一：启蒙阶段了解产品经理是干什么的，行情介绍</p><p>二：基础阶段，工欲善其事，必先利其器。通过上课及课后作业让我们熟悉产品工作所需的各种管理工具。</p><p>三：思维强化，前一阶段已经对各类基础工具了解差不多，这个阶段就需要了解做产品思考的逻辑，遇到普遍问题的解决方法。</p><p>四：模拟实践，通过模拟实践让我们大概了解产品工作的基本流程，并且每个流程这样做的原因。这一步非常重要，要好好参与，与你日后正式上班流程是差不多的。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;最后还有就业指导，针对每个学员单独面试辅导，模拟面试等，增加面试成功率。可以说是非常认真负责了。</p><p>现在我已经工作大半年了，可以负责的说只要你认认真真的跟着老师走，上课认真听课，自习课认真复习，不懂就问，顺利入职是完全没有问题的，因为整个培训下来产品经理该具备的专业知识是不输市面上工作一两年的产品经理的。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;总之，也许选择互联网会后悔，但是绝对选择黑马不会后悔，同学们，选择了就要好好努力，不要浪费自己的时间和金钱。再加上今年疫情原因，必须要让自己变得更优秀才能选择更好的公司。</p><p><br></p>', 'https://v-cdn.zjol.com.cn/277003.mp4', '1', '0', '2020-05-06 17:40:57', '2');
INSERT INTO `hm_articles` VALUES ('14', '疫情挡不住春天的来临', '<p class=\"ql-align-center\">乌云遮不住太阳的升起</p><p><br></p><p class=\"ql-align-center\">疫情挡不住春天的来临</p><p><br></p><p class=\"ql-align-center\">希望如约而至的不止春天</p><p><br></p><p class=\"ql-align-center\">还有疫情过后平安的你们</p><p><br></p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/11.gif\"></p><p><br></p><p class=\"ql-align-center\">2020 因为疫情我们相聚线上</p><p><br></p><p class=\"ql-align-center\">掌声热烈&nbsp;&nbsp;加倍欢迎你们 加入黑马</p><p><br></p><p class=\"ql-align-center\">新媒体就业21期</p><p><br></p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/static/image/smiley/alibaba/81.gif\"></p><p><br></p>', null, '2', '1', '2020-05-06 17:41:02', '2');
INSERT INTO `hm_articles` VALUES ('15', ' 黑马逆战班', '<p class=\"ql-align-center\">黑马逆战班</p><p class=\"ql-align-center\"><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疫情无情，逆战学习力，横扫困难期在全民抗疫的日子里，我们黑马Python5期（20200325）的小伙伴们相约在黑马的大家庭里，决定勇敢走出舒适区，以在家里学习逆战无情的自然灾害。2020.03.25这一天，我们如期举行了开班典礼，开始了我们逆战的行程。</p>', null, '122', '0', '2020-04-28 17:41:05', '2');
INSERT INTO `hm_articles` VALUES ('16', '【视频教程】字节码指令详解和使用', '<p><strong>课程目标</strong></p><p>了解字节码基础指令操作，学会字节码指令的常见用法</p><p class=\"ql-align-center\"><img src=\"http://bbs.itheima.com/data/attachment/forum/202004/30/160005vf8jqo2yojgpj08r.jpg.thumb.jpg\" height=\"309\" width=\"720\"></p><p><strong>课程内容</strong></p><p><strong>字节码指令的概述与入门</strong></p><p>&nbsp;&nbsp;&nbsp;&nbsp;1、什么是字节码指令</p><p>&nbsp;&nbsp;&nbsp;&nbsp;2、字节码指令的作用</p><p>&nbsp;&nbsp;&nbsp;&nbsp;3、字节码指令的分类</p><p><br></p>', null, '0', '1', '2020-05-06 17:44:33', '2');

-- ----------------------------
-- Table structure for hm_companys
-- ----------------------------
DROP TABLE IF EXISTS `hm_companys`;
CREATE TABLE `hm_companys` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `number` varchar(50) NOT NULL COMMENT '企业编号',
  `isFamous` tinyint(1) DEFAULT '0' COMMENT '是否名企',
  `shortName` varchar(256) NOT NULL COMMENT '企业简称',
  `company` varchar(256) NOT NULL COMMENT '所属公司',
  `province` varchar(50) DEFAULT NULL COMMENT '省份',
  `city` varchar(50) DEFAULT NULL COMMENT '城市',
  `tags` varchar(256) DEFAULT NULL COMMENT '标签',
  `remarks` varchar(256) DEFAULT NULL COMMENT '备注',
  `creatorID` int(11) NOT NULL COMMENT '创建者',
  `addDate` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT '创建日期',
  `state` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COMMENT='企业管理';

-- ----------------------------
-- Records of hm_companys
-- ----------------------------
INSERT INTO `hm_companys` VALUES ('1', 'cde6A136-6ACe-25bb-F1C3-BD37A6fecfce', '0', '阿里', '阿里巴巴', '四川省', '昆明市', '姜军', '至加论一全定识水记电见接属按律头。写文义级细金持所石从表转就布界志江。可养传现格西华转后专资多间角从意。据己且能类用子持究后得传中反社马前按。少发五业如计干白活济九名得米。切见两质使用东维总本出教较没候段将非。', '2', '2019-04-24 15:43:59', '1');
INSERT INTO `hm_companys` VALUES ('2', 'cjuuwwwps0001tqun2ga8aw8y', '0', '百度', '百度', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:16', '1');
INSERT INTO `hm_companys` VALUES ('3', 'cjuuwwyri0002tqung3cd5aff', '0', '腾讯', '腾讯', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:18', '1');
INSERT INTO `hm_companys` VALUES ('4', 'cjuuwwzau0003tqungav7cy5e', '0', '华为', '华为', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:19', '1');
INSERT INTO `hm_companys` VALUES ('5', 'cjuuwwzuc0004tqun76jv4u65', '0', '小米', '小米', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:20', '1');
INSERT INTO `hm_companys` VALUES ('6', 'cjuuwx0b00005tqun4xkt20zv', '0', '滴滴', '滴滴', '内蒙古自治区', '大连市', '意', '素求长向日听该按报条且外导政支平社级。', '2', '2019-04-24 15:44:20', '1');
INSERT INTO `hm_companys` VALUES ('7', 'cjuuwxz030006tquneo360ysr', '1', '美团', '美团', '香港特别行政区', '海北藏族自治州', '消', '军如马进龙长五为全离都条干是完。', '2', '2019-04-24 15:45:05', '1');
INSERT INTO `hm_companys` VALUES ('8', 'cjuuy74130000dxun2388f1yq', '0', '京东', '京东', '西藏自治区', '贵港市', '引', '主子新增值广品指体南相表许自世商。', '2', '2019-04-24 16:20:11', '1');
INSERT INTO `hm_companys` VALUES ('10', 'cjuuz78em0000nquna6qlefny', '1', '苏宁', '苏宁', '山西省', '黄山市', '其', '知局政统看六万列派种东术成体果生层。', '2', '2019-04-24 16:48:17', '1');
INSERT INTO `hm_companys` VALUES ('11', 'cjuuzaswt0000r4un1etcff3e', '1', '国美', '国美', '山西省', '黄山市', '其', '知局政统看六万列派种东术成体果生层。', '2', '2019-04-24 16:51:03', '1');
INSERT INTO `hm_companys` VALUES ('12', 'cjuuzb5530001r4unbr0yafs6', '1', '美团', '美团', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:51:19', '1');
INSERT INTO `hm_companys` VALUES ('13', 'cjuuzc9g30000roun1voybhu5', '1', '字节跳动', '字节跳动', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:52:11', '1');
INSERT INTO `hm_companys` VALUES ('14', 'cjuuzcavt0001rounbua53q6v', '1', '中行', '中国银行', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:52:13', '1');
INSERT INTO `hm_companys` VALUES ('15', 'cjuuzf7bf0000sjun11ps5hwx', '1', '工行', '工商银行', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:54:29', '1');
INSERT INTO `hm_companys` VALUES ('16', 'cjuuzf97p0001sjun68p18dvy', '1', '联想', '联想集团', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:54:31', '1');
INSERT INTO `hm_companys` VALUES ('17', 'cjuuzfdzr0002sjun734hccz4', '1', '海文', '海辉文思', '江苏省', '大理白族自治州', '新', '规市说只线技结克者之千员调理候相。', '2', '2019-04-24 16:54:37', '1');
INSERT INTO `hm_companys` VALUES ('18', 'cjuwf3q4i00009zr88ht07psu', '0', '用友', '用友', '青海省', '昌都地区', '制', '整结院新往前门光价史众快广。', '2', '2019-04-25 17:01:13', '1');

-- ----------------------------
-- Table structure for hm_questions
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions`;
CREATE TABLE `hm_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `number` varchar(50) NOT NULL COMMENT '试题编号',
  `subjectID` int(11) NOT NULL COMMENT '学科id',
  `catalogID` int(11) NOT NULL COMMENT '目录id',
  `enterpriseID` int(11) NOT NULL COMMENT '企业id',
  `province` varchar(50) NOT NULL COMMENT '省份',
  `city` varchar(50) NOT NULL COMMENT '城市',
  `direction` varchar(256) DEFAULT NULL COMMENT '方向',
  `questionType` varchar(50) DEFAULT NULL COMMENT '题型',
  `difficulty` varchar(50) DEFAULT NULL COMMENT '难度',
  `question` varchar(256) NOT NULL COMMENT '题干',
  `videoURL` varchar(256) DEFAULT NULL COMMENT '解析视频',
  `answer` varchar(256) DEFAULT NULL COMMENT '答案解析',
  `remarks` varchar(256) DEFAULT NULL COMMENT '题目备注',
  `tags` varchar(256) NOT NULL COMMENT '试题标签',
  `isChoice` tinyint(1) NOT NULL DEFAULT '0' COMMENT '精选题',
  `publishState` tinyint(4) NOT NULL COMMENT '发布状态',
  `publishDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发布时间',
  `chkState` tinyint(4) NOT NULL COMMENT '筛选状态',
  `chkUserID` int(11) DEFAULT NULL COMMENT '审核人',
  `chkRemarks` varchar(256) DEFAULT NULL COMMENT '审核意见',
  `chkDate` datetime DEFAULT NULL COMMENT '审核日期',
  `creatorID` int(11) NOT NULL COMMENT '创建人id',
  `addDate` datetime NOT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COMMENT='基础题库';

-- ----------------------------
-- Records of hm_questions
-- ----------------------------
INSERT INTO `hm_questions` VALUES ('18', 'ck9e291ai0000v4o55apl1xs7', '4', '5', '13', '北京市', '西城区', '互联网', '1', '1', '<p>z-index的作用是什么？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p>当设置过定位后z-index代表层级。</p>', '样式属性', 'css属性', '0', '0', '2020-05-05 18:02:03', '0', null, null, null, '2', '2020-04-24 18:37:10');
INSERT INTO `hm_questions` VALUES ('19', 'ck9e2h4ze0001v4o56ywu7cry', '1', '1', '16', '天津市', '和平区', '企业服务', '2', '3', '<p>java和javascript的区别是什么？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p>java是一门后台编程语法，而javascrip起初是浏览器脚本，后台nodejs出现了称为了后台编程语言。</p>', '语言常识', '语言常识', '0', '0', '2020-05-05 18:02:03', '0', null, null, null, '2', '2020-04-24 18:43:28');
INSERT INTO `hm_questions` VALUES ('20', 'ck9e2qk4h0002v4o5gpngekf7', '1', '2', '17', '北京市', '西城区', '互联网金融', '3', '3', '<p>php是世界上最好的语言吗？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p>php是世界上最好的语言吗？不知道。</p>', '语言梗', '语言梗', '1', '0', '2020-05-05 18:02:03', '0', null, null, null, '2', '2020-04-24 18:50:47');
INSERT INTO `hm_questions` VALUES ('21', 'ck9e30eda0003v4o52n5r5q0h', '4', '6', '18', '北京市', '石景山区', '企业服务', '1', '3', '<p>下列声明变量的语句不正确的是？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p><span style=\"color: rgb(94, 109, 130);\">用于布局的容器组件，方便快速搭建页面的基本结构：</span></p>', '用于布局的容器组件，方便快速搭建页面的基本结构：', '用于布局的容器组件，方便快速搭建页面的基本结构：', '0', '0', '2020-05-05 18:02:03', '0', null, null, null, '2', '2020-04-24 18:58:26');
INSERT INTO `hm_questions` VALUES ('22', 'ck9e34sgn0004v4o5bohn5j67', '4', '7', '1', '石家庄市', '新华区', '企业服务', '2', '2', '<p>在css中可以直接设置高度的容器是？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p><a href=\"https://element.eleme.cn/#/zh-CN/component/i18n\" rel=\"noopener noreferrer\" target=\"_blank\">https://element.eleme.cn/#/zh-CN/component/i18n</a></p>', 'https://element.eleme.cn/#/zh-CN/component/i18n', '属性', '1', '0', '2020-05-05 18:02:03', '2', '2', '题型不符合', '2020-04-30 12:13:02', '2', '2020-04-24 19:01:51');
INSERT INTO `hm_questions` VALUES ('23', 'ck9e36dw00005v4o53dczgccz', '4', '5', '3', '邯郸市', '复兴区', '互联网金融', '1', '3', '<p>下列容器中是框架容器的是？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p><a href=\"https://element.eleme.cn/#/zh-CN/component/i18n\" rel=\"noopener noreferrer\" target=\"_blank\">https://element.eleme.cn/#/zh-CN/component/i18n</a></p>', 'https://element.eleme.cn/#/zh-CN/component/i18n', '属性', '1', '0', '2020-05-05 18:02:03', '1', '2', '这道里面非常好棒棒哒', '2020-04-30 12:12:09', '2', '2020-04-24 19:03:06');
INSERT INTO `hm_questions` VALUES ('24', 'ck9gmm2z20000vko57xp9752i', '1', '1', '14', '天津市', '南开区', '企业服务', '1', '1', '<p>猫有几只眼睛？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p><a href=\"https://cn.vuejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\">https://cn.vuejs.org/</a> 有答案</p>', 'https://cn.vuejs.org/ 有答案', '随机', '0', '0', '2020-05-05 18:02:03', '0', null, null, null, '2', '2020-04-26 13:42:43');
INSERT INTO `hm_questions` VALUES ('25', 'ck9gmofeg0001vko58jm7cpso', '1', '1', '4', '天津市', '河西区', '企业咨询', '2', '3', '<p>北京在哪个省旁边？</p>', 'https://v-cdn.zjol.com.cn/277003.mp4', '<p><a href=\"https://cn.vuejs.org/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255);\">https://cn.vuejs.org/</a> 有答案</p>', 'https://cn.vuejs.org/ 有答案', '随机', '0', '0', '2020-05-07 12:14:05', '0', null, null, null, '2', '2020-04-26 13:44:33');
INSERT INTO `hm_questions` VALUES ('26', 'ck9gy6yhr00005wo53pb8ceyx', '1', '2', '18', '北京市', '西城区', '外包服务', '1', '1', '<pre class=\"ql-syntax\" spellcheck=\"false\">var a = <span class=\"hljs-number\">10</span><span class=\"hljs-comment\">;</span>\n﻿console.log(a)<span class=\"hljs-comment\">;</span>\n</pre>', 'https://v-cdn.zjol.com.cn/276984.mp4', '<p>测试</p>', '测试', '测试', '0', '0', '2020-05-05 18:17:15', '0', null, null, null, '2', '2020-04-26 19:06:53');
INSERT INTO `hm_questions` VALUES ('27', 'ck9m9aitn00009ko592t1f0q6', '4', '6', '16', '北京市', '东城区', '外包服务', '1', '1', '<pre class=\"ql-syntax\" spellcheck=\"false\">cconst <span class=\"hljs-built_in\">con</span> = \'连接\'\n</pre>', 'https://v-cdn.zjol.com.cn/276984.mp4', '<p>1111111111111</p>', '22', '测试', '1', '1', '2020-05-05 19:47:55', '1', '2', '棒棒哒', '2020-04-30 12:17:00', '2', '2020-04-30 12:16:26');
INSERT INTO `hm_questions` VALUES ('29', 'ck9tp300z0001kwo5hztbh95s', '4', '5', '12', '天津市', '和平区', '企业服务', '1', '1', '<p>1+1等于几？</p>', 'https://v-cdn.zjol.com.cn/277004.mp4', '<p>无</p>', '无', 'css3,bfc', '0', '0', '2020-05-05 18:02:03', '0', null, null, null, '2', '2020-05-05 17:12:52');

-- ----------------------------
-- Table structure for hm_questions_audits
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions_audits`;
CREATE TABLE `hm_questions_audits` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `questionsID` int(11) NOT NULL COMMENT '问题id',
  `remarks` varchar(256) NOT NULL COMMENT '意见',
  `operation` varchar(50) NOT NULL COMMENT '状态',
  `chkTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT '时间',
  `checkerID` int(11) NOT NULL COMMENT '审核人',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='试题审核意见';

-- ----------------------------
-- Records of hm_questions_audits
-- ----------------------------
INSERT INTO `hm_questions_audits` VALUES ('5', '23', '这道里面非常好棒棒哒', '通过', '2020-04-30 12:12:09', '2');
INSERT INTO `hm_questions_audits` VALUES ('6', '22', '题型不符合', '拒绝', '2020-04-30 12:13:02', '2');
INSERT INTO `hm_questions_audits` VALUES ('7', '27', '棒棒哒', '通过', '2020-04-30 12:17:00', '2');

-- ----------------------------
-- Table structure for hm_questions_options
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions_options`;
CREATE TABLE `hm_questions_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `questionsID` int(11) NOT NULL COMMENT '问题ID',
  `code` varchar(256) NOT NULL COMMENT '代码',
  `title` varchar(256) NOT NULL COMMENT '标题',
  `img` varchar(256) DEFAULT NULL COMMENT '图片',
  `isRight` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否正确答案',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COMMENT='基础题库-问题列表';

-- ----------------------------
-- Records of hm_questions_options
-- ----------------------------
INSERT INTO `hm_questions_options` VALUES ('70', '18', 'A', '高度', '', '0');
INSERT INTO `hm_questions_options` VALUES ('71', '18', 'B', '层级', '', '1');
INSERT INTO `hm_questions_options` VALUES ('72', '18', 'C', '宽度', '', '0');
INSERT INTO `hm_questions_options` VALUES ('73', '18', 'D', '定位', '', '0');
INSERT INTO `hm_questions_options` VALUES ('74', '19', 'A', '是同一门编程语言', '', '0');
INSERT INTO `hm_questions_options` VALUES ('75', '19', 'B', 'java写后台', '', '1');
INSERT INTO `hm_questions_options` VALUES ('76', '19', 'C', '都有变量', '', '1');
INSERT INTO `hm_questions_options` VALUES ('77', '19', 'D', 'javascript只能写前端', '', '0');
INSERT INTO `hm_questions_options` VALUES ('78', '19', 'E', '没区别', '', '0');
INSERT INTO `hm_questions_options` VALUES ('79', '20', 'A', '', '', '0');
INSERT INTO `hm_questions_options` VALUES ('80', '20', 'B', '', '', '0');
INSERT INTO `hm_questions_options` VALUES ('81', '20', 'C', '', '', '0');
INSERT INTO `hm_questions_options` VALUES ('82', '20', 'D', '', '', '0');
INSERT INTO `hm_questions_options` VALUES ('83', '21', 'A', 'var a = 10;', '', '0');
INSERT INTO `hm_questions_options` VALUES ('84', '21', 'B', 'let b = 20;', '', '0');
INSERT INTO `hm_questions_options` VALUES ('85', '21', 'C', 'const c = 30;', '', '0');
INSERT INTO `hm_questions_options` VALUES ('86', '21', 'D', 'int a = 20;', '', '1');
INSERT INTO `hm_questions_options` VALUES ('87', '22', 'A', 'span', '', '0');
INSERT INTO `hm_questions_options` VALUES ('88', '22', 'B', 'section', '', '1');
INSERT INTO `hm_questions_options` VALUES ('89', '22', 'C', 'i', '', '0');
INSERT INTO `hm_questions_options` VALUES ('90', '22', 'D', 'em', '', '0');
INSERT INTO `hm_questions_options` VALUES ('91', '22', 'E', 'div', '', '1');
INSERT INTO `hm_questions_options` VALUES ('92', '23', 'A', 'span', '', '0');
INSERT INTO `hm_questions_options` VALUES ('93', '23', 'B', 'article', '', '1');
INSERT INTO `hm_questions_options` VALUES ('94', '23', 'C', 'b', '', '0');
INSERT INTO `hm_questions_options` VALUES ('95', '23', 'D', 'i', '', '0');
INSERT INTO `hm_questions_options` VALUES ('96', '24', 'A', '1', '', '0');
INSERT INTO `hm_questions_options` VALUES ('97', '24', 'B', '2', '', '1');
INSERT INTO `hm_questions_options` VALUES ('98', '24', 'C', '3', '', '0');
INSERT INTO `hm_questions_options` VALUES ('99', '24', 'D', '4', '', '0');
INSERT INTO `hm_questions_options` VALUES ('105', '26', 'A', '1', '', '0');
INSERT INTO `hm_questions_options` VALUES ('106', '26', 'B', '10', '', '1');
INSERT INTO `hm_questions_options` VALUES ('107', '26', 'C', '100', '', '0');
INSERT INTO `hm_questions_options` VALUES ('108', '26', 'D', '1000', '', '0');
INSERT INTO `hm_questions_options` VALUES ('109', '27', 'A', '语法错误', '', '0');
INSERT INTO `hm_questions_options` VALUES ('110', '27', 'B', '语法正确', '', '1');
INSERT INTO `hm_questions_options` VALUES ('111', '27', 'C', '不知道', '', '0');
INSERT INTO `hm_questions_options` VALUES ('112', '27', 'D', '不确定', '', '0');
INSERT INTO `hm_questions_options` VALUES ('113', '28', 'A', '元素高度', '', '0');
INSERT INTO `hm_questions_options` VALUES ('114', '28', 'B', '行内块元素高度', '', '1');
INSERT INTO `hm_questions_options` VALUES ('115', '28', 'C', '行高', '', '0');
INSERT INTO `hm_questions_options` VALUES ('116', '28', 'D', '宽度', '', '0');
INSERT INTO `hm_questions_options` VALUES ('117', '29', 'A', '1', '', '0');
INSERT INTO `hm_questions_options` VALUES ('118', '29', 'B', '2', '', '1');
INSERT INTO `hm_questions_options` VALUES ('119', '29', 'C', '3', '', '0');
INSERT INTO `hm_questions_options` VALUES ('120', '29', 'D', '4', '', '0');
INSERT INTO `hm_questions_options` VALUES ('126', '25', 'A', '河北', '', '1');
INSERT INTO `hm_questions_options` VALUES ('127', '25', 'B', '天津', '', '1');
INSERT INTO `hm_questions_options` VALUES ('128', '25', 'C', '内蒙', '', '0');
INSERT INTO `hm_questions_options` VALUES ('129', '25', 'D', '辽宁', '', '0');
INSERT INTO `hm_questions_options` VALUES ('130', '25', 'E', '河南', '', '0');

-- ----------------------------
-- Table structure for hm_questions_records
-- ----------------------------
DROP TABLE IF EXISTS `hm_questions_records`;
CREATE TABLE `hm_questions_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `questionsID` int(11) NOT NULL COMMENT '问题id',
  `operation` varchar(256) NOT NULL COMMENT '操作',
  `setTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT '出题时间',
  `setterID` int(11) NOT NULL COMMENT '出题人',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='试题出题记录';

-- ----------------------------
-- Records of hm_questions_records
-- ----------------------------
INSERT INTO `hm_questions_records` VALUES ('7', '27', '上架', '2020-04-30 12:23:32', '2');
INSERT INTO `hm_questions_records` VALUES ('8', '27', '下架', '2020-04-30 12:23:38', '2');
INSERT INTO `hm_questions_records` VALUES ('9', '27', '上架', '2020-04-30 12:23:55', '2');
INSERT INTO `hm_questions_records` VALUES ('10', '27', '下架', '2020-05-05 19:47:51', '2');
INSERT INTO `hm_questions_records` VALUES ('11', '27', '上架', '2020-05-05 19:47:55', '2');

-- ----------------------------
-- Table structure for hm_subjects
-- ----------------------------
DROP TABLE IF EXISTS `hm_subjects`;
CREATE TABLE `hm_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `subjectName` varchar(256) NOT NULL COMMENT '学科',
  `creatorID` int(11) NOT NULL COMMENT '创建者',
  `addDate` datetime NOT NULL COMMENT '创建日期',
  `isFrontDisplay` tinyint(1) NOT NULL COMMENT '前台是否显示',
  `tags` int(11) NOT NULL COMMENT '标签',
  `totals` int(11) NOT NULL COMMENT '题目数量',
  `twoLevelDirectory` int(11) NOT NULL COMMENT '二级目录数',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COMMENT='学科';

-- ----------------------------
-- Records of hm_subjects
-- ----------------------------
INSERT INTO `hm_subjects` VALUES ('1', 'java', '2', '2019-04-25 17:09:19', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('2', 'ios', '2', '2019-04-25 17:10:08', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('3', '安卓', '2', '2019-04-25 17:10:08', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('4', '前端', '2', '2019-04-25 17:10:08', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('5', '设计', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('6', '产品', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('7', 'c++', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('8', '数据库', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('9', '算法', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('10', '运维', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('11', 'php', '2', '2019-04-25 17:10:09', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('12', 'c#', '2', '2019-04-25 17:10:10', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('13', 'c', '2', '2019-04-25 17:10:10', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('14', 'python', '2', '2019-04-25 17:10:10', '1', '0', '0', '0');
INSERT INTO `hm_subjects` VALUES ('16', '大数据', '2', '2019-04-25 17:11:32', '1', '0', '0', '0');

-- ----------------------------
-- Table structure for hm_subjects_directorys
-- ----------------------------
DROP TABLE IF EXISTS `hm_subjects_directorys`;
CREATE TABLE `hm_subjects_directorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `subjectID` int(11) NOT NULL COMMENT '学科id',
  `directoryName` varchar(256) NOT NULL COMMENT '目录名称',
  `creatorID` int(11) NOT NULL COMMENT '创建者',
  `addDate` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT '创建日期',
  `totals` int(11) DEFAULT NULL COMMENT '面试题数量',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COMMENT='学科-目录';

-- ----------------------------
-- Records of hm_subjects_directorys
-- ----------------------------
INSERT INTO `hm_subjects_directorys` VALUES ('1', '1', 'java基础', '2', '2019-04-25 17:43:01', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('2', '1', 'javaWEB', '2', '2019-04-25 17:43:16', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('4', '1', 'spring框架', '2', '2019-04-25 17:52:30', '0', '0');
INSERT INTO `hm_subjects_directorys` VALUES ('5', '4', 'css基础', '2', '2020-04-24 18:31:04', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('6', '4', 'js基础', '3', '2020-04-24 18:31:32', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('7', '4', 'vue基础', '3', '2020-04-04 20:00:00', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('8', '16', 'hadoop', '2', '2020-05-04 16:27:53', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('9', '16', '大数据处理', '2', '2020-05-04 16:29:25', '0', '0');
INSERT INTO `hm_subjects_directorys` VALUES ('10', '16', '测试', '2', '2020-05-04 16:34:26', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('11', '4', 'react', '2', '2020-05-04 16:34:48', '0', '0');
INSERT INTO `hm_subjects_directorys` VALUES ('12', '13', '指针处理', '2', '2020-05-04 16:35:53', '0', '1');
INSERT INTO `hm_subjects_directorys` VALUES ('13', '16', '数据存储', '2', '2020-05-04 16:36:57', '0', '1');

-- ----------------------------
-- Table structure for hm_subjects_tags
-- ----------------------------
DROP TABLE IF EXISTS `hm_subjects_tags`;
CREATE TABLE `hm_subjects_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `subjectID` int(11) NOT NULL COMMENT '学科id',
  `tagName` varchar(50) NOT NULL COMMENT '标签名称',
  `creatorID` int(11) NOT NULL COMMENT '创建者id',
  `addDate` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT '创建日期',
  `totals` int(11) DEFAULT NULL COMMENT '面试题数量',
  `state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COMMENT='学科-标签';

-- ----------------------------
-- Records of hm_subjects_tags
-- ----------------------------
INSERT INTO `hm_subjects_tags` VALUES ('1', '1', '框架', '2', '2019-04-26 09:59:23', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('2', '1', 'mvc', '2', '2019-04-26 09:59:30', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('3', '1', '企业', '2', '2019-04-26 09:59:32', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('4', '1', '服务', '2', '2019-04-26 09:59:36', '0', '0');
INSERT INTO `hm_subjects_tags` VALUES ('6', '4', '语言2', '2', '2019-04-26 10:18:51', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('7', '4', 'mvvm', '3', '2020-05-05 10:01:40', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('8', '16', 'hadoop', '2', '2020-05-05 10:08:57', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('9', '4', 'jquery', '2', '2020-05-05 10:26:15', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('10', '4', 'bfc', '2', '2020-05-05 10:26:30', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('11', '4', 'css3', '2', '2020-05-05 10:26:41', '0', '1');
INSERT INTO `hm_subjects_tags` VALUES ('12', '4', 'h5', '2', '2020-05-05 10:26:51', '0', '1');

-- ----------------------------
-- Table structure for pe_permission
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission`;
CREATE TABLE `pe_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `description` text COMMENT '权限描述',
  `name` varchar(255) DEFAULT NULL COMMENT '权限名称',
  `type` tinyint(4) DEFAULT NULL COMMENT '权限类型 1为菜单 2为功能 3为API',
  `pid` bigint(20) DEFAULT NULL COMMENT '主键',
  `permission_api_extend_id` bigint(20) DEFAULT NULL COMMENT '主键ID',
  `permission_menu_extend_id` bigint(20) DEFAULT NULL COMMENT '主键ID',
  `permission_point_extend_id` bigint(20) DEFAULT NULL COMMENT '主键ID',
  PRIMARY KEY (`id`),
  KEY `FKcl4mcrsqinb3q8iwsyr35u6nw` (`pid`),
  KEY `FKi0m9bwff032wcooqvql5frdbg` (`permission_point_extend_id`),
  KEY `FKkbf8xphs59e2lebopx3npjd2q` (`permission_menu_extend_id`),
  KEY `FKs1u37sxlynb8jsx1dfptwdnpo` (`permission_api_extend_id`),
  CONSTRAINT `FKcl4mcrsqinb3q8iwsyr35u6nw` FOREIGN KEY (`pid`) REFERENCES `pe_permission` (`id`),
  CONSTRAINT `FKi0m9bwff032wcooqvql5frdbg` FOREIGN KEY (`permission_point_extend_id`) REFERENCES `pe_permission_point_extend` (`id`),
  CONSTRAINT `FKkbf8xphs59e2lebopx3npjd2q` FOREIGN KEY (`permission_menu_extend_id`) REFERENCES `pe_permission_menu_extend` (`id`),
  CONSTRAINT `FKs1u37sxlynb8jsx1dfptwdnpo` FOREIGN KEY (`permission_api_extend_id`) REFERENCES `pe_permission_api_extend` (`id`)
)  AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission
-- ----------------------------
INSERT INTO `pe_permission` VALUES ('28', '2018-08-22 03:32:11', null, '后台框架', '1', null, null, '6', null);
INSERT INTO `pe_permission` VALUES ('29', '2018-08-22 03:32:11', null, '用户管理', '1', '28', null, '7', null);
INSERT INTO `pe_permission` VALUES ('30', '2018-08-22 03:32:11', null, '菜单管理', '1', '28', null, '8', null);
INSERT INTO `pe_permission` VALUES ('31', '2018-08-22 03:32:11', null, '权限管理', '1', '28', null, '9', null);
INSERT INTO `pe_permission` VALUES ('32', '2018-08-22 03:32:11', null, '日志管理', '1', '28', null, '10', null);
INSERT INTO `pe_permission` VALUES ('33', '2019-02-14 08:47:29', null, '列表页', '1', null, null, '11', null);
INSERT INTO `pe_permission` VALUES ('34', '2019-02-14 08:48:07', null, '查询表格', '1', '33', null, '12', null);
INSERT INTO `pe_permission` VALUES ('35', '2019-02-14 08:51:06', null, '标准列表', '1', '33', null, '13', null);
INSERT INTO `pe_permission` VALUES ('36', '2019-02-14 08:51:27', null, '卡片列表', '1', '33', null, '14', null);
INSERT INTO `pe_permission` VALUES ('37', '2019-02-14 08:54:36', null, '表单页', '1', null, null, '15', null);
INSERT INTO `pe_permission` VALUES ('38', '2019-02-14 08:55:00', null, '基础表单', '1', '37', null, '16', null);
INSERT INTO `pe_permission` VALUES ('39', '2019-02-14 08:55:19', null, '分步表单', '1', '37', null, '17', null);
INSERT INTO `pe_permission` VALUES ('40', '2019-02-14 08:55:38', null, '高级表单', '1', '37', null, '18', null);
INSERT INTO `pe_permission` VALUES ('41', '2019-02-14 08:56:09', null, '详情页', '1', null, null, '19', null);
INSERT INTO `pe_permission` VALUES ('42', '2019-02-14 08:56:31', null, '基础详情页', '1', '41', null, '20', null);
INSERT INTO `pe_permission` VALUES ('43', '2019-02-14 08:56:52', null, '高级详情页', '1', '41', null, '21', null);
INSERT INTO `pe_permission` VALUES ('44', '2019-02-14 09:25:12', null, '用户新增', '2', '29', null, null, '1');
INSERT INTO `pe_permission` VALUES ('46', '2019-02-14 09:26:40', null, '用户搜索', '2', '29', null, null, '2');
INSERT INTO `pe_permission` VALUES ('47', '2019-02-14 10:54:24', null, '用户列表', '2', '29', null, null, '3');
INSERT INTO `pe_permission` VALUES ('48', '2019-02-15 07:04:14', null, '用户分页', '2', '29', null, null, '4');
INSERT INTO `pe_permission` VALUES ('49', '2019-02-18 05:26:38', null, '查询', '2', '34', null, null, '5');
INSERT INTO `pe_permission` VALUES ('50', '2019-02-18 05:27:04', null, '添加', '2', '34', null, null, '6');
INSERT INTO `pe_permission` VALUES ('51', '2019-02-18 06:30:37', null, '列表', '2', '34', null, null, '7');

-- ----------------------------
-- Table structure for pe_permission_api_extend
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_api_extend`;
CREATE TABLE `pe_permission_api_extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `api_level` int(11) DEFAULT NULL COMMENT '权限等级，1为通用接口权限，2为需校验接口权限',
  `api_method` varchar(255) DEFAULT NULL COMMENT '请求类型',
  `api_url` varchar(255) DEFAULT NULL COMMENT '链接',
  `permission_id` bigint(20) DEFAULT NULL COMMENT '主键',
  PRIMARY KEY (`id`),
  KEY `FKcuumocmq03no1grx1pp7mi0ya` (`permission_id`),
  CONSTRAINT `FKcuumocmq03no1grx1pp7mi0ya` FOREIGN KEY (`permission_id`) REFERENCES `pe_permission` (`id`)
)  DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_api_extend
-- ----------------------------

-- ----------------------------
-- Table structure for pe_permission_group
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_group`;
CREATE TABLE `pe_permission_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `name` varchar(255) DEFAULT NULL COMMENT '权限名称',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
)  AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_group
-- ----------------------------
INSERT INTO `pe_permission_group` VALUES ('2', '2018-08-22 03:32:11', '超级管理员组', '2019-02-18 06:33:44');
INSERT INTO `pe_permission_group` VALUES ('3', '2019-02-14 08:57:39', '编辑组', '2019-02-18 07:00:03');

-- ----------------------------
-- Table structure for pe_permission_menu_extend
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_menu_extend`;
CREATE TABLE `pe_permission_menu_extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` text COMMENT '权限代码',
  `permission_id` bigint(20) DEFAULT NULL COMMENT '主键',
  PRIMARY KEY (`id`),
  KEY `FK42ix9ooed2li4ig9ry78chkaq` (`permission_id`),
  CONSTRAINT `FK42ix9ooed2li4ig9ry78chkaq` FOREIGN KEY (`permission_id`) REFERENCES `pe_permission` (`id`)
)  AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_menu_extend
-- ----------------------------
INSERT INTO `pe_permission_menu_extend` VALUES ('6', 'base', '28');
INSERT INTO `pe_permission_menu_extend` VALUES ('7', 'base-users', '29');
INSERT INTO `pe_permission_menu_extend` VALUES ('8', 'base-menus', '30');
INSERT INTO `pe_permission_menu_extend` VALUES ('9', 'base-permissions', '31');
INSERT INTO `pe_permission_menu_extend` VALUES ('10', 'base-logs', '32');
INSERT INTO `pe_permission_menu_extend` VALUES ('11', 'list', '33');
INSERT INTO `pe_permission_menu_extend` VALUES ('12', 'table-list', '34');
INSERT INTO `pe_permission_menu_extend` VALUES ('13', 'basic-list', '35');
INSERT INTO `pe_permission_menu_extend` VALUES ('14', 'card-list', '36');
INSERT INTO `pe_permission_menu_extend` VALUES ('15', 'form', '37');
INSERT INTO `pe_permission_menu_extend` VALUES ('16', 'basic-form', '38');
INSERT INTO `pe_permission_menu_extend` VALUES ('17', 'step-form', '39');
INSERT INTO `pe_permission_menu_extend` VALUES ('18', 'senior-form', '40');
INSERT INTO `pe_permission_menu_extend` VALUES ('19', 'details', '41');
INSERT INTO `pe_permission_menu_extend` VALUES ('20', 'basics-details', '42');
INSERT INTO `pe_permission_menu_extend` VALUES ('21', 'senior-details', '43');

-- ----------------------------
-- Table structure for pe_permission_point_extend
-- ----------------------------
DROP TABLE IF EXISTS `pe_permission_point_extend`;
CREATE TABLE `pe_permission_point_extend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` text COMMENT '权限代码',
  `permission_id` bigint(20) DEFAULT NULL COMMENT '主键',
  PRIMARY KEY (`id`),
  KEY `FKml56235rji52opnlq6cr143l1` (`permission_id`),
  CONSTRAINT `FKml56235rji52opnlq6cr143l1` FOREIGN KEY (`permission_id`) REFERENCES `pe_permission` (`id`)
)  AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pe_permission_point_extend
-- ----------------------------
INSERT INTO `pe_permission_point_extend` VALUES ('1', 'base-users-add', '44');
INSERT INTO `pe_permission_point_extend` VALUES ('2', 'base-users-search', '46');
INSERT INTO `pe_permission_point_extend` VALUES ('3', 'base-users-list', '47');
INSERT INTO `pe_permission_point_extend` VALUES ('4', 'base-users-paging', '48');
INSERT INTO `pe_permission_point_extend` VALUES ('5', 'table-list-query', '49');
INSERT INTO `pe_permission_point_extend` VALUES ('6', 'table-list-add', '50');
INSERT INTO `pe_permission_point_extend` VALUES ('7', 'table-list-list', '51');

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `method` varchar(255) DEFAULT NULL COMMENT 'method',
  `operation_date` datetime DEFAULT NULL COMMENT '操作时间',
  `operation_result` tinyint(1) DEFAULT NULL COMMENT '操作结果',
  `request_body` text COMMENT '参数内容',
  `url` varchar(255) DEFAULT NULL COMMENT 'url',
  `user_id` bigint(20) DEFAULT NULL COMMENT '操作人ID',
  PRIMARY KEY (`id`),
  KEY `FKlt2yft8n91ep783g16knhvilp` (`user_id`),
  CONSTRAINT `FKlt2yft8n91ep783g16knhvilp` FOREIGN KEY (`user_id`) REFERENCES `bs_user` (`id`)
)  DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
