// Our implementation of a lemonade stand
// Andre Giske & Luis Herrera

import * as readline from "readline";

function ask(rl: readline.Interface, q: string): Promise<string> {
	return new Promise((resolve) => rl.question(q, resolve));
}

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
	weatherTable: Weather = weather;
	balance: number;
	day: number;
	customers: number;

	basePrice = 2.0;
	todayWeather!: keyof Weather;
	todayPrice = this.basePrice;

	constructor() {
		this.inventory = new Inventory(10, 10, 10, 10);
		this.weather = weather;
		this.balance = 20;
		this.day = 1;
		this.customers = 0;
	}

	private round2(n: number){
		return Math.round(n * 100) / 100;
	}

	make_sale(): void {
		if(!this.inventory.validate_sale()){
			console.log("Unfortunately you don't have enough ingredients!");
			return;
		}
		this.balance = this.round2(this.balance + this.todayPrice);
		this.customers += 1;
		this.inventory.make_sale();
	}

	new_day(): void {
		this.day += 1;
	}
	start_of_day(): void {
		console.log(`It is currently day: ${this.day}`);
		this.pick_weather();
		console.log(`Today's weather: ${this.todayWeather} (x${this.weatherTable[this.todayWeather]})`);
		console.log(`Today's lemonade price: $${this.todayPrice.toFixed(2)}`);
		console.log(`Here's your starting inventory:\n`);
		this.print_inventory();

		console.log(`You currently have $${this.balance} left.`)
	}
	print_inventory(): void {
		console.log(` cups: ${this.inventory.cups}\n ice: ${this.inventory.ice}\n sugar: ${this.inventory.sugar}\n lemons: ${this.inventory.lemons}\n`);
	}
	pick_weather(): void {
		const keys = Object.keys(this.weatherTable) as (keyof Weather)[];
		this.todayWeather = keys[Math.floor(Math.random() * keys.length)];
		const multiplier = this.weatherTable[this.todayWeather];
		this.todayPrice = this.round2(this.basePrice * multiplier);
	}
	async prompt_buy(rl: readline.Interface): Promise<void> {
		const market = generate_price();
		console.log(`Here are the current market prices: `, market);

		if(this.balance < Math.min(market.cup_price, market.ice_price, market.lemon_price, market.sugar_price)){
			console.log("You cannot afford any items today.");
			return;
		}

		while(this.balance > 0){
			const ans = await (await ask(rl, "What would you like to purchase today? (cups/ice/sugar/lemons/n) ")).toLowerCase();
			if(ans === "n"){ break; }
			
			else if(ans === "cups"){
				if(this.balance - market.cup_price < 0){
					console.log("Insufficient funds.")
				} else {
					this.balance -= market.cup_price;
					this.inventory.cups += 1;
				}
			}
			else if(ans === "ice"){
				if(this.balance - market.ice_price < 0){
					console.log("Insufficient funds.")
				} else {
					this.balance -= market.ice_price;
					this.inventory.ice += 1;
				}
			}
			else if(ans === "sugar"){
				if(this.balance - market.sugar_price < 0){
					console.log("Insufficient funds.")
				} else {
					this.balance -= market.sugar_price;
					this.inventory.sugar += 1;
				}
			}
			else if(ans === "lemons"){
				if(this.balance - market.lemon_price < 0){
					console.log("Insufficient funds.")
				} else {
					this.balance -= market.lemon_price;
					this.inventory.lemons += 1;
				}
			} else { console.log("Invalid response."); }

			console.log(`Current balance: $${this.balance.toFixed(2)}`);
			this.print_inventory();
		}
	}
}

async function game() {
	const rl = readline.createInterface( { input: process.stdin, output: process.stdout });
	const stand = new Lemonade_Stand();

	const start = (await ask(rl, "Welcome to my Lemonade Stand game! Want to play? (y/n) ")).toLowerCase();

	if(start !== "y") {
		console.log("Come back again!");
		rl.close();
		return;
	}

	while(true) {
		if(stand.balance <= 0){
			console.log("Out of money! Game Over!");
			break;
		}

		stand.start_of_day();

		await stand.prompt_buy(rl);

		stand.make_sale();
		console.log(`After selling a cup, balance: $${stand.balance.toFixed(2)}`);

		const next = (await ask(rl, "Are you ready for the next day? (y/n) ")).toLowerCase();
		if(next !== "y") {
			console.log("Exiting game.");
			break;
		}
		stand.new_day();
	}

	console.log("Play again soon!");
	rl.close();
}

game().catch(err => console.error(err));
