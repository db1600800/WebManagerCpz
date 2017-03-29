MainPagePortletGrid = function(portletInfor){
	var inforType = portletInfor.portletItemsType;
    var itemsAmount = portletInfor.itemsAmount;
	var columns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'title'},
        {header: "日期", width: 85, sortable: false, resizable: false, menuDisabled:true, dataIndex: 'beginDate'}
    ];
    
    var commissionCertificateColumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'content'}
    ];
    
    var introductionLetterColumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'matterContent'}
    ];
    
    var commonContractColumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'contractName'}
    ];
    
    var primaryProjectColumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'contractName'}
    ];
    
    var borrowRecordColumns = [
        {id:'title',header: "标题", width: 75, sortable: false,resizable: false, menuDisabled: true, renderer: renderTitle, dataIndex: 'licenseName'},
        {header: "日期", width: 85, sortable: false, resizable: false, menuDisabled:true, dataIndex: 'borrowDate'}
    ];
    
    var readerDetail = [
    	{name: 'id'},
        {name: 'title'},
        {name: 'beginDate'},
        {name: 'content'},
        {name: 'matterContent'},
        {name: 'contractName'},
        {name: 'licenseName'},
        {name: 'borrowDate'}
    ]

    var dwrArrayReader = new Ext.data.DWRObjectArrayReader({},new Ext.data.Record.create(readerDetail));
    var dwrProxy;
    switch(inforType){
        case 'commissionCertificate' :
           dwrProxy = new Ext.data.DWRProxy(HomePageModelManager.getCommissionCertificateList, itemsAmount);
           columns = commissionCertificateColumns;
           break;
        case 'introductionLetter' :
           dwrProxy = new Ext.data.DWRProxy(HomePageModelManager.getIntroductionLetterList, itemsAmount);
           columns = introductionLetterColumns;
           break;
        case 'commonContract' :
           dwrProxy = new Ext.data.DWRProxy(HomePageModelManager.getCommonContractList, itemsAmount);
           columns = commonContractColumns;
           break;
        case 'primaryProject' :
           dwrProxy = new Ext.data.DWRProxy(HomePageModelManager.getPrimaryProjectList, itemsAmount);
           columns = primaryProjectColumns;
           break;
        case 'borrowRecord' :
           dwrProxy = new Ext.data.DWRProxy(HomePageModelManager.getBorrowRecordList, itemsAmount);
           columns = borrowRecordColumns;
           break;
        default :
           dwrProxy = new Ext.data.DWRProxy(HomePageModelManager.getCommissionCertificateList, itemsAmount);
           columns = commissionCertificateColumns;
           break;
    }
    
    function renderTitle(v, p, record){
    	if(inforType == 'autoNotice'){
    		return '[ '+record.data.moduleNameForDisplay + ' ]'+v;
    	}
    	//alert(record.data.title)
        return v;
    }
    
    var dwrProxyStore = new Ext.data.Store({
            proxy:dwrProxy,
            reader:dwrArrayReader
        });
    
    dwrProxyStore.load();
    
    MainPagePortletGrid.superclass.constructor.call(this, {
        store: dwrProxyStore,
        columns: columns,
        autoExpandColumn: 'title',
        hideHeaders:true,
        height:200,
        //autoHeight:true,
        width:600
    });
    
    this.addListener('rowclick', function(g, rowIdx, eobj ){
        var rd = dwrProxyStore.getAt(rowIdx);
        
        var herfUrl = '';
        switch(inforType){
            case 'commissionCertificate' :
               herfUrl = WWWROOT + '/commissionCertificate/commissionCertificateExtForm.jsp?id='+rd.data.id;
               break;
            case 'introductionLetter' :
               herfUrl = WWWROOT + '/introductionLetter/introductionLetterExtForm.jsp?id='+rd.data.id;
               break;
            case 'commonContract' :
               herfUrl = WWWROOT + '/commonContract/commonContractForm.mhtml?id='+rd.data.id;
               break;
            case 'primaryProject' :
               herfUrl = WWWROOT + '/primaryProject/primaryProjectForm.mhtml?id='+rd.data.id;
               break;
            case 'borrowRecord' :
                herfUrl = WWWROOT + '/borrowRecord/borrowRecordExtView.jsp?giveback=false';
               break;
            default :
                break;
        }
        location.href = herfUrl;
    });
}

Ext.extend(MainPagePortletGrid, Ext.grid.GridPanel);
