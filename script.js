const {Builder, By, until} = require("selenium-webdriver");
const envy = require('envy')
const credentials = envy()

// Reset every day with desired dates and times
let todayDate = "Monday, March 22, 2021";
let reservationDate = "Wednesday, March 24, 2021";
let reservationStartTime = "17:00";
let reservationEndTime = "17:45";


(async function myFunction() {
    // instantiating WebDriver, opening a browser window, and navigating to the Buildingsite website
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://auth-525w52residents.buildinglink.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dbl-web%26response_mode%3Dform_post%26response_type%3Dcode%2520id_token%26scope%3Dopenid%2520profile%2520groups%2520buildinglink%2520offline_access%26state%3DOpenIdConnect.AuthenticationProperties%253D0Sp6lqKDpPG5LGVgMUOtsvc_eWEwznjSQjuFkxSRzVjoDcJ9N3fAGCAsgganoPMK0YNvMSGPLxYx2NBkI7PTL_fpoB_BqQJ1oDEp0s9gObwAsdehmiMIPBU-FZNHi4mHJqxs_XuqFkANDHLrTh8nV2h57lQLiyXAuAsQRpenQJg1sw1MezyJ5k3lW43K98rgNB02ibNmwRqHh71k9OFu0g%26nonce%3D637461910061543653.OTU3ZDFlMTUtMjY3OC00ZjY5LWFiZWYtZjUxNDZlOGJkMjIxNTU5Mzk3N2MtMzFjNy00MThlLTlhNDktNzE1NzkxOWI4NjMz%26returnUrl%3Dhttps%253A%252F%252F525w52residents.buildinglink.com%252FV2%252FGlobal%252FOidc%252FLogin.aspx%253FReturnUrl%253D%26redirect_uri%3Dhttps%253A%252F%252F525w52residents.buildinglink.com%252Fv2%252Foidc-callback%26x-client-SKU%3DID_NET461%26x-client-ver%3D5.4.0.0");

    // assign username, password, and login buttons
    let userName = driver.findElement(By.id("Username"));
    let passWord = driver.findElement(By.id("Password"));
    let loginButton = driver.findElement(By.id("LoginButton"));
    await userName.sendKeys(credentials.email);
    await passWord.sendKeys(credentials.password);
    loginButton.click();

    // function gets repeatedly executed until return value is truthy, that is until button is loaded
    await driver.wait(until.elementLocated(By.id("ctl00_ContentPlaceHolder1_RadDock15_C_ctl01_PanelResources"))).then(element => {
        element.click();
    })

    // navigate to reservation of public facilities
    await driver.wait(until.elementLocated(By.id("ctl00_ContentPlaceHolder1_NewReservatrionButton"))).then(element => {
        element.click();
    })

    // select gym floor 1 to navigate to reservation page
    await driver.wait(until.elementLocated(By.id("ctl00_ContentPlaceHolder1_AmenitiesDataList_ctl11_SelectAmenityLink"))).then(element => {
        element.click();
    })

    // wait until new page is fully loaded
    await driver.wait(until.elementLocated(By.css(`[title="${todayDate}"]`)));


    // wait for new day to become available
    await driver.wait(function() {
        driver.navigate().refresh();
        return driver.findElements(By.css(`[title="${reservationDate}"]`))
            .then(elements => elements.length === 1)
    })

    // find newly available day and click on it
    await driver.findElement(By.css(`[title="${reservationDate}"]`)).click();

    // wait for spinner to appear and disappear
    await waitForSpinnerDiv();

    // find and click on start-time box
    await driver.findElement(By.id("ctl00_ContentPlaceHolder1_StartTimePicker_dateInput")).click();

    // click on label with desired start time
    await driver.findElement(By.xpath(`//a[contains(text(),"${reservationStartTime}")]`)).click();

    await waitForSpinnerDiv();

    // find and click on end-time box
    await driver.findElement(By.id("ctl00_ContentPlaceHolder1_EndTimePicker_dateInput")).click();

    // click on desired end-time
    await driver.findElement(By.xpath(`//a[contains(text(),"${reservationEndTime}")]`)).click();

    // find and click on waiver tick-box
    await driver.findElement(By.id("ctl00_ContentPlaceHolder1_liabilityWaiverAgreeCheckbox")).click();

    // find and click on submit button
    await driver.findElement(By.css("#ctl00_ContentPlaceHolder1_FooterSaveButton .b-t")).click();

    // supporting function that makes the program wait for the spinner div to appear and eventually disappear
    async function waitForSpinnerDiv() {
        await driver.findElements(By.id("ctl00_MasterRadAjaxLoadingPanelctl00_ContentPlaceHolder1_DateSelectionPanel"))
            .then(() => console.log("Spinner located"))
            .catch(error => console.log("Spinner not located\n\n" + error));

        await driver.wait(until.stalenessOf(driver.findElement(By.id("ctl00_MasterRadAjaxLoadingPanelctl00_ContentPlaceHolder1_DateSelectionPanel"))));
    }
})()
