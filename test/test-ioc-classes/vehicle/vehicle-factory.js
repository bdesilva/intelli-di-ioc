import { SportsCar } from './sports-car';
import { FamilyCar } from './famiy-car';

export default class VehicleFactory {
    static Create(personality) {
        let vehicle;
        switch (personality.type.toLowerCase()) {
            case 'sporty': {
                vehicle = new SportsCar(...personality.carOpts);
                break;
            }
            case 'family': {
                vehicle = new FamilyCar(...personality.carOpts);
                break;
            }
        }

        return vehicle;
    }
}
