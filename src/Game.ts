import * as THREE from 'three'
import { InputHandler } from './InputHandler';
import { Player } from './Player';
import { World } from './World';




export class Game{
    world: World;
    scene: Physijs.Scene;
    renderer: THREE.WebGLRenderer;
    input: InputHandler;
    player: Player;
    time: number;
    constructor() {
        this.world = new World(200);
        this.scene = new Physijs.Scene();
        this.renderer = new THREE.WebGLRenderer();   
        this.player = new Player(this);
        this.input = new InputHandler(this);

        this.scene.add(this.world);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        this.renderer.domElement.setAttribute("id","the_canvas");
        //var light = new THREE.PointLight("#FFFFFF",2.0);
        //light.position.setZ(250);
        var amb = new THREE.AmbientLight("#FFFFFF",1.0);
        //this.scene.add(light);
        this.scene.add(amb);

        this.time = new Date().getTime();

        //Begin renderering
        requestAnimationFrame(this.animate.bind(this));

    }

    animate() : void {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene,this.player.camera);
        //Calculate delta time
        let newTime = new Date().getTime();
        var delta = newTime - this.time;
        this.time = newTime;


        this.update(delta * .001);
    }

    update(delta: number): void{
        let speed = 6.2;
        this.player.update(delta);
        this.scene.simulate();
    }
}