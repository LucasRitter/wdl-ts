import { Vehicle } from './entities/vehicle';
import { Pawn } from './entities/pawn';

// Todo: Extract player class from pawn class. (like GTA Player -> Ped)

export class Player {
    readonly id: PlayerId;

    private _pawn: Pawn | undefined;
    private _localPlayer: boolean = true;

    public get vehicle() {
        return this.pawn.vehicle;
    }

    protected constructor(id: PlayerId) {
        this.id = id;
    }

    static fromId(id: PlayerId) {
        return new Player(id);
    }

    static fromIndex(index: number) {
        return new Player(GetPlayerIdFromPlayerIndex(index));
    }

    static localPlayer() {
        const player = new Player(GetLocalPlayerId());
        player._localPlayer = true;

        return player;
    }

    get team() {
        return GetPlayerTeam(this.id);
    }

    get pawn() {
        if (!this._localPlayer) {
            throw new Error('Cannot get pawn of non-local player yet.');
        }

        const entityId = GetLocalPlayerEntityId();
        if (!this._pawn || this._pawn.id !== entityId) {
            this._pawn = Pawn.fromId(entityId);
        }

        return this._pawn;
    }
}
