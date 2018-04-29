using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Net.Mime;
using System.Runtime.InteropServices;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Net.NetworkInformation;
using System.IO;
using System.Threading.Tasks;
using log4net;
using System.Management;
using WbemScripting;

namespace OCC.OpenLocallyClientWindowService
{
    public partial class OpenLocallyClientService : ServiceBase
    {

        [DllImport("Wtsapi32.dll")]
        static extern bool WTSQuerySessionInformation(
            System.IntPtr hServer, int sessionId, WTS_INFO_CLASS wtsInfoClass, out System.IntPtr ppBuffer, out uint pBytesReturned);

        [DllImport("wtsapi32.dll", SetLastError = true)]
        static extern Int32 WTSEnumerateSessions(IntPtr hServer, [MarshalAs(UnmanagedType.U4)] Int32 Reserved, [MarshalAs(UnmanagedType.U4)] Int32 Version, ref IntPtr ppSessionInfo, [MarshalAs(UnmanagedType.U4)] ref Int32 pCount);

        [DllImport("wtsapi32.dll")]
        static extern void WTSFreeMemory(IntPtr pMemory);

        [DllImport("wtsapi32.dll", SetLastError = true)]
        static extern IntPtr WTSOpenServer([MarshalAs(UnmanagedType.LPStr)] String pServerName);
        
        private static ILog Log = LogManager.GetLogger("OpenLocallyClientService");
        public delegate void FileReceivedEventHandler(object source, string fileName);
        public event FileReceivedEventHandler FileReceived;

        private int Port = 1100;
        private string ServerIP = string.Empty;
        private string fileName = string.Empty;
        private string filePath = @"c:\";

        public OpenLocallyClientService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            ThreadStart threadStart = delegate
                                          {
                                              this.FileReceived += OpenLocallyClientService_FileReceived;
                                              HandleIncomingFile(Port);
                                          };
          new Thread(threadStart).Start();
        }
         public void Test()
         {
             this.FileReceived += OpenLocallyClientService_FileReceived;
              HandleIncomingFile(Port);
         }

        [MTAThread]
        public void OpenLocallyClientService_FileReceived(object source, string fileName)
        {
            try
            {
                BackgroundWorker openDocWorker = new BackgroundWorker();
                openDocWorker.DoWork += openDocWorker_DoWork;
                openDocWorker.RunWorkerCompleted += openDocWorker_RunWorkerCompleted;
                openDocWorker.RunWorkerAsync();
            }
            catch (Exception ex)
            {
                if (Log.IsErrorEnabled)
                    Log.Error("[" + System.DateTime.Now.ToString() + "] " + this.GetType().FullName + " :: " + new StackFrame().GetMethod() + " :: ", ex);
                throw;
            }
        }

        public void openDocWorker_RunWorkerCompleted(object sender, System.ComponentModel.RunWorkerCompletedEventArgs e)
        {
            
            Process docProcess = new Process();
            docProcess.Exited += docProcess_Exited;
            docProcess.StartInfo = new ProcessStartInfo(string.Concat(filePath, fileName));
            docProcess.Start();
        }

        public void openDocWorker_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            
        }
       
        private void docProcess_Exited(object sender, System.EventArgs e)
        {

            try
            {
                SendFile(ServerIP, Port, filePath, fileName);
                //Task.Factory.StartNew(() => SendFile(ServerIP, Port, filePath, fileName));
            }
            catch (Exception ex)
            {
                if (Log.IsErrorEnabled)
                    Log.Error("[" + System.DateTime.Now.ToString() + "] " + this.GetType().FullName + " :: " + new StackFrame().GetMethod() + " :: ", ex);

                throw;
            }
            finally
            {

            }

        }

        protected override void OnStop()
        {
        }


        /// <summary>
        /// Listen Incomming request and receive files from server.
        /// </summary>
        /// <param name="port"></param>
        public void HandleIncomingFile(int port)
        {
            try
            {
                //Debugger.Launch();
                TcpListener tcpListener = new TcpListener(port);
                tcpListener.Start();
                while (true)
                {
                    Socket handlerSocket = tcpListener.AcceptSocket();
                    if (handlerSocket.Connected)
                    {
                        ServerIP = handlerSocket.RemoteEndPoint.ToString().Split(':')[0];
                        NetworkStream networkStream = new NetworkStream(handlerSocket);
                        int thisRead = 0;
                        int blockSize = 1024;
                        Byte[] dataByte = new Byte[blockSize];
                       
                            handlerSocket.Receive(dataByte);
                            int fileNameLen = BitConverter.ToInt32(dataByte, 0);
                            fileName = Encoding.ASCII.GetString(dataByte, 4, fileNameLen);
                            Stream fileStream = File.OpenWrite(filePath + fileName);
                            fileStream.Write(dataByte, 4 + fileNameLen, (1024 - (4 + fileNameLen)));
                            while (true)
                            {

                                thisRead = networkStream.Read(dataByte, 0, blockSize);
                                fileStream.Write(dataByte, 0, thisRead);
                                if (thisRead == 0)
                                    break;
                            }
                            fileStream.Close();


                        if (FileReceived != null)
                        {
                            FileReceived(this, fileName);
                        }
                        handlerSocket = null;
                    }
                }

            }
            catch (Exception ex)
            {
                if (Log.IsErrorEnabled)
                    Log.Error("[" + System.DateTime.Now.ToString() + "]" + this.GetType().FullName + " :: " + new StackFrame().GetMethod() + " :: ", ex);
                throw;
            }
        }

        /// <summary>
        /// Send file back to server after Processing completion.
        /// </summary>
        /// <param name="remoteHostIP"></param>
        /// <param name="remoteHostPort"></param>
        /// <param name="longFileName"></param>
        /// <param name="shortFileName"></param>
        public void SendFile(string remoteHostIP, int remoteHostPort, string longFileName, string shortFileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(remoteHostIP))
                {
                    byte[] fileNameByte = Encoding.ASCII.GetBytes(shortFileName);
                    byte[] fileData = File.ReadAllBytes(longFileName);
                    byte[] clientData = new byte[4 + fileNameByte.Length + fileData.Length];
                    byte[] fileNameLen = BitConverter.GetBytes(fileNameByte.Length);
                    fileNameLen.CopyTo(clientData, 0);
                    fileNameByte.CopyTo(clientData, 4);
                    fileData.CopyTo(clientData, 4 + fileNameByte.Length);
                    TcpClient clientSocket = new TcpClient(remoteHostIP, remoteHostPort);
                    NetworkStream networkStream = clientSocket.GetStream();
                    networkStream.Write(clientData, 0, clientData.GetLength(0));
                    networkStream.Close();
                }
            }
            catch (Exception ex)
            {
                if (Log.IsErrorEnabled)
                    Log.Error("[" + System.DateTime.Now.ToString() + "]" + this.GetType().FullName + " :: " + new StackFrame().GetMethod() + " :: ", ex);
                throw;
            }
        }

        /// <summary>
        /// Returns currently logged on username.
        /// </summary>
        /// <param name="sessionId"></param>
        /// <param name="server"></param>
        /// <returns></returns>
        internal static string GetUserName(int sessionId, IntPtr server)
        {
            IntPtr buffer = IntPtr.Zero;
            uint count = 0;
            string userName = string.Empty;
            try
            {
                WTSQuerySessionInformation(server, sessionId, WTS_INFO_CLASS.WTSUserName, out buffer, out count);
                userName = Marshal.PtrToStringAnsi(buffer).ToUpper().Trim();
            }
            finally
            {
                WTSFreeMemory(buffer);
            }
            return userName;
        }

        /// <summary>
        /// Returns session of currently logged on user.
        /// </summary>
        /// <param name="server"></param>
        /// <param name="sessions"></param>
        /// <returns></returns>
        private static Dictionary<string, int> GetUserSession(IntPtr server, List<int> sessions)
        {
            Dictionary<string, int> userSession = new Dictionary<string, int>();

            foreach (var sessionId in sessions)
            {
                string uName = GetUserName(sessionId, server);
                if (!string.IsNullOrWhiteSpace(uName))
                    userSession.Add(uName, sessionId);
            }
            return userSession;
        }

        /// <summary>
        /// Returns list of session ids.
        /// </summary>
        /// <param name="server"></param>
        /// <returns></returns>
        internal static List<int> GetSessionIDs(IntPtr server)
        {
            List<int> sessionIds = new List<int>();
            IntPtr buffer = IntPtr.Zero;
            int count = 0;
            int retval = WTSEnumerateSessions(server, 0, 1, ref buffer, ref count);
            int dataSize = Marshal.SizeOf(typeof(WTS_SESSION_INFO));
            Int64 current = (int)buffer;

            if (retval != 0)
            {
                for (int i = 0; i < count; i++)
                {
                    WTS_SESSION_INFO si = (WTS_SESSION_INFO)Marshal.PtrToStructure((IntPtr)current, typeof(WTS_SESSION_INFO));
                    current += dataSize;
                    sessionIds.Add(si.SessionID);
                }
                WTSFreeMemory(buffer);
            }
            return sessionIds;
        }
    }

    [StructLayout(LayoutKind.Sequential)]
    internal struct WTS_SESSION_INFO
    {
        public Int32 SessionID;
        [MarshalAs(UnmanagedType.LPStr)]
        public String pWinStationName;
        public WTS_CONNECTSTATE_CLASS State;
    }

    internal enum WTS_CONNECTSTATE_CLASS
    {
        WTSActive,
        WTSConnected,
        WTSConnectQuery,
        WTSShadow,
        WTSDisconnected,
        WTSIdle,
        WTSListen,
        WTSReset,
        WTSDown,
        WTSInit
    }

    internal enum WTS_INFO_CLASS
    {
        WTSInitialProgram,
        WTSApplicationName,
        WTSWorkingDirectory,
        WTSOEMId,
        WTSSessionId,
        WTSUserName,
        WTSWinStationName,
        WTSDomainName,
        WTSConnectState,
        WTSClientBuildNumber,
        WTSClientName,
        WTSClientDirectory,
        WTSClientProductId,
        WTSClientHardwareId,
        WTSClientAddress,
        WTSClientDisplay,
        WTSClientProtocolType,
        WTSIdleTime,
        WTSLogonTime,
        WTSIncomingBytes,
        WTSOutgoingBytes,
        WTSIncomingFrames,
        WTSOutgoingFrames,
        WTSClientInfo,
        WTSSessionInfo
    }
}
