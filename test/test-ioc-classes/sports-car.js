export class SportsCar extends Vehicle {
    constructor(doors, make, model, bodyStyle) {
        this.doors = doors;
        this.make = make;
        this.model = model;
        super(bodyStyle, make, model);
    }

    speed() {
        console.log(`You are driving really fast in your ${this.make} ${this.model}!`);
    }
}
