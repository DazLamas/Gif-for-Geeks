# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Gift.create(
      gift: '{
  "id": 1,
  "game": {
      "id": 1,
      "customizations": {
        "player": "assets/players/player.png",
        "bg": "#3298db",
        "spring": "assets/blocks/spring2.png",
        "point": "assets/items/point2.png",
        "score": "perras",
        "lifes": "infartos"
      }
    },
  "title": "Juego de prueba",
  "recipient": "Carlos",
  "description": "dfafsdfdsfs"
}'
      )