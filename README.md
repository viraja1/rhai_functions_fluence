## Rhai Functions for Fluence

Rhai is an embedded scripting language for Rust (https://github.com/jonathandturner/rhai)


### Screenshots
![](screenshots/rhai_functions_fluence.png)

### App URL
http://rhai-functions.surge.sh/ (Fluence App 400)

### Examples

**Assignment**
```
let x = 58;
x
```
{"result":58}

**Array**

```
let x = [1, 2, 3]; 
x[1]
```
{"result":2}

**Function**
```
fn addme(a, b) { 
  a + b 
}
addme(3, 4)
```
{"result":7}

**if else**
```
let a = true;
let x = 0;
if(a){
 x = 50;
}
else{
 x = 100;
}
x
```
{"result":50}

**String**
```
"hello " + "world!"
```
{"result":"hello world!"}

**Predefined Function**
```
factorial(5)
```
{"result":120}