using System.Reflection;
using Autofac;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OCC.Utility.GlobalUtilities
{
    public class GlobalUtil
    {
        #region "Private Member(s)"

        public static IComponentContext _componentContext;

        #endregion

        #region "Public Enum(s)"

        public enum DbAction
        {
            Insert,
            Update,
            Delete
        }

        public enum ActivityLogName
        {
            Brand,
            Paralegal,
            User,
            OtherPartySolicitor,
            File,
            OtherContact,
            Office,
            Financial,
            Client,
            Solicitor,
            Staff,
            MortgageBroker,
            MortgageBrokerage,
            RealEstateAgency,
            RealEstateAgent,
            OtherParty,
            Template,
            Bank,
            Council,
            CommunityTitlesScheme
        }

        #endregion

        #region "Public Method(s)"

        /// <summary>
        /// Method sets the IOC component context.
        /// </summary>
        /// <param name="componentContext"></param>
        public static void SetIocComponentContext(IComponentContext componentContext)
        {
            try
            {
                _componentContext = componentContext;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, typeof(GlobalUtil));
            }
            finally
            {

            }
        }

        /// <summary>
        /// Method for Handling and logging Exceptions.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="callingType"> </param>
        public static void HandleAndLogException(Exception ex, object callingType)
        {
            HandleAndLogException(ex, callingType.GetType());
        }

        /// <summary>
        /// Method for Handling and logging Exceptions.
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="callingType"> </param>
        public static void HandleAndLogException(Exception ex, Type callingType)
        {
            var log = LogManager.GetLogger(callingType);
            if (log.IsErrorEnabled)
            {
                log.Error(ex.Message, ex);
                throw ex;
            }
        }


        public static void Log(string message)
        {
            var log = LogManager.GetLogger(System.Reflection.MethodInfo.GetCurrentMethod().DeclaringType);
            if (log.IsInfoEnabled)
            {
                log.Info(message);
            }
        }

        /// <summary>
        ///Function to encode the string
        /// </summary>
        /// <param name="value"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static object GetTrimmedObject(object model)
        {
            var propertiesInfoCollection = model.GetType().GetProperties().ToList();
            MethodInfo stringMethodInfo = typeof(String).GetMethod("Trim", new Type[0]);
            foreach (var item in propertiesInfoCollection)
            {
                Type type = item.PropertyType;
                if (type == typeof(String))
                {
                    object value = item.GetValue(model, null);
                    if (!item.Name.Equals("FullName"))
                    {
                        if (value != null)
                        {
                            object TrimmedValue = stringMethodInfo.Invoke(value, null);
                            item.SetValue(model, TrimmedValue, null);
                        }
                    }

                }
            }
            return model;
        }

        /// <summary>
        /// This method returns true if changes found by comparing two objects of same table.
        /// </summary>
        /// <param name="tableObject"></param>
        /// <param name="tableOld"></param>
        /// <returns></returns>
        public static bool HasChanges(object tableObject, object tableOld, out List<string> propertyName)
        {
            bool result = false;
            var propertyCollection = new List<string>();

            try
            {
                string details = string.Empty;
                if (tableObject != null)
                {

                    foreach (PropertyInfo firstObjectPropertyInfo in tableObject.GetType().GetProperties())
                    {
                        foreach (PropertyInfo secondObjectPropertyInfo in tableOld.GetType().GetProperties())
                        {
                            if (firstObjectPropertyInfo.Name == secondObjectPropertyInfo.Name)
                            {
                                if (!firstObjectPropertyInfo.Name.Equals(StringConstants.ID) && !firstObjectPropertyInfo.Name.Equals(StringConstants.LastModifiedDate) && !firstObjectPropertyInfo.Name.Equals(StringConstants.CreatedBy) && !firstObjectPropertyInfo.Name.Equals(StringConstants.Username) && !firstObjectPropertyInfo.Name.Equals(StringConstants.DbAction))
                                {

                                    if (firstObjectPropertyInfo.GetValue(tableObject, null) != null && secondObjectPropertyInfo.GetValue(tableOld, null) != null)
                                    {
                                        result = firstObjectPropertyInfo.GetValue(tableObject, null).ToString() != secondObjectPropertyInfo.GetValue(tableOld, null).ToString();
                                        if (result)
                                        {
                                            if (!firstObjectPropertyInfo.Name.Contains("Check"))
                                                propertyCollection.Add(firstObjectPropertyInfo.Name);

                                            details = details + " " + firstObjectPropertyInfo.Name + " changed" + " : " +
                                             firstObjectPropertyInfo.GetValue(tableObject, null);
                                        }
                                    }
                                    else
                                    {
                                        if (firstObjectPropertyInfo.GetValue(tableObject, null) != null)
                                        {
                                            if (!firstObjectPropertyInfo.Name.Contains("Check"))
                                                propertyCollection.Add(firstObjectPropertyInfo.Name);

                                            details = details + " " + firstObjectPropertyInfo.Name + " changed" + " : " +
                                              firstObjectPropertyInfo.GetValue(tableObject, null);

                                        }

                                    }

                                }

                            }
                        }

                    }

                }
                if (details.Length > 0)
                {
                    result = true;
                }

            }
            catch (Exception ex)
            {
                GlobalUtil.Log(ex.Message);
            }
            finally
            {
                if (tableObject != null)
                {
                    tableObject = null;
                }
                if (tableOld != null)
                {
                    tableOld = null;
                }
            }
            propertyName = propertyCollection;
            return result;
        }

        #endregion
    }
}
