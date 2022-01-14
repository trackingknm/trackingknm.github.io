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

