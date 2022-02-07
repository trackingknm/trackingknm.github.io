//product impression
var productCtg = document.querySelectorAll(".product-category");
var listProductIndex = [];

window.addEventListener('scroll', function() {	

	if(productCtg.length > 0){
			
		for(var x=0;x<productCtg.length;x++){
			
			// product level category, just collect entity product and push the impression when product category still esixt
			if(productCtg[x].querySelector(":scope > ul").childElementCount > 0 && getPositionElementByPosition(productCtg[x].getBoundingClientRect()) == true && listProductIndex.indexOf(x)	== -1){
			    listProductIndex.push(x);
				var productCategoryCount = productCtg[x].querySelector(":scope > ul").childElementCount
				var productList = [];
					
				for(var y=1;y<=productCategoryCount;y++){
					var prdCategoryElement = productCtg[x].querySelector(":scope > h2");
					var product = productCtg[x].querySelector(":scope > ul > li:nth-child("+y+")")
					var prdIdElement = product.querySelector(":scope > .product-text > .product-price > .price-box.price-final_price");
					var prdNameElement = product.querySelector(":scope > .product-name > h3 > a");
					var prdPriceElement = product.querySelector(":scope > .product-text > .product-price > .price-box.price-final_price > .price-container > span");
					var productData = {};
					
					var productName = "";
					
					if(prdNameElement != null){
						  productName = prdNameElement.textContent
					}else{
					    prdNameElement = product.querySelector(":scope > .product-text > .product-description > .product-name >h3 > a");
						productName = prdNameElement.textContent
					}
						
					if(prdCategoryElement != null){
						prdCategory = prdCategoryElement.textContent;
					}else{
						prdCategory = getNameOfLink(window.location.href);	
					}
					
					var productPrice = 0;
					if(prdPriceElement == null){
						var prdPriceElement = product.querySelector(":scope > .product-text > .product-price > input");
						productPrice = prdPriceElement.value;
						console.log("Product Price "+productPrice)
					}else{
						productPrice = prdPriceElement.getAttribute("data-price-amount");
					}
						
					//console.log(prdCategory)
					//console.log(productName)
					//console.log(prdIdElement.getAttribute("data-product-id"))
					//console.log(prdPriceElement.getAttribute("data-price-amount"))
						
					productData.id = prdIdElement.getAttribute("data-product-id");
					productData.name = productName;
					productData.price = productPrice;
					productData.category = prdCategory;
					productData.position = y;
					productList.push(productData)
				}
				//console.log("Product Category "+x+" List "+JSON.stringify(productList))
				productImpressionPush(productList)		
			}		
		}
	}
})

var productsElement = document.querySelectorAll(".product");

if(productsElement.length > 0){
	for (var i = 0; i < productsElement.length; i++) { 
		productsElement[i].addEventListener("click", function() {
		    var product = [];
			var prdCategoryElement = productsElement[0].parentElement.parentElement.querySelector(":scope >h2");
			//var product = productsElement[i];
			var prdIdElement = this.querySelector(":scope > .product-text > .product-price > .price-box.price-final_price");
			var prdNameElement = this.querySelector(":scope > .product-name > h3 > a");
			var prdPriceElement = this.querySelector(":scope > .product-text > .product-price > .price-box.price-final_price > .price-container > span");
			var productData = {};
					
			var productName = "";
					
					
			if(prdNameElement != null){
				productName = prdNameElement.textContent
			}else{
				prdNameElement = product.querySelector(":scope > .product-text > .product-description > .product-name >h3 > a");
				productName = prdNameElement.textContent
			}
						
			if(prdCategoryElement != null){
				prdCategory = prdCategoryElement.texContent;
			}else{
				prdCategory = "";	
			}
					
			var productPrice = 0;
			if(prdPriceElement == null){
				var prdPriceElement = this.querySelector(":scope > .product-text > .product-price > input");
				productPrice = prdPriceElement.value;
			    //console.log("Product Price "+productPrice)
			}else{
				productPrice = prdPriceElement.getAttribute("data-price-amount");
			}
						
			//console.log(prdCategory)
			//console.log(productName)
			//console.log(prdIdElement.getAttribute("data-product-id"))
		    console.log(productPrice)
						
			productData.id = prdIdElement.getAttribute("data-product-id");
			productData.name = productName;
			productData.price = productPrice;
			productData.category = prdCategory;
			productData.position = i;
			
			product.push(productData)
			productClickPush(product)
			
		})
	}
}

function getPositionElementByPosition(position){
	//var element = document.querySelector(topField+topBannerSelector);
	//var position = element.getBoundingClientRect();
	//console.log(position.top);
	var status = false;
	
	// checking for partial visibility
	if(position.top < window.innerHeight && position.bottom >= 0) {
		//console.log('Element is partially visible in screen');
		status = true;
	}
	
	return status;
}

function productImpressionPush(entityProduct){
	gtmDataObject.push({
		'event':'impression',
		'eventCategory':'Ecommerce',
		'eventAction':'Product Impression',
		'eventLabel':entityProduct[0].category,
		'ecommerce': {
			'currencyCode': 'IDR',                       // Local currency is optional.
			'impressions':entityProduct
		}
		
	});

}

function productClickPush(entityProduct){
	gtmDataObject.push({
		'event':'productClick',
		'eventCategory':'Ecommerce',
		'eventAction':'Product Click',
		'eventLabel':entityProduct[0].category,
		'ecommerce':{
			'click': {
				'actionField': {'list': entityProduct[0].category},      // Optional list property.
				'products': entityProduct
			}
		}
		
	});

}

function getNameOfLink(link){
  var lastSlash = link.lastIndexOf("/")
  var lastdot = link.lastIndexOf(".")
  
  var linkName = link.substring(lastSlash+1,lastdot);
  
  return linkName.replace(/-/g, ' ');

	
}
