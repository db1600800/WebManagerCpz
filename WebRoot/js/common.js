var bPageModified=false;
var wheight=window.screen.height-60;
var wwidth=window.screen.width; 
var openReturnValue="";
var webCtxRoot = '';

function selectAuthorizedWord(ctx,fieldId){
	var field = document.getElementById(fieldId) ;
	if (field == null){
	    field = document.getElementsByName(fieldId)[0];
	}
	var selectAuthorizedWords = openModalWindow(ctx + '/systemmanage/selectAuthorizedWord.jsp', '选择审批词', '500', '310');
	if(selectAuthorizedWords != null && field != null){
		field.value = uniteTwoStringBySemicolon(field.value.Trim(), selectAuthorizedWords, "，");
	}
}

function uniteTwoStringBySemicolon(targetString,addString,separator) {  
    if(typeof(separator) == "undefined" || separator == "" ){
        separator = ";" ;
    }
    if (addString != "") {
        if (targetString == "") {
            targetString = addString;
        } else {
            targetString = targetString + separator + addString;
        }
    }
    return targetString;
}

function selUsers(webRoot, displayId, id){
    selectUserOrgDept(displayId,webRoot,id);
}

function selReaders(webRoot){
    selectUserOrgDept('readersForDisplay',webRoot ,'readers');
}

function selAdministrator(webRoot,params){
    selectUserOrgDept('administratorsForDisplay',webRoot,'administrators',params);
}

function selOneReader(webRoot){
	selectPersonOrgDept('readersForDisplay',webRoot ,'readers');
}

function selOneAdministrator(webRoot){
	selectPersonOrgDept('administratorsForDisplay',webRoot,'administrators');
}
//选择单个读者
function selectPersonOrgDept(selFieldId, webRoot, hiddenFileld){
	var urlStr = webRoot+"/common/selPersonByExt.jsp?onlyOne=true";
    var selectReaders = openModalWindow(urlStr,"选择接收人","800","320");
    var selFieldObj = document.getElementById(selFieldId);
    var selIds = "";
    var selNames = "";
    if(selectReaders != null){
        if(selectReaders.Trim() != "" ){
            var selectReadersArray = selectReaders.split(';')
            for(var i = 0; i<selectReadersArray.length; i++){
                var tempReaderArray =  selectReadersArray[i].split("#*");
                selIds = uniteTwoStringBySemicolon(selIds, tempReaderArray[0], ";");
                selNames = uniteTwoStringBySemicolon(selNames, tempReaderArray[1], ";");
            }
        }
        selFieldObj.value = selNames;
        if(hiddenFileld != "" && typeof(hiddenFileld) != "undefined"){
            $Id(hiddenFileld).value = selIds;
        }
    }   
}


function selectUserOrgDept(selFieldId, webRoot, hiddenFileld,params){
	var urlStr = webRoot+"/common/selPersonByExt.jsp";
	if(params!=null){
		urlStr += params;
	}
    var selectReaders = openModalWindow(urlStr,"选择接收人","800","320");
    var selFieldObj = document.getElementById(selFieldId);
    
    var selIds = "";
    var selNames = "";
    if(selectReaders != null){
        if(selectReaders.Trim() != "" ){
            var selectReadersArray = selectReaders.split(';')
            for(var i = 0; i<selectReadersArray.length; i++){
                var tempReaderArray =  selectReadersArray[i].split("#*");
                selIds = uniteTwoStringBySemicolon(selIds, tempReaderArray[0], ";");
                selNames = uniteTwoStringBySemicolon(selNames, tempReaderArray[1], ";");
            }
        }
        selFieldObj.value = selNames;
        if(hiddenFileld != "" && typeof(hiddenFileld) != "undefined"){
            $Id(hiddenFileld).value = selIds;
        }
    }   
}


function openSelectPerson(url){
    if(url.Trim() == ""){
        return "";
    }
    var returnStr=openModalWindow(url,"选择接收人","500","400");
    if (returnStr == undefined || returnStr == "***") {
        returnStr = "";
    }
    return returnStr;
}

function openSelectCatalogue(webroot){
    
    var returnStr=openModalWindow(webroot+'/common/selCatalogue.jsp?','选择类别','800','400');
    if (typeof(returnStr) == "undefined" || returnStr == null) {
        returnStr = null;
    }
    return returnStr;
}


function selectProducts(webroot, params){
    
    if(typeof(params) == "undefined" || params == null){
       params = "";
    }
    
    //var returnStr=openModalWindow(webroot+'/common/selProduct.jsp?'+params,'选择产品','800','400');
    
    var returnStr=openModalWindow(webroot+'/product/productview.jsf?'+params,'选择产品','800','600');
    if (typeof(returnStr) == "undefined" || returnStr == null) {
        returnStr = null;
    }
    return returnStr;
}

function selectQuotedpriceCustomers(webroot, params){
    
    if(typeof(params) == "undefined" || params == null){
       params = "";
    }
    var returnStr=openModalWindow(webroot+'/quotedprice/customerView.mhtml?openSelect=true'+params,'选择客户','800','600');
    if (typeof(returnStr) == "undefined" || returnStr == null) {
        returnStr = null;
    }
    return returnStr;
}

function selectOrganization(webroot, params){
    
    if(typeof(params) == "undefined" || params == null){
       params = "";
    }
    var returnStr=openModalWindow(webroot+'/organization/organizationView.mhtml?openSelect=true'+params,'选择单位','800','600');
    if (typeof(returnStr) == "undefined" || returnStr == null) {
        returnStr = null;
    }
    return returnStr;
}

function selectContract(webroot, params){
    
    if(typeof(params) == "undefined" || params == null){
       params = "";
    }
    var returnStr=openModalWindow(webroot+'/commonContract/commonContractView.mhtml?openSelect=true'+params,'选择合同','1024','768');
    if (typeof(returnStr) == "undefined" || returnStr == null) {
        returnStr = null;
    }
    return returnStr;
}

function openSelectTemplet(webroot){
    
    var returnStr=openModalWindow(webroot+'/common/selTemplet.jsp?','选择父目录','800','400');
    if (typeof(returnStr) == "undefined" || returnStr == null) {
        returnStr = null;
    }
    return returnStr;
}

function openSelectOrgUnitModal(webRoot){

    var selectedOrgUnitArray = openModalWindow(webRoot+'/common/selOrgUnit.jsp?', '选择部门', '800', '400');
    
    return selectedOrgUnitArray;
}

function selectePersonByOrg(fieldId, webRoot,params,hiddenFieldId){
    var field = document.getElementById(fieldId) ;
    var selectLeaders = openModalWindow(webRoot+'/common/selPersonByOrgUnit.jsp?'+params, '', '600', '400');
    if(selectLeaders != null){
    	var userNames = selectLeaders[0];
    	var userIds = selectLeaders[1];
        if(userNames.Trim() == "" ){
            field.value = "" ;
        } else {
            field.value = userNames;
        }
        if(hiddenFieldId!=null){
        	var hfield = document.getElementById(hiddenFieldId) ;
        	if(userIds.Trim() == "" ){
            	hfield.value = "" ;
	        } else {
	            hfield.value = userIds;
	        }
        }
    }
}

function logout(){
    top.document.location.href="../j_spring_security_logout";
    if (top.document.location.href.indexOf("https") >=0 ){
	    alert("谢谢使用，您已经成功退出系统！")
	    window.close(); //ensure to clear SSL cache after x509 logout
    }
}

function replaceToNewLine(toReplaceStr){
    return toReplaceStr.replace(/(\(\*\#\*\))/g,"\n");
}

function stringToInteger(s){
    if (isNaN(s) || s.Trim() == "" ){
        return 0;
    }
    return parseInt(s);
}
function keyOnclick(e)
{
    var keyNum;
    try{
        if(bPageModified==true){
            return;
        }
        if (window.Event){ //for other 
            keyNum = e.which;
        }
        else{ //for IE5+
            keyNum = event.keyCode;
        } 
        //ignore 'Enter' and 'Tab' key
        if(keyNum !=13 && keyNum !=9){
            bPageModified=true;
        }
    }
    catch(e)
    {
    }
}

function closeSelf(){
    window.close();
}

function canCloseSelf(confirmMsg,bNotRefreshOpener){
    if(bPageModified==true){
        if(!confirm(confirmMsg)){
            return;
        }
    }

    var iNotRefresh=0;

    try{
        iNotRefresh=parseInt(bNotRefreshOpener);
    }catch(e){}

    if(iNotRefresh>0){
        closeSelf();
    }else{
        closeAndReloadOpener();
    }
}

function removeLastSharp(source){
    var dest=source;

    if(source.substr(source.length-1,1)=='#'){
        dest=source.substring(0,source.length-1);
    }

    return dest;
}

function closeAndReloadOpener(){
    try{
        window.close();

        window.opener.focus();
        window.opener.location=window.opener.location;
    }catch(e){}
}

function openNewWindow(pageUrl)
{
    //remove last sharp
    pageUrl=removeLastSharp(pageUrl);

    var style='menubar=no,location=no,directories=no,toolbar=no,statusbar=no,'
            +'scrollbars=yes,resizable=yes';

    var popwin=window.open(pageUrl,'_blank',style);

    popwin.focus();
}

function openNewSizeWindow(pageUrl,windowName,width,height,scrollbars)
{
    //remove last sharp
    pageUrl=removeLastSharp(pageUrl);
    var style="menubar=no,location=no,directories=no,toolbar=no,statusbar=no,resizable=no,"+getCenterWindowPos(width,height)+",scrollbars="+scrollbars;
    var popwin=window.open(pageUrl,windowName,style);
    if(popwin != null ){
        popwin.focus(); 
    }
    
    
}

function getCenterWindowPos(pWidth,pHeight){
    var width=parseInt(''+pWidth);
    var height=parseInt(''+pHeight);
    var top=parseInt((parent.screen.height*0.88-height)*0.5, 10);
    var left=parseInt((parent.screen.width*0.985-width)*0.5, 10);

    if(top<0){
        top=0;
    }

    if(left<0){
        left=0;
    }

    var posStatement="top="+top+",left="+left+",width="+width+",height="+height;
    return posStatement;
}

function openModalWindow(pageUrl,windowName,width,height)
{
    width = parseInt(width,10);
    height = parseInt(height,10);
    
    var style="dialogHeight: "+height+"px; dialogWidth: "+width+"px;  center: Yes; help: No; resizable: No; status: No;"; 
    var returnStr = window.showModalDialog(pageUrl,windowName,style);
    return returnStr;
}

function getURLParameter(paramName, defaultValue){
	if(defaultValue == 'undefined' || defaultValue == null){
		defaultValue = "";
	}
	
	var args = getURLParameters();
	var paramValue = args[paramName];
	if(paramValue == 'undefined' || paramValue == null || paramValue == ''){
        paramValue = defaultValue;
    }
    
    return paramValue;
}

function getURLParameters() {
     var args = new Object();
     var query = location.search.substring(1);      // Get query string
     var pairs = query.split("&");                  // Break at ampersand
     for(var i = 0; i < pairs.length; i++) {
         var pos = pairs[i].indexOf('=');           // Look for "name=value"
         if (pos == -1) continue;                   // If not found, skip
         var argname = pairs[i].substring(0,pos); // Extract the name
         var value = pairs[i].substring(pos+1);     // Extract the value
         value = decodeURIComponent(value);         // Decode it, if needed
         args[argname] = value;                     // Store as a property
     }
     return args;                                   // Return the object
}


function parseUrlParameter(parameter) {
    if (parameter.substring(0,1)=="?") {
        parameter=parameter.substring(1);
    }
    if (parameter.substring(parameter.length-1)=="#") {
        parameter=parameter.substring(0,parameter.length-1);
    }
    return parameter;
}

function ReplaceAllSubString(str,strOld,strNew){
    while (str.indexOf(strOld)>-1){
        str = str.replace(strOld,strNew);
    }
    return str;
}

function confirmDelete(message) {
    if (confirm(message)) return true;
    else return false;
}

function isFieldNotNull(objField , alertMsg){
    if (typeof(objField[0])=="object"){
        objField = objField[0];
    }

    if (typeof(objField)=="object"){
        if (objField.value.Trim()==""){
            
            if(alertMsg != ""){
                alert(alertMsg);
            }
            
            setFieldFocus(objField);
            return false;
        }else{
            return true;
        }
    }

    return false;
}


function isFieldIsMoney(objField , alertMsg){
    if (!isNumeric(objField.value)){
        alert(alertMsg);
        setFieldFocus(objField);
        return false;
    }else{
        return true;
    }
}

function isFieldIsInteger(objField , alertMsg){
    if (!isAmount(objField.value)){
        alert(alertMsg);
        setFieldFocus(objField);
        return false;
    }else{
        return true;
    }
}

function isAmount(s){
    if (s.Trim()=="") return false;
    if (s.Trim()!=s) return false;
    while (s.length > 1 && s.substring(0,1) == "0"){
        s = s.substr(1);
    }
    if (isNaN(s))   return false;
    if (parseInt(s).toString()!=s) return false;
    if (parseInt(s)<0)  return false;
    else    return true;
}

function isFieldIsAnyInteger(objField , alertMsg){
    if (!isInteger(objField.value)){
        alert(alertMsg);
        setFieldFocus(objField);
        return false;
    }else{
        return true;
    }
}

function isFieldIsDate(objField , alertMsg){
    if (CheckTimeTH(objField.value)==-1){
        alert(alertMsg);
        setFieldFocus(objField);
        return false;
    }else{
        return true;
    }
}

function isDate(str){
  var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
  var r = str.match(reg);

  if(r==null)return false;
  var d= new Date(r[1], r[3]-1,r[4]);
  var newStr=d.getFullYear()+r[2]+(d.getMonth()+1)+r[2]+d.getDate()
  return true;
}

function compareDate(beginDate, endDate){
  var d1 = new Date(beginDate.replace(/-/g, "/"));
  var d2 = new Date(endDate.replace(/-/g, "/"));
  if( (d1 - d2) >0 )
    return false;
  return true;
}


String.prototype.Trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

String.prototype.lenB=function(){
    return this.replace(/[^\x00-\xff]/g,"**").length;
}   


function setFieldFocus(objField) {
    try
    {
        objField.focus();
    }catch (e){}
}

function defaultFieldFocus(objFieldId) {

    try
    {
        var objField = document.getElementById(objFieldId);
        if (objField.className.indexOf("readonly") == -1){
            objField.focus();
        }
    } catch(e) {

    }
}

function defaultFieldFocusAndSelect(objFieldId) {
    try
    {
        var objField = document.getElementById(objFieldId);
        if (objField.className.indexOf("readonly") == -1){
            objField.focus();
            if(objField.type == "text" || objField.type == "textarea"){
                objField.select();
            }
        }
    } catch(e) {
    
    }
}

function openFullSizeWindow(pageUrl,scrollbars){
    
    var width=screen.availWidth;
    var height=screen.availHeight-35;

    var top=0;
    var left=0;

    var posStatement="top="+top+",left="+left+",width="+width+",height="+height;

    var style='menubar=no,location=no,directories=no,toolbar=no,statusbar=no,resizable=yes,'
        +posStatement+",scrollbars="+scrollbars;

    var popwin=window.open(pageUrl,'_blank',style);
    if(popwin == null){
        return false;
    }
    try{
        popwin.moveTo(0,0);
        popwin.resizeTo(screen.availWidth,screen.availHeight);
        popwin.focus();
    }
    catch(e)
    {}

}

function showWaitingMessage(){
    var waitingMsgStyle = '<style>#waiting{color:#ffffff; FONT-SIZE: 12px; background-color:#8f0101; width:130px;} </style>';
    var waitingMsgDiv = '<div id="waiting" >正在加载，请稍候...</div>';
    document.write(waitingMsgStyle + waitingMsgDiv);
    obj = document.getElementById("waiting");
    if (obj != null){
        obj.style.display = "block";
    }
}
function hideWaitingMessage(){
    obj = document.getElementById("waiting");
    if (obj != null){
        obj.style.display = "none";
    }
}

function moveUp(selectFieldId){
  var selectElement = document.getElementById(selectFieldId);
  var intIndex = selectElement.selectedIndex;
   
  if (intIndex>0){
    var temText = selectElement.options[intIndex-1].text;
    var temValue = selectElement.options[intIndex-1].value;
    
    selectElement.options[intIndex-1].text = selectElement.options[intIndex].text;
    selectElement.options[intIndex-1].value = selectElement.options[intIndex].value;
    
    selectElement.options[intIndex].text = temText;
    selectElement.options[intIndex].value = temValue ;
    
    selectElement.options[intIndex-1].selected = true;
    selectElement.options[intIndex].selected = false;
  }
}

function moveDown(selectFieldId){

  var selectElement = document.getElementById(selectFieldId);
  var intIndex = selectElement.selectedIndex ; 

  if (selectElement.options.length>1 && intIndex<selectElement.options.length-1 && intIndex>=0){
    var temText = selectElement.options[intIndex+1].text;
    var temValue = selectElement.options[intIndex+1].value;
    
    selectElement.options[intIndex+1].text = selectElement.options[intIndex].text;
    selectElement.options[intIndex+1].value = selectElement.options[intIndex].value;
    
    selectElement.options[intIndex].text = temText    
    selectElement.options[intIndex].value = temValue;
    
    selectElement.options[intIndex+1].selected = true;
    selectElement.options[intIndex].selected = false;
  }
}

function addItemToOptions(addItemFieldId, selectFieldId){
    var addValue = $F(addItemFieldId).Trim();
    var selectElement = document.getElementById(selectFieldId);
    
    if (addValue == ""){
        alert("新增加值不能为空！");
        return false;
    }
    
    for(var i=0; i<selectElement.options.length; i++){
        if(selectElement.options[i].text == addValue){
            alert("已经存在［"+addValue+"］，请重新输入！");
            return false;
            break;
        }
    }
    
    selectElement.options[selectElement.options.length] = new Option(addValue,addValue);
    document.getElementById(addItemFieldId).value="";
}

function addItemToOptionsByValue(addItemFieldId, addItemValueFieldId, selectFieldId){
    var addText = $F(addItemFieldId).Trim();
    var addValue = $F(addItemValueFieldId).Trim();
    var selectElement = document.getElementById(selectFieldId);
    
    if (addText == ""){
        alert("新增加的名称不能为空！");
        return false;
    }
    
    for(var i=0; i<selectElement.options.length; i++){
        if(selectElement.options[i].text == addText){
            alert("已经存在［"+addText+"］，请重新输入！");
            return false;
            break;
        }
    }
    
    selectElement.options[selectElement.options.length] = new Option(addText,addValue);
    document.getElementById(addItemFieldId).value="";
    document.getElementById(addItemValueFieldId).value="";
    defaultFieldFocus(addItemFieldId);
}

function addItemsToOptions(selectFieldId,itemsArr){
    var selectElement = document.getElementById(selectFieldId);
    for (var j=0; j<itemsArr.length; j++){
        if (itemsArr[j] != null && itemsArr[j] != ""){
            selectElement.options[selectElement.options.length] = new Option(itemsArr[j],itemsArr[j]);
        }
    }
}

function removeOption(selectFieldId){
    var selectElement = document.getElementById(selectFieldId);
    var intIndex = selectElement.selectedIndex ; 
    if(intIndex != -1 ){
        selectElement.options.remove(selectElement.selectedIndex);
    }
}

function removeAllOption(destinationBoxName){
    var selectElement = document.getElementById(destinationBoxName);
    var totalOptions = selectElement.options.length;
    for(var i=0; i<totalOptions; i++){
        selectElement.options.remove(0);
    }
}

function addSelectedOption(sourceBoxName, destinationBoxName ){
    var sourceBox = document.forms[0].elements[sourceBoxName];
    var destinationBox = document.forms[0].elements[destinationBoxName];
    if (sourceBox.selectedIndex != -1) {
        for (i = 0; i < sourceBox.options.length; i++) {
            if (sourceBox.options[i].selected) {
                destinationBox.options[destinationBox.options.length] = new Option(
                        sourceBox.options[i].text, sourceBox.options[i].value);
            }
        }
    }
    
    distinctBox(destinationBoxName);
}

function addAllOption(sourceBoxName, destinationBoxName ){
    var n = $Id(sourceBoxName).options.length;

    for (i = 0; i < n; i++) {
        $Id(destinationBoxName).options
                [$Id(destinationBoxName).options.length] = new Option($Id(sourceBoxName).options[i].text, $Id(sourceBoxName).options[i]
                .value);
    }

    distinctBox(destinationBoxName);
}
function getAllOptionText(listBoxId, separator){
    var optionTexts="";
    var selectElement = document.getElementById(listBoxId);
    var totalOptions = selectElement.options.length;
    for(var i=0; i<totalOptions; i++){
        optionTexts = uniteTwoStringBySemicolon(optionTexts, selectElement.options[i].text, separator);
    }
    return optionTexts ;
}
function moveSelectedOption(destinationBoxName){
    var i;
    var j;
    var n;

    j = document.forms[0].elements[destinationBoxName].options.length - 1;

    if (j < 0) {
        j = 0;
    }

    var arrId   = new Array(j);
    var arrName = new Array(j);

    j = 0;

    for (i = 0; i < document.forms[0].elements[destinationBoxName].options.length; i++) {
        if (document.forms[0].elements[destinationBoxName].options[i].selected == false) {
            arrId[j] = document.forms[0].elements[destinationBoxName].options[i].value;
            arrName[j] = document.forms[0].elements[destinationBoxName].options[i].text;
            j++;
        }
    }

    n = document.forms[0].elements[destinationBoxName].options.length;

    for (i = n; i >= 0; i--) {
        document.forms[0].elements[destinationBoxName].options[i] = null;
    }

    for (i = 0; i < j; i++) {
        document.forms[0].elements[destinationBoxName].options[i] = new Option(arrName[i], arrId[i]);
    }

}

function distinctBox(boxName) {
    var boxObj    = $Id(boxName);
    var boxLength = boxObj.options.length;

    if (boxLength <= 1) {
        return;
    }

    var arrId   = new Array();
    var arrName = new Array();
    var i;
    var j;
    var bFound;

    for (i = 0; i < boxLength; i++) {
        var curId   = boxObj.options[i].value;
        var curName = boxObj.options[i].text;

        bFound = false;

        for (j = 0; j < arrId.length; j++) {
            if (arrId[j] == curId) {
                bFound = true;

                break;
            }
        }

        if (!bFound) {
            arrId.push(curId);
            arrName.push(curName);
        }
    }

    //refill box
    boxObj.options.length = 0;

    for (i = 0; i < arrId.length; i++) {
        boxObj.options[i] = new Option(arrName[i], arrId[i]);
    }
}

function modifyListBoxItem(modifyFieldId, selectFieldId,operateType){
    var selectElement = document.getElementById(selectFieldId);
    var intIndex = selectElement.selectedIndex ; 
    
    var modifyInput = document.getElementById(modifyFieldId);
    if(intIndex == -1 ){
        alert("请选择要修改的值！");
        return false;
    }
    if(operateType == "apply"){
        modifyInput.value = selectElement.options[intIndex].text;
    } else if(operateType == "confirm"){
        if(modifyInput.value.Trim()==""){
            alert("请输入修改内容！");
            return false;
        }
        selectElement.options[intIndex].text = modifyInput.value;
        selectElement.options[intIndex].value = modifyInput.value;
        modifyInput.value = "";
    }
    
}

function modifyListBoxItemByValue(modifyFieldId, modifyValueFieldId, selectFieldId,operateType){
    var selectElement = document.getElementById(selectFieldId);
    var intIndex = selectElement.selectedIndex ; 
    
    if(intIndex == -1 ){
        alert("请选择要修改的值！");
        return false;
    }
    
    var modifyInput = document.getElementById(modifyFieldId);
    var modifyValueInput = document.getElementById(modifyValueFieldId);
    
    if(operateType == "apply"){
        modifyInput.value = selectElement.options[intIndex].text;
        modifyValueInput.value = selectElement.options[intIndex].value;
    } else if(operateType == "confirm"){
        if(modifyInput.value.Trim()==""){
            alert("请输入修改名称！");
            return false;
        }
        selectElement.options[intIndex].text = modifyInput.value;
        selectElement.options[intIndex].value = modifyValueInput.value;
        modifyInput.value = "";
        modifyValueInput.value = "";
    }
    
}

function getSelectedItemIds(CheckBoxName,separator) {
   var ids = "";
   var element = document.getElementsByName(CheckBoxName);
  
   for (var i = 0; i < element.length; i++) {
      if (element[i].checked && element[i].type == "checkbox" ) {
        ids = uniteTwoStringBySemicolon(ids, element[i].value, separator);
      }
   }
   return ids;
}
function isSelectedOnlyOne(msg, chkName){
    var selAmount = getSelectedItemAmount(chkName);
    if(selAmount == 0 ){
        alert("请选择要修改的"+msg+"！");
        return false;
    }
    if(selAmount > 1 ){
        alert("只能选择一个"+msg+"！");
        return false;
    }
    return true;
}

function getSelectedTreeNodeId(msg, selectedField){
    var id = document.getElementById(selectedField).value.Trim(); 
    if(id.Trim()==""){
        alert(msg);
        return "";
    }
    return id;
}

function inputOnkeyDownEvent(btnId) {
    try{
        if (event.keyCode == 13) {
            document.getElementById(btnId).onclick();
            return false;
        }
    }catch(e){
        return false;
    }
    return true;
}

function isSelectedItem(item, items , sparator){

    if(items.Trim() == "") return false;
    
    if( typeof(sparator) == "undefined"){
        sparator = ";";
    }
    var itemsArray = items.split(sparator);
    
    if( typeof(itemsArray) == "undefined" || typeof(itemsArray.length) == "undefined" ){
        return  false;
    }
    
    for(var i=0; i<itemsArray.length; i++){
        if(item.Trim() == itemsArray[i].Trim()){
            return true;
            break;
        }
    }
    return false;
}

function showDisable(obj){
    if(obj.className == "readonly"){
        obj.disabled = true;
    }
}
function selectAllCheckBox(chkBoxName,selfobj){
    var obj = document.getElementsByName(chkBoxName);
    if(typeof(obj) != "undefined" ){
        if(typeof(obj.length) == "undefined")
            obj.checked = selfobj.checked;
        for(var i=0; i < obj.length; i++) {
                obj[i].checked = selfobj.checked;
        }
    }
    
}

function opinionChecked(){
        var arr =  new Array();
        var i;
        arr = document.getElementsByTagName("textarea");
        for (i=0;i<arr.length;i++){
        	if(arr[i].name.indexOf('Opinion') != -1){
        		if(arr[i].value==""){
        			alert("意见不能为空！");
        			return true;
        		}
        	}
        }
        return false;
}

function setFieldsReadOnly(buttonField){
    if (buttonField == null){
        var arr =  new Array();
        var i;
        arr = document.getElementsByTagName("textarea");
        for (i=0;i<arr.length;i++){
            arr[i].readOnly = true;
            arr[i].className=arr[i].className + " readonly";
        }
        
        arr = document.getElementsByTagName("input");
        for (i=0;i<arr.length;i++){
            if (arr[i].type =="text"){
                arr[i].readOnly = true;
                arr[i].className=arr[i].className + " readonly";
            }else if( arr[i].type == "radio" || arr[i].type == "checkbox" ){
            	arr[i].disabled=true;
            }
        }
        
        arr = document.getElementsByTagName("select");
        for (i=0;i<arr.length;i++){
            arr[i].readOnly = true;
            arr[i].disabled = true;
            arr[i].className= arr[i].className + " readonly";
        }
        
    }
}

function $Id(elemId){return document.getElementById(elemId);}

function removeStartAndEndCharacter(fildIdArr){
    if(typeof(fildIdArr) != "undefined" ){
        for(var i=0; i<fildIdArr.length; i++ ){
            removeStartAndEndToken(fildIdArr[i]);
        }
    }
}

function removeStartAndEndToken(fildId){
        var start_end_str = ";";
        var obj = $Id(fildId);      
        if(typeof(obj) != "undefined" ){
            var str = obj.value.Trim();
            if(str.indexOf(start_end_str) == 0){
                str = str.substr(1) ;
            }
            if(str.lastIndexOf(start_end_str) == str.length-1){
                str = str.substring(0, str.length-1);
            }
            obj.value = str;
        }
}

function initHtmlEditor(webRoot, contentFieldId)
{   
    var sBasePath = webRoot+"/fckeditor/" ;
    var oFCKeditor = new FCKeditor( contentFieldId ) ;
        
    oFCKeditor.Height="100%";
    oFCKeditor.BasePath = sBasePath ;
    oFCKeditor.ReplaceTextarea() ;
}

function createWaiting(){
    var waitingMsgStyle = "#loading_container{height:40px;width:300px;position:absolute;left:50%;top:50%;margin-top:-20px;margin-left:-150px;background-color:#ffffff;background-image:url(../images/loading_backimage.jpg);background-position:0px 32px;background-repeat:no-repeat;padding-left:3px;color:#666666;}";
    var waitingMsgDiv = "<img class='loadingimage' src='images/loading.gif' width='31' height='31'>正在提交表单，请稍候！";

    
    var styleText = document.createTextNode(waitingMsgStyle);
    var styleObj = document.createElement("style");
    styleObj.innerHTML = "waitingMsgStyle";
    
    var divText = document.createTextNode(waitingMsgDiv);
    var divObj = document.createElement("div");
    divObj.id = "loading_container";
    
    styleObj.insertBefore(divText, null);
    
    
}

//屏蔽鼠标右键开始
if (navigator.appName == "Netscape"){
  document.captureEvents(Event.MOUSEUP | Event.KEYDOWN); 
}
function reloadSelf(){
    location.reload();
}
function cancelData() {
    self.returnValue = null;
    self.close();
}

function trimFieldValue(fieldId){
    try{
        var fieldObj = document.getElementById(fieldId);
        fieldObj.value = fieldObj.value.Trim();
    } catch(e) {
    } 
}

function chekSelectItems(fieldId, msg){
    if (getItemTotalAmount(fieldId) == 0) {
        alert(msg);
        return false;
    }
    return true;
}
function moveScrollParent() {       
    document.body.scrollTop = document.body.scrollTop + document.body.scrollHeight;
}

/*
function nocontextmenu() 
{
 event.cancelBubble = true
 event.returnValue = false;
 
 return false;
}
 
function norightclick(e) 
{
 if (window.Event) 
 {
  if (e.which == 2 || e.which == 3)
   return false;
 }
 else
  if (event.button == 2 || event.button == 3)
  {
   event.cancelBubble = true
   event.returnValue = false;
   return false;
  }
 
}
 
document.oncontextmenu = nocontextmenu;  // for IE5+
document.onmousedown = norightclick;  // for all others
*/
document.onkeydown = keyOnclick; // IE



//屏蔽鼠标右键结束



function suckerfish(type, tag, parentId) {    
    if (window.attachEvent) {
        window.attachEvent("onload", 
            function() {    
                var sfEls = (parentId==null)?document.getElementsByTagName(tag):document.getElementById(parentId).getElementsByTagName(tag);    
                type(sfEls);    
            }
        );    
    }    
}    
sfFocus = function(sfEls) {    
    for (var i=0; i<sfEls.length; i++) {

        if( !(sfEls[i].form != null && (sfEls[i].id == "topSearchInput" || sfEls[i].id == "noteContent" || sfEls[i].id == "otherCostPercent" || sfEls[i].id == "planGainPercent" || sfEls[i].id == "constructionFeeInput" ||(sfEls[i].form.name == "contractForm" && sfEls[i].id == "startDate") || (sfEls[i].form.name == "contractForm" && sfEls[i].id == "expireDate") || (sfEls[i].form.name == "accountReceivableForm" && sfEls[i].id == "receivableDate") || (sfEls[i].form.name == "accountReceivableForm" && sfEls[i].id == "gatherDate") || (sfEls[i].form.name == "marketForm" && sfEls[i].id == "expectEndDate")|| (sfEls[i].form.name == "customerForm" && sfEls[i].id == "birthday")||  (sfEls[i].form.name == "yiSalesBillForm" && sfEls[i].id == "saleDate") ||  (sfEls[i].form.name == "yiSalesBillForm" && sfEls[i].id == "receivableDate") || (sfEls[i].form.name == "advertContractForm" && sfEls[i].id == "startDate") || (sfEls[i].form.name == "advertContractForm" && sfEls[i].id == "expireDate") || (sfEls[i].form.name == "advertAccountReceivableForm" && sfEls[i].id == "receivableDate") || (sfEls[i].form.name == "advertAccountReceivableForm" && sfEls[i].id == "gatherDate") || (sfEls[i].form.name == "advertForm" && sfEls[i].id == "advertDate") || (sfEls[i].form.name == "advertForm" && sfEls[i].id == "receivableDate") || (sfEls[i].form.name == "advertForm" && sfEls[i].id == "draftDate") || (sfEls[i].form.name == "receptionForm" && sfEls[i].id == "advertDate") || (sfEls[i].form.name == "receptionForm" && sfEls[i].id == "acceptDate") || (sfEls[i].form.name == "appearnewsForm" && sfEls[i].id == "advertDate") || (sfEls[i].form.name == "appearnewsForm" && sfEls[i].id == "receivableDate") || sfEls[i].form.name == "projectMaterialPurchaseForm" ||sfEls[i].form.name == "projectMaterialForm" || (sfEls[i].form.name == "yiPersonalCustomerForm" && sfEls[i].id == "homeAddress") || (sfEls[i].form.name == "vehicleApplicationForm" && sfEls[i].id == "licensePlate") || (sfEls[i].form.name == "paymentForm" && sfEls[i].id == "payDate") || (sfEls[i].form.name == "paymentForm" && sfEls[i].id == "gatherDate")|| (sfEls[i].id == "contractMoney"||sfEls[i].id == "managementFeesRate"||sfEls[i].id == "advance"||sfEls[i].id == "progressMoneyTotal")||isExceptionEle(sfEls[i].id)) ) ){
            sfEls[i].onfocus=function() { 
                if(this.readOnly == false && (this.type=="text" || this.type == "textarea" || this.type=="password")){
                    this.className+=" form_textfieldonfocus";
                }
            }
            
            sfEls[i].onblur=function() {
                if(this.id != "topSearchInput"){
                    this.className=this.className.replace(new RegExp(" form_textfieldonfocus\\b"), "");
                }
            }
        }   
    }    
} 

Array.prototype.contains=function(value)
{
    for(var i =0;i<this.length;i++)
    {
        if(arguments.length==1){
        if(this[i].toString()==value)return true;}
        else
        {
            for(var j =1;j<arguments.length;j++)
            {
                if(this[i][arguments[j]]==value)return true;
            }
        }
    }
    return false;
}

Array.prototype.indexof=function(value){
	if(StringUtils.isBlank(value)){
		return -1;	
	}
	 for(var i =0;i<this.length;i++)
    {
        if(this[i].toString()==value)return i;
    }
    return -1;
}

Array.prototype.containsArray = function(arr)
{
    for(var i =0;i<this.length;i++)
    {
    	var cv = this[i];
    	if(arr.contains(cv)){
    		return true;
    	}
    }
    return false;
}

function isExceptionEle(id){
	var idArray = ['qualityAssuranceMoney','balanceMoney'];
	var idExpArray = [/^invoiceMoney_/,/^constructionPermitMoney_/,/^money_/,/^payment_/];
	if(idArray.contains(id)){
		return true;
	}
	for(var i=0;i<idExpArray.length;i++){
		if(idExpArray[i].test(id)){
			return true;
		}
	}
	return false ;
}
   
function setATagHidFocus(){
    var aTags = document.getElementsByTagName("a");
    if( aTags != null || typeof(aTags) == "undefined" || typeof(aTags.length) == "undefined" ){
        for(var i=0; i<aTags.length; i++){
            aTags[i].hideFocus = true;
        }
    }
}
suckerfish(sfFocus, "INPUT");    
suckerfish(sfFocus, "TEXTAREA");

// 创建form表单中的对象
function createFormElement(type, name) {   
   var element = null;   
  
   try {   
      // First try the IE way; if this fails then use the standard way   
      element = document.createElement('<'+type+' name="'+name+'">');   
   } catch (e) {   
      // Probably failed because we’re not running on IE   
   }   
   if (!element) {   
      element = document.createElement(type);   
      element.name = name;   
   }   
   return element;
}

function createInputElement(id, type, value){
    var inputObj = createFormElement("input", id);
    if (inputObj != null){
        inputObj.type = type;
        inputObj.id = id;
        inputObj.value = value;
        inputObj.style.width="90%";
        inputObj.style.height="20px";
    }
    return inputObj;
}

function createReadOnlyInputElement(id, type, value){
    var inputObj = createFormElement("input", id);
    if (inputObj != null){
        inputObj.type = type;
        inputObj.id = id;
        inputObj.className="readonly";
        inputObj.value = value;
        inputObj.style.width="90%";
        inputObj.style.height="20px";
    }
    return inputObj;
}

function escapeSpecialChar(string){
    if(string) {
        return string.replace('<', '&lt;').replace('>', '&gt;');
    }
    else {
        return "";
    }
}

function createDisplayTextNode(textStr){
     textStr = getDefaultString(textStr, "");
     text = document.createTextNode(textStr);
     return text;
}

function getDefaultString(textStr, defaultString){
    if(textStr == null || textStr == "null"){
        textStr = defaultString;
    }
    return textStr;
}

function isBlank(string){
    return string.replace(/(^\s*)(\s*$)/g, "");  
 }
 
 function addSelectedOptionByOne(sourceBoxName, destinationBoxName){
    var items = $Id(destinationBoxName).length;
    if(items == 0){
        addSelectedOption(sourceBoxName, destinationBoxName);
    }else {
        alert("只能添加一个");
        return false;
    }
}

// 拦截聚焦后的聚焦事件
function feildOnFocus(selfObj){
    var focusCssName = selfObj.className;
    var selfObjType = selfObj.type;
    if((selfObjType=="text" || selfObjType=="textarea")&& focusCssName.indexOf('form_textfieldonfocus') == -1){
        selfObj.className +=' form_textfieldonfocus';
        selfObj.select();
    }
}

// 拦截聚焦后的离开事件
function reconvertFieldCss(obj){
    obj.className=obj.className.replace(new RegExp(" form_textfieldonfocus\\b"), "");
    obj.value = obj.value;
}

// 初始化select
function selectInObj(selectObj,sVal){
    if(selectObj != null){
        for(i=0;i<selectObj.options.length;i++){
            if ( selectObj.options[i].text == sVal ) {
                selectObj.options[i].selected = true;
                break;
            }
        }
    }
}

//将destination中用分隔符分开的字符串不重复的在source中移除，
function destinationAddToSourceAndRetrunString(source, destination , seperator){
    if(typeof(seperator) == "undefined" || seperator == "")
        seperator = ",";
    if(typeof(source) == "undefined" || source == "")
        return destination;
    if(typeof(destination) == "undefined" || destination == "")
        return source;
                
    var sourceArr = source.split(seperator);
    var destinationArr = destination.split(seperator);
    for(var i = 0; i<destinationArr.length; i++){
        var  isRepeat = true;
        for(var j = 0; j<sourceArr.length; j++){
            if(destinationArr[i] == sourceArr[j]){
                isRepeat = false ;
                break;
            }
        }
        if(isRepeat)
            source += seperator + destinationArr[i]
    }
    return source;
}

//将destination中用分隔符分开的字符串不重复的添加到source中去，
function sourceMinusToDestinationAndRetrunString(source, destination , seperator){
    if(typeof(seperator) == "undefined" || seperator == "")
        seperator = ",";
    if(typeof(source) == "undefined" || source == "")
        return source;
    if(typeof(destination) == "undefined" || destination == "")
        return source;
        
    var returnArr = new Array();
    var sourceArr = source.split(seperator);
    var destinationArr = destination.split(seperator);
    for(var i = 0; i<sourceArr.length; i++){
        var  isEquales = true;
        for(var j = 0; j<destinationArr.length; j++){
            if(destinationArr[j] == sourceArr[i]){
                isEquales = false ;
            }
        }
        if(isEquales){
            returnArr.push(sourceArr[i]);
        }
    }
    return returnArr.join(seperator);
}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
   var arVersion = navigator.appVersion.split("MSIE")
   var version = parseFloat(arVersion[1])
   if ((version >= 5.5) && (document.body.filters)) 
   {
      for(var j=0; j<document.images.length; j++)
      {
         var img = document.images[j]
         var imgName = img.src.toUpperCase()
         if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
         {
            var imgID = (img.id) ? "id='" + img.id + "' " : ""
            var imgClass = (img.className) ? "class='" + img.className + "' " : ""
            var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
            var imgStyle = "display:inline-block;" + img.style.cssText 
            if (img.align == "left") imgStyle = "float:left;" + imgStyle
            if (img.align == "right") imgStyle = "float:right;" + imgStyle
            if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
            var strNewHTML = "<span " + imgID + imgClass + imgTitle
            + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
            + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
            + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" 
            img.outerHTML = strNewHTML
            j = j-1
         }
      }
   }    
}


//--------------------------随机字符-------------------------- 
//str_0 长度 
//str_1 是否大写字母 
//str_2 是否小写字母 
//str_3 是否数字 
function randomStr(str_0,str_1,str_2,str_3){ 
	var seed_array=new Array(); 
	var seedary; 
	var i; 
	
	seed_array[0]="";
	seed_array[1]= "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"; 
	seed_array[2]= "a b c d e f g h i j k l m n o p q r s t u v w x y z"; 
	seed_array[3]= "0 1 2 3 4 5 6 7 8 9"; 
	
	if (!str_1&&!str_2&&!str_3){str_1=true;str_2=true;str_3=true;} 
	
	if (str_1){seed_array[0]+=seed_array[1];} 
	if (str_2){seed_array[0]+=" "+seed_array[2];} 
	if (str_3){seed_array[0]+=" "+seed_array[3];} 
	
	seed_array[0]= seed_array[0].split(" "); 
	seedary="" 
	for (i=0;i<str_0;i++){ 
	   seedary+=seed_array[0][Math.round(Math.random( )*(seed_array[0].length-1))] 
	}
	return(seedary); 
} 

function displayElement(idArray,displayOrHidden){
	for(var i=0;i<idArray.length;i++){
		var currentElement = $Id(idArray[i]);
		if(displayOrHidden){
			currentElement.style.display = "inline";
		}else {
			currentElement.style.display = "none";
		}
	}
}

function setSelectByValue(){
	var factArgumentsLength = arguments.length;
    if(!factArgumentsLength>0){
    	return ;
    }
    for(var i=0;i<factArgumentsLength;i++){
    	var currentSelectId = arguments[i][0];
    	var currentValue = arguments[i][1];
    	var currentSelect = $Id(currentSelectId);
    	for(var j=0;j<currentSelect.options.length;j++){
    		if(currentValue==currentSelect.options[j].value){
    			currentSelect.options[j].selected=true;
    			break;
    		}
    	}
    }
}

function setSelectByText(){
	var factArgumentsLength = arguments.length;
    if(!factArgumentsLength>0){
    	return ;
    }
    for(var i=0;i<factArgumentsLength;i++){
    	var currentSelectId = arguments[i][0];
    	var currentText = arguments[i][1];
    	var currentSelect = $Id(currentSelectId);
    	for(var j=0;j<currentSelect.options.length;j++){
    		if(currentText==currentSelect.options[j].text){
    			currentSelect.options[j].selected=true;
    			break;
    		}
    	}
    }
}

function openSelectTime(ctx,elementId,width,height){
	if(width==null){
		width = 230;
	}
	if(height==null){
		height = 120
	}
	var selectedTime = openModalWindow(ctx+"/common/selTime.jsp?noSecond=true","选择时间",width,height);
	if(selectedTime!=null){
		$Id(elementId).value = selectedTime;
		}
}

String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length){
		return false;
	}
	if(this.substr(0,str.length)==str){
		return true;
	}else {
		return false;
	}
	return true;
}

function setElementStyle(elementToSet,styleObj){
  		for(styleName in styleObj ){
  			elementToSet.style[styleName] = styleObj[styleName];
  		}
  	}
  	
//创建DOM对象。参数标签名。属性对象，格式为{proName:proValue[,proName:proValue]}。样式对象，格式为{styleName:value[,styleName:value]}
function createCommonElement(tagName,proObj,styleObj){
    if(tagName==null){
    	return null;
    }
	var commonElement = document.createElement(tagName);
	if(proObj!=null){
		for(proName in proObj){
			commonElement[proName] = proObj[proName];
		}
	}
	if(styleObj!=null){
		for(styleName in styleObj ){
  			commonElement.style[styleName] = styleObj[styleName];
  		}
	}
	return commonElement;
}

function setElementProperty(elementToSet,proObj){
	for(proName in proObj ){
  			elementToSet[proName] = proObj[proName];
  		}
}

function createSelectElementByNumber(numberMin,numberMax,proObj,styleObj){
	var selectElement = document.createElement('select');
	for(var i=parseInt(numberMin);i<=numberMax;i++){
		var value = i+'';
		var newOption = document.createElement('option');
		var textNode = document.createTextNode(value);
		newOption.value = value;
		newOption.appendChild(textNode);
		selectElement.appendChild(newOption);
	}
	if(proObj!=null){
		setElementProperty(selectElement,proObj);
	}
	
	if(styleObj!=null){
		setElementStyle(selectElement,styleObj);
	}
	return selectElement;
}

function transform(value){
	var num;
	var dig;
	if(value.indexOf(".") == -1){num = value;dig = "";}
		else{
			num = value.substr(0,value.indexOf("."));dig = value.substr( value.indexOf(".")+1, value.length);
		}
	var i=1;
	var len = num.length;
	var dw2 = new Array("","万","亿");
	var dw1 = new Array("拾","佰","千");
	var dw = new Array("","壹","贰","叁","肆","伍","陆","柒","捌","玖");
	var dws = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖");
	var k1=0;
	var k2=0;
	var str="";
	for(i=1;i<=len;i++){
		var n = num.charAt(len-i);
		if(n=="0"){
			if(k1!=0)
			str = str.substr( 1, str.length-1);
				}
	str = dw[Number(n)].concat(str);
	if(len-i-1>=0){ 
		if(k1!=3){
			str = dw1[k1].concat(str);
			k1++;}
		else{
			k1=0;
			var temp = str.charAt(0);
			if(temp=="万" || temp=="亿") str = str.substr( 1, str.length-1);
			str = dw2[k2].concat(str);}
			   };
			if(k1==3){k2++;}
			};
	var strdig="";
	for(i=0;i<2;i++){
	var n=dig.charAt(i);
	strdig+=dws[Number(n)];}
	if(strdig!='零零')str += " 点 "+strdig;
	return str;
	}
	
function StringUtils(){
}

StringUtils.isNotBlank = function (stringValue){
	if(stringValue!=null&&((stringValue+'').Trim()!='')){
		return true;
	}
	return false;
}

StringUtils.isBlank = function (stringValue){
	if(stringValue!=null&&((stringValue+'').Trim()!='')){
		return false;
	}
	return true;
}

StringUtils.defaultIfEmpty = function (str, defaultStr){
	if(StringUtils.isBlank(str)){
		return defaultStr;
	}
	return str;
}

String.prototype.startWith = function (str){
	if(StringUtils.isBlank(str)){
		return true;
	}
	if(this.indexOf(str)==0){
		return true;
	}
	return false;
}

Date.getDateByString = function (dateStr){
	if(StringUtils.isBlank(dateStr)){
		return null;
	}
	dateStr +=''; 
	var year = dateStr.substring(0,4);
	var month = dateStr.substring(5,7);
	var day = dateStr.substring(8,10);
	if(month.startWith('0')){
		month = month.substring(1,2);
	}
	if(day.startWith('0')){
		day = day.substring(1,2);
	}
	month = parseInt(month)-1;
	var dateObj = new Date(year,month,day);
	return dateObj;
}

Date.prototype.toCommonStr = function (){
	var returnStr = '';
	var year = this.getFullYear();
	var month = this.getMonth();
	var day = this.getDate();
	month = parseInt(month)+1;
	if(parseInt(month)<10){
		month = '0'+month;
	}
	if(parseInt(day)<10){
		day = '0'+day;
	}
	returnStr = year+'-'+month+'-'+day;
	return returnStr;
}

Date.prototype.addMonth = function (m){
	if(StringUtils.isBlank(m)){
		return ;
	}
	this.setMonth(this.getMonth()+parseInt(m));
}

function getFlowViewTitleByProcessStatus(processStatus){
	var tableTile = "";
	if(!processStatus || processStatus == 'auditing'){
        tableTile = "审批中";
    } else if(processStatus == 'passed'){
        tableTile = "已批准";
    } else if(processStatus=='denied'){
        tableTile = "已否决";
    } else if (processStatus =='ended'){
        tableTile = "已结束";
    } else if (processStatus == 'onGoing'){
    	tableTile = "进行中";
    } else if(processStatus == 'all'){
    	tableTile = "全部列表";
    }
        
    return tableTile;
}

var CookieManager = new Object();
CookieManager.getCookie = function (cookieName){
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) {
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
}

function viewObject(o){
	if(o!=null){
		var alertStr = '';
		for(var pn in o){
			alertStr+='\n'+pn+' = '+o[pn];
		}
		alert(alertStr);
	}
}

function openSelectWorkTime(ctx,elementId,width,height){
	if(width==null){
		width = 230;
	}
	if(height==null){
		height = 120
	}
	var selectedTime = openModalWindow(ctx+"/common/selWorkTime.jsp?noSecond=true","选择时间",width,height);
	if(selectedTime!=null){
		$Id(elementId).value = selectedTime;
		}
}

function autoSaveFormSerialNumber(fileName,formName)
{
	formSerialNumber=fileName.value.Trim();

	EAMSerialNumberManager.saveFormSerialNumber(formName,formSerialNumber);
}

function formatExtFieldMoney(f){
	var v  = f.getValue();
	if(StringUtils.isNotBlank(v)){
		alert(v)
		v= formatMoneyByComma(v);
		alert(v)
		f.setValue(v);
	}
	
}

//Ext 屏蔽引号，逗号，句号等特殊符号
function screenSpecialKeyByExt(key, fieldId) {
	if(key.getKey() == 222 || key.getKey() == 190 || key.getKey() == 188 || key.getKey() == 192 || key.getKey() == 186 || key.getKey() == 220 || key.getKey() == 191 || key.getKey() == 219 || key.getKey() == 221){
		var nameText = Ext.getCmp(fieldId).getValue();
		nameText = nameText.substring(0, nameText.length-1);
		Ext.getCmp(fieldId).setValue(nameText);
	}
}

//普通页面  屏蔽引号，逗号，句号等特殊符号
function screenSpecialKey() {
	try{
		var keyNum = event.keyCode;
        if (keyNum == 222 || keyNum == 190 || keyNum == 188 || keyNum == 192 || keyNum == 186 || keyNum == 220 || keyNum == 191 || keyNum == 219 || keyNum == 221) {
            return false;
        }
    }catch(e){
        return false;
    }
    return true;
}

//获取一个cookies的值
function getCookie(cookie_name){   
	var allcookies = document.cookie;   
	var cookie_pos = allcookies.indexOf(cookie_name);   
	// 如果找到了索引，就代表cookie存在，    
	// 反之，就说明不存在。   
	if (cookie_pos != -1){   
	    // 把cookie_pos放在值的开始，只要给值加1即可。   
	    cookie_pos += cookie_name.length + 1;   
	    var cookie_end = allcookies.indexOf(";", cookie_pos);   
	    if (cookie_end == -1){  
	        cookie_end = allcookies.length;    
	    }
	    var value = unescape(allcookies.substring(cookie_pos, cookie_end));  
	    return value;
	}   
    return null;    
}  

//写并保存cookies
function setCookie(c_name,value,expiredays){
    //document.cookie = c_name+ "=" + escape(value);
    var Days = expiredays ? expiredays : 60;   //cookie 将被保存两个月
    var exp  = new Date();  //获得当前时间
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒
    //document.cookie = c_name+ "=" +escape(value)+ ";expires="+expiredays;
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function iframeLoad(iframeId,loadUrl){
    $Id(iframeId).src = loadUrl;
}
function getQueryString(name)
{
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return RegExp.$2.replace(/\+/g, " "); return "";
}

function addZero(str){
    if(str<10){
        return "0"+str;
    }else{
        return str;
    }
}

function myDateFormat(v, p, record){
	if(v == null){
		return "";
	} else {
		return (parseInt(v.year) + 1900)+ "-" +addZero(parseInt(v.month,10) + 1) + "-" + addZero(v.date);
	}
}

function myDateFormatBySecond(v, p, record){
	if(v == null){
		return "";
	} else {
		return (parseInt(v.year,10)+1900)+"-"+addZero(parseInt(v.month,10)+1)+"-"+addZero(v.date)+" "+addZero(v.hours)+":"+addZero(v.minutes)+":"+addZero(v.seconds);
	}
}

function myDateFormatByMinute(v, p, record){
	if(v == null){
		return "";
	} else {
		return (parseInt(v.year,10)+1900)+"-"+addZero(parseInt(v.month,10)+1)+"-"+addZero(v.date)+" "+addZero(v.hours)+":"+addZero(v.minutes);
	}
}

function showResult(msg) {
	MsgTip.msg('提示',msg,true,3);
}

/**
 * 用于绑定grid视图某列的onclick事件，则会触发modify函数调用，并传入当前列的值以及record.data对象
 * 页面中需要定义 modify(v,data) 函数
 */
function modifyRecord(v, p, record){
	var dataArrStr= Ext.util.JSON.encode(record.data);
	dataArrStr=dataArrStr.replace(/\"/g,"'");//替换半角双引号为单引号
	return "<a href=\"#\" onclick=\"callModifyFun('"+v+"',"+dataArrStr+");return false;\">" + v + "</a>";
}

function callModifyFun(v,data){
	//var record = Ext.util.JSON.decode(r);
	modify(v,data);
}

/**
 * 是否为正整数
 * @param param
 * @return
 */
function isPositiveInteger(param){
	var re = /^[1-9]+[0-9]*$/;
	if(!re.test(param)){
		return false;
	}
	return true;
}

/**
 * 密码必须是数字与字母组合，长度不小于8,可有特殊字符
 * @param pwd
 * @return
 */
function testPasswordReg(pwd){
	if(pwd.length<8||!/[0-9]+/.test(pwd)||!/[a-zA-Z]+/.test(pwd)){
		return true;
	}
	return false;
}