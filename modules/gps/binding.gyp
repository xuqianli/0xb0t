{
  "targets": [
    {
      "target_name": "gpsAddon",
      "sources": [ "gpsCoordinates.cc" ],
      "link_settings": {
        "libraries": [
          "-lgps","-lm", "-lgpsCoords"
        ]
      }
    }
  ]
}

