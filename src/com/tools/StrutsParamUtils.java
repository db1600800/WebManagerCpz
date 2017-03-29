package com.tools;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

/**
 * @author yuanbin
 *
 * 2008-9-16 下午05:24:57
 */
public class StrutsParamUtils {
	
	public final static String TipMsgKey = "tipMsgKey";
	public final static String RedirectTo = "redirectTo";
	
	public static HttpServletRequest getRequest(){
		return ServletActionContext.getRequest();
	}
	
	public static HttpServletResponse getResponse(){
		return ServletActionContext.getResponse();
	}
	
	public static void setRequest(HttpServletRequest request){
		ServletActionContext.setRequest(request);
	}

	public static void setResponse(HttpServletResponse response){
		ServletActionContext.setResponse(response);
	}
		
	public static String getPraramValue(String paramName, String defaultValue){
		if(StringUtils.isBlank(paramName)){
			return defaultValue;
		}
		String query=getRequest().getQueryString();
		Map ky=new HashMap();
		String paramValue ="";
		if(query!=null && query.contains("%26"))
		{
			String []querys=query.split("%26");
			for(int i=0;i<querys.length;i++)
			{
				String es[]=querys[i].split("=");
				if(es.length>1)
				ky.put(es[0], es[1]);
			}
			paramValue=(String) ky.get(paramName);
		}else
		{
		
		 paramValue = getRequest().getParameter(paramName);
		}
		paramValue = StringUtils.defaultIfEmpty(paramValue, defaultValue);
		
		return paramValue;
	}
	
	public static Long getPraramLongValue(String paramName, Long defaultValue){
		if(StringUtils.isBlank(paramName)){
			return defaultValue;
		}
		String paramValue = getRequest().getParameter(paramName);
		paramValue = StringUtils.defaultIfEmpty(paramValue, defaultValue+"");
		
		if(StringUtils.isNumeric(paramValue)){
			return Long.valueOf(paramValue);
		}
		
		return defaultValue;
	}
	
	public static int getPraramValue(String paramName, int defaultValue){
		if(StringUtils.isBlank(paramName)){
			return defaultValue;
		}
		String paramValue = getRequest().getParameter(paramName);
		paramValue = StringUtils.defaultIfEmpty(paramValue, defaultValue+"");
		
		if(StringUtils.isNumeric(paramValue)){
			return Integer.valueOf(paramValue);
		}
		
		return defaultValue;
	}
	
	public static String[] getPrarmArrValue(String paramName){
		String[] prarmArr;
		if(StringUtils.isBlank(paramName)){
			return null;
		}
		prarmArr = getRequest().getParameterValues(paramName);
		return prarmArr;
	}
	
	public static void setMsgAndRedirect(String msg, String redirect){
		getRequest().setAttribute(TipMsgKey, msg);
		getRequest().setAttribute(RedirectTo,
				getRequest().getContextPath() + redirect);
	}
	
	public static ServletContext getServletContext(){
		return ServletActionContext.getServletContext();
	}
	
	/**
	 * 向页面写入数据
	 * @param str
	 */
	public static void writeStr(String str){  
		HttpServletResponse response = getResponse();
		response.setContentType("text/plain; charset=utf-8");
        //response.setCharacterEncoding("utf-8");  
        PrintWriter pw = null;  
        try {  
            pw = response.getWriter();  
            pw.write(str);  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally{  
            if(pw!=null) pw.close();  
        }  
    }
	
	public static String beforeAppend0(String  i)
	{
		  if(isJustOneNumeric(i))
		  {
        
        return "0"+i;  
		  }else
		  {
			  return i;
		  }
		
	}
	
	public static boolean isJustOneNumeric(String str){ 
		   Pattern pattern = Pattern.compile("[0-9]"); 
		   Matcher isNum = pattern.matcher(str);
		   if( !isNum.matches() ){
		       return false; 
		   } 
		   return true; 
		}
	
}
