function xiami (songId, callback) {
    function decoder (sourceString) {
        var _loc9 = Number(sourceString[0]);
        var _loc7 = sourceString.substr(1);
        var _loc5 = Math.floor(_loc7.length / _loc9);
        var _loc6 = _loc7.length % _loc9;
        var _loc2 = new Array();
        for (var _loc3 = 0; _loc3 < _loc6; ++_loc3) {
            if (_loc2[_loc3] == undefined) _loc2[_loc3] = "";
            _loc2[_loc3] = _loc7.substr((_loc5 + 1) * _loc3, _loc5 + 1);
        }
        for (var _loc3 = _loc6; _loc3 < _loc9; ++_loc3)
            _loc2[_loc3] = _loc7.substr(_loc5 * (_loc3 - _loc6) + (_loc5 + 1) * _loc6, _loc5);
        var _loc4 = "";
        for (var _loc3 = 0; _loc3 < _loc2[0].length; ++_loc3)
            for (var _loc1 = 0; _loc1 < _loc2.length; ++_loc1)
                _loc4 = _loc4 + _loc2[_loc1].charAt(_loc3);
        _loc4 = unescape(_loc4);
        var _loc8 = "";
        for (var _loc3 = 0; _loc3 < _loc4.length; ++_loc3) {
            if (_loc4.charAt(_loc3) == "^") {
                _loc8 = _loc8 + "0";
                continue;
            }
            _loc8 = _loc8 + _loc4.charAt(_loc3);
        }
        return _loc8;
    }
    var url = require('url');
    var http = require('http');
    var dataStream = require('dataStream');
    var stream = new dataStream;
    var req = http.get(url.parse("http://www.xiami.com/widget/xml-single/uid/0/sid/" + songId), function (res) {
        res.pipe(stream).on('complate', function () {
            var dom = stream.body().toString();
            callback(decoder(dom.match(/(.*)<location><!\[CDATA\[(.*)\]\]><\/location>(.*)/)[0].replace(/<location><!\[CDATA\[(.*)\]\]><\/location>/, '$1')));
        });
    });
}
var audio_play = document.getElementsByClassName('player');
var audio_text = '<audio src="'+req+'"></audio>'
audio_play.onclick = function(){audip_play.innerHTML(audio_text)};