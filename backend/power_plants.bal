import ballerina/sql;

// Function to add a power plant to the MySQL database 
public isolated function addPowerPlant(PowerPlant plant) returns error?|int? {
    sql:ParameterizedQuery query = `INSERT INTO PowerPlant (name, mail, location, ownership, daily_production_capacity) 
                        VALUES (${plant.name}, ${plant.mail}, ${plant.location}, ${plant.ownership}, 
                        ${plant.daily_production_capacity})`;
    sql:ExecutionResult result = check dbClient->execute(query);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}

// Function to retrieve all power plants from MySQL
public isolated function getAllPowerPlants() returns error|PowerPlant[] {
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
    PowerPlant[] powerPlants = [];

    sql:ParameterizedQuery query = `SELECT * FROM PowerPlant WHERE ownership = 'pvt' ORDER BY daily_production_capacity DESC`;
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
    sql:ParameterizedQuery query = `UPDATE PowerPlant SET name = ${plant.name}, mail = ${plant.mail}, location = ${plant.location}, ownership = ${plant.ownership}, daily_production_capacity = ${plant.daily_production_capacity} WHERE id = ${plant.id}`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int affectedRows = result.affectedRowCount ?: 0;
    if (affectedRows > 0) {
        return plant.id;
    } else {
        return error("No rows were updated");
    }
}

// Function to delete a power plant from the MySQL database
public isolated function deletePowerPlant(int plantId) returns error?|int? {
    sql:ParameterizedQuery query = `DELETE FROM PowerPlant WHERE id = ${plantId}`;
    sql:ExecutionResult result = check dbClient->execute(query);
    int? affectedRowCount = result.affectedRowCount;
    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Unable to obtain the affected row count");
    }
}

// Function to suggest minimum number of private power plants based on shortage amount
public isolated function suggestPrivatePowerPlants(decimal shortage_amount) returns json|error {
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
        // io:println(accumulatedCapacity);
    }

    json[] result = [];
    foreach var plant in selectedPowerPlants {
        result.push({"id": plant.id, "name": plant.name, "daily_production_capacity": plant.daily_production_capacity, "location": plant.location});
    }

    return result;
}

// Function to get unbroken power plants
public isolated function getActivePowerPlants() returns error|PowerPlant[] {
    PowerPlant[] powerPlants = [];

    sql:ParameterizedQuery query = `SELECT * FROM PowerPlant WHERE ownership = 'pub' AND id NOT IN (SELECT plant_id FROM PowerPlantStatus)`;
    stream<PowerPlant, sql:Error?> resultStream = dbClient->query(query);

    check from PowerPlant powerPlant in resultStream
        do {
            powerPlants.push(powerPlant);
        };
    check resultStream.close();
    return powerPlants;
}
