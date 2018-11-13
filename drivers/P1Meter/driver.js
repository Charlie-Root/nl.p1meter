'use strict';

const Homey = require('homey');

class MyDriver extends Homey.Driver {


    onInit() {
		this.log('entering P1 driver');
    }
    
    onPairListDevices( data, callback ){

        callback( null, [
            {
                name: 'Foo Device',
                data: {
                    id: 'foo'
                }
            }
        ]);

    }

}

module.exports = MyDriver;