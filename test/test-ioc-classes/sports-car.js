export class SportsCar extends Vehicle {
    constructor(doors, make, model, bodyStyle) {
        this.doors = doors;
        this.make = make;
        this.model = model;
        super(bodyStyle);
    }

    speed() {
        console.log(`You are driving really fast!`);
    }
}