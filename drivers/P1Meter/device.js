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

        if(this.getSetting("pollingInterval") > 0) {
            const POLL_INTERVAL = this.getSetting("pollingInterval") * 1000;
            this._pollDataInterval = setInterval(this.dataPoller.bind(this), POLL_INTERVAL);
        }
        else {
            const POLL_INTERVAL = 60000;
            this._pollDataInterval = setInterval(this.dataPoller.bind(this), POLL_INTERVAL);
        }
        
        
        
    }

    // this method is called when the Device is added
    onAdded() {
        this.log('device added');
    }

    // this method is called when the Device is deleted
    onDeleted() {
        this.log('device deleted');
    }
    dataPoller() {
        this.log('polling url' + this._url);
        
        var bla = this;

        request({
            url: this._url,
            json: true
        }, function (error, response, body) {
        
            if (!error && response.statusCode === 200) {
                
               
                if(body.gas) {
                    if(body.gas.reading) {
                        var gasNew = Number(body.gas.reading);

                    }
                    else {
                        var gasNew = 0;
                    }
                    
                    var gasOld = Number(bla.getCapabilityValue('meter_gas'));

                    if(gasOld > 0) {
                        var gasDiff = (gasNew - gasOld);
                    }
                    else {
                        var gasDiff = 0;
                    }
    
                }
                else {
                    var gasOld = 0;
                    var gasNew = 0;
                    var gasDiff = 0;
                }
                
                console.log('gas old/new/diff: ' + gasOld + ' / ' + gasNew + ' / ' + (gasNew - gasOld));
                
                if(body.electricity.received.actual.reading){
                    bla.setCapabilityValue('measure_power', body.electricity.received.actual.reading*1000);
                }
                bla.setCapabilityValue('measure_gas', gasDiff);
                
                
                bla.setCapabilityValue('meter_gas', body.gas.reading);
                
                bla.setCapabilityValue('meter_power', body.electricity.received.tariff1.reading + body.electricity.received.tariff2.reading);

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