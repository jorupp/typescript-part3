import { Car, Garage } from "../models";

const tryCall = (toCall: () => any) => {
    try {
        return <code><pre>{JSON.stringify(toCall(), null, 2)}</pre></code>
    } catch(e) {
        return (
            <code style={ { color: "red" }}>
                <pre>
                    {(e instanceof Error) ? e.toString() : 'Unknown Error'}
                </pre>
            </code>
        )
    }
}

const jsonValidCar = `{ "type": "car", "color": "purple", "label": "Bill's car" }`;
const jsonValidBus = `{ "type": "bus", "color": "blue", "passengers": 45 }`;
const jsonInvalidCar = `{ "type": "car", "color": "red", "passengers": 45 }`;
const jsonInvalidBus = `{ "type": "bus", "passengers": 45 }`;
const jsonInvalidVehicle = `{ "color": "red", "passengers": 45 }`;
const invalidJson = `{ vehicles: [] }`; // not valid - JSON has to have quoted properties
const jsonValidGarage = `{ "vehicles": [ ${jsonValidBus}, ${jsonValidCar} ], "temperature": 45.2 }`;
const jsonInvalidGarage = `{ "vehicles": [ ${jsonInvalidCar}, ${jsonInvalidBus}, ${jsonInvalidVehicle} ], "temperature": 45.2 }`;

const parseAsGarage = (json: string): Garage => {
    return JSON.parse(json) as Garage;
}

const parseAndValidateAsGarage = (json: string): Garage => {
    return Garage.check(JSON.parse(json));
}

// example of using the generated guard method
const getLabelOfFirstCar = (garage: Garage) => {
    for(const vehicle of garage.vehicles) {
        // can't do this here because we don't know this is a car yet
        // const l = vehicle.label;

        if (Car.guard(vehicle)) {
            // *can* do this because we now know this is a car
            return vehicle.label;
        }

        // can't do this because we don't know it's a bus - if Vehicle.Union didn't contain Motorcycle, this would be valid
        // const p = vehicle.passengers;
    }
}

const JsonPage = () => <div>
    <h2><code>parseAsGarage</code> for invalid JSON</h2>
    {tryCall(() => parseAsGarage(invalidJson))}
    <h2><code>parseAsGarage</code> for valid garage</h2>
    {tryCall(() => parseAsGarage(jsonValidGarage))}
    <h2><code>parseAsGarage</code> for invalid garage</h2>
    {tryCall(() => parseAsGarage(jsonInvalidGarage))}
    <h2><code>parseAndValidateAsGarage</code> for invalid JSON</h2>
    {tryCall(() => parseAndValidateAsGarage(invalidJson))}
    <h2><code>parseAndValidateAsGarage</code> for valid garage</h2>
    {tryCall(() => parseAndValidateAsGarage(jsonValidGarage))}
    <h2><code>parseAndValidateAsGarage</code> for invalid garage</h2>
    {tryCall(() => parseAndValidateAsGarage(jsonInvalidGarage))}
</div>

export default JsonPage;