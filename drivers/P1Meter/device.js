'use strict';

const Homey = require('homey');
var request = require("request");

class MyDevice extends Homey.Device {

    // this method is called when the Device is inited
    onInit() {
        this.log('device init');
        this.log('name:', this.getName());
        this.log('class:', this.getClass());
        
        var s = this.getSettings();
        console.log(s["base_url"]);
        this.log('Base URL: ' + this.getSetting("BASE_URL") + this.getSetting('BASE_PATH') );

        this._url = this.getSetting("BASE_URL") + this.getSetting('BASE_PATH');

        const POLL_INTERVAL = 30000;
        this._pollDataInterval = setInterval(this.testPoll.bind(this), POLL_INTERVAL);
        
    }

    // this method is called when the Device is added
    onAdded() {
        this.log('device added');
    }

    // this method is called when the Device is deleted
    onDeleted() {
        this.log('device deleted');
    }
    testPoll() {
        this.log('polling url' + this._url);

        request({
            url: this._url,
            json: true
        }, function (error, response, body) {
        
            if (!error && response.statusCode === 200) {
                
                var data = JSON.parse(body);
                console.log(data);
                
                

            }
            
        })

    }
    // this method is called when the Device has requested a state change (turned on or off)
    onCapabilityOnoff( value, opts, callback ) {

        // ... set value to real device

        // Then, emit a callback ( err, result )
        callback( null );

        // or, return a Promise
        return Promise.reject( new Error('Switching the device failed!') );
    }

}

module.exports = MyDevice;