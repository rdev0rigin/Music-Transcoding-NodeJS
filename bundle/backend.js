/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var service_1 = __webpack_require__(2);
	function boot() {
	    service_1.default.bootstrap();
	}
	boot();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var http = __webpack_require__(3);
	var express = __webpack_require__(4);
	var dbConfig = __webpack_require__(5);
	var store_manager_1 = __webpack_require__(7);
	var public_endpoint_1 = __webpack_require__(10);
	var login_manager_1 = __webpack_require__(11);
	var session_endpoint_1 = __webpack_require__(16);
	var BackendServices = /** @class */ (function () {
	    function BackendServices() {
	        this.app = express();
	        this.port = 2820;
	        this.socket = __webpack_require__(17)(2820);
	        this.clients = [];
	        this.init();
	        this.setupWS();
	        dbConfig();
	    }
	    BackendServices.bootstrap = function () {
	        return new BackendServices();
	    };
	    ;
	    ;
	    BackendServices.prototype.setupWS = function () {
	        var _this = this;
	        this.socket.on('connect', function (socket) {
	            _this.generalAPI = public_endpoint_1.publicEndpoints(socket);
	            _this.sessionAPI = session_endpoint_1.sessionEndpoints(socket);
	            _this.clients = _this.clients.concat([socket]);
	            var index = _this.clients.length - 1;
	            socket.on('disconnecting', function () {
	                console.log('index on close', index);
	                _this.clients.splice(index, 1);
	            });
	        });
	    };
	    BackendServices.prototype.init = function () {
	        this.server = http.createServer(this.app);
	        this.server.listen(this.port, 'localhost');
	        this.storeManager = store_manager_1.storeManager();
	        this.loginManager = new login_manager_1.LoginManager();
	    };
	    return BackendServices;
	}());
	exports.BackendServices = BackendServices;
	exports.default = BackendServices;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function () {
	    var mongoose = __webpack_require__(6);
	    var db = mongoose.connection;
	    mongoose.connect('mongodb://localhost:27017/dcomp_store_root', {
	        useMongoClient: true
	    });
	    db.on('error', console.error.bind(console, 'connection error'));
	    db.once('open', function () {
	        console.log('Db Connected!');
	    });
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("mongoose");

/***/ }),
/* 7 */
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
	var track_model_1 = __webpack_require__(8);
	var mongoose = __webpack_require__(6);
	var manifest_model_1 = __webpack_require__(9);
	var Track = mongoose.model('Track', track_model_1.TrackDataSchema);
	var Manifest = mongoose.model('Manifest', manifest_model_1.StoreManifest);
	function storeManager() {
	    var _this = this;
	    // update resource index
	    return {
	        getTrackByProp: function (prop) { return __awaiter(_this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, Track.findOne(prop)];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); },
	        getAllSongsInfo: function () { return __awaiter(_this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, Manifest.find()];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); },
	        getStreamById: function () {
	            //  const { Writable } = require('stream');
	            //  const myWritable = new Writable({
	            // 	write(chunk, encoding, callback) {
	            // 		// ...
	            // 	},
	            // 	writev(chunks, callback) {
	            // 		// ...
	            // 	}
	            // });
	            // const readable = new ReadableStream()
	        },
	        createWith: function (payload, type) { return __awaiter(_this, void 0, void 0, function () {
	            var model;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        model = getModel(type);
	                        if (!model) {
	                            return [2 /*return*/, void 0];
	                        }
	                        return [4 /*yield*/, model.create(payload)
	                                .then(function (value) {
	                            }).catch(function (err) { console.log('store error', err); })];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); },
	        registerNewTrack: function (payload) { return __awaiter(_this, void 0, void 0, function () {
	            var mp3Data, mp4Data, imgURL, soundS3URL, videoS3URL;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        mp3Data = payload.mp3Data, mp4Data = payload.mp4Data, imgURL = payload.imgURL, soundS3URL = payload.soundS3URL, videoS3URL = payload.videoS3URL;
	                        return [4 /*yield*/, Track.create({
	                                mp3Data: mp3Data,
	                                mp4Data: mp4Data,
	                                imgURL: imgURL,
	                                soundS3URL: soundS3URL,
	                                videoS3URL: videoS3URL
	                            })];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); },
	        updateTrackRecord: function (payload, prop) { return __awaiter(_this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, Track.find(prop).update(payload)];
	                    case 1:
	                        if (!((_a.sent()) > 0)) return [3 /*break*/, 3];
	                        return [4 /*yield*/, Track.findOne(prop)];
	                    case 2: return [2 /*return*/, _a.sent()];
	                    case 3: return [2 /*return*/, void 0];
	                }
	            });
	        }); },
	        updateByProp: function (payload, prop, type) { return __awaiter(_this, void 0, void 0, function () {
	            var model;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        model = getModel(type);
	                        if (!model) {
	                            return [2 /*return*/, void 0];
	                        }
	                        return [4 /*yield*/, model.find(prop).update(payload).exec()];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); },
	        getWholeFile: function (prop, type) { return __awaiter(_this, void 0, void 0, function () {
	            var model;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        model = getModel(type);
	                        if (!model) {
	                            return [2 /*return*/, void 0];
	                        }
	                        return [4 /*yield*/, model.findOne(prop)
	                                .catch(function (err) { console.log('store error', err); })];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); }
	    };
	}
	exports.storeManager = storeManager;
	function getModel(type) {
	    switch (type) {
	        case 'TRACK':
	            return Track;
	        case 'MANIFEST':
	            return Manifest;
	        default:
	            console.log('error no model found of type', type);
	            return null;
	    }
	}
	var store = storeManager();
	var data = JSON.stringify([{
	        graveSon: {
	            title: 'DComposeD',
	            id: '123',
	            key: 'graveSon',
	            slug: 'grave_son',
	            route: '/music/grave_son',
	            mp3URL: '//s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-176659737152/dcomposed-remaster-wip.m4a',
	            mp4URL: '/dcomp_wip.mp4',
	            imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/c_scale,h_820,q_54/v1509156983/dcomposed-album-art_mavbxv.jpg',
	            weight: 1,
	            mode: 'VIDEO',
	            likes: 31,
	            downloads: 29,
	            shares: 27,
	            plays: 153,
	        },
	    }, {
	        getSome: {
	            title: 'Grave Son',
	            id: '123',
	            key: 'getSome',
	            slug: 'get_some',
	            route: '/music/grave_son',
	            mp3URL: 'GetSOmeNom.m4a',
	            mp4URL: '/dcomp_wip.mp4',
	            imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
	            weight: 1,
	            mode: 'VIDEO',
	            likes: 31,
	            downloads: 29,
	            shares: 27,
	            plays: 153,
	        },
	    }, {
	        makeSome: {
	            title: 'Fitzpatrick',
	            id: '123',
	            key: 'fitzPatrick',
	            slug: 'fitz_patrick',
	            route: '/music/grave_son',
	            mp3URL: '//s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-176659737152/fitzpatrick.wav',
	            mp4URL: '/dcomp_wip.mp4',
	            imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
	            weight: 1,
	            mode: 'VIDEO',
	            likes: 31,
	            downloads: 29,
	            shares: 27,
	            plays: 153,
	        },
	    }, {
	        ravenFun: {
	            title: 'Grave Son',
	            id: '123',
	            key: 'ravenFun',
	            slug: 'raven_fun',
	            route: '/music/grave_son',
	            mp3URL: 'GetSOmeNom.m4a',
	            mp4URL: '/dcomp_wip.mp4',
	            imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
	            weight: 1,
	            mode: 'VIDEO',
	            likes: 31,
	            downloads: 29,
	            shares: 27,
	            plays: 153,
	        },
	    }, {
	        greaterSum: {
	            title: 'Grave Son',
	            id: '123',
	            key: 'greaterSum',
	            slug: 'greater_sum',
	            route: '/music/grave_son',
	            mp3URL: 'GetSOmeNom.m4a',
	            mp4URL: '/dcomp_wip.mp4',
	            imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
	            weight: 1,
	            mode: 'VIDEO',
	            likes: 31,
	            downloads: 29,
	            shares: 27,
	            plays: 153,
	        },
	    }, {
	        lessThanOne: {
	            title: 'Grave Son',
	            id: '123',
	            key: 'lessThanOne',
	            slug: 'less_than_one',
	            route: '/music/grave_son',
	            mp3URL: 'GetSOmeNom.m4a',
	            mp4URL: '/dcomp_wip.mp4',
	            imgURL: '//res.cloudinary.com/dncldsgvn/image/upload/v1507473563/grave-son-cover_dpnpu0.jpg',
	            weight: 1,
	            mode: 'VIDEO',
	            likes: 31,
	            downloads: 29,
	            shares: 27,
	            plays: 153,
	        }
	    }]);
	store.createWith({ manifest: data }, 'MANIFEST')
	    .then(function (res) { return console.log('success', res); });


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mongoose = __webpack_require__(6);
	var Schema = mongoose.Schema;
	exports.TrackDataSchema = new Schema({
	    mp3Data: Buffer,
	    mp4Data: Buffer,
	    imgURL: String,
	    imgData: Buffer,
	    soundS3URL: String,
	    videoS3URL: String,
	});
	exports.TrackInfoSchema = new Schema({
	    track_id: String,
	    slug: String,
	    mode: String,
	    title: String,
	    key: String,
	    route: String,
	});
	exports.TrackStatsSchema = new Schema({
	    track_id: String,
	    likes: Number,
	    downloads: Number,
	    shares: Number,
	    plays: Number,
	});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mongoose = __webpack_require__(6);
	var Schema = mongoose.Schema;
	exports.StoreManifest = new Schema({
	    manifest: String
	});


/***/ }),
/* 10 */
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
	var store_manager_1 = __webpack_require__(7);
	var login_manager_1 = __webpack_require__(11);
	var storeM = store_manager_1.storeManager();
	var loginM = new login_manager_1.LoginManager();
	function publicEndpoints(socket) {
	    var _this = this;
	    socket.on('0AUTH2_TWITTER::GET_URL', function () {
	    });
	    socket.on('GET_SONG_BY_PROP', function (payload) { return __awaiter(_this, void 0, void 0, function () {
	        var track;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    console.log('get song', payload);
	                    return [4 /*yield*/, storeM.getTrackByProp(payload.prop)];
	                case 1:
	                    track = _a.sent();
	                    if (track) {
	                        socket.emit("GET_SONG_BY_PROP::CLIENT_" + payload.sessionId, { ok: true, track: track });
	                    }
	                    else {
	                        socket.emit("GET_SONG_BY_PROP::CLIENT_" + payload.sessionId, { ok: false, message: 'Failed to get track by prop.' });
	                    }
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	    socket.on('GET_ALL_MUSIC_DETAILS', function (sessionId) { return __awaiter(_this, void 0, void 0, function () {
	        var info;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, storeM.getAllSongsInfo()];
	                case 1:
	                    info = _a.sent();
	                    if (info) {
	                        console.log('get info', info, sessionId);
	                        socket.emit("GET_ALL_MUSIC_DETAILS::CLIENT_" + sessionId, __assign({ ok: true }, info));
	                    }
	                    else {
	                        socket.emit("GET_ALL_MUSIC_DETAILS::CLIENT_" + sessionId, { ok: false, message: 'Failed to get track by prop.' });
	                    }
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	    socket.on('GET_SONG_DATA', function (payload) { return __awaiter(_this, void 0, void 0, function () {
	        var file;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, storeM.getWholeFile(payload.prop, payload.type)];
	                case 1:
	                    file = _a.sent();
	                    if (file) {
	                        socket.emit("GET_SONG_DATA::CLIENT_" + payload.sessionId, { ok: true, file: file });
	                    }
	                    else {
	                        socket.emit("GET_SONG_DATA::CLIENT_" + payload.sessionId, { ok: false, message: 'Failed to get track by prop.' });
	                    }
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	    socket.on('LOGIN', function (payload) { return __awaiter(_this, void 0, void 0, function () {
	        var jwtResponse;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, loginM.signInUser(payload.credentials, payload.sessionId)];
	                case 1:
	                    jwtResponse = _a.sent();
	                    console.log('jwt response', jwtResponse);
	                    if (jwtResponse.ok) {
	                        socket.emit("LOGIN::CLIENT_" + payload.sessionId, { ok: true, jwt: jwtResponse.jwt });
	                    }
	                    else {
	                        socket.emit("LOGIN::CLIENT_" + payload.sessionId, { ok: false, message: jwtResponse.message });
	                    }
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	}
	exports.publicEndpoints = publicEndpoints;


/***/ }),
/* 11 */
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
	var user_model_1 = __webpack_require__(12);
	var _local_credentials_1 = __webpack_require__(13);
	var mongoose = __webpack_require__(6);
	var bcrypt = __webpack_require__(14);
	var JSONWebToken = __webpack_require__(15);
	var LoginManager = /** @class */ (function () {
	    function LoginManager() {
	        this.User = mongoose.model('User', user_model_1.UserModel);
	        // this.User.create({
	        // 	username: 'ADMIN-NOCEBO',
	        // 	password: this.hashPassword('dementedGrapefruit00')
	        // }).then(res => res);
	    }
	    LoginManager.prototype.hashPassword = function (password) {
	        return bcrypt.hashSync(password, 8);
	    };
	    LoginManager.prototype.validatePassword = function (password, username) {
	        return __awaiter(this, void 0, void 0, function () {
	            var user;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.User.findOne({ username: username })];
	                    case 1:
	                        user = _a.sent();
	                        console.log('user', user);
	                        if (user) {
	                            return [2 /*return*/, bcrypt.compareSync(password, user.password)];
	                        }
	                        return [2 /*return*/, false];
	                }
	            });
	        });
	    };
	    LoginManager.prototype.returnSessionToken = function (sessionId) {
	        return JSONWebToken.sign({ createdWith: sessionId, user: 'ADMIN' }, _local_credentials_1.SECRET);
	    };
	    LoginManager.prototype.signInUser = function (credentials, sessionId) {
	        var _this = this;
	        return this.validatePassword(credentials.password, credentials.username)
	            .then(function (isValid) {
	            console.log('isValid', isValid);
	            if (isValid) {
	                console.log('logged in ', credentials);
	                return { ok: true, jwt: _this.returnSessionToken(sessionId) };
	            }
	            else {
	                console.log('logged in failed', credentials);
	                return { ok: false, message: 'Credentials did not match.' };
	            }
	        });
	    };
	    LoginManager.prototype.jwtVerify = function (jwt) {
	        return {
	            verified: JSONWebToken.verify(jwt, 8),
	            data: JSONWebToken.decode(jwt, _local_credentials_1.SECRET)
	        };
	    };
	    return LoginManager;
	}());
	exports.LoginManager = LoginManager;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mongoose = __webpack_require__(6);
	var Schema = mongoose.Schema;
	exports.UserModel = new Schema({
	    username: {
	        type: String,
	        unique: true,
	        index: true,
	    },
	    password: String,
	    email: String,
	});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SECRET = '1324trgjnfk.szfjaw3r9fbio2a3br23rw,eamf dsczpoh23RN.KNWedfscopjin23rWEAFSD0-9JIO2N3RWEFDS';
	exports.TWITTER = {
	    APIkey: 'ctDlQT5AXPKRCdVT1j8p8Y6fM',
	    secret: 'McEec0arxfxNiKzz6C2GfVahoIuJOXZM5ioMPOkAqWzbBDto3w'
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("bcryptjs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ }),
/* 16 */
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
	var login_manager_1 = __webpack_require__(11);
	function sessionEndpoints(socket) {
	    var _this = this;
	    var loginM = new login_manager_1.LoginManager();
	    socket.on('SESSION_AUTH', function (jwt, sessionId) { return __awaiter(_this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            if (loginM.jwtVerify(jwt)) {
	                socket.emit("SESSION_AUTH::CLIENT_" + sessionId, { ok: true, });
	            }
	            else {
	                socket.emit("SESSION_AUTH::CLIENT_" + sessionId, {
	                    ok: false,
	                    message: 'Failed to get track by prop.',
	                });
	            }
	            return [2 /*return*/];
	        });
	    }); });
	}
	exports.sessionEndpoints = sessionEndpoints;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("socket.io");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map