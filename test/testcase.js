var ModuleTestH264Profile = (function(global) {

var test = new Test(["H264Profile"], { // Add the ModuleName to be tested here (if necessary).
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        el:         true,  // enable electron (render process) test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
            console.error(error.message);
        }
    });

if (IN_BROWSER || IN_NW || IN_EL || IN_WORKER || IN_NODE) {
    test.add([
        testH264Profile,
    ]);
}
if (IN_BROWSER || IN_NW || IN_EL) {
    test.add([
    ]);
}
if (IN_WORKER) {
    test.add([
    ]);
}
if (IN_NODE) {
    test.add([
    ]);
}

// --- test cases ------------------------------------------
function testH264Profile(test, pass, miss) {

    var result = {
            1: _getProfileAndCodec("mp4a.40.2, avc1.66.13")  === "Base 1.3",
            2: _getProfileAndCodec("mp4a.40.2, avc1.42c00d") === "Base 1.3",
            3: _getProfileAndCodec("mp4a.40.2, avc1.66.30")  === "Base 3.0",
            4: _getProfileAndCodec("mp4a.40.2, avc1.42c01e") === "Base 3.0",
            5: _getProfileAndCodec("mp4a.40.2, avc1.77.30")  === "Main 3.0",
            6: _getProfileAndCodec("mp4a.40.2, avc1.4d401e") === "Main 3.0",
            7: _getProfileAndCodec("mp4a.40.2, avc1.4d401f") === "Main 3.1",
            8: _getProfileAndCodec("mp4a.40.2, avc1.640029") === "High 4.1",
        };

    if ( /false/.test(JSON.stringify(result)) ) {
        test.done(miss());
    } else {
        test.done(pass());
    }
}

function _getProfileAndCodec(codecs) { // @arg CodecString - "mp4a.40.2, avc1.4d4015";
    var codecArray = codecs.split(","); // -> ["mp4a.40.2", " avc1.42c01e"]

    for (var i = 0, iz = codecArray.length; i < iz; ++i) {
        var codec = codecArray[i].trim();

        if (/avc1/.test(codec)) {
            return H264Profile.getProfile(codec) + " " + H264Profile.getLevel(codec);
        }
    }
    return "";
}

return test.run();

})(GLOBAL);

