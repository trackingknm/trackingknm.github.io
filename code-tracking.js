window.onload = function () {
	

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

}

