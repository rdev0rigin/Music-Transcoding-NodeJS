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
	var backend_1 = __webpack_require__(2);
	function boot() {
	    backend_1.default.bootstrap();
	}
	boot();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var https = __webpack_require__(3);
	var dbConfig = __webpack_require__(4);
	var store_manager_1 = __webpack_require__(7);
	var public_endpoint_1 = __webpack_require__(15);
	var login_manager_1 = __webpack_require__(16);
	var session_endpoint_1 = __webpack_require__(21);
	var fs = __webpack_require__(5);
	var BackendServices = /** @class */ (function () {
	    function BackendServices() {
	        this.port = 2820;
	        this.socket = __webpack_require__(22)(2820, {
	            secure: true,
	            maxHttpBufferSize: 1024 * 1024 * 1024,
	        });
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
	            _this.clients = _this.clients.concat([socket.id]);
	            socket.on('disconnecting', function (res) {
	                var index = _this.clients.findIndex(function (value) { return value === socket.id; });
	                console.log("Client DC'd");
	                _this.clients.splice(index, 1);
	            });
	        });
	    };
	    BackendServices.prototype.init = function () {
	        this.server = https.createServer({
	            cert: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/certificate.pem'),
	            key: fs.readFileSync('/Users/raven/dev0/dcomp-backend/src/key.pem')
	        });
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

	module.exports = require("https");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var fs = __webpack_require__(5);
	module.exports = function () {
	    var mongoose = __webpack_require__(6);
	    var db = mongoose.connection;
	    console.log('pwd', __dirname, process.env.PATH.PWD);
	    mongoose.connect('mongodb://localhost:27017/dcomp_store_root', {
	        useMongoClient: true,
	        ssl: true,
	        sslValidate: false,
	        sslKey: fs.readFileSync(__dirname + '/../../_local/secops/mongodb-cert.key'),
	        sslCert: fs.readFileSync(__dirname + '/../../_local/secops/mongodb-cert.crt')
	    });
	    db.on('error', console.error.bind(console, 'connection error'));
	    db.once('open', function () {
	        console.log('Db Connected!');
	    });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, "src/odm"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("fs-extra");

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
	var mongoose = __webpack_require__(6);
	var sound_info_model_1 = __webpack_require__(8);
	var transcoding_service_1 = __webpack_require__(9);
	var SoundInfo = mongoose.model('SoundInfo', sound_info_model_1.SoundDetailsSchema);
	function storeManager() {
	    var _this = this;
	    return {
	        getSoundDetails: function (props) { return __awaiter(_this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                return [2 /*return*/, SoundInfo.find(props)];
	            });
	        }); },
	        getAllSoundsDetails: function () { return __awaiter(_this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, SoundInfo.find()];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        }); },
	        registerNewSound: function (formData, userID) { return __awaiter(_this, void 0, void 0, function () {
	            var title, description, registered;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        title = formData.title, description = formData.description;
	                        return [4 /*yield*/, SoundInfo.create({ title: title, description: description })];
	                    case 1:
	                        registered = _a.sent();
	                        if (registered) {
	                            return [2 /*return*/, transcoding_service_1.saveSound(userID, registered._id, formData.soundFile)];
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
	                        return [4 /*yield*/, SoundInfo.findById(id)
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
	        }); }
	    };
	}
	exports.storeManager = storeManager;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mongoose = __webpack_require__(6);
	var Schema = mongoose.Schema;
	exports.SoundDetailsSchema = new Schema({
	    id: String,
	    soundURL: String,
	    videoURL: String,
	    imgURL: String,
	    title: String,
	    description: String
	});


/***/ }),
/* 9 */
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
	var fs_manager_1 = __webpack_require__(10);
	var ffmpeg_service_1 = __webpack_require__(11);
	var store_manager_1 = __webpack_require__(7);
	var fs = __webpack_require__(5);
	var Path = __webpack_require__(13);
	var crypto = __webpack_require__(14);
	function saveSound(userID, soundID, file) {
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
	                                console.log('hit saveSound after mp3', mp3Encoded);
	                                return [4 /*yield*/, fs.readFile(Path.join(process.env.PWD, 'dcm-file-store', soundID, "mp3", soundID + ".mp3"))];
	                            case 4:
	                                mp3File = _b.sent();
	                                fileHash = crypto.createHash('sha256')
	                                    .update(file);
	                                mp3Hash = crypto.createHash('sha256')
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
	exports.saveSound = saveSound;
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
/* 10 */
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
	var fs = __webpack_require__(5);
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
	var fs = __webpack_require__(5);
	var spawn = __webpack_require__(12).spawn;
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
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ }),
/* 15 */
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
	var store_manager_1 = __webpack_require__(7);
	var login_manager_1 = __webpack_require__(16);
	var fs_manager_1 = __webpack_require__(10);
	var storeM = store_manager_1.storeManager();
	var loginM = new login_manager_1.LoginManager();
	function publicEndpoints(socket) {
	    var _this = this;
	    socket.on('0AUTH2_TWITTER::GET_URL', function () {
	    });
	    socket.on('GET_ALL_SOUNDS_DETAILS', function (sessionId, callback) { return __awaiter(_this, void 0, void 0, function () {
	        var info;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    console.log('socket ID from get?', socket.id);
	                    return [4 /*yield*/, storeM.getAllSoundsDetails()];
	                case 1:
	                    info = _a.sent();
	                    callback({ body: info, ok: true });
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	    socket.on('LOGIN', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
	        var rSResponse;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, loginM.signInUser(payload.credentials, payload.sessionId)];
	                case 1:
	                    rSResponse = _a.sent();
	                    callback(rSResponse);
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	    socket.on('GET_SOUND_DATA', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
	        var document, data;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, storeM.getSoundDetails({ _id: payload.sound_id })
	                        .catch(function (err) { console.log('coudl not find document', err); })];
	                case 1:
	                    document = _a.sent();
	                    return [4 /*yield*/, fs_manager_1.openFile(payload.sound_id)
	                            .catch(function (err) { console.log('file read error', err); })];
	                case 2:
	                    data = _a.sent();
	                    console.log('DATA \n', data.toString(), document);
	                    callback({ ok: true, data: data });
	                    return [2 /*return*/];
	            }
	        });
	    }); });
	}
	exports.publicEndpoints = publicEndpoints;


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
	var user_model_1 = __webpack_require__(17);
	var _local_credentials_1 = __webpack_require__(18);
	var mongoose = __webpack_require__(6);
	var bcrypt = __webpack_require__(19);
	var JSONWebToken = __webpack_require__(20);
	var LoginManager = /** @class */ (function () {
	    function LoginManager() {
	        this.User = mongoose.model('User', user_model_1.UserModel);
	    }
	    LoginManager.prototype.CreateUser = function () {
	        this.User.create({
	            username: 'ADMIN-NOCEBO',
	            password: this.hashPassword('dementedGrapefruit00')
	        }).then(function (res) { return res; });
	    };
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
	            user: body.username,
	            uid: body.uid
	        }, _local_credentials_1.SECRET);
	    };
	    LoginManager.prototype.signInUser = function (credentials, sessionId) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _this = this;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.validatePassword(credentials.password, credentials.username)
	                            .then(function (isValid) { return __awaiter(_this, void 0, void 0, function () {
	                            var user;
	                            return __generator(this, function (_a) {
	                                switch (_a.label) {
	                                    case 0:
	                                        if (!isValid) return [3 /*break*/, 2];
	                                        return [4 /*yield*/, this.User.findOne({ username: credentials.username })];
	                                    case 1:
	                                        user = _a.sent();
	                                        if (user) {
	                                            return [2 /*return*/, { ok: true, payload: { jwt: this.returnSessionToken({ sessionId: sessionId, username: user.username, uid: user._id }) } }];
	                                        }
	                                        else {
	                                            return [2 /*return*/, { ok: false, message: 'User not found.' }];
	                                        }
	                                        return [3 /*break*/, 3];
	                                    case 2: return [2 /*return*/, { ok: false, message: 'Credentials did not match.' }];
	                                    case 3: return [2 /*return*/];
	                                }
	                            });
	                        }); })];
	                    case 1: return [2 /*return*/, _a.sent()];
	                }
	            });
	        });
	    };
	    LoginManager.prototype.jwtVerify = function (jwt) {
	        return __awaiter(this, void 0, void 0, function () {
	            var jwtVerify;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        jwtVerify = new Promise(function (resolve, reject) {
	                            JSONWebToken.verify(jwt, _local_credentials_1.SECRET, function (error, decoded) {
	                                if (error) {
	                                    reject({ ok: false, message: 'JWT was invalid' + error });
	                                }
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SECRET = '1324trgjnfk.szfjaw3r9fbio2a3br23rw,eamf dsczpoh23RN.KNWedfscopjin23rWEAFSD0-9JIO2N3RWEFDS';
	exports.TWITTER = {
	    APIkey: 'ctDlQT5AXPKRCdVT1j8p8Y6fM',
	    secret: 'McEec0arxfxNiKzz6C2GfVahoIuJOXZM5ioMPOkAqWzbBDto3w'
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("bcryptjs");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ }),
/* 21 */
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
	var login_manager_1 = __webpack_require__(16);
	var store_manager_1 = __webpack_require__(7);
	var transcoding_service_1 = __webpack_require__(9);
	var loginM = new login_manager_1.LoginManager();
	var storeM = store_manager_1.storeManager();
	function sessionEndpoints(socket) {
	    var _this = this;
	    var endpointJWT = function (path, jwt, action, mainFunction) {
	        socket.on(path, function () { return __awaiter(_this, void 0, void 0, function () {
	            var sessionId, response;
	            return __generator(this, function (_a) {
	                sessionId = loginM.jwtVerify(jwt).sessionId;
	                if (sessionId) {
	                    response = mainFunction();
	                    if (response.ok) {
	                        socket.emit(path + "::CLIENT_" + sessionId, response);
	                    }
	                    else {
	                        socket.emit(path + "::CLIENT_" + sessionId, response);
	                    }
	                }
	                else {
	                    socket.emit(path + "::CLIENT_" + sessionId, {
	                        ok: false,
	                        message: "Error with " + path + ".",
	                    });
	                }
	                return [2 /*return*/];
	            });
	        }); });
	    };
	    socket.on('SESSION_AUTH', function (jwt, sessionId) { return __awaiter(_this, void 0, void 0, function () {
	        return __generator(this, function (_a) {
	            if (loginM.jwtVerify(jwt)) {
	                socket.emit("SESSION_AUTH::CLIENT_" + sessionId, { ok: true });
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
	    socket.on('REGISTER_NEW_SOUND', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
	        var jwtResponse, rSResponse;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt)];
	                case 1:
	                    jwtResponse = _a.sent();
	                    if (!jwtResponse.ok) return [3 /*break*/, 3];
	                    return [4 /*yield*/, storeM.registerNewSound(payload.formData, jwtResponse.payload.uid)];
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
	    socket.on('SESSION::UPDATE_SOUND_DETAIL', function (payload, callback) { return __awaiter(_this, void 0, void 0, function () {
	        var jwtResponse, rSResponse;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt)];
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
	    socket.on('SESSION::FILE_UPLOAD', function (payload, ack) { return __awaiter(_this, void 0, void 0, function () {
	        var jwtResponse, response;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, loginM.jwtVerify(payload.jwt)];
	                case 1:
	                    jwtResponse = _a.sent();
	                    if (!jwtResponse.ok) return [3 /*break*/, 3];
	                    return [4 /*yield*/, transcoding_service_1.saveSound(jwtResponse.payload.uid, payload.song_id, payload.data)
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
	}
	exports.sessionEndpoints = sessionEndpoints;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = require("socket.io");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map