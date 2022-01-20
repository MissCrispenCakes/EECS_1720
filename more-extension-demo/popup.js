window.addEventListener('load', (event) => {
    //Initialization////////////////////////////////////////////////////
    chrome.storage.sync.get(['configuration'], function(configuration) { 
        setUI(configuration["configuration"]);
    });

    ////////////////////////////////////////////////////////////////////

    //Events////////////////////////////////////////////////////////////

    ///////////////////////

    //Checkbox events//////////////////////
    document.getElementById("removeArrowCheckBox").addEventListener("change", event =>{
        changeConfig("removeArrow", event.target.checked);
    });

    document.getElementById("removeUrlCheckBox").addEventListener("change", event =>{
        changeConfig("removeUrl", event.target.checked);
    });


    document.getElementById("colorUrlCheckBox").addEventListener("change", event =>{
        changeConfig("colorUrl", event.target.checked);
    });

    document.getElementById("urlColorSelection").addEventListener("change", event =>{
        changeConfig("urlColor", event.target.value);
    });


    document.getElementById("twitterWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("twitterWidget",event.target.checked);
    });

    document.getElementById("searchWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("searchWidget",event.target.checked);
    });

    document.getElementById("askWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("askWidget",event.target.checked);
    });

    document.getElementById("sideBarWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("sideBarWidget",event.target.checked);
    });

    document.getElementById("mapsFindResultsOnWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("mapsFindResultsOnWidget", event.target.checked);
    });

    document.getElementById("mapsWidgetCheckBox").addEventListener("change", event =>{
        changeConfig("mapsWidget",event.target.checked);
    });


    document.getElementById("imagesCheckBox").addEventListener("change", event =>{
        changeConfig("images", event.target.checked);
    });

    
    //Button///////////////
    document.getElementById("defaultSettings").addEventListener("click", restoreDefaultConfig);

    function restoreDefaultConfig(){
        const defaultConfiguration = {
            "configuration":{

                "removeArrow": false,
                "removeUrl": false,

                "colorUrl": false,
                "urlColor": "#f530ff", //green, etc
                
                "twitterWidget": false,
                "searchWidget": false,
                "askWidget": false,
                "sideBarWidget": false,         
                "mapsFindResultsOnWidget": false,                
                "mapsWidget": false,
                
                "images": false
            }
        }

        sendToProgramJS(defaultConfiguration);

        setUI(defaultConfiguration["configuration"]);

        chrome.storage.sync.set({'configuration': defaultConfiguration["configuration"]}, function(){});
    }

    ///////////////////////
    
    //Functions////////////////////////////////////////////////////////////

    function setUI(configuration){
        document.getElementById("removeArrowCheckBox").checked = configuration.removeArrow;
        document.getElementById("removeUrlCheckBox").checked = configuration.removeUrl;
        
        document.getElementById("colorUrlCheckBox").checked = configuration.colorUrl;
        document.getElementById("urlColorSelection").value  = configuration.urlColor;

        document.getElementById("twitterWidgetCheckBox").checked = configuration.twitterWidget;
        document.getElementById("searchWidgetCheckBox").checked = configuration.searchWidget;
        document.getElementById("askWidgetCheckBox").checked = configuration.askWidget;
        document.getElementById("sideBarWidgetCheckBox").checked = configuration.sideBarWidget;
        document.getElementById("mapsFindResultsOnWidgetCheckBox").checked = configuration.mapsFindResultsOnWidget;
        document.getElementById("mapsWidgetCheckBox").checked = configuration.mapsWidget;
        
        document.getElementById("imagesCheckBox").checked = configuration.images;

    }

    function changeConfig(key, value){
        chrome.storage.sync.get(['configuration'], function(configuration) { 
            configuration["configuration"][key] = value;

            chrome.storage.sync.set({'configuration': configuration["configuration"]}, function(){});

            sendToProgramJS(configuration);
        });
    }

    function sendToProgramJS(payload){
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, payload);
        });
    }

    //////////////////////////////////////////////////////////////////////
});