package com.tools.hibernate;

import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;




public interface ObjectDao {

	public void save(Object po);
//	
//	public Long saveAndReturnId(Object po);
//	
//	public String saveAndReturnKeyId(Object po);
//	
//	public String saveAndReturnProperty(Object po, String propertyName);
//
	public void saveOrUpdate(Object po);
//	
//	public void update(Object po);
//	
//	public void merge(Object po);
//	
//	public void deleteAll( List objectList);
//	
	public void delete(Object po);
//
//    public void delete(String objectPOName, List ids);
//    
//    public void delete(String objectPOName, String keyId);
//    
//    public Object getByKeyId(String objectPOName,String keyId);
//    
//	public Object getByProperty(String objectPOName,String propertyName,Object propertyValue);    
//    
//	public Object getBySql(String objectPOName, String sql);
//	
//	public List findByIds(String objectPOName,List ids);
//    
//    public List findAllObjects(String objectPOName);
//    
//	public List findByProperty(String objectPOName,String propertyName,String propertyValue);
//
//	public List findBySql(String objectPOName,String sql);
//	
//	public List findByHql(String hql);
//	
//	public List findAllObjects(String objectPOName, int firstIndex,int maxResults, String orderField);
//	
//	public List findBySql(String objectPOName, String sql,int firstIndex, int maxResults, String orderField);
//
//	public int countObject(String objectPOName);
//	
//	public int countObjectBySql(String objectPOName, String sql);
//	public int countObjectBySql2(String sql);
//	
//	public Session getHibernateSession();
//	
//	public boolean excuteSQL(String sql);
//	
//	public ResultSet executeSql(String sql);
//	
//	public void clearCache();
//	
//	public void evict(Object object);
//	
//	public void flush();
//	
//	public void batchSaveOrUpdate(List po);
//	
//	public <T> List<T> findPartFieldBySql(String sql, Class<T> clazz);
//	
//	public void delete(long id,String hql);
//	public List findAllObjects2(String hql, int firstIndex,
//			int maxResults, String orderField);
//	public <T> List<T> findVoteBySql(String sql, Class<T> clazz);
//	public List queryForPage(final String hql,final int offset,final int length);
//	
	public List findByHql(String hql,Object[] args);
//	public List findBySql(String sql, Map<String, Object> argsMap);
	public int countObjectByHql(String sql,Object[] args);
//	public List findBySql(final String sql, final Map<String, Object> argsMap,final int offset,final int length);
	public List findByHqlPage(final  String hql, final Map<String, Object> argsMap,final int firstIndex,
			final int maxResults);
}
