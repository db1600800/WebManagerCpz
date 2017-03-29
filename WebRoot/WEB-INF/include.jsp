<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>


<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>


<%@ taglib uri="/struts-tags" prefix="s"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="themeLocation" value="${ctx}/themes/vista"/>
<c:set var="crmCtx" value="${ctx}/crm"/>
<c:set var="advertCtx" value="${ctx}/advert"/>




<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title></title>

<script type="text/javascript">
var WWWROOT = '${ctx }';
</script>
<script type="text/javascript" src="${ctx}/js/common.js"></script>




<link rel="stylesheet"
	href="${ctx}/css/global.css" type="text/css"></link>
<link rel="stylesheet"
	href="${ctx}/css/admin_style.css"
	type="text/css"></link>
    <script type="text/javascript" src="${ctx}/js/common.js" ></script>
	<script type="text/javascript" language="javascript" src="${ctx}/js/loadForm.js"></script>









  <style type="text/css">
    .comboxItemCls .x-combo-list-item {height:20px;}
  </style>




<script type="text/javascript" src="${ctx}/js/jquery-1.8.3.js"></script>
</head>
<body>
</body>
</html>