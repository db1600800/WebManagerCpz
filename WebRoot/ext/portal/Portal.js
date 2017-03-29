/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.ux.Portal = Ext.extend(Ext.Panel, {
    layout: 'column',
    autoScroll:true,
    cls:'x-portal',
    defaultType: 'portalcolumn',

    initComponent : function(){
        Ext.ux.Portal.superclass.initComponent.call(this);
        this.addEvents({
            validatedrop:true,
            beforedragover:true,
            dragover:true,
            beforedrop:true,
            drop:true
        });
    },

    initEvents : function(){
        Ext.ux.Portal.superclass.initEvents.call(this);
        this.dd = new Ext.ux.Portal.DropZone(this, this.dropConfig);
    },

    addProtalColumn : function (portalColumn){
        var portalCol = new Ext.ux.PortalColumn({id:portalColumn.colId, columnWidth:portalColumn.colWidth, style:portalColumn.sytles});
        portalCol.pColInfor = portalColumn;
        this.add(portalCol);
    },
    
    addPortlet : function(tools,portletInfor){
    	var showTitle = '<a href="'+WWWROOT+portletInfor.moreUrl+'" title="更多">'+portletInfor.title+'</a>';
    	
    	if(portletInfor.moreUrl==null || portletInfor.moreUrl =="null" || portletInfor.moreUrl==""){
    		showTitle = portletInfor.title;
    	}
    	var portlet = new Ext.ux.Portlet({
    	                    title: showTitle,
    	                    id:'portlet_'+portletInfor.portletId,
                            layout:'fit',
                            iconCls:'icon_'+portletInfor.portletId,
                            collapsed:portletInfor.collapsed,
                            tools: tools,
                            items: new MainPagePortletGrid(portletInfor)
    	               
    	               
    	               });
    	var col =Ext.ComponentMgr.get(portletInfor.colId);
    	portlet.pInfor = portletInfor;
    	col.add(portlet);
    	portlet.ownerCt.doLayout();
    }
});

Ext.reg('portal', Ext.ux.Portal);


Ext.ux.Portal.DropZone = function(portal, cfg){
    this.portal = portal;
    Ext.dd.ScrollManager.register(portal.body);
    Ext.ux.Portal.DropZone.superclass.constructor.call(this, portal.bwrap.dom, cfg);
    portal.body.ddScrollConfig = this.ddScrollConfig;
};

Ext.extend(Ext.ux.Portal.DropZone, Ext.dd.DropTarget, {
    ddScrollConfig : {
        vthresh: 50,
        hthresh: -1,
        animate: true,
        increment: 200
    },

    createEvent : function(dd, e, data, col, c, pos){
        return {
            portal: this.portal,
            panel: data.panel,
            columnIndex: col,
            column: c,
            position: pos,
            data: data,
            source: dd,
            rawEvent: e,
            status: this.dropAllowed
        };
    },

    notifyOver : function(dd, e, data){
        var xy = e.getXY(), portal = this.portal, px = dd.proxy;
        // case column widths
        if(!this.grid){
            this.grid = this.getGrid();
        }

        // handle case scroll where scrollbars appear during drag
        var cw = portal.body.dom.clientWidth;
        if(!this.lastCW){
            this.lastCW = cw;
        }else if(this.lastCW != cw){
            this.lastCW = cw;
            portal.doLayout();
            this.grid = this.getGrid();
        }

        // determine column
        var col = 0, xs = this.grid.columnX, cmatch = false;
        for(var len = xs.length; col < len; col++){
            if(xy[0] < (xs[col].x + xs[col].w)){
                cmatch = true;
                break;
            }
        }
        // no match, fix last index
        if(!cmatch){
            col--;
        }

        // find insert position
        var p, match = false, pos = 0,
            c = portal.items.itemAt(col),
            items = c.items.items;

        for(var len = items.length; pos < len; pos++){
            p = items[pos];
            var h = p.el.getHeight();
            if(h !== 0 && (p.el.getY()+(h/2)) > xy[1]){
                match = true;
                break;
            }
        }

        var overEvent = this.createEvent(dd, e, data, col, c,
                match && p ? pos : c.items.getCount());

        if(portal.fireEvent('validatedrop', overEvent) !== false &&
           portal.fireEvent('beforedragover', overEvent) !== false){

            // make sure proxy width is fluid
            px.getProxy().setWidth('auto');

            if(p){
                px.moveProxy(p.el.dom.parentNode, match ? p.el.dom : null);
            }else{
                px.moveProxy(c.el.dom, null);
            }

            this.lastPos = {c: c, col: col, p: match && p ? pos : false};
            this.scrollPos = portal.body.getScroll();

            portal.fireEvent('dragover', overEvent);

            return overEvent.status;;
        }else{
            return overEvent.status;
        }

    },

    notifyOut : function(dd, e, data){
        delete this.grid;
        
    },

    notifyDrop : function(dd, e, data){

        delete this.grid;
        if(!this.lastPos){
            return;
        }
        var c = this.lastPos.c, col = this.lastPos.col, pos = this.lastPos.p;

        var dropEvent = this.createEvent(dd, e, data, col, c,
                pos !== false ? pos : c.items.getCount());

        if(this.portal.fireEvent('validatedrop', dropEvent) !== false &&
           this.portal.fireEvent('beforedrop', dropEvent) !== false){

            dd.proxy.getProxy().remove();
            dd.panel.el.dom.parentNode.removeChild(dd.panel.el.dom);
            if(pos !== false){
                c.insert(pos, dd.panel);
            }else{
                c.add(dd.panel);
            }
            
            //var portletGrid = dd.panel.items.itemAt(0);
            c.doLayout();

            this.portal.fireEvent('drop', dropEvent);

            // scroll position is lost on drop, fix it
            var st = this.scrollPos.top;
            if(st){
                var d = this.portal.body.dom;
                setTimeout(function(){
                    d.scrollTop = st;
                }, 10);
            }

        }
      
        delete this.lastPos;
        moveSaveOrUpdatePortal();
    },

    // internal cache of body and column coords
    getGrid : function(){
        var box = this.portal.bwrap.getBox();
        box.columnX = [];
        this.portal.items.each(function(c){
             box.columnX.push({x: c.el.getX(), w: c.el.getWidth()});
        });
        return box;
    }
});

Ext.ux.Checkbox = function(config){
    config = config || {};
    this.bindPortletTools = config.bindPortletTools;
    this.bindPortletInfor = config.bindPortletInfor;
    Ext.ux.Checkbox.superclass.constructor.call(this, config);
};

Ext.ux.Checkbox = Ext.extend(Ext.form.Checkbox, {
    
    initComponent : function(){
        Ext.ux.Checkbox.superclass.initComponent.call(this);
        this.addEvents({
            click:true
        });
    },

    initEvents : function(){
        Ext.ux.Checkbox.superclass.initEvents.call(this);
        this.el.on("click", this.onclick,  this);
    },
    
    onclick : function(){
        if(this.checked){
            //移去portlet
            var portlet = Ext.getCmp('portlet_'+this.bindPortletInfor.portletId);
            portlet.ownerCt.remove(portlet, true);
        } else {
            //增加portlet
            var portal = Ext.getCmp('mainPortal');
            portal.addPortlet(this.bindPortletTools, this.bindPortletInfor);
        }
    }
});

//todo:将弹出每个小portlet的参数设置窗口，抽取到这个类下面来。

PortletSystemParamsSettingWindow = function(){
	
};