// H264Profile test

onmessage = function(event) {
    self.unitTest = event.data; // { message, setting: { secondary, baseDir } }

    if (!self.console) { // polyfill WebWorkerConsole
        self.console = function() {};
        self.console.dir = function() {};
        self.console.log = function() {};
        self.console.warn = function() {};
        self.console.error = function() {};
        self.console.table = function() {};
    }

    importScripts("../../lib/WebModule.js");

    WebModule.VERIFY  = true;
    WebModule.VERBOSE = true;
    WebModule.PUBLISH = true;

    
    importScripts("../wmtools.js");
    importScripts("../../lib/H264Profile.js");
    importScripts("../../release/H264Profile.w.min.js");
    importScripts("../testcase.js");

    self.postMessage(self.unitTest);
};

