export default {
    getStrBytes: (str)=> {
        var byteLen = 0;
        if (str) {
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    byteLen += 2;
                } else {
                    byteLen++;
                }
            }
        }
        return byteLen;
    }
};
