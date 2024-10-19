package com.mateo9x.exceptions;

public class VehicleException extends RuntimeException {

    public VehicleException(String vehicleId) {
        super("Vehicle with id: " + vehicleId + " not found");
    }
}
