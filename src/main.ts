// Our implementation of a lemonade stand
// Andre Giske & Luis Herrera

class Lemonade_Stand {
	inventory: Inventory;
	balance: number;
	day: number;
	customers: number;

	constructor() {
		this.inventory = new Inventory();
		this.balance = 0;
		this.day = 1;
		this.customers = 0;
	}

	validate_sale(){
		// make sure we have ingredients before sale
	}

	make_lemonade(){
		// subtract from inventory
		// increase day count
		// increase balance
	}

	count_inventory(){
		// return inventory status
	}
}

class Inventory {
	cups: number;
	ice: number;
	sugar: number
	lemons: number;

	constructor(){
		this.cups = 10;
		this.ice = 15;
		this.sugar = 10;
		this.lemons = 10;
	}
}