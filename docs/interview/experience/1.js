// ①
var a = 5;
function a() { console.log(20); }
console.log(typeof a);
function b() { console.log(30) };
function b() { console.log(60) };
try {
    b();
} catch (e) {
    console.log('error')
}

// ②
function hello1(){
    Promise.resolve().then(function(){
        console.log(this.name || 'anonymous');
    })
}

function hello2(){
    setTimeout(function(){
        console.log(this.name || 'anonymous');
    })
}
hello1.call({name: 'alice'});
hello2.call({name: 'bob'});

// ③
setTimeout(()=>console.log('a'), 0);
console.log('b');
new Promise(resolve => {
    resolve(console.log('c'));
    console.log('d');
}).then(() => console.log('e'))
const f = async function(){
    console.log('f')
};
f()



