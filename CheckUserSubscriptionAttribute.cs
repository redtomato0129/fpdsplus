using System;
using System.Web;
using System.Web.Mvc;

namespace FedPipelineApplication
{
    public class CheckUserSubscriptionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            if ((HttpContext.Current.Session["IsPaidUser"] != null && (bool)HttpContext.Current.Session["IsPaidUser"] == false)
                && (HttpContext.Current.Session["isTrialUser"] != null && Convert.ToInt32(HttpContext.Current.Session["isTrialUser"]) == 0)
                )
            {
                filterContext.Result = new RedirectToRouteResult(
                       new System.Web.Routing.RouteValueDictionary { { "controller", "Payment" }, { "action", "PaymentWithPaypal" } });
                //filterContext.Result = new RedirectResult("~/Login");
                //HttpContext.Current.Response.Redirect("~/Login/Login");
                return;
            }
            base.OnActionExecuting(filterContext);

        }
    }
}