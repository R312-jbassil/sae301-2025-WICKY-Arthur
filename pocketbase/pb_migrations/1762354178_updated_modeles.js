/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3092620573")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number404859414",
    "max": null,
    "min": null,
    "name": "ancien_prix",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1571875426",
    "maxSelect": 1,
    "name": "fabrication_fr",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "oui",
      "non"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3092620573")

  // remove field
  collection.fields.removeById("number404859414")

  // remove field
  collection.fields.removeById("select1571875426")

  return app.save(collection)
})
