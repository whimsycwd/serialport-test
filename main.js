var SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort('/dev/tty.wchusbserial141110', {
    baudRate: 115200
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));
var total_cnt = 0;
var err_cnt = 0;
var send_flag = true;
var count = 0;
var content = "M1025 Hello world\n";


function equal(a, b) {
   if (a.length != b.length) {
       return false;
   }
   for (var i = 0; i < a.length - 1; ++i) {
       // console.log(i);
       if (a[i] !== b[i]) {
           return false;
       }
   }
   if (a.charCodeAt(a.length - 1).toString(16) != 'd') { // \r
       return false;
   }
   return true;
}

parser.on('data', function (data) {
    total_cnt++;
    // console.log(data.length);
    // console.log(data.charCodeAt(data.length - 1).toString(16));
    // console.log(content.charCodeAt(data.length - 1).toString(16));
    // console.log(content.length);
    if (equal(data, content)) {
        // console.log('hit');
    } else {
        err_cnt++;
        console.log('err hit');
        console.log('err cnt: ' + err_cnt);
    }
    send_flag = true;
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})




port.on('data', function (data) {

});

port.on('close', function (err) {
  console.log(err);
});




function intervalFunc() {
    if (send_flag) {
        count++;

        port.write(content);
        send_flag = false;

        if (count == 1000000) {
            clearInterval(this);
        }

        if (count % 100  == 0) {
            console.log('total cnt: ' + total_cnt);
            console.log('err cnt: ' + err_cnt);
        }
    }
}
setInterval(intervalFunc, 1);