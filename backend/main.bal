import ballerina/http;
import ballerina/io;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

// Define the variables globally without initialization
final mysql:Client dbClient = check new (
    host = "localhost", user = "root", password = "testUser", port = 3306, database = "bal"
);

// Define the HTTP client for Flask ML model
final http:Client flaskClient = check new ("http://localhost:5000");

// HTTP service listener running on custom port 9090
listener http:Listener httpListener = new (9090);

public type PowerPlant record {
    int id?;
    string name?;
    string mail?;
    string mobile?;
    string location?;
    string ownership;
    decimal daily_production_capacity;
};

public type PowerPlantStatus record {
    string status;
    decimal produceCapacity;
    int plant_id;
};

public type Request record {
    int id?;
    int power_plant_id;
    decimal request_capacity;
    string request_date;
    string status;
};

// Function to get daily power allocation from Flask ML model
public isolated function dailyPowerAllocation() returns json|error {
    // get total daily production capacity of all power plants
    PowerPlant[] powerPlants = check getAllPowerPlants();
    decimal totalDailyProductionCapacity = 0;
    foreach var plant in powerPlants {
        totalDailyProductionCapacity += plant.daily_production_capacity;
    }

    // Prepare the JSON payload for Flask ML model
    json requestPayload = {
        "total_power_available": totalDailyProductionCapacity
    };

    // Send the POST request to Flask model
    http:Response response = check flaskClient->post("/daily_power", requestPayload);

    // Get the prediction result
    json responseData = check response.getJsonPayload();
    return responseData;
}

// Function to shortage date from Flask ML model
public isolated function shortageDate() returns json|error {
    // Prepare the JSON payload for Flask ML model
    json requestPayload = {
        "payload": null
    };

    // Send the POST request to Flask model
    http:Response response = check flaskClient->post("/shortage_date", requestPayload);

    // Get the prediction result
    json responseData = check response.getJsonPayload();
    return responseData;
}

// Function to shortage amount from Flask ML model
public isolated function shortageAmount() returns json|error {
    // Prepare the JSON payload for Flask ML model
    json requestPayload = {
        "payload": null
    };

    // Send the POST request to Flask model
    http:Response response = check flaskClient->post("/shortage_amount", requestPayload);

    // Get the prediction result
    json responseData = check response.getJsonPayload();
    return responseData;
}

// Service to interact with power plant operations
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "DELETE", "PUT"]
    }
}

// HTTP service to interact with power plant operations
service /powerplant on httpListener {

    // Retrieve all power plants
    isolated resource function get all() returns PowerPlant[]|error {
        PowerPlant[] powerPlants = check getAllPowerPlants();
        return powerPlants;
    }

    // Add a new power plant
    isolated resource function post add(PowerPlant plant) returns json|error {
        io:println("Adding power plant: ", plant);
        int? plantId = check addPowerPlant(plant);
        return {"plantId": plantId};
    }

    // Update a power plant by ID
    isolated resource function put update(PowerPlant plant) returns json|error {
        int? plantId = check updatePowerPlant(plant);
        return {"plantId": plantId};
    }

    // Delete a power plant by ID
    isolated resource function delete remove(int id) returns json|error {
        int? affectedRows = check deletePowerPlant(id);
        return {"deletedCount": affectedRows};
    }

    // Get Active power plants
    isolated resource function get active() returns PowerPlant[]|error {
        PowerPlant[] powerPlants = check getActivePowerPlants();
        return powerPlants;
    }
    
     // Add a new power plant status
    isolated resource function post status(PowerPlantStatus status) returns json|error {
        int? statusId = check addPowerPlantStatus(status);
        return { "statusId": statusId };
    }

    // Update a power plant status by ID
    isolated resource function put updateStatus(PowerPlantStatus status) returns json|error {
        int? statusId = check updatePowerPlantStatus(status);
        return { "statusId": statusId };
    }

    // Get power plants with a breakdon (status)
    isolated resource function get under_repair() returns PowerPlantStatus[]|error {
        PowerPlantStatus[] powerPlantStatuses = check getAllPowerPlantStatuses();
        return powerPlantStatuses;
    }

    // Add a new power request
    isolated resource function post add_request(Request request) returns json|error {
        int? requestId = check addPowerRequest(request);
        return { "requestId": requestId };
    }

    // Update a new request
    isolated resource function put update_request(Request request) returns json|error {
        int? requestId = check updatePowerRequest(request);
        return { "requestId": requestId };
    }

    // Retrieve all power requests
    isolated resource function get requests() returns Request[]|error {
        Request[] requests = check getAllPowerRequests();
        return requests;
    }

    // Retrieve all daily power production capacities from ml model
    isolated resource function get dailyPower() returns json|error {
        json response = check dailyPowerAllocation();
        return response;
    }

    // Retrieve shortage date from ml model
    isolated resource function get shortageDate() returns json|error {
        json response = check shortageDate();
        return response;
    }

    // Retrieve shortage amount from ml model
    isolated resource function get shortageAmount() returns json|error {
        json response = check shortageAmount();
        return response;
    }

    // Suggest minimum number of private power plants based on shortage amount
    isolated resource function post suggestPrivate(decimal shortage_amount) returns json|error {
        json response = check suggestPrivatePowerPlants(shortage_amount);
        return response;
    }
}

