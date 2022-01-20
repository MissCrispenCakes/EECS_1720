//Check if this is actually the Google search engine and not some other google site.
function isSearch(){
    const classname = document.getElementsByClassName("RNNXgb"); //Class present on one of the divs of the Google search bar.

    if(classname != undefined && classname != null)
        return true;
    else
        return false;
}

//Get URL of current page.
const url = window.location.href;

//Only run on Google domain.
if(url.includes(".google.") && isSearch()){
    //Initialization///////////////////////////////////////////////////////////

    let configuration = {
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
  
    };

    //Store defaults if nothing is stored.
    chrome.storage.sync.get(['configuration'], function(storedConfiguration) { 
        if('configuration' in storedConfiguration)
            configuration = storedConfiguration;
        else
            chrome.storage.sync.set({'configuration': configuration}, function(){});

        modifySearchResults(configuration["configuration"]);
    });
}


////////////////////////////////////////////////////////////////////////


//Receive data from popup.js////////////////////////////////////////////

chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage(message, sender, response){
    modifySearchResults(message["configuration"]);
}

/////////////////////////////////////////////////////////////////////////


//Main Function//////////////////////////////////////////////////////////

function modifySearchResults(configuration){

    //Remove arrows at the end of urls////////////////////////////////////
    if(configuration.removeArrow || configuration.removeUrl){
        //Remove arrow.
        removeElements(".B6fmyf", 0);
        //Remove arrow from ad.
        removeElements(".e1ycic", 0);
        //Remove 3 dots if present instaed of arrow.
        removeElements(".D6lY4c", 0);
        removeElements(".rIbAWc", 0);
    }

    //Color Url////////////////////////////////////////////////////////////////
    if(configuration.colorUrl)
        setUrlColor(configuration.urlColor);

    //Move Url////////////////////////////////////////////////////////////////
    if(configuration.removeUrl){
       //Remove url and icon.
        removeElements(".TbwUpd", 0);
        //Remove url and icon on the litle pages thingy that appears.
        removeElements(".qdrjAc", 0);

        //Decrease distance between results.
        decreaseResultDistance("TbwUpd"); //Normal results.  
    }

    //Remove Widgets///////////////////////////////////////////
    if(configuration.twitterWidget)
        removeElements(".otisdd", 2);
    
    if(configuration.searchWidget)
        removeElements("#botstuff", 0);

    if(configuration.askWidget){
        removeElements(".JolIg", 4);
        removeElements(".Wt5Tfe", 2);
    }
        
    if(configuration.sideBarWidget){
        removeElements(".liYKde", 1);
        removeElements(".Lj180d", 6);
    }

    if(configuration.mapsFindResultsOnWidget)
        removeElements("#i4BWVe", 1);

    if(configuration.mapsWidget){
        removeElements(".AEprdc", 1);
        removeElements(".kqmHwe", 1);
    }

    //Images next to/in some search results
    if(configuration.images){
        ApplyToClass("SD80kd", function(element){
            element.style.display = "none";
        });

        ApplyToClass("FxLDp", function(element){
            element.style.padding = "0";
        });

    }

}


////////////////////////////////////////////////////////////////////////////////


//Search results modification functions/////////////////////////////////////////

function setUrlColor(urlColor){
    if(urlColor != ""){
        let listOfElementLists = [
            document.getElementsByClassName("iUh30")//, //url part
            //document.getElementsByClassName("eipWBe"); //urn part
        ]

        //Set the text color for each element.
        forEachDoThis(listOfElementLists, function(element){
            element.style.color = urlColor;
        });
    }
}

function decreaseResultDistance(className){
    elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++){
        br = elements[i].parentNode.getElementsByTagName('br');
        if(br.length != 0)
            br[0].parentNode.removeChild(br[0]);
    }
}

////////////////////////////////////////////////////////////////////////////////



//Utils/////////////////////////////////////////////////////////////////////////

function removeElements(name, parentNum){
    if(name[0] == '.'){
        name = name.replace('.', '');
        const elements = document.getElementsByClassName(name);

        for (let i = 0; i < elements.length; i++){
            let node = getParentNode(elements[i], parentNum);
            node.style.display = 'none';
        }
    }else if(name[0] == '#'){
        name = name.replace('#', '');

        const element = document.getElementById(name);

        if(element != null)
            getParentNode(element, parentNum).style.display = 'none';
    }else{
        throw "Undefined element!";
    }
}

function getParentNode(element, parentNum){
    let parent = element;

    for(let i = 0; parentNum > i; i++)
        parent = parent.parentNode

    return parent;
}

function ApplyToClass(className, delegate){
    let elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++)
        delegate(elements[i]);
}

function forEachDoThis(listOfElementLists, delegate){
    for(let elementList of listOfElementLists){
        for(element of elementList){
            delegate(element);
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////