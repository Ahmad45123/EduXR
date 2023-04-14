export class SceneObject {
  public objectName: string;
  public positon: [number, number, number];
  public rotation: [number, number, number];
  public scale: [number, number, number];
  public hasGravity: boolean;
  public isGrabbable: boolean;

  public constructor(name: string) {
    this.objectName = name;
    this.positon = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
    this.hasGravity = false;
    this.isGrabbable = false;
  }
}
