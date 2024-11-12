function selectCity(city){
    //send to server
    fetch(`/city?name=${encodeURIComponent(city)}`, {
        method: "GET"
    })
    .then(response => response.json()) //Get ansver from server
    .then(data => { //handle the answer
        const front = document.getElementById("header");
        front.innerHTML=city;
        console.log(data);

        /*const flowers = document.createElement("h2");
        flowers.innerHTML("House Plants");*/

        if (city === "Both"){
            let joinedData = joinData(data)
            console.log(joinedData);
            clearTable();
            createTable(joinedData, "Stocks from both databases combinated")
        }
        else {
            clearTable();
            createTable(data, "Stock");
        }
        
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function joinData(data){
    const joidenData = data.reduce((acc, item) => {
        const existing = acc.find(flower => flower.id === item.id);

        if (existing){
            existing.stock += item.stock;
        }
        else {
            acc.push(item);
        }
        return acc;
    }, []);
    return joidenData;
}

function clearTable(){
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML=""
}

function createTable(data, header) {
    const tableHeader = document.createElement("h3");
    tableHeader.textContent = header;
    tableContainer.appendChild(tableHeader);
    //tableContainer.innerHTML=""
    const objectLength = Object.keys(data[1]).length;

    const table= document.createElement("table");
    const headerRow = document.createElement("tr");
    let headers = ["id", "name", "price", "stock"];

    //Creating header row
    
    headers.forEach(headerText => {
        const header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);
    data.forEach(item => {
        const row = document.createElement("tr");

        Object.values(item).forEach(info => {
            const cell = document.createElement("td");
            cell.textContent = info;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

async function insertData(city){
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    if (!name || !price || !stock) {
        alert("Please fill in all fields.");
        return;
    }
    if (stock < 0){
        alert("stock number can't be negative")
        return
    }

    //Check if existing
    try {
        const response = await fetch(`/city?name=${encodeURIComponent(city)}`, {
        method: "GET"
        });
        const data = await response.json();
        
        console.log(data)

        //Check if plant already exists
        if (checkIfExisting(data, name)) {
            console.log("Plant already exiting in database. Please try to modify it");
            alert("Plant already exists in database. Please try to modify it.");
            return;
        }
        
    } catch (error) {
        console.error("Error:", error);
    }    

    const id = await collectAll() +1;
    
    await fetch(`/insert?city=${encodeURIComponent(city)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name, price, stock })
    })
    .then(response => response.json())
    .then(data => {
        console.log("data inserted:" , data);
        alert("Data inserted successfully");
        document.getElementById("insertForm").reset();
    })
}

async function collectAll(){
     //send to server

     try{
        const response = await fetch("/both", {
            method: "GET"
        });

        const data = await response.json();
        const joined = joinData(data);
        const length = joined.length; 
        return length;
     }
     catch (err){
        console.log("Error:",err);
     }   
}

async function deleteData(city){
    const name = document.getElementById("deleteName").value;
   //send to server
    try {
        await fetch(`/delete?city=${encodeURIComponent(city)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            console.log("data deleted:" , data);
            alert("Data deleted successfully");
            document.getElementById("deleteForm").reset();
        })
        
    }catch(error) {
        console.error("Error:", error);
    };
}

function checkIfExisting(database, name){
    return database.some(flower => flower.name.toLowerCase() === name.toLowerCase());
}

async function modifyData(city) {
    const name = document.getElementById("modifyName").value;
    const price = document.getElementById("newPrice").value;
    const stock = document.getElementById("newStock").value;

    console.log(name);
    console.log(price);
    console.log(stock);

    if (!name) {
        alert("Please fill name field.");
        return;
    }
    if (stock < 0){
        stock = 0
    }

    if (price === "" & stock === ""){
        alert("Please fill atleast one of the updatable values");
        return
    }

    const response = await fetch(`/city?name=${encodeURIComponent(city)}`, {
        method: "GET"
        });
    const data = await response.json();

    if (checkIfExisting(data, name)){
        try {
        await fetch(`/modify?city=${encodeURIComponent(city)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price, stock })
        })
        .then(response => response.json())
        .then(data => {
            console.log("data modified for:" , name);
            alert("Data modified successfully");
            document.getElementById("modifyForm").reset();
        })
        
        }catch(error) {
            console.error("Error:", error);
        };
    }
    else{
        console.log("no flower: " + name)
    }
    

}