var kuzzle = new Kuzzle("http://api.uat.kuzzle.io:7512");

var roomId;
var numberOfsubs = 0;
var numberOfUsers = 1;

if (!localStorage.getItem("myid")) {
	localStorage.setItem("myid", new Date().getTime());
}

var myid = localStorage.getItem("myid");

var tempTheme = null;
var iSsceneInit = false;
var module = new Protracker();
module.setrepeat(true);

// --------------------------- --------------------------
// --------------------------- --------------------------

roomId = kuzzle.subscribe("polygon", {term: {hello:1}}, function(response) {
    if(response.error) { console.error(response.error); }

    if ( (response.action === "create") || (response.action === "update") )
    {
    	console.log("subscribe :",response);
    	tempTheme = response.body.theme;
    }

    
});

kuzzle.get("polygon", myid, function(response) {
    
	// if error, means counter was never created, so create it
	//var generateTheme = 'theme'+Math.floor((Math.random() * 5) + 1);

    if(response.error) {
        console.error(response.error);

        kuzzle.create("polygon", {_id:myid, cpt: 0, hello: 1, theme: currentTheme}, true, function(response) {
		    if(response.error) {
		        console.error(response.error);

		        kuzzle.update("polygon", {_id:myid, cpt: 1, hello: 1, theme: currentTheme}, function(response) {
		        	if(response.error) {
		        		console.error(response.error);
		        	}

		        	setInterval(updateCount, 500);

		        });
		    }

		    if(!response.error) {
		    	console.log("create",response);

		    	setInterval(updateCount, 500);
		    }
		    
		});
    }
    
    // if no error, means counter exist, so use it & increment
    if(!response.error) {

		numberOfsubs = response.result._source.cpt;

		console.log(numberOfsubs);

    	kuzzle.update("polygon", {_id:myid, cpt: numberOfsubs+1, hello: 1, theme: currentTheme}, function(response) {
		    if(response.error) {
		        console.error(response.error);
		    }

		    console.log("update",response.result);

		    setInterval(updateCount, 500);
		});
    }
});

function updateCount() {

	var toSwitch = false;

	if ( tempTheme && (currentTheme != tempTheme) ) {
		console.log("theme change from "+theme+" to "+tempTheme);
		
		currentTheme = tempTheme;
    	theme = themeArray[currentTheme];

    	toSwitch = true;
    }

	kuzzle.count("polygon", {}, function(response) {
		if(response.error) {
		    console.error(response.error);
		}

		if (response.result.count <= 1) { 
			numberOfUsers = 1;
            if (!iSsceneInit) { sceneInit(); }

            toSwitch = false;
		} else {

			if (numberOfUsers != response.result.count) {
				
				numberOfUsers = response.result.count;
				console.log("count after change : "+numberOfUsers);
    			
    			toSwitch = true;
			}
		}

        if (toSwitch) {

            if (!iSsceneInit) { sceneInit(); }
            switchPolygon();

            console.log("switch to :"+numberOfUsers);
        }

        //console.log(response.result.count);

	});

	//console.log("count : "+numberOfUsers);d
}

window.onunload = function () {

	kuzzle.delete("polygon", myid, function(response) {
		if(response.error) {
		    console.error(response.error);
		}
		    
			//console.log(response.result);
		});

};

/*



*/









