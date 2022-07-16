/** @noSelfInFile **/
declare namespace d3d {
    /**
     * Sets the current rendering color for shapes and text
     * Must be called from the "OnRender" event.
     * @param red The red component of the color. [0 .. 255]
     * @param green The green component of the color. [0 .. 255]
     * @param blue The blue component of the color. [0 .. 255]
     * @param alpha The alpha component of the color. Optional. [0 .. 255]
     */
    export function SetColor(
        red: number,
        green: number,
        blue: number,
        alpha?: number
    ): void;

    /**
     * Translates 3D-world coordinates to 2D-screen coordinates.
     * @param x The x component of the 3D-world coordinate.
     * @param y The y component of the 3D-world coordinate.
     * @param z The z component of the 3D-world coordinate.
     */
    export function World2screen(
        x: number,
        y: number,
        z: number
    ): LuaMultiReturn<[isVisible: boolean, screenX: number, screenY: number]>;

    /**
     * Sets the current font for any text rendering or measurements.
     * @param family The font family.
     * @param size The font size. Optional.
     */
    export function SetFont(family: string, size?: number): void;

    /**
     * Draws text onto the screen at the given x and y coordinates.
     * Set the font family with SetFont(), and the text color with SetColor().
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param text The text to draw.
     */
    export function DrawText(x: number, y: number, text: string): void;

    /**
     * Returns the measurements (width, height) of the given text.
     * Set the font family with SetFont().
     * @param text The text to measure.
     */
    export function MeasureText(
        text: string
    ): LuaMultiReturn<[width: number, height: number]>;
}
