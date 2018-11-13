'use strict';

const Homey = require('homey');

const BASE_URL = 'http://10.0.1.205';
const BASE_PATH = '/readings.txt';

class P1Meter extends Homey.App {
	
	onInit() {
		this.log('P1Meter is running...');

		
	}
	
}

module.exports = P1Meter;