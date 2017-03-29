MainPagePortletGrid = function(portletInfor){
    var inforType = portletInfor.portletItemsType;
	this.portalParams = new Object();
	var jsonreader = new Ext.data.JsonReader({}, [
       {name: 'id'},
       {name: 'date'},
       {name: 'title'},
 	   {name: 'moduleName'},
 	   {name: 'viewLinkUrl'},
 	   {name: 'formID'},
 	   {name: 'isNew'},
 	   {name: 'linkAddress'},
 	   {name: 'moduleNameForDisplay'},
 	   {name: 'optionValue'},
 	   {name: 'attachFileId'},
 	   {name: 'linkUrl'},
 	   {name: 'isShowHotImg'},
 	   {name: 'isTop'}
    ]);
    
    //新闻，通知，公告，企业文化等的列定义，有日期
    var columns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'title'},
        {header: "日期", width: 100,align:'right', sortable: false, resizable: false, menuDisabled:true, dataIndex: 'date'}
    ];
    
    var emailcolumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'title'},
        {header: "日期", width: 150,align:'right', sortable: false, resizable: false, menuDisabled:true, dataIndex: 'date'}
    ];
    
    //知识管理，常用信息，投票等的列定义，无日期
    var columns1 = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'title'}
    ];
    
    var autoNoticeColumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'title'},
        {header: "模块", width: 85, sortable: false, resizable: false, menuDisabled:true, dataIndex: 'moduleName'}
    ];
    
   this.reloadGrid = function (){
   		
   		actionStore.load({params :this.portalParams});
   }
    
    switch(inforType){
        case 'constantuse' :
        case 'knowledge' :
        case 'vote' :
           columns = columns1;
           break;
        case 'autoNotice' :
           columns = autoNoticeColumns;
           break;
        case 'email' :
        case 'innerEmail' :
            columns = emailcolumns;
            break;
        default :
            break;
    }
    
    function getItemsAmount(){
        //alert(portletInfor.itemsAmount);
        return portletInfor.itemsAmount;
    }
    
    function buildParams(){
    
    	this.portalParams.inforType = inforType;
    	this.portalParams.totalItem = getItemsAmount();
    	return true;
    }
    
    function renderTitle(v, p, record){
        var herfUrl = '';
        
        switch(inforType){
            case 'news' :
              if(record.data.isTop == "1")
            	  herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/news.mhtml?id='+record.data.id +"\'>[置顶]";
              else
            	  herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/news.mhtml?id='+record.data.id +"\'>";
               break;
            case 'notice' :
               if(record.data.isTop == "1")
            	   herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/notice.mhtml?id='+record.data.id+"\'>[置顶]";
               else
            	   herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/notice.mhtml?id='+record.data.id+"\'>";
               break;
            case 'affiche' :
               if(record.data.isTop == "1")
            	   herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/affiche.mhtml?id='+record.data.id+"\'>[置顶]";
               else
            	   herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/affiche.mhtml?id='+record.data.id+"\'>";
               break;
            case 'enterprise' :
               if(record.data.isTop == "1")
            	   herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/enterprise.mhtml?id='+record.data.id+"\'>[置顶]";
               else
            	   herfUrl = "<a href=\'"+WWWROOT + '/publicinformation/enterprise.mhtml?id='+record.data.id+"\'>";
               break;
            case 'todo' :
                herfUrl = "<a href=\'"+WWWROOT + record.data.viewLinkUrl +'?id='+record.data.formID+"\'>";
               break;
            case 'email' :
               herfUrl = "<a href=\'"+WWWROOT + '/email/mailForm.mhtml?fun=v&folderId=1&id='+record.data.id+"\' >";
               if(record.data.isNew == 0 ){
                    v = "<span class=\'unreade\'>" + v + "</span>" + '&nbsp;&nbsp;<img class="newlogo_image" src="'+WWWROOT+'/images/emaillogo.gif" />';
               }
               break;
            case 'innerEmail' :
               herfUrl = "<a href=\'"+WWWROOT + '/email/innerMailForm.mhtml?fun=v&folderId=1&id='+record.data.id+"\' >";
               if(record.data.isNew == 0 ){
                    v = "<span class=\'unreade\'>" + v + "</span>" + '&nbsp;&nbsp;<img class="newlogo_image" src="'+WWWROOT+'/images/emaillogo.gif" />';
               }
               break;
            case 'autoNotice' :
               herfUrl = "<a href=\'"+WWWROOT + record.data.linkAddress+"\'>";
               v = '[ '+record.data.moduleNameForDisplay + ' ]'+v
               break;
            case 'constantuse' :
               herfUrl = "<a href=\'"+record.data.optionValue+"\' target=\'_blank\' >";
               break;
            case 'knowledge' :
                if(record.data.attachFileId>0){
                    herfUrl = "<a href=\'"+WWWROOT + record.data.linkUrl +"\' target=\'_blank\'>";
                } else {
                    herfUrl = "<a href=\'"+WWWROOT + record.data.linkUrl +"\'>";
                }
               break;
            case 'rent' :
               herfUrl = "<a href=\'"+WWWROOT + "/pms/rent/rentForm.mhtml?id="+record.data.id+"\'>";
               break;
            case 'pmsContract' :
                herfUrl = "<a href=\'"+WWWROOT + "/pms/contract/contractForm.mhtml?id="+record.data.id+"\'>";
                break;
            default :
                break;
        }
        var isShowHotImg = record.data.isShowHotImg;
        if((typeof (record.data.isShowHotImg)!='undefined')&&(record.data.isShowHotImg)){
            v = v + '&nbsp;&nbsp;<img class="newlogo_image" src="'+WWWROOT+'/images/newlogo.gif" />';
        }
        herfUrl += v+"</a>";
        return herfUrl;
    }
    var actionStore = new Ext.data.Store({
            reader:jsonreader,
            data:allPortalListData.portalVoList[inforType]
        });
    actionStore.on('beforeload',buildParams,this);
    MainPagePortletGrid.superclass.constructor.call(this, {
        bodyStyle : 'padding:0px;margin:0px',
        anchor: '100%',
        layout : 'fit',
        store: actionStore,
        columns: columns,
        autoExpandColumn: 'title',
        hideHeaders:true,
        autoHeight:true
    });
   
}

Ext.extend(MainPagePortletGrid, Ext.grid.GridPanel);
