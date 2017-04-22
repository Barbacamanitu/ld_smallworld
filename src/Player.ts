import { Game } from './Game';
import * as THREE from "three";

export class Player extends THREE.Object3D {
    camera: THREE.PerspectiveCamera;
    game: Game;
    speed: number;
    mouseSensitivity: THREE.Vector2;
    mesh: THREE.Mesh;
    boom: THREE.Object3D;
    constructor(game: Game){
        super();

        this.mouseSensitivity = new THREE.Vector2(50,50);

        
        this.game = game;
        this.game.scene.add(this);
        this.speed = 100;


        var playerGeo = new THREE.CubeGeometry(2,10,2);
        var playerMat = new THREE.MeshLambertMaterial({color: "#ff00cc"});

        var headg = new THREE.CubeGeometry(3,3,3);
        var headm = new THREE.MeshLambertMaterial({color: "#cc00ff"});

        this.mesh = new THREE.Mesh(playerGeo,playerMat);
        var head = new THREE.Mesh(headg,headm);
        
        this.mesh.position.setY(5);
        this.mesh.add(head);
        head.position.setY(10);

        //Sets position of feet
        this.position.setY(this.game.world.radius);

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.rotation.order = "YXZ";

        this.boom = new THREE.Object3D();
        this.boom.position.setY(10);

        this.camera.position.setZ(50);
        this.camera.position.setY(10);
        this.boom.add(this.camera);
        this.add(this.mesh);
        this.add(this.boom);

    }

    update(delta: number) : void {
        if (this.game.input.isDown("w")){
            this.walk(1,delta);           
        }

        let mouseMovement = this.mouseSensitivity.clone().multiply(this.game.input.getMouseDelta()).multiplyScalar(delta * THREE.Math.DEG2RAD);
        if (Math.abs(mouseMovement.x) > 0){
            this.rotateY(-mouseMovement.x);
        }

        if (Math.abs(mouseMovement.y) > 0){
            this.boom.rotateX(-mouseMovement.y);
        }

    }

    walk(forward : number , delta:number){
        var matrix = new THREE.Matrix4();
        matrix.extractRotation( this.matrix );
        var direction = new THREE.Vector3(forward,0,0);
        matrix.multiplyVector3( direction );
       // this.position.add(direction.multiplyScalar(this.speed * delta));
       this.game.world.rotateOnAxis(direction,THREE.Math.DEG2RAD * 10 * delta);
    }

    render() : void {
        this.game.renderer.render(this.game.scene, this.camera);
    }
}