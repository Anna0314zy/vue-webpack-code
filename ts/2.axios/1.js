function a (){
    console.log(this);
}
a();
var b = {};
b.a = new a();
