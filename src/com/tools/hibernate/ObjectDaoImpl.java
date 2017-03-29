package com.tools.hibernate;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.CacheMode;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository("objectDao")
public class ObjectDaoImpl extends HibernateDaoSupport implements ObjectDao {
	private static final Logger logger = Logger.getLogger(ObjectDaoImpl.class);
	private static final long serialVersionUID = 1L;

//	
@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void save(Object po) {
		getHibernateTemplate().save(po);
	}
//
//	//@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public String saveAndReturnKeyId(Object po) {
//		getHibernateTemplate().save(po);
//		String keyId = null;
//		try {
//			keyId = BeanUtils.getSimpleProperty(po, "keyId");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return keyId;
//	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public Long saveAndReturnId(Object po) {
//		getHibernateTemplate().save(po);
//		Long id = null;
//		try {
//			id = new Long(BeanUtils.getProperty(po, "id"));
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return id;
//	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public String saveAndReturnProperty(Object po, String propertyName) {
//		getHibernateTemplate().save(po);
//		String id = null;
//		try {
//			id = BeanUtils.getSimpleProperty(po, propertyName);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return id;
//	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void saveOrUpdate(Object po) {
		getHibernateTemplate().saveOrUpdate(po);
	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void update(Object po) {
		getHibernateTemplate().update(po);
	}
//
//	public void merge(Object po) {
//		getHibernateTemplate().merge(po);
//	}
//
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void delete(Object po) {
		if (po != null) {
			getHibernateTemplate().delete(po);
		}
	}
//
//	public Object getByKeyId(String objectPOName, String keyId) {
//		Object po = null;
//
//		List list = getHibernateTemplate().find(
//				"from " + objectPOName + " po where po.keyId=?", keyId);
//
//		if (list != null && list.size() == 1) {
//			po = (Object) list.get(0);
//		}
//		return po;
//	}
//
//	public Object getByProperty(String objectPOName, String propertyName,
//			Object propertyValue) {
//		Object po = null;
//
//		List list = getHibernateTemplate().find(
//				"from " + objectPOName + " po where po." + propertyName + "=?",
//				propertyValue);
//
//		if (list != null && list.size() >= 1) {
//			po = (Object) list.get(0);
//		}
//		return po;
//	}
//
//	public Object getBySql(String objectPOName, String sql) {
//		Object po = null;
//
//		List list = getHibernateTemplate().find(
//				"from " + objectPOName + " po " + sql);
//		if (list != null && list.size() >= 1) {
//			po = (Object) list.get(0);
//		}
//		return po;
//	}
//
//	public List findByIds(String objectPOName, List ids) {
//		String idName = "keyId";
//		if (ids.size() > 0 && ids.get(0) instanceof Long) {
//			idName = "id";
//		}
//
//		String hsql = "from " + objectPOName + " po where po." + idName
//				+ " in (" + parseIdListToIdString(ids) + ")";
//
//		return getHibernateTemplate().find(hsql);
//	}
//
//	public List findByProperty(String objectPOName, String propertyName,
//			String propertyValue) {
//		List list = getHibernateTemplate().find(
//				"from " + objectPOName + " po where po." + propertyName + "='"
//						+ propertyValue + "' ");
//		return list;
//	}
//
//	public List findBySql(String objectPOName, String sql) {
//		List list = getHibernateTemplate().find(
//				"from " + objectPOName + " po " + sql);
//		return list;
//	}
//
//	public List findByHql(String hql) {
//		List list = getHibernateTemplate().find(hql);
//		return list;
//	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public void delete(String objectPOName, List objectIds) {
//		List list = findByIds(objectPOName, objectIds);
//		getHibernateTemplate().deleteAll(list);
//	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public void delete(String objectPOName, String keyId) {
//		Object po = this.getByKeyId(objectPOName, keyId);
//		if (po != null) {
//			getHibernateTemplate().delete(po);
//		}
//	}
//
//	private static String parseIdListToIdString(List idList) {
//		String idString = "";
//
//		if (idList != null) {
//			if (idList.size() > 0) {
//				if (idList.get(0) instanceof String) {
//					idString = StringUtils.join(idList.toArray(), "','");
//					idString = "'" + idString + "'";
//				} else if (idList.get(0) instanceof Long) {
//					idString = StringUtils.join(idList.toArray(), ",");
//				}
//			}
//		}
//
//		return idString;
//	}
//
//	public List findAllObjects(String objectPOName) {
//		return getHibernateTemplate().find("from " + objectPOName + " po ");
//	}
//
//	@SuppressWarnings("unchecked")
//	public List findAllObjects(String objectPOName, int firstIndex,
//			int maxResults, String orderField) {
//
//		String orderby;
//		if (orderField == null || orderField.equals("")) {
//			orderby = "";
//		} else {
//			orderby = " order by po." + orderField + " ";
//		}
//
//		Query qr = getSession().createQuery(
//				"select po from " + objectPOName + " as po " + orderby);
//		qr.setFirstResult(firstIndex);
//		qr.setMaxResults(maxResults);
//
//		return qr.list();
//	}
//	//此种写法是把hql语句执行使用getHibernateTemplate，为了不需要关闭session
//	@SuppressWarnings("unchecked")
//	public List findAllObjects2(final  String hql, final int firstIndex,
//			final int maxResults, String orderField) {
//
//		String orderby;
//		if (orderField == null || orderField.equals("")) {
//			orderby = "";
//		} else {
//			orderby = " order by po." + orderField + " ";
//		}
//		List list = getHibernateTemplate().executeFind(new HibernateCallback() { 
//			public Object doInHibernate(Session session) throws HibernateException, SQLException { 
//			Query query = session.createQuery(hql); 
//			query.setFirstResult(firstIndex); 
//			query.setMaxResults(maxResults); 
//			List list = query.list(); 
//			return list; }});
//	
//		return list;
//	}
//	@SuppressWarnings("unchecked")
//	public List<Object> findBySql(String objectPOName, String sql,
//			int firstIndex, int maxResults, String orderField) {
//
//		String orderby;
//		if (orderField == null || orderField.equals("")) {
//			orderby = "";
//		} else {
//			if (orderField.startsWith("po."))
//				orderby = " order by " + orderField + " ";
//			else
//				orderby = " order by po." + orderField + " ";
//		}
//		Query qr = getSession().createQuery(
//				"select po from " + objectPOName + " as po " + sql + orderby);
//		qr.setFirstResult(firstIndex);
//		qr.setMaxResults(maxResults);
//
//		return qr.list();
//	}
//	
//	public <T> List<T> findPartFieldBySql(String sql, Class<T> clazz) {
//		List<T> list = new ArrayList<T>();
//		Query qr = getSession().createQuery(sql);
//		list = qr.list();
//		return list;
//	}
//
//	public int countObject(String objectPOName) {
//		List list = getHibernateTemplate().find(
//				"select count(*) from " + objectPOName + " as po ");
//		int count = ((Long) list.get(0)).intValue();
//		return count;
//	}
//
//	public int countObjectBySql(String objectPOName, String sql) {
//		List list = getHibernateTemplate().find(
//				"select count(*) from " + objectPOName + " as po " + sql);
//		int count = ((Long) list.get(0)).intValue();
//		return count;
//	}
//	public int countObjectBySql2(String sql) {
//		List list = getHibernateTemplate().find(sql);
//		int count = ((Long) list.get(0)).intValue();
//		return count;
//	}
//	public Session getHibernateSession() {
//
//		SessionFactory sessionFactory = getHibernateTemplate()
//				.getSessionFactory();
//
//		// Session session = SessionFactoryUtils.getSession(sessionFactory,
//		// true);
//
//		Session session = sessionFactory.getCurrentSession();
//		if (session == null || session.isOpen() == false) {
////			session = sessionFactory.openSession();
//			logger.error("Hibernate getCurrentSession, session is NULL or not open,pls check!");
//		}
//		return session;
//
//		// return
//		// getHibernateTemplate().getSessionFactory().getCurrentSession();
//	}
//
//	public boolean excuteSQL(String sql) {
//		try {
//			getSession().connection().createStatement().executeUpdate(sql);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//		return true;
//	}
//	
//	@SuppressWarnings("deprecation")
//	public ResultSet executeSql(String sql) {
//		ResultSet rs = null;
//		Connection conn = getSession().connection();
//		if (conn != null) {
//			PreparedStatement ps;
//			try {
//				ps = conn.prepareStatement(sql);
//				rs = ps.executeQuery();
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
//		return rs;
//	}
//
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public void deleteAll(List objectList) {
//		getHibernateTemplate().deleteAll(objectList);
//	}
//
//	public void clearCache() {
//		getHibernateSession().flush();
//		getHibernateSession().clear();
//	}
//
//	public void evict(Object object) {
//		getHibernateTemplate().evict(object);
//	}
//
//	public void flush() {
//		getHibernateTemplate().flush();
//	}
//	
//	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//	public void batchSaveOrUpdate(List po) {
//		Session session = this.getSession();
//		session.setCacheMode(CacheMode.IGNORE);
//		for (int i = 0; i < po.size(); i++) {
//			session.saveOrUpdate(po.get(i));
//			if (i % 50 == 0) {
//				session.flush();
//				session.clear();
//			}
//		}
//	}
//	
//	public void delete(long id,String hql){
//		Session session = this.getSession();
//		Query query = session.createQuery(hql);
//		query.setLong(0, id);
//		query.executeUpdate();
//	}
//	public <T> List<T> findVoteBySql(String sql, Class<T> clazz) {//ͶƱ��ѯ����
//		List<T> list = new ArrayList<T>();
//		Query qr = getSession().createSQLQuery(sql);
//		list = qr.list();
//		return list;
//	}
//
//public List queryForPage(final String hql,final int offset,final int length){ 
//		List list = new ArrayList(); 
//		Query query = getSession().createSQLQuery(hql);//session.createQuery(hql); 
//		query.setFirstResult(offset); 
//		query.setMaxResults(length); 
//		list = query.list(); 
//		return list;  
//	} 
///*
// *使用参数绑定查询HQL
// *
// * @param hql
// * HQL查询语句
// * 
// * @param args
// * HQL语句中参数的数组，按参数位置进行绑定
// * 
// * @return 查询结果
// * 
// */
public int countObjectByHql(String sql,Object[] args) {
	List list = getHibernateTemplate().find(sql,args);
	int count = ((Long) list.get(0)).intValue();
	return count;
}
//
///*
// *使用参数绑定查询HQL
// *
// * @param hql
// * HQL查询语句
// * 
// * @param args
// * HQL语句中参数的数组，按参数位置进行绑定
// * 
// * @return 查询结果
// * 
// */
public List findByHql(String hql, Object[] args) {
	List list = getHibernateTemplate().find(hql,args);
	return list;
}
/*
 * 使用参数绑定查询hQL语句
 * 
 * @param sql
 * hQL语句
 * 
 * @param argsMap
 * SQL语句中占位符与其对应值的映射，按参数名称进行绑定
 * 
 * @return 查询结果
 * 
 */
@SuppressWarnings("unchecked")
public List findByHqlPage(final  String hql, final Map<String, Object> argsMap,final int firstIndex,
		final int maxResults) {
	if(hql == null || argsMap == null) {
		return null;
	}
	List list = getHibernateTemplate().executeFind(new HibernateCallback() { 
		public Object doInHibernate(Session session) throws HibernateException, SQLException { 
		Query query = session.createQuery(hql); 
		for(String key : argsMap.keySet()){
			query.setParameter(key, argsMap.get(key));
		}
		query.setFirstResult(firstIndex); 
		query.setMaxResults(maxResults); 
		List list = query.list(); 
		return list; }});

	return list;
}
/*
 * 使用参数绑定查询原生SQL语句
 * 
 * @param sql
 * 原生SQL语句
 * 
 * @param argsMap
 * SQL语句中占位符与其对应值的映射，按参数名称进行绑定
 * 
 * @return 查询结果
 * 
 */
//@SuppressWarnings("unchecked")
//public List findBySql(final String sql, final Map<String, Object> argsMap) {
//	if(sql == null || argsMap == null) {
//		return null;
//	}
//	
//	List list = getHibernateTemplate().executeFind(new HibernateCallback() {
//		public Object doInHibernate(Session session) throws HibernateException, SQLException {
//			Query query = session.createSQLQuery(sql);
//			
//			for(String key : argsMap.keySet()){
//				query.setParameter(key, argsMap.get(key));
//			}
//			
//			List list = query.list(); 
//			return list; }});
//	
//	return list;
//}

/*
 * 使用参数绑定查询原生SQL语句分页查询
 * 
 * @param sql
 * 原生SQL语句
 * 
 * @param argsMap
 * SQL语句中占位符与其对应值的映射，按参数名称进行绑定
 * 
 * @return 查询结果
 * 
 */
//@SuppressWarnings("unchecked")
//public List findBySql(final String sql, final Map<String, Object> argsMap,final int offset,final int length) {
//	if(sql == null || argsMap == null) {
//		return null;
//	}
//	
//	List list = getHibernateTemplate().executeFind(new HibernateCallback() {
//		public Object doInHibernate(Session session) throws HibernateException, SQLException {
//			Query query = session.createSQLQuery(sql);
//			query.setFirstResult(offset); 
//			query.setMaxResults(length);
//			for(String key : argsMap.keySet()){
//				query.setParameter(key, argsMap.get(key));
//			}
//			
//			List list = query.list(); 
//			return list; }});
//	
//	return list;
//}

}
