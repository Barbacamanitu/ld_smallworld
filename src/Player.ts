
import { Game } from './Game';
import * as THREE from "three";

export class Player {
    //Readonly


    camera: THREE.PerspectiveCamera;
    game: Game;
    speed: number;
    mouseSensitivity: THREE.Vector2;
    
    coords: THREE.Vector2;

    mesh: THREE.Mesh;
    head: THREE.Mesh;
    boom: THREE.Object3D;
    body: Physijs.CapsuleMesh;

    constructor(game: Game){
              

        //Setup defaults
        this.mouseSensitivity = new THREE.Vector2(50,50);        
        this.game = game;
       
        this.speed = 20;
        this.coords = new THREE.Vector2();
        
        this.setupMeshes();
        this.setupCamera();


        /*his.position.setY(this.game.world.radius);
        this.add(this.mesh);
        this.add(this.boom);
        this.game.scene.add(this);       */
        

    }


    setupBody():void{
        this.body = new Physijs.CapsuleMesh(new THREE.CylinderGeometry(2,2,3),Physijs.createMaterial(new THREE.MeshBasicMaterial(),1,1));
        this.body.position = new THREE.Vector3(0,this.game.world.radius + 50,0);
        this.body.__dirtyPosition= true;
    }
    setupMeshes():void {
        var playerMat = new THREE.MeshLambertMaterial({color: "#FFA1AC"});
        //Geometries
        var playerGeo = new THREE.CubeGeometry(.2,3,.2);
       
        var headGeo = new THREE.SphereGeometry(.5);
     
        

        //Meshes
        this.mesh = new THREE.Mesh(playerGeo,playerMat);
        this.head = new THREE.Mesh(headGeo,playerMat);
        this.mesh.position.setY(1.5);
        this.head.position.setY(2);
        this.mesh.add(this.head);
    }

    setupCamera():void {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.rotation.order = "YXZ";
        this.boom = new THREE.Object3D();
        this.boom.add(this.camera);

        //Set positions
        this.boom.position.setY(1.5);
        this.camera.position.setZ(15);
        this.camera.position.setY(4);
    }

    update(delta: number) : void {     
       
        var speed = delta * 10 * THREE.Math.DEG2RAD;
        if (this.game.input.isDown("w")){
            
        }

        if (this.game.input.isDown("a")){
         }

        if (this.game.input.isDown("d")){
        }

        let yRot = this.mesh.rotation.y;
        //Sync mesh to body
        
        this.body.lookAt(new THREE.Vector3());
        this.body.__dirtyRotation= true;
        this.mesh.position = this.body.position;



        let mouseMovement = this.mouseSensitivity.clone().multiply(this.game.input.getMouseDelta()).multiplyScalar(delta * THREE.Math.DEG2RAD);
        if (Math.abs(mouseMovement.x) > 0){
           // this.mesh.rotateY(-mouseMovement.x);
            //this.boom.rotation.y = this.mesh.rotation.y;
        }

        if (Math.abs(mouseMovement.y) > 0){
            this.boom.rotateX(-mouseMovement.y);
        }

      
      

    }


  


}