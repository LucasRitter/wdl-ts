/// <reference path="../util/entity-id.d.ts" />
/// <reference path="../util/vector.d.ts" />

/** @noSelfInFile **/

declare function GetInvalidEntityId(): EntityId;

declare function GetLocalPlayerEntityId(): EntityId;

declare function GetEntityName(entityId: EntityId): string;

declare function GetEntityPosition(
    entityId: EntityId,
    component: VectorComponent
): number;
declare function GetEntityAngle(
    entityId: EntityId,
    component: VectorComponent
): number;

declare function IsEntityInVehicle(
    entity: EntityId,
    vehicle: EntityId
): boolean;

// Todo: Document
declare function SetSquadRelationship(
    id: AgentAffiliation,
    relationship: AgentRelationship,
    entity: EntityId
): void;

declare function SpawnEntityFromArchetype(
    archetype: string,
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number,
    rotZ: number
): EntityId;

/**
 * Gets the distance between two entities in 3D space.
 * @param a The first entity.
 * @param b The second entity.
 */
declare function GetDistance2D(a: EntityId, b: EntityId): number;

/**
 * Gets the distance between two entities in 3D space.
 * @param a The first entity.
 * @param b The second entity.
 */
declare function GetDistance3D(a: EntityId, b: EntityId): number;

/**
 * Checks if an entity is alive.
 * @param entity The entity to check.
 */
declare function IsAlive(entity: EntityId): boolean;

declare function EquipWolfskinItemOnEntity(
    maleItem: string,
    femaleItem: string,
    entity: EntityId,
    disableMask: number
): string;
declare function ResetWolfskinItemOnEntity(entity: EntityId): void;
