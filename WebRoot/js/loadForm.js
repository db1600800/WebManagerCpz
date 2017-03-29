var formObj;
var routerTypeFormWin;
function loadDonee(){
    var startTime=$("#startTime").val();
    startTime = startTime.replace(/\s/ig,'');
    var endTime=$("#endTime").val();
    endTime = endTime.replace(/\s/ig,'');
    // js检查
    if(startTime==""||startTime.length==0)
    {
       showResult("开始时间不能为空");
       return;
    }
    if(endTime==""||endTime.length==0)
    {
       showResult("结束时间不能为空");
       return;
    }
     if(startTime > endTime){
   	 showResult("结束时间不能小于开始时间");
       return;
    }
		window.location.href = "/chinapost/loadExcelAction!loadDonee.do?startTime=" + startTime + "&endTime=" + endTime;
	}
function loadDoneecalu(){
	var startTime=$("#startTime").val();
    startTime = startTime.replace(/\s/ig,'');
    var endTime=$("#endTime").val();
    endTime = endTime.replace(/\s/ig,'');
    // js检查
    if(startTime==""||startTime.length==0)
    {
    	showResult("开始时间不能为空");
       return;
    }
    if(endTime==""||endTime.length==0)
    {
    	showResult("结束时间不能为空");
       return;
    }
    
    if(startTime > endTime){
    	showResult("结束时间不能小于开始时间");
       return;
    }
		window.location.href = "/chinapost/loadExcelAction!loadDoneeCalu.do?startTime=" + startTime + "&endTime=" + endTime;
}
Ext.onReady(function(){
    Ext.QuickTips.init();
    //loadRouterTypeForm()
});

function loadRouterTypeForm() {
	
	formObj = new Ext.FormPanel({
		frame : true,
		bodyStyle : 'padding:5px 5px 0px 5px',
		labelAlign:'left',
		labelSeparator : ':',
		autoHeight : true,
		layout : 'fit',
		fileUpload : true,
		items : [{
			xtype : 'panel',
			id : 'panel',
			autoHeight : true,
			items : [{
				xtype : 'panel',
				autoHeight : true,
				items : [{
					xtype : 'fieldset',
			        title :'开始时间：',
			        labelAlign:'right',
					labelSeparator : ':',
					autoHeight : true,
			        items : [{
			        	xtype : 'textfield',
						id : 'startTime',
						name : 'startTime',
						fieldLabel : '开始时间',
						blankText : '请输入开始时间!',
						allowBlank : false,
						anchor : '60%',
						readOnly:true,
						listeners:{ 
			        		focus:function(nf, newv, oldv) {
			        			WdatePicker();
							}
						}
			        },{
			        	xtype : 'textfield',
			        	id : 'endTime',
						name : 'endTime',
						fieldLabel : '结束时间',
						blankText : '请输入结束时间!',
						allowBlank : false,
						readOnly:true,
						anchor : '60%',
						listeners:{ 
			        		focus:function(nf, newv, oldv) {
			        			WdatePicker();
							}
						}
			        }],
			        buttonAlign : 'center',
			        buttons : [{
			        	text : '爱心包裹受捐人导出',
			        	handler : function() {
			        	loadDonee();
			        	}
			        },{
				        	text : '爱心包裹结清报表',
				        	handler : function() {
				        	loadDoneecalu();
				        }
			        }]
			        
				}]
			}]
		}]
	});
	
	routerTypeFormWin = new Ext.Window( {
		layout : 'fit',
		title : '爱心包裹下载',
		width : 600,
		border : false,
		modal : true,
		autoHeight : true,
		plain : true,
		items : [ formObj ]
	});
	routerTypeFormWin.show();
	
}
