/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_655489046")

  // update collection data
  unmarshal({
    "name": "modele_ia"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_655489046")

  // update collection data
  unmarshal({
    "name": "modele"
  }, collection)

  return app.save(collection)
})
