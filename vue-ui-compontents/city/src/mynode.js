var fs = require('fs');
fs.readFile('./data.json', function (error, data) {
    if (error) {
      console.log('读取文件失败了')
    } else {

    data = JSON.parse(data);
    console.log(data);
    for(let i = 0; i < data.length; i++) {
      console.log(i);
      if(data[i].children && data[i].children.length > 0) {
        // let childrenLength = cityList[i].children.length;
        data.splice(i+1, 0, ...data[i].children);
        delete data[i].children;
      }
    }
    // JSON.parse(data).forEach(item => {
    //     if (!item.children || !item.children.length) return;
    //     for (var k in item) {
    //       if (k !== "children") {
    //         myData.push({k:item[k]});
    //       }
    //     }
    //   });

      fs.writeFile('./data.json', JSON.stringify(data), function (error) {
        if (error) {
          console.log('写入失败')
        } else {
          console.log('写入成功了')
        }
      })
    }
  })