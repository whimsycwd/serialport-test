var SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort('/dev/tty.wchusbserial1420', {
    baudRate: 115200
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));
parser.on('data', console.log);


port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  // console.log('Data:', data.toString());
});

port.on('close', function (err) {
  console.log(err);
});
