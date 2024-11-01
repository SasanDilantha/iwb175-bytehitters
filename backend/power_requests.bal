// import ballerina/email;
import ballerina/sql;

// final email:SmtpClient smtpClient = check new ("smtp.email.com", "sender@email.com", "pass123");

// public isolated function sendEmail(email:SmtpClient email_client) returns error? {
//     email:Message message = {
//         to: [""],
//         subject: "Test Email",
//         body: "This is a test email.",
//         cc: [],
//         bcc: [],
//         'from: "",
//         sender: "",
//         replyTo: []
//     };

//     check email_client->sendMessage(message);
// }

public isolated function addPowerRequest(Request request) returns error?|int? {
    sql:ParameterizedQuery query = `INSERT INTO Request (power_plant_id, request_capacity, request_date, status) VALUES (${request.power_plant_id}, ${request.request_capacity}, ${request.request_date}, ${request.status})`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        // check sendEmail(smtpClient);
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}

public isolated function updatePowerRequest(Request request) returns error?|int? {
    sql:ParameterizedQuery query = `UPDATE Request SET status = ${request.status} WHERE id = ${request.id}`;
    sql:ExecutionResult result = check dbClient->execute(query);

    int affectedRows = result.affectedRowCount ?: 0;
    if affectedRows > 0 {
        return request.id;
    } else {
        return error("No rows were updated");
    }
}

// Function to retrieve all power requests from MySQL
public isolated function getAllPowerRequests() returns error|Request[] {

    sql:ParameterizedQuery query = `SELECT Request.id, name, power_plant_id, request_capacity, request_date, status FROM Request, PowerPlant WHERE Request.power_plant_id = PowerPlant.id`;
    stream<Request, sql:Error?> resultStream = dbClient->query(query);

    Request[] requests = [];
    check from Request request in resultStream
        do {
            requests.push(request);
        };
    check resultStream.close();
    return requests;
}
