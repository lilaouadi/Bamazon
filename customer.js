// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    displayProducts();
});
function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.table(res);
        promptForItem(res);
    })
}
function promptForItem(inventory){
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the ID  of the item you would like to buy?"
        }
    ]).then(function(answer){
        var productID = parseInt(answer.choice);
        var userChooseProduct = checkInventory(productID, inventory);
        if(userChooseProduct){
            promptForQuantity(userChooseProduct);
        }
        else{
            console.log("The item you choose is not in the inventory. Try different one");
            displayProducts();
        }

    })
}
function checkInventory(id, inventory){
    for(var i=0; i<inventory.length; i++){
        if(inventory[i].id == id){
            return inventory[i]
        }
    }
    return null;
}
function promptForQuantity(productInfo){
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many you would like to buy?"
        }
    ]).then(function(answer){
        var userQantity = parseInt(answer.quantity);
        if(userQantity > productInfo.quantity){
            console.log("\n Insufficient quantity");
            displayProducts();
        }
        else{
            makePurchase(productInfo, userQantity)
        }
    })

}

function makePurchase(productInfo, userQuantity){
    connection.query(
        "UPDATE products SET quantity = quantity - ? WHERE id = ?", 
        [userQuantity, productInfo.id],
        function(err, res){
            console.log("\n Successfully purchase " +productInfo.productName +" which costs " +productInfo.price * userQuantity)
            displayProducts();
        }
    );
}