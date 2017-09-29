// 目录树实现
// see: http://blog.lxjwlt.com/front-end/2014/07/06/js-create-directory.html
;(function(global) {
    // 查找子元素
    var children = function children(childNodes, reg) {
        var result = [],
            isReg = typeof reg === 'object',
            isStr = typeof reg === 'string',
            node, i, len;

        for (i = 0, len = childNodes.length; i < len; i++) {
            node = childNodes[i];

            if ((node.nodeType === 1 || node.nodeType === 9) &&
                (!reg ||
                isReg && reg.test(node.tagName.toLowerCase()) ||
                isStr && node.tagName.toLowerCase() === reg)) {

                result.push(node);
            }
        }
        return result;
    },
    // 创建目录
    createDirectory = function(article, directory, isDirNum) {
        var contentArr = [],
            titleId = [],
            levelArr, root, level,
            currentList, list, li, link, i, len;

        // 获取标题编号 标题内容
        levelArr = (function(article, contentArr, titleId) {
            var titleElem = children(article.childNodes, /^h\d$/),
                levelArr = [],
                lastNum = 1,
                lastRevNum = 1,
                count = 0,
                guid = 1,
                id = 'directory' + (Math.random() + '').replace(/\D/, ''),
                lastRevNum, num, elem;

            while (titleElem.length) {
                elem = titleElem.shift();
                // 保存标题内容
                contentArr.push(elem.innerHTML);
                // 当前的标题编号
                num = +elem.tagName.match(/\d/)[0];

                // 修正
                if (num > lastNum) {
                    levelArr.push(1);
                    lastRevNum += 1;
                } else if (num === lastRevNum ||
                    num > lastRevNum && num <= lastNum) {
                    levelArr.push(0);
                    lastRevNum = lastRevNum;
                } else if (num < lastRevNum) {
                    levelArr.push(num - lastRevNum);
                    lastRevNum = num;
                }
                count += levelArr[levelArr.length - 1];
                lastNum = num;
                // 添加标识符
                elem.id = elem.id || (id + guid++);
                titleId.push(elem.id);
            }
            // 避免一开始就进入下一层
            if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0;

            return levelArr;
        })(article, contentArr, titleId);
        // 构造目录
        currentList = root = document.createElement('ul');
        dirNum = [0];
        for (i = 0, len = levelArr.length; i < len; i++) {
            level = levelArr[i];
            if (level === 1) {
                list = document.createElement('ul');
                if (!currentList.lastElementChild) {
                    currentList.appendChild(document.createElement('li'));
                }
                currentList.lastElementChild.appendChild(list);
                currentList = list;
                dirNum.push(0);
            } else if (level < 0) {
                level *= 2;
                while (level++) {
                    if (level % 2) dirNum.pop();
                    currentList = currentList.parentNode;
                }
            }
            dirNum[dirNum.length - 1]++;
            li = document.createElement('li');
            link = document.createElement('a');
            link.href = '#' + titleId[i];
            var title = contentArr[i].replace(/(<([^>]+)>)/ig,"");  // 去除tag
            link.innerHTML = !isDirNum ? title : dirNum.join('.') + ' ' + title ;
            // console.log(title);
            li.appendChild(link);
            // console.log(li);
            currentList.appendChild(li);
        }
        directory.appendChild(root);
    };
    createDirectory(document.getElementById('article'),
        document.getElementById('directory'), true);
})(window);
// 实现 目录树 滑动显示和隐藏
// see: https://segmentfault.com/q/1010000002620368
function scroll( fn ) {
    var beforeScrollTop = document.body.scrollTop,
        fn = fn || function() {};
    window.addEventListener("scroll", function() {
        var afterScrollTop = document.body.scrollTop,
            delta = afterScrollTop - beforeScrollTop;
        if( delta === 0 ) return false;
        fn( delta > 0 ? "down" : "up" );
        beforeScrollTop = afterScrollTop;
    }, false);
}
scroll(function(direction) {
    // console.log(direction);
    if(document.body.offsetWidth < 767){  // 如果小屏幕,则不出现目录树
        document.getElementById("directory").style.display = "none";
        return;
    }
    var ele = document.getElementById("directory");
    if(direction == "down"){
        // ele.style.display = "none";
        ele.className = "animated fadeOutDown";
    }else if(direction == "up"){
        ele.className = "animated fadeInUp";
        ele.style.display = "block";
    }
});
