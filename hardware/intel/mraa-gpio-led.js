module.exports = function(RED) {
    var m = require('mraa');
    var mraaContext = require('./mraa-context');

    function LEDNode(n) {
        RED.nodes.createNode(this, n);
        this.pin = Number(n.pin);
        this.color = Number(n.color);

        if (this.pin == 0) {
            this.user1_green = new m.Led(0); /*user-led1-green*/
            this.user1_red = new m.Led(1); /*user-led1-red*/
        } if(this.pin == 1) {
            this.user2_green = new m.Led(2); /*user-led2-green*/
            this.user2_red = new m.Led(3); /*user-led2-red*/
        }

        function set_led_green(led_green, led_red) {
            led_green.setBrightness(1);
            led_red.setBrightness(0);
        }

        function set_led_red(led_green, led_red) {
            led_green.setBrightness(0);
            led_red.setBrightness(1);
        }

        function set_led_orange(led_green, led_red) {
            led_green.setBrightness(1);
            led_red.setBrightness(1);
        }

        function turn_off_led(led_green, led_red) {
            led_green.setBrightness(0);
            led_red.setBrightness(0);
        }

        this.on("input", function(msg) {
            if (this.pin == 0) {
                this.led_green = this.user1_green;
                this.led_red = this.user1_red;
            }
            else if (this.pin == 1) {
                this.led_green = this.user2_green;
                this.led_red = this.user2_red;
            }

            if (msg.payload == "1") {
                switch(this.color) {
                    case 0:
                        set_led_green(this.led_green, this.led_red);
                        break;
                    case 1:
                        set_led_red(this.led_green, this.led_red);
                        break;
                    case 2:
                        set_led_orange(this.led_green, this.led_red);
                        break;
                    default:
                        console.log("unexpected");
                        break;
                }
            }
            else {
                turn_off_led(this.led_green, this.led_red);
            }
        });

        this.on('close', function() {
            if (this.pin == 0) {
                this.user1_green.close();
                this.user1_red.close();
            } if(this.pin == 1) {
                this.user2_green.close();
                this.user2_red.close();
            }
        });
    }
    RED.nodes.registerType("mraa-gpio-led", LEDNode, {
        settings: {
            mraaGpioLedBoardType: {
                value: mraaContext.getPlatformTypeStr(),
                exportable: true
            },
            mraaGpioLedMraaVersion: {
                value: mraaContext.getVersion(),
                exportable: true
            }
        }
    });
}
