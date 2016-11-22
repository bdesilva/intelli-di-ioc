export class Person {
  constructor(name, personality) {
    this.name = name;
    this.personality = personality;
    this.vehicle = this.deps.vehicleFactory.Create(this.personality);
  }

  get drivingStatus() {
    return this.vehicle.status;
  }

  driveVehicle() {    
    console.log(`${this.name} is driving a ${this.vehicle.drive()}`);

    switch (this.personality.toLowerCase()) {
      case 'sporty': {
        this.vehicle.speed();
        break;
      }
      case 'family': {
        this.vehicle.relax();
        break;
      }
    }
  }

  parkVehicle() {
    console.log(`${this.name} is driving a ${this.vehicle.park()}`);
  }
}