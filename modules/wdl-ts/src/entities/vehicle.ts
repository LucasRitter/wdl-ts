import { Entity } from './entity';

export class Vehicle extends Entity {
    private constructor(id: EntityId) {
        super(id);
    }

    static fromId(id: EntityId) {
        return new Vehicle(id);
    }

    public explode() {
        ExplodeVehicle(this.id);
    }

    public set licensePlate(text: string) {
        ScriptHook.SetVehicleLicensePlateText(this.id, text);
    }
}
