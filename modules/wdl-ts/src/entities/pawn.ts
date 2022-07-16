import { Entity } from './entity';
import { Vehicle } from './vehicle';

export class Pawn extends Entity {
    private _vehicle: Vehicle | undefined;

    protected constructor(id: EntityId) {
        super(id);
    }

    static fromId(id: EntityId) {
        return new Pawn(id);
    }

    public get vehicle(): Vehicle | undefined {
        if (!this.isValid) {
            return undefined;
        }

        const currentVehicle = GetCurrentVehicleEntityId(this.id);

        if (currentVehicle !== Entity.InvalidId) {
            if (!this._vehicle || this._vehicle.id !== currentVehicle) {
                this._vehicle = Vehicle.fromId(
                    GetCurrentVehicleEntityId(this.id)
                );
            }
        } else {
            this._vehicle = undefined;
        }

        return this._vehicle;
    }

    public isInVehicle(vehicle: EntityId | Vehicle) {
        if (vehicle instanceof Vehicle) {
            vehicle = vehicle.id;
        }

        return IsEntityInVehicle(this.id, vehicle);
    }
}
