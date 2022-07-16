/** @noSelfInFile **/

declare type PlayerId = number;

declare function GetLocalPlayerId(): PlayerId;
declare function GetPlayerIdFromPlayerIndex(index: number): PlayerId;
declare function GetPlayerTeam(playerId: PlayerId): number;

declare function PutPlayerInVehicle(player: PlayerId, vehicle: EntityId): void;
