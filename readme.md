# ImgtoHtmlTools

## 下载依赖包

```
npm install
```

## 配置百度api参数

```js
// index.js
//设置APPID/AK/SK（前往百度云控制台创建应用后获取相关数据）
const APP_ID = "你的appid";
const API_KEY = "你的apikey";
const SECRET_KEY = "你的secretkey";
```

## 配置自定义模板

```js
//index.js 示例
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
```

## 将要转成html的图片文件放入images文件夹中(带文字)，然后运行程序

```
npm start
```

## 点开index.html（上一步自动生成）文件在浏览器中查看，然后进行以下操作

```
1. 将文字拖动到相应的位置
2. 通过滑动鼠标滚轮控制字体大小
3. 选择相应字体颜色
4. 重复以上步骤直至所有文字都移到指定位置
5. 点击左上角复制DIV按钮复制DIV中的HTML代码，粘到新的html中
6. 再导出一份无文字版的图片切图，即可完成。
```

