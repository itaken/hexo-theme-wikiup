Hexo-Theme-Wikiup
===

本主题, 基于[wixo](https://github.com/wzpan/hexo-theme-wixo/)

## Requirements ##

* Hexo >= 3.0
* hexo-generator-search >= 2.1
* hexo-generator-tag >= 0.2
* hexo-renderer-ejs >= 0.3
* hexo-renderer-marked >= 0.3
* hexo-renderer-sass >= 0.3

## 安装 ##

1) install theme:

```bash
$ git clone https://github.com/itaken/hexo-theme-wikiup.git themes/wikiup
```

2) install `hexo-generator-search`, `hexo-renderer-sass`

``` sh
$ npm install hexo-generator-search --save

$ npm install hexo-renderer-sass --save
```

3) 修改 `_config.yml` 中的 `theme` 为 `wikiup`.

![wikiup](https://raw.githubusercontent.com/itaken/hexo-theme-wikiup/master/snapshot.png)

## 配置 ##

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

本主题使用 [MIT License](http://opensource.org/licenses/MIT).
