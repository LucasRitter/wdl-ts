/** @noSelfInFile **/
// Todo: Write comments for validated functions

declare function DisableVehicleForPlayers(vehicle: EntityId): void;
declare function ExplodeVehicle(vehicle: EntityId): void;
declare function ForceVehicleAlaram(vehicle: EntityId, enabled: boolean): void;
declare function ForceVehicleStop(vehicle: EntityId, stop: boolean): void;

declare function GetIsVehicleParked(vehicle: EntityId): boolean;

declare function GetVehicleHealthPercentage(vehicle: EntityId): number;
declare function GetVehicleIsDriveable(vehicle: EntityId): boolean;

declare function GetVehicleReliabilityFactor(vehicle: EntityId): boolean;
declare function GetVehicleSpeed(vehicle: EntityId): number;
declare function GetVehicleSpeedStatTime(vehicle: EntityId): number;
declare function GetVehicleValue(vehicle: EntityId): number;
declare function GetVehicleValuePercentage(vehicle: EntityId): number;

declare function IsVehicleEmpty(vehicle: EntityId): boolean;

// SetVehicleAlarmHackable
// SetVehicleChaseCheats
// SetVehicleLockState
// SetVehicleTintedWindows

declare function SetVehicleAlarmHackable(
    vehicle: EntityId,
    hackable: boolean
): void;
declare function SetVehicleChaseCheats(
    vehicle: EntityId,
    chaseCheats: boolean
): void;
declare function SetVehicleLockState(
    vehicle: EntityId,
    lockState: number
): void;
declare function SetVehicleTintedWindows(
    vehicle: EntityId,
    tintedWindows: boolean
): void;

declare function ShutdownVehicleEngine(vehicle: EntityId): void;

// Todo: Move to player.d.ts
/**
 *
 * @param entity
 * @constructor
 */
declare function GetCurrentVehicleEntityId(entity: EntityId): EntityId | null;
