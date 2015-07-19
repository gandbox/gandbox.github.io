# Tribute to the demoscene & a Kuzzle Baas showcase

This JavaScript tribute to the demoscene is also an exemple of the [kuzzle.io](http://kuzzle.io) project, as a Open Source BAAS (Backend-as-a-sevice) to syncronize users & store schema-less datas

![](https://raw.github.com/gandbox/gandbox.github.io/master/medias/KUZZLE_LOGO.png)

# How to use

Open [gandbox.github.io](http://gandbox.github.io) and share with a maximum of other users. A new coming user will generate a new 3D effect (with more triangles), will play a new chiptune, and will push the display to all other users

# How to run locally

You need to run this code behind HTTP to make the music work (XHR limitation), so can use docker from the local folder, and open [http://localhost:8080/](http://localhost:8080/)

```bash
docker run --name some-nginx -p 8080:80 -v $(pwd):/usr/share/nginx/html -d nginx
```

You can purge the user collection as this : [http://localhost:8080/purge.html](http://localhost:8080/purge.html)

# Credits & Greetings

* Main code by [gandbox](http://github.com/gandbox), inspired by the [Triangle mesh for 3D objects code](http://www.script-tutorials.com/demos/319/index2.html) (MIT License)
* Music by [gandbox](http://amp.dascene.net/detail.php?detail=modules&view=2949), selection of old amiga chiptunes
* Amiga JS protracker player is [Webaudio mod player](https://github.com/jhalme/webaudio-mod-player)
* Bandend-as-a-service is powered by [Kuzzle.io](http://kuzzle.io)
