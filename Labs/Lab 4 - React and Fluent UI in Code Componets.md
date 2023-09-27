#  🚀 Lab 4: React and Fluent UI in Code Components

Time to complete: **~35 minutes**

Welcome to this code component (PCF) lab - you'll be learning how to use [React](https://reactjs.org/) with code components along with Microsoft's user interface component framework called [Microsoft Fluent UI](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#use-microsoft-fluent-ui-react) for consistency and [accessibility](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#check-accessibility) reasons.

## 👉What you will learn

In this lab you will learn:

- Create a code component using the React and Fluent UI template.
- Mapping props to Fluent UI Controls.
- Building a dataset code component using Fluent UI.
- Configuring and debugging the component inside a custom page.

This lab assumes you have completed the previous labs in this series. You will create a code component using Fluent UI's command bar component that allows you to easily create buttons with responsive overflow in custom pages. This is especially useful for use inside canvas apps or custom pages with responsive containers.

# ✅Task 01 - Initialize a dataset component

We are building a code component that will render the [Fluent UI command bar](https://developer.microsoft.com/en-us/fluentui#/controls/web/commandbar) for use in a custom page. The Fluent UI command bar has the ability to show buttons in a flyout menu when there isn't enough space to accommodate all buttons. This would be very complex using Canvas Apps and would result in accessibility and performance challenges. Using Fluent UI is also beneficial because it comes with many built-in icons that you can use.  
![image-20230919133410724](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230919133410724.png)

## 👉Initialize project

1. Inside your codespace, at the terminal use the following command (You may need to use `Ctrl + C` to stop the previous lab's react app test harness):

   ```bash
   pac pcf init -ns SampleNamespace -n CommandBar -t dataset -npm -fw react -o /workspaces/lab04/CommandBar
   ```

   > [!NOTE]
   >
   > 1. The namespace is used to create a unique name for the control in case other control has the same name. When deploying later, we will also provide a publisher prefix that will add an additional level of uniqueness that defines the solution publisher that owns the code component.
   > 2. We use the `dataset` template this time instead of the `field` template since the buttons on the command bar must be configured using a collection.
   > 3. The `-fw` parameter indicates we want to use the React and Fluent UI template.

2. Use **File** - **Open Folder** and select the `/workspaces/lab04/CommandBar` folder.  
   ![image-20230919133714309](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230919133714309.png)

## 👉Virtual controls vs Standard controls

Previously we created a 'Standard Control' since the `--framework` (`-fw`) parameter was not provided to `pac pcf init`. Standard controls add HTML DOM elements to the container passed to the `init` method. When we used the `react` framework parameter with `pac pcf init`, our control was created as a 'virtual control'. You can see this in the `CommandBar\ControlManifest.Input.xml` file under the `control` element:

```xml
<control ... control-type="virtual" >
```

Virtual controls are a performance optimization where the code component returns a React element that is then added to the virtual DOM of the hosting app, rather than creating a new virtual DOM for each component. You can think of this like the `create-react-app` app we created, where the `index.tsx` created the root virtual DOM, which we then added the child components to. Inside Power Apps, the code components are like the `TodoItems` component hosted inside the top level React DOM, created by the platform, and common to all code components.

More information: [React controls & platform libraries](https://docs.microsoft.com/en-gb/power-apps/developer/component-framework/react-controls-platform-libraries).

## 👉Defining the dataset properties

1. The `CommandBar\ControlManifest.Input.xml` file defines the metadata describing the behavior of the code component. The [control](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/control) attribute will already contain the namespace and name of the component. You must define the dataset properties that the code component can be bound to, by adding the following inside the `control` element, replacing the existing `data-set` element:
   ```xml
   <data-set name="items" display-name-key="Items">
         <property-set name="ItemDisplayName" display-name-key="Display Name" of-type="SingleLine.Text" usage="bound" required="true" />
         <property-set name="ItemEnabled" display-name-key="Enabled" of-type="TwoOptions" usage="bound" required="false" />
         <property-set name="ItemIconName" display-name-key="Icon Name" of-type="SingleLine.Text" usage="bound" required="false" />
   </data-set>
   ```

   The item [data-set](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/data-set) will be bound to a data source when the code component is added to a custom page. If this code component was being used inside a model-driven app, it would always be bound to a table. Canvas apps allows us to additionally bind to collections and other connector datasets such as SharePoint lists. The [property-set](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/property-set) indicates that the user must configure the columns, matching to the collection columns. If there are additional columns, they can still be picked up by the code component even if they are not referenced by a property-set.  
   ![image-20230919133909154](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230919133909154.png)

> [!IMPORTANT]
> When defining the manifest of your component it is very important to think first about how makers will use and configure the component. Add the properties in an order that makes sense to appear in the configuration panel, and give the properties names that will make sense to makers without understanding how the component internals work.

> [!NOTE]
> In this lab, the manifest is not translated using a `resx` file. See [the other samples for examples of how to do this for datasets.](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/tutorial-create-canvas-dataset-component)

2. Add the terminal, use the following to generate the manifest types:

   ```bash
   npm run refreshTypes
   ```

   You can see the generated code inside `CommandBar\generated\ManifestTypes.d.ts`.

2. Notice how there is only the `items` dataset property since we have not defined any input/output/bound properties. Although we defined this component as a dataset component, you can combine both dataset and non-dataset properties if required. An example would be to provide style properties for a component in addition to the dataset items.

   > [!IMPORTANT]
   >When creating dataset components for model-driven apps, the properties must come AFTER the data-set.az

## 👉React & Microsoft Fluent UI

You'll be using [Microsoft Fluent UI](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#use-microsoft-fluent-ui-react) and [React](https://reactjs.org/) for creating the UI.  Since we used the `-fw react` parameter with `pac pcf init`, we already have these module installed. You can see this by opening the `packages.json` file which will contain:

```json
"dependencies": {
    "react": "16.8.6",
    "@fluentui/react": "8.29.0",
    "react-dom": "16.8.6"
},
```

Notice how there are specific versions of React and Fluent UI referenced. These are the version that are provided by the platform at run-time. More versions may be added in the future, but the control manifest will ensure that the versions required will be made available to your component. 

1. Open the `CommandBar\ControlManifest.Input.xml` manifest and notice it contains a demand for the same versions using the `platform-library` tag:

```xml
<resources>
      <code path="index.ts" order="1"/>
      <platform-library name="React" version="16.8.6" />
      <platform-library name="Fluent" version="8.29.0" />
</resources>
```

Since we passed the `-npm` parameter to `pac pcf init`, React and Fluent UI will already be downloaded into the `node_modules` folder. This is the equivalent of running `npm install` manually.

> [!NOTE]
>You won't ever commit the contents of the `node_modules` into source control since all the required modules can be restored using `npm install`. The `.gitignore` is automatically created with an exclusion path of `/node_modules`.

When building our component, the platform libraries will not be added to the `bundle.js` even though we will be importing them. This will decrease the size of the loaded component and lower the memory foot-print when running inside the the browser.

# ✅Task 02 - Adding the Command Bar React component

In order to add a React component to a code component, we must instantiate the root component inside `index.ts` so that it can be returned and added to the React virtual DOM. This is much like the `App` component in the previous lab that was created using create-react-app.
There are two options:

1. Return a single Fluent UI component directly, and map the input properties to its props from inside `index.tsx`.
2. Encapsulate the Fluent UI component inside our own custom component so that we can provide additional logic before rendering the Fluent UI components. This also allows us to add more than one Fluent UI component if needed.

We will use option 2 since it gives the most flexibility as our component grows in complexity.

## 👉Creating the CanvasCommandBar Component

1. Create a new folder underneath the `CommandBar` folder of the project.  
   ![image-20230915143026034](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915143026034.png)

2. Create a new file at `CommandBar\components\CanvasCommandBar.tsx`. Notice the extension is `tsx` so that it can include React elements. We learned about this in our previous lab.  
   ![image-20230915143155187](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915143155187.png)

3. Add the following code:

   ```typescript
   import { CommandBar, ICommandBarItemProps, ICommandBarStyles } from '@fluentui/react';
   import { IContextualMenuItem } from '@fluentui/react';
   import * as React from 'react';
   
   export interface ICommandItem {
       id: string;
       displayName: string;
       enabled?: boolean;
       iconName?: string;
   }
   
   export interface CanvasCommandBarProps {
       width?: number;
       height?: number;
       items: ICommandItem[];
       onSelected: (key: string) => void;
       disabled: boolean | null;
       tabIndex?: number;
   }
   
   ```

   > [!NOTE]
   >
   > 1. This code is defining both the shape of the item that defines the command bar button to be passed from the custom page host (`ICommandItem`), and the **props** (`CanvasCommandBarProps`) that will be used to pass data from the code component `index.ts` into the React component.
   > 2. Since we are using virtual controls, there is no need to use Fluent UI [path based imports](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#use-path-based-imports-from-fluent-to-reduce-bundle-size) or tree-shaking, since the Fluent UI library will not be added to the bundle. Tree shaking is a technique that excludes unnecessary modules during the transpilation process so that your bundles are as small as possible.
   
4. Add a function component called `CanvasCommandBar` component using the following code inside the `CanvasCommandBar.tsx` underneath `CanvasCommandBarProps`. We learned about function components and React hooks in the previous lab.

   ```typescript
   export const CanvasCommandBar = React.memo((props: CanvasCommandBarProps) => {
       const { items, height, width, disabled, onSelected, tabIndex } = props;
   
       const onClick = React.useCallback(
           (ev?: unknown, item?: IContextualMenuItem | undefined) => {
               if (item) {
                   onSelected(item.key);
               }
               return true;
           },
           [onSelected],
       );
   
   	const rootStyle = React.useMemo(() => {
           return {
               display: 'block',
               position: 'absolute',
               width: width,
           } as React.CSSProperties;
       }, [width]);
   
       const commandBarItems = React.useMemo(() => {
           return items.map((i) => {
               return getItemProps(i, disabled, onClick, tabIndex);
           });
       }, [items, disabled, onClick, tabIndex]);
   
       const commandBarStyle = React.useMemo(() => {
           return {
               root: {
                   height: height,
                   padding: 0,
                   background: 'rgba(255, 255, 255,0)',
                   minWidth: 0,
               },
           } as ICommandBarStyles;
       }, [height]);
   
       return <div style={rootStyle}>
           <CommandBar styles={commandBarStyle} items={commandBarItems} />
           </div>;
   });
   CanvasCommandBar.displayName = 'CanvasCommandBar';
   
   ```

   > [!NOTE]
   >
   > 1. We use `React.memo` to ensure that the component does not re-render unless any of the props have changed. We learned about this in the previous lab.
   > 2. `React.useMemo` is used to ensure that the items and styles do not mutate unless the dependencies listed change between renders. This is a rendering optimization similar to `React.useCallback` that we learned about in the previous lab. Since we only want to render the `CommandBar` Fluent UI component when the style or items change, both props are wrapped in `React.useMemo`.
   > 3. The Fluent UI command bar is returned from the component using the line `return <CommandBar styles={commandBarStyle} items={commandBarItems} />`  There could be additional components added here, even though in this case we are only returning a single component.

5. Now add the `getItemProps` function at the bottom of `CanvasCommandBar.tsx`. This maps the custom page properties to the props that are expected by the Command Bar component:

   ```typescript
   function getItemProps(
       i: ICommandItem,
       disabled: boolean | null,
       onClick: (ev?: unknown, item?: IContextualMenuItem | undefined) => boolean,
       tabIndex: number | undefined,
   ): ICommandBarItemProps {
       return {
           key: i.id,
           text: i.displayName,
           disabled: i.enabled === false || disabled,
           onClick: onClick,
           iconProps: {
               iconName: i.iconName,
           },
           tabIndex: tabIndex,
           data: i,
           buttonStyles: { root: { background: 'rgba(255, 255, 255,0)' } },
       } as ICommandBarItemProps;
   }
   ```

## 👉Rendering the component from inside index.ts

Now that the command bar component is built, we must render it when Power Apps calls the code component's `updateView` method. This is somewhat different to a standard component since we return a React component rather than adding HTML Elements to the container.

Open the `index.ts` file and notice that:

- It imports the `HelloWorld.tsx` React component
- The `init` method does not provide a container
- The `updateView` method now returns the `HelloWorld` element.

We will now update index to return the `CanvasCommandBar` component.

1. First, delete the `HelloWorld.tsx` file since we do not need it.

2. Now, open `index.ts` and replace the imports sections at the top with:

   ```typescript
   import * as React from 'react';
   import { CanvasCommandBar, ICommandItem } from './components/CanvasCommandBar';
   import { IInputs, IOutputs } from './generated/ManifestTypes';
   ```

   This is so that we can use React and `CanvasCommandBar` in our code component. 

3. As before, we keep a reference to context in our code component, so add the following fields inside the `CommandBar` class:

   ```typescript
   private context: ComponentFramework.Context<IInputs>;
   private items: ICommandItem[] = [];
   ```

4. Inside the `init`, set the context field by adding the code:

   ```typescript
   this.context = context;
   this.context.mode.trackContainerResize(true);
   ```

   > [!IMPORTANT]
   > We call `trackContainerResize(true)` so that when the canvas component is resized, the component will receive the updated width/height.

5. Inside the `updateView` method, replace the existing 'Hello World' code with the following code:

   ```typescript
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
   ```

   

   > [!NOTE]
   >
   > 1. The `isTestHarness` flag is a work around needed since the `updatedProperties` array is not populated in the test harness. There is currently no supported way to determine that we are inside the test harness using the code component context.
   > 2. The `dataset` string is added to the `updatedProperties` array when the input dataset is changed. If there are multiple input datasets, then you will receive an `updatedProperty` array entry for each of the updated datasets with the name `<datasetname>_records`
   > 3. The `context.parameters.items` contains both `sortedRecordIds` and `records`. The `sortedRecordIds` contains the string ids that are used to lookup the full record inside the `records` array.
   > 4. The `getValue` method of a dataset item is used to get the raw data type, additionally `getFormattedValue` can be used to get a formatted string inside model-driven apps.
   > 5. Calling `React.createElement(CanvasCommandBar...` instructs React to create the `CanvasCommandBar` component which we then return to be added to the Virtual DOM of the hosting Power App. The render will only happen when the props have changed sine we use `React.memo` - so `updateView` can be called many times, but the component will not always be rendered unless needed.
   > 6. Passing `disabled: context.mode.isControlDisabled` to the disabled property allows the property`DisplayMode` inside the custom page to be used.

6. Add a new method `onSelect` underneath the `updateView` function - this will be called when the buttons are selected since it is passed to the `onSelected` prop:

   ```typescript
   onSelect = (key: string): void => {
       const item = this.context.parameters.items.records[key];
       if (item) {
           this.context.parameters.items.openDatasetItem(item.getNamedReference());
       }
   };
   ```

   > [!NOTE]
   > The `openDatasetItem`  method is called that will raise the `OnSelect` method in the hosting custom page. 

7. There is no need to do anything inside the `destroy` method since Power Apps will ensure that our React elements are removed from the Virtual DOM when they are no longer needed.

8. We leave `getOutputs` empty since there are no properties to return to the custom page.

9. **Save** all of your files.

# ✅Task 03 - Debugging in the test harness

Now that the code component is built, it can be tested in the test-harness. As stated above, the `updatedProperties` array does not get populated inside the test harness, and so we must provide a work around to ensure that the component is rendered even though the dataset is not flagged as being updated. 

1. At the VSCode terminal, type:

   ```bash
   npm start watch
   ```

2. A new browser will open with the test harness. Set the **Width** to `300` and the **Height** to `42`.  
   ![image-20230915152052563](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915152052563.png)

3. By default, all properties are set to the string `val`. We need to provide specific data to test using.

4. Create a new file on your local machine named `CommandBarItems.csv` and provide the contents:

   ```
   ItemDisplayName	ItemEnabled	ItemIconName
   Save	false	Save
   New	true	Add
   Delete	true	Delete
   ```

   > [!NOTE]
   >
   > 1. You can use the icons defined in the [Fluent UI icon library](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons).
   > 2. You can use a pre-create file [CommandBarItems.csv](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/CommandBarItems.csv) file.

5. Under the **Data Inputs** section, select **Select a file** and select the `CommandBarItems.csv` file.  
   ![image-20230915152620404](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915152620404.png)

6. Set the Property **Column** Names to match the **Property** name for `ItemDisplayName`, `ItemEnabled`, & `ItemIconName`.   
   ![image-20230915153216766](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915153216766.png)

7. Select **Apply**.

8. The command bar component will now render the buttons defined in the file:  
   ![image-20230915153429589](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915153429589.png)

9. You can press `F12` or `Ctrl+Shift+I` to open the Developer tools, navigate to the **Sources** tab and use **Open file** under the ellipses menu to open `index.ts`. Set a break point inside `updateView` and confirm that the `updatedProperties` are indeed. `updateView` will be called when you select **Apply** on the **Data Inputs** pane since this updates the input dataset.
   You can step through the code using `F10`, and examine the context passed to the component. Observer that the `updatedProperties` array is empty even though the dataset has been applied - this is a limitation of the test harness.  
   ![image-20230915153847639](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915153847639.png)

10. **Remove** the breakpoint and continue execution using `F8`.

11. Set the **Component Container Width** to `120` inside the test-harness you will see the component add/remove buttons from the overflow ellipses menu to accommodate the increased/reduced width:  
    ![image-20230915161829904](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915161829904.png)

    > [!IMPORTANT]
    >Due to the way that the test harness hosts the code component, the command will not show the overflow to match the width exactly. When running inside power apps, this will work correctly.
    
12. There is currently no way to test the `OnSelect` event, and so we must deploy to Dataverse to test further.

# ✅Task 04 - Deploying to Dataverse to test

Before we deploy to your Dataverse environment, ensure you have followed the steps in the Deployment and Configuration lab.

## 👉 Check auth profile and selected org

1. Stop the test harness at the terminal using `Ctrl+C`.

2. You should then have a **samples** publisher and have the Power Platform CLI authenticated against your development environment. To check this, you can run the following at the terminal. You will first need to stop the running `npm start watch` using `Ctrl+C`.

   ```bash
   pac auth list
   ```

   You should see your Universal authentication from the first lab, with an asterisk (*)  next to the profile.   
   ![image-20230915162003281](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915162003281.png)

   You can change using:

   ```bash
   pac auth select --index [Index of your environment]
   ```

3. Again, in the first lab, you should already have selected your developer environment, but you can check by using:
   ```bash
   pac org who
   ```

   Check that the Org URL matches your developer environment.

## 👉Update Build Mode

Ensure that your project is set up to deploy a production build so that you do not hit the maximum webresource size limit.

1. Open the file `CommandBar.pcfproj`. Add the `PcfBuildMode` element to the `CommandBar` `PropertyGroup`. This will ensure than when we deploy the code component to Microsoft Dataverse, it will be build using the production mode. It should look similar to:

   ```xml
   <PropertyGroup>
     <Name>CommandBar</Name>
     <ProjectGuid>...</ProjectGuid>
     <OutputPath>$(MSBuildThisFileDirectory)out\controls</OutputPath>
     <PcfBuildMode>production</PcfBuildMode>
   </PropertyGroup>
   ```

1. Ensure all of your code files are **Saved**.

1. At the terminal run the following to build and push the component to your Dataverse environment:
   ```bash
   pac pcf push -pp samples
   ```
1. Wait for the deployment to complete.

## 👉Add to a Custom Page

1. Once the deployment has completed, open [make.powerapps.com](https://make.powerapps.com) and select your development environment.

1. Open your **SamplesPCF** solution created earlier.

1. Inside the solution, select **New** -> **App** -> **Page**  
   ![image-20230915162913813](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915162913813.png)

1. Select the **Insert** tool pane -> **Get more components**:  
   ![image-20230915163020886](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915163020886.png)

1. On the **Code** tab, select the **CommandBar** component -> **Import**.
   ![image-20230915163126867](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915163126867.png)

1. Select **With layout** underneath **Start this screen**  
   ![image-20230915170145285](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915170145285.png)

1. Select the **Sidebar** Layout.  
   ![image-20230915170254859](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915170254859.png)

1. Again, on the **Insert** tool pane, expand **Code components**, and drag the **CommandBar** component into the top Header Container.  
   ![image-20230915170430405](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915170430405.png)

   > [!IMPORTANT]
   >If you are using Canvas Apps rather an Custom Page here you will need to ensure that **Scale to fit** is turned off under **Settings** -> **Display**. This is because of the way which Canvas Apps scales the HTML interferes with the way in which Fluent UI measures the size of components.
   
1. On the right hand panel of the CommandBar control properties, set the following properties:

   - Align in container: `Stretch`
   - Minimum height: `42`
   - Flexible width: `On`

   ![image-20230915170735738](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230915170735738.png)

# ✅Task 05 - Configuring the Command Bar Code Component

One of the most important aspects of every code component is the easy of configuration by makers. The properties defined in the manifest will appear in the Control Advanced tab in the order that they are defined. In order to configure our Command Bar we must provide a collection that defines the buttons, and code that runs on the selection of those buttons.

1. Select the **Items** property on the **CommandBar** component **Properties** tab.  
   ![image-20230917151129000](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917151129000.png)

2. Set the `Items` Property to be the following:

   ```vb
   Table(
       {
           ItemKey: "new",
           ItemDisplayName: "New",
           ItemIconName: "Add"
       },
       {
           ItemKey: "edit",
           ItemDisplayName: "Edit",
           ItemIconName: "Edit"
       },
       {
           ItemKey: "save",
           ItemDisplayName: "Save",
           ItemIconName: "Save"
       },
       {
           ItemKey: "delete",
           ItemDisplayName: "Delete",
           ItemIconName: "Delete"
       },
       {
           ItemKey: "refresh",
           ItemDisplayName: "Refresh",
           ItemIconName: "Refresh"
       },
       {
           ItemKey: "chart",
           ItemDisplayName: "Chart",
           ItemIconName: "LineChart"
       },
       {
           ItemKey: "settings",
           ItemDisplayName: "Settings",
           ItemIconName: "Settings"
       },
       {
           ItemKey: "help",
           ItemDisplayName: "Help",
           ItemIconName: "help"
       }
   )
   ```

   This Power Fx configures the buttons to display in the command bar.

   > [!INOTE]
   >
   > This code is providing a table structure (using the `Table` function) to configure the command bar but this equally could be a Power Fx collection.
   >
   > You can vary the icons [using the Fluent UI Icon names](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons). 

3. Select the **Advanced Tab** and select the **`OnSelect`** property. Set the `OnSelect` property to the following code

   ```vb
   UpdateContext({ctxAction:$"Command Bar {Self.Selected.ItemDisplayName} Pressed"});
   
   Switch(Self.Selected.ItemKey,
       "save",
       UpdateContext({ctxSaveEnabled:false});,
       "edit",
       UpdateContext({ctxSaveEnabled:true}),
       "new",
       UpdateContext({ctxSaveEnabled:true}),
       "delete",
       UpdateContext({ctxSaveEnabled:false})
   );
   ```

   This Power Fx will be run when the user selects a button on the command bar.  
   ![image-20230917151857452](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917151857452.png)

4. Select the `MainContainer1` and select **Label** from the **Insert** Panel. Set the **Align in container** property to be `Stretch`.  
   ![image-20230917152121105](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917152121105.png)

5. Select the `Text` property and set it to be `ctxAction`.  
   ![image-20230917152224681](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917152224681.png)

6. Update the save item of the Items property of the command bar to only enable the Save item when the `ctxSaveEnabled` variable is set to true (when the New or Edit button is pressed)
   ```
   
       {
           ItemKey: "save",
           ItemDisplayName: "Save",
           ItemIconName: "Save",
           ItemEnabled:ctxSaveEnabled
       },
     
   ```

   > [!NOTE]
   >Since the items Table now contains a reference to the context variable to define if the save button is enabled, when this variable changes, the custom page will re-evaluate this table and update the code component. This is the beauty of declarative programming!
   
   ![image-20230917152823879](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917152823879.png)
   
7. **Save** your page.  
   ![image-20230917152928858](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917152928858.png)

8. Once **saved & published**, you can also add it to a model driven app.

9. **Play** your page. You should now see a command bar with the **Save** button enabled/disabled set by the **New** and **Delete** buttons.  
   ![image-20230917153020817](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917153020817.png)

   > [!NOTE]
   >When the code component calls `context.parameters.items.openDatasetItem`  the `OnSelected` event is raised in the custom page with the `Selected` property set to the item that is provided to the `openDatasetItem` method.
   
10. If you re-size the app window you will see that the buttons move into an overflow ellipses flyout.  
    ![image-20230917153122442](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917153122442.png)

11. Custom pages have **Scale to fit** turned off by default. Inside a canvas app, this is on by default and you will find that the command bar does not always fill the available width, turn off **Scale to fit** under **Settings** > **Display**. This is because when **Scale to fit** is turned on, the scaling will interfere with Fluent UI's measurements of available width. Additionally, you will see similar incorrect width measuring due to the scaling applied when not in play mode or using the tablet/phone preview inside Power Apps studio.
    When in design mode you may see the overflow incorrectly shown even though there is enough width. This is because the scale is set to 40% in the following screenshot.   
    ![image-20230917153440335](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917153440335.png)

    In the following screenshot you the phone preview mode is used, however the scaling causes the overflow to incorrectly show.  
    ![image-20230917153546619](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917153546619.png)

    > [!IMPORTANT]
    >When running inside the real power apps player on a phone, tablet or desktop, the scaling will work correctly and the flyout will only show when the is not enough space.
    
12. Select 'Window size' to return to the standard view.  
    ![image-20230917153843127](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917153843127.png)

13. To correctly simulate the overflow behaviour you can resize the browser window, or by pressing `Ctrl+Shift+I`, and selecting the **device emulator** mode.  
    ![image-20230917154024755](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917154024755.png)

    Drag the vertical resizer handle to see the overflow buttons re-flow. 

14. Press `Ctrl+Shift+I` to return to the standard view.

# ✅Task 06 - Debugging in the browser

If you press `Ctrl+Shift+I` (`F12` will not work since it is already in use by Power Apps studio), the Developer Tools will open. If you search for `index.tsx` you will notice that it is not available. This is because the code component is built and deployed using the production configuration that does not include the source maps. This is [best practice](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#avoid-deploying-development-builds-to-dataverse) to avoid large file sizes and to avoid accidentally deploying non-production code components. To debug in the browser, we can again use Requestly as we did in Lab 2. 

1. Ensure that your custom page is saved.

2. Select Requestly from the extensions icon.  
   ![image-20230917155241492](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917155241492.png)

3. Ensure that Requestly is running.  
   ![image-20230917160111891](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917160111891.png)

4. Select **Open app**.

5. Inside your codepsace, ensure that your test harness is running. You should have a test harness page inside the browser that when you refresh it does not show an error. If you do not select the terminal (you can toggle the terminal view using `Ctrl+'`) and using the command:

   ```bash
   npm start watch
   ```

6. You will see a browser open with a url similar to `https://.......-8181.app.github.dev`. Copy this URL because you will need it below when configuring the redirect rule.

7. Inside the code space you will see a dialog with a Make Public option. Select Make Public so that our redirect will work without needing to authenticate.  
   ![image-20230917162347433](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917162347433.png)

   Alternatively, you can select the PORTS tab, and right-click the pcf-start process port.  
   ![image-20230917162543955](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917162543955.png)

   > [!NOTE]
   >This still is very important otherwise you will see 'Error loading control'
   
8. Inside Requestly, select the **HTTP Rules** area and select **New Rule** -> **Redirect Request**.  
   ![image-20230917160222712](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917160222712.png)

9. Set the **Rule name** to be **Command Bar PCF**.

10. In the **If request** rule, change the `Equals` to `Matches (RegEx) ` and enter `/.*CommandBar.*bundle\.js.*/g`

11. In the **Redirect to** section, set the URL to be the URL of your test harness that you coped in the step above, append `/bundle.js` on the end.

12. Save the rule using the **Create rule** button on the top right.  
    ![image-20230917160653730](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917160653730.png)

13. Inside the custom page page, ensure your page is **Saved** and then press `Ctrl+Shift+I` to open the **developer tools**. Right click the Refresh button and select empty cache and hard refresh so that the browser will pick up the debug version of your code. When prompted, select Reload.  
    ![image-20230917161758105](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917161758105.png)

14. You will see a message indicating that the app is **read-only** because you already are editing it, select **Override**.  
    ![image-20230917161953466](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917161953466.png)

    > [!NOTE]
    >This message will take a few seconds to appear.
    
15. You can now select the **Source** tab, and use Ctrl+P to open `index.ts` and select the `CommandBar/index.ts`  
    ![image-20230917162825369](Lab%204%20-%20React%20and%20Fluent%20UI%20in%20Code%20Componets.assets/image-20230917162825369.png)

16. You can set break points in the TypeScript. If you make a change in the codespace, you can simply refresh the app to pick up the latest version. This will also work after the app has been published.

# 🤩Congratulations!

Now that you have completed this lab, you now understand how to add React and Microsoft Fluent UI to build complex user interface code components that match the style of the rest of Power Apps.

# 🌴Take it further...

1. Try updating the custom page to vary the `DisplayMode` property to see the command bar component enable/disable.
2. Add an additional property to the `ICommandItem` to allow the button to be shown/hidden.
3. Each time you deploy a new version, you will need to increment the build number (E.g. `0.0.1` -> `0.0.2`) of the control inside the `ControlManifest.Input.xml` file. When you re-open the custom page you will be prompted to **Update** to the newer version. See: [Canvas apps ALM considerations](https://docs.microsoft.com/en-us/power-apps/developer/component-framework/code-components-alm#canvas-apps-alm-considerations).

## More information

- https://aka.ms/Learn-PCF 
- https://aka.ms/PCFDocs 
- [https://pcf.gallery](https://pcf.gallery/) 
- [Component Framework Custom Control Overview](https://docs.microsoft.com/powerapps/developer/component-framework/custom-controls-overview?WT.mc_id=build-studiosession-cassieb)
- [Learn Module Get Started](https://docs.microsoft.com/learn/modules/get-started-component-framework/1-introduction?WT.mc_id=ca-5902-cassieb)
- [Learn Module Build PowerApps Component](https://docs.microsoft.com/learn/modules/build-power-app-component/?WT.mc_id=ca-5902-cassieb)
- [Component Framework Manifest Docs](https://docs.microsoft.com/powerapps/developer/component-framework/manifest-schema-reference/?WT.mc_id=ca-5902-cassieb)
- [Import PCF Solution Docs](https://docs.microsoft.com/powerapps/maker/common-data-service/import-update-export-solutions/?WT.mc_id=ca-5902-cassieb)
- [Use PCF Component in Canvas App](https://docs.microsoft.com/powerapps/developer/component-framework/component-framework-for-canvas-apps)
- [Virtual control and platform feature](https://docs.microsoft.com/en-gb/power-apps/developer/component-framework/react-controls-platform-libraries)

