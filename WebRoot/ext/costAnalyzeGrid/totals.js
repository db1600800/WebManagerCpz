/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.onReady(function(){
    Ext.QuickTips.init();

    var xg = Ext.grid;

    var reader = new Ext.data.JsonReader({
        idProperty:'taskId',
        fields: [
            {name: 'pathName', type: 'string'},
            {name: 'brand', type: 'string'},
            {name: 'model', type: 'string'},
            {name: 'remark', type: 'string'},
            {name: 'costPrice', type: 'float'},
            {name: 'marketPrice', type: 'float'},
            {name: 'unit', type: 'string'},       
            {name: 'amount', type: 'int'},            
            {name: 'name', type: 'string'},
            {name: 'costAll', type: 'float'},
            {name: 'marketAll', type: 'float'}
            
        ]

    });

    // define a custom summary function
    Ext.grid.GroupSummary.Calculations['costTotalC'] = function(v, record, field){
        return v + (record.data.costPrice * record.data.amount);
    }
    
     Ext.grid.GroupSummary.Calculations['marketPriceTotalC'] = function(v, record, field){
        return v + (record.data.marketPrice * record.data.amount);
    }

    var summary = new Ext.grid.GroupSummary(); 

    var grid = new xg.EditorGridPanel({
        ds: new Ext.data.GroupingStore({
            reader: reader,
            data: xg.dummyData,
            sortInfo:{field: 'pathName', direction: "ASC"},
            groupField:'pathName'
        }),

        columns: [
            {
                id: 'name',
                header: "产品名称",
                width: 160,
                sortable: false,
                groupable: false,
                dataIndex: 'name',
                summaryType: 'count',
                hideable: false,
                summaryRenderer: function(v, params, data){
                    return ((v === 0 || v > 1) ? '(' + v +' 条产品记录)' : '(1 条产品记录)');
                }
            },{
                header: "",
                width: 80,
                sortable: false,
                groupable: false,
                dataIndex: 'pathName',
                hideable: false
            },{
                header: "品牌",
                width: 60,
                sortable: false,
                groupable: false,
                dataIndex: 'brand'
            },{
                header: "规格型号",
                width: 80,
                sortable: false,
                groupable: false,
                dataIndex: 'model'
            },{
                id: 'costPrice',
                header: "成本价",
                width: 80,
                sortable: false,
                groupable: false,
                dataIndex: 'costPrice',
                renderer: Ext.util.Format.usMoney
            },{
                id: 'marketPrice',
                header: "市场价",
                width:80,
                sortable: false,
                dataIndex: 'marketPrice',
                renderer: Ext.util.Format.usMoney
            },{
                id: 'amount',
                header: "数量",
                width:40,
                sortable: false,
                dataIndex: 'amount'
            },{
                id: 'costAll',
                header: "成本金额",
                width: 80,
                sortable: false,
                groupable: false,
                renderer: function(v, params, record){
                    return Ext.util.Format.usMoney(record.data.costPrice * record.data.amount);
                },
                dataIndex: 'costAll',
                summaryType:'costTotalC',
                summaryRenderer: Ext.util.Format.usMoney
           },{
                id: 'marketAll',
                header: "报价金额",
                width: 80,
                sortable: false,
                groupable: false,
                renderer: function(v, params, record){
                    return Ext.util.Format.usMoney(record.data.marketPrice * record.data.amount);
                },
                dataIndex: 'marketAll',
                summaryType:'marketPriceTotalC',
                summaryRenderer: Ext.util.Format.usMoney
           },{
                header: "备注",
                width: 160,
                sortable: false,
                groupable: false,
                dataIndex: 'remark'
            }
        ],

        view: new Ext.grid.GroupingView({
            forceFit:true,
            showGroupName: false,
            enableNoGroups:false, // REQUIRED!
            hideGroupedColumn: true
        }),

        plugins: summary,

        frame:false,
        width: 765,
        height: 430,
        clicksToEdit: 1,
        collapsible: true,
        animCollapse: false,
        trackMouseOver: false,
        //enableColumnMove: false,
        //title: 'Sponsored Projects',
        //iconCls: 'icon-grid',
        renderTo: 'productList'
    });
});



Ext.grid.dummyData = costAnalyzeDummyData;