!function(){
	"use strict";

    $.widget("ui.tabs", $.ui.tabs, {
        options: {
            templateArr: "<li><a href='#{href}'><button type='button' class='close' role='button'>&times;</button>#{label}</a></li>"
        },
        _bindCloseEvent: function (flag) {
            var that = this;
            if (that.hasBindCloseEvent) return;
            this.element.on("click", "button.close", function () {
                var index = that.tabs.index($(this).closest("li"));
                that.remove(index);
            });
            that.hasBindCloseEvent = true;
        },
       _processTabs: function () {
            var that = this,
                prevTabs = this.tabs,
                prevAnchors = this.anchors,
                prevPanels = this.panels;

            this.tablist = this._getList()
                .addClass("ui-tabs-nav")
                .attr("role", "tablist")

                // Prevent users from focusing disabled tabs via click
                .delegate("> li", "mousedown" + this.eventNamespace, function (event) {
                    if ($(this).is(".ui-state-disabled")) {
                        event.preventDefault();
                    }
                })

                // support: IE <9
                // Preventing the default action in mousedown doesn't prevent IE
                // from focusing the element, so if the anchor gets focused, blur.
                // We don't have to worry about focusing the previously focused
                // element since clicking on a non-focusable element should focus
                // the body anyway.
                .delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                    if ($(this).closest("li").is(".ui-state-disabled")) {
                        this.blur();
                    }
                });

            this.lastTablistWidth = this.tablist.width();

            this.tabs = this.tablist.find("> li:has(a)").not('.ui-tabs-paging-prev,.ui-tabs-paging-next') //:has(a[href])
                .addClass("ui-state-default")
                .attr({
                    role: "tab",
                    tabIndex: -1
                });

            this._visibleTabs = this.tabs.filter(function(index, el) {
                return !$(el).hasClass('ui-tabs-hidden');
            });

            this.anchors = this.tabs.map(function () {
                    return $("a", this)[0];
                })
                .addClass("ui-tabs-anchor")
                .attr({
                    role: "presentation",
                    tabIndex: -1
                });

            this.panels = $();

            this.anchors.each(function (i, anchor) {
                var selector, panel, panelId,
                    anchorId = $(anchor).uniqueId().attr("id"),
                    tab = $(anchor).closest("li"),
                    originalAriaControls = tab.attr("aria-controls");

                // inline tab
                if (that._isLocal(anchor)) {
                    selector = anchor.hash;
                    panelId = selector.substring(1);
                    panel = that.element.find(that._sanitizeSelector(selector));
                } else { //没有hash的时候,
                	//修改获取TAB逻辑：改为查找有指定class的div而不是获取子元素
                    panel = that.element.children().siblings("div.ui-tabs-panel:eq(" + i + ")");
                    panelId = panel.attr("id");
                    if (!panelId) {
                        panelId = tab.attr("aria-controls") || $({}).uniqueId()[0].id;
                        panel.attr("id", panelId);
                    }
                    selector = "#" + panelId;
                    $(anchor).attr("href", selector);
                    panel.attr("aria-live", "polite");
                }

                if (panel.length) {
                    that.panels = that.panels.add(panel);
                }
                if (originalAriaControls) {
                    tab.data("ui-tabs-aria-controls", originalAriaControls);
                }
                tab.attr({
                    "aria-controls": panelId,
                    "aria-labelledby": anchorId
                });
                panel.attr("aria-labelledby", anchorId);
            });

            this.panels
                .addClass("ui-tabs-panel")
                .attr("role", "tabpanel");

            // Avoid memory leaks (#10056)
            if (prevTabs) {
                this._off(prevTabs.not(this.tabs));
                this._off(prevAnchors.not(this.anchors));
                this._off(prevPanels.not(this.panels));
            }
            if (this.options.fixedHeight) {
                this.panels.addClass('ui-tabs-panel-absolute');
            }

        },
        _getList: function () {
        	//修改获取UL逻辑：改为搜索UL而不是必定取子元素
            return this.tablist || this.element.find("ol,ul").eq(0);
        },
        _create: function() {
            var options = this.options;
            if (!options.style || !_.isFinite(options.style)) {
                options.style = 1;
            }
            //修改tab多处一栏后左右按钮的样式
            if (options.paging) {
                options.paging = {
                    nextButton  : '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
                    prevButton  : '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
                }
            }
			options.tabCanCloseTemplate = options.templateArr;

			this._super();
		},
		add: function (o) {
			var id = o.id;
			id || $({}).uniqueId()[0].id;
			this._super(o);
		}
	});
}();