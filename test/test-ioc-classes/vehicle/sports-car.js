import Vehicle from './vehicle';

export class SportsCar extends Vehicle {
    constructor(doors, make, model, bodyStyle) {
        super(bodyStyle, make, model);
        this.doors = doors;
    }

    speed() {
        console.log(`You are driving really fast in your ${this.make} ${this.model}!`);
    }
}
