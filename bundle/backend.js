/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(0);
var sound_info_model_1 = __webpack_require__(12);
var transcoding_service_1 = __webpack_require__(4);
var statistics_model_1 = __webpack_require__(18);
var metrics_model_1 = __webpack_require__(19);
var METRICS = mongoose.model('Metrics', metrics_model_1.MetricsSchema);
var STATS = mongoose.model('Statistics', statistics_model_1.STATISTICS_SCHEMA);
var SOUND_META = mongoose.model('SoundMeta', sound_info_model_1.SoundMetaSchema);
function storeManager() {
    var _this = this;
    return {
        // getMetrics: async (soundId: string): Promise<StoreResponse> => {
        // 	const mResponse  = await METRICS.find({sound_id: soundId})
        // 		.catch((err: string) => console.log('Error: GettingMetrics', err));
        // 		return {ok: true, payload: mResponse}
        // },
        setMetrics: function (soundId, metric) { return __awaiter(_this, void 0, void 0, function () {
            var mResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, METRICS
                            .findById(soundId)
                            .update(__assign({}, metric, { soundId: soundId }))
                            .catch(function (err) { return console.log('Error: Setting Metrics', err); })];
                    case 1:
                        mResponse = _a.sent();
                        if (mResponse) {
                            return [2 /*return*/, { ok: true, payload: mResponse }];
                        }
                        else {
                            return [2 /*return*/, { ok: false, message: 'Error: No Metrics Found' }];
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        createNewMetrics: function (metrics) { return __awaiter(_this, void 0, void 0, function () {
            var mResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, METRICS.create(metrics)
                            .catch(function (err) { return console.log('Error: Getting Metrics', err); })];
                    case 1:
                        mResponse = _a.sent();
                        if (mResponse) {
                            return [2 /*return*/, { ok: true, payload: mResponse }];
                        }
                        else {
                            return [2 /*return*/, { ok: false, message: 'Error: No Metrics Found' }];
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        getSoundStats: function (soundId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, STATS
                            .findById(soundId)
                            .catch(function (err) { return console.log('Error: Getting STATS', err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        setSoundStats: function (soundId, stat) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, STATS
                            .findById(soundId)
                            .update(__assign({}, stat, { sound_id: soundId }))
                            .catch(function (err) { return console.log('Error: Setting STATS', err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        createNewStats: function (stats) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, STATS.create(stats)
                            .catch(function (err) { return console.log('Error: Getting STATS', err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        getSoundDetails: function (props) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, SOUND_META.find(props)
                        .catch(function (err) { return console.log('Error: Getting STATS', err); })];
            });
        }); },
        getAllSoundsDetails: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SOUND_META.find()
                            .catch(function (err) { return console.log('Error: Getting STATS', err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        // TODO Refactor Response to StoreResponse
        registerNewSound: function (formData, userID) { return __awaiter(_this, void 0, void 0, function () {
            var title, description, registered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = formData.title, description = formData.description;
                        return [4 /*yield*/, SOUND_META.create({ title: title }, { description: description })];
                    case 1:
                        registered = _a.sent();
                        if (registered) {
                            return [2 /*return*/, transcoding_service_1.uploadSound(userID, registered._id, formData.soundFile)
                                    .catch(function (err) { return console.log('Error: Getting STATS', err); })];
                        }
                        else {
                            console.log('error registering sound', registered);
                            return [2 /*return*/, { ok: false, message: registered }];
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        updateSoundByProp: function (id, prop) { return __awaiter(_this, void 0, void 0, function () {
            var soundDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('update', id, prop);
                        return [4 /*yield*/, SOUND_META.findById(id)
                                .catch(function (err) { return console.log('sound', err); })];
                    case 1:
                        soundDoc = _a.sent();
                        if (soundDoc) {
                            return [2 /*return*/, soundDoc.update(prop)
                                    .catch(function (err) { return console.log('update', err); })];
                        }
                        else {
                            return [2 /*return*/, { ok: false, message: 'Error: No Matching Sound ID' }];
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        deleteSoundById: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('deleting sound', id);
                            return [4 /*yield*/, SOUND_META.remove({ _id: id })];
                        case 1:
                            response = _a.sent();
                            console.log('deleted sound?', response);
                            return [2 /*return*/, response];
                    }
                });
            });
        }
    };
}
exports.storeManager = storeManager;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = '1324trgjnfk.szfjaw3r9fbio2a3br23rw,eamf dsczpoh23RN.KNWedfscopjin23rWEAFSD0-9JIO2N3RWEFDS';
exports.TWITTER = {
    APIkey: 'ctDlQT5AXPKRCdVT1j8p8Y6fM',
    secret: 'McEec0arxfxNiKzz6C2GfVahoIuJOXZM5ioMPOkAqWzbBDto3w'
};
exports.DB_UNPW = {
    user: 'dcompAdmin',
    pwd: 'itAdminME2!'
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_manager_1 = __webpack_require__(13);
var ffmpeg_service_1 = __webpack_require__(14);
var store_manager_1 = __webpack_require__(2);
var fs = __webpack_require__(1);
var Path = __webpack_require__(16);
var crypto = __webpack_require__(17);
function uploadSound(userID, soundID, file) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var header, store, _i, _a, bit, path, MIME, outPath, saveResult, flacSaved, mp3Encoded, mp3File, fileHash, mp3Hash, doc;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                header = '';
                                store = store_manager_1.storeManager();
                                for (_i = 0, _a = file.subarray(0, 4); _i < _a.length; _i++) {
                                    bit = _a[_i];
                                    header += bit.toString(16);
                                }
                                path = process.env.PWD + "/dcm-file-store/" + soundID;
                                MIME = HEADER_TO_MIME(header);
                                outPath = process.env.PWD + "/dcm-file-store/" + soundID;
                                return [4 /*yield*/, fs_manager_1.saveToDir(path + "/source", soundID + "." + MIME, file)];
                            case 1:
                                saveResult = _b.sent();
                                if (!saveResult.ok) return [3 /*break*/, 6];
                                return [4 /*yield*/, ffmpeg_service_1.encodeAudioToFLAC(soundID, saveResult.path + "/" + saveResult.fileName, outPath + "/flac/")];
                            case 2:
                                flacSaved = _b.sent();
                                return [4 /*yield*/, ffmpeg_service_1.encodeAudioToMP3(soundID, saveResult.path + "/" + saveResult.fileName, outPath + "/mp3/")];
                            case 3:
                                mp3Encoded = _b.sent();
                                console.log('hit uploadSound after mp3', mp3Encoded);
                                return [4 /*yield*/, fs.readFile(Path.join(process.env.PWD, 'dcm-file-store', soundID, "mp3", soundID + ".mp3"))];
                            case 4:
                                mp3File = _b.sent();
                                fileHash = crypto
                                    .createHash('sha256')
                                    .update(file);
                                mp3Hash = crypto
                                    .createHash('sha256')
                                    .update(mp3File);
                                return [4 /*yield*/, store.updateSoundByProp(soundID, {
                                        sourceHash: fileHash.digest('hex'),
                                        mp3Hash: mp3Hash.digest('hex')
                                    })];
                            case 5:
                                doc = _b.sent();
                                if (mp3Hash && fileHash) {
                                    resolve({ ok: true, body: { path: saveResult.path, details: doc } });
                                }
                                else {
                                    reject({ ok: false, message: 'Error transcoding' });
                                }
                                return [3 /*break*/, 7];
                            case 6:
                                reject({ ok: false, message: saveResult });
                                _b.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.uploadSound = uploadSound;
function HEADER_TO_MIME(header) {
    switch (header.slice(0, 6)) {
        case '464f52':
            return 'aif';
        case '494433':
            return 'mp3';
        case '524946':
            return 'wav';
        case '664C61':
            return 'flac';
        case '000001':
            return 'mp4';
        default:
            return 'unknown';
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var JSONWebToken = __webpack_require__(21);
var mongoose = __webpack_require__(0);
var user_model_1 = __webpack_require__(22);
var _local_credentials_1 = __webpack_require__(3);
var bcrypt = __webpack_require__(23);
var LoginManager = /** @class */ (function () {
    function LoginManager() {
        this.User = mongoose.model('User', user_model_1.UserModel);
    }
    LoginManager.prototype.CreateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.User.create({
                            userName: 'ADMIN-NOCEBO',
                            password: this.hashPassword('dementedGrapefruit00')
                        }).catch(function (err) { return console.log('error create user', err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginManager.prototype.hashPassword = function (password) {
        return bcrypt.hashSync(password, 8);
    };
    LoginManager.prototype.validatePassword = function (password, userName) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.User.findOne({ userName: userName })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, bcrypt.compareSync(password, user.password)];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    LoginManager.prototype.returnSessionToken = function (body) {
        return JSONWebToken.sign({
            sessionId: body.sessionId,
            user: body.userName,
            uid: body.uid
        }, _local_credentials_1.SECRET);
    };
    LoginManager.prototype.signInUser = function (credentials, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validatePassword(credentials.pwd, credentials.userName)];
                    case 1:
                        isValid = _a.sent();
                        if (!isValid) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.User.findOne({ userName: credentials.userName })];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, {
                                    ok: true, payload: {
                                        jwt: this.returnSessionToken({
                                            sessionId: sessionId,
                                            userName: user.userName,
                                            uid: user._id
                                        })
                                    }
                                }];
                        }
                        else {
                            return [2 /*return*/, { ok: false, message: 'User not found.' }];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, { ok: false, message: 'Credentials did not match.' }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginManager.prototype.jwtVerify = function (jwt, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var jwtVerify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwtVerify = new Promise(function (resolve, reject) {
                            JSONWebToken.verify(jwt, _local_credentials_1.SECRET, function (error, decoded) {
                                if (error || (decoded.sessionId !== sessionId)) {
                                    reject({
                                        ok: false,
                                        message: 'JWT was invalid' + error
                                    });
                                }
                                console.log('JWT ok');
                                resolve({ ok: true, payload: decoded });
                            });
                        });
                        return [4 /*yield*/, jwtVerify];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LoginManager;
}());
exports.LoginManager = LoginManager;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var backend_1 = __webpack_require__(8);
function boot() {
    backend_1.default.bootstrap();
}
boot();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var db_config_1 = __webpack_require__(9);
var https = __webpack_require__(11);
var fs = __webpack_require__(1);
var store_manager_1 = __webpack_require__(2);
var public_events_1 = __webpack_require__(20);
var private_events_1 = __webpack_require__(24);
var BackendServices = /** @class */ (function () {
    function BackendServices() {
        this.port = 2820;
        this.socket = __webpack_require__(25)(2820, {
            secure: true,
            transports: ['websocket'],
        });
        // .origins('http://localhost:3000');
        this.clients = [];
        this.init();
        this.setupWS();
    }
    BackendServices.bootstrap = function () {
        return new BackendServices();
    };
    ;
    ;
    BackendServices.prototype.setupWS = function () {
        var _this = this;
        this.socket.on('connect', function (socket) {
            console.log('client connected', socket.id);
            _this.publicEvents = public_events_1.publicEvents(socket);
            _this.privateEvents = private_events_1.privateEvents(socket);
            _this.clients = _this.clients.concat([socket.id]);
            socket.on('disconnecting', function (res) {
                var index = _this.clients.findIndex(function (value) { return value === socket.id; });
                console.log("Client DC'd");
                _this.clients.splice(index, 1);
            });
        });
    };
    BackendServices.prototype.init = function () {
        this.db = db_config_1.dbStart();
        this.server = https.createServer({
            cert: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/certificate.pem'),
            key: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/key.pem')
        });
        this.server.listen(this.port, 'localhost');
        this.storeManager = store_manager_1.storeManager();
    };
    return BackendServices;
}());
exports.BackendServices = BackendServices;
exports.default = BackendServices;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(1);
var _local_credentials_1 = __webpack_require__(3);
var mongoose = __webpack_require__(0);
var DB_Name = 'dcomp-content-store';
var DB_PATH_USER = "mongodb://" + _local_credentials_1.DB_UNPW.user + ":" + _local_credentials_1.DB_UNPW.pwd + "@127.0.0.1:27017/dcomp-content-store";
var DB_PATH = "mongodb://127.0.0.1/" + DB_Name + "/";
var SSL = {
    key: fs.readFileSync(__dirname + '/../../_local/secops/mongodb-cert.key'),
    cert: fs.readFileSync(__dirname + '/../../_local/secops/mongodb-cert.crt')
};
function dbStart() {
    var db = mongoose.connect(DB_PATH_USER, {
        auth: {
            authdb: 'admin'
        },
        useMongoClient: true,
        user: _local_credentials_1.DB_UNPW.user,
        pass: _local_credentials_1.DB_UNPW.pwd,
        ssl: true,
        sslValidate: false,
        sslKey: SSL.key,
        sslCert: SSL.cert
    });
    mongoose.Promise = __webpack_require__(10);
    var collection = new mongoose.Collection('dcomp-content-store', db, {});
    db.on('error', function (evt) { return console.log('connection error', evt); });
    db.once('open', function (evt) {
        console.log('Db Connected!');
        // new LoginManager().CreateUser().then(res => {
        // 	console.log('create user', res);
        // });
    });
    db.useDb(DB_Name);
}
exports.dbStart = dbStart;

/* WEBPACK VAR INJECTION */}.call(exports, "src/odm"))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;
exports.SoundMetaSchema = new Schema({
    id: String,
    soundURL: String,
    videoURL: String,
    imgURL: String,
    title: String,
    description: String
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(1);
function saveToDir(path, fileName, file) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.ensureDir(path)
                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs.writeFile(path + "/" + fileName, file)
                                        .then(function (reason) {
                                        if (reason) {
                                            return { ok: false, message: 'file write error' };
                                        }
                                        else {
                                            return { ok: true, path: "" + path, fileName: "" + fileName };
                                        }
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        return { ok: false, message: 'ensure DIR error: ' + err };
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.saveToDir = saveToDir;
function openFile(sound_id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(process.env.PWD + "/dcm-file-store/" + sound_id + "/mp3/" + sound_id + ".mp3")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.openFile = openFile;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(1);
var spawn = __webpack_require__(15).spawn;
function encodeAudioToFLAC(fileName, filePath, outputPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.ensureDir(outputPath)
                        .then(function () {
                        var ffmpeg = spawn("ffmpeg", ["-i", "" + filePath, "-c:a", "flac", "" + outputPath + fileName + ".flac", "-y"]);
                        // ffmpeg.stdout.on('data', (data: any) => {
                        // 	console.log('flac', data.toString());
                        // });
                        // ffmpeg.stderr.on('data', (data: any) => {
                        // 	console.log(data.toString());
                        // });
                        ffmpeg.on('exit', function (code) {
                            console.log('ffmpeg::flac exited with code: ', code);
                        });
                        return true;
                    })
                        .catch(function (err) {
                        console.log('error creating DIR for ffmpeg.', err);
                        return false;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.encodeAudioToFLAC = encodeAudioToFLAC;
function encodeAudioToMP3(fileName, filePath, outputPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise((function (resolve, reject) {
                    fs.ensureDir(outputPath)
                        .then(function () {
                        var ffmpeg = spawn("ffmpeg", ["-i", "" + filePath, "-codec:a", "libmp3lame", "-b:a", "320k", "" + outputPath + fileName + ".mp3", "-y"]);
                        ffmpeg.on('exit', function (code) {
                            console.log('ffmpeg::mp3 exited with code: ', code);
                            if (0 === parseInt(code)) {
                                resolve(true);
                            }
                            else {
                                reject(false);
                            }
                        });
                    })
                        .catch(function (err) {
                        console.log('error creating DIR for ffmpeg.', err);
                        reject(false);
                    });
                }))];
        });
    });
}
exports.encodeAudioToMP3 = encodeAudioToMP3;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;
exports.STATISTICS_SCHEMA = new Schema({
    id: String,
    likes: Number,
    shares: Number,
    downloads: Number,
    views: Number,
    updates: String,
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;
exports.MetricsSchema = new Schema({
    id: String,
    sessionId: String,
    content_viewed: String,
    updates: Number,
    stateChains: String
});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_manager_1 = __webpack_require__(2);
var login_manager_1 = __webpack_require__(5);
var storeM = store_manager_1.storeManager();
var loginM = new login_manager_1.LoginManager();
function publicEvents(socket) {
    var _this = this;
    socket.on('0AUTH2_TWITTER::GET_URL', function () { });
    socket.on('GET_SOUNDS_META', function (sessionId, callback) { return __awaiter(_this, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeM.getAllSoundsDetails()];
                case 1:
                    info = _a.sent();
                    console.log('details requested', info);
                    if (info) {
                        callback({ payload: info, ok: true, event: 'GET_SOUNDS_META' });
                    }
                    else {
                        callback({ ok: false, message: 'Error: Could not retrieve sounds meta data.' });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('LOGIN', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var loginResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.signInUser(payload.credentials, payload.sessionId)];
                case 1:
                    loginResponse = _a.sent();
                    callback(loginResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('GET_CONTENT_PACK', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
}
exports.publicEvents = publicEvents;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __webpack_require__(0);
var Schema = mongoose.Schema;
exports.UserModel = new Schema({
    userName: {
        type: String,
        unique: true,
        index: true,
    },
    password: String,
    email: String,
});


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var login_manager_1 = __webpack_require__(5);
var store_manager_1 = __webpack_require__(2);
var transcoding_service_1 = __webpack_require__(4);
var loginM = new login_manager_1.LoginManager();
var storeM = store_manager_1.storeManager();
function privateEvents(socket) {
    var _this = this;
    socket.on('PRIVATE::AUTHORIZE', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)
                        .catch(function (err) {
                        console.log('Error: JWT Validation', err);
                        callback(err);
                    })];
                case 1:
                    jwtResponse = _a.sent();
                    if (jwtResponse.ok) {
                        callback({
                            ok: true
                        });
                    }
                    else {
                        callback({
                            ok: false,
                            message: 'Not Authorized'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('PRIVATE::NEW_SOUND_META', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse, rSResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('new sound Meta', payload);
                    return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)];
                case 1:
                    jwtResponse = _a.sent();
                    if (!jwtResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, storeM.registerNewSound(payload.soundMeta, jwtResponse.payload.uid)];
                case 2:
                    rSResponse = _a.sent();
                    callback(rSResponse);
                    return [3 /*break*/, 4];
                case 3:
                    callback({
                        ok: false,
                        message: 'JsonWebToken not valid.',
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    socket.on('PRIVATE::UPDATE_SOUND_META', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse, rSResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)];
                case 1:
                    jwtResponse = _a.sent();
                    if (!jwtResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, storeM.updateSoundByProp(payload.sound_id, payload.prop)];
                case 2:
                    rSResponse = _a.sent();
                    callback(rSResponse);
                    return [3 /*break*/, 4];
                case 3:
                    callback({
                        ok: false,
                        message: 'JsonWebToken not valid.',
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    socket.on('PRIVATE::FILE_UPLOAD', function (payload, ack) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)];
                case 1:
                    jwtResponse = _a.sent();
                    if (!jwtResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, transcoding_service_1.uploadSound(jwtResponse.payload.uid, payload.song_id, payload.data)
                            .catch(function (err) { return console.log('Error: Saving sound to system.', err); })];
                case 2:
                    response = _a.sent();
                    ack(response);
                    return [3 /*break*/, 4];
                case 3:
                    ack({ ok: false, message: 'JWT not valid. Please log in again.' });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    socket.on('PRIVATE::DELETE_SOUND', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)];
                case 1:
                    jwtResponse = _a.sent();
                    if (jwtResponse.ok) {
                        response = storeM.deleteSoundById(payload.id);
                        if (response) {
                            callback({ ok: true, payload: response });
                        }
                        else {
                            callback({ ok: false, message: 'Error: Remove operation failed.' });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('PRIVATE::SET_STAT', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse, rSResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)];
                case 1:
                    jwtResponse = _a.sent();
                    if (!jwtResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, storeM.setSoundStats(payload.sound_id, payload.stat)];
                case 2:
                    rSResponse = _a.sent();
                    callback(rSResponse);
                    return [3 /*break*/, 4];
                case 3:
                    callback({
                        ok: false,
                        message: 'JsonWebToken not valid.',
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    socket.on('PRIVATE::SET_METRICS', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
        var jwtResponse, rSResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt, payload.sessionId)];
                case 1:
                    jwtResponse = _a.sent();
                    if (!jwtResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, storeM.setMetrics(payload.sound_id, payload.metrics)];
                case 2:
                    rSResponse = _a.sent();
                    console.log(rSResponse);
                    callback(rSResponse);
                    return [3 /*break*/, 4];
                case 3:
                    callback({
                        ok: false,
                        message: 'JsonWebToken not valid.',
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
exports.privateEvents = privateEvents;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map