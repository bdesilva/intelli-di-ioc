export class Person {
  constructor(name, personality) {
    this.name = name;
    this.personality = personality;
    this.vehicle = this.deps.vehicleFactory.Create(this.personality);
  }

  driveVehicle() {
    switch (this.personality.toLowerCase()) {
      case 'sporty': {
        console.log(`${this.name} is driving a ${this.deps.sportsCar.drive()}`);
        break;
      }
      case 'family': {
        console.log(`${this.name} is driving a ${this.deps.familyCar.drive()}`);
        break;
      }
    }
  }
}