// function encodeUTF8(s) {
//     var i, r = [], c, x;
//     for (i = 0; i < s.length; i++)
//       if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
//       else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
//       else {
//         if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
//           c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
//             r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
//         else r.push(0xE0 + (c >> 12 & 0xF));
//         r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
//       };
//     return r;
//   }

//   // 字符串加密成 hex 字符串
//   export default function sha1(s) {
//     var data = new Uint8Array(encodeUTF8(s))
//     var i, j, t;
//     var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
//     s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
//     for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
//     s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
//     s[l - 1] = data.length << 3;
//     var w = [], f = [
//       function () { return m[1] & m[2] | ~m[1] & m[3]; },
//       function () { return m[1] ^ m[2] ^ m[3]; },
//       function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
//       function () { return m[1] ^ m[2] ^ m[3]; }
//     ], rol = function (n, c) { return n << c | n >>> (32 - c); },
//       k = [1518500249, 1859775393, -1894007588, -899497514],
//       m = [1732584193, -271733879, null, null, -1009589776];
//     m[2] = ~m[0], m[3] = ~m[1];
//     for (i = 0; i < s.length; i += 16) {
//       var o = m.slice(0);
//       for (j = 0; j < 80; j++)
//         w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
//           t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
//           m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
//       for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
//     };
//     t = new DataView(new Uint32Array(m).buffer);
//     for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

//     var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
//       return (e < 16 ? "0" : "") + e.toString(16);
//     }).join("");
//     return hex;
//   }





function add(x, y) {
    return ((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
}

function SHA1hex(num) {
    var sHEXChars = "0123456789abcdef";
    var str = "";
    for (var j = 7; j >= 0; j--)
        str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);
    return str;
}

function AlignSHA1(sIn) {
    var nblk = ((sIn.length + 8) >> 6) + 1,
        blks = new Array(nblk * 16);
    for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < sIn.length; i++)
        blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);
    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
    blks[nblk * 16 - 1] = sIn.length * 8;
    return blks;
}

function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}

function kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
        (t < 60) ? -1894007588 : -899497514;
}

export default function SHA1(sIn) {
    var x = AlignSHA1(sIn);
    var w = new Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
        e = add(e, olde);
    }
    var SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);
    return SHA1Value.toUpperCase();
}

function SHA2(sIn) {
    return SHA1(sIn).toLowerCase();
}
