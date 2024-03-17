#! /usr/bin/env node
import inquirer from 'inquirer';
console.log("<<<<<............ATM SYSTEM..............>>>>>>>");
let usersIfo = {
    userName: "asad",
    userpass: 1122,
    Balance: 5000,
};
async function ATM() {
    const AccountNumber = await inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "Enter your Name:",
        },
        {
            name: "password",
            type: "password",
            message: "Enter your Password:",
        },
    ]);
    if (AccountNumber.username == usersIfo.userName && (AccountNumber.password) == usersIfo.userpass) {
        console.log("Welcome to ATM System");
        let operation = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: "Choose your Options",
                choices: ['Withdraw', 'Balance inquiry', 'Deposit', 'Fast Cash', 'Exit'],
            },
        ]);
        switch (operation.operation) {
            case 'Withdraw':
                let amount = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter your Amount",
                    },
                ]);
                if (amount.amount > usersIfo.Balance) {
                    console.log("Insufficient Balance");
                }
                else {
                    usersIfo.Balance -= amount.amount;
                    console.log(`Withdrawal Successful. Remaining Balance: ${usersIfo.Balance}`);
                }
                break;
            case 'Balance inquiry':
                console.log(`Your Current Balance is: ${usersIfo.Balance}`);
                break;
            case 'Deposit':
                let depositAmount = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the Deposit Amount",
                    },
                ]);
                usersIfo.Balance += depositAmount.amount;
                console.log(`Deposit successful. New Balance: ${usersIfo.Balance}`);
                break;
            case 'Fast Cash':
                let FastCash = await inquirer.prompt([
                    {
                        name: 'Cash',
                        type: 'list',
                        choices: ['500', '1000', '2000', '5000', '7000', '10000'],
                    },
                ]);
                if (FastCash.Cash > usersIfo.Balance) {
                    console.log("Insuficient Balance");
                }
                else {
                    usersIfo.Balance -= FastCash.Cash;
                    console.log(`Withdrawal Successful. Remaining Balance: ${usersIfo.Balance}`);
                }
            case 'Exit':
                console.log("Thank you for using the ATM. Goodbye!");
                break;
            default:
                console.log("Invalid Option");
        }
        let confirm = await inquirer.prompt([{
                type: "confirm",
                name: "confirm",
                message: "Do you want Exit or Not",
            }]);
        if (confirm.confirm == false) {
            ATM();
        }
    }
    else {
        console.log("Invalid Credentials");
    }
}
ATM();
