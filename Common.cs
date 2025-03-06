namespace FedPipelineApplication
{
    public static class Common
    {
        #region store procedures

        public const string app_Contracts_getSimpleSearch_UEI = "app_Contracts_getSimpleSearch_UEI";
        public const string app_Contracts_getAdvancedSearch_UEI = "app_Contracts_getAdvancedSearch_UEI";
        public const string crm_agency_list = "crm_agency_list";
        public const string app_GetAgencyCode = "app_GetAgencyCode";
        public const string app_GetDepartmentCode = "app_GetDepartmentCode";
        public const string app_getSocioEconomicList = "app_getSocioEconomicList";
        public const string app_getDUNSNaics = "app_getUEINaics";
        public const string app_getVendorSocioEconomicBusinessType = "app_getVendorSocioEconomicBusinessType";
        public const string app_GetUserInfo = "app_GetUserInfo";
        public const string app_InsertExcelReport = "app_InsertExcelReport";
        public const string app_GetUserReport = "app_GetUserReport";
        public const string app_GetVendorSummary = "app_GetVendorSummary_UEI";
        public const string app_GetVendorDetails = "app_GetVendorDetails_UEI";

        public const string app_getVendorContractDetails = "app_getVendorContractDetails_UEI";
        public const string app_getSocioEconomicBusinessTypeByDUNS = "app_getSocioEconomicBusinessTypeByUEI";

        public const string app_Contracts_GetContractSummaryHeaderInfo = "app_Contracts_GetContractSummaryHeaderInfo";

        public const string app_Login_GetRegLoginData = "app_Login_GetRegLoginData";
        public const string app_Login_Rfq_VerifyUserData = "app_Login_Rfq_VerifyUserData";
        public const string app_Payments_GetBillingData = "app_Payments_GetBillingData";
        public const string app_Registration_InsertContactData = "app_Registration_InsertContactData";
        public const string app_GetContractSummaryInfo = "app_GetContractSummaryInfo_UEI";
        public const string app_GetContractSummaryInfoByReferencedIDVID = "app_GetContractSummaryInfoByReferencedIDVID_UEI";
        public const string app_Vendor_getVendorName = "app_Vendor_getVendorName";
        public const string app_Vendor_getNameList = "app_Vendor_getNameList_UEI";
        public const string app_Vendor_getCageCode = "app_Vendor_getCageCode_UEI";
        public const string app_Vendor_GetSetAsideList = "app_Vendor_GetSetAsideList";
        public const string app_GetAgencyList = "app_GetAgencyList";
        public const string app_GetAwardValue = "GetAwardValue";
        public const string app_GetDepartmentList = "app_GetDepartmentList";
        public const string app_Report_Template = "Report_Template";

        public const string app_Vendor_getDuns = "app_Vendor_getUEI";
        public const string app_GetNaics = "app_GetNaics";
        public const string app_Payments_DeleteSelectedCoupon = "app_Payments_DeleteSelectedCoupon";
        public const string app_Payments_GetCouponData = "app_Payments_GetCouponData";
        public const string app_Payments_InsertCoupon = "app_Payments_InsertCoupon";
        public const string app_Payments_UpdateCoupon = "app_Payments_UpdateCoupon";
        public const string app_GetHelpingIcons = "app_GetHelpingIcons";
        public const string app_Dashboard_GetMarketContext = "app_Dashboard_GetMarketContext";
        public const string app_Dashboard_GetMarketContextMaster = "app_Dashboard_GetMarketContextMaster";
        public const string app_Dashboard_UpdateMarketContextUsage = "app_Dashboard_UpdateMarketContextUsage";
        public const string app_Dashboard_InsertMarketContext = "app_Dashboard_InsertMarketContext";
        public const string app_Dashboard_DeleteMarketContext = "app_Dashboard_DeleteMarketContext";
        public const string app_Dashboard_RemoveMarketContext = "app_Dashboard_RemoveMarketContext";
        public const string app_Login_GetLoginPaymentData = "app_Login_GetLoginPaymentData";
        public const string app_Login_UpdateUserOTP = "app_Login_UpdateUserOTP";
        public const string app_Registation_InsertRegistration = "app_Registration_InsertRegistration";
        public const string app_getLatest_User = "app_getLast_M_User";
        public const string app_InsertPublicUserRegistration = "app_InsertPublicUserRegistration";
        public const string app_Registration_UpdateRegistration = "app_Registration_UpdateRegistration";
        public const string app_getPublicUser = "app_getPublicUser";
        public const string app_UpdatePublicUserRegistration = "app_UpdatePublicUserRegistration";
        public const string crm_deal_insert = "crm_deal_insert";
        public const string crm_deal_update = "crm_deal_update";


        public const string app_InsertFeedback = "app_Help_InsertFeedback";
        public const string app_CheckUser = "app_Login_CheckUser";
        public const string app_Opportunity_GetBaseTypeList = "app_Opportunity_GetBaseTypeList";
        public const string app_GetPSCList = "app_GetPSCList";
        public const string app_GetSetAsideList = "app_GetSetAsideList";
        public const string app_Opportunity_GetSolicitationDetail = "app_Opportunity_GetSolicitationDetail";
        public const string app_PaymentsGetSubscriptionHistoryByPlanId = "app_PaymentsGetSubscriptionHistoryByPlanId";
        public const string app_Payments_GetUserSubscriptionData = "app_Payments_GetUserSubscriptionData";
        public const string app_Payments_InsertPayment = "app_Payments_InsertPayment";
        public const string app_Payments_InsertSubscriptionHistory = "app_Payments_InsertSubscriptionHistory";
        public const string app_Payments_UpdateSubscriptionHistory = "app_Payments_UpdateSubscriptionHistory";
        public const string app_Login_GetRegEmail = "app_Login_GetRegEmail";
        public const string app_GetOfficeList = "app_GetOfficeList";
        public const string app_GetSolicitationProcedureList = "app_GetSolicitationProcedureList";
        public const string app_Payments_DeleteSelectedSubscription = "app_Payments_DeleteSelectedSubscription";
        public const string app_Payments_GetSubscriptionData = "app_Payments_GetSubscriptionData";
        public const string app_Payments_InsertSubscription = "app_Payments_InsertSubscription";
        public const string app_Payments_UpdateSubscription = "app_Payments_UpdateSubscription";
        public const string app_Payments_GetSubscriptionHistoryData = "app_Payments_GetSubscriptionHistoryData";
        public const string app_Login_CheckPassword = "app_Login_CheckPassword";
        public const string app_Login_CheckUserdata = "app_Login_CheckUserdata"; 
        public const string app_Login_VerifyUserData = "app_Login_VerifyUserData";

        public const string app_Opportunity_GetOpportunityBySolicitationIdentifier = "app_Opportunity_GetOpportunityBySolicitationIdentifier";
        public const string app_Opportunity_GetOpportunityList = "app_Opportunity_GetOpportunityList";
        public const string app_Log_StoreErrorLog = "app_Log_StoreErrorLog";
        public const string app_OpportunityEmail = "app_OpportunityEmail";
        public const string app_Opportunity_GetRelatedVendors = "app_Opportunity_GetRelatedVendors_UEI";

        public const string app_VendorGetDUNSCage = "app_VendorGetDUNSCage";

        public const string app_GetOpportunityEmailList = "app_GetOpportunityEmailList";
        public const string app_DeleteOpportunityDailyEmail = "app_DeleteOpportunityDailyEmail";
        public const string app_Profile_SaveUserdata = "app_Profile_SaveUserdata";


        #endregion
    }
}