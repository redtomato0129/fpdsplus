using System.Web;
using System.Web.Mvc;

namespace FedPipelineApplication
{
    public class SessionExpireAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            if (HttpContext.Current.Session["User_Email"] == null)
            {
                filterContext.Result = new RedirectToRouteResult(
                       new System.Web.Routing.RouteValueDictionary { { "controller", "Login" }, { "action", "login" } });
                //filterContext.Result = new RedirectResult("~/Login");
                //HttpContext.Current.Response.Redirect("~/Login/Login");
                return;
            }
            base.OnActionExecuting(filterContext);

        }
    }
}