/** @noSelfInFile **/

type Timer = {};

/**
 * Functions to work with timers.
 */
declare namespace timer {
    /**
     * Creates a new timer, which will execute the handler function after the
     * specified amount of time has passed. @see timer.Simple for a simple
     * one-shot timer.
     *
     * Timers will be paused when the game is paused.
     * @param name The name of the timer.
     * @param interval The interval in seconds.
     * @param repeats How many times the timer should repeat.
     * @param handler The function to call when the timer is triggered.
     * @param arg The (optional) argument to pass to the handler.
     */
    function Create<T = never>(
        name: string,
        interval: number,
        repeats: number,
        handler: (arg: T) => void,
        arg?: T
    ): Timer;

    /**
     * Removes a named timer that was created with `timer.Create`.
     * It doesn't work with simple timers.
     * @param timer The timer to be removed.
     * @throws Error if the timer doesn't exist.
     */
    function Remove(timer: string): void;
    function Remove(timer: Timer): void;

    /**
     * Attempts to remove a named timer that was created with `timer.Create`.
     * It doesn't work with simple timers.
     * @param timer The timer to be removed.
     * @throws Error if the timer doesn't exist.
     */
    function RemoveIfExists(timer: string): void;
    function RemoveIfExists(timer: Timer): void;

    /**
     * Creates a simple unnamed timer that will execute the handler function
     * after the specified amount of time has passed.
     * @param interval The interval in seconds.
     * @param handler The function to call when the timer is triggered.
     */
    function Simple(interval: number, handler: () => void): Timer;
}
