package com.cpz.action;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;


import com.cpz.entity.BbQqEntity;
import com.tools.CommonFunction;

import com.tools.PaginationUtil;
import com.tools.StrutsParamUtils;
import com.tools.hibernate.ObjectDao;

//@SuppressWarnings("unchecked")
//@Namespace(value = "/cpz")
@Action(value = "BbQqAction", results = {
		@Result(name = "bbqq", location = "/WEB-INF/cpz/bbqq/bbqq.jsp"),
		@Result(name = "bbqqSetting", location = "/WEB-INF/cpz/bbqq/bbqqSetting.jsp"),
		@Result(name = "bbqqAdd", location = "/WEB-INF/cpz/bbqq/bbqqAdd.jsp"),

})
public class BbQqAction {

	@Resource
	private ObjectDao objectDao;

	private BbQqEntity entity;

	public ObjectDao getObjectDao() {
		return objectDao;
	}

	public void setObjectDao(ObjectDao objectDao) {
		this.objectDao = objectDao;
	}

	public BbQqEntity getEntity() {
		return entity;
	}

	public void setEntity(BbQqEntity bbqq) {
		this.entity = bbqq;
	}

	public String index() {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		String dd = StrutsParamUtils.getPraramValue("dd", "");
		request.setAttribute("dd", dd);
		return "bbqq";
	}

	// 测试列表
	public void list() {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		String pageNo = request.getParameter("pageNo");
		if (StringUtils.isBlank(pageNo)) {// 判断某字符串是否为空或长度为0或由空白符(whitespace) 构成
			pageNo = "1";
			request.setAttribute("pageNo", pageNo);
		}
		String pageSize = request.getParameter("pageSize");
		if (StringUtils.isBlank(pageSize)) {
			pageSize = "10";
			request.setAttribute("pageSize", pageSize);
		}
		String where = "";
		String where2 = "";
		List argslist = new ArrayList();
		Map<String, Object> argsMap = new HashMap<String, Object>();
		String dd = StrutsParamUtils.getPraramValue("dd", "");
		if (StringUtils.isBlank(dd)) {
			// return;
		} else {
			where += "dd=? And ";
			where2 += "dd=:dd And ";
			argslist.add(dd);
			argsMap.put("dd", dd);
		}
		
		StringBuffer sql=null;
		StringBuffer sb=null;
		if(where.length()==0)
		{
			 sql = new StringBuffer(
						"select count(*) from BbQqEntity  "
								);
				 sb = new StringBuffer(
						" select a from BbQqEntity a   "
								);
		}else
		{
		 sql = new StringBuffer(
				"select count(*) from BbQqEntity where "
						+ where.substring(0, where.lastIndexOf("And")));
		 sb = new StringBuffer(
				" select a from BbQqEntity a  where "
						+ where2.substring(0, where2.lastIndexOf("And")));
		}
		int size = argslist.size();
		Object[] args = (Object[]) argslist.toArray(new String[size]);
		
		// sb.append(" order by activity_code desc");
		int count = objectDao.countObjectByHql(sql.toString(), args);
		List<BbQqEntity> list = (List<BbQqEntity>) objectDao.findByHqlPage(sb
				.toString(), argsMap, (Integer.parseInt(pageNo) - 1)
				* Integer.parseInt(pageSize), Integer.parseInt(pageSize));
		String pageString = PaginationUtil
				.getPaginationHtml(Integer.valueOf(count), Integer
						.valueOf(pageSize), Integer.valueOf(pageNo), Integer
						.valueOf(2), Integer.valueOf(5),
						"javascript:getAll('BbQqAction!list.action?dd=" + dd
								+ "%26pageNo=", true);
		pageString = pageString.replace(".html", "");
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", list);
		jsonObject.put("pageString", pageString);
		jsonObject.put("count", count);
		try {
			StrutsParamUtils.getResponse().setCharacterEncoding("UTF-8");
			StrutsParamUtils.getResponse().getWriter().write(
					jsonObject.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 跳到修改页
	public String toUpdate() {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		// 选择器数据
		// 页面数据
		String dd = StrutsParamUtils.getPraramValue("dd", "");
		request.setAttribute("dd", dd);
		StringBuffer sb = new StringBuffer(
				" select a from BbQqEntity a  where dd=:dd  ");

		Map<String, Object> argsMap = new HashMap<String, Object>();
		argsMap.put("dd", dd);
		List<BbQqEntity> list = (List<BbQqEntity>) objectDao.findByHqlPage(sb
				.toString(), argsMap, 0, 10);
		if (list != null && list.size() == 1) {
			request.setAttribute("entity", (BbQqEntity) list.get(0));
			return "bbqqSetting";
		} else {
			return "bbqqAdd";
		}

	}

	public String doUpdate() throws IOException {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		// 批量删除 // List objectList = objectDao.findByProperty("MerchMsg",
		// "belong_activity", activityInfo.getActivity_code() );
		// objectDao.deleteAll(objectList);
		objectDao.saveOrUpdate(entity);// form表单提交过来的对象
		request.setAttribute("dd", entity.getDd());
		return "bbqq";
	}

	// 跳到新增页
	public String toAdd() {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		// 选择器数据
		// 页面数据
		String dd = StrutsParamUtils.getPraramValue("dd", "");
		request.setAttribute("dd", dd);
		return "bbqqAdd";

	}

	public String doAdd() throws IOException {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		// id 当前最大值加一
//		{
//			StringBuffer sb = new StringBuffer(
//					" select max(a.dd) from BbQqEntity a    ");
//			List argslist = new ArrayList();
//			List list = (List) objectDao.findByHql(sb.toString(), argslist
//					.toArray());
//			int max = Integer.valueOf((String) list.get(0));
//			entity.setDd(StrutsParamUtils.beforeAppend0(max + 1 + "") + "");
//		}
		objectDao.save(entity);// form表单提交过来的对象
		request.setAttribute("dd", entity.getDd());
		return "bbqq";
	}

	public void doDelete() throws IOException {
		HttpServletRequest request = StrutsParamUtils.getRequest();
		String dd = StrutsParamUtils.getPraramValue("dd", "");
		request.setAttribute("dd", dd);
		BbQqEntity entity = new BbQqEntity();
		entity.setDd(dd);
		objectDao.delete(entity);
		StrutsParamUtils.getResponse().getWriter().write("success");
		return;
	}

}
