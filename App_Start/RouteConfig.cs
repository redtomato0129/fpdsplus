using System.Web.Mvc;
using System.Web.Routing;

namespace FedPipelineApplication
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
            name: "download",
            url: "files/download/{id}",
            defaults: new { controller = "Login", action = "DownloadFile", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "OpportunitySearch",
               url: "OpportunitySearch/Index",
               defaults: new { controller = "Opportunity", action = "Index" }
           );

            routes.MapRoute(
               name: "ContractSearch",
               url: "ContractSearch/Index",
               defaults: new { controller = "ContractSearch", action = "Index" }
           );

            routes.MapRoute(
                name: "VendorSearch",
                url: "VendorSearch/Index",
                defaults: new { controller = "Search", action = "Index"}
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "login", action = "login", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "SearchHistory",
                url: "QuestionSearchHistory/Index",
                defaults: new { controller = "QuestionSearchHistory", action = "Index"}
            );
        }
    }
}
