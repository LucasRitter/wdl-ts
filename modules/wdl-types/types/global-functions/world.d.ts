/** @noSelfInFile **/

declare function SetTimeScale(scale: number): void;
declare function GetTimeOfDayHour(): number;
declare function GetTimeOfDayMinute(): number;

declare function GetWeather(): string;

declare function GetReticleHitLocation(): [x: number, y: number, z: number];
declare function GetReticleHitEntity(): EntityId;
