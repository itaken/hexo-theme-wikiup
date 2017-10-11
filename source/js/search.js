// 查找文档
;(function($){
    var methods = {
        datas: null,
        // 内容过滤
        xmlFilter: function(responseText){
            if(responseText === "" || typeof(responseText) !== "string"){
                return;
            }
            var datas = $("entry", responseText).map(function() {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();
            methods.datas = datas;
        },
        getData: function(path){
            if(typeof(path) !== "string" || path.length < 1){
                return;
            }
            if(methods.datas !== null){
                return;
            }
            var $this = this;
            $.ajax({
                url: path,
                dataType: "xml",
                success: function(xmlResponse) {
                    $this.xmlFilter(xmlResponse);
                },
                error: function(err){
                    var responseText = err.responseText;
                    $this.xmlFilter(responseText);
                }
            });
        },
        insertHtml: function(datas, keywords, $resultContent){
            if($resultContent === null || $resultContent === "" || $resultContent === undefined){
                return;
            }
            if(typeof($resultContent) != "object"){
                $resultContent = $($resultContent)[0];
            }
            if(keywords === null || typeof(keywords) !== "string" || keywords.length < 1){
                $resultContent.innerHTML = "";
                return;
            }
            if(datas === null || typeof(datas) !== "object" || datas.length < 0){
                $resultContent.innerHTML = "<span>Oops: 404</span>";
                return;
            }
            var str='<ul class=\"search-result-list\">';
            var keywords = keywords.trim().toLowerCase().split(/[\s\-]+/);
            $resultContent.innerHTML = "";
            datas.forEach(function(data) {
                var isMatch = true;
                var content_index = [];
                if (!data.title || data.title.trim() === '') {
                    data.title = "Untitled";
                }
                var data_title = data.title.trim().replace(/(\<\!\[cdata\[)|(\]\]\>)/ig,"").toLowerCase();
                var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                var data_url = data.url;
                var index_title = -1;
                var index_content = -1;
                var first_occur = -1;
                // only match artiles with not empty contents
                if (data_content !== '') {
                    keywords.forEach(function(keyword, i) {
                        index_title = data_title.indexOf(keyword);
                        index_content = data_content.indexOf(keyword);

                        if( index_title < 0 && index_content < 0 ){
                            isMatch = false;
                        } else {
                            if (index_content < 0) {
                                index_content = 0;
                            }
                            if (i == 0) {
                                first_occur = index_content;
                            }
                        }
                    });
                } else {
                    isMatch = false;
                }
                if (isMatch) {
                    str += "<li><a href='"+ data_url +"' class='search-result-title'>"+ data_title +"</a>";
                    var content = data.content.trim().replace(/<[^>]+>/g,"");
                    if (first_occur >= 0) {
                        var start = first_occur - 20;
                        var end = first_occur + 80;
                        if(start < 0){
                            start = 0;
                        }
                        if(start == 0){
                            end = 100;
                        }
                        if(end > content.length){
                            end = content.length;
                        }
                        var match_content = content.substr(start, end);
                        keywords.forEach(function(keyword){
                            var regS = new RegExp(keyword, "gi");
                            match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                        });

                        str += "<p class=\"search-result\">" + match_content +"...</p>"
                    }
                    str += "</li>";
                }
            });
            str += "</ul>";
            $resultContent.innerHTML = str;
        }
    };
    $.fn.wiki = function(options){
        var $input = this[0];
        $input.addEventListener('input', function(e){
            var val = this.value;
            methods.getData(options.path);  // 获取文档内容
            methods.insertHtml(methods.datas, val, options.dirdom);  // 根据keyword筛选结果
        });
    };
})(jQuery);
