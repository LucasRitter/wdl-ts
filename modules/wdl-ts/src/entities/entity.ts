import { Vector3 } from '../math/vector3';
import { Vehicle } from './vehicle';
import { Pawn } from './pawn';
export abstract class Entity {
    public readonly id: EntityId;

    private _components: string[];

    public get name(): string {
        if (!this.isValid) {
            throw new Error('Entity is invalid.');
        }

        return GetEntityName(this.id);
    }

    public get className() {
        return ScriptHook.GetEntityClassName(this.id);
    }

    public get components(): string[] {
        if (!this.isValid) {
            throw new Error('Entity is invalid.');
        }

        if (!this._components) {
            this._components = ScriptHook.GetEntityComponents(this.id);
        }

        return this._components;
    }

    public get position(): Vector3 {
        if (!this.isValid) {
            throw new Error('Entity is invalid.');
        }

        const x = GetEntityPosition(this.id, VectorComponent.X);
        const y = GetEntityPosition(this.id, VectorComponent.Y);
        const z = GetEntityPosition(this.id, VectorComponent.Z);

        return new Vector3(x, y, z);
    }

    public get angle(): Vector3 {
        if (!this.isValid) {
            throw new Error('Entity is invalid.');
        }

        const x = GetEntityAngle(this.id, VectorComponent.X);
        const y = GetEntityAngle(this.id, VectorComponent.Y);
        const z = GetEntityAngle(this.id, VectorComponent.Z);

        return new Vector3(x, y, z);
    }

    public get alive() {
        if (!this.isValid) {
            throw new Error('Entity is invalid.');
        }

        return IsAlive(this.id);
    }

    get isValid() {
        return this.id !== Entity.InvalidId;
    }

    protected constructor(id: EntityId) {
        this.id = id;
    }

    public static get InvalidId(): EntityId {
        return GetInvalidEntityId();
    }

    public static get NonExistentId(): EntityId {
        // pow(2, 63) - 1
        return '9223372036854775807';
    }

    public setSquadRelationship(
        affiliation: AgentAffiliation,
        relationship: AgentRelationship
    ) {
        SetSquadRelationship(affiliation, relationship, this.id);
    }

    public distanceTo2D(entity: Entity): number {
        if (!this.isValid || !entity.isValid) {
            throw new Error('Entity is invalid.');
        }

        return GetDistance2D(this.id, entity.id);
    }

    public distanceTo3D(entity: Entity): number {
        if (!this.isValid || !entity.isValid) {
            throw new Error('Entity is invalid.');
        }

        return GetDistance3D(this.id, entity.id);
    }
}
