export class FamilyCar extends Vehicle {
    constructor(doors, make, model, bodyStyle) {
        this.doors = doors;
        this.make = make;
        this.model = model;
        super(bodyStyle, make, model);
    }

    relax() {
        console.log(`You are driving really slow in your ${this.make} ${this.model}!`);
    }
}
