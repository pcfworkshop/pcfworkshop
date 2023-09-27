/* eslint-disable @typescript-eslint/no-unused-vars */
import { IInputs, IOutputs } from './generated/ManifestTypes';

export class DynamicTextInput implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    private height: number;
    private textarea: HTMLTextAreaElement;
    private defaultLoaded = false;
    /**
     * Empty constructor.
     */
    constructor() {}

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement,
    ): void {
        this.container = container;
        this.context = context;
        this.notifyOutputChanged = notifyOutputChanged;
        this.textarea = document.createElement('textarea');
        this.textarea.rows = 1;
        this.textarea.style.resize = 'none';
        this.textarea.style.overflowY = 'hidden';
        this.textarea.oninput = this.onTextAreaInput;
        this.textarea.onchange = this.onTextAreaChanged;
        this.container.appendChild(this.textarea);
    }

    onTextAreaInput = (): void => {
        this.autoSizeTextArea();
    };

    onTextAreaChanged = (): void => {
        this.notifyOutputChanged();
    };

    autoSizeTextArea(): void {
        this.textarea.style.height = 'auto';
        const newHeight = this.textarea.scrollHeight + 'px';
        const heightChanged = newHeight !== this.textarea.style.height;
        this.textarea.style.height = newHeight;
        if (heightChanged) {
            this.notifyOutputChanged();
        }
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const value = context.parameters.TextValue;
        let disabled = context.mode.isControlDisabled;
        let masked = false;
        if (value && value.security) {
            masked = !value.security.readable;
            disabled = disabled || masked || !value.security.editable;
        }

        // Set font style
        this.updateStyle(disabled);

        // Update text value if input value changes
        if (!this.defaultLoaded || context.updatedProperties.indexOf('TextValue') > -1) {
            this.defaultLoaded = true;
            const newValue = masked ? '****' : (value.raw as string);
            this.textarea.value = newValue;
            this.autoSizeTextArea();
        }
    }

    private updateStyle(disabled: boolean): void {
        const newStyle = {
            fontFamily: this.context.parameters.Font.raw || 'SegoeUI',
            fontSize: this.context.parameters.FontSize.raw ? this.context.parameters.FontSize.raw + 'px' : '14px',
        };
        const fontChanged =
            this.textarea.style.fontFamily !== newStyle.fontFamily ||
            this.textarea.style.fontSize !== newStyle.fontSize;
        if (fontChanged) {
            this.textarea.style.fontFamily = newStyle.fontFamily;
            this.textarea.style.fontSize = newStyle.fontSize;
            this.autoSizeTextArea();
        }
        if (this.textarea.disabled !== disabled) {
            this.textarea.disabled = disabled;
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        const height = Number.parseInt(this.textarea.style.height);
        return {
            TextValue: this.textarea.value,
            AutoHeightValue: height,
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
