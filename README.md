# P1 Meter

Homey app to integrate Custom P1 script for your smart energy meter. The script can run on a NAS or pi.

To add your meter go to "Devices", click add and enter the hostname and URI of the scripts output (eg. http://10.0.1.10 and /output.txt).
The polling interval can be changed in the device settings (default 30 seconds).

# The extra script

The script can be found here:
https://github.com/Charlie-Root/node-p1-reader (forked from jorith88)

You can alter the 'example.js' to output the array as json to a txt file that can be accessed by Homey 

### Donate

If you like the app, you can always donate so i can keep improving it :)

[![Donate](https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png)](https://paypal.me/WiegerBontekoe)


# Version history

* 1.0.0 - beta