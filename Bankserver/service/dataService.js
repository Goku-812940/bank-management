const db = require('./db')
const jwt = require('jsonwebtoken')
// userDetails = {
//     1000: { acnumber: 1000, username: "gokul", password: 123, balance: 0, transaction: [] },
//     1001: { acnumber: 1001, username: "anu", password: 1234, balance: 0, transaction: [] },
//     1002: { acnumber: 1002, username: "manu", password: 1235, balance: 0, transaction: [] },
//     1003: { acnumber: 1003, username: "arun", password: 1236, balance: 0, transaction: [] }
// }
// register


register = (acno, uname, psw) => {

    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                statusCode: 401,
                status: false,
                message: "User Already Exist"
            }
        }
        else {
            const newuser = new db.User({
                acno,
                username: uname,
                password: psw,
                balance: 0,
                transaction: []
            })

            newuser.save()
            return {
                statusCode: 200,
                status: true,
                message: "Registration Success"
            }
        }
    })
}

login = (acno, psw) => {

    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {

            const token = jwt.sign({ currentAcno: acno }, 'secretkey')
            return {
                statuscode: 200,
                status: true,
                message: 'login success',
                currentAcno: acno,
                currentUser: user.username,
                token
            }
        }
        else {
            return {
                statuscode: 401,
                status: false,
                message: 'incurrect acno or password'
            }
        }
    })

}

Deposit = (acno, password, amount) => {

    var amnt = parseInt(amount)
    return db.User.findOne({ acno, password }).then(user => {
        if (user) {
            user.balance += amnt
            user.transaction.push({ type: 'CREDIT', amount: amnt })
            user.save()
            return {
                statuscode: 200,
                status: true,
                message: ` ${user.balance}`
            }

        }

        else {
            return {
                statuscode: 401,
                status: false,
                message: 'incurrect acno or password'
            }
        }
    })
}
Withdraw = (acno, password, amount) => {

    var amnt = parseInt(amount)
    return db.User.findOne({ acno, password }).then(user => {
        if (user) {
            if (amnt <= user.balance) {
                user.balance -= amnt
                user.transaction.push({ type: 'DEBIT', amount: amnt })
                user.save()

                return {
                    statuscode: 200,
                    status: true,
                    message: `${user.balance}`
                }
            }
            else {
                return {
                    statuscode: 401,
                    status: false,
                    message: "incuffecent balance"
                }
            }

        }
        else {
            return {
                statuscode: 401,
                status: false,
                message: "incurrect acno or password"
            }
        }

    })



}
gettransaction = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                statuscode: 200,
                status: true,
                message: user.transaction
            }
        }
        else {
            return {
                statuscode: 401,
                status: false,
                message: "incurrect acno"
            }
        }

    })

}
acdelete = (acno) => {
    return db.User.deleteOne({ acno }).then(user => {
        if (user) {
            return {
                statuscode: 200,
                status: true,
                message: "ac deleted"
            }
        }
        else {
            return {
                statuscode: 401,
                status: false,
                message: "incurrect acno"
            }
        }
    })
}




module.exports = {
    register,
    login,
    Deposit,
    Withdraw,
    gettransaction,
    acdelete
}
