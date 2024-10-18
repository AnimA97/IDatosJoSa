Bueno, parado en la carpeta BillboardDB
- Consola y corre `cds watch`. Esto va dejar corriendo la API en localhost:4004
-Luego las siguientes URL que te sirvan de ejemplo pero podes filtrar de esta manera por cualquier atributo de los que disponen los endpoints:
http://localhost:4004/odata/v4/billboard/Song
tienen tope de 1000 las consultas, asi que vas a tener que ir haciendo skip para recorrer
http://localhost:4004/odata/v4/billboard/Song?$skiptoken=1000
http://localhost:4004/odata/v4/billboard/Song/$count
http://localhost:4004/odata/v4/billboard/Song?$filter=track_id eq 13
http://localhost:4004/odata/v4/billboard/Song?$filter=rank eq 1

http://localhost:4004/odata/v4/billboard/SongName
http://localhost:4004/odata/v4/billboard/SongName?$skiptoken=1000

