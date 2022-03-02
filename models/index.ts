import { Array, Literal, Number, Record, String, Static, Union, Boolean } from 'runtypes';

export const VehicleBase = Record({
    color: String,
});

export const Car = VehicleBase.extend({
    type: Literal('car'),
    label: String,
});
export type Car = Static<typeof Car>;

export const Bus = VehicleBase.extend({
    type: Literal('bus'),
    passengers: Number,
});
export type Bus = Static<typeof Bus>;

export const Motorcycle = VehicleBase.extend({
    type: Literal('motorcycle'),
    hasHelmets: Boolean,
});
export type Motorcycle = Static<typeof Motorcycle>;

export const Vehicle = Union(Car, Bus, Motorcycle);
export type Vehicle = Static<typeof Vehicle>;

export const Garage = Record({
    vehicles: Array(Vehicle),
    temperature: Number,
});
export type Garage = Static<typeof Garage>;


