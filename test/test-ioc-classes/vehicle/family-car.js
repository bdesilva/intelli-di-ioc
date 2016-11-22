import Vehicle from './vehicle';

export class FamilyCar extends Vehicle {
    constructor(doors, make, model, bodyStyle) {
        super(bodyStyle, make, model);
        this.doors = doors;     
    }

    relax() {
        console.log(`You are driving really slow in your ${this.make} ${this.model}!`);
    }
}
