Hexo-Theme-Wikiup
===

The theme is built based on [wixo](https://github.com/wzpan/hexo-theme-wixo/).

## Requirements ##

* Hexo >= 3.0
* hexo-generator-search >= 2.1
* hexo-renderer-sass >= 0.3 ( for development )

## Install ##

1) install theme:

```bash
$ git clone https://github.com/itaken/hexo-theme-wikiup.git themes/wikiup
```

2) install `hexo-generator-search`, `hexo-renderer-sass`

``` sh
$ npm install hexo-generator-search --save

$ npm install hexo-renderer-sass --save
```

3) modify theme setting in your `_config.yml` to`wikiup`.

## Snapshot ##

### homepage's snapshot

![wikiup homepage snapshot](https://raw.githubusercontent.com/itaken/hexo-theme-wikiup/master/snapshot.png)

### content page's snapshot

![wikiup article page](https://raw.githubusercontent.com/itaken/hexo-theme-wikiup/master/article.png)

## Configuration ##

```
rss: atom.xml
favicon: favicon.ico
fold: true
google_analytics:
scratch_name: Scratch
search:
  path: search.xml
  field: all
```

## License ##

under [MIT License](http://opensource.org/licenses/MIT).
