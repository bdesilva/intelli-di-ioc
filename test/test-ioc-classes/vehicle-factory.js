export default class VehicleFactory {
    static Create(personality) {
        let vehicle;
        switch (personality.toLowerCase()) {
            case 'sporty': {
                vehicle = this.deps.sportsCar;
                break;
            }
            case 'family': {
                vehicle = this.deps.familyCar;
                break;
            }
        }

        return vehicle;
    }
}
