## Summary: 
A memory game with Star Wars theme for individuals. The game allows you to choose between some of my favourite Characters or the often overlooked Droids heroes like NED-8, AZI-3, IG-11. 
There are constraints check for no duplicate users. 
Upon successful signin, your personal best score to date will be displayed. If you beat your record, the best score will be updated. Otherwise the old record will remain.
Enjoy the music too! 

## Have fun!
[Play here](http://memory-game.1regina.com:8080/signin.html)

## Database

###

Connection file `./services/db`

 ### Migration
 
```
node db/migrate/index.js

```

### Seed

```
node db/seed/index.js
```


### Sample views 
Droid View         |  Character Views | Game Cover
:-------------------------:|:-------------------------:|:-------------------------:
![](views/characters.jpg)  |  ![](views/droids.jpg)|  ![](views/start.jpg)
