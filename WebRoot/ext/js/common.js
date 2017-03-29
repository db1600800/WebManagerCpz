Ext.BLANK_IMAGE_URL = WWWROOT+'/ext/resources/images/default/s.gif';

function showWaitMsg(msg){
    Ext.MessageBox.show({
           msg: msg,
           progressText: '正在' + msg + '，请稍候...',
           width:300,
           wait:true,
           waitConfig: {interval:200},
           icon:Ext.MessageBox.INFO
    });
}
function showSuccess(){
    Ext.MessageBox.hide();
}

function gohistory(){
    history.go(-1);
}

function loadPage(url){
	Ext.getCmp('mainlayout').load(WWWROOT+url);
}

Ext.apply(Ext.form.VTypes, {
    serialNumber :function(val, field){
        var certificateNameNumberExp = /^\d+[a-zA-Z]\d+$/;
        if(certificateNameNumberExp.test(val)){
            return true;
        }
        return false;
    },
    serialNumberText :'编号不规范！正确格式［数字+一个字母+数字］'

});


var FormUtils = {
    	 setReadOnly : function(form, isReadOnly) {
            if(typeof form == 'string') {
                form = (document.getElementById(form) || document.forms[form]);
            }

            var el, id, name, cmp;
            for (var i = 0; i < form.elements.length; i++) {
                el = form.elements[i];
                name = form.elements[i].name;
                id = form.elements[i].id;
                
                cmp = Ext.getCmp(id);
                
                var parentId = el.parentNode.id;
                var imgNodes = Ext.query('img[class*=x-form-trigger]', el.parentNode);
                this.setFieldImgVisable(imgNodes, isReadOnly);
                
                if(!Ext.isEmpty(cmp)){
                	if(isReadOnly){
                	   cmp.addClass('fieldReadOnly');
                	   el.readOnly=true;
                	   if(('checkbox'==el.type)||('radio'==el.type)){
                			el.disabled = true;	
                		}
                		
                		if('combo'==cmp.getXType()){
                			cmp.getEl().removeClass('x-combo-noedit');
                			cmp.disabled = true;
                		}
                	} else {
                		cmp.removeClass('fieldReadOnly');
                		el.readOnly=false;
                		if(('checkbox'==el.type)||('radio'==el.type)){
                			el.disabled = false;	
                		}
                		if('combo'==cmp.getXType()){
                			cmp.disabled = false;
                			cmp.getEl().addClass('x-combo-noedit');
                		}
                	}
                }              
            }
        },
        setSpecificElReadOnly:function(form,proIds,isReadOnly){
        	if(typeof form == 'string') {
                form = (document.getElementById(form) || document.forms[form]);
            }
            for(var i=0;i<proIds.length;i++){
            	var id = proIds[i];
            	var cmp = Ext.getCmp(id);
            	var el = form.elements[id];
            	if(!Ext.isEmpty(cmp)){
                	if(isReadOnly){
                	   el.readOnly=true;
                	} else {
                		cmp.removeClass('fieldReadOnly');
                		el.readOnly=false;
                	}
                }              
            }
        },
        setReadOnlyByFieldIds: function(form, fieldIds, isReadOnly){
        	if(typeof form == 'string') {
                form = (document.getElementById(form) || document.forms[form]);
            }
            for(var i=0;i<fieldIds.length;i++){
                var id = fieldIds[i];
                var cmp = Ext.getCmp(id);
                var el = form.elements[id];
                var parentId = el.parentNode.id;
                var imgNodes = Ext.query('img[class*=x-form-trigger]', el.parentNode);
                this.setFieldImgVisable(imgNodes, isReadOnly);
                if(!Ext.isEmpty(cmp)){
                    if(isReadOnly){
                       el.readOnly=true;
                       if(('checkbox'==el.type)||('radio'==el.type)){
                            el.disabled = true; 
                        }
                        
                        if('combo'==cmp.getXType()){
                            cmp.getEl().removeClass('x-combo-noedit');
                            cmp.disabled = true;
                        }
                    } else {
                        cmp.removeClass('fieldReadOnly');
                        el.readOnly=false;
                        if(('checkbox'==el.type)||('radio'==el.type)){
                            el.disabled = false;    
                        }
                        if('combo'==cmp.getXType()){
                            cmp.disabled = false;
                            cmp.getEl().addClass('x-combo-noedit');
                        }
                    }
                }              
            }
        },
        
        setFieldImgVisable: function(fieldsSelImg, isReadOnly){

        	for (var i = 0; i < fieldsSelImg.length; i++) {
                var el = fieldsSelImg[i];
                if(isReadOnly){
                    el.style.visibility='hidden';
                } else {
                    el.style.visibility='visible';
                }
            }
        }
    };

Ext.namespace('Ext.ux.util.Format');
Ext.ux.util.Format = function(){
    var trimRe = /^\s+|\s+$/g;
    return {        
        usMoney : function(v, prefix){
        	if(prefix==null){
        		prefix = '￥';
        	}
            v = (Math.round((v-0)*100))/100;
            v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
            v = String(v);
            var ps = v.split('.');
            var whole = ps[0];
            var sub = ps[1] ? '.'+ ps[1] : '.00';
            var r = /(\d+)(\d{3})/;
            while (r.test(whole)) {
                whole = whole.replace(r, '$1' + ',' + '$2');
            }
            v = whole + sub;
            if(v.charAt(0) == '-'){
                return '-' + prefix + v.substr(1);
            }

            return prefix +  v;
        }
    };
}();


function formatMoneyUtil(v, prefix){
	return Ext.ux.util.Format();
}

Ext.override(Ext.grid.EditorGridPanel, {
    isCellValid:function(col, row) {
        if(!this.colModel.isCellEditable(col, row)) {
            return true;
        }
        
        var ed = this.colModel.getCellEditor(col, row);
        if(!ed) {
            return true;
        }
        
        var record = this.store.getAt(row);
        
        if(!record) {
            return true;
        }
        
        var field = this.colModel.getDataIndex(col);
        ed.field.setValue(record.data[field]);
        return ed.field.isValid(true);
    },
    
    isValid:function(editInvalid) { 
        var cols = this.colModel.getColumnCount(); 
        var rows = this.store.getCount();
        var r, c;
        var valid = true;
        for(r = 0; r < rows; r++) {
            for(c = 0; c < cols; c++) {
                valid = this.isCellValid(c, r);
                if(!valid) {
                    break;
                }
            }
           
           if(!valid) {
               break;
           }
        }
        
        if(editInvalid && !valid) { 
            this.startEditing(r, c);
        }
        
        return valid;
    },
    
    setEditable : function(editable){
    	var cols = this.colModel.getColumnCount(); 
        for(c = 0; c < cols; c++) {
            if(this.colModel.getCellEditor(c, 0) != null){
                this.colModel.setEditable(c, editable);
            }
        }
        
        var topToolbar = this.getTopToolbar();
        if(topToolbar){
        	topToolbar.setVisible(editable);
        }
       
       
       if(editable){
       	    this.getView().refresh(false);
       }
    }
});
    
Ext.override(Ext.form.BasicForm, {
	setValues : function(values){
        if(Ext.isArray(values)){ // array of objects
            for(var i = 0, len = values.length; i < len; i++){
                var v = values[i];
                var f = this.findField(v.id);
                if(f){
                    f.setValue(v.value);
                    if(this.trackResetOnLoad){
                        f.originalValue = f.getValue();
                    }
                }
            }
        }else{ // object hash
            var field, id;
            
            for(id in values){
                //alert(id + "=" +values[id].length);
            	
                if((typeof values[id] != 'function') && (field = this.findField(id))){
                		field.setValue(values[id]);
	                    if(this.trackResetOnLoad){
	                        field.originalValue = field.getValue();
	                    }
                }else if((typeof values[id] != 'function') &&(typeof values[id] == 'object') && !(field = this.findField(id))){
                	//如果是对象，则遍历该对象的属性设置（只遍历一层）
                	var currentObject = values[id];
                	var parentPname = id;
                	for(cid in currentObject){
                		if((typeof currentObject[cid] != 'function') &&(typeof currentObject[cid] != 'object')){
                			var cf = parentPname+'.'+cid;
                			if( field = this.findField(cf)){
		                		field.setValue(currentObject[cid]);
			                    if(this.trackResetOnLoad){
			                        field.originalValue = field.getValue();
			                    }
	                	}
                		}
                	}
                }
            }
        }
        return this;
    }
});

 function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
    
