package com.tools;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;


public class CommonFunction {

	private static Properties props = new Properties();

	

	
	
	
	
	// 根据key读取value
	public static String readDefVal(String key) {
		try {
			URL url = CommonFunction.class.getResource("/gdpost_default.properties");
			String propertiesFileName = url.getFile();
			InputStream in = new BufferedInputStream(new FileInputStream(propertiesFileName));
			props.load(in);
			String value = props.getProperty(key);
			//System.out.println(key + value);
			return value;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
}
