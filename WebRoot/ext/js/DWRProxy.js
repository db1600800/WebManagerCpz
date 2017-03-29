/*
 @author:Condy
 @createDate:2008-01-14
 Ext.data.DWRProxy(DWR的调用方法,调用方法的输入参数)
 example:
   1.use DWRJsonReader:
   var store=new Ext.data.Store({
        proxy:new Ext.data.DWRProxy(DWRCall.getComboJsonByObject,"condy",{name:'condy',address:'xxxx',age:26}),
        reader:new Ext.data.DWRJsonReader({
         totalProperty: "results",    
    root: "rows",                
    id: "id"
        },new Ext.data.Record.create([
        {name: 'text', mapping: 'name'},     
        {name: 'value',mapping:'occupation'}                 
      ]))
    });
     java code:
     public String getComboJsonByObject(String param1,DWRObject dwrobject){
        System.out.println("param1:"+param1);
        System.out.println("DWRObject: name:"+dwrobject.getName()+" age:"+dwrobject.getAge());
        StringBuffer sb=new StringBuffer();
        sb.append("{ 'results': 2, 'rows': [");
        sb.append("{ 'id': 1, 'name': 'Bill', occupation: 'Gardener' },");
        sb.append("{ 'id': 2, 'name': 'Ben', occupation: 'Horticulturalist' } ]");
        sb.append("}");
        System.out.println(sb.toString());
        return sb.toString();
    }
    2. use DWRArrayReader:
      var store=new Ext.data.Store({
        proxy:new Ext.data.DWRProxy(DWRCall.getComboArray,"condy"),
        reader:new Ext.data.DWRArrayReader({
        },new Ext.data.Record.create([
        {name: 'text', mapping: 0},     
        {name: 'value',mapping:1}                 
      ]))
    });
     java code:
     public String[][] getComboArray(String id){
        System.out.println("id:"+id);
        String[][] aaData={new String[]{"aaa","111"},new String[]{"bbb","222"}};
        
        return aaData;
    }
    
    3. use DWRXmlReader:
    store=new Ext.data.Store({
        proxy:new Ext.data.DWRProxy(DWRCall.getComboArray,"condy"),
        reader:new Ext.data.DWRArrayReader({
        },new Ext.data.Record.create([
        {name: 'text', mapping: 0},     
        {name: 'value',mapping:1}                 
      ]))
    });
     java code:
      public String getComboXml(String param1,String param2){
        System.out.println("param1:"+param1);
        System.out.println("param2:"+param2);
        StringBuffer sbxml=new StringBuffer();
        sbxml.append("<?xml version=\"1.0\" encoding=\"GBK\"?>\n");
        sbxml.append("<dataset>\n");
        sbxml.append("<results>2</results>\n");
        sbxml.append("<row>\n");
        sbxml.append("<id>1</id>\n");
        sbxml.append("<name>Bill</name>\n");
        sbxml.append("<occupation>Gardener</occupation>\n");
        sbxml.append("</row>\n");
        sbxml.append("<row>\n");
        sbxml.append("<id>2</id>\n");
        sbxml.append("<name>Condy</name>\n");
        sbxml.append("<occupation>Horticulturalist</occupation>\n");
        sbxml.append("</row>\n");
        sbxml.append("</dataset>\n");
        System.out.println(sbxml.toString());
        return sbxml.toString();
    }
 */

Ext.data.DWRProxy = function(dwrCall){
    Ext.data.DWRProxy.superclass.constructor.call(this);
    this.dwrCall = dwrCall;
    
    this.callParams = new Array();
    for( i=1;i<arguments.length;i++){
        this.callParams.push(arguments[i]);
    }

};

Ext.extend(Ext.data.DWRProxy, Ext.data.DataProxy, {
    load : function(params, reader, callback, scope, arg) {
        
        if(this.fireEvent("beforeload", this, params) !== false) {
            
            if(params && params.dwrMethodParams){
                var dwrMethodParamsLength = params.dwrMethodParams.length;
                for(var i=0; i < dwrMethodParamsLength; i++){
                    this.callParams[i] = params.dwrMethodParams[i];
                }
            }
            
            var delegate = this.loadResponse.createDelegate(this, [reader, callback, scope, arg], true);

            this.callParams.push(delegate);
            this.dwrCall.apply(this, this.callParams);
        
        } else {

            callback.call(scope || this, null, arg, false);
        }
    },

    loadResponse : function(dwrResult, reader, callback, scope, arg) {

                    var result = 1;
                    try {
                      result = reader.read(dwrResult);
                     
                    } catch(e) {
                      this.fireEvent("loadexception", this, null, dwrResult, e);
                      callback.call(scope, null, arg, false);
                      return;
                    }
                    callback.call(scope, result, arg, true);
                }
    });

Ext.data.DWRProxyOfParamArray = function(dwrCall,dwrCallParamArray){
    Ext.data.DWRProxyOfParamArray.superclass.constructor.call(this);
    this.dwrCall = dwrCall;
    this.callParams = new Array();

    if(dwrCallParamArray && dwrCallParamArray.length > 0){
    	for(var i=0;i<dwrCallParamArray.length;i++){
            this.callParams.push(dwrCallParamArray[i]);
        }
    }
};
Ext.extend(Ext.data.DWRProxyOfParamArray, Ext.data.DataProxy, {
    load : function(params, reader, callback, scope, arg) {

    	if(this.fireEvent("beforeload", this, params,arg) !== false) {
            var delegate = this.loadResponse.createDelegate(this, [reader, callback, scope, arg], true);
            var dwrCallParams = new Array();
            Ext.apply(dwrCallParams , this.callParams);
            dwrCallParams.push(delegate);
            this.dwrCall.apply(this, dwrCallParams);
        
        } else {

            callback.call(scope || this, null, arg, false);
        }
    },

    loadResponse : function(dwrResult, reader, callback, scope, arg) {
                    var result = 1;
                    try {
                      result = reader.read(dwrResult);
                     
                    } catch(e) {
                      this.fireEvent("loadexception", this, null, dwrResult, e);
                      callback.call(scope, null, arg, false);
                      return;
                    }
                    callback.call(scope, result, arg, true);
                }
    });
/*
 *
 *DWR调用方法返回的格式json
 *参数调用格式与 Ext.data.JsonReader是一样的 请查看Ext的api文档
*/
Ext.data.DWRJsonReader=function(meta,recordType){   
  Ext.data.DWRJsonReader.superclass.constructor.call(this,meta,recordType);   
};   
  
Ext.extend(Ext.data.DWRJsonReader,Ext.data.JsonReader,{   
  read : function(response){

        if(typeof response == 'string'){
            var o = eval("("+response+")");
        }

        if(!o) {
            throw {message: "读取Json出错: 没有找到Json对象"};
        }
        
        
        
        if(o.metaData){

            delete this.ef;
            this.meta = o.metaData;
            this.recordType = Ext.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
            
        }

        
        this.setHiddenValue('selectSqlWhereCondition', o.selectSqlWhereCondition);
        this.setHiddenValue('totalRows', o.totalResults);
        this.setHiddenValue('unreadNumber', o.unreadNumber);
        return this.readRecords(o);
    },
    
    
  
    setHiddenValue : function(hiddenId, value){
      	if(value != undefined){
      	     var hiddenObj = document.getElementById(hiddenId);
      	     if(hiddenObj){
      	         hiddenObj.value = value;
      	     }
      	}
  }
});  

/*
 *返回数组格式：[[xxx,yyy],[aaaa],[bbbb]]
 *参数调用格式与 Ext.data.ArrayReader是一样的，请查看Ext的api文档
 */
Ext.data.DWRArrayReader=function(meta,recordType){
    Ext.data.DWRArrayReader.superclass.constructor.call(this,meta,recordType);   
};   
  
Ext.extend(Ext.data.DWRArrayReader,Ext.data.ArrayReader,{   
  read : function(response){
        var o = response;
        if(!o) {
            throw {message: "JsonReader.read: Json object not found"};
        }
        if(o.metaData){
            delete this.ef;
            this.meta = o.metaData;
            this.recordType = Ext.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
            
        }
        return this.readRecords(o);
    }  
});


Ext.data.DWRObjectArrayReader=function(meta,recordType){
    meta = meta || {};
    Ext.data.DWRObjectArrayReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};   
  
Ext.extend(Ext.data.DWRObjectArrayReader,Ext.data.ArrayReader,{   
  read : function(response){
        var o = response;
        if(!o) {
            throw {message: "JsonReader.read: Json object not found"};
        }
        if(o.metaData){
            delete this.ef;
            this.meta = o.metaData;
            this.recordType = Ext.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
        }
        
        return this.readRecords(o);
    },
    
    readRecords : function(objects){
        var records = [];
        var recordType = this.recordType, fields = recordType.prototype.fields;
        var root = this.meta.root;
        if(root){
            alert(root);
        }
        
        var idField = this.meta.id;
        var success = true;
        for(var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var values = {};
            for(var j = 0; j < fields.length; j++){ 
                var field = fields.items[j];
                var v = object[field.mapping || field.name] || field.defaultValue;
                v = field.convert(v);
                //alert("name = " + field.name + " \n value = "+v);
                values[field.name] = v;
            }
            
            var id = idField ? object[idField] : undefined; 
            
            records[records.length] = new recordType(values, id);
        }
        
        return {
            success      : success,
            records      : records,
            totalRecords : records.length
        };
    }
});

/*
 *
 *DWR调用方法返回的格式XML
 *参数调用格式与 Ext.data.XmlReader是一样的 请查看Ext的api文档
*/
Ext.data.DWRXmlReader=function(meta,recordType){   
  Ext.data.DWRXmlReader.superclass.constructor.call(this,meta,recordType);   
};   
  
Ext.extend(Ext.data.DWRXmlReader,Ext.data.XmlReader,{   
  read : function(response){
        var doc;
        try{
            if(Ext.isIE || Ext.isIE7){
                doc=new ActiveXObject("Microsoft.XMLDOM");
                doc.loadXML(response);
            }else{
                var oParser=new DOMParser();
                doc=oParser.parseFromString(response,"text/xml");
            }
        }catch(e){
            alert(e);
        }
        if(!doc) {
            throw {message: "DWRXmlReader.read: XML Document not available"};
        }
        return this.readRecords(doc);
    }  
});



/**
 * 表单加载时直接用对象渲染
 * @param {} meta
 * @param {} recordType
 */
Ext.data.ObjectReader = function(meta, recordType){
    meta = meta || {};
    
    Ext.data.ObjectReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};

Ext.extend(Ext.data.ObjectReader, Ext.data.DataReader, {
    read : function(response){
        if( undefined == response.objects ) {
            throw {message: "ObjectReader.read: Objects not available"};
        }
    
        var result = this.readRecords(response.objects);
    
        if ( undefined != response.totalSize ){ 
            result.totalRecords = response.totalSize;
        }
    
        return result;   
    },    
    
    
    
    readRecords : function(objects){
        var records = [];
        var recordType = this.recordType, fields = recordType.prototype.fields;
        
        var idField = this.meta.id;
        var success = true;
        for(var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var values = {};
            for(var j = 0; j < fields.length; j++){ 
                var field = fields.items[j];
                var v = object[field.mapping || field.name] ;
                v = field.convert(v);
                //alert("name = " + field.name + " \n value = "+v);
                values[field.name] = v;
            }
            
            var id = idField ? object[idField] : undefined; 
            
            records[records.length] = new recordType(values, id);
        }
        
        return {
            success      : success,
            records      : records,
            totalRecords : records.length
        };
    }
}); 

/*
 * 
 * @class Ext.form.Action.DWRLoad 
 * @extends Ext.form.Action 
 * Load data from DWR function 
 * options: dwrFunction, dwrArgs 
 * @constructor * @param {Object} form 
 * @param {Object} options 
 * */

Ext.form.Action.DWRLoad = function(form, options){ 
    Ext.form.Action.DWRLoad.superclass.constructor.call(this, form, options);
};

Ext.extend(Ext.form.Action.DWRLoad, Ext.form.Action, {   
    //private    
	type : 'load',    
    run : function(){

        var dwrFunctionArgs = [];
        var loadArgs = this.options.dwrArgs || []; 
        if (loadArgs instanceof Array) {
            // Note: can't do a foreach loop over arrays because Ext added the "remove" method to Array's prototype. 
            // This "remove" method gets added as an argument unless we explictly use numeric indexes.
            for (var i = 0; i < loadArgs.length; i++) {
                dwrFunctionArgs.push(loadArgs[i]); 
            }
        } else { 
            // loadArgs should be an Object
            for (var loadArgName in loadArgs) {
                dwrFunctionArgs.push(loadArgs[loadArgName]);
            }        
        }        
        
        dwrFunctionArgs.push({ 
            callback: this.success.createDelegate(this, this.createCallback(), 1),  
            exceptionHandler: this.failure.createDelegate(this, this.createCallback(), 1)
        });

        this.options.dwrFunction.apply(Object, dwrFunctionArgs);    
    },
    
    success : function(response){
        var result = this.handleResponse(response);
        if(result === true || result == null || result == '' || result == 'null' || !result.success || !result.data){
            this.failureType = Ext.form.Action.LOAD_FAILURE;
            this.form.afterAction(this, false); 
            return;        
        }
        this.form.clearInvalid();
        this.form.setValues(result.data);
        this.form.afterAction(this, true);
        this.customFunctionAfterLoad();
    },
    customFunctionAfterLoad:function (){},
    
    handleResponse : function(response){
    	
        if(this.form.reader && response != null){ 
            var rs = this.form.reader.readRecords([response]);
            var data = rs.records && rs.records[0] ? rs.records[0].data : null;
            this.result = { 
                success : rs.success,
                data : data 
            };

            return this.result; 
        }
        
        this.result = response; 
        return this.result; 
    }
});

Ext.form.Action.ACTION_TYPES.dwrload = Ext.form.Action.DWRLoad;

/** 
* @class Ext.form.Action.DWRLoad 
* @extends Ext.form.Action 
* Submit data through DWR function 
* options: dwrFunction 
* @constructor 
* @param {Object} form 
* @param {Object} options 
*/

Ext.form.Action.DWRSubmit = function(form, options){
    Ext.form.Action.Submit.superclass.constructor.call(this, form, options);
};

Ext.extend(Ext.form.Action.DWRSubmit, Ext.form.Action, {
    type : 'submit',
    
    //private
    run : function(){
        var o = this.options;
        if(o.clientValidation === false || this.form.isValid()){
            var dwrFunctionArgs = [];
            dwrFunctionArgs.push(this.form.getValues());
            var submitArgs = o.submitArgs || []; 
	        if (submitArgs instanceof Array) {
	            for (var i = 0; i < submitArgs.length; i++) {
	                dwrFunctionArgs.push(submitArgs[i]); 
	            }
	        } else { 
	            // submitArgs should be an Object
	            for (var loadArgName in submitArgs) {
	                dwrFunctionArgs.push(submitArgs[loadArgName]);
	            }        
	        } 
            dwrFunctionArgs.push({
                callback: this.success.createDelegate(this, this.createCallback(), 1),
                exceptionHandler: this.failure.createDelegate(this, this.createCallback(), 1)
            });
            
            this.options.dwrFunction.apply(Object, dwrFunctionArgs);
        } else if (o.clientValidation !== false){
            // client validation failed
            this.failureType = Ext.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },
    
    // private   
    
    success : function(response){
        var result = this.handleResponse(response);
        if(result === true || result == null || result == 'null' || result.success){
            this.form.afterAction(this, true);
            return;
        }
        
        if(result.errors){
            this.form.markInvalid(result.errors);
            this.failureType = Ext.form.Action.SERVER_INVALID;
        }
        
        this.form.afterAction(this, false);
    },
    // private
    
    handleResponse : function(response){
        if(this.form.errorReader && response != null){
            var rs = this.form.errorReader.read([response]);
            var errors = [];
            if(rs.records){
                for(var i = 0, len = rs.records.length; i < len; i++) {
                    var r = rs.records[i];
                    errors[i] = r.data;
                }
            }
            
            if(errors.length < 1){
                errors = null;
            }
            
            this.result = {
                success : rs.success,
                errors : errors 
            };
            
            return this.result; 
        }
        
        this.result = response;
        
        return this.result;
    }
});

Ext.form.Action.ACTION_TYPES.dwrsubmit = Ext.form.Action.DWRSubmit; 

