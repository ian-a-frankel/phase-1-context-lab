/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let employeeRecord

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(individualPersonalData) {
    employeeRecord = {firstName: individualPersonalData[0],
        familyName: individualPersonalData[1],
        title: individualPersonalData[2],
        payPerHour: individualPersonalData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(MultiplePersonalData) {
    return MultiplePersonalData.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp) {
    let timeInEvent = {
        type: 'TimeIn',
        hour: getHour(dateStamp),
        date: getDate(dateStamp)
    }
    this.timeInEvents.push(timeInEvent)
    return this
    
}

function createTimeOutEvent(dateStamp) {
    const timeOutEvent = {
        type: 'TimeOut',
        hour: getHour(dateStamp),
        date: getDate(dateStamp)
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

function getDate(dateStamp) {
    //console.log(dateStamp)
    return dateStamp.slice(0,10)
}

function getHour(dateStamp) {
    //console.log(dateStamp)
    return Number(dateStamp.slice(11,15))
}

function hoursWorkedOnDate(date) {
    
    let hoursWorked = 0
    for (let index = 0; index < this.timeInEvents.length; index++) {
        
        if (this.timeOutEvents[index]['date']===date) {
            hoursWorked = hoursWorked + this.timeOutEvents[index]['hour']
        }
    }
    for (let index = 0; index < this.timeOutEvents.length; index++) {
        if (this.timeInEvents[index]['date']===date) {
            hoursWorked = hoursWorked - this.timeInEvents[index]['hour']
        }        
    }

    return hoursWorked /100
}

function wagesEarnedOnDate(date) {
    
    let hoursCounter = hoursWorkedOnDate.bind(this)

    return this.payPerHour * hoursCounter(date)
}

function findEmployeeByFirstName(srcArray, firstName) {
    
    for (let employee of srcArray) {
        if (employee.firstName===firstName) {
            return employee
        }
    }
    
    return undefined
}

function calculatePayroll(srcArray) {
    return srcArray.map(employee => allWagesFor.bind(employee)()).reduce((a,b) => a + b, 0)
}