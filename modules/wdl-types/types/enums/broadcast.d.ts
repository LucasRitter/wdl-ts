declare const enum BroadcastType {
    Default = 1,
    /**
     * Displays it on the player's screen.
     */
    Narrative = 2,
    NoSignal = 3,
    /**
     * Displays it on nearby entities (such as phonebooths, taxis, etc.)
     */
    Custom = 4,
}
