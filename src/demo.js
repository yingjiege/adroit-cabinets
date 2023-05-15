// const {MongoClient} = require('mongodb');

// async function main(){

//     const uri = "mongodb+srv://1026509513ge:hzhz950822@cluster0.xonnkgy.mongodb.net/?retryWrites=true&w=majority";

//     const client = new MongoClient(uri);

//     await client.connect();

//     try{
//         await client.connect();
//         //connect list
//         await listDatabases(client);
//         //create list
//         // await createListing(client, {
//         // name : "jkljl"
//         // })

//         // await createMultipleListings{

//         // },
//         // {

//         // }
//     //     await findOneListingByName(client, "Infinite Views");
//     // } catch (e){
//     //     console.error(e);
//     // } finally {
//     //     await client.close();
//     // }
//         await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
//             minimumNumberOfBedrooms:4,
//             minimumNumberOfBathrooms:2,
//             maximumNumberOfResults: 5

//         })
// }
// };
// main().catch(console.error);

// async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
//     minimumNumberOfBedrooms = 0,
//     minimumNumberOfBathrooms = 0,
//     maximumNumberOfResults = Number.MAX_SAFE_INTEGER
// } = {}){
//     const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
//         bedrooms: { $gte: minimumNumberOfBedrooms},
//         bathrooms: { $gte: minimumNumberOfBathrooms}
//     }).sort({last_review: -1})
//     .limit(maximumNumberOfResults);

//     const results = cursor.toArray();

// }

// async function findOneListingByName(client, nameOfListing){
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing
//     });

//     if(result){
//         console.log(`found a listing in the collection '${nameOfListing}'`);
//         console.log(result);
//     }else{
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
// }

// async function createListing(client, newListing){
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

//     console.log(`New listing created`)
// }

// async function listDatabases(client){
//    const databaseList = await client.db().admin().listDatabases();

//    console.log("Databases:");
//    databaseList.databases.forEach(db =>{
//     console.log(`- ${db.name}`);
//    })
// }

// async function createMultipleListings(client, newListings){
//     const result = await client.db("sample_airbnb").collection("listingsAndReview").insertMany(newListings);
//     console.log(`${result.insertedCount} new listings created:`);
//     console.log(result.insertedIds);
// }