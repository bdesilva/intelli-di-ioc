export default class Vehicle {
    constructor(...args) {
        const { bodyStyle, make, model } = args;
        this.isDriving = false;
        this.bodyStyle = bodyStyle;
        this.make = make;
        this.model = model;
    }

    get status() {
        let status = (this.isDriving) ? 'started' : 'stopped';
        console.log(`The ${this.make} ${this.model} has ${status} driving.`);
    }

    drive() {
        this.isDriving = true;
        console.log(`The ${this.make} ${this.model} with a ${this.bodyStyle} is starting to drive.`);
    }

    park() {
        this.isDriving = false;
        console.log(`The ${this.make} ${this.model} with a ${this.bodyStyle} is parking the car.`);
    }
}
