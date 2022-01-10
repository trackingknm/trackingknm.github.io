window.ready = function () {
	
	var coffeNav = document.querySelectorAll('div.btn-ar > a > .col-auto.pr-0');

	if(coffeNav != undefined){

		for (var i = 0; i < coffeNav.length; i++) {
			
			coffeNav[i].onclick = function () {
				var navigationAttr = {};
				
				//console.log("Navigation "+JSON.stringify(navigationAttr));

				gtmDataObject.push({
					event : "customEvent",
					eventCategory : "User Engagement",
					eventAction : "Navigation - Welcome to Nespresso",
					eventLabel: "Let's get started - "+this.textContent
				});
			}

		}
	}
	
	var wellNessNav = document.querySelectorAll('.feat-ar > .f-tc > .center-ct > .px-3 >div > .btn-01.med');

	if(wellNessNav != undefined){
		for (var i = 0; i < wellNessNav.length; i++) {
		   wellNessNav[i].onclick = function () {
			console.log("Tester "+this.textContent)
			var navigationAttr = {};

			//console.log("Navigation "+JSON.stringify(navigationAttr));

			gtmDataObject.push({
				event = 'customEvent',
				eventCategory = "User Engagement",
				eventAction = "Navigation - Welcome to Nespresso",
				eventLabel= "Welcome to Nespresso - "+this.textContent
			});

		   }
		}
	}
}

/*window.onload=function(){

var coffeNav = document.querySelectorAll('div.btn-ar > a > .col-auto.pr-0');

if(coffeNav != undefined){

	for (var i = 0; i < coffeNav.length; i++) {
	   coffeNav[i].addEventListener("click", function() {//console.log("Tester")
			//console.log("Tester "+this.textContent)
			var navigationAttr = {};
			
			//console.log("Navigation "+JSON.stringify(navigationAttr));

			gtmDataObject.push({
				event : "customEvent",
				eventCategory : "User Engagement",
				eventAction : "Navigation - Welcome to Nespresso",
				eventLabel: "Let's get started - "+this.textContent
			});
	   
	   });
	}
}

var wellNessNav = document.querySelectorAll('.feat-ar > .f-tc > .center-ct > .px-3 >div > .btn-01.med');

if(wellNessNav != undefined){
	for (var i = 0; i < wellNessNav.length; i++) {
	   wellNessNav[i].addEventListener("click", function() {console.log("Tester")
			console.log("Tester "+this.textContent)
			var navigationAttr = {};
			
			//console.log("Navigation "+JSON.stringify(navigationAttr));

			gtmDataObject.push({
				event = 'customEvent',
				eventCategory = "User Engagement",
				eventAction = "Navigation - Welcome to Nespresso",
				eventLabel= "Welcome to Nespresso - "+this.textContent
			});
	   
	   });
	}
}

}
*/
