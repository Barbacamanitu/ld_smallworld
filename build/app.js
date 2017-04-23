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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var InputHandler_1 = __webpack_require__(2);
var Player_1 = __webpack_require__(3);
var World_1 = __webpack_require__(4);
var Game = (function () {
    function Game() {
        this.world = new World_1.World(200);
        this.scene = new Physijs.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.player = new Player_1.Player(this);
        this.input = new InputHandler_1.InputHandler(this);
        this.scene.add(this.world);
        this.scene.add(this.player);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.setAttribute("id", "the_canvas");
        var light = new THREE.PointLight("#FFFFFF", 2.0);
        light.position.setZ(250);
        var amb = new THREE.AmbientLight("#FFFFFF", 1.0);
        this.scene.add(light);
        this.scene.add(amb);
        this.time = new Date().getTime();
        //Begin renderering
        requestAnimationFrame(this.animate.bind(this));
    }
    Game.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.player.render();
        //Calculate delta time
        var newTime = new Date().getTime();
        var delta = newTime - this.time;
        this.time = newTime;
        this.update(delta * .001);
    };
    Game.prototype.update = function (delta) {
        var speed = 6.2;
        this.player.update(delta);
    };
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var InputHandler = (function () {
    function InputHandler(game) {
        this.mouseDelta = new THREE.Vector2();
        this.mousePos = new THREE.Vector2();
        this.pressedKeys = {};
        this.game = game;
        this.mouseLocked = false;
        this.lockPointer();
        this.setupEventHandlers();
    }
    InputHandler.prototype.setupEventHandlers = function () {
        var _this = this;
        window.onkeydown = function (e) {
            if (e && e.code) {
                _this.pressedKeys[e.code] = true;
            }
        };
        window.onkeyup = function (e) {
            if (e && e.code && _this.pressedKeys[e.code]) {
                delete _this.pressedKeys[e.code];
            }
        };
        window.onmousemove = function (e) {
            if (_this.mouseLocked) {
                _this.mouseDelta = new THREE.Vector2(e.movementX, e.movementY);
            }
        };
    };
    InputHandler.prototype.lockPointer = function () {
        var havePointerLock = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;
        var element = this.game.renderer.domElement;
        element.requestPointerLock = element.requestPointerLock ||
            element.mozRequestPointerLock ||
            element.webkitRequestPointerLock;
        element.exitPointerLock = document.exitPointerLock ||
            element.mozExitPointerLock ||
            element.webkitExitPointerLock;
        if (element.requestPointerLock) {
            element.addEventListener("click", function () {
                this.requestPointerLock();
            }, false);
            //element.exitPointerLock();
            document.addEventListener('pointerlockchange', this.changeCallback.bind(this), false);
            document.addEventListener('mozpointerlockchange', this.changeCallback.bind(this), false);
            document.addEventListener('webkitpointerlockchange', this.changeCallback.bind(this), false);
        }
    };
    InputHandler.prototype.changeCallback = function (e) {
        var canvas = this.game.renderer.domElement;
        var doc = document;
        if (doc.pointerLockElement === canvas ||
            doc.mozPointerLockElement === canvas ||
            doc.webkitPointerLockElement === canvas) {
            this.mouseLocked = true;
        }
        else {
            this.mouseLocked = false;
        }
    };
    InputHandler.prototype.isDown = function (key) {
        key = "Key" + key.toUpperCase();
        return (this.pressedKeys[key] === true);
    };
    InputHandler.prototype.getMouseDelta = function () {
        var delta = this.mouseDelta.clone();
        this.mouseDelta.set(0, 0);
        return delta;
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        var _this = _super.call(this) || this;
        _this.mouseSensitivity = new THREE.Vector2(50, 50);
        _this.game = game;
        _this.game.scene.add(_this);
        _this.speed = 100;
        var playerGeo = new THREE.CubeGeometry(2, 10, 2);
        var playerMat = new THREE.MeshLambertMaterial({ color: "#ff00cc" });
        var headg = new THREE.CubeGeometry(3, 3, 3);
        var headm = new THREE.MeshLambertMaterial({ color: "#cc00ff" });
        _this.mesh = new THREE.Mesh(playerGeo, playerMat);
        var head = new THREE.Mesh(headg, headm);
        _this.mesh.position.setY(5);
        _this.mesh.add(head);
        head.position.setY(10);
        //Sets position of feet
        _this.position.setY(_this.game.world.radius);
        _this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        _this.camera.rotation.order = "YXZ";
        _this.boom = new THREE.Object3D();
        _this.boom.position.setY(10);
        _this.camera.position.setZ(50);
        _this.camera.position.setY(10);
        _this.boom.add(_this.camera);
        _this.add(_this.mesh);
        _this.add(_this.boom);
        return _this;
    }
    Player.prototype.update = function (delta) {
        if (this.game.input.isDown("w")) {
            this.walk(1, delta);
        }
        var mouseMovement = this.mouseSensitivity.clone().multiply(this.game.input.getMouseDelta()).multiplyScalar(delta * THREE.Math.DEG2RAD);
        if (Math.abs(mouseMovement.x) > 0) {
            this.rotateY(-mouseMovement.x);
        }
        if (Math.abs(mouseMovement.y) > 0) {
            this.boom.rotateX(-mouseMovement.y);
        }
    };
    Player.prototype.walk = function (forward, delta) {
        var matrix = new THREE.Matrix4();
        matrix.extractRotation(this.matrix);
        var direction = new THREE.Vector3(forward, 0, 0);
        matrix.multiplyVector3(direction);
        // this.position.add(direction.multiplyScalar(this.speed * delta));
        // this.game.world.rotateOnAxis(direction,THREE.Math.DEG2RAD * 10 * delta);
    };
    Player.prototype.render = function () {
        this.game.renderer.render(this.game.scene, this.camera);
    };
    return Player;
}(THREE.Object3D));
exports.Player = Player;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(0);
var World = (function (_super) {
    __extends(World, _super);
    function World(radius) {
        var _this = _super.call(this) || this;
        var texture = new THREE.TextureLoader().load("textures/earth.png");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        var mat = new THREE.MeshStandardMaterial({ map: texture });
        if (radius) {
            _this.radius = radius;
        }
        var geo = new THREE.SphereGeometry(_this.radius, 20, 20);
        _this.material = mat;
        _this.geometry = geo;
        return _this;
    }
    return World;
}(THREE.Mesh));
exports.World = World;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(1);
var game = new Game_1.Game();


/***/ })
/******/ ]);