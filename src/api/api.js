"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require('https');
var fs = require("fs");
var randomUUID = require("crypto").randomUUID;
var Api = /** @class */ (function () {
    function Api(option) {
        this._url = option.url;
        this._headers = option.headers;
    }
    Api.prototype._checkResponse = function (res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    };
    Api.prototype.createTranscription = function () {
    };
    return Api;
}());
var apiSpeechFlow = new Api({
    url: 'https://api.speechflow.io/asr/file/v1',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'keyId': 'bKsW0JDm6q2ACQv7',
        'keySecret': 'cmzthZGIBWHN2B4m',
    },
});
exports.default = apiSpeechFlow;
