var pageSizeDateStore = [
    ["10"],
    ["20"],
    ["30"],
    ["50"],
    ["100"]
];
var dwrFilterProxyStore;
var uxGridFilter = null;

Ext.namespace('Ext.ux.PagingToolbar');
var selectedDataArray = new Array();
Ext.ux.PagingToolbar = function(grid,config){
    var dwrProxyStore = grid.getStore();
    
    var configCookieName = config.cookieName + "_pageSize";
    pageSize = getCookie(configCookieName);
    pageSize = pageSize ? pageSize : config.pageSize;
    pageSize = pageSize ? pageSize : 20;
    
    var pageSizeCombobox = new Ext.form.ComboBox({
            store: new Ext.data.SimpleStore({
                       fields: ['state'],
                       data : pageSizeDateStore
                   }),
            listeners:{
                 select:function(combo, record,index){
                        var o = grid.getStore().lastOptions.params;
				        o['start'] = 0;
				        o['limit'] = parseInt(combo.getValue());
				        var pagingBar = Ext.getCmp('pagingToolbar_00001');
				        pagingBar.setPageSize(parseInt(combo.getValue()));
				        setCookie(configCookieName,combo.getValue(),1000);
				        grid.getStore().reload();
                 }
            },
            width:50,
            editable: false,
            displayField:'state',
            mode: 'local',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus:true
        });
    
    //pageSizeCombobox.selectByValue(pageSize,true);
    pageSizeCombobox.setValue(pageSize);
    
    Ext.ux.PagingToolbar.superclass.constructor.call(this, {
        id:'pagingToolbar_00001',
        store: dwrProxyStore,
        pageSize: parseInt(pageSize),
        plugins: config.plugins,
        items:[ '-', pageSizeCombobox ],
        displayInfo: true
    });
    
    var dwrLoadParams = {params:getLastParams(getParamsId(),config)};
    
    if(config.defaultSortField){
    	dwrProxyStore.setDefaultSort(config.defaultSortField, config.defaultSortDirection ? config.defaultSortDirection : 'DESC');
    	dwrLoadParams.params['sort'] = config.defaultSortField;
    	dwrLoadParams.params['dir'] = config.defaultSortDirection ? config.defaultSortDirection : 'DESC';
    }
    //第一次进来时执行这里
    initParamMap(grid, dwrLoadParams.params);
    dwrProxyStore.load(dwrLoadParams);
    if(config.isShowFilterField){
        initFilterParamMap(grid);
        dwrFilterProxyStore.load();
    }
}

function getParamsId(){
	if(typeof(entityName) != "undefined" && entityName!=null){
		return entityName;
	}
	return 'default';
}

function getLastParams(en,config){
	pageSize = getCookie(config.cookieName + "_pageSize");
    pageSize = pageSize ? pageSize : config.pageSize;
    pageSize = pageSize ? pageSize : 20;
    
	var gridparams = window.parent.gridparams;
	//alert(gridparams[en])
	var params = gridparams?((gridparams[en])?(gridparams[en]):{start: 0, limit: pageSize}):{start: 0, limit: pageSize};
	return params;
}

function afterLoad(store, records, options){
	var selectArray = new Array();
	var rememberSelected = this.exConfig.rememberSelected ;
    var rememberState = this.exConfig.rememberState ?true:false;
	if(rememberState){
		window.parent.gridparams[getParamsId()] = options.params;
	}
	if(rememberSelected){
		var idsArray = getValuesFromDataArray('id',selectedDataArray);
		for(var i=0;i<records.length;i++){
			var id = records[i].data.id;
			if(idsArray.contains(id)){
				selectArray.push(records[i]);
			}
		}
		this.getSelectionModel().selectRecords(selectArray,true);
	}
}

function getValuesFromDataArray(p,dataArray){
	var idsArray = new Array();
	for(var i=0;i<dataArray.length;i++){
		idsArray.push(dataArray[i][p]);
	}	
	return idsArray;
}

Ext.extend(Ext.ux.PagingToolbar, Ext.PagingToolbar, {
    setPageSize : function (newPageSize){
        this.pageSize = newPageSize;
    }
});

Ext.namespace('Ext.ux.PagingToolbarWithUnreadNumber');
Ext.ux.PagingToolbarWithUnreadNumber = function(grid,config){
 
    Ext.ux.PagingToolbarWithUnreadNumber.superclass.constructor.call(this, grid,config);
    
};

Ext.extend(Ext.ux.PagingToolbarWithUnreadNumber, Ext.ux.PagingToolbar, {
	displayMsg     : "显示 {0} - {1}，共 {2} 条  <font color='red'>共{3}条未读数据</font>",
    updateInfo : function(){
	    if(this.displayEl){
	        var count = this.store.getCount();
	        var msg = count == 0 ?
	            this.emptyMsg :
	            String.format(
	                this.displayMsg,
	                this.cursor+1, this.cursor+count, this.store.getTotalCount(),
	                document.getElementById("unreadNumber").value
	            );
	        this.displayEl.update(msg);
	    }
	}
});


Ext.namespace('Ext.ux.grid.RowNumberer');
Ext.ux.grid.RowNumberer = function(config){
    Ext.apply(this, config);
    if(this.rowspan){
        this.renderer = this.renderer.createDelegate(this);
    }
};

Ext.ux.grid.RowNumberer.prototype = {
    /**
     * @cfg {String} header Any valid text or HTML fragment to display in the header cell for the row
     * number column (defaults to '').
     */
    header: "",
    /**
     * @cfg {Number} width The default width in pixels of the row number column (defaults to 23).
     */
    width: 40,
    /**
     * @cfg {Boolean} sortable True if the row number column is sortable (defaults to false).
     */
    sortable: false,

    // private
    fixed:false,
    menuDisabled:true,
    dataIndex: '',
    id: 'numberer',
    rowspan: undefined,

    // private
    renderer : function(value, metadata, record, rowIndex,colIndex, store){
        if(this.rowspan){
        	alert('rowspan="'+this.rowspan+'"');
            metadata.cellAttr = 'rowspan="'+this.rowspan+'"';
        }
  
        var i = store.lastOptions.params.start;
        if (isNaN(i)) {
            i = 0;
        }
        i = i + rowIndex + 1;
        return i;
    }
};

Ext.override(Ext.grid.CheckboxSelectionModel, {
        /*
        onRefresh : function(){
            var ds = this.grid.store, index;
            var s = this.getSelections();
            if (!this.keepSelections){
                this.clearSelections(true);
            }

            for (var i = 0, len = s.length; i < len; i++) {
                var r = s[i];
                if ((index = ds.find('id',r.data['id'])) != -1) {
                    this.selectRow(index, true);
                }
            }
        },
        */
	
        selectRow : function(index, keepExisting, preventViewNotify){
            if(this.locked || (index < 0 || index >= this.grid.store.getCount())) return;
            var r = this.grid.store.getAt(index);
            if(r && this.fireEvent("beforerowselect", this, index, keepExisting, r) !== false){
                if(!keepExisting || this.singleSelect){
                    this.clearSelections();
                }
                
                var isNotSelected = true;
                var len = this.selections.length;
  
                for (var i = 0; i < len; i++) {
                	var selectItem = this.selections.itemAt(i);
                	if(r.data['id'] == selectItem.data['id']){
                		isNotSelected = false;
                		break;
                	}
                }
                
                if(isNotSelected){
                	this.selections.add(r);
                }
                
                this.last = this.lastActive = index;
                if(!preventViewNotify){
                    this.grid.getView().onRowSelect(index);
                }
                this.fireEvent("rowselect", this, index, r);
                this.fireEvent("selectionchange", this);
            }
        },
                
        keepSelections: false
});

Ext.override(Ext.grid.CheckboxSelectionModel, {
    
});
Ext.namespace('Ext.ux.ColumnModel');
Ext.ux.ColumnModel = function(config){
	config = config || {};
    Ext.ux.ColumnModel.superclass.constructor.call(this, config);
    this.defaultSortable = true;
    if(config.isShowFilterField){
        this.isShowFilterField = true; 
    }
};

Ext.extend(Ext.ux.ColumnModel, Ext.grid.ColumnModel, {
    
    isShowFilterField : false,
    
    listeners: {
        columnmoved : function(cm, oldIndex, newIndex) {
            if(this.isShowFilterField){
                if(newIndex == 1 || oldIndex == 1){
	                uxGridFilter.reconfigure(cm.columns[1].header,cm.columns[1].dataIndex);
                }
            }
        }
    }
});

/*
 * 需要配置的属性

 * columns
 * autoExpandColumn
 * height:200
 * */
Ext.namespace('Ext.ux.ForgonPageGrid');

/*
 * config说明如下：

 * pageSize:每页条数
 * defaultSortField:缺省排序的字段

 * defaultSortDirection:缺省排序的方式。两个选项值：'DESC'、'ASC'，缺省值为DESC。

 * isCheckboxSelectionModel:是否需要带checkbox复选框行选模式。两个选项值：true、false，缺省值为false,
 * hidePagingToolbar: 是否隐藏分页工具栏，　缺省值为false,
 * localSort : 是否为本地排序，缺省值为false
 * isShowSearchField : 是否显示搜索模块，缺省值为true
 * isShowFilterField : 是否显示列过滤模块，缺省值为false
 * cookieName : cookie的唯一标识符，注意，每个视图都必须不一样

 * rememberSelected:  是否分页记住id,getAllSelectedIds取得选中的id，';'分割
 * rememberState: 是否记住过滤内容。（与cookic配合使用）

 * pagingToolbarType:0或者null：Ext默认的PagingToolbar; 1:带未读信息数量显示的PagingToolbarWithUnreadNumber
 * 
 * readerDetail :中必须要有一个属性为id
 * 
 * dwr调用方法的第一个参数必须是一个Map
 * */
function onForgonPageGridSelected(sm,rowIndex,r){
	var id = r.data.id;
	var idsArray = getValuesFromDataArray('id',selectedDataArray);
	if(!idsArray.contains(id)){
		selectedDataArray.push(r.data);
	}
}

function onForgonPageGridUnSelected(sm,rowIndex,r){
	var id = r.data.id;
	deleteDataById(id);
}

function deleteDataById(id){
	var idsArray = getValuesFromDataArray('id',selectedDataArray);
	if(idsArray.contains(id)){
		var i = idsArray.indexOf(id);
		if(i!=-1){
			selectedDataArray.splice(i,1);
		}
	}
}

function clearAllSelectedIds(){
	selectedDataArray = new Array();
	this.getSelectionModel().clearSelections();
}


Ext.ux.ForgonPageGrid = function(config, readerDetail, dwrCall, dwrFilterCall){
    config = config || {};
    if(config.rememberSelected==null){
    	config.rememberSelected = true;
    }
    this.exConfig = config;
    var callParams = new Array();
    
    var rememberSelected = config.rememberSelected ;
    var rememberState = config.rememberState ?true:false;
    var i;
    if(dwrFilterCall){
        i = 4;
    } else {
        i = 3;
    }
    for(;i<arguments.length;i++){
        callParams.push(arguments[i]);
    }
    
    //数据的DWR代理
    var remoteSort = config.localSort ? false : true;
    
    var dwrJsonReader = new Ext.data.DWRJsonReader({totalProperty: 'totalResults', root: 'rows'},new Ext.data.Record.create(readerDetail));

    var drwProxy = new Ext.data.DWRProxyOfParamArray(dwrCall,callParams);
        
    dwrProxyStore = new Ext.data.Store({
        proxy:drwProxy,
        reader:dwrJsonReader,
        remoteSort:remoteSort
    });
    
    if(rememberState||rememberSelected){
    	dwrProxyStore.on('load',afterLoad,this,{delay:0});
    }
    config.store = dwrProxyStore;
    
    
    var renderToId = config.renderTo;
    if(renderToId != null){
    	config.height = Ext.fly(config.renderTo).getHeight();
        config.width = Ext.fly(config.renderTo).getWidth();
    }
    
    if(config.isCheckboxSelectionModel){
    	var checkboxSM = new Ext.grid.CheckboxSelectionModel({keepSelections:false});
    	config.sm = checkboxSM;
    	config.columns.unshift(checkboxSM);
    	if(rememberSelected){
    		checkboxSM.on({'rowselect':{fn:onForgonPageGridSelected,scope: this,delay:0},'rowdeselect':{fn:onForgonPageGridUnSelected,scope: this,delay:0}});
    	}
    }
    
    if(config.isShowRowNumber){
        var rowNumberSM = new Ext.ux.grid.RowNumberer({});
        config.columns.unshift(rowNumberSM);
    }
    
    //判断是否显示搜索组件
    if(typeof(config.isShowSearchField) == 'undefined'){
    	config.isShowSearchField = true;
    }
    //判断是否显示列过滤组件

    if(typeof(config.isShowFilterField) == 'undefined'){
        config.isShowFilterField = false;
    }
    
    if(config.isShowFilterField){
        //列过滤的DWR代理
        dwrFilterProxyStore=new Ext.data.Store({
            proxy:new Ext.data.DWRProxyOfParamArray(dwrFilterCall,callParams),
            reader:new Ext.data.DWRArrayReader({
                },new Ext.data.Record.create([
                   {name: 'text', mapping: 0}
                ])
            ),
            remoteSort:remoteSort
        })
    }
    
    //如果显示搜索组件，并没有创建toptoolbar，则创建一个空的

    if(config.isShowSearchField && !config.tbar){
    	config.tbar = [];
    }
    
    if(rememberSelected){
    	config.tbar.push('-');
    	config.tbar.push({text:'清除已选',iconCls:'btn_remove',handler:clearAllSelectedIds,scope :this});
    	//this.getTopToolbar().addButton('测试',clearAllSelectedIds,this);
    }
    config.maskDisabled = false;
    Ext.ux.ForgonPageGrid.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.ForgonPageGrid, Ext.grid.GridPanel, {
    defaultSortDirection : 'DESC',
    loadMask:{disabled:true,msg:"数据加载中，请稍等..."},
    shadow:false,
    initComponent : function(){
        if(!this.exConfig.hidePagingToolbar){
        	if (this.exConfig.pagingToolbarType == 1){
        		this.bbar = new Ext.ux.PagingToolbarWithUnreadNumber(this,this.exConfig);
        	}
        	else{
        		this.bbar = new Ext.ux.PagingToolbar(this,this.exConfig);
        	}
        } else {
        	dwrProxyStore.load(dwrProxyStore.lastOptions);
        }
        this.cm = new Ext.ux.ColumnModel(this.exConfig);

        //判断是否显示搜索组件
        if(this.exConfig.isShowSearchField){
        	var searchField = new Ext.ux.grid.Search({
    				iconCls:'icon-zoom',
    				disableIndexes: this.searchDisableIndexes ? this.searchDisableIndexes : [],
    				autoFocus:false
    			});
    		
        	var pluginsArr = new Array();
        	if(typeof(this.plugins) == 'object'){
        		pluginsArr.push(this.plugins);
        	}
        	pluginsArr.push(searchField);
        	this.plugins = pluginsArr;
        } 
       
        //判断是否显示列过滤组件

        if(this.exConfig.isShowFilterField){
            uxGridFilter = new Ext.ux.grid.Filter({});
            var pluginsArr = new Array();
            if(typeof(this.plugins) == 'object'){
                if(this.plugins.length == 2){
                    this.plugins.push(uxGridFilter);
                }else{
                    pluginsArr.push(this.plugins);
                    pluginsArr.push(uxGridFilter);
                    this.plugins = pluginsArr;
                }
            }
        }

        Ext.ux.ForgonPageGrid.superclass.initComponent.call(this);
        var selfGrid = this;
        var renderToId = selfGrid.exConfig.renderTo;
        if(renderToId != null){
            window.onresize=function(){   
                selfGrid.setWidth(0);
                selfGrid.setWidth(Ext.fly(selfGrid.exConfig.renderTo).getWidth());
                selfGrid.setHeight(0);
                selfGrid.setHeight(Ext.fly(selfGrid.exConfig.renderTo).getHeight());
            };
        }
    },
    
    beforerefresh: function(v) {
       v.scrollTop = v.scroller.dom.scrollTop;   
       v.scrollHeight = v.scroller.dom.scrollHeight;   
    },
    
    refresh: function(v) {   
       v.scroller.dom.scrollTop = v.scrollTop +    
        (v.scrollTop == 0 ? 0 : v.scroller.dom.scrollHeight - v.scrollHeight);   
    },
    
    afterRender : function(){
    	Ext.ux.ForgonPageGrid.superclass.afterRender.call(this);
    	var gridId = this.id;
        var grid = Ext.getCmp(gridId);
        
        //重新加载前处理一下Dwr需要的参数
        dwrProxyStore.on('beforeload' ,function(e, o){
            initParamMap(grid, o.params);
        });
        
        if(grid.exConfig.isShowFilterField){
	        //重新加载时处理一下Dwr需要的参数
	        dwrFilterProxyStore.on('beforeload' ,function(e, o){
	            initFilterParamMap(grid);
	        });
        }
    },
    
    //用户自定义参数，需要重写该方法
    getGridParameterMap : function (){
    	var gridParameterMap = new Object();
    	return gridParameterMap;
    },
    
    dwrReload : function(){
    	 //this.getSelectionModel().clearSelections();
    	 dwrProxyStore.load(dwrProxyStore.lastOptions);
    },
    
    dwrFilterReload : function(){
        var store = this.store;
        delete(store.baseParams['filterQuery']);
        if (store.lastOptions && store.lastOptions.params) {
            delete(store.lastOptions.params['filterQuery']);
        }
        if(uxGridFilter != null){
            uxGridFilter.field.setValue('');
        }
        dwrFilterProxyStore.load();
    },
    
    clearSelectedIds:function (ids,separator){
		if(!separator){
	    		separator = ";"
	    	}
	    if(StringUtils.isNotBlank(ids)){
	    	var idsArray = ids.split(separator);
	    	for(var i=0;i<idsArray.length;i++){
	    		deleteDataById(idsArray[i]);
	    	}
	    }
		this.getSelectionModel().clearSelections();
	},
	
    getSelectedValues : function (fieldName,separator){
    	var ids = "";
    	if(!separator){
    		separator = ";"
    	}
    	if(!fieldName){
    		fieldName = "id";
    	}
    	var s = this.getSelectionModel().getSelections();

    	for (var i = 0, len = s.length; i < len; i++) {
            var r = s[i];
            if (ids == "") {
              ids = r.data[fieldName];
            }
            else {
              ids = ids + separator + r.data[fieldName];
            }
    	}
    	
    	return ids;
    },
    getAllSelectedValues:function(p,separator){
    	if(!separator){
    		separator = ";"
    	}
    	return getValuesFromDataArray(p,selectedDataArray).join(separator);
    },
    getSelectedRow : function (){
    	var s = this.getSelectionModel().getSelections();
    	return s;
    },
    
    nextPage : function(){
    	var total = this.getStore().getTotalCount();
    	var o = this.getStore().lastOptions.params;
    	var start = o.start + o.limit;
    	if(total>start){
	    	o['start'] = start;
	    	this.getStore().load({params:o});
    	}
    },
    
    prevPage : function (){
    	var o = this.getStore().lastOptions.params;
    	var start = Math.max(0, o.start-o.limit);
    	if(start >= 0){
	    	o['start'] = start;
	    	this.getStore().load({params:o});
    	}
    },
    
    gotoFirstPage : function(){
    	var o = this.getStore().lastOptions.params;
        o['start'] = 0;
        this.getStore().load({params:o});
    }

});

function initParamMap(grid, params){
	
	var dwrProxyStore = grid.getStore();
	
	var plugins = grid.plugins;
	
	if(dwrProxyStore.proxy.callParams.length > 0){
    	//取用户自定义参数
    	var dwrMethodParameterMap = grid.getGridParameterMap();
        if(!dwrMethodParameterMap){
            dwrMethodParameterMap = new Object();
        }
        dwrMethodParameterMap['parm_s_selectedIds'] = [getValuesFromDataArray('id',selectedDataArray).join(',')];
        //取隐藏参数表单域的值

        dwrMethodParameterMap = getHiddenParameterMap(dwrMethodParameterMap);
        
        //取排序的参数
        if(dwrProxyStore.sortInfo.field && dwrProxyStore.sortInfo.direction){
            dwrMethodParameterMap['grid_sort_'+dwrProxyStore.sortInfo.field] = [dwrProxyStore.sortInfo.direction];
        }
        
        //取分页的参数
        dwrMethodParameterMap['grid_page_start'] = [params.start ? params.start : 0];
        dwrMethodParameterMap['grid_page_size'] = [params.limit ? params.limit : 20];
        
        //取搜索过滤的参数
        var filterObj;
        if(plugins instanceof Ext.grid.GridFilters){
        	filterObj = plugins;
        }else if (Ext.isArray(plugins)){
        	filterObj = plugins[0];
        }
        if(filterObj instanceof Ext.grid.GridFilters){
            var gridFiltersParamPrefix = filterObj.paramPrefix;
            var filterParams = params[gridFiltersParamPrefix];
            if(filterParams && filterParams.length){
            	for(var i=0; i<filterParams.length; i++){
            		var filterParam = filterParams[i];
            		var filterKey = 'grid_filter_';
            		filterKey = contactStr(filterKey, filterParam['field'], '', '');
            		filterKey = contactStr(filterKey, filterParam['type'], '', '_');
            		filterKey = contactStr(filterKey, filterParam['comparison'], '', '_');
          		
            		dwrMethodParameterMap[filterKey] = [filterParam['value']];
            	}
            }
        }
        
        //取GridSearch参数
        dwrMethodParameterMap['grid_search_fields'] = [dwrProxyStore.baseParams['fields'] ? dwrProxyStore.baseParams['fields'] : ''];
        dwrMethodParameterMap['grid_search_query'] = [dwrProxyStore.baseParams['query'] ? dwrProxyStore.baseParams['query'] : ''];

        //取GridFilter参数
        dwrMethodParameterMap['grid_uxFilter_fields'] = [dwrProxyStore.baseParams['filterFields'] ? dwrProxyStore.baseParams['filterFields'] : ''];
        dwrMethodParameterMap['grid_uxFilter_query'] = [dwrProxyStore.baseParams['filterQuery'] ? dwrProxyStore.baseParams['filterQuery'] : ''];
        
        dwrProxyStore.proxy.callParams[0] = dwrMethodParameterMap;
	}
}

function initFilterParamMap(grid){
    var dwrProxyStore = grid.getStore();

    var dwrMethodParameterMap = new Object();
    //取隐藏参数表单域的值

    dwrMethodParameterMap = getHiddenParameterMap(dwrMethodParameterMap);

    //取GridFilter参数
    dwrMethodParameterMap['grid_uxFilter_fields'] = [dwrProxyStore.baseParams['filterFields'] ? dwrProxyStore.baseParams['filterFields'] : grid.columns[1].dataIndex];
    
    dwrFilterProxyStore.proxy.callParams[0] = dwrMethodParameterMap;
}

function getHiddenParameterMap(map) {
    if(typeof(document.parametersFrm) != "undefined"){
         var hiddenP =document.parametersFrm.elements
         for(var i=0; i < hiddenP.length; i++) {
            var key =  hiddenP[i].name;
            if(key.indexOf("parm_s_") == 0){
                var val = hiddenP[i].value;
                map[key]= [val];
            }
        }
    }
    return map;
}

function contactStr(s, d, defaultStr,separator){
	if(d){
		s += separator + d;
	} else {
		s += separator + defaultStr;
	}
	
	return s;
}
