/**
 * DOT模板引擎插件
 */

define('dot', function() {
    return {
        load: function(name, parentRequire, onload, config) {
            var index = name.lastIndexOf('.'),
                segment = name.split('/')[0],
                isRelative = segment === '.' || segment === '..';

            if (index !== -1 && (!isRelative || index > 1)) {
                // do nothing
            } else {
                // 如果没有后缀名，默认地址添加上.hbs
                //name += '.hbs';
            }

            fish.ajax({
                dataType: 'text',
                type: 'get',
                url: parentRequire.toUrl(name),
                success: function(data) {
                    var Fn = doT.template(data);
                    Fn._t = "1";//默认的DOT模版函数无可遍历属性……加一个属性让isEmpty判断为false，才能渲染
                    onload(Fn);
                }
            });
        }
    };
});