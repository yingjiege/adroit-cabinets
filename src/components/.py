from pymongo import MongoClient
connection_string = "mongodb+srv://1026509513ge:hzhz950822@cluster0.xonnkgy.mongodb.net/"

client = MongoClient(connection_string)
db = client.get_database("adroit")

collection = db.get_collection("user")

document = {"item": "canvas",
            "qty": 100,
            "tags": ["cotton"],
            "size": 0}

select = {
    "ADoorColor": "PET WHITE 1S HG",
    "BDoorColor": "TAFISA  L080  ( C )",
    "CDoorColor": "",
    "PO": 1245,
    "cabinetBox": "WHITE_BOX",
    "cabinetLeg": "Plastic",
    "cabinetSize": "W363912",
    "company": "Lamode Kitchens",
    "discount": 34,
    "drawer": "PLYWOOD DRAWER",
    "hingeType": "STANDARD",
    "slide": "STANDARD UM SLIDE"
}
items = []
items.append(
{
    "BO": 353.14,
    "DO": 272.53,
    "botDF": "",
    "cabinetSize": "SB30_3DB",
    "customizeAddOn": "3DB LOOK W/ DRAWER",
    "depth": 24,
    "doorColor": "PET WHITE 1S HG",
    "doorH": "",
    "doorType": "SAPPHIRE_PET",
    "finLOrR": "",
    "height": 34.5,
    "hinge": "",
    "id": 9,
    "memo": "",
    "notchOut": "",
    "pcDoor": "",
    "pcTopDoor": "",
    "price": 342.73,
    "qty": 1,
    "width": 30,
}
)

collection.insert_many(items)
