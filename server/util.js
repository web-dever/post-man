import os from 'os';

export const ipAddress = function() {
  var interfaces = os.networkInterfaces();
  var IPAdress = '';

  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IPAdress = alias.address;
      }
    }
  }

  return IPAdress;
};
