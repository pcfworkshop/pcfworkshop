# 🚀 Lab 2: Deployment & Configuration

Time to complete: **~35 minutes**

Welcome to this code-component (PCF) Deployment and Configuration lab - you'll be creating a field code component that can be deployed to both canvas and model-driven apps.

## 👉What you will learn

- Deployment to Dataverse using `pac pcf push`.
- Building the solution.
- Configuring in model-driven apps and custom pages/canvas apps.
- Testing using Fiddler.
- Versioning strategies.

## 👉Pre-requisites 

For this tutorial you need to have completed the previous lab 'Code components (PCF) Quick Start'. If you did not completely finish the code built during that lab, you can use the code found at in this repo at `code\lab01\DynamicTextInput` as a starting point.

# ✅Task 01 - Understanding Build Modes

The `pac cli` command `pac pcf push` is used to deploy our code component to Dataverse as we develop it.

Ideally, you should only publish production builds of code components into Microsoft Dataverse. For larger code components, publishing a development build may result in the error [Web resource size is too large](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/issues-and-workarounds#web-resource-size-is-too-large). This is a common mistake and can cause sub-optimal deployments to production. During this lab we will learn how to redirect requests to a debug version of our code during development, and so you can update your `.pcfproj` file to always build in production mode when using `pac pcf push`. This is done by setting the property `PcfBuildMode` to production.

1. Open your codespace using the pinned icon on your task bar created before. If you cannot find this, inside the **[Your codespaces](https://github.com/codespaces)** GitHub pages, select the **...** more menu next to your codespace and select Open in **Open in browser**.  
   ![image-20230919104831112](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919104831112.png)
   Then select Open in App from the address bar.  
   ![image-20230919105216565](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919105216565.png)
   
2. Use **File** -> **Open folder**, and select the `DynamicTextInput` folder that was created during Lab 01.

3. Locate the file `DynamicTextInput.pcfproj` and add the `PcfBuildMode` element to the `DynamicTextInput` `PropertyGroup`. This will ensure than when we deploy the code component to Microsoft Dataverse using `pac pcf push`, it will be build using the production mode. 

   The `PropertyGroup` should then look similar to:

```xml
<PropertyGroup>
  <Name>DynamicTextInput</Name>
  <ProjectGuid>...</ProjectGuid>
  <OutputPath>$(MSBuildThisFileDirectory)out\controls</OutputPath>
  <PcfBuildMode>production</PcfBuildMode>
 </PropertyGroup>
```

![image-20230919105634828](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919105634828.png)

2. Save the File using `Ctrl + S`

3. You can build a version of your `bundle.js` manually to see the difference. Run the following at the terminal to create a production build.

   > [!IMPORTANT]
   >If you still have `npm start watch` running from the previous lab, you'll need to stop it using `Ctrl+C` at the terminal it is running from.
   
   ```shell
   npm run build -- --buildMode production
   ```
   
   > [!NOTE]
   >If you receive an error such as  ***Could not read package.json*** check that your terminal is in the correct folder that has the `DynamicTextInput.pcfproj` file.
   
   Locate the output at `out\controls\DynamicTextInput\bundle.js` and look at the code. Notice it is minified and does not contain any source maps that enable debugging in the browser `F12` developer tools.
   
   > [!NOTE]
   > You can ignore any ESLint errors
   
   ![image-20230919110207189](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919110207189.png)
   
4. Now run the following at the command line:

   ```shell
   npm run build
   ```

   Look again at the `bundle.js` and notice how the file is much larger using `eval` and comments. This version of the code should not be deployed but used purely for development/debug purposes.  
   ![image-20230919110312496](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919110312496.png)

# ✅Task 02 - Create a solution and publisher

1. Inside your Dataverse environment, ensure there's a publisher created with a prefix of `samples`.
   Open https://make.powerapps.com and **select your developer environment** using the Environment picker on the top right of the screen.

2. Select **Solutions**.  
   ![image-20230907164633344](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907164633344.png)
   
3. Create a new solution using **New Solution**.

4. Provide a **display name** & **name** (e.g. `SamplesPCF`)

5. Select **New publisher**.  
   ![image-20230907164645207](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907164645207.png)

6. Enter **Samples** as the **Display name** and **Name**. 

7. Enter **samples** as the **Prefix** and then select **Save**.  
   ![image-20230907164520489](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907164520489.png)
   Equally, this could be your own publisher name, provided you update the publisher prefix parameter in the call to `pac pcf push` below.
   More information: [Create a solution publisher](https://docs.microsoft.com/en-us/powerapps/maker/data-platform/create-solution#solution-publisher).
   
6. Select the newly created publisher.

7. Select **Create** to create the new solution.  
   ![image-20230907164607867](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907164607867.png)

8. Open the new Solution.

9. **Add Existing** -> **Table** -> **Review** -> **Next. **  
   ![image-20230907161450490](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907161450490.png)

   > [!NOTE]
   >The Review table is automatically added to Developer environments as a sample app called **Asset Checkout**.
   
10. On the next page, leave unchecked **Include all objects** or **Include table metadata**. Select **Add**.  
    ![image-20230907164334543](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907164334543.png)

11. You will now have a solution that contains only the **Review** table.
    Later we will use this to add our code component to the Review form.

# ✅Task 03 - Deploying to Microsoft Dataverse during testing and development

In the previous lab we used the test harness to debug the code component. This has several limitations and code components should always be deployed to Microsoft Dataverse to fully test. In some cases (e.g. when using advanced features such as the `WebApi` or complex component lifecycles), deploying and configuring inside Dataverse is the only way to test your component. 

## 👉Deploy your code component

In the previous lab you should have authorized the **Microsoft Power Platform CLI** against your environment so that you can push the compiled code component. If you have not completed this pre-requisite step - revisit Lab 01.

1. Ensure you are authorized and connected to the correct environment by running `pac org who`.

2. To deploy your code component, use the following at the terminal:

   ```bash
   pac pcf push --publisher-prefix samples
   ```

   The project will build and a temporary solution be create to deploy the code component.

3. Open [make.powerapps.com](https://make.powerapps.com) and navigate to **Solutions**. You should see a temporary solution named **PowerAppTools_samples** in your environment that was created as part of the push process. The `DynamicTextInput` code component will be added to this solution. You can move the code component into another solution later if you need to deploy as part of a solution. Since the component is being deployed in production mode, the built code is ready for deployment.  
   ![image-20230907172842870](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907172842870.png)

> [!IMPORTANT]
>When you create code-component you provide a namespace that is added to the control manifest file. This is used when building the code and will be included in the `bundle.js` generated output. The publisher prefix on the other hand is not referenced in the code but is used to control which solution publisher owns a code-component and cannot be changed after deployment. Makes sure you set the solution prefix to the one that you want to use to deploy your code component right from the start.

More information: [Code Component Application Lifecycle Management (ALM)](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-alm).  

## 👉Configure your code component on a model-driven form

1. Open [make.powerapps.com](https://make.powerapps.com) and select your **Development environment.**

2. Open your **SamplesPCF** solution. This is the samples solution you created above, not the one automatically created by `pac pcf push` that is called `PowerAppTools_samples`.  
![image-20230907173054708](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927144143760.png)   

3. Select the **Review** table -> **Forms** -> **Add existing form**.  
   ![image-20230927150017014](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927150017014.png)

4. Select the **Information** form of Form Type **Main**, and then select **Add**.  
   ![image-20230927150203440](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927150203440.png)

5. Open the **Information** form from the list of forms in your solution, and select **Components** -> **Get more components**.  
   ![img](Lab%202%20-%20Deployment%20and%20Configuration.assets/SNAGHTML28fe4c67.PNG)

6. Select **Built by others** -> **DynamicTextInput** -> **Add**.  
   ![image-20230907173523888](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907173523888.png)

7. Select the **Comments** field in the **General** tab.  
   ![image-20230927151215918](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927151215918.png)

8. Expand **Components** on the right Properties panel, select **+ Component**, then select **Dynamic Text Input**.   
   ![image-20230927151338890](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927151338890.png)

   > [!NOTE]
   >The name of the control here is show using the `resx` label rather than control name. This would be different depending on the language of the user.

10. Ensure that all the checkboxes are checked for **Show component on** and leave the other properties blank. You could choose to change the font and font size here, otherwise the control will use the model-driven App default font style.  
    ![image-20230927151535474](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927151535474.png)

11. Select **Done** -> **Save and Publish.**

12. Navigate back to the solutions root, and select **Apps** -> **Asset Checkout**.  
    ![img](Lab%202%20-%20Deployment%20and%20Configuration.assets/SNAGHTML68f06789.PNG)

13. In the **Asset Checkout** app, navigate to **Reviews**, and open a review record.

14. In the dropdown below the review name, ensure that the PCF Form is selected.  
    ![image-20230927150902885](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230927150902885.png)

15. You should now see your Dynamic Text Field code component enabled on the Comments fields. Enter some text and see how the height automatically resizes.  
    ![image-20230907174948983](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230907174948983.png)

16. If you have time, try configuring the form so that the field is above the Rating field to see the automatic reflow of the form, also change the font style and size using the control properties on the form configuration panel.

# ✅Task 04 - Adding to a canvas app

We can also test our code component inside a canvas app now that it is deployed. 

## 👉Ensure code components are enabled for your environment in canvas apps

This step should have have already been completed in Lab 01.

1. Navigate to https://admin.powerplatform.microsoft.com

   > [!NOTE]
   > You can also select the **settings 'gear'** menu in the top right of your Power Platform Environment and select **Admin centre**, or select the 'kebab' menu from the environment picker and select **Go to admin center**

2. Select your development environment.

3. Select **Settings** - > **Product** -> **Features**.

4. Ensure **Power Apps component framework for canvas apps** is toggled **On**.  
   <img src="Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908105246630.png" alt="image-20230908105246630" width="50%" />

5. Select **Save** (if setting changed).

## 👉Create a new Canvas App

We will create a canvas app and then add the code component to that page.

1. Navigate to https://make.powerapps.com -> **Solutions**.

2. Open your **SamplesPCF** solution. This is the samples solution you created above, rather than the one automatically created by `pac pcf push` that is called `PowerAppTools_samples`.

3. Inside the solution, select **New** -> **App** -> **Canvas app**.  
   ![image-20230908110010308](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908110010308.png)

4. Set the **App name** to be **Dynamic Text Input**, and select **Create**.  
   ![image-20230908110141525](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908110141525.png)

   If you see a welcome message you can check **Do not show mew this again** and select **Skip**.

5. Select **Setting** using the **cog icon**, select **Display** -> Uncheck **Scale to fit**.  
   ![image-20230908114213271](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908114213271.png)

   > [!IMPORTANT]
   >If you skip this step then the component will not render correctly due to the scaling that Power Apps applies to the HTML DOM.
   
6. Select the **Insert** left panel.

7. Select **Get more components** at the footer of the panel.  
   ![image-20230908110437845](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908110437845.png)

8. Inside the Import components pane, select the **Code** tab.

   > [!INOTE]
   >If you do not see the Code tab, revisit the **Ensure code components are enabled** step above.
   
9. Select the **Dynamic Text Input** component -> **Import**.  
   ![image-20230908113633249](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908113633249.png)

10. Under code components, you will now see your **Dynamic Text Input** component.  
    ![image-20230908113749464](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908113749464.png)

11. Drag the **Dynamic Text Input** component on to the Screen canvas.

12. Also, drag a **Button** component onto the Screen canvas, and set the `OnSelect` property to be.

    ```vb
    UpdateContext({ctxText:"Lorem
    ipsum
    dolor"});
    ```

    > [!NOTE]
    >The new lines in the string are important here so we can see the component dynamically set it's height.
    
    ![image-20230908114532663](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908114532663.png)
    
13. Set the `Text` of the Button to be `Set Value`

14. Select the **Dynamic Text Input** component, and locate the `TextValue` property in the right hand panel. Set the `Text` value to be `ctxText`.

15. Add a **Rectangle** to the Screen canvas and set the following properties:

      1. `Y = DynamicTextInput1.Y`
      2. `Height = DynamicTextInput1.AutoHeightValue`

16. **Play** the app (or press `F5`)

17. Select the **Button**, you should see the **Text Area** text populated to `Lorem ipsum dolor` and the height automatically calculated. The height of the rectangle should match the text area height since the it is set to the `AutoHeightValue` property:  
     ![image-20230908114832432](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908114832432.png)

18. If you type in the text area, the rectangle should resize accordingly:  
     ![image-20230908114940151](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908114940151.png)

19. **Save** & **Publish** you App.

# ✅Task 05 - Configuring local debugging

Once you have deployed your component to Microsoft Dataverse, normally with each change it would need to be re-deployed and published. This can be time consuming and will slow down the development process, so instead we use a web debugger **AutoResponder** to redirect the request for the code component files to a local development build without having to continuously deploy changes as you debug your code. This also allows you to debug against a non-development downstream environment without having to first deploy a development build.

## 👉Install Requestly

Requestly is a browser add-in that can intercept request for a specific server side files and re-direct to a local version. Fiddler can also do this - for more information on how to configure Fiddler see [Debugging Code Components](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/debugging-custom-controls).

1. Inside the E**dge browser profile you created in the previous lab**,  open a new tab and navigate to [edge://extensions](edge://extensions) 
2. Select **Get extensions for Microsoft Edge**.  
   ![image-20230908140232573](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908140232573.png)
3. In the **Edge Add-ons** page that opens, search for `Requestly`, and select **Get** -> **Add extensions**.  
   ![image-20230908140456197](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908140456197.png)
4. You **do not** need to sign in or create an account on the screen that opens, you can simply close the tab or select **Skip for now**.

## 👉Configure redirects

Now that Requestly is installed in your browser profile, we can create a request redirect for the code component.

1. Inside your codespace, if you do not have your test harness running, run `npm start watch` at the terminal to open the test harness page. Copy the URL that will look similar to `https://......-8181.app.github.dev`. This URL is needed below to redirect to when the code component files are requested from Power Apps.

2. Inside the **PORTS** tab of your codespace, select the `pcf-start` process forward port, right click and select **Port Visibility** -> **Public**. This should change the visibility to Public. This is needed so that the built code in your code space can be redirected to without a login redirect.  
   ![image-20230911165604744](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230911165604744.png)

   You can also select **Make Public** on the dialog that opens when you run `npm start watch`  
   ![image-20230919112811707](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919112811707.png)

   > [!NOTE]
   > The public URL is not guessable, but if you do not want to make it public then you can use Requestly installed on your local machine using VSCode rather than a codespace, or you can use [Fiddler as described in the PCF Documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/debugging-custom-controls#debugging-after-deploying-into-microsoft-dataverse). This technique is out of scope of this workshop.

3. With the Canvas App that you created above still open inside Power Apps Studio, press `Ctrl+Shift+I` to open Edge Developer Tools.

4. Open the Requestly extension by selecting the **puzzle piece icon** on the right of the address bar and selecting **Requestly**.  
   ![image-20230908143643889](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908143643889.png)

5. Select **Redirect requests**.  
   ![image-20230908143725161](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908143725161.png)

6. When prompted to create an account or login, select **Skip for now**.  
   ![image-20230908143843674](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230908143843674.png)

7. If you see a guided experience, then follow it or close it to get to the Get started page. Select **URL Rewrites** - **Redirect request**

8. Enter a rule name of `Dynamic Text Input PCF`

9. In the **If request** rule, change the `Equals` to `Matches (RegEx) ` and enter `/.*DynamicTextInput.*bundle\.js.*/g`

10. In the **Redirect to** section, set the URL to be the URL of your test harness that you coped in step 1 above, append `/bundle.js` on the end.
    E.g. `https://....app.github.dev/bundle.js`

11. Save the rule using the **Create rule** button on the top right.  
    ![image-20230911164721624](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230911164721624.png)

12. **Select My Rules** - > **New Rule** -> **Modify Headers**.  
    ![image-20230911163848161](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230911163848161.png)

13. Enter a name of **PCF Access Control Allow Origin**.

14. Enter **github.dev** in the **URL** **Contains** rule.

15. On the **Response Headers** tab, Select **+ Add Request Header**.

    > [!IMPORTANT]
    > Ensure you select the Response Header, instead of the default Request Headers.

16. Enter **Access-Control-Allow-Origin** as the **Request Header.**

17. Enter ***** as the **Value.**  

    ![image-20230911164322210](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230911164322210.png)

18. Save the rule using the **Create rule** button on the top right. This rule is needed to prevent CORS errors when loading the redirected scripts.

## 👉Make edits and refresh

1. Inside the **Power App**, with the **Developer Tools** still open, right click on the **Refresh** button -> **Empty cache and hard reload**. Follow the instructions to **Reload** & **Open app**.  
   ![image-20230919113352577](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919113352577.png)

2. After a short while, you will likely see a message that your app is read only because you were already editing it. You can select **Override** to start editing.  
   ![image-20230919113634500](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919113634500.png)

3. Inside the **Developer Tools**, use **Open File** (`Ctrl + P`) as before, but now you can now open the `index.ts`. You can add a breakpoint in a similar way to when using the test harness.

4. If you go back to your codespace and edit the `index.ts`, save, and refresh your browser, you will see the new file being reflected inside the browser without the need to re-publish. This is a very efficient way of developing code components. 

   > [!NOTE]
   > If you need to update the manifest in any way, you will need to re-deploy a new version of the code component using the technique below.

5. This configuration of Requestly only needs to be done once, provided you use the same codespace. A different codespace will have a different test harness URL and so will need different Requestly rules.

6. To stop the debug redirect, you can either disable the rules from inside Requestly, or you can pause Requestly by selecting it from the Extensions  (puzzle icon) menu on the tool bar of the browser.  
   ![image-20230919114133967](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919114133967.png)

> [!INOTE]
>
> If you see `Error loading control,` check the following:
>
> 1. You have the test harness running inside your codespace.
> 2. The redirect URL matches the test harness URL, with `/bundle.js` appended.
> 3. Check you have set the Port Visibility set to Public as described above.
>

# ✅Task 06 - Versioning strategies

Now that you've got the code component working inside Power Apps, you will eventually need to push a new version to Microsoft Dataverse so that you don't need to use Requestly or another web debugger. You will need to ensure the production version of the code is deployed.

Before you can use `pac pcf push`, you will need to ensure that the component manifest version is incremented so that Power Apps knows that there is a new version. This can be done in two ways:

## 👉Manually incrementing the version

1. Disable the Dynamic Text Input PCF rule from inside Requestly as described above by toggling the rule **Off**.  
   ![image-20230917161112057](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230917161112057.png)
   
3. Locate the `DynamicTextInput\ControlManifest.Input.xml` file inside your codespace.

4. Under the `control` element, increment the minor version of the `version` attribute. E.g. `0.0.1` -> `0.0.2`

5. Add a new property that will be included in the new version:

   ```xml
   <property name="MaxHeightValue" display-name-key="MaxHeightValue" description-key="MaxHeightValue_Desc" of-type="Whole.None" usage="input"/>
   ```

6. **Save** the manifest.

6. At the terminal, stop the test harness using `Ctrl + C` and use `push` as before:

   ```bash
   pac pcf push -pp samples
   ```

   > [!NOTE]
   >This is using the short form of `--publisher-prefix`.
   
8. **Refresh** the browser page of your model-driven app and a new version will be automatically loaded, however to provide any new configuration parameters you will need to edit the form that contains the code-component and re-publish.

8. To use the new version in your canvas app you will need to **re-open your app**. You will be prompted to upgrade your code component. Edit the app we created previously and you will see the prompt to upgrade the component. After selecting **Update**, the new version will be loaded into the app. Without performing this step, the app will continue to use the older version.  
   ![image-20230919114652844](Lab%202%20-%20Deployment%20and%20Configuration.assets/image-20230919114652844.png)

More information: [Code components application lifecycle management - Power Apps | Microsoft Docs](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-alm)

## 👉Automatically incrementing the version

You can perform the increment of the manifest automatically using the following at a new terminal in your codespace.

```bash
pac pcf version --strategy manifest
```

If you open the `ControlManifest.Input.xml` you will see the version increment. You will then need to push the new version as above. This is useful for automated build scripts that are running inside build pipelines, but is out of scope of this lab.

Try it out now, by running the above command and observing the `version` attribute incrementing. There are other strategies available that you learn more about: [pac pcf version](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/cli/reference/pcf-command)

# ✅Task 07 - Creating a deployment solution project

Once you have finished your code component and are ready to deploy, you can create a solution one of two ways:

- Add the code component that was deployed using `pac pcf push` to your own solution (provided it uses the same publisher prefix) and export that solution from Microsoft Dataverse. 
- Build a solution directly from the code using `pac solution init`. This technique will create a managed or unmanaged solution without the need for deploying the code component to Microsoft Dataverse. To use this option, follow the steps described in [Import components into model-driven apps in Microsoft Dataverse](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/import-custom-controls). This is the technique we will perform in this lab.

1. At the terminal use the following commands to create a solution project. This project can hold multiple PCF controls for deployment and also other customisations if required.

   ```bash
   pac solution init --publisher-name Samples --publisher-prefix samples --outputDirectory ../DynamicTextInputSolution
   
   cd ../DynamicTextInputSolution
   ```

2. Use `code . -r` to open the new project in your codespace.

3. Add a reference to the `DynamicTextInput` PCF project by using:

   ```
   pac solution add-reference --path ../DynamicTextInput
   ```

4. You can now build your solution as a managed solution ready for deployment using:
   ```
   dotnet build --configuration Release
   ```

   You will find the managed solution in the bin/Release folder.

More information: [Code component solution strategies](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-alm#code-component-solution-strategies)

# 🥳Congratulations!

Now that you have completed this lab you have learned how to deploy and configure code components (PCF) inside Microsoft Dataverse and how to use Requestly to speed up the debugging/deployment process during development.

# 🪴Take it further...

If you have time, try deploying your code components (and the apps that use them) as a managed solution into another Dataverse environment.