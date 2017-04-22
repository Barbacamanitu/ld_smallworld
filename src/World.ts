import * as THREE from "three";

export class World extends THREE.Mesh {
    radius:number;
    constructor(radius?:number){
        super();
        let texture = new THREE.TextureLoader().load( "textures/earth.png" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        let mat = new THREE.MeshStandardMaterial({map: texture});
        if (radius){
            this.radius = radius;
        }
        let geo = new THREE.SphereGeometry(this.radius,20,20);      
        this.material = mat;
        this.geometry = geo;
    }
}