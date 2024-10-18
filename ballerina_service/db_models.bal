import ballerina/io;
import ballerinax/mongodb;
import ballerina/log;

mongodb:Client mongoClient = check new({
    connection: "mongodb+srv://sasandilantha9823:4XvakXRgCar2GBAG@voltsync.4jass.mongodb.net"
});
mongodb:Database db = check mongoClient->getDatabase("VoltSync");
mongodb:Collection collection = check db->getCollection("VoltSync");


// Initialize the MongoDB client, database, and collection
function initMongoDB() returns error? {
    mongoClient = check new({
        connection: "mongodb+srv://sasandilantha9823:4XvakXRgCar2GBAG@voltsync.4jass.mongodb.net"
    });
    db = check mongoClient->getDatabase("VoltSync");
    collection = check db->getCollection("VoltSync");
}

// Struct to hold power plant data
type PowerPlant record {
    string name;
    string location;
    string ownership;
    string capacity;
};

// Struct to hold power plant status data
type PowerPlantStatus record {
    string name;
    string status;
    string productionCapacity;
    string lastUpdated;
};

// Function to add a new power plant to the MongoDB collection
public function addPowerPlant(PowerPlant powerPlant) returns error? {
    json doc = {
        "name": powerPlant.name,
        "location": powerPlant.location,
        "ownership": powerPlant.ownership,
        "capacity": powerPlant.capacity
    };
    record {| anydata...; |} powerPlantRecord = check doc.cloneWithType();
    check collection->insertOne(powerPlantRecord);
    log:printInfo("Power plant added successfully.");
}

// Function to retrieve all power plants from MongoDB
public function getAllPowerPlants() returns PowerPlant[]|error {
    stream<record {| anydata...; |}, error?> docsStream = check collection->find();
    json[] jsonArray = [];

    // Iterate over the stream
    error? e = docsStream.forEach(function(record {| anydata...; |} doc) {
        jsonArray.push(doc.toJson());
    });

    // Handle any errors that occurred during iteration
    if e is error {
        return e;
    }

    PowerPlant[] powerPlants = [];
    foreach var doc in jsonArray {
        PowerPlant powerPlant = check doc.fromJsonWithType(PowerPlant);
        powerPlants.push(powerPlant);
    }

    return powerPlants;
}


// Function to delete a power plant from the MongoDB collection
public function deletePowerPlant(string name) returns error? {
    var result = check collection->deleteOne({ "name": name });
    log:printInfo("Power plant deleted successfully.");
}

// Function to add a new power plant status to the MongoDB collection
public function addPowerPlantStatus(PowerPlantStatus powerPlantStatus) returns error? {
    json doc = {
        "name": powerPlantStatus.name,
        "status": powerPlantStatus.status,
        "productionCapacity": powerPlantStatus.productionCapacity,
        "lastUpdated": powerPlantStatus.lastUpdated
    };
    record {| anydata...; |} powerPlantStatusRecord = check doc.cloneWithType();
    check collection->insertOne(powerPlantStatusRecord);
    log:printInfo("Power plant status added successfully.");
}

// Function to retrieve all power plant statuses from MongoDB
public function getAllPowerPlantStatuses() returns PowerPlantStatus[]|error {
    stream<record {| anydata...; |}, error?> docsStream = check collection->find();
    json[] jsonArray = [];

    // Iterate over the stream
    error? e = docsStream.forEach(function(record {| anydata...; |} doc) {
        jsonArray.push(doc.toJson());
    });

    // Handle any errors that occurred during iteration
    if e is error {
        return e;
    }

    PowerPlantStatus[] powerPlantStatuses = [];
    foreach var doc in jsonArray {
        PowerPlantStatus powerPlantStatus = check doc.fromJsonWithType(PowerPlantStatus);
        powerPlantStatuses.push(powerPlantStatus);
    }

    return powerPlantStatuses;
}

// Function to update a power plant status in the MongoDB collection
public function updatePowerPlantStatus(string name, PowerPlantStatus powerPlantStatus) returns error? {
    json doc = {
        "name": powerPlantStatus.name,
        "status": powerPlantStatus.status,
        "productionCapacity": powerPlantStatus.productionCapacity,
        "lastUpdated": powerPlantStatus.lastUpdated
    };
    record {| anydata...; |} powerPlantStatusRecord = check doc.cloneWithType();
    var result = check collection->updateOne({ "name": name }, <mongodb:Update>powerPlantStatusRecord);
    log:printInfo("Power plant status updated successfully.");
}


