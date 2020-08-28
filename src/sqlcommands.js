import { sendMessage } from './constants';

// Get the Total Allocations for the Current Year and current active status for clubs
export function printAllNumbers(database, userID, channelID) {
    let bAllocation;
    let frAllocation;
    let mtAllocation;
    let activeClubs;
    let inactiveClubs;

    var message = `<@${userID}>, here are the numbers for the current Fiscal Year (FY ${getCurrentFiscalYear()}):`

    database.query(`call dashBudgetAlloc(${getCurrentFiscalYear()});`)
        .then(rows => {
            bAllocation = rows[0][0].Total_Budget;
            return database.query(`call dashFRAllocation(${getCurrentFiscalYear()});`);
        })
        .then(rows => {
	    frAllocation = rows[0][0].Total_FR;
            return database.query(`call dashMTAllocation(${getCurrentFiscalYear()});`)
        })
        .then(rows => {
            mtAllocation = rows[0][0].Total_MT;
            return database.query(`call dashMembership();`)
        })
        .then(rows => {
            activeClubs = rows[0][0].Active
            inactiveClubs = rows[0][0].Inactive
        })
        .then( () => {
            message = message
                + `\n\tTotal Budget Allocation: ` + bAllocation
                + `\n\tTotal Funding Request Allocation: ` + frAllocation
                + `\n\tTotal Mandatory Transfer Allocation: ` + mtAllocation
                + `\n\tActive Clubs: ` + activeClubs
                + `\n\tInactive Clubs: ` + inactiveClubs

                sendMessage(channelID, message);
        }) 
        .then( () => {
            database.close()
        })
}

// Get the requests from the past week (7 days)
export function getRecentRequests(database, userID, channelID) {
    var message = `<@${userID}>, here are the requests from the past seven days:`
        + "\n```Name of Club,Dot Number,Hearing Date,Description,Requested,Decision,Approved";

    let clubName;
    let dotNum;
    let hearingDate;
    let descrip;
    let requested;
    let decision;
    let approved;

    var sqlQuery = "Select `Name of Club` as clubName, `Dot Number` as dotNumber, DATE_FORMAT(`Hearing Date`, '%m/%d/%Y') as hearingDate,"
        + " `Description` as description, `Requested` as requested, `Decision` as decision, `Approved` as approved"
        + " From `All Requests`"
        + " Where `Hearing Date` >= (DATE(NOW()) - INTERVAL 7 DAY)"

    database.query(sqlQuery)
        .then(rows => {
            if(rows.length) {
                for(var i = 0; i < rows.length; i++) {
                    clubName = rows[i].clubName
                    dotNum = rows[i].dotNumber
                    hearingDate = rows[i].hearingDate
                    descrip = rows[i].description
                    requested = rows[i].requested
                    decision = rows[i].decision
                    approved = rows[i].approved

                    message = message + `\n` + clubName + "," + dotNum + "," + hearingDate + "," + descrip + "," + requested + "," + decision + "," + approved
                }
                sendMessage(channelID, message + "```");
            } else {
                sendMessage(channelID, `No requests in the past seven days!`);
            }
    });

}

// Get the current Fiscal Year
function getCurrentFiscalYear() {
    const now = new Date();

    if(now.getMonth() < 6) {
        return parseInt(now.getFullYear().toString().substr(-2));
    } else {
        return parseInt((now.getFullYear() + 1).toString().substr(-2));
    }
}
