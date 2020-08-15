//获取项目工程里的图片
const fs = require('fs');//引用文件系统模块
const image = require("imageinfo"); //引用imageinfo模块
const AipOcr = require('./src/index').ocr;

//设置APPID/AK/SK（前往百度云控制台创建应用后获取相关数据）
const APP_ID = "你的appid";
const API_KEY = "你的apikey";
const SECRET_KEY = "你的secretkey";
const client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

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
  getImageFiles:async function (path) {
    let imageList = [];

    let list = this.getFileList(path);

    //console.log(list)
    for(let i=0;i<list.length;i++){
      let ms = await image(fs.readFileSync(list[i].path + list[i].filename));
      ms.filename = list[i].filename;
      let imagebase = await fs.readFileSync(list[i].path + list[i].filename);
      let base64Img = Buffer.from(imagebase).toString('base64');
      let data = await client.general(base64Img,{vertexes_location:true})
      ms.data = data.words_result;
      //console.log(ms)
      ms.mimeType && (imageList.push(ms))
    }
    return imageList;
  }
};
//获取文件夹下的所有图片
async function getImagelist(){
  let imageList =  await getFiles.getImageFiles("./images/")
  createTable(imageList)
}
getImagelist()
//console.log(imageList)
let marginTop = 0;

function createTable(imageList){
  let tableStrArr = imageList.map(item => {
    return `  <table width="1920" height="${item.height}" cellpadding="0" cellspacing="0" background="images/${item.filename}">
          <tr>
              <td width="360">&nbsp;</td>
              <td width="1200" align="left" valign="top">
                  ${
                    item.data.map((p,index) => {
                      marginTop = index == 0 ? p.location.top : p.location.top - marginTop
                      return p.words.length > 5 ? `<p style="font-size: ${p.location.height-5}px;line-height: ${p.location.height-5}px;font-weight: 500;margin: ${index == 0 ? marginTop + 10 : 10}px 0 0 ${p.location.left-350}px;color:#000;">
                          ${p.words}
                      </p>`:''
                    }).join('')
                  }
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
    <script src="./utils/jquery-3.5.1.min.js"></script>
    <script src="./utils/jquery-mousewheel.js"></script>
    <script src="./utils/colorpicker.js"></script>
    <script src="./utils/tools.js"></script>
  </head>
  <body>
  <div id="thematic" style="width:1920px;font-family:SourceHanSansCN-Medium, 'Microsoft YaHei', Arial;overflow:hidden;">
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
  <button id="copy" style="position: fixed;top: 20px;left: 20px;width: 100px;height: 50px;cursor: pointer;">复制DIV</button>
  <textarea id="copy-content" value="" style="position: fixed;top: 100px;left: 20px;width: 500px;height: 200px;display: none;" ></textarea>
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
}

//获取文件夹下的所有文件
//console.log(getFiles.getFileList("./"))