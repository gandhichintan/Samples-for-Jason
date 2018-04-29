using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace OCC.Utility.GlobalUtilities
{
    public class SessionWrapper
    {
        /// <summary>
        /// Adds a new item to the session-state collection 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void AddToSession(string key, object value)
        {
            try
            {
                HttpContext.Current.Session.Add(key, value);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Gets respective session value of passed session key
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static T GetSessionValueFromKey<T>(string key)
        {
            try
            {
                if (HttpContext.Current.Session[key] != null)
                {
                    return (T) HttpContext.Current.Session[key];
                }
                else
                {
                    HttpContext.Current.Response.Redirect("../Home/Logout");
                    return (T)HttpContext.Current.Session[""];
                      
                }
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.RedirectPermanent(FormsAuthentication.LoginUrl);
                throw new KeyNotFoundException(key + " Not found in Session"); 
                throw;
            }
        }

        /// <summary>
        /// Gets respective session value of passed session key
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static T TryGetSessionValueFromKey<T>(string key)
        {
            try
            {
                if (HttpContext.Current.Session[key] != null)
                    return (T)HttpContext.Current.Session[key];
                return default(T);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Sets session timeout in minutes
        /// </summary>
        /// <param name="sessionTimeout"></param>
        public static void SetSessionTimeout(int sessionTimeout)
        {
            try
            {
                if (HttpContext.Current.Session != null && HttpContext.Current.Session.Keys.Count > 0)
                    HttpContext.Current.Session.Timeout = sessionTimeout;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Gets session timeout in minutes
        /// </summary>
        /// <returns></returns>
        public static int GetSessionTimeout()
        {
            try
            {
                if (HttpContext.Current.Session != null && HttpContext.Current.Session.Count > 0)
                    return HttpContext.Current.Session.Timeout;
                return 0;
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        /// <summary>
        /// Cancels the current session
        /// </summary>
        public static void AbandonSession()
        {
            try
            {
                if (HttpContext.Current.Session != null && HttpContext.Current.Session.Keys.Count > 0)
                    HttpContext.Current.Session.Abandon();
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        /// <summary>
        /// Removes all keys and values from the session-state collection
        /// </summary>
        public static void RemoveAllKeysAndValuesFromSession()
        {
            try
            {
                if (HttpContext.Current.Session != null && HttpContext.Current.Session.Keys.Count > 0)
                    HttpContext.Current.Session.Clear();
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        /// <summary>
        /// Deletes the item from session-state collection
        /// </summary>
        /// <param name="key"></param>
        public static void DeleteItemFromSession(string key)
        {
            try
            {
                if (HttpContext.Current.Session != null && HttpContext.Current.Session[key] != null)
                    HttpContext.Current.Session.Remove(key);
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        /// <summary>
        /// Returns true/false in response to whether key present in session-state collection or not
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool KeyPresentInSession(string key)
        {
            try
            {
                return HttpContext.Current.Session != null && HttpContext.Current.Session[key] != null;
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        /// <summary>
        /// Checks whether session has been expired or not
        /// </summary>
        /// <returns></returns>
        public static bool HasSessionExpired()
        {
            try
            {
                return HttpContext.Current.Session == null || HttpContext.Current.Session.Keys.Count <= 0;
            }
            catch (Exception ex)
            {
                
                throw;
            }
        }
    }
}
