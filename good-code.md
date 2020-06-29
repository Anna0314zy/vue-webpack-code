```js
fontSize  -> font-size
'fontSize'.replace(/([A-Z])/g, function(){return '-' + arguments[1]})

function transform(str) {
    const reg = /([A-Z])/g;
   return str.replace(reg, function() {
    //    console.log(arguments, 'transform-arguments')
        return '-' + String(arguments[1]).toLocaleLowerCase();
    })
}
```

```
body {
    h1 {
        background: url('./base.js') // url: require('./a.js')
    }
    h2 {
        background: url('./base.js')
    }
}
```

