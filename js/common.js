var Pizza = (function(){
			/*A list of pizza with ingredients*/
	var pizzas = {
		cap:{
			dough: 1,
			tomato_sauce: 1,
			onion: 2,
			sausage: 2,
			mashroom: 3,
			cheez: 1,
		},
		onions:{
			dough: 1,
			tomato_sauce: 1,
			onion: 2,
			meat: 1,
			cheez: 1,
		},
		king_one:{
			dough: 1,
			tomato_sauce: 1,
			onion: 2,
			mayo: 1,
			mashroom: 3,
			tomato: 2,
			cheeze: 3,
			dill: 2,
			parsley: 2
		},
		gavay:{
			dough: 1,
			tomato_sauce: 1,
			onion: 2,
			ananas: 1,
			cheez: 2,

		},
		tonno:{
			dough: 1,
			tomato_sauce: 1,
			tuna: 2,
			kappers: 1,
			cheez: 1,
		},
		vegeterian:{
			dough: 1,
			tomato_sauce: 1,
			tomato: 2,
			kappers: 1,
			cucumber: 2,
			onion: 2,
			cheez: 1,
		}
	};

			/* A list if baced pizza */

	var lastPizzas = []

 
	 		/* Function for creating an array of pizzas with the order quantity of each of them */

	function pizzaListArr(list) {
	 	var obj = {}, arr = [];
	 	for(i = 0; i < list.length; i++){
	 		obj[list[i]] ? obj[list[i]]++ : obj[list[i]] = 1;
	  	};
	  	for (k in obj){
	  		arr.push({coin: obj[k], kindOfPizza: k})
	  	};
	  	return arr;
	}

	 		/* Function for determining 5 the most popular kinds of pizza */

	function popular(list) {
	var popular = pizzaListArr(list).sort(compareNumeric);
	popular.length > 5 ? popular = popular.slice(0, 5) : popular;
	for(i = 0; i < popular.length; i++){
	 	popular[i] = popular[i].kindOfPizza;
	}
	return popular
	}

			/* Function for sorting  */

	function compareNumeric(a, b) {
			if (a.coin < b.coin) return 1;
	    if (a.coin > b.coin) return -1;
	}

			 /* Function for determining ingredients */

	function ingredients(list, piz){
		var arr = popular(list), obj = {}; ingred = [];
		for(i = 0; i < arr.length; i++){
			for(k in piz[arr[i]]){
				obj[k] ? obj[k]++ : obj[k] = 1;
			}
		}
		for(k in obj){
			ingred.push({coin: obj[k], ingredient: k})
		}
		ingred = ingred.sort(compareNumeric);
		for(i = 0; i < ingred.length; i++){
			ingred[i] = ingred[i].ingredient;
		}	
		return ingred;
	}

	function info(pizzaList){
		return {
			popular: popular(pizzaList), /*// масив повинен включати 5 найпопулярніших піц*/
			ingredients: ingredients(pizzaList, pizzas) /*// масив, який містить назви інгрідієнтів
			// по популярності*/
		}
	};

	function addLastPizza(lastOrderedPizza){
		lastPizzas.push(lastOrderedPizza)
	}

	return{
		getPizzaInfo: info,
		last: lastPizzas,
		add: addLastPizza
	}
}())

	$('.image-wrap').on('click', function (){
		var p = ($(this).attr("data-op"));
		Pizza.add(p);
		var i = Pizza.getPizzaInfo(Pizza.last);
		$('.pop-pizza p').html(i.popular.join(', '));
		$('.pop-ingredient p').html(i.ingredients.join(', '));
		  $('html, body').animate({
            scrollTop: $('.pop-ingredient h4').offset().top - 70
        }, 800);
	});




	
