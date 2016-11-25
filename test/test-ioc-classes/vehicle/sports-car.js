import Vehicle from './vehicle';

export class SportsCar extends Vehicle {
    constructor(doors, make, model, bodyStyle) {
        super(bodyStyle, make, model);
        this.doors = doors;
    }

    upgrade() {
        turboCharge(this.make, this.model);
    }

    speed() {
        console.log(`You are driving really fast in your ${this.make} ${this.model}!`);
    }
}

module.exports = function turboCharge(make, model) {
    return console.log(`${make} ${model} has been turbo charged!`);
}
