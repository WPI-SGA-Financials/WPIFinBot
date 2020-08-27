import { sendMessage } from './constants';

export function printAllNumbers(database, userID, channelID) {
    let bAllocation;
    let frAllocation;
    let mtAllocation;

    var message = `<@${userID}>, here are the numbers for the current Fiscal Year (FY ${getCurrentFiscalYear()}):`

    // Get the Total Allocations for the Current Year
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
        })
        .then( () => {
            message = message
                + `\n\tTotal Budget Allocation: ` + bAllocation
                + `\n\tTotal Funding Request Allocation: ` + frAllocation
                + `\n\tTotal Mandatory Transfer Allocation: ` + mtAllocation

                sendMessage(channelID, message);
        })
}

function getCurrentFiscalYear() {
    const now = new Date();

    if(now.getMonth() < 6) {
        return parseInt(now.getFullYear().toString().substr(-2));
    } else {
        return parseInt((now.getFullYear() + 1).toString().substr(-2));
    }
}
