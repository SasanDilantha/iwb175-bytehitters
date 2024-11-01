import ballerina/sql;

public isolated function addPowerPlantStatus(PowerPlantStatus status) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `INSERT INTO PowerPlantStatus (produce_capacity, status, plant_id) VALUES (${status.produceCapacity}, ${status.status}, ${status.plant_id})`;
    sql:ExecutionResult result = check dbClient->execute(query);
    int|string? lastInsertId = result.lastInsertId; 
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
    //log:printInfo("Power plant status added successfully.");
}

public isolated function getAllPowerPlantStatuses() returns error|PowerPlantStatus[] {
    //check initMySQL(); // Ensure MySQL is initialized

    PowerPlantStatus[] powerPlantStatuses = [];

    sql:ParameterizedQuery query = `SELECT plant_id, name, produce_capacity, location, status FROM PowerPlant, PowerPlantStatus WHERE PowerPlant.id = PowerPlantStatus.plant_id`;
    stream<PowerPlantStatus, sql:Error?> resultStream = dbClient->query(query);

    check from PowerPlantStatus powerPlantStatus in resultStream
        do {
            powerPlantStatuses.push(powerPlantStatus);
        };
    check resultStream.close();
    return powerPlantStatuses;
}

// Function to update a power plant status in the MySQL database
public isolated function updatePowerPlantStatus(PowerPlantStatus status) returns error?|int? {
    //check initMySQL(); // Ensure MySQL is initialized

    sql:ParameterizedQuery query = `UPDATE PowerPlantStatus SET status = ${status.status}, produce_capacity = ${status.produceCapacity} WHERE plant_id = ${status.plant_id}`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int? affectedRowCount = result.affectedRowCount;
    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Unable to obtain last insert ID");
    }
    //log:printInfo("Power plant status updated successfully.");
}