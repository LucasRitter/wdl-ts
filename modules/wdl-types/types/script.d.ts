/** @noSelfInFile **/

interface ScriptContext {
    // region Plugin Lifecycle

    /**
     * Called when the plugin is loaded.
     */
    OnLoad: () => void;

    /**
     * Called before the plugin is unloaded.
     */
    OnUnload: () => void;

    // endregion

    // region Rendering

    /**
     * Called when the plugin is drawing.
     * Has access to d3d namespace.
     */
    OnRender: () => void;

    /**
     * Called when ImGui is about to render.
     */
    OnRenderImGui: () => imgui.InputType;

    // endregion

    /**
     * Called when the world is marked as ready.
     */
    OnWorldReady: () => void;

    /**
     * Called every game tick.
     * @param time The game time.
     * @param delta The time since the last game tick.
     */
    OnUpdate: (time: number, delta: number) => void;

    // Todo
    InitCallbacks: () => void;
}

declare function Script(): ScriptContext;
