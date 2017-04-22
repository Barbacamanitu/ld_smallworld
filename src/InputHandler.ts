import { Game } from './Game';
import * as THREE from "three";

export class InputHandler {
    pressedKeys: any;
    mousePos: THREE.Vector2;
    game: Game;
    mouseLocked: Boolean;
    private mouseDelta: THREE.Vector2;

    constructor(game: Game){
        this.mouseDelta = new THREE.Vector2();
        this.mousePos = new THREE.Vector2();
        this.pressedKeys = {};
        this.game = game;
        this.mouseLocked = false;
        this.lockPointer();
        this.setupEventHandlers();
    }

    setupEventHandlers():void{
        window.onkeydown= (e:KeyboardEvent) => {
             if (e && e.code){
                this.pressedKeys[e.code] = true;
             }
        }

        window.onkeyup= (e:KeyboardEvent) => {
             if (e && e.code && this.pressedKeys[e.code]){
                delete this.pressedKeys[e.code];
             }
        }

        window.onmousemove = (e:MouseEvent) => {
            if (this.mouseLocked){
                this.mouseDelta = new THREE.Vector2(e.movementX,e.movementY);
            }
        }

    }

    lockPointer():void{
        var havePointerLock = 'pointerLockElement' in document ||
        'mozPointerLockElement' in document ||
        'webkitPointerLockElement' in document;
        let element:any = this.game.renderer.domElement;

        element.requestPointerLock = element.requestPointerLock ||
        element.mozRequestPointerLock ||
        element.webkitRequestPointerLock;

        element.exitPointerLock = document.exitPointerLock ||
        element.mozExitPointerLock ||
         element.webkitExitPointerLock;
        
        if (element.requestPointerLock){

            element.addEventListener("click", function() {
              this.requestPointerLock();
            }, false);

         

            //element.exitPointerLock();
            document.addEventListener('pointerlockchange', this.changeCallback.bind(this), false);
            document.addEventListener('mozpointerlockchange', this.changeCallback.bind(this), false);
            document.addEventListener('webkitpointerlockchange', this.changeCallback.bind(this), false);
        }
       
    }

    changeCallback(e: Event):void{
        var canvas:any = this.game.renderer.domElement;
        var doc:Document|any = document;
        if (doc.pointerLockElement === canvas ||
        doc.mozPointerLockElement === canvas ||
        doc.webkitPointerLockElement === canvas){
            this.mouseLocked = true;
           
        } else {
            this.mouseLocked = false;        
        }
    }

    isDown(key: string):Boolean{
        key = "Key" + key.toUpperCase();
        return (this.pressedKeys[key] === true);
    }

    getMouseDelta(): THREE.Vector2 {
        var delta = this.mouseDelta.clone();
        this.mouseDelta.set(0,0);
        return delta;
    }
}