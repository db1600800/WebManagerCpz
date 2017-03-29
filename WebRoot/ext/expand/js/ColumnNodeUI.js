/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
var colIdIndex = 1;
var colIdSeparator = '々';
function getColIdIndex(){
    return colIdIndex++;
}

function displayMarketPrice(toDisplay){
	var allElementToDisplay = document.getElementsByName("column_Name_6");

	if(allElementToDisplay!=null&&allElementToDisplay.length>0){
		var length = allElementToDisplay.length;
		for(var i=0;i<length;i++){
			if(toDisplay){
				allElementToDisplay[i].style.display = 'inline';
			}else {
				allElementToDisplay[i].style.display = 'none';	
			}
		}
	}
	
	
}

function calculateRowByParentNode(parentNode){
	  var children = parentNode.childNodes;
        var clen = children.length;
        if(clen != 0){
            for(var i = 0; i < clen; i++){
                var child = children[i];
                var marketPrice = dropComma(child.attributes['marketPrice']);
		        var amount = dropComma(child.attributes['amount']);
		      
		        if(isNumeric(marketPrice)&&isInteger(amount)){
			         var itemTotalMoney = formatMoneyByComma(amount * marketPrice);
			         $Id(child.getUI().columns[8]).innerHTML = itemTotalMoney;
			         child.attributes['itemTotalMoney'] = itemTotalMoney;
			      }
            }
        }
        
      var selectedItem = this.tree.getSelectionModel().getSelectedNode();
      tree.calculateAllTotal();
}

Ext.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
    lines:false,
    borderWidth: Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    cls:'x-column-tree',
    collapsible: false,
    
    calculateAllTotal : function(){
        var allTotal = 0;
        var rootNode = this.getRootNode();
        var children = rootNode.childNodes;
        var clen = children.length;
        if(clen != 0){
            for(var i = 0; i < clen; i++){
                var child = children[i];
                var childrenTotal = this.calculateAllChildrenTotal(child);
                var childrenTotalFormat = formatMoney(childrenTotal);
                
                allTotal = parseFloat(allTotal) + parseFloat(childrenTotal);
                
                $Id(child.getUI().columns[8]).innerHTML = formatMoneyByComma(childrenTotalFormat);
                child.attributes['itemTotalMoney'] = childrenTotalFormat;
                
            }
        }
        var managementFeesRate = dropComma($Id('managementFees').value);
        var constructionFeeRate = dropComma($Id('constructionFee').value);
        
        if(constructionFeeRate == '' ){
            constructionFeeRate = 0;
        } else if(constructionFeeRate > 0 ){
            constructionFeeRate = constructionFeeRate /100;
        }
        if(managementFeesRate == '' ){
            managementFeesRate = 0;
        } else if(managementFeesRate > 0 ){
            managementFeesRate = managementFeesRate /100;
        }
        
        allTotal = parseFloat(allTotal);
        $Id("totalProductFee").value = allTotal;
        $Id('productsFee').innerHTML = formatMoneyByComma(allTotal);
        
        var constructionFee = allTotal * parseFloat(constructionFeeRate);
        allTotal = allTotal + constructionFee;
        $Id('theConstructionFee').innerHTML = formatMoneyByComma(constructionFee);
        
        var managementFee = parseFloat(allTotal)*parseFloat(managementFeesRate);
        allTotal = allTotal + managementFee;
        $Id('theManagementFee').innerHTML = formatMoneyByComma(managementFee);
        
        $Id('sumaryTotal').innerHTML = formatMoneyByComma(allTotal);
        var taxPercent = $Id('taxPercent').value;
        if(taxPercent == '' ){
            taxPercent = 0;
        }
        
        var tax = (allTotal * taxPercent)/100;
        $Id('tax').innerHTML = formatMoneyByComma(tax);
        var taxedAllTotal = allTotal + tax;
        $Id('taxedSumaryTotal').innerHTML = formatMoneyByComma(taxedAllTotal);

       // alert(formatMoney(allTotal));
        
    },
    
    calculateAllChildrenTotal : function(childNode){
        var results =0;
        var isLeaf = childNode.attributes['leaf'];
        if(isLeaf){
            var itemTotalMoney = childNode.attributes['itemTotalMoney'];
            results = parseFloat(results) + parseFloat(dropComma(itemTotalMoney));
        }
        
        var children = childNode.childNodes;
        var clen = children.length;
        if(clen != 0){
            for(var i = 0; i < clen; i++){
	            results += this.calculateAllChildrenTotal(children[i]);
	        }
        }
        
        return results;
    },
    
    updateHeader:function(){
    	
    	if(isContract()){
    		displayMarketPrice(true);
    		$Id('headID_7').innerHTML="包干价";
    	}else {
    		displayMarketPrice(false);
    		$Id('headID_7').innerHTML="单价";
    	}
    	
    },
    
    onRender : function(){
        Ext.tree.ColumnTree.superclass.onRender.apply(this, arguments);
        this.headers = this.body.createChild(
            {cls:'x-tree-headers'},this.innerCt.dom);

        var cols = this.columns, c;
        var totalWidth = 0;

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     id:'headID_'+i,
                     html: c.header
                     
                 },
                 id:'column_Name_'+i,
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        this.headers.setWidth(totalWidth);
        this.innerCt.setWidth(totalWidth);
        this.updateHeader();
    }

});


Ext.tree.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    focus: Ext.emptyFn, // prevent odd scrolling behavior

    renderElements : function(n, a, targetNode, bulkRender){
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
        var t = n.getOwnerTree();
        var cols = t.columns;
        var bw = t.borderWidth;
        var c = cols[0];
        
        n.cols = new Array();
        var colsId = new Array();
        
        var text = n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]);
        n.cols[cols[0].dataIndex] = text;
        var headerId = cols[0].dataIndex + colIdSeparator + getColIdIndex();
        var buf = [
             '<li class="x-tree-node" unselectable="on"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'" unselectable="on">',
                '<div class="x-tree-col" style="width:',c.width-bw,'px;" unselectable="on">',
                    '<span class="x-tree-node-indent" unselectable="on">',this.indentMarkup,"</span>",
                    '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" unselectable="on">',
                    '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                    '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',
                    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", ' unselectable="on">',
                    '<span unselectable="on" id="',headerId,'">', text,"</span></a>",
                "</div>"];
         colsId.push(headerId);
         for(var i = 1, len = cols.length; i < len; i++){
             
             c = cols[i];
             var text = (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]);
             n.cols[cols[i].dataIndex] = text;
            var otherColId = c.dataIndex + colIdSeparator + getColIdIndex();
             buf.push('<div id ="column_Name_'+i+'" class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;" unselectable="on">',
                        '<div class="x-tree-col-text" unselectable="on" id="',otherColId ,'" >',text,"</div>",
                      "</div>");
             colsId.push(otherColId);
         }
         buf.push(
            '<div class="x-clear" unselectable="on"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;" unselectable="on"></ul>',
            "</li>");

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }
        
        tree.updateHeader();

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        this.anchor = cs[3];
        this.textNode = cs[3].firstChild;
        this.columns=colsId;
    }
});
Ext.tree.ColumnTreeEditor = function(tree, config){
    config = config || {};
    var field = config.events ? config : new Ext.form.TextField(config);
    Ext.tree.TreeEditor.superclass.constructor.call(this, field);

    this.tree = tree;

    if(!tree.rendered){
        tree.on('render', this.initEditor, this);
    }else{
        this.initEditor(tree);
    }
};

Ext.extend(Ext.tree.ColumnTreeEditor, Ext.Editor, {
    
    alignment: "l-l",
    autoSize: false,
    
    hideEl : false,
    
    cls: "x-small-editor x-tree-editor",
    
    shim:false,
    shadow:"frame",
    
    maxWidth: 250,
    
    editDelay: 0,

    initEditor : function(tree){
        tree.on('beforeclick', this.beforeNodeClick, this);
        this.on('complete', this.updateNode, this);
        this.on('beforestartedit', this.fitToTree, this);
        this.on('startedit', this.bindScroll, this, {delay:10});
        this.on('specialkey', this.onSpecialKey, this);
    },

        fitToTree : function(ed, el){

        var td = this.tree.getTreeEl().dom, nd = el.dom;
    
        if(td.scrollLeft >  nd.offsetLeft){             td.scrollLeft = nd.offsetLeft;
        }
        var w = Math.min(
                this.maxWidth,
                (td.clientWidth > 20 ? td.clientWidth : td.offsetWidth) - Math.max(0, nd.offsetLeft-td.scrollLeft) - 5);
        this.setSize(w, '');
    },

        triggerEdit : function(node, e){
        var obj = e.target;
        if (Ext.select(".x-tree-node-anchor", false, obj).getCount() == 1) {
            obj = Ext.select(".x-tree-node-anchor", false, obj).elements[0].firstChild;
        } else if (obj.nodeName == 'SPAN' || obj.nodeName == 'DIV'){
            obj = e.target;
        } else {
            return false;
        }

        var objId = obj.id.split(colIdSeparator)[0];
        
        var colIndex = 0;
        for (var i in node.cols) {
            if(i == objId){
                colIndex = i;
            }
        }
        
        
        
        this.completeEdit();
        
        if(isEdit == false){
            return false;
        }
        
        if(!this.tree.getSelectionModel().getSelectedNode().isLeaf()){
            if(colIndex != "name"){
                return false;
            }
        } else if(colIndex == "name" || colIndex == "model" || colIndex == "brand" || colIndex == "unit" || colIndex == "itemTotalMoney"|| colIndex == "origin"|| colIndex == "originalMarketPrice"){
            return false;
        }
        this.editNode = node;
        this.editCol = obj;
        this.editColIndex = colIndex;
        this.startEdit(obj);
        if (obj.nodeName == 'DIV') {
            var width = obj.offsetWidth;
            this.setSize(width);
        }
    },

        bindScroll : function(){
        this.tree.getTreeEl().on('scroll', this.cancelEdit, this);
    },

        beforeNodeClick : function(node, e){
        var sinceLast = (this.lastClick ? this.lastClick.getElapsed() : 0);
        this.lastClick = new Date();
        
        if(sinceLast > this.editDelay && this.tree.getSelectionModel().isSelected(node)){
            e.stopEvent();
            this.triggerEdit(node, e);
            return false;
        } else {
            this.completeEdit();
        }
    },

        updateNode : function(ed, value){
        if(this.editColIndex == 'amount' && ! isAmount(value)){
                alert("数量只能为大于或等于0数字。");
                return false;
        }
        
        if(this.editColIndex == 'marketPrice'){
           value = dropComma(value);
           if(!isMoney(value)){
                alert("金额格式不正确。");
                return false;
           }
           value = formatMoney(value);
        }
        
        this.tree.getTreeEl().un('scroll', this.cancelEdit, this);
        this.editNode.cols[this.editColIndex] = value; //for internal use only
        this.editNode.attributes[this.editColIndex] = value;//duplicate into array of node attributes
        this.editCol.innerHTML = value;
        this.calculateRowSummary(this.editColIndex, value);
    },

        onHide : function(){
        Ext.tree.TreeEditor.superclass.onHide.call(this);
        if(this.editNode){
            this.editNode.ui.focus();
        }
    },

        onSpecialKey : function(field, e){
        var k = e.getKey();
        if(k == e.ESC){
            e.stopEvent();
            this.cancelEdit();
        }else if(k == e.ENTER && !e.hasModifier()){
            e.stopEvent();
            this.completeEdit();
        }
    },
    
        calculateRowSummary : function (dataIndex, dataValue){
             if(dataIndex == 'amount' || dataIndex == 'marketPrice'){
	             var selectedItem = this.tree.getSelectionModel().getSelectedNode();
	             var marketPrice = dropComma(selectedItem.attributes['marketPrice']);
	             var amount = dropComma(selectedItem.attributes['amount']);
	             
	             if(isNumeric(marketPrice)&&isInteger(amount)){
	                var marketPriceWithComma = formatMoneyByComma(marketPrice);
	                $Id(selectedItem.getUI().columns[7]).innerHTML = marketPriceWithComma;
	                var itemTotalMoney = formatMoneyByComma(amount * marketPrice);
	                $Id(selectedItem.getUI().columns[8]).innerHTML = itemTotalMoney;
	                selectedItem.attributes['itemTotalMoney'] = itemTotalMoney;
	             }
             	tree.calculateAllTotal();
             }
             
   }
});