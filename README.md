# bgg-collection

## Display a BoardGame Geek collection in React

This isn't anything particularly exciting, but it's a simple little React application for display a BoardGame Geek collection.

### Technical stuff

This uses:

+ React
+ redux
+ Some other stuff

More or less, this was just a playground to build a small API-driven web application in React with Redux for managing application state and all that fun stuff. It's written in ES2015 syntax, so just be on the lookout for that, I guess.

#### The API!

As it stands, you'll also need to be running [`bgg-api`](https://github.com/mattmontgomery/bgg-api) on port 3000 -- that's high on the list of things to change, mostly where it concerns configuration files so you can run it all yourself.

#### Running bgg-collection

**Build**

```
npm run build
```

This will build the files (using webpack) into `dist/`. You can host that.

**In development**

```
npm start
```

This will launch a `webpack-dev-server`, which has made development about 700 percent easier to handle. No more tedious refresing! Whee!

### Contributing

Want to contribute? Just make a pull request. I'll be sure to credit you, too, if that's the sort of thing you're concerned about. Or if you're not, really. You deserve it.
