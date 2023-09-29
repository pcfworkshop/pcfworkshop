# 🚀 Lab 1: PCF Quick Start

Time to complete: **~35 minutes**

Welcome to this code-component (PCF) Deployment and Configuration lab - you'll be creating a field code component inside a codespace and running it using the test harness.

## 👉What you will learn

In this lab, you will go though the following tasks:

1. Creating a new browser profile.
2. Logging into the account you are going to use during the workshop.
3. Creating a developer environment & enabling Dataverse settings to allow PCF controls.
4. Creating a GitHub account (optional).
5. Creating a GitHub Codespace.
6. Connecting to the Power Platform using the Power Platform Command-Line Interface (CLI).
7. Initializing and building a PCF project.
8. Adding ESLint rules.
9. Implementing a Dynamic Height Text Box control.
10. Testing and debugging inside the test harness.

## ✅Task 1: Create a new browser profile (Microsoft Edge)

It's always good to have a separate browser profile for your work and for workshops like this. This way you can keep all of your credentials separate and not have to worry about logging out of your personal / work accounts.

1. Open **Microsoft Edge**.

1. Enter `edge://settings/profiles/multiProfileSettings` in the URL, and turn off **Automatic profile switching**.  
   ![image-20230918161107465](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918161107465.png)

1. Click on the profile icon (this may be on the top left or top right corner).  
   ![img](Lab%201%20-%20PCF%20Quick%20Start.assets/SNAGHTML1313c8a8.PNG)

1. It the bottom of the profile list, hover over **Other profiles** and then select **Set up new work profile**.  
   ![image-20230907165953488](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230907165953488.png)

   > [!IMPORTANT]
   >Select **Set up new work profile** not **Set up new personal profile**

1. Click **Add**.

   This will then open up a new browser window on your taskbar.

1. In the new browser window, select **Start without your data**.

1. Select either **Allow** or **Don't allow**, and then select **Confirm and start browsing**.

   Edge may prompt you to configure your new browser theme. If this happens, select System default, Light or Dark and select **Next**.

   > [!NOTE]
   >All the screenshots in these labs are using Dark mode.

1. Select **Finish**.

> [!IMPORTANT]
> Re-open these labs inside the new browser profile window so that any links will open in the correct profile.

## ✅Task 2: Log in to Power Apps

With the credentials that have been provided to you, log into the account you are going to use during the workshop.

1. In the new browser profile, navigate to [make.powerapps.com](https://make.powerapps.com)

> [!IMPORTANT]
> Make sure you use the new browser profile, instead of an existing profile.


2. On the sign-in screen, enter the email address that was provided to you and then click **Next**.  
   ![image-20230918162338665](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918162338665.png)

3. Then enter the password and click **Sign in**.

4. If you're prompted to stay signed in, check **Don't show this again**, and select **Yes**.

5. If asked to choose your region, select **United States** and select **Get started**.

   You should now be logged in and on the Power Apps Home Page.

## ✅Task 3: Create a developer environment

For this workshop, you will need a Dataverse environment. You can create up to 3 of these for free. Developer environments will be deleted after a period of inactivity.

### 👉Create environment by subscribing to the developer plan

You are required to subscribe to the Power Apps Developer Plan to create developer environments that gives you access to all of the Power Platform resources for development purposes. 

To create developer environments, you can create them in multiple ways:

1. Subscribing to the Power Apps Developer Plan.
1. Using the Power Platform Admin Center (PPAC)
1. Using the Power Platform CLI

In this workshop we will use option 1 because it will automatically assign a developer license to yourself, where as the other options do not.

1. Go to the [Power Apps Developer Plan](https://aka.ms/pp/devplan) page (use the Edge profile you created for this workshop).

1. Select the **Existing user? Add a dev environment** button:  
   ![image-20230918162814564](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918162814564.png)
   
1. Select the **Sign up for a Community Plan** link. 
   **IMPORTANT:** If you do not see the following page, ensure that you have opened the page in your workshop browser profile.  
   ![image-20230918162857761](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918162857761.png)
   
1. Leave the country as United States and select the **Accept** button.  
   ![image-20230918162939448](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918162939448.png)
   
1. After selecting **Accept**, a Power Platform developer environment will be created for you with the name `[User Name]'s Environment`. You will then be redirected to the maker portal. In here, you will see two things:
   1. An alert in the top-center that says 'This is a developer environment and not meant for production use'
   
   1. The environment picker at the top-right with your recently created environment `{User}'s Environment` selected.  
      ![image-20230918163144755](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918163144755.png)
   
      > [!NOTE]
      >
      > It will take a few minutes to create your environment so be patient!

### 👉Enable Power Apps Component Framework

1. Select the **Gear icon** on the top right of the window and then select **Admin center** link.  
   ![image-20230918163337586](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918163337586.png)

   > [!NOTE]
   > You can also select the 'kebab' menu from the environment picker and select **Go to admin center**.

1. Select **Environments** from the left navigation.

1. Select the **more ellipsis icon** against your Developer Environment, and then select the **Settings** menu item.  
   ![image-20230918163507111](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918163507111.png)

1. Expand the **Product section** and select the **Features** link.  
   ![image-20230918163718650](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918163718650.png)

1. Scroll down to the **Power Apps component framework for canvas apps**, and toggle the feature **On**.  
   ![image-20230918163827131](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918163827131.png)

1. Scroll down to the bottom of the page and select **Save**.  
   ![image-20230918163900007](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918163900007.png)

## ✅Task 4: Create a GitHub account

For this workshop, we are going to be using a **GitHub personal** account. If you already have a **GitHub personal** account, you can skip this task provided you have enough [codespace usage hours and storage space remaining]([Viewing your GitHub Codespaces usage - GitHub Docs](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/viewing-your-github-codespaces-usage#viewing-github-codespaces-usage-for-your-personal-account)) for the duration of the labs. 

> [!IMPORTANT]
> Each GitHub personal account comes with 120 hours and 15GB free per month which is plenty for these workshop labs.

1. Open [GitHub](https://github.com) in the browser session using the profile you created above.
2. Click on **Sign up** on the top right corner.
3. Enter your email address (Use a personal email address. Do not use your work address or the workshop account) and then click **Continue.**
4. Create a password and then click **Continue.**
5. Enter a username and then click **Continue**.
6. Select whether you want to receive product updates or not and then click **Continue.**
7. Solve the puzzle to verify your account and then click **Create account**.
8. Enter the code that was sent to your email address and then when you've navigated to the welcome screen, click **Skip personalization**.

You now have a GitHub account - ensure you are logged in as your GitHub account in the browser profile that you created earlier. 

## ✅Task 5: Create a Code Space

GitHub Codespaces is a cloud-based development environment that allows you to create and use cloud developer environments backed by high-performance compute. Codespaces use VSCode, including editor, terminal, debugger, version control, settings sync, and the entire ecosystem of extensions making it easy to author,edit and debug your code without installing anything locally.

1. Login into your GitHub account and navigate to [Your codespaces](https://github.com/codespaces) by selecting your profile picture on the top right and then **Your codespaces** from the drop down.  
   ![image-20230918164217929](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918164217929.png)

2. Underneath the **Blank** template, select **Use this template**.  
   ![image-20230918164337540](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918164337540.png)

3. The newly created codespace will open in a new window.

4. Following the prompts to customize the theme if you wish.

   > [!NOTE]
   >The screenshots in these labs use **Dark Modern** as the theme.
   
5. Close the **Welcome** tab.

6. Although there are multiple ways of opening codespaces, we will use the codespaces app rather than the browser or VSCode.

7. Install the codespace app by click the **Open app** button next to the address bar and then select **Install**.  
   ![image-20230918164609343](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918164609343.png)

8. The installed codespace will open in a new window and prompt you to **Pin to the taskbar** and **Pin to Start**. Select **Allow**.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911153608975.png" alt="image-20230911153608975" width="33%" />

9. This will install the codespace on your taskbar that you can use to return to your codespace at any point in the future.  
   ![image-20230911154028056](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911154028056.png)

10. If you do not use your codespace for a period of time, it will shut down so that you do not use up your free codespace credits that come with your account.


## ✅Task 6: Authorize PAC CLI

The Power Platform CLI allows us to perform many operations on the Power Platform. We will use it to quickly create a code component project using either a field or dataset template. 

### 👉Install the PAC CLI

1. Inside your codespace, Select **Extensions** icon from the **Activity bar** (`Ctrl+Shift+X`).
2. In the search bar, enter **Power Platform Tools**.
3. Select **Install**.  
   ![image-20230911160035459](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911160035459.png)
4. After a short wait, you will see the message `The pac CLI is ready for use in your VS Code terminal`:  
   ![image-20230918164844192](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918164844192.png)

### 👉Authorize the PAC CLI

1. Run the following command at the new terminal in your Code Space:

   ```bash
   pac auth create --deviceCode
   ```

   > [!NOTE]
   >If you see an error then close any existing terminals and open a new one using ```Ctrl+Shift+` ```
   
   ![image-20230918165140565](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918165140565.png)
   
1. Copy the https://microsoft.com/devicelogin link and paste it into the **browser profile window that you created earlier**. 

1. Copy the code, and paste it into the **Enter code** prompt and select **Next**.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918165249152.png" alt="image-20230918165249152" width="50%"/>

1. Select the Workshop User account that is Signed In. If you do not see it, then select **Use another account**, type in your workshop username and password, and click **Sign in**.

> [!NOTE]
>If you are using an environment other than your own developer environment, ensure you log in as an administrator on that environment when prompted. The privileges provided by these roles are needed to deploy any code components to Dataverse.

9. If you see a **Pick an account** screen, select your workshop user which should say *Signed In* next to it.

10. You will then see a page asking if you're trying to sign in to Power Platform CLI - pac.  
      <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230907170043668.png" alt="image-20230907170043668" width="50%" />

11. Click **Continue**
    You'll then see a prompt confirming that you have successfully signed in to Power Platform CLI - pac. Close the browser tab and return to your codespace.  
    <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230907170051259.png" alt="image-20230907170051259" width="50%" />

12. The Code space terminal should show the message **Authentication profile created** showing the workshop user you were provided.  
    ![image-20230918165614148](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918165614148.png)

13. At the terminal type `pac auth list`. You will see the new auth profile with an asterisk (*) next to it indicating that it is the currently selected profile. The profiles is created as **UNIVERSAL** meaning that it is not specific to any specific environment.  
    ![image-20230918165718962](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918165718962.png)

14. To select our developer environment, expand the Power Platform left panel. If you do not see the **UNIVERSAL** profile, hover over the AUTH PROFILES area and select **Refresh**.
    
    > [!IMPORTANT]
    > If you do not see the power platform extension logo as in the screenshot below, press `Ctrl + Shift + P`, and then type `Developer: Reload Window` and press `ENTER`.
    
      <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911160737771.png" alt="image-20230911160737771" width="33%" />

15. To select our developer environment, use the Star icon **Select Environment**. The Environment then should have a filled star next to it.  
    <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911160827182.png" alt="image-20230911160827182" width="33%" />

16. If you now run `pac auth list` you will see the URL of the environment you have selected listed. The asterisk (*) indicates that this is the currently selected auth profiles if you have multiple different profiles for different tenants. You can switch using `pac auth select --index`  
    ![image-20230908131802767](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230908131802767.png)

    > [!NOTE]
    > You can also select an environment by using
    >  `pac org select --envrionment <URL/ID/Unique Name/Partial Name>`

17. To ensure that you are connected to the correct environment, at the terminal type `pac org who`
    This will show the current connection and environment selected.  
    <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230908131340736.png" alt="image-20230908131340736" width="60%" />


## ✅Task 7: Initialize canvas app field code component project

We are creating a dynamic width text input box that will be bound to a single value, so we use the `pac pcf init` command to create a TypeScript project using the field template.

### 👉Initialize pcf project using pac pcf init

1. In the new terminal window created above, create a new component project by passing basic parameters using the command:

   ```bash
   pac pcf init --namespace SampleNamespace --name DynamicTextInput --template field --run-npm-install --outputDirectory /workspaces/lab01/DynamicTextInput
   ```

   or in short form:

   ```bash
   pac pcf init -ns SampleNamespace -n DynamicTextInput -t field -npm -o /workspaces/lab01/DynamicTextInput
   ```

   > [!NOTE]
   >The **namespace** is used to create a unique name for the control to prevent collisions with other controls of the same name. 
   > When deploying later, we will also provide a **solution publisher prefix** that will add an additional level of uniqueness that defines the solution publisher that owns the code component.
   
3. The above command also runs the `npm install` command for you:

   ```bash
   Running 'npm install' for you...
   ```

   This automatically downloads the project dependencies that are listed in the `package.json` file into the `node_modules` folder. This folder never needs to be checked in to code repositories since it will always be restored before the code is built. 

   > [!NOTE]
   > If you see any yellow warning text, this can safely be ignored.

4. Use **File** -> **Open Folder**, enter the path `/workspaces/lab01/DynamicTextInput/` and then select **OK**.  
   
   ![image-20230918170331378](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918170331378.png)
   
   ![image-20230918170437763](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918170437763.png)
   
5. Take a moment to look through the files created:  
   ![image-20230918170609201](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918170609201.png)

   - `package.json` - defines the modules required to build the code-component and the scripts that can be run to build/debug the code. The important modules are `pcf-scripts` and `pcf-start`. Note how these are set to always pick the latest version `^1` with the major version set to 1.
   - `DynamicTextInput\ControlManifest.Input.xml` - defines the metadata for the code component - including the properties that it exposes to the Power Apps runtime and any resources required. More information: [Manifest](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/manifest).
   - `DynamicTextInput\index.ts` - the class that will be instantiated when the code component is added to Power Apps, with the following key interface members:
     - `init` - used to initialize the component instance including any remote server calls. The context is provided that includes the root HTML DOM element that the code component will be added to.
     - `updateView` - called by Power Apps when any data is available to be passed into the component or if any dependent properties change.
     - `getOutputs` - called by Power Apps to get the value of any output/bound properties after the component has notified the framework by calling `notifyOutputChanged`.
     - `destroy` - called by Power Apps when the code component is removed from the DOM, so that it can clean up and release any resources it may be using.
       ![image-20230904153312663](C:\Users\ScottDurow\OneDrive\CRMUG\2023-10-01 MSPCC\PCF Workshop\labs\media\image-20230904153312663.png)
     - `DynamicTextInput\generated\ManifestTypes.d.ts`  - Automatic generated types from the `ControlManifest` to make it easier to work with the inputs and outputs defined. These types are re-generated with each build and should never be edited manually.
     - `DynamicTextInput.pcfproj`  - defines the project settings for the code component project that is used when build a solution.

### 👉Defining the code components Metadata using the Control Manifest

The code component that you will build in this lab will provide an `AutoHeightValue` property for a text input to solve the issue described https://powerusers.microsoft.com/t5/Power-Apps-Ideas/Text-Input-Control-auto-height-property-required/idi-p/101143. 
This is a very common request for code components from app makers.  
![Dynamic Height Text Box Canvas](Lab%201%20-%20PCF%20Quick%20Start.assets/Dynamic%20Height%20Text%20Box%20Canvas-1694733735093-5.gif)

Our code component will be simply bound to a string property that can be updated as the user edits the text box. The height will dynamically expand as the text is input and provided to the hosting app via the `AutoHeightValue`. This can be used in a canvas app to control the Y positions of other controls so that they accommodate the new height. In a model-driven app, this is not needed since the other controls will automatically re-flow to accommodate the height.

1. Locate the manifest at `DynamicTextInput\ControlManifest.Input.xml` and open inside the codespace editor. The [control](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/control) attributes will already contain the `namespace` and `name` of your component that was provided to `pac pcf init`.

2. Locate the `description-key` attribute of the `control` element, and change it to `DynamicTextInput_Desc`.

   ```xml
   <control namespace="SampleNamespace" constructor="DynamicTextInput" version="0.0.1" display-name-key="DynamicTextInput" description-key="DynamicTextInput_Desc" control-type="standard">
   ```

3. Replace the `property` definition that begins with `<property name="sampleProperty"` with the following:

   ```xml
   <property name="TextValue" display-name-key="TextValue" description-key="TextValue_Desc" of-type-group="strings" usage="bound"  />
   <property name="Font" display-name-key="Font" description-key="Font_Desc" of-type="SingleLine.Text" usage="input"/>
   <property name="FontSize" display-name-key="FontSize" description-key="FontSize_Desc" of-type="Whole.None" usage="input"/>
   <property name="AutoHeightValue" display-name-key="AutoHeightValue" description-key="AutoHeightValue_Desc" of-type="Whole.None" usage="bound" />
   <type-group name="strings">
     <type>SingleLine.Text</type>
     <type>SingleLine.TextArea</type>
     <type>Multiple</type>
   </type-group>
   ```

   > [!NOTE]
   >
   > 1. The `TextValue` property uses `of-type-group` to define the possible types that can be bound to this property. This is so that it can be bound to any of string type such as  `SingleLine.Text`. The use of  `of-type` for the other properties can only accept a single type.
   > 2. The `description-key` property will be used later to provide a text description inside a resource file. If the resource file is not included in the code-component, then the text in this property is used instead.
   > 3. Notice how the Font style properties  (`Font` & `FontSize`) are marked as `usage="input"`, where the `Text` and `AutoHeight` properties are `bound`. This is so that the Power Apps Component Framework knows that the font styles are only ever set by the maker, and not updated by the component itself.
   > 4. Canvas apps has the concept of `input`/`output` properties which allows implementing a pattern similar to the build-in canvas app controls where there is a Default value that is set as `input`, and a Text Value that is an `output`. Since this component must work for both model-driven and canvas apps, we use `bound` instead.

4. **Save** the changes and then use the following command at the terminal to build the component:

   ```bash
   npm run refreshTypes
   ```

The `refreshTypes` command is defined inside the `packages.json`.  
![image-20230918171250248](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918171250248.png)

An automatically generated file `DynamicTextInput\generated\ManifestTypes.d.ts` is added to your project. This is generated as part of the build process from the `ControlManifest.Input.xml` and provides the types for interacting with the input/output properties. You will see that the `IOutputs` interface only contains the properties that are set as `bound` or `output`.  
![image-20230918171112835](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918171112835.png)

> [!IMPORTANT]
>Do not modify the contents of the `generated` and `out` folders directly. They'll be overwritten as part of the build process with each build.

### 👉Dataset vs Field

You will notice that when you created the code component using `pac pcf init`, the field template provided controls the sample property added to the manifest. If you create a dataset code component, then in addition to `property` elements, then a sample `data-set` element is added. You can also add additional `data-set` elements to bind the code component to views in model-driven apps and tables/collections in canvas-apps. More information: [data-set element](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/manifest-schema-reference/data-set).

## ✅Task 08 - Adding additional resources

Our manifest contains references to resource string keys so that we can provide multiple language translations if required. Our code component will also use a `CSS` file for styling. These additional files must be referenced in the resources section.

1. Locate the `resources` element in the `DynamicTextInput\ControlManifest.Input.xml` file.

2. Replace with the following:

   ```xml
   <resources>
     <code path="index.ts" order="1"/>
     <css path="css/DynamicTextInput.css" order="1" />
     <resx path="strings/DynamicTextInput.1033.resx" version="1.0.0" />
   </resources>
   ```

   The final ControlManifest.Input.xml should look similar to:
   ```xml
   <?xml version="1.0" encoding="utf-8" ?>
   <manifest>
     <control namespace="SampleNamespace" constructor="DynamicTextInput" version="0.0.1" display-name-key="DynamicTextInput" description-key="DynamicTextInput_Desc" control-type="standard">
       <external-service-usage enabled="false">
       </external-service-usage>
   
       <property name="TextValue" display-name-key="TextValue" description-key="TextValue_Desc" of-type-group="strings" usage="bound" />
       <property name="Font" display-name-key="Font" description-key="Font_Desc" of-type="SingleLine.Text" usage="input"/>
       <property name="FontSize" display-name-key="FontSize" description-key="FontSize_Desc" of-type="Whole.None" usage="input"/>
       <property name="AutoHeightValue" display-name-key="AutoHeightValue" description-key="AutoHeightValue_Desc" of-type="Whole.None" usage="bound" />
       <type-group name="strings">
         <type>SingleLine.Text</type>
         <type>SingleLine.TextArea</type>
         <type>Multiple</type>
       </type-group>
   
       <resources>
         <code path="index.ts" order="1"/>
         <css path="css/DynamicTextInput.css" order="1" />
         <resx path="strings/DynamicTextInput.1033.resx" version="1.0.0" />
       </resources>
   
     </control>
   </manifest>
   
   ```

3. Right click on the `DynamicTextInput` folder, and select **New Folder** to create two folders to hold these resources:

   - `DynamicTextInput\css`
   - `DynamicTextInput\strings`  

   ![image-20230918171544601](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230918171544601.png)

4. Right click on the `css` folder, and select **New File**. Enter the file name `DynamicTextInput\css\DynamicTextInput.css` and enter the following content:

   ```css
   .DynamicTextInput textarea {
       padding: 4px;
       box-sizing: border-box;
       width: 100%;
   }
   
   .DynamicTextInput textarea:focus,
   .DynamicTextInput textarea:enabled:hover {
       border: 1px solid rgb(59, 59, 59);
   }
   ```

   These styles will style our component so that it has a hover & focus border highlight.

   > [!NOTE]
   >
   > 1. `box-sizing` is set to `border-box` so that when we measure the dynamic height it will include the border and padding.
   > 2. The `css` styles are all prefixed with `DynamicTextInput` so that they do not overlap with any other styles in Power Apps. The root container DIV that the code components are added to at run-time always is give a class name that matches the code component so that the cascading child rule can be used in this way.

5. `ResX` files contain name value pairs that are used to store translations/labels used by your component. To create a resource file, we can either create `resx` file manually and provide the xml content, or we can use an add-in for VS Code which will make this much easier. Inside VS Code select the Extensions tab (`Ctrl + Shift + X`) and search for the extension **ResX Editor** (https://marketplace.visualstudio.com/items?itemName=DominicVonk.vscode-resx-editor). Install this extension for ease of editing ResX files.

6. Right click on `strings`, and select **New File**. Create a new file called `DynamicTextInput.1033.resx`

7. Open this new file - it should open in the resource editor. **Note:** If you see a blank screen in the resx editor, restart the codespace.

8. Provide the following strings:

   | Name                    | Value                                                        |
   | ----------------------- | ------------------------------------------------------------ |
   | `DynamicTextInput`      | Dynamic Text Input                                           |
   | `DynamicTextInput_Desc` | Dynamic height text area                                     |
   | `TextValue`             | Text                                                         |
   | `TextValue_Desc`        | Text value bound to the text box                             |
   | `Font`                  | Font                                                         |
   | `Font_Desc`             | The name of the font to use - e.g. 'Open Sans'               |
   | `FontSize`              | Font Size                                                    |
   | `FontSize_Desc`         | The size of the font to use in pixels - e.g. 13              |
   | `AutoHeightValue`       | Auto Height                                                  |
   | `AutoHeightValue_Desc`  | The automatically sized height of the text box for use in Canvas Apps |

9. Alternatively you can simply right click on the `DynamicTextInput.1033.resx` file and select **Open With** -> **Text Editor** and paste in the following:

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <root>
     <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
       <xsd:import namespace="http://www.w3.org/XML/1998/namespace"/>
       <xsd:element name="root" msdata:IsDataSet="true">
         <xsd:complexType>
           <xsd:choice maxOccurs="unbounded">
             <xsd:element name="metadata">
               <xsd:complexType>
                 <xsd:sequence>
                   <xsd:element name="value" type="xsd:string" minOccurs="0"/>
                 </xsd:sequence>
                 <xsd:attribute name="name" use="required" type="xsd:string"/>
                 <xsd:attribute name="type" type="xsd:string"/>
                 <xsd:attribute name="mimetype" type="xsd:string"/>
                 <xsd:attribute ref="xml:space"/>
               </xsd:complexType>
             </xsd:element>
             <xsd:element name="assembly">
               <xsd:complexType>
                 <xsd:attribute name="alias" type="xsd:string"/>
                 <xsd:attribute name="name" type="xsd:string"/>
               </xsd:complexType>
             </xsd:element>
             <xsd:element name="data">
               <xsd:complexType>
                 <xsd:sequence>
                   <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1"/>
                   <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2"/>
                 </xsd:sequence>
                 <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1"/>
                 <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3"/>
                 <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4"/>
                 <xsd:attribute ref="xml:space"/>
               </xsd:complexType>
             </xsd:element>
             <xsd:element name="resheader">
               <xsd:complexType>
                 <xsd:sequence>
                   <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1"/>
                 </xsd:sequence>
                 <xsd:attribute name="name" type="xsd:string" use="required"/>
               </xsd:complexType>
             </xsd:element>
           </xsd:choice>
         </xsd:complexType>
       </xsd:element>
     </xsd:schema>
     <resheader name="resmimetype">
       <value>text/microsoft-resx</value>
     </resheader>
     <resheader name="version">
       <value>2.0</value>
     </resheader>
     <resheader name="reader">
       <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
     </resheader>
     <resheader name="writer">
       <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
     </resheader>
     <data name="DynamicTextInput" xml:space="preserve">
       <value>Dynamic Text Input</value>
       <comment/>
     </data>
     <data name="DynamicTextInput_Desc" xml:space="preserve">
       <value>Dynamic height text area</value>
       <comment/>
     </data>
     <data name="TextValue" xml:space="preserve">
       <value>Text</value>
       <comment/>
     </data>
     <data name="TextValue_Desc" xml:space="preserve">
       <value>Text value bound to the text box</value>
       <comment/>
     </data>
     <data name="Font" xml:space="preserve">
       <value>Font</value>
       <comment/>
     </data>
     <data name="Font_Desc" xml:space="preserve">
       <value>The name of the font to use - e.g. 'Open Sans'</value>
       <comment/>
     </data>
     <data name="FontSize" xml:space="preserve">
       <value>Font Size</value>
       <comment/>
     </data>
     <data name="FontSize_Desc" xml:space="preserve">
       <value>The size of the font to use in pixels - e.g. 13</value>
       <comment/>
     </data>
     <data name="AutoHeightValue" xml:space="preserve">
       <value>Auto Height</value>
       <comment/>
     </data>
     <data name="AutoHeightValue_Desc" xml:space="preserve">
       <value>The automatically sized height of the text box for use in Canvas Apps</value>
       <comment/>
     </data>
   </root>
   ```

10. **Save** the files.

## ✅Task 09 - Add the code 

We now add the TypeScript code for our component. TypeScript is similar to JavaScript and in fact is based on the most recent specifications of JavaScript. It has the advantage that it is statically typed and provides modern programming features that are not supported by JavaScript running inside the browser. When the code is built, it is 'transpiled' into JavaScript so that it can run. More information: [TypeScript and JavaScript](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#typescript-and-javascript)

### 👉Install ESLint

ESlint is a extension to TypeScript that ensures that our code conforms to a common set of rules to increase code quality and reduce errors. 

1. Inside your Code Space, Select **Extensions** icon from the **Activity** panel (`Ctrl+Shift+X`).

2. In the search bar, enter **ESLint** and install the extension that is published by **Microsoft**.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230914162341903.png" alt="image-20230914162341903" width="33%"/>

3. You can customise the linting rules that you use and configure some rules to cause a warning during build, and some to raise an error. More information: [Using eslint with code components](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#linting).

4. Locate the `.eslintrc.json` dotfile in the project, and change the `no-unused-vars` setting to be 1, and then **Save** the file. This will cause a warning when there are variables defined but not used. Setting this to the value of 2 would cause a build error instead of a warning.
   ```json
   "rules": {
         "no-unused-vars": 1
    }
   ```

5. Locate the file `DynamicTextInput\index.ts` - this TypeScript file defines the code component class that will be instantiated when it is used in a model-driven app or canvas app. Notice that the class name matches the `constructor` attribute in the `ControlManifest.Input.xml` file. If these do not match, then you will get an error loading the component at run-time inside Power Apps.

6. Notice that the `init` function now shows a warning since the context is defined but not used. This is an example of an ESLint warning.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230914162353015.png" alt="image-20230914162353015" width="67%"/>

### 👉(Optional) Install prettier and advanced ESlint rules

Only perform this step if you are already comfortable with VSCode and writing TypeScript.

1. At the terminal install additional ESlint plugins and rules using the following command:
   ```bash
   npm install  eslint@latest prettier@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-config-prettier@latest eslint-plugin-node@latest eslint-plugin-import@latest eslint-plugin-promise@latest eslint-plugin-prettier@latest eslint-plugin-sonarjs@latest --save-dev
   ```

2. Open the `.eslintrc.json` file and replace with the following:
   ```json
   {
     "env": {
       "browser": true,
       "es2021": true,
       "es6": true,
       "jest": true
     },
     "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended",
       "plugin:prettier/recommended",
       "prettier",
       "plugin:sonarjs/recommended"
     ],
     "parser": "@typescript-eslint/parser",
     "globals": {
       "ComponentFramework": true
     },
     "parserOptions": {
       "project": "./tsconfig.json"
     },
     "plugins": [
       "@typescript-eslint",
       "eslint-plugin-prettier",
       "eslint-plugin-promise",
       "sonarjs"
     ],
     "ignorePatterns": [
       "**/generated/*.ts"
     ],
     "rules": {
       "eqeqeq": [
         2,
         "smart"
       ],
       "prettier/prettier": [
         "error",
         {
           "endOfLine": "auto",
           "singleQuote": true,
           "printWidth": 120,
           "tabWidth": 4,
           "trailingComma": "all"
         }
       ],
       "arrow-body-style": "off",
       "prefer-arrow-callback": "off",
       "quotes": [
         "error",
         "single"
       ],
       "semi": [
         "error",
         "always"
       ]
     },
     "overrides": [
       {
         "files": [
           "*.ts"
         ],
         "rules": {
           "camelcase": [
             2,
             {
               "properties": "never"
             }
           ]
         }
       }
     ]
   }
   ```

   This configures ESLint to use the Prettier plugin so that we can format our code easily to conform to the ESLint rules.

   > [!IMPORTANT]
   > Do not install a prettier extension since it will conflict with the ESLint extension.
   
3. Create a new file at the same level as the `.eslintrc.json` named `.prettierrc.json` and enter the following contents:
   ```json
   {
       "semi": true,
       "trailingComma": "all",
       "singleQuote": true,
       "printWidth": 120,
       "tabWidth": 4,
       "endOfLine":"auto"    
   }
   ```

4. Open command pallet using `Ctrl + Shift + P` 

5. Type **ESlint**, and select **Restart ESLint Server**.

6. Open command pallet using `Ctrl + Shift + P` again.

7. Type **ESlint**, and select the settings gear icon next to the **Fix all auto-fixable Problems** command.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230914162414269.png" alt="image-20230914162414269" width="67%" />

8. In the Keyboard shortcuts window, select the + next to the **Fix all auto-fixable Problems** command.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230914162423184.png" alt="image-20230914162423184" width="67%"/>

9. Hold down `Ctrl + Alt + P` and then press `ENTER` to bind this command (or select a different command short cut of your choice).

10. Open the `index.ts` file and use the `Ctrl + Alt + P` command. You will see the formatting change to match the ESLint rules.

11. You will receive an error on the constructor line since it is empty. We can configure ESLint to ignore this error by selecting the error and selecting the light bulb or using `Ctrl + .`  -> **Disable @typescript-eslint/no-empty-function for this line**   
      <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230914162431919.png" alt="image-20230914162431919" width="67%" />

12. This adds a command that instructs ESLint to ignore that rule:  
    <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230914162440058.png" alt="image-20230914162440058" width="67%" />

13. At any time you can check the ESLint rules for the entire project by running the following command at the terminal:

    ```bash
    npm run lint
    ```

    You can attempt to fix all the fixable issues by running:

    ```bash
    npm run lint:fix
    ```

### 👉Add the code

1. Remove the empty `constructor() {}` line since we do not need it.

2. At the top of the `DynamicTextInput` class, add the following member fields:

   ```typescript
   private container: HTMLDivElement;
   private context: ComponentFramework.Context<IInputs>;
   private notifyOutputChanged: () => void;
   private height: number;
   private textarea: HTMLTextAreaElement;
   private defaultLoaded = false;
   ```

3. Inside the `init` function, add the following:

   ```typescript
   this.container = container;
   this.context = context;
   this.notifyOutputChanged = notifyOutputChanged;
   this.textarea = document.createElement("textarea");
   this.textarea.rows = 1;
   this.textarea.style.resize = 'none';
   this.textarea.style.overflowY = 'hidden';
   this.textarea.oninput = this.onTextAreaInput;
   this.textarea.onchange = this.onTextAreaChanged;
   this.container.appendChild(this.textarea);
   ```

   > [!NOTE]
   > 1. The key here is that the root HTML DOM Element is provided (`container`) so that we can append the text area (created using `document.createElement`) to, and then set its style.
   > 2. We also keep a reference to the `notifyOutputChanged` callback so that we can tell the Power Apps component framework when the output/bound properties have been updated. The framework will then make a call to `getOutputs` to get the new values.
   > 3. We register an `oninput` and `onchange` event handler so that we can dynamically resize the text area and get the new text value when it changes.
   > 4. Until we have defined `onTextAreaInput` and `onTextareaChanged` below, you'll get errors shown inside VSCode.

4. Directly under the `init` function, add the following code:

   ```typescript
   onTextAreaInput = (): void => {
   	this.autoSizeTextArea();
   }
   onTextAreaChanged = (): void => {
   	this.notifyOutputChanged();
   }
   autoSizeTextArea(): void {
   	this.textarea.style.height = 'auto';
   	const newHeight = (this.textarea.scrollHeight) + 'px';
   	const heightChanged = newHeight !== this.textarea.style.height;
   	this.textarea.style.height = newHeight;
   	if (heightChanged) { this.notifyOutputChanged(); }
   }
   ```

   The call-backs are responsible for telling the framework that there is a new text value and calculating the new dynamic height. If the height has changed, then `notifyOutputChanged` is also called so that new height can be retrieved via `getOutputs`.

   It is important to minimize calls to `notifyOutputChanged` so that the code component only triggers a change event when it is needed. This will prevent your code component from causing performance issues. More information: [Minimize calls to `notifyOutputChanged`](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#minimize-calls-to-notifyoutputchanged).

5. Locate the `updateView` function, add the following code:

   ```typescript
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
   ```

   The `updateView` function is called every time anything changes externally to the component, and it needs to be rendered. This could be because a bound/input/data-set property has changed, or the layout has been updated.

   > [!NOTE]
   > 1. The first part of this code detects if the control is disabled/read-only or is masked. Security controlled fields are only used in model-driven apps, but canvas code components can be set to disabled.
   > 2. When `updateView` is called by the framework, a font style may have been updated so we set these styles inside `updateStyle` (see below).
   > 3. The first time `updateView` is called, or if the `updatedProperties` contains `TextValue`, the text value should be provided to the text area, and the height automatically resized to accommodate. If the value is masked, we only show asterisks.


6. Just below the `updateView` function, add the `updateStyle` function to set the DOM styles to reflect the input properties of the code component.

   ```typescript
   private updateStyle(disabled: boolean): void {
   	const newStyle = {
   		fontFamily: this.context.parameters.Font.raw || "SegoeUI",
   		fontSize: this.context.parameters.FontSize.raw ? this.context.parameters.FontSize.raw + "px" : "13px"
   	};
   	const fontChanged = (this.textarea.style.fontFamily !== newStyle.fontFamily) 
   		|| (this.textarea.style.fontSize !== newStyle.fontSize);
   	if (fontChanged) {
   		this.textarea.style.fontFamily = newStyle.fontFamily;
   		this.textarea.style.fontSize = newStyle.fontSize;
   		this.autoSizeTextArea();
   	}
   	if (this.textarea.disabled !== disabled) {
   		this.textarea.disabled = disabled;
   	}
   }
   ```

7. Locate the `getOutputs` function and enter the following code:

   ```typescript
   const height = Number.parseInt(this.textarea.style.height);
   return {
       TextValue: this.textarea.value,
       AutoHeightValue: height,
   };
   ```

   This provides the output/bound properties back to the Power Apps component framework after `notifyOutputChanged` has been called. 

> [!NOTE]
>You will not get a call to `getOutputs` for every single called to `notifyOutputChanged` since the framework will only get the latest values approximately once every 100 milliseconds.

> [!IMPORTANT]
>If you've written client API scripts before in model-driven apps, you may be used to using the form context to update attribute values. Code components should never access this context. Instead, rely on `notifyOutputChanged` and `getOutputs` to provide one or more changed values. You don't need to return all bound properties defined in the `IOutput` interface, only the ones that have changed their value.

9. **Save** all of your edits.

## ✅Task 10 - Build and test using the test harness

The pcf project comes with a simple test harness that allows you to run and test your pcf component. It does not provide a full set of features but is good for simple debugging.

### 👉 Start the test harness

- Inside the codespace terminal (Use `Ctrl+'` to toggle visibility if you do not see a terminal panel) run the following command:
  ```bash
  npm start watch
  ```

  After a short build process, you will may see a popup block indicator in the top right. Select **Allows allow pop-ups and redirects** and **Done**.
  
  ![image-20230919101957312](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919101957312.png)
  
  This allows you to test your component in window that simulates the Power Apps runtime. As you type in the textbox, it will auto expand and you will see the `AutoHeightValue` property update in the right hand properties panel.   

  ![image-20230919102404203](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919102404203.png)
  
  You will also see the **Open in Browser** prompt. The codespace is hosting an externally accessible port (8181 by default) that is forwarded to the test harness running on the codespace. If you do not already see the browser window, you can use **Open in Browser** from this dialog.  
  ![image-20230919102202635](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919102202635.png)
  Changes made to any of the following component assets are automatically reflected in the test harness without having to restart it:
  
  1. Your typescript code.
  1. All of the resources listed in the `ControlManifest.Input.xml` file, for example the `css` and `resx` files.
  
  If you make changes to any of these files, you'll see a `Change detected` message and the browser will reload with the updated code.
  
  1. Try it out, by changing the default font size in the `updateStyle` method to `30px` and **saving** the file. This will output the following message at the terminal showing that the typescript has been re-transpiled and updated. The test harness will also automatically reload.  
   ![image-20230919102800983](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919102800983.png)
  
  1. Notice how there is now a badge against the PORTS tab. This indicates that the codespace has mapped a local port onto an externally accessible port and auto forwarded it to allow you to browser the test harness.  
  ![image-20230919102709301](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919102709301.png)

### 👉Common limitations when using the test harness

While the test harness is suitable for testing simple code components, the following scenarios may mean that the test harness cannot be used to test a more complex code component:

1. The [updatedProperties](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/updatedproperties) array is not populated when properties are changed via the test harness **Data Inputs** section.
2. Using features listed in the `feature-usage` section of the `ControlManifest.Input.xml`. For example, calling the `context.WebApi.*` methods will throw an exception from within the test harness.
3. Use of the [paging](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/paging), [sorting](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/sortstatus), and [filtering](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/filtering) APIs on datasets will throw an exception from within the test harness.
4. Use of complex datatype bindings that provide additional metadata such as choices and lookups. For choice columns, the test harness will give you three simple choices with minimal metadata.
5. Model-driven apps specifics such as field level security, read-only behavior, dataset selection API, and integration with the model-driven apps command bar.
6. Other context APIs such as [Navigation](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/navigation) and [Utility](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/utility) methods.

## ✅Task 11 - Debugging in the test harness

Try the following:

1. Inside the test-harness browser window, press `F12` or `Ctrl+Shift+I`

2. The first time you do this, you are presented with the dialog asking if you wish to open the Developer Tools. Check **Remember my decision** and select **Open DevTools**.  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911162439642.png" alt="image-20230911162439642" width="33%" />
   
3. You will now see the Developer tools in the right hand pane of the browser.

4. On the **Sources** tab, select **Open file** using the ellipses menu (`Ctrl+P`):  
   ![image-20230919103003598](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919103003598.png)
   
5. Type `index.ts` and press `Enter`. Make sure that the `index.ts` you are opening has `DynamicTextInput` in the file path. This will be important when you do the same task later on where there could be multiple controls loaded into the session.  
   ![image-20230919103045674](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919103045674.png)

6. You will see source the source code that looks very similar (but not identical) to your TypeScript source.
   More information on why there are differences: [ES6 vs ES5](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/debugging-custom-controls#es5-vs-es6).

7. Add a break-point inside `updateView` by clicking to the left of the line number:  
   <img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911162424744.png" alt="image-20230911162424744" width="67%" />

8. Make a change to the textbox - and the break point will be hit. You can now inspect the values in the context and parameters properties by hovering your mouse over them. Once you have finished, remove the breakpoint by toggling it off, and then press `F8` (or select the blue **Play** icon) to resume execution.  
   ![image-20230919103340588](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919103340588.png)

9. When you edit the value in the text box, the height will auto adjust, and you will see the value change in the Data Outputs section:  
   ![image-20230919103502131](Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230919103502131.png)

10. If you change the `TextValue` in the Data Inputs however, you will notice that the text value is not updated in the code component. This is because of the limitation listed above where the [updatedProperties](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/updatedproperties) array is not populated when properties are changed via the test harness **Data Inputs** section. To fully test our component, we will need to deploy it to Power Apps (you will do this in the next lab!).

11. If you use `Ctrl+P` in the Browser Developer Tools sources tab again, but this time open `DynamicTextInput.css` - you can edit the style to quickly test any changes to the HTML `CSS` that you need for your code component. Try changing the border to be red, and immediately see the result in the test harness where the hover border will now be red. Once you are happy with the new style, you can update the source in your codespace, and the browser will automatically re-load with the new style sheet.

More information: [Debugging a code component](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/debugging-custom-controls)

> [!IMPORTANT]
>Using `npm start` and `npm start watch` builds your code component optimized for development and debugging. This code would not normally be deployed to Microsoft Dataverse. More information: [Code Components Application Lifecycle Management](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-alm). In the next lab we will package the code component for importing into Microsoft Dataverse and select different build modes for development vs production.

## ✅Task 12 - Stop the test harness

To stop the test harness and remove the forwarded port, simply use `Ctrl + C` in the terminal that is watching for changes.  
<img src="Lab%201%20-%20PCF%20Quick%20Start.assets/image-20230911162352371.png" alt="image-20230911162352371" width="50%"/>

If you now refresh the test harness page, you will see the **HTTP 404 Not Found** error page.

## 🥳Congratulations!

Now that you have completed this lab you have learned how to create a code component (PCF) and test it using the test-harness. You understand the life-cycle of the methods that are called by the Power Apps component framework and how they can be used to render user a user interface and respond to events.

## 🌱Take it further...

If you have time, try adding a minimum and maximum height property to control the extent to which the control can grow/shrink in height.

1.  Add the properties to the manifest.
2. Use `refreshTypes` to re-generated the `ManifestTypes.d.ts`
3. Use the new properties to dynamically set the max and minimum height on the container DIV.
