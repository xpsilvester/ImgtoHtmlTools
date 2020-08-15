//获取项目工程里的图片
var fs = require('fs');//引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块

function readFileList(path, filesList) {
  var files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    var stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList)
    } else {

      var obj = {};//定义一个对象存放文件的路径和名字
      obj.path = path;//路径
      obj.filename = itm//名字
      filesList.push(obj);
    }

  })

}
var getFiles = {
  //获取文件夹下的所有文件
  getFileList: function (path) {
    var filesList = [];
    readFileList(path, filesList);
    return filesList;
  },
  //获取文件夹下的所有图片
  getImageFiles: function (path) {
    let imageList = [];

    this.getFileList(path).forEach((item) => {
      var ms = image(fs.readFileSync(item.path + item.filename));
      ms.filename = item.filename;
      ms.mimeType && (imageList.push(ms))
    });
    return imageList;
  }
};
//获取文件夹下的所有图片
let imageList = getFiles.getImageFiles("./images/")
//console.log(imageList)

let tableStrArr = imageList.map(item => {
  return `  <table width="1920" height="${item.height}" cellpadding="0" cellspacing="0" background="images/${item.filename}">
        <tr>
            <td width="360">&nbsp;</td>
            <td width="1200" align="center" valign="top">
                <h3 style="font-size: 48px;line-height: 66px;font-weight: 500;margin: 39px 0 0 9px;color:#fff;">
                什么是Wi-Fi 6?
                </h3>
                <p style="font-size: 20px;line-height: 32px;font-weight: 500;margin: 27px 0 0 9px;color:#fff;">
                *802.11ax兼容之前的 802.11ac/n/g/a/b标准，前代终端一样可以无缝接入 802.11ax 网络。
                </p>
            </td>
            <td width="360">&nbsp;</td>
        </tr>
    </table>
    `
})

let html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title></title>
</head>
<body>
<div style="width:1920px;font-family:SourceHanSansCN-Medium, 'Microsoft YaHei', Arial;overflow:hidden;">
<style>
  @font-face {
    font-family: 'SourceHanSansCN-Medium';
    src: url('images/SourceHanSansCN-Medium.eot');
    src:
      url('images/SourceHanSansCN-Medium.eot?#font-spider/23') format('embedded-opentype'),
      url('images/SourceHanSansCN-Medium.woff') format('woff'),
      url('images/SourceHanSansCN-Medium.ttf') format('truetype'),
      url('images/SourceHanSansCN-Medium.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
</style>
${tableStrArr.join('')}
</div>
</body>
</html>`

console.log(html)

//写入文件
fs.writeFile('./index.html',html,'utf8',function(err){
  //如果err=null，表示文件使用成功，否则，表示希尔文件失败
  if(err)
      console.log('写文件出错了，错误是：'+err);
  else
      console.log('ok');
})
//获取文件夹下的所有文件
//console.log(getFiles.getFileList("./"))