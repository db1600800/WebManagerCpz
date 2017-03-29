/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
 var addItemsCount = 0;
 var currentSelectedClass;
function createNode(selProduct){
    selProduct = setProductDefaultValue(selProduct);
    var newNode = new Ext.tree.TreeNode({
                                        name: selProduct.name,
                                        id:'leaf_0_'+addItemsCount,
                                        model: selProduct.model,
                                        brand: selProduct.brand, 
                                        unit: selProduct.unit, 
                                        amount: '0', 
                                        marketPrice: getMarketPrice(selProduct), 
                                        originalMarketPrice: formatMoneyByComma(selProduct.currentApprovedPrice),
                                        provider: '乙方',
                                        origin: selProduct.origin,
                                        itemTotalMoney: '0.00', 
                                        remark: selProduct.remark,
                                        costPrice:formatMoneyByComma(selProduct.costPrice),
                                        leaf: true,
                                        allowChildren:false,
                                        uiProvider: Ext.tree.ColumnNodeUI
                                });
    addItemsCount++;
    return newNode;

}

//是否包干
function isContract(){
	var type = $Id('type').value;
	if('包干'==type){
		return true;
	}
	return false ;
}

function removePercentSymbol(stringWithPercentSymbol){
	if(stringWithPercentSymbol==null||(stringWithPercentSymbol+'')==''){
		return '';
	}
	stringWithPercentSymbol = (stringWithPercentSymbol+'').replace('%','')
	return stringWithPercentSymbol;
}

function reCalculateByNode(selectedItem){
	var contractPricePercent = selectedItem.attributes['model'];
	var children = selectedItem.childNodes;
	var clen = children.length;
	if(clen != 0){
	     for(var i = 0; i < clen; i++){
	         var child = children[i];
	         if(child.isLeaf()){
	         var marketPrice = getContractPrice(child.attributes['originalMarketPrice'],contractPricePercent);
	         $Id(child.getUI().columns[7]).innerHTML = marketPrice;
             child.attributes['marketPrice'] = marketPrice;
             
	         }
	         
	         }
     }
     calculateRowByParentNode(selectedItem);
     tree.calculateAllTotal();
}


function getContractPrice(marketPrice,contractPricePercent){
	if(contractPricePercent==null||contractPricePercent.Trim()==''){
		contractPricePercent = 0;
	}
	contractPricePercent = removePercentSymbol(contractPricePercent);
	if(marketPrice==null||marketPrice==''){
		marketPrice = 0;
	}
	
	return formatMoneyByComma((1+parseFloat(contractPricePercent)/100)*parseFloat(dropComma(marketPrice)));
}

function getMarketPrice(selProduct){
	var customerId = $Id('customerId').value;
	if(isContract()){
		var selectedItem = tree.getSelectionModel().getSelectedNode();
		if(selectedItem.isLeaf()){
			selectedItem = selectedItem.parentNode;
		}
		if(selectedItem.isLeaf()){
			alert('出错！（产品下不能添加产品）');
			return '0.00';
		}else {
			var contractPricePercent = selectedItem.attributes['model'];
			if(contractPricePercent==null||contractPricePercent==''){
				contractPricePercent = 0;
			}
			contractPricePercent = removePercentSymbol(contractPricePercent);
			var tempPrice =  getContractPrice(selProduct.currentApprovedPrice,contractPricePercent);
			return tempPrice;
		}
	}
	
	return  formatMoneyByComma(selProduct.currentApprovedPrice);	
}

function isAddExistItem(parentNode, currentNode){
    var isAdd = true;
    var hasExist = false;
    if(parentNode != null){
        var children = parentNode.childNodes;
        var clen = children.length;
        if(clen != 0){
            for(var i = 0; i < clen; i++){
                var child = children[i];
                if(child.attributes['name'] == currentNode.attributes['name'] && child.attributes['model'] == currentNode.attributes['model'] && child.attributes['brand'] == currentNode.attributes['brand']){
                    hasExist = true;
                }
            }
        }
    }
    
    if(hasExist){
        isAdd = confirm("［"+currentNode.attributes["name"]+"］已经存在，您还需要将该产品添加到报价单中吗？");
    }
    
    
    return isAdd;
}

function getQuotationDetailJsonData(){
    var json = tree.toJsonString(null,
                            function(key, val) {
                                return (key == 'leaf' || key == 'id' || key =='name'|| key == 'model'|| key == 'brand'|| key == 'unit'|| key == 'amount'|| key == 'marketPrice'|| key == 'costPrice' || key == 'itemTotalMoney' || key=='remark'||key=='originalMarketPrice'||key=='origin'||key=='provider');
                            }, {
                                leaf: 'leaf',
                                id: 'id',
                                name: 'name',
                                model: 'model',
                                brand: 'brand',
                                unit: 'unit',
                                amount: 'amount',
                                marketPrice: 'marketPrice',
                                origin: 'origin',
                                originalMarketPrice: 'originalMarketPrice',
                                costPrice: 'costPrice',
                                itemTotalMoney: 'itemTotalMoney',
                                provider: 'provider',
                                remark: 'remark'
                            }
                        );
    return json;
}

function setToolBars(){
	if(isEdit){
	    toolbars = [{
	                text:'保存为模板',
	                tooltip: '保存为模板',
	                iconCls:'folder-icon',
	                listeners: {
	                    'click' : function(){
	                     Ext.MessageBox.show({
	                            title:'添加模板',
	                            msg: '新模板名称：',
	                            width:300,
	                            buttons: Ext.MessageBox.OKCANCEL,
	                            prompt:true,
	                            fn: saveAsTemplet
	                        });
	                        }
	                    }
	                
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'添加类别',
	                tooltip: '添加类别',
	                iconCls:'add_new_sort',
	                listeners: {
	                    'click' : function(){
	                        var selectedItem = tree.getSelectionModel().getSelectedNode();
	                        if (!selectedItem) {
	                            selectedItem = tree.getRootNode(); 
	                        }
	                    
	                        handleCreate = function (btn, text, cBoxes){
	                            if(btn == 'ok' && text) {
	                                var newNode = new Ext.tree.TreeNode({
	                                        name: text,
	                                        id:'folder_0_'+addItemsCount,
	                                        leaf: false,
	                                        expandable: true,
	                                        expanded:true,
	                                        uiProvider: Ext.tree.ColumnNodeUI
	                                });
	                                addItemsCount++;
	                                if(selectedItem.isLeaf()) {
	                                    selectedItem.parentNode.insertBefore(newNode, selectedItem.nextSibling);
	                                } else {
	                                    selectedItem.appendChild([newNode]);
	                                }
	                            }
	                        }
	                        Ext.MessageBox.show({
	                            title:'添加新的类别项',
	                            msg: '新类别名称：',
	                            width:300,
	                            buttons: Ext.MessageBox.OKCANCEL,
	                            prompt:true,
	                            fn: handleCreate
	                        });
	                    }
	                }
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'添加第一级类别',
	                tooltip: '添加第一级类别',
	                iconCls:'add_one_new_sort',
	                listeners: {
	                    'click' : function(){
	                        var selectedItem = selectedItem = tree.getRootNode();
	               
	                        handleCreate = function (btn, text, cBoxes){
	                            if(btn == 'ok' && text) {
	                                var newNode = new Ext.tree.TreeNode({
	                                        name: text,
	                                        id:'folder_0_'+addItemsCount,
	                                        leaf: false,
	                                        expandable: true,
	                                        expanded: true,
	                                        uiProvider: Ext.tree.ColumnNodeUI
	                                });
	                                addItemsCount++;
	                                if(selectedItem.isLeaf()) {
	                                    selectedItem.parentNode.insertBefore(newNode, selectedItem.nextSibling);
	                                } else {
	                                    selectedItem.appendChild([newNode]);
	                                }
	                            }
	                        }
	                        Ext.MessageBox.show({
	                            title:'添加新的类别项',
	                            msg: '新类别名称：',
	                            width:300,
	                            buttons: Ext.MessageBox.OKCANCEL,
	                            prompt:true,
	                            fn: handleCreate
	                        });
	                    }
	                }
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'添加新产品',
	                tooltip: '添加新产品',
	                iconCls:'folder-icon',
	                listeners: {
	                    'click' : function(){
	                    	var customerId = $Id('customerId').value;
	                        var selectedItem = tree.getSelectionModel().getSelectedNode();
	                        if(customerId==null){
	                      	  customerId='';
	                        }
	                        if (!selectedItem) {
	                            Ext.MessageBox.show({
	                                   title: '警告',
	                                   msg: '请先选择类别。',
	                                   buttons: Ext.MessageBox.OK,
	                                   animEl: 'mb9',
	                                   width:300,
	                                   icon: Ext.MessageBox.WARNING
	                            });
	                            return false;
	                        }
	                    
	                         var selProducts = selectNewsProducts('',customerId);
	                         if(selProducts != null && selProducts.length > 0 ){
	                            for(var i=0; i< selProducts.length; i++){
	                                var newNode = createNode(selProducts[i]);
	                                if(selectedItem.isLeaf()) {
	                                   if(isAddExistItem(selectedItem.parentNode, newNode)){
	                                       selectedItem.parentNode.insertBefore(newNode, selectedItem.nextSibling);
	                                   }
	                                    
	                                } else {
	                                    if(isAddExistItem(selectedItem, newNode)){
	                                       selectedItem.appendChild([newNode]);
	                                    }
	                                }
	                            }
	                        }
	                        
	                        
	                    }
	                }
	                
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'修改产品',
	                tooltip: '修改产品',
	                iconCls:'page-icon',
	                listeners: {
	                    'click' : function(){
	                    	var customerId = $Id('customerId').value;
	                        var selectedItem = tree.getSelectionModel().getSelectedNode();
	                        if (!selectedItem ) {
	                            Ext.MessageBox.show({
	                                   title: '警告',
	                                   msg: '请选择要修改的产品。',
	                                   buttons: Ext.MessageBox.OK,
	                                   width:300,
	                                   icon: Ext.MessageBox.WARNING
	                            });
	                            return false;
	                        }
	                        
	                        if(!selectedItem.isLeaf() ){
	                            Ext.MessageBox.show({
	                                   title: '警告',
	                                   msg: '您选择的是类别，请选择产品。',
	                                   buttons: Ext.MessageBox.OK,
	                                   width:300,
	                                   icon: Ext.MessageBox.WARNING
	                            });
	                            
	                            return false;
	                        }
	                        var selProducts = selectNewsProducts('no',customerId);
	                        if(selProducts != null && selProducts.length > 0 ){
	                            var parentNode = selectedItem.parentNode;
	                            var newNode = createNode(selProducts[0]);
	                            if(isAddExistItem(parentNode, newNode)){
	                               parentNode.replaceChild(newNode,selectedItem);
	                            }
	                        }
	                    }
	                }
	                
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'删除选项',
	                tooltip: '删除选项',
	                iconCls:'delete-icon',
	                listeners: {
	                    'click' : function(){
	                        var selectedItem = tree.getSelectionModel().getSelectedNode();
	                        if (!selectedItem) {
	                                Ext.MessageBox.show({
	                                   title: '警告',
	                                   msg: '请选择要删除的项。',
	                                   buttons: Ext.MessageBox.OK,
	                                   animEl: 'mb9',
	                                   width:300,
	                                   icon: Ext.MessageBox.WARNING
	                            });
	                            return false;
	                        }
	                    
	                        handleDelete = function (btn){
	                            if(btn == 'ok') {
	                                var parentNode = selectedItem.parentNode;
	                                selectedItem.remove();
	                            }
	                        }
	                        Ext.MessageBox.show({
	                            title:'请确认您的操作',
	                            msg: '您确定要删除您所选择的项和该项下面的所有子项吗？',
	                            buttons: Ext.MessageBox.OKCANCEL,
	                            fn: handleDelete
	                        });
	                    }
	                }
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'求合计',
	                tooltip: '求合计',
	                iconCls:'summary-icon',
	                listeners: {
	                    'click' : function(){
	                       tree.calculateAllTotal();
	                      
	                    }
	                }
	            },{
	                xtype:'tbseparator'
	            },{
	                text:'设置包干比例',
	                tooltip: '设置包干比例',
	                iconCls:'summary-icon',
	                listeners: {
	                    'click' : function(){
	                       if(!isContract()){
	                       		return false;
	                       }
	                       var selectedItem = tree.getSelectionModel().getSelectedNode();
	                        if (!selectedItem||selectedItem.isLeaf()) {
	                            Ext.MessageBox.show({
	                                   title: '警告',
	                                   msg: '请先选择类别。',
	                                   buttons: Ext.MessageBox.OK,
	                                   animEl: 'mb9',
	                                   width:300,
	                                   icon: Ext.MessageBox.WARNING
	                            });
	                            return false;
	                        }
	                      
	                      var handleCreate = function (btn, text, cBoxes){
	                            if(btn == 'ok' && text) {
	                                if(!isNumeric(text)){
	                                	alert('百分比必须为数字');
	                                	return false ;
	                                }
	                                $Id(selectedItem.getUI().columns[1]).innerHTML = text+"%";
                					selectedItem.attributes['model'] = text+"%";
	                                reCalculateByNode(selectedItem);
	                            }
	                        }
	                        Ext.MessageBox.show({
	                            title:'设置包干比例',
	                            msg: '包干比例（百分比）：',
	                            width:300,
	                            buttons: Ext.MessageBox.OKCANCEL,
	                            prompt:true,
	                            fn: handleCreate
	                        });
	                        
	                    }
	                }
	            }
	            ]; 
	}
}
var isVisiabl = true;
Ext.onReady(function(){setToolBars();loadTree();} );
function loadTree(){
    Ext.BLANK_IMAGE_URL = '../ext/resources/images/default/s.gif';
    var addItemsCount = 1;
    tree = new Ext.tree.ColumnTree({
        el:'tree-ct',
        width:1086,
        autoHeight:true,
        rootVisible:false,
        autoScroll:false,
        expandable:false,
        enableDD:isEdit,
        tbar: toolbars,
        frame:true,
        columns:[{
            header:'产品名称',
            width:180,
            dataIndex:'name'
        },{
            header:'型号及配置',
            width:90,
            dataIndex:'model'
            
        },{
            header:'品牌',
            width:90,
            dataIndex:'brand'
            
        }, {
            header:'产地',
            width:90,
            dataIndex:'origin'
            
        },{
            header:'单位',
            width:60,
            dataIndex:'unit'
            
        },{
            header:'数量',
            width:50,
            dataIndex:'amount'
            
        },{
            header:'单价',
            width:80,
            dataIndex:'originalMarketPrice'
            
        },{
            header:'单价',
            width:80,
            dataIndex:'marketPrice'
            
        },{
            header:'小计',
            width:120,
            dataIndex:'itemTotalMoney'
            
        },{
            header:'供应情况',
            width:80,
            dataIndex:'provider'
            
        },{
            header:'备注',
            width:340,
            dataIndex:'remark'
            
        }],

        loader: new Ext.tree.TreeLoader({
            preloadChildren:true,
            dataUrl:'quotationLoader.jsp?tid=0&qid='+qid,
            uiProviders:{
                'col': Ext.tree.ColumnNodeUI
            },
            listeners: {
                    'load' : function(node, response){
                        tree.expandAll();
                    }
            }
        }),
        
        root: new Ext.tree.AsyncTreeNode({
                                        allowChildren: true,
                                        id:'root'
                                        })
    });
    tree.render();
    tree.expandAll();
    
     var te = new Ext.tree.ColumnTreeEditor(tree,{
                completeOnEnter: true,
                autosize: true,
                ignoreNoChange: true
            });
     tree.updateHeader();  
}