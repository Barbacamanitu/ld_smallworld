import * as THREE from "three";

export class World extends THREE.Mesh {
    radius:number;
    constructor(radius:number = 100){

        let texture = new THREE.TextureLoader().load( "textures/earth.png" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        let mat = new THREE.MeshStandardMaterial({map: texture});
       
        let geo = new THREE.SphereGeometry(radius,80,80);      
        super(geo,mat);

        this.radius = radius;
    }
}