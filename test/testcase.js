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
        testH264ProfileID,
        testH264Profile,
    ]);
}

// --- test cases ------------------------------------------
function testH264ProfileID(test, pass, miss) {

    var result = {
            1: _getProfileIDAndCodec("mp4a.40.2, avc1.66.13")  === "66 1.3",
            2: _getProfileIDAndCodec("mp4a.40.2, avc1.42c00d") === "66 1.3",
            3: _getProfileIDAndCodec("mp4a.40.2, avc1.66.30")  === "66 3.0",
            4: _getProfileIDAndCodec("mp4a.40.2, avc1.42c01e") === "66 3.0",
            5: _getProfileIDAndCodec("mp4a.40.2, avc1.77.30")  === "77 3.0",
            6: _getProfileIDAndCodec("mp4a.40.2, avc1.4d401e") === "77 3.0",
            7: _getProfileIDAndCodec("mp4a.40.2, avc1.4d401f") === "77 3.1",
            8: _getProfileIDAndCodec("mp4a.40.2, avc1.640029") === "100 4.1",

            11: H264Profile.getProfileID(66)  === 66,
            15: H264Profile.getProfileID(77)  === 77,
            18: H264Profile.getProfileID(100) === 100,

            20: H264Profile.getProfileID(0)  === 0, // unknown profile id
            21: H264Profile.getProfileID(1)  === 0, // unknown profile id
        };

    if ( /false/.test(JSON.stringify(result)) ) {
        test.done(miss());
    } else {
        test.done(pass());
    }
}

function _getProfileIDAndCodec(codecs) { // @arg CodecString - "mp4a.40.2, avc1.4d4015";
    var codecArray = codecs.split(","); // -> ["mp4a.40.2", " avc1.42c01e"]

    for (var i = 0, iz = codecArray.length; i < iz; ++i) {
        var codec = codecArray[i].trim();

        if (/avc1/.test(codec)) {
            return H264Profile.getProfileID(codec) + " " + H264Profile.getLevel(codec);
        }
    }
    return "";
}

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

            11: H264Profile.getProfile(66)  === "Base",
            15: H264Profile.getProfile(77)  === "Main",
            18: H264Profile.getProfile(100) === "High",

            21: H264Profile.getLevel(0x0C) === "1.2",
            28: H264Profile.getLevel(0x1E) === "3.0",
            29: H264Profile.getLevel(0x33) === "5.1",
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

