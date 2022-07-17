import { Player } from './player';
import { Vector3 } from './math/vector3';
import { Entity } from './entities/entity';
import { World } from './world';
import CommandArgumentType = ScriptHook.CommandArgumentType;

type LoadFunction = () => void;
type UnloadFunction = () => void;
type RenderFunction = () => void;
type RenderImGuiFunction = () => imgui.InputType;
type WorldReadyFunction = () => void;
type UpdateFunction = (time: number, delta: number) => void;
type InputKeyFunction = (key: number, name: string, isDown: boolean) => void;

const _loadFunctions: Set<LoadFunction> = new Set();
const _unloadFunctions: Set<UnloadFunction> = new Set();
const _renderFunctions: Set<RenderFunction> = new Set();
const _renderImGuiFunctions: Set<RenderImGuiFunction> = new Set();
const _worldReadyFunctions: Set<WorldReadyFunction> = new Set();
const _updateFunctions: Set<UpdateFunction> = new Set();
const _inputKeyFunctions: Set<InputKeyFunction> = new Set();

type CommandArgument = {
    name: string;
    required: boolean;
    type: CommandArgumentType;
};

export abstract class Game {
    private static _localPlayer: Player;

    /**
     * @returns the local player.
     */
    public static get localPlayer(): Player {
        // Get the local player entity id.
        let playerId = GetLocalPlayerId();

        // Check local cache.
        // If no cache exists or the cache has an invalid entity id,
        //   create a new player.
        if (!Game._localPlayer || Game._localPlayer.id !== playerId) {
            Game._localPlayer = Player.localPlayer();
        }

        // Return the local player.
        return Game._localPlayer;
    }

    /**
     * Shows a notification on screen.
     * @param header
     * @param message
     * @param icon
     */
    public static showNotification(
        header: string,
        message: string,
        icon: NotificationIcon = NotificationIcon.PaintBrush
    ): void {
        ScriptHook.ShowNotification(icon, header, message);
    }

    public static get reticleHitLocation(): Vector3 {
        const [x, y, z] = GetReticleHitLocation();
        return new Vector3(x, y, z);
    }

    public static get reticleHitEntity(): Entity | undefined {
        const entityId = GetReticleHitEntity();
        if (
            entityId === Entity.NonExistentId ||
            entityId === Entity.InvalidId
        ) {
            return undefined;
        }
        return World.getEntityFromId(entityId);
    }

    /**
     * Called when the plugin is loaded.
     * @param event
     * @param callback
     */
    public static on(event: 'load', callback: LoadFunction): void;
    /**
     * Called when the plugin is unloaded.
     * @param event
     * @param callback
     */
    public static on(event: 'unload', callback: UnloadFunction): void;
    /**
     * Called when the game is rendering.
     * @param event
     * @param callback
     */
    public static on(event: 'render', callback: RenderFunction): void;
    /**
     * Called when the ImGui is rendering.
     * @param event
     * @param callback
     */
    public static on(
        event: 'render-imgui',
        callback: RenderImGuiFunction
    ): void;
    /**
     * Called when the world is marked as ready.
     * @param event
     * @param callback
     */
    public static on(event: 'world-ready', callback: WorldReadyFunction): void;
    /**
     * Called every game tick.
     * @param event
     * @param callback
     */
    public static on(event: 'update', callback: UpdateFunction): void;
    public static on(event: 'input-key', callback: InputKeyFunction);
    public static on(event: string, callback: Function): void {
        switch (event) {
            case 'load':
                _loadFunctions.add(callback as LoadFunction);
                break;
            case 'unload':
                _unloadFunctions.add(callback as UnloadFunction);
                break;
            case 'render':
                _renderFunctions.add(callback as RenderFunction);
                break;
            case 'render-imgui':
                _renderImGuiFunctions.add(callback as RenderImGuiFunction);
                break;
            case 'world-ready':
                _worldReadyFunctions.add(callback as WorldReadyFunction);
                break;
            case 'update':
                _updateFunctions.add(callback as UpdateFunction);
                break;
            case 'input-key':
                _inputKeyFunctions.add(callback as InputKeyFunction);
                break;
        }
    }

    public static off(event: 'load', callback: LoadFunction): void;
    public static off(event: 'unload', callback: UnloadFunction): void;
    public static off(event: 'render', callback: RenderFunction): void;
    public static off(
        event: 'render-imgui',
        callback: RenderImGuiFunction
    ): void;
    public static off(event: 'world-ready', callback: WorldReadyFunction): void;
    public static off(event: 'update', callback: UpdateFunction): void;
    public static off(event: 'input-key', callback: InputKeyFunction): void;
    public static off(event: string, callback: Function): void {
        switch (event) {
            case 'load':
                _loadFunctions.delete(callback as LoadFunction);
                break;
            case 'unload':
                _unloadFunctions.delete(callback as UnloadFunction);
                break;
            case 'render':
                _renderFunctions.delete(callback as RenderFunction);
                break;
            case 'render-imgui':
                _renderImGuiFunctions.delete(callback as RenderImGuiFunction);
                break;
            case 'world-ready':
                _worldReadyFunctions.delete(callback as WorldReadyFunction);
                break;
            case 'update':
                _updateFunctions.delete(callback as UpdateFunction);
                break;
            case 'input-key':
                _inputKeyFunctions.delete(callback as InputKeyFunction);
                break;
            default:
                throw new Error(`Unknown event: ${event}`);
        }
    }

    /**
     * Registers a console command.
     * @param command The command name.
     * @param handler The function that handles the command.
     * @param args The command arguments.
     */
    public static onConsoleCommand(
        command: string,
        handler: (...args: any[]) => void,
        ...args: CommandArgument[]
    ): void {
        let registry = ScriptHook.RegisterCommand(command, (...args: any[]) => {
            handler(...args);
        });

        for (let arg of args) {
            registry.AddArgument(arg.name, arg.required, arg.type);
        }
    }
}

// region: Script Hooks

let script = Script();

script.OnLoad = () => {
    for (let loadFunction of _loadFunctions) {
        loadFunction?.();
    }
};

script.OnUnload = () => {
    for (let unloadFunction of _unloadFunctions) {
        unloadFunction?.();
    }
};

script.OnRender = () => {
    for (let renderFunction of _renderFunctions) {
        renderFunction?.();
    }
};

script.OnRenderImGui = () => {
    let input = imgui.InputType.Default;

    for (let renderImGuiFunction of _renderImGuiFunctions) {
        let resInput = renderImGuiFunction?.();
        if (resInput !== imgui.InputType.Default) {
            input = resInput;
        }
    }

    return input;
};

script.OnWorldReady = () => {
    for (let worldReadyFunction of _worldReadyFunctions) {
        worldReadyFunction?.();
    }
};

script.OnUpdate = (time: number, delta: number) => {
    for (let updateFunction of _updateFunctions) {
        updateFunction?.(time, delta);
    }
};

script.OnInputKey = (key: number, name: string, isDown: boolean) => {
    for (let inputKeyFunction of _inputKeyFunctions) {
        inputKeyFunction?.(key, name, isDown);
    }
};

// endregion
