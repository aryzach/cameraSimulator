// https://www.scantips.com/lights/subjectdistance.html

window.comp = g;
window.sel = l;
window.fore = m;
var v = ["Copyright 2015", "Anglelchar"];
self != top && (top.location.href = self.location.href);

function A(a) {
    var b = document.getElementsByName(a);
    for (a = 0; a < b.length; a++)
        if (b[a].checked)
            return b[a].value;
    return null
}

function B(a, b) {
    return 999 < a ? Math.round(a) : parseFloat(a.toFixed(b))
}

function I(a, b) {
    var d = a[b].value;
    return isNaN(d) || .001 > d ? (J += K[b] + ",<br>" + d + " is NaN or too small.<br>", 0) : Number(d)
}
var L = 0,
    J, K = {
        pxw: "Image size, pixels",
        pxh: "Image size, pixels",
        foc: "Focal length",
        efl: "Effective FL",
        fl1: "Matching FL",
        osz: "Object real height",
        opx: "Object height, Pixels",
        dis: "Distance",
        width: "Sensor size Width mm",
        height: "Sensor size Height mm",
        crp: "Crop factor",
        el2: "Elevation Angle"
    },
    M = 43.26661531,
    N = ["v3", "v4"],
    O = [0, "r2", "d2", 0],
    P = ["s4", "s1", "s2", "s3"],
    Q = ["F", "P", "S", "D"],
    R = "ip2ctngihtcm0sy. apcrsahnge/".split(""),
    S = String(window.parent.location),
    U = -1 != T(v[0]) || -1 != T(v[1]) ? 1 : 0;

function T(a) {
    var b, d, c = [];
    a = a.toLowerCase();
    var w = R.length - 1;
    for (b = a.length - 3; 0 <= b; b--) {
        for (d = w; 0 < d; d -= 2)
            if (a[b] == R[d - 1]) {
                c += R[d];
                break
            } 0 > d && (c += a[b])
    }
    return S.toLowerCase().search(c)
}

function l(a, b) {
    A("smode") == b && g(a)
}

function g(a) {
    document.getElementById("r1").innerHTML = "";
    setTimeout(function() {
        V(a)
    }, 40)
}

function V(a) {
    function b(h, k) {
        switch (h) {
            case "1":
            case "3":
                e = .83205029 * k;
                f = e * ("1" == h ? 2 / 3 : .5625);
                break;
            case "2":
            case "4":
                e = .8 * k;
                f = e * ("2" == h ? .75 : .5625);
                break;
            case "5":
                e = .871575537 * k;
                f = .5625 * e;
                break;
            case "6":
            case "7":
                f = .49026124 * k;
                e = f * ("6" == h ? 1.5 : 4 / 3);
                break;
            case "8":
            case "9":
                e = .780868809 * k, f = e * ("8" == h ? .8 : .5625)
        }
        z = e / f
    }

    function d(h, k, r) {
        var C = "H" == A("d2"),
            x = I(h, "pxw"),
            y = I(h, "pxh");
        x < y && (h = x, x = y, y = h);
        // t = y
        t = C != D ? x : y;
        // q = f
        q = C != D ? e : f;
        w = x / y;
        k < r && (h = k, k = r, r = h);
        k >= r && !C ? (e = k, f = r) : (e = r, f = k)
    }
    var c, w, n, t;
    J = "";
    // D = true
    var D = "W" ==
        A("d1");
    var E = A("smode");
    if ("1" == E) {
        var e = I(a, "width");
        var f = I(a, "height");
        var z = e / f;
        d(a, e, f)
    } else if ("2" == E)
        if (n = I(a, "crp"))
            b(a.asp1.value, M / n),
            d(a, e, f);
        else var q = 0;
    else {
        var u = I(a, "efl");
        n = I(a, "fl1");
        u && n ? (b(a.asp2.value, M / (u / n)), d(a, e, f)) : q = 0
    }
    u = I(a, "foc");
    var p = A("mode");
    var F = "D" == p ? 1 : I(a, "dis");
    var G = "S" == p ? 1 : I(a, "osz");
    var H = "P" == p ? 1 : I(a, "opx");
    if (U) {
        n = D ? "Width" : "Height";
        if (n[0] != L[0])
            for (L = n, c = N.length - 1; 0 <= c; c--) document.getElementById(N[c]).innerHTML = n;
        c = document.getElementById("csiz");
        c.innerHTML =
            "";
        c.innerHTML = J ? "" : E + ". Sensor " + B(e, 2) + "&#215;" + B(f, 2) + " mm (Aspect " + B(z, 3) + ":1)<br>&nbsp; (Image " + n + " is " + t + " pixels, " + B(q, 2) + " mm)";
        c = Math.abs(1 - w / z);
        document.getElementById("r1").innerHTML = J ? '<p><span style="color:red;"><b>' + J + "</b></span>" : "(result is above, at Pink)<p><b>Results, Distance, Size are SAME Units</b>" + (.01 > c ? "" : '<br><span style="color:red;">But Aspect Ratios of Image size (' + B(w, 3) + ")<br>and Sensor size (" + B(z, 3) + ") differ by " + B(100 * c, 1) + "%</span>");
        J || ("D" == p ? a.dis.value =
            B(G * u * t / (q * H), 2) : "S" == p ? a.osz.value = B(q * H * F / (u * t), 2) : "P" == p ? a.opx.value = Math.round(u * G * t / (F * q)) : "F" == p && (a.foc.value = Math.round(q * H * F / (t * G))));
        for (c = Q.length - 1; 0 <= c; c--)
            if (document.getElementById(P[c]).style.backgroundColor = J || p != Q[c] ? "inherit" : "#fbc", 1 == c || 2 == c) document.getElementById(O[c]).innerHTML = p == Q[c] ? "Same<br>units" : "feet or<br>meters"
    }
}

function m(a) {
    var b, d = "",
        c = Math.PI / 180;
    for (b = 0; 91 > b; b += 5) d += "<tr><td>" + b + "&deg;</td><td>" + (90 == b ? "&#8734;" : B(1 / Math.cos(b * c), 4)) + "</td></tr>";
    document.getElementById("for").innerHTML = '<h3 style="margin:1px;">Perspective<br>Foreshortening</h3><table class="tb3"><tr><th>Tilted<br>Degrees</th><th style="padding-left:10px;">Multiplier<br>of Height</th></tr>' + d + "</table>";
    J = "";
    b = "0" == a.el2.value ? 0 : I(a, "el2");
    90 < b && (J += "The angle limit here<br>is 90 degrees");
    document.getElementById("el3").innerHTML = J ?
        "<br><b>" + J + "</b>" : 89.999 < b ? "&#8734;" : B(1 / Math.cos(b * c), 4)
};
