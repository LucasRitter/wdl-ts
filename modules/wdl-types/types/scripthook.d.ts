/** @noSelfInFile **/

/**
 * Functions specific to the script hook.
 */
declare namespace ScriptHook {
    // region Key Binds & Commands

    /**
     * Describes the type of command argument.
     */
    const enum CommandArgumentType {
        Any = 0,
        String = 0,
        Int32 = 1,
        UInt32 = 2,
        Int64 = 3,
        UInt64 = 4,
        Float = 5,
    }

    /**
     * The command registry where arguments can be added to a console command.
     * @see ScriptHook.RegisterCommand to get an instance of this type.
     */
    interface ICommandRegistry {
        AddArgument(
            name: string,
            required?: boolean,
            type?: CommandArgumentType
        ): void;
    }

    /**
     * Registers a function to a specific key.
     * The key has to be registered inside `manifest.json` first.
     * @param id The key bind name. Must be registered inside `manifest.json`.
     * @param handler The function to be called.
     * @returns A human-readable key name. e.g. `F5`.
     */
    function RegisterKeyHandler(id: string, handler: () => void): string;

    /**
     * Registers a function to a specific command.
     * @param name The command name.
     * @param handler The function to be called.
     * @returns A command registry where arguments can be added.
     */
    function RegisterCommand(
        name: string,
        handler: () => void
    ): ICommandRegistry;

    // endregion

    // region UI

    /**
     * Shows a notification on screen.
     * @param icon The icon to use.
     * @param header The header of the notification.
     * @param body The body of the notification.
     */
    function ShowNotification(
        icon: NotificationIcon,
        header: string,
        body: string
    ): void;

    function IsHudElementVisible(): void;
    function SetHudElementVisible(): void;

    // endregion

    // region Game Functions
    // region Player

    /**
     * Teleports the local player to a specific location.
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param z The z coordinate.
     */
    function Teleport(x: number, y: number, z: number): void;

    /**
     * Enables or disables noclip-mode for the local player.
     * @param enabled Whether to enable or disable noclip-mode.
     * @see https://en.wikipedia.org/wiki/Noclip_mode
     */
    function SetLocalPlayerNoclip(enabled: boolean): void;

    /**
     * Checks if noclip-mode is enabled for the local player.
     */
    function HasLocalPlayerNoclip(): boolean;

    /**
     * Sets the speed of the local player when noclip-mode is enabled.
     * @param normal The speed when in normal mode.
     * @param shift The speed when `shift` is held down.
     */
    function SetNoclipSpeeds(normal: number, shift: number): void;

    // endregion

    //region Entity

    /**
     * Gets all entities in the world.
     * @deprecated Currently broken. (as of >= r233)
     */
    function GetAllEntities(): EntityId[];

    /**
     * Gets all entities within a given range of a given location.
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param z The z coordinate.
     * @param range The range to search within.
     * @deprecated Currently broken. (as of >= r233)
     */
    function GetEntitiesInRange(
        x: number,
        y: number,
        z: number,
        range: number
    ): EntityId[];

    /**
     * Gets all entities with or without given components.
     * @param inclusive Whether to include or exclude entities with the given components.
     * @param components The components to search for.
     * @deprecated Currently broken. (as of >= r233)
     */
    function GetEntitiesWithComponent(
        inclusive: boolean,
        ...components: string[]
    ): EntityId[];

    /**
     * Gets the components of a given entity.
     * @param entity The entity to get the components of.
     * @constructor
     */
    function GetEntityComponents(entity: EntityId): EntityComponent[];

    /**
     * Check if an entity has a given component.
     * @param entity The entity to check.
     * @param component The component to check for.
     */
    function EntityHasComponent(
        entity: EntityId,
        component: EntityComponent
    ): boolean;

    /**
     * Gets the class name of an entity.
     * @param entity The entity to get the class name of.
     */
    function GetEntityClassName(entity: EntityId): EntityClassName | string;

    /**
     * Sets an entity as static or not.
     * @param entity The entity to set.
     * @param isStatic Whether to set the entity as static or not.
     */
    function SetEntityIsStatic(entity: EntityId, isStatic: boolean): void;

    /**
     * Sets an entity as persistent or not.
     * Persistent entities will not be deleted when they are out of range.
     * @param entity The entity to set.
     * @param isPersistent Whether to set the entity as persistent or not.
     * @constructor
     */
    function SetEntityIsPersistent(
        entity: EntityId,
        isPersistent: boolean
    ): void;

    // Todo
    function SetEntityPoolClearOnUnused(
        entity: EntityId,
        clearOnUnused: boolean
    ): void;

    // Todo
    function SetEntityIsPoolable(entity: EntityId, poolable: boolean): void;

    // Todo
    function SetEntityPhysicsEnabled(entity: EntityId, enabled: boolean): void;

    // Todo
    function SetEntityIsVisible(entity: EntityId, visible: boolean): void;

    /**
     * Gets an entities bounding volume in absolute coordinates.
     * @see https://en.wikipedia.org/wiki/Bounding_volume
     * @param entity The entity to get the bounding volume of.
     */
    function GetEntityAABB(
        entity: EntityId
    ): LuaMultiReturn<
        [aX: number, aY: number, aZ: number, bX: number, bY: number, bZ: number]
    >;

    /**
     * Gets an entities bounding volume relative to its parent.
     * @see https://en.wikipedia.org/wiki/Bounding_volume
     * @param entity The entity to get the bounding volume of.
     */
    function GetEntityLocalAABB(
        entity: EntityId
    ): LuaMultiReturn<
        [aX: number, aY: number, aZ: number, bX: number, bY: number, bZ: number]
    >;

    // Todo
    function HasEntityUserLocalBBox(entity: EntityId): void;

    // Todo
    function RemoveEntity(entity: EntityId): void;

    /**
     * Checks if an entity is loaded.
     * @param entity The entity to check.
     */
    function IsEntityLoaded(entity: EntityId): boolean;

    /**
     * Checks if an entity is initialized.
     * @param entity The entity to check.
     */
    function IsEntityInitialized(entity: EntityId): boolean;

    /**
     * Checks if an entity is added to the world.
     * @param entity The entity to check.
     */
    function IsEntityAddedToWorld(entity: EntityId): boolean;

    /**
     * Checks if an entity is moving.
     * Seems to always return false currently.
     * @param entity The entity to check.
     */
    function IsEntityMoving(entity: EntityId): boolean;

    /**
     * Checks if an entity is shutting down.
     * @param entity The entity to check.
     */
    function IsEntityShuttingDown(entity: EntityId): boolean;

    /**
     * Checks if an entity is sleeping.
     * @param entity The entity to check.
     */
    function IsEntitySleeping(entity: EntityId): boolean;

    /**
     * Puts an entity to sleep or wakes it up.
     * @param entity The entity to check.
     * @param sleep Whether to put the entity to sleep or wake it up.
     *
     */
    function SetEntitySleep(entity: EntityId, sleep: boolean): void;

    /**
     * Sets the visibility of an entity.
     * @param entity The entity to check.
     * @param visible Whether to set the entity visible or not.
     * @param category The visibility category.
     */
    function SetEntityIsVisible(
        entity: EntityId,
        visible: boolean,
        category: VisibilityCategory
    ): void;

    /**
     * Checks if an entity is visible.
     * @param entity The entity to check.
     * @param category The visibility category.
     */
    function IsEntityVisible(
        entity: EntityId,
        category: VisibilityCategory
    ): boolean;

    /**
     * Returns the category of an entity.
     * Undocumented!
     * @param entity
     */
    function GetEntityCategory(entity: EntityId): number;

    // endregion

    // region Vehicle

    /**
     * Sets the vehicle's license plate text.
     * @param vehicle The vehicle to set the license plate text of.
     * @param text The text to set.
     */
    function SetVehicleLicensePlateText(vehicle: EntityId, text: string): void;

    /**
     * Repairs a given vehicle.
     * @param vehicle The vehicle to repair.
     */
    function RepairVehicle(vehicle: EntityId): void;

    // endregion

    // region Game

    /**
     * Enables or disables traffic.
     * @param enabled Whether to enable or disable traffic.
     * @constructor
     */
    function SetWorldSpawnerEnabled(enabled: boolean): void;

    /**
     * Checks if traffic is enabled.
     */
    function IsWorldSpawnerEnabled(): boolean;

    /**
     * Enables or disables (fake) distant traffic.
     * @param enabled Whether to enable or disable distant traffic.
     */
    function SetWorldImpostorEnabled(enabled: boolean): void;

    /**
     * Checks if distant traffic is enabled.
     */
    function IsWorldImpostorEnabled(): boolean;

    // endregion

    // region Camera

    /**
     * Enables or disables free-camera.
     * @param enabled Whether to enable or disable free-camera.
     * @constructor
     */
    function SetLocalPlayerFreeCamera(enabled: boolean): void;

    /**
     * Checks whether free-camera is enabled.
     */
    function HasLocalPlayerFreeCamera(): boolean;

    /**
     * Sets the speed of the free-camera.
     * @param normal The speed when in normal mode.
     * @param shift The speed when `shift` is held down.
     */
    function SetFreeCameraSpeeds(normal: number, shift: number): void;

    /**
     * Gets the coordinates of where the camera is looking.
     */
    function GetCameraLookAt(): LuaMultiReturn<
        [x: number, y: number, z: number]
    >;

    /**
     * Gets the position of the camera.
     */
    function GetCameraPosition(): LuaMultiReturn<
        [x: number, y: number, z: number]
    >;

    /**
     * Gets the rotation of the camera.
     */
    function GetCameraRotation(): LuaMultiReturn<
        [x: number, y: number, z: number]
    >;

    /**
     * Sets the coordinates and rotation of the custom camera.
     * @param xPos The x component of the position.
     * @param yPos The y component of the position.
     * @param zPos The z component of the position.
     * @param xRot The x component of the rotation.
     * @param yRot The y component of the rotation.
     * @param zRot The z component of the rotation.
     */
    function SetCustomCamera(
        xPos: number,
        yPos: number,
        zPos: number,
        xRot: number,
        yRot: number,
        zRot: number
    ): void;

    /**
     * Resets the custom camera and returns to gameplay camera.
     */
    function ResetCamera(): void;

    // endregion

    // region Felony

    /**
     * Enables or disables the felony system.
     * @param enabled Whether to enable or disable the felony system.
     */
    function SetFelonySystemEnabled(enabled: boolean): void;

    /**
     * Checks if the felony system is enabled.
     */
    function IsFelonySystemEnabled(): boolean;

    /**
     * Starts a felony search.
     */
    function StartFelonySearch(entity: EntityId, felony: FelonyTypes): void;

    function SetFelonyHeatLevel(level: number): void;
    function ClearFelonyHeatLevel(): void;

    // endregion

    // region Environment

    function GetTimeShiftTargetTime(): void;
    function StartTimeShiftTransition(): void;
    function SetVehicleMaterialOverride(): void;

    function PlayBroadcast(type: BroadcastType, name: string): void;
    function ResetBroadcastToDefault(): void;

    // endregion

    // region Map Editor

    /**
     * Loads a map file from its path.
     */
    function LoadMap(path: string): void;

    /**
     * Gets a map entity by its id.
     * @param id The id of the entity.
     */
    function GetMapEntityById(id: number): EntityId;

    /**
     * Gets a map entity by its name.
     * @param name The name of the entity.
     */
    function GetMapEntityByName(name: string): void;

    /**
     * Gets a list of map entities matching a given name.
     * @param name The name of the entities.
     */
    function GetMapEntitiesByName(name: string): EntityId[];

    /**
     * Enables or disables the map editor.
     * @param enabled Whether to enable or disable the map editor.
     */
    function SetMapEditorEnabled(enabled: boolean): void;

    /**
     * Checks if the map editor is enabled.
     */
    function IsMapEditorEnabled(): boolean;

    /**
     * Gets a list of paths for all available maps in the map editor.
     */
    function GetAvailableMaps(): string[];

    /**
     * Resets the Map.
     */
    function ResetMap(): void;

    // endregion

    // region London Eye

    /**
     * Gets the London Eye's rotation speed.
     */
    function GetLondonEyeRotationSpeed(): number;

    /**
     * Sets the London Eye's rotation speed.
     * @param speed The rotation speed.
     */
    function SetLondonEyeRotationSpeed(speed: number): void;

    // endregion

    // region Character Editor

    // endregion

    function SetLocalPlayerIdentityField(): void;
    function GetLocalPlayerIdentityField(): void;
    function PrintPlayerPosition(): void;
    function LoadSavedCharacterCreation(): void;
    function SetLocalPlayerCharacterCreatorEnabled(): void;
    function GetLocalPlayerPrismActorField(): void;
    function IsLocalPlayerPlayingADialog(): void;
    function PlayLocalPlayerDialogLine(): void;
    function SetLocalPlayerCharacterCreation(): void;
    function SetLocalPlayerPrismActorField(): void;
    function IsLocalPlayerCharacterCreatorEnabled(): void;
    function GetAllLocalPlayerPrismActorField(): void;
    function GetSavedCharacterCreationsList(): void;
    function StopLocalPlayerAllDialogs(): void;
    function GetLocalPlayerDialogVoiceActor(): void;
    function SetLocalPlayerDialogVoiceActor(): void;
}
