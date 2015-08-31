var kuzzle = Kuzzle.init("http://api.uat.kuzzle.io:7512");

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

roomId = kuzzle.subscribe("polygon", {term: {hello:1}}, function(error, response) {
    if(error) { console.error(error); }

    if ( (response.action === "create") || (response.action === "update") )
    {
    	console.log("subscribe :",response);
    	tempTheme = response._source.theme;
    }
    
});

kuzzle.get("polygon", myid, function(error, response) {
    
	// if error, means counter was never created, so create it
	//var generateTheme = 'theme'+Math.floor((Math.random() * 5) + 1);

    if(error) {
        console.error(error);

        kuzzle.create("polygon", {_id:myid, cpt: 0, hello: 1, theme: currentTheme}, true, function(error, response) {
		    if(error) {
		        console.error(error);

		        kuzzle.update("polygon", {_id:myid, cpt: 1, hello: 1, theme: currentTheme}, function(error, response) {
		        	if(error) {
		        		console.error(error);
		        	}

		        	setInterval(updateCount, 500);

		        });
		    }

		    if(!error) {
		    	console.log("create",response);

		    	setInterval(updateCount, 500);
		    }
		    
		});
    }
    
    // if no error, means counter exist, so use it & increment
    if(!error) {

		numberOfsubs = response._source.cpt;

		console.log(numberOfsubs);

    	kuzzle.update("polygon", {_id:myid, cpt: numberOfsubs+1, hello: 1, theme: currentTheme}, function(error, response) {
		    if(error) {
		        console.error(error);
		    }

		    console.log("update",response);

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

	kuzzle.count("polygon", {}, function(error, response) {
		if(error) {
		    console.error(error);
		}

		if (response.count <= 1) { 
			numberOfUsers = 1;
            if (!iSsceneInit) { sceneInit(); }

            toSwitch = false;
		} else {

			if (numberOfUsers != response.count) {
				
				numberOfUsers = response.count;
				console.log("count after change : "+numberOfUsers);
    			
    			toSwitch = true;
			}
		}

        if (toSwitch) {

            if (!iSsceneInit) { sceneInit(); }
            switchPolygon();

            console.log("switch to :"+numberOfUsers);
        }

        //console.log(response.count);

	});

	//console.log("count : "+numberOfUsers);d
}

window.onunload = function () {

	kuzzle.delete("polygon", myid, function(error, response) {
		if(error) {
		    console.error(error);
		}
		    
			//console.log(response);
		});

};

/*



*/









