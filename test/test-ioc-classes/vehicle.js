export default class Vehicle {
    constructor(bodyStyle) {
        this.isDriving = false;
        this.bodyStyle = bodyStyle;
    }
    drive(make, model) {
        this.isDriving = true;
        console.log(`The ${make} ${model} with a ${this.bodyStyle} started driving.`);
    }

    park() {
        this.isDriving = true;
        console.log(`The ${make} ${model} with a ${this.bodyStyle} started driving.`);
    }
}