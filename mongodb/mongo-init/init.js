db = db.getSiblingDB("lab5_mongodb");

db.createCollection("managers");

print("Collections created succesfully!");

db.managers.insertMany([
    { full_name: "Michael Scott", age: 38, sex: "male" }
]);

print("Sample data inserted succesfully!");
