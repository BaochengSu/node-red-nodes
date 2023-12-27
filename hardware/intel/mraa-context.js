var mraa = require('mraa');

module.exports.getPlatformTypeStr = function() {
    switch (mraa.getPlatformType()) {
        case 0: return "Galileo v1";
        case 1: return "Galileo v2";
        case 2: return "Edison Fab C";
        case 3: return "DE3813 Baytrail";
        case 4: return "Minnow Max";
        case 5: return "Raspberry Pi";
        case 6: return "Beaglebone";
        case 7: return "Banana";
        case 26: return "IOT2050";
        default: return "unknown";
    }
}

module.exports.getVersion = function() {
    return mraa.getVersion();
}