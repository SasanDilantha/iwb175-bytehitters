import ballerinax/mysql;
import ballerina/sql;
import ballerina/http;
import ballerinax/mysql.driver as _;


// Define the variables globally without initialization
final mysql:Client dbClient = check new(
    host="localhost", user="root", password="testUser", port=3306, database="bal"
);

// Define the HTTP client for Flask ML model
final http:Client flaskClient = check new("http://localhost:5000");

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
    int id;
    string name;
    string location;
    string ownership;
    decimal dailyProductionCapacity;
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

// Function to add a power plant to the MySQL database
public function addPowerPlant(PowerPlant plant) returns error? | int? {
    //check initMySQL(); // Ensure MySQL is initialized
    sql:ParameterizedQuery query = `INSERT INTO PowerPlant (name, location, ownership, daily_production_capacity) VALUES (${plant.name}, ${plant.location}, ${plant.ownership}, ${plant.dailyProductionCapacity})`;
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
public function getAllPowerPlants() returns error | PowerPlant[] {
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

// Function to delete a power plant from the MySQL database
public function deletePowerPlant(int plantId) returns error? | int? {
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
public function addPowerPlantStatus(PowerPlantStatus status) returns error? | int? {
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
public function getAllPowerPlantStatuses() returns error | PowerPlantStatus[] {
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
public function updatePowerPlantStatus(int plantId, PowerPlantStatus status) returns error? | int? {
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
public function addPowerRequest(Request request) returns error?| int? {
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
public function getAllPowerRequests() returns error | Request[] {
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

// Function to send power plant data to the Flask ML model and receive prediction
public function sendPowerPlantDataToML(PowerPlantStatus status) returns json|error {
    // Prepare the JSON payload for Flask ML model
    json requestPayload = {
        "feature1": status.produceCapacity,  // Adjust based on your features
        "feature2": status.status
    };

    // Send the POST request to Flask model
    http:Response response = check flaskClient->post("/predict", requestPayload);
    
    // Get the prediction result
    json responseData = check response.getJsonPayload();
    return responseData;
}