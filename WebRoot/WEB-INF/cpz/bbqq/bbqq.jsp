<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@ include file="../../include.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>测试</title>
	<script>
		function toAdd(){
			window.location.href="BbQqAction!toAdd.do?dd=${dd}";
		}
		
		
		$(document).on('ready', function() {
			var dd="${dd}";
			$("#dd").val(dd);
			getAll('BbQqAction!list.do');
		});
		
		
		function search(){
			getAll('BbQqAction!list.do');
		}
		
		function dodel(mdd){
			var r=confirm("确定要删除吗？");
			if(r){
				$.ajax({
					type:'POST',
					url:'BbQqAction!doDelete.do',
					data:{
dd:mdd					
},
					success:function(k){
							alert("删除成功！")
							window.location.href = "BbQqAction!index.do?dd=${dd}";
					},
					error : function() {
						alert("对不起，系统错误，请稍候重试！")
					}
				});
			}
			
			
		}
		function getAll(tzurl){
var searchInput = $("#searchInput").val();
				$.ajax({
					type:'POST',
					dataType:'json',
					url:tzurl,
					data:{
dd:searchInput					},
					success:function(result){
	
							var divtext = '';
							var data =result.list;
							var pagenational = result.pageString;
						
							for(var i=0;i<data.length;i++){
								divtext += '<tr class="even" style="white-space:nowrap; overflow:hidden; text-align:center">';
	 divtext += '<td>' + data[i].b + '</td>';
								divtext += '<td ><a href="BbQqAction!toUpdate.do?dd='+data[i].dd+'"> [修改] </a>'
								divtext +='|<a href="javascript:void(0);" onclick="dodel('+data[i].dd+')"> [删除] </a></td>';
								divtext += '</tr>';
							}
							//divtext += pagenational;
							$("#newtable tbody").html(divtext);
							$("#pageContent").html(pagenational);
					}
				});
		}
	</script>
</head>
<body>
	<div style="padding-left:20px;margin-bottom:10px;" >
	<input type="hidden" id="dd" name="dd" value="" />
	活动名称：<input type="text" id="searchInput" style="margin-left:10px;width:100px;height:20px; "/>
	<input type="button" value="查询" name = "btn_search" onmouseover="this.style.cursor='hand'" style="width:50px;height:20px;font-size:12px;" class="subBtn" onclick="search()">
	<input type="button" value="新增" name = "btn_search" onmouseover="this.style.cursor='hand'" style="width:50px;height:20px;font-size:12px;" class="subBtn" onclick="toAdd()">
	
	</div>
	<div id="signContent">
	  <div class="table-list lr10">
	      <table width="100%">
	      <tr>
	       <td>
	       <div>
	       <img src="/images/ggk.jpg" style="width:250px;display:block;margin:0 auto;"/>
	       </div>
	       
	       
	          <div><p>活动玩法：</p>
<p>·添加砍价活动，关联砍价商品，设置砍价刀数；</p>
<p>·微信端查询出砍价列表，选择任一产品，参加砍价；</p>
<p>·分享给好友，帮忙砍价；</p>
<p>·砍到底价，下单，支付，购买成功，等待发货；</p>
	          </div></td>
	        <td style="vertical-align: top;">
	        <table id="newtable" width="100%">
	          <thead class=trhead id="tblHeader">
	            
				<tr> 				<th  style="text-align:center;">好吧</th>
				<th  style="text-align:center;">操作</th></tr>
				</thead>
				<tbody id="records">
			    </tbody>
		</table>
	       </td>
	      </tr>
	      </table>
	</div>
	<div id="pageContent"></div>
  </div>
	
</body>
</html>

