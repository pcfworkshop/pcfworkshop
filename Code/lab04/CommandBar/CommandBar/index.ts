import * as React from 'react';
import { CanvasCommandBar, ICommandItem } from './components/CanvasCommandBar';
import { IInputs, IOutputs } from './generated/ManifestTypes';

export class CommandBar implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    private items: ICommandItem[] = [];
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        this.context.mode.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const isTestHarness = context.userSettings.userId === '{00000000-0000-0000-0000-000000000000}';
        const dataset = context.parameters.items;
        const datasetChanged = context.updatedProperties.indexOf('dataset') > -1;
        if (datasetChanged || isTestHarness) {
            this.items = dataset.sortedRecordIds.map((id) => {
                const record = dataset.records[id];
                return {
                    id: record.getRecordId(),
                    displayName: record.getValue('ItemDisplayName') as string,
                    enabled: record.getValue('ItemEnabled') as boolean,
                    iconName: record.getValue('ItemIconName') as string,
                } as ICommandItem;
            });
        }

        // The test harness provides width/height as strings
        const allocatedWidth = parseInt(context.mode.allocatedWidth as unknown as string);
        const allocatedHeight = parseInt(context.mode.allocatedHeight as unknown as string);

        return React.createElement(CanvasCommandBar, {
            width: allocatedWidth,
            height: allocatedHeight,
            items: this.items,
            onSelected: this.onSelect,
            disabled: context.mode.isControlDisabled,
        });
    }

    onSelect = (key: string): void => {
        const item = this.context.parameters.items.records[key];
        if (item) {
            this.context.parameters.items.openDatasetItem(item.getNamedReference());
        }
    };
    
    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
