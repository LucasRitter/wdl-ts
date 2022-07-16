import { Entity } from './entities/entity';
import { Vehicle } from './entities/vehicle';
import { Pawn } from './entities/pawn';

export abstract class World {
    private static _lastLookedAtEntity: Entity | undefined;

    public static get timeOfDay(): { hour: number; minute: number } {
        return {
            hour: GetTimeOfDayHour(),
            minute: GetTimeOfDayMinute(),
        };
    }

    public static set timeScale(value: number) {
        SetTimeScale(value);
    }

    public static getEntityFromId(id: EntityId) {
        if (id === Entity.InvalidId || id === Entity.NonExistentId) {
            return undefined;
        }

        if (id === World._lastLookedAtEntity?.id) {
            return World._lastLookedAtEntity;
        }

        const name = GetEntityName(id).toLowerCase();

        if (name.startsWith('vehicle') || name.startsWith('aidrone')) {
            return Vehicle.fromId(id);
        }

        return Pawn.fromId(id);
    }
}
