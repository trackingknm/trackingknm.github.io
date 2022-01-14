window.onload = function () {
	console.log("Windiw loaded");
	
	var coffeNav = document.querySelectorAll('div.btn-ar > a > .col-auto.pr-0');

	if(coffeNav != undefined){

		for (var i = 0; i < coffeNav.length; i++) {
			
			coffeNav[i].onclick = function () {
				console.log("click ff")
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
				event : 'customEvent',
				eventCategory : "User Engagement",
				eventAction : "Navigation - Welcome to Nespresso",
				eventLabel: "Welcome to Nespresso - "+this.textContent
			});

		   }
		}
	}
	
	//registration tracking
var registerButton = document.querySelector("button#validate-privilege");

if(typeof(document.querySelector('button#validate-privilege')) != 'undefined' && document.querySelector('button#validate-privilege') != null){


    registerButton.onclick = function(){
  	var registerName = document.querySelector("input[name='phone']").value;
  	var registerPassword = document.querySelector("input[name='email']").value;
      
  	if(registerName != '' && registerPassword != ''){
    		gtmDataObject.push({
      		  'event':'customEvent',
      		  'eventCategory':'Registration',
      		  'eventAction':'Initiate Registration',
      		  'eventLabel':'Full Fill the Fields'
    		});
       

   	}else if(registerPassword === '' || registerPassword === '') {
     		gtmDataObject.push({
        	 'event':'customEvent',
        	 'eventCategory':'Registration',
        	 'eventAction':'Initiate Registration',
        	 'eventLabel':'Not Completed Fill'
      		});   
   	} 
    }	
}

var validationRegisterForm = [];



var confirmButtonRegistration = document.querySelector('#form-validate > .registration__footer > div.actions-toolbar > div.primary >button')
if(confirmButtonRegistration != null){
confirmButtonRegistration.onclick =  function(){  
	if( document.querySelector("#firstname").value != "" &&
	document.querySelector("#lastname").value != "" && document.querySelector("#password").value != "" && 
	document.querySelector("#email_address").value != "" && document.querySelector("#mobile_phone").value != "" &&
	validationRegisterForm.indexOf(3) === -1 && document.referrer != ""){
      		gtmDataObject.push({
        	   'event':'customEvent',
        	   'eventCategory':'Registration',
        	   'eventAction':'Sucesfull Registration',
        	   'eventLabel':'Full Fill the Fields'
        	});
      		validationRegisterForm.push(3);

	}else if(  document.querySelector("#firstname").value != "" &&
	document.querySelector("#lastname").value != "" && document.querySelector("#password").value != "" && 
	document.querySelector("#email_address").value != "" && document.querySelector("#mobile_phone").value != "" &&
	validationRegisterForm.indexOf(3) === -1 && document.referrer == ""){

 		gtmDataObject.push({
        	   'event':'customEvent',
        	   'eventCategory':'Registration',
                   'eventAction':'Sucesfull Registration',
                   'eventLabel':'Full Fill the Fields - Reload Page'
      		});
        	validationRegisterForm.push(3);

	}else if( document.querySelector("#firstname").value == "" ||
	document.querySelector("#lastname").value == "" || document.querySelector("#password").value == "" || 
	document.querySelector("#email_address").value == "" || document.querySelector("#mobile_phone").value == "" ){
  
   		gtmDataObject.push({
        		'event':'customEvent',
        		'eventCategory':'Registration',
        		'eventAction':'Sucesfull Registration',
        		'eventLabel':'Not Completed Fill'
      		});

	}		
 }
}

if(document.querySelector('#createaccount-activation-form > div#createaccount-activation-content > div.block-active-privilege > div.row-up >button') != null){
  var buttonAuth = document.querySelector('#createaccount-activation-form > div#createaccount-activation-content > div.block-active-privilege > div.row-up >button')
  buttonAuth.onclick = function(){  console.log("running click")
      if( document.querySelector("#email_otp").value != "" && validationRegisterForm.indexOf(1) === -1 && document.referrer != ""){
           gtmDataObject.push({
              'event':'customEvent',
              'eventCategory':'Registration',
              'eventAction':'Verification Registration',
              'eventLabel':'Full Fill the Fields'
           });
           validationRegisterForm.push(1);
      }else  if( document.querySelector("#email_otp").value != "" && validationRegisterForm.indexOf(1) === -1 && document.referrer == ""){
           gtmDataObject.push({
            'event':'customEvent',
            'eventCategory':'Registration',
            'eventAction':'Verification Registration',
            'eventLabel':'Full Fill the Fields - Reload Page'
           });
           validationRegisterForm.push(1);

      }else if(document.querySelector("#email_otp").value == ""){
  
          gtmDataObject.push({
            'event':'customEvent',
            'eventCategory':'Registration',
            'eventAction':'Verification Registration',
            'eventLabel':'Not Completed Fill'
          });

      }
  }
}

//checkout step 2
if(window.location.href.indexOf("multishipping/checkout/shipping/") != -1){
	pushCheckout(2, "Shipping Option", getItemCart())
}

//checkout step 3
if(window.location.href.indexOf("multishipping/checkout/billing/") != -1){
	pushCheckout(3, "Payment Option", getItemCart())
}
	
//checkout step 4
if(window.location.href.indexOf("multishipping/checkout/overview/") != -1){
	pushCheckout(4, "Recap Overview", getItemCart())
}
}

function getItemCart(){
  var itemList = JSON.parse(localStorage.getItem("mage-cache-storage"));
  var cart = itemList.cart.items;
  var basket = [];

  for(var x=0;x<cart.length;x++){
    var item = {};
    var productURL = cart[x].product_url;
    var totalStrip = (productURL.match(/-/g) || []).length;
    var indexStripSKU = getPosition(productURL, '-', totalStrip-1);
    var itemId = cart[x].item_id;
    
    if(productURL.lastIndexOf("-") != -1 && productURL.indexOf(".html") != -1){
      itemId = productURL.substring(indexStripSKU+1,productURL.indexOf(".html"));
    }
  
    item.name = cart[x].product_name
	item.id = cart[x].product_id;
	item.price = cart[x].product_price_value;
	item.category = "";
	item.quantity = cart[x].qty;
	item.dimension53 = cart[x].product_id;
	item.dimension54 = cart[x].product_name;
	item.dimension57 = cart[x].product_type;
	item.metric16 = cart[x].qty;
  
    basket.push(item);
  }
  
  return basket;
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function pushCheckout(step, stepName, dataObject){
    gtmDataObject.push({
		'event': 'checkout',
		'ecommerce': {
		    'checkout': {
				'actionField': {'step': step, 'checkoutStepName': stepName },
			    'products': dataObject
			}
		}
	});
	
	return true;
}

