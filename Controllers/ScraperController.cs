using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Web.Mvc;
using FedPipelineApplication.Models;
using System.Web.Script.Serialization;
using System.Configuration;
using static FedPipelineApplication.Controllers.CrmActivitiesController;
using System.Web;
using System.IO;
using Newtonsoft.Json.Linq;
using static FedPipelineApplication.Controllers.OpportunityController;
using System.Net.Http;

namespace FedPipelineApplication.Controllers
{
    public class ScraperController : Controller
    {
		SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
		string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
		public ActionResult Index()
        {
            return View();
        }

        public ActionResult NewNamespace()
        {
            return View();
        }

        public ActionResult ChatAI()
        {
            return View();
        }

        public string UploadFile()
        {
            string response = string.Empty;
            string fileName = string.Empty;
            string filenamesaved = string.Empty;

            var error = string.Empty;
            string filePath = string.Empty;
            var dateAndTime = DateTime.Now;
            string namespaceName = HttpContext.Request.QueryString["namespaceName"];
            if (Request.Files.Count > 0)
            {
                //int result;
                HttpFileCollectionBase files = Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    filePath = Server.MapPath("~/UploadFiles/");
                    HttpPostedFileBase file = files[i];
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    filenamesaved = file.FileName;
                    fileName = filePath + file.FileName;
                    file.SaveAs(fileName);
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri("http://127.0.0.1:8000/");
                        //HTTP GET
                        var responseTask = client.GetAsync("addDocument?filename=" + filenamesaved + "&&filepath=" + filePath + "&&namespace=" + namespaceName );
                        responseTask.Wait();

                        var res = responseTask.Result;
                        if (res.IsSuccessStatusCode)
                        {
                            var readTask = res.Content.ReadAsStringAsync();
                            readTask.Wait();

                            var alldata = readTask.Result;

                            dynamic d = JObject.Parse(alldata);
                            // var answer = d.answer.ToString();
                            //var source = d.source.ToString();

                        }
                        else
                        {
                        }
                    }
                }


            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string nameSpaceList()
        {
            string response = String.Empty;
            string error = String.Empty;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://127.0.0.1:8000/");
                //HTTP GET
                var responseTask = client.GetAsync("namespacelist");
                responseTask.Wait();

                var res = responseTask.Result;
                if (res.IsSuccessStatusCode)
                {
                    var readTask = res.Content.ReadAsStringAsync();
                    readTask.Wait();

                    var alldata = readTask.Result;

                    dynamic d = JObject.Parse(alldata);
                    response = d.namespaces.ToString();
                    // var answer = d.answer.ToString();
                    //var source = d.source.ToString();

                }
                else
                {
                }
            }

            return new JavaScriptSerializer().Serialize(new { response, error });

        }

        public string deleteNamespace(string name)
        {
            string response = String.Empty;
            string error = String.Empty;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://127.0.0.1:8000/");
                //HTTP GET
                var responseTask = client.GetAsync("namespacedelete?namespace="+ name);
                responseTask.Wait();

                var res = responseTask.Result;
                if (res.IsSuccessStatusCode)
                {
                    var readTask = res.Content.ReadAsStringAsync();
                    readTask.Wait();

                    var alldata = readTask.Result;

                    dynamic d = JObject.Parse(alldata);
                    response = d.namespaces.ToString();
                    // var answer = d.answer.ToString();
                    //var source = d.source.ToString();

                }
                else
                {
                }
            }

            return new JavaScriptSerializer().Serialize(new { response, error });

        }

    }
}