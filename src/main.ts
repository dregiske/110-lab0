// Our implementation of a lemonade stand
// Andre Giske & Luis Herrera

import * as readline from "readline";

interface Weather {
	sunny: number;
	windy:  number;
	cloudy: number;
	rainy: number;
}
const weather: Weather = {
	sunny: 1.5,
	windy: 0.9,
	cloudy: 1.0,
	rainy: 0.5
}

class Inventory {
	cups: number;
	ice: number;
	sugar: number;
	lemons: number;
	constructor(cups: number, ice: number, sugar: number, lemons: number){
		this.cups = cups;
		this.ice = ice;
		this.sugar = sugar;
		this.lemons = lemons;
	}

	validate_sale(): boolean {
		return (this.cups > 0) && (this.ice > 0) && (this.sugar > 0) && (this.lemons > 0);
	}

	restock_stand(): void {
		this.cups = 10;
		this.ice = 10;
		this.sugar = 10;
		this.lemons = 10;
	}

	make_sale(): void {
		this.cups -= 1;
		this.ice -= 1;
		this.sugar -= 1;
		this.lemons -= 1;
		console.log("Here's your drink, have a nice day!");
	}
}

class Lemonade_Stand {
	inventory: Inventory;
	weather: Weather;
	balance: number;
	day: number;
	customers: number;

	constructor() {
		this.inventory = new Inventory(10, 10, 10, 10);
		this.weather = weather;
		this.balance = 0;
		this.day = 1;
		this.customers = 0;
	}

	make_sale(): void {
		if(!this.inventory.validate_sale()){
			console.log("Unfortunately we don't have enough ingredients! Come back next time.");
		}
		this.balance += 2;
		this.customers += 1;
		this.inventory.make_sale();
	}

	new_day(): void {
		this.day += 1;
		this.inventory.restock_stand();
	}

	print_inventory(): void {
		console.log(`cups: ${this.inventory.cups}\n 
					 ice: ${this.inventory.ice}\n
					 sugar: ${this.inventory.sugar}\n
					 lemons: ${this.inventory.lemons}\n`
					);
	}
	print_weather(): void {
		let w = this.pick_weather();
		console.log(`The weather is: ${w}`)
	}

	pick_weather(): keyof Weather {
		const keys = Object.keys(weather) as (keyof Weather)[];
		const randomIndex = Math.floor(Math.random() * keys.length);
		return keys[randomIndex];
	}

}

const stand = new Lemonade_Stand();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

while(true){
	rl.question("Welcome to my Lemonade Stand game! Want to play? (y/n)", (answer) => {
		if(answer.toLowerCase() === "n"){
			break;
		}

		console.log(`Here's your starting inventory:\n`);
		stand.print_inventory();
		stand.print_weather();
		

		rl.close();
		console.log("Play again soon!");
	});
}

