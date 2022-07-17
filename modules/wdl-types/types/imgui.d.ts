/** @noSelfInFile **/

// Fixme: This is heavily work in progress. Use at your own risk.
declare namespace imgui {
    const enum InputType {
        Default = 0,
        MouseForceShow = 1,
        MousePreventGameInput = 2,
        KeyboardPreventGameInput = 4,
    }

    type ImVec2 = [x: number, y: number];
    type ImVec2Ret = LuaMultiReturn<[x: number, y: number]>;

    type ImVec4 = [x: number, y: number, z: number, w: number];
    type ImVec4Ret = LuaMultiReturn<
        [x: number, y: number, z: number, w: number]
    >;

    const enum ImGuiSetCond {}

    const enum Col {
        Text,
        TextDisabled,
        WindowBg,
        ChildBg,
        PopupBg,
        Border,
        BorderShadow,
        FrameBg,
        FrameBgHovered,
        FrameBgActive,
        TitleBg,
        TitleBgActive,
        TitleBgCollapsed,
        MenuBarBg,
        ScrollbarBg,
        ScrollbarGrab,
        ScrollbarGrabHovered,
        ScrollbarGrabActive,
        CheckMark,
        SliderGrab,
        SliderGrabActive,
        Button,
        ButtonHovered,
        ButtonActive,
        Header,
        HeaderHovered,
        HeaderActive,
        Separator,
        SeparatorHovered,
        SeparatorActive,
        ResizeGrip,
        ResizeGripHovered,
        ResizeGripActive,
        Tab,
        TabHovered,
        TabActive,
        TabUnfocused,
        TabUnfocusedActive,
        PlotLines,
        PlotLinesHovered,
        PlotHistogram,
        PlotHistogramHovered,
        TableHeaderBg,
        TableBorderStrong,
        TableBorderLight,
        TableRowBg,
        TableRowBgAlt,
        TextSelectedBg,
        DragDropTarget,
        NavHighlight,
        NavWindowingHighlight,
        NavWindowingDimBg,
        ModalWindowDimBg,
    }

    const enum StyleVar {
        Alpha, // float
        DisabledAlpha, // float
        WindowPadding, // ImVec2
        WindowRounding, // float
        WindowBorderSize, // float
        WindowMinSize, // ImVec2
        WindowTitleAlign, // ImVec2
        ChildRounding, // float
        ChildBorderSize, // float
        PopupRounding, // float
        PopupBorderSize, // float
        FramePadding, // ImVec2
        FrameRounding, // float
        FrameBorderSize, // float
        ItemSpacing, // ImVec2
        ItemInnerSpacing, // ImVec2
        IndentSpacing, // float
        CellPadding, // ImVec2
        ScrollbarSize, // float
        ScrollbarRounding, // float
        GrabMinSize, // float
        GrabRounding, // float
        TabRounding, // float
        ButtonTextAlign, // ImVec2
        SelectableTextAlign, // ImVec2
    }

    // Fixme: This is a hack to make the type checker happy.
    type ImTextureID = number;

    /**
     *
     * @param title
     */
    function Begin(title: string): boolean;

    /**
     *
     * @param text
     */
    function TextUnformatted(text: string): void;

    /**
     *
     */
    function End(): void;

    function Button(text: string): boolean;

    function EndFrame(): void;

    function ShowDemoWindow(): void;

    function ShowMetricsWindow(): void;

    function ShowStyleSelector(label: string): boolean;

    function ShowFontSelector(label: string): boolean;

    function ShowUserGuide(): void;

    function GetVersion(): string;

    function BeginChild(
        id: string,
        sizeX: number,
        sizeY: number,
        border?: boolean,
        flags?: number
    ): boolean;

    function BeginChild_4(
        id: number,
        sizeX: number,
        sizeY: number,
        border?: boolean,
        flags?: number
    ): boolean;

    function EndChild(): void;

    function IsWindowAppearing(): boolean;

    function IsWindowCollapsed(): boolean;

    function GetWindowPos(): ImVec2Ret;

    function GetWindowSize(): ImVec2Ret;

    function GetWindowWidth(): number;

    function GetWindowHeight(): number;

    function GetContentRegionMax(): ImVec2Ret;

    function GetContentRegionAvail(): ImVec2Ret;

    function GetContentRegionAvailWidth(): number;

    function GetWindowContentRegionMin(): ImVec2Ret;

    function GetWindowContentRegionMax(): ImVec2Ret;

    function GetWindowContentRegionWidth(): number;

    function SetNextWindowContentSize(
        sizeX: number,
        sizeY: number,
        cond: ImGuiSetCond
    ): number;

    function SetNextWindowFocus(): void;

    function SetNextWindowAlpha(alpha: number): void;

    function SetWindowFocus(): void;

    function SetWindowFontScale(scale: number): void;

    function SetWindowFocus_1(name: string): void;

    function GetScrollX(): number;

    function GetScrollY(): number;

    function GetScrollMaxX(): number;

    function GetScrollMaxY(): number;

    function SetScrollY(y: number): void;

    function SetScrollHere(centerYRatio?: number): void;

    function SetScrollFromPosY(posY: number, centerYRatio?: number): void;

    function PopFont(): void;

    function PushStyleColor(index: Col, color: number): void;

    function PushStyleColor_2(
        index: Col,
        r: number,
        g: number,
        b: number,
        a: number
    ): void;

    function PopStyleColor(count?: number): void;

    function PushStyleVar(index: number, value: number): void;

    function PushStyleVar_2(
        index: number,
        valueX: number,
        valueY: number
    ): void;

    function PopStyleVar(count?: number): void;

    function GetFontSize(): number;

    function GetFontTexUvWhitePixel(): ImVec2Ret;

    function GetColorU32(index: number, alpha?: number): number;

    function GetColorU32_1(r: number, g: number, b: number, a: number): number;

    function GetColorU32_1_1(color: number): number;

    function PushItemWidth(width: number): void;

    function PopItemWidth(): void;

    function CalcItemWidth(): number;

    function PushTextWrapPos(wrapPosX?: number): void;

    function PopTextWrapPos(): void;

    function PushAllowKeyboardFocus(allowKeyboardFocus: boolean): void;

    function PopAllowKeyboardFocus(): void;

    function PushButtonRepeat(repeat: boolean): void;

    function PopButtonRepeat(): void;

    function Separator(): void;

    function SameLine(posX?: number, spacing?: number): void;

    function NewLine(): void;

    function Spacing(): void;

    function Dummy(sizeX: number, sizeY: number): void;

    function Indent(indentWidth?: number): void;

    function Unindent(indentWidth?: number): void;

    function BeginGroup(): void;

    function EndGroup(): void;

    function GetCursorPos(): ImVec2Ret;

    function GetCursorPosX(): number;

    function GetCursorPosY(): number;

    function SetCursorPos(posX: number, posY: number): void;

    function SetCursorPosX(x: number): void;

    function SetCursorPosY(y: number): void;

    function GetCursorStartPos(): ImVec2Ret;

    function GetCursorScreenPos(): ImVec2Ret;

    function SetCursorScreenPos(posX: number, posY: number): void;

    function AlignTextToFramePadding(): void;

    function GetTextLineHeight(): number;

    function GetTextLineHeightWithSpacing(): number;

    function GetFrameHeight(): number;

    function GetFrameHeightWithSpacing(): number;

    function PushID(id: string): void;

    function PushID_2(idBegin: string, idEnd: string): void;

    function PushID_1(id: number): void;

    function PopID(): void;

    function GetID(id: string): number;

    function GetID_2(idStart: string, idEnd: string): number;

    function Button(label: string, sizeX: number, sizeY: number): boolean;

    function SmallButton(label: string): boolean;

    function InvisibleButton(
        strId: string,
        sizeX: number,
        sizeY: number
    ): boolean;

    function Image(
        textureId: ImTextureID,
        sizeX: number,
        sizeY: number,
        uv0x?: number,
        uv0y?: number,
        uv1x?: number,
        uv1y?: number,
        tintCol?: ImVec4,
        borderCol?: ImVec4
    ): boolean;

    function ImageButton(
        textureId: ImTextureID,
        sizeX: number,
        sizeY: number,
        uv0x?: number,
        uv0y?: number,
        uv1x?: number,
        uv1y?: number,
        framePaddingX?: number,
        framePaddingY?: number,
        bgCol?: ImVec4,
        tintCol?: ImVec4,
        borderCol?: ImVec4
    ): boolean;

    // Todo: Bool pointer?
    function Checkbox(
        label: string,
        boolPointer: boolean
    ): LuaMultiReturn<[wasJustActivated: boolean, active: boolean]>;

    function CheckboxFlags(
        label: string,
        flagsPointer: number,
        flagsValue: number
    ): LuaMultiReturn<[boolean, number]>;

    function RadioButton(label: string, active: boolean): boolean;

    function RadioButton_3(
        label: string,
        intPointer: number,
        vButton: number
    ): LuaMultiReturn<[boolean, number]>;

    function ProgressBar(
        fraction: number,
        sizeArgX?: number,
        sizeArgY?: number,
        overlay?: string
    ): boolean;

    function Bullet(): void;

    function EndCombo(): void;
    function Combo(
        label: string,
        currentItemPointer: number,
        itemsSeparatedByZeros: string,
        popupMaxHeightInItems?: number
    ): LuaMultiReturn<[boolean, number]>;
}
