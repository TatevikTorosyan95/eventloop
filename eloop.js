var fs = require('fs');

console.log('Start');

setImmediate(()=> console.log('Immediate 1')); //a

fs.readFile('./text.txt', (err, data) => { //b
    if (err) {
      console.log(err);
    } else {
      console.log('Success');
    }
  });

setTimeout(() => { //c
    console.log('Timeout 1');
    Promise.resolve().then(() => { //d
        console.log('Promise 1'); 
    });
    setTimeout(() => { //e
        console.log('Timeout 2') ;
        Promise.resolve().then(() => { //f
            console.log('Promise 2'); 
        });
    });

    process.nextTick(() => console.log('Nexttick 1')); //g
});


fs.readFile(__filename, () => { //h
    setTimeout(() => { //i
        console.log('Timeout 3');
        setImmediate(() => { //j
            console.log('Immediate 2');
            });
        process.nextTick(() => console.log('Nexttick 2')); //k
    }, 0);

});


process.nextTick(() => { //l
    console.log('NextTick 3');
    process.nextTick(() => { //m
      console.log('NextTick 4');
    });
});

console.log('Finish');


