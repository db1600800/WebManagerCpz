Ext.ns('Ext.ux.grid');

Ext.ux.grid.Filter = function(config) {
    Ext.apply(this, config);
    Ext.ux.grid.Filter.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.grid.Filter, Ext.util.Observable, {

    filterText:''
    
    ,filterIndex:''
    
    ,position:'bottom'
    
    ,xtype:'uxgridfilter'

    ,paramNames: {
         fields:'filterFields'
        ,query:'filterQuery'
    }
    
    ,align:'left'
    
    ,init:function(grid) {
        this.grid = grid;
        
        // setup toolbar container if id was given
        if('string' === typeof this.toolbarContainer) {
            this.toolbarContainer = Ext.getCmp(this.toolbarContainer);
        }
        
        var cm = this.grid.colModel;
        if(cm.config[1].header && cm.config[1].dataIndex) {
            this.filterText = cm.config[1].header;
            this.filterIndex = cm.config[1].dataIndex;
            this.reSetParams();
        }
        
        // do our processing after grid render and reconfigure
        grid.onRender = grid.onRender.createSequence(this.onRender, this);
    }
    
    /**
     * adds plugin controls to <b>existing</b> toolbar and calls reconfigure
     * @private
     */
    ,onRender:function() {
        var panel = this.toolbarContainer || this.grid;
        var tb = 'bottom' === this.position ? panel.bottomToolbar : panel.topToolbar;
        var thisFilter = this;
        
        // 设置位置
        if('right' === this.align) {
            tb.addFill();
        }
        else {
            if(0 < tb.items.getCount()) {
                tb.addSeparator();
            }
        }

        // 标题Button
        this.menu = new Ext.menu.Menu();
        this.titleButton = new Ext.Button({
             text:this.filterText
             ,menu:this.menu
        });
        tb.add(this.titleButton);
        
        // 过滤框

        this.field = new Ext.form.ComboBox({
            store: dwrFilterProxyStore,
            displayField:'text',
            mode: 'local',
            typeAhead: true,
            width: 150,
            listClass: 'comboxItemCls',
            editable: false,
            forceSelection: true,
            triggerAction: 'all',
            listeners:{
                 select:function(combo, record,index){
                     thisFilter.onUxGridFilterSearch();
                 }
            },
            selectOnFocus:true
        });
        tb.add(this.field);
        
        this.initMenu();
        
    }
    
    ,onUxGridFilterSearch:function() {
        if(!this.field.isValid()) {
            return;
        }
        var val = this.field.getValue().trim();
        this.field.setValue(val);
        var store = this.grid.store;

        
        // 重新至0
        if(store.lastOptions && store.lastOptions.params) {
            store.lastOptions.params[store.paramNames.start] = 0;
        }

        // get fields to search array
        var fields = [];
        fields.push(this.filterIndex);

        // add fields and query to baseParams of store
        delete(store.baseParams[this.paramNames.fields]);
        delete(store.baseParams[this.paramNames.query]);
        if (store.lastOptions && store.lastOptions.params) {
            delete(store.lastOptions.params[this.paramNames.fields]);
            delete(store.lastOptions.params[this.paramNames.query]);
        }
        
        if(fields.length) {
            store.baseParams[this.paramNames.fields] = Ext.encode(fields);
            store.baseParams[this.paramNames.query] = val;
        }
        
        // reload store
        store.reload();
    }
    
    ,reconfigure:function(header, dataIndex) {
        this.field.setValue('');
        this.titleButton.setText(header);
        this.filterIndex = dataIndex;
        this.selectedItems(dataIndex);
        this.reSetParams();
        dwrFilterProxyStore.load();
    }
    
    ,selectedItems:function(index){
        var menu = this.menu;
        menu.items.each(function(i) {
            if(i && i.dataIndex == index) {
                i.setChecked(true);
            }
        });
    }
    
    ,reSetParams:function (){
        var store = this.grid.store;
        
        var fields = [];
        fields.push(this.filterIndex);

        // add fields and query to baseParams of store
        delete(store.baseParams[this.paramNames.fields]);
        if (store.lastOptions && store.lastOptions.params) {
            delete(store.lastOptions.params[this.paramNames.fields]);
        }
        if(fields.length) {
            store.baseParams[this.paramNames.fields] = Ext.encode(fields);
        }
    }
    
    ,initMenu:function(){
        var menu = this.menu;
        var filterFeid = this;
        menu.removeAll();
        
        // add new items
        var cm = this.grid.colModel;
        var group = group = 'g' + (new Date).getTime(); 
        
        Ext.each(cm.config, function(config) {
            var disable = false;
            if(config.header && config.dataIndex) {
                    menu.add(new Ext.menu.CheckItem({
                         text:config.header
                        ,hideOnClick:true
                        ,group:group
                        ,checked:config.dataIndex === this.filterIndex
                        ,dataIndex:config.dataIndex
                        ,handler:function(item) {
		                    var checked = ! item.checked;
		                    if(checked){
		                        filterFeid.reconfigure(item.text, item.dataIndex);
		                    }
		                }
                    }));
            }
        }, this);
        
    }
    
});