import ballerina/http;
import ballerina/io;
import ballerina/sql;
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

// Function to initialize MySQL connection
// function initMySQL() returns error? {
//     if dbClient is mysql:Client {
//         return;
//     }

//     dbClient = check new(
//         host="localhost", user="root", password="testUser", port=3306, database="bal"
//     );
// }

public type PowerPlant record {
    int id?;
    string name;
    string mail?;
    string mobile?;
    string location;
    string ownership;
    decimal daily_production_capacity;
};

public type PowerPlantStatus record {
    int id;
    string name;
    string status;
    decimal produceCapacity;
};

public type Request record {
    int id;
    int powerPlantId;
    decimal requestCapacity;
    string requestDate;
    string status;
};

type SampleErrorData record {|
    int code;
    string reason;
|};

type SampleError error<SampleErrorData>;

isolated function getSampleError() returns SampleError {
    return error("Transaction Failure", error("Database Error"), code = 20,
                            reason = "deadlock condition");
}

// Function to add a power plant to the MySQL database 
public isolated function addPowerPlant(PowerPlant plant) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized
    sql:ParameterizedQuery query = `INSERT INTO PowerPlant (name, mail, mobile, location, ownership, daily_production_capacity) VALUES (${plant.name}, ${plant.mail}, ${plant.mobile}, ${plant.location}, ${plant.ownership}, ${plant.daily_production_capacity})`;
    sql:ExecutionResult result = check dbClient->execute(query);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
    //log:printInfo("Power plant added successfully.");
}

// Function to retrieve all power plants from MySQL
public isolated function getAllPowerPlants() returns error|PowerPlant[] {
    //check initMySQL(); // Ensure MySQL is initialized

    PowerPlant[] powerPlants = [];

    sql:ParameterizedQuery query = `SELECT * FROM PowerPlant`;
    stream<PowerPlant, sql:Error?> resultStream = dbClient->query(query);

    check from PowerPlant powerPlant in resultStream
        do {
            powerPlants.push(powerPlant);
        };
    check resultStream.close();
    return powerPlants;
}

// Function to retrieve all private power plants from MySQL
public isolated function getPrivatePowerPlants() returns error|PowerPlant[] {
    //check initMySQL(); // Ensure MySQL is initialized

    PowerPlant[] powerPlants = [];

    sql:ParameterizedQuery query = `SELECT * FROM PowerPlant WHERE ownership = 'pvt'`;
    stream<PowerPlant, sql:Error?> resultStream = dbClient->query(query);

    check from PowerPlant powerPlant in resultStream
        do {
            powerPlants.push(powerPlant);
        };
    check resultStream.close();
    return powerPlants;
}

// Function to update a power plant in the MySQL database
public isolated function updatePowerPlant(PowerPlant plant) returns error?|int? {
    // Ensure MySQL is initialized
    // check initMySQL();

    sql:ParameterizedQuery query = `UPDATE PowerPlant SET name = ${plant.name}, mail = ${plant.mail}, mobile = ${plant.mobile}, location = ${plant.location}, ownership = ${plant.ownership}, daily_production_capacity = ${plant.daily_production_capacity} WHERE id = ${plant.id}`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int affectedRows = result.affectedRowCount ?: 0;
    if (affectedRows > 0) {
        return plant.id;
    } else {
        return error("No rows were updated");
    }
    // log:printInfo("Power plant status updated successfully.");
}

// Function to delete a power plant from the MySQL database
public isolated function deletePowerPlant(int plantId) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `DELETE FROM PowerPlant WHERE id = ${plantId}`;
    sql:ExecutionResult result = check dbClient->execute(query);
    int? affectedRowCount = result.affectedRowCount;
    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Unable to obtain the affected row count");
    }
    //log:printInfo("Power plant deleted successfully.");
}

// Function to add a new power plant status to the MySQL database
public function addPowerPlantStatus(PowerPlantStatus status) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `INSERT INTO PowerPlantStatus (name, status, produce_capacity) VALUES (${status.name}, ${status.status}, ${status.produceCapacity})`;
    sql:ExecutionResult result = check dbClient->execute(query);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
    //log:printInfo("Power plant status added successfully.");
}

// Function to retrieve all power plant statuses from MySQL
public function getAllPowerPlantStatuses() returns error|PowerPlantStatus[] {
    //check initMySQL(); // Ensure MySQL is initialized

    PowerPlantStatus[] powerPlantStatuses = [];

    sql:ParameterizedQuery query = `SELECT * FROM PowerPlantStatus`;
    stream<PowerPlantStatus, sql:Error?> resultStream = dbClient->query(query);

    check from PowerPlantStatus powerPlantStatus in resultStream
        do {
            powerPlantStatuses.push(powerPlantStatus);
        };
    check resultStream.close();
    return powerPlantStatuses;
}

// Function to update a power plant status in the MySQL database
public function updatePowerPlantStatus(int plantId, PowerPlantStatus status) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `UPDATE PowerPlantStatus SET status = ${status.status}, produce_capacity = ${status.produceCapacity} WHERE id = ${plantId}`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
    //log:printInfo("Power plant status updated successfully.");
}

// Function to add a power request to the MySQL database
public function addPowerRequest(Request request) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `INSERT INTO Request (power_plant_id, request_capacity, request_date, status) VALUES (${request.powerPlantId}, ${request.requestCapacity}, ${request.requestDate}, ${request.status})`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }

    //log:printInfo("Power request added successfully.");
}

// Function to retrieve all power requests from MySQL
public function getAllPowerRequests() returns error|Request[] {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `SELECT * FROM Request`;
    stream<Request, sql:Error?> resultStream = dbClient->query(query);

    Request[] requests = [];
    check from Request request in resultStream
        do {
            requests.push(request);
        };
    check resultStream.close();
    return requests;
}

// Integration with Flask ML model

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

// Function to suggest minimum number of private power plants based on shortage amount
public isolated function suggestPrivatePowerPlants(decimal shortage_amount) returns json|error {
    //var shortageAmount = check shortageAmount();
    decimal shortageAmount = shortage_amount;
    PowerPlant[] privatePowerPlants = check getPrivatePowerPlants();

    // Sort private power plants by daily production capacity in descending order

    decimal accumulatedCapacity = 0;
    PowerPlant[] selectedPowerPlants = [];

    foreach var plant in privatePowerPlants {
        if (accumulatedCapacity >= shortageAmount) {
            break;
        }
        accumulatedCapacity += plant.daily_production_capacity;
        selectedPowerPlants.push(plant);
    }

    json[] result = [];
    foreach var plant in selectedPowerPlants {
        result.push({"id": plant.id, "name": plant.name});
    }

    return result;
}

// Service to interact with power plant operations
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "DELETE"]
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

