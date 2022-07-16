export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static get zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    public toString(): string {
        return `Vector3 { x: ${this.x}, y: ${this.y}, z: ${this.z} }`;
    }
}
