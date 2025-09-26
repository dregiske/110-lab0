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

interface Prices {
	cup_price: number;
	ice_price: number;
	sugar_price: number;
	lemon_price: number;
}

function randomize_price(min: number, max: number): number {
	const value = Math.random() * (max - min) + min;
	return Math.round(value * 100) / 100;
}

function generate_price(): Prices {
	return {
		cup_price: randomize_price(1, 3),
		ice_price: randomize_price(1, 3),
		sugar_price: randomize_price(1, 3),
		lemon_price: randomize_price(1, 3)
	};
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

	make_sale(): void {
		this.cups -= 1;
		this.ice -= 1;
		this.sugar -= 1;
		this.lemons -= 1;
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
		this.balance = 20;
		this.day = 1;
		this.customers = 0;
	}

	make_sale(): void {
		if(!this.inventory.validate_sale()){
			console.log("Unfortunately we don't have enough ingredients! Come back next time.");
			return;
		}
		this.balance += 2; // change
		this.customers += 1;
		this.inventory.make_sale();
	}

	new_day(): void {
		this.day += 1;
	}

	print_inventory(): void {
		console.log(` cups: ${this.inventory.cups}\n ice: ${this.inventory.ice}\n sugar: ${this.inventory.sugar}\n lemons: ${this.inventory.lemons}\n`);
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

rl.question("Welcome to my Lemonade Stand game! Want to play? (y/n) ", (answer) => {
	if(answer.toLowerCase() === "n"){
		console.log("Come back soon!");
		rl.close();
	}
	else if(answer.toLowerCase() === "y"){

		while(true){
			if(stand.balance <= 0){
				console.log("Out of money! Game Over!");
				break;
			}
			console.log(`It is currently day: ${stand.day}`);
			console.log(`Here's your starting inventory:\n`);
			stand.print_inventory();
			stand.print_weather();

			const market = generate_price();
			console.log(`Here are the current market prices: `, market);

			rl.question(`What would you like to purchase today? (cups/ice/sugar/lemons/n) `, (ans) => {
				const a = ans.toLowerCase();
				while(stand.balance > 0){
					if(a === "n"){
						break;
					}
					else if(a === "cups"){
						if(stand.balance - market.cup_price < 0){
							console.log("Insufficient funds.")
						} else {
							stand.balance -= market.cup_price;
							stand.inventory.cups += 1;
						}
					}
					else if(a === "ice"){
						if(stand.balance - market.ice_price < 0){
							console.log("Insufficient funds.")
						} else {
							stand.balance -= market.ice_price;
							stand.inventory.ice += 1;
						}
					}
					else if(a === "sugar"){
						if(stand.balance - market.sugar_price < 0){
							console.log("Insufficient funds.")
						} else {
							stand.balance -= market.sugar_price;
							stand.inventory.sugar += 1;
						}
					}
					else if(a === "lemons"){
						if(stand.balance - market.lemon_price < 0){
							console.log("Insufficient funds.")
						} else {
							stand.balance -= market.lemon_price;
							stand.inventory.lemons += 1;
						}
					} else { console.log("Invalid response."); }
				}
			});

			stand.new_day();
			rl.question(`Are you ready for the next day?`, (ready) => {
				if(ready.toLowerCase() === "n"){
					console.log("Exiting game.");
					rl.close();
					return;
				}
			});
		}
		console.log("Play again soon!");

	} else { console.log("Invalid response."); }

	rl.close();
});

