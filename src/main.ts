// Our implementation of a lemonade stand
// Andre Giske & Luis Herrera

import { randomBytes } from "crypto";
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
	return Math.random() * (max - min) + min;
}

function generate_price(): Prices {
	return {
		cup_price: randomize_price(1, 3);
		ice_price: randomize_price(1, 3);
		sugar_price: randomize_price(1, 3);
		lemon_price: randomize_price(1, 3);
	}

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

	print_market(): void {
		for(let i = 0; i < 3; i++){

		}
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
			if(stand.balance === 0){
				console.log("Out of money! Game Over!");
				break;
			}
			console.log(`It is currently day: ${stand.day}`);
			console.log(`Here's your starting inventory:\n`);
			stand.print_inventory();
			stand.print_weather();

			console.log(`Here are the current market prices: `);
			stand.print_market();


			stand.new_day();
			break;
		}
		console.log("Play again soon!");

	} else { console.log("Invalid response."); }

	rl.close();
});

