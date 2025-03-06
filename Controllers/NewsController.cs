using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.IO;
using System.Web.Hosting;

namespace FedPipelineApplication.Controllers
{
    public class NewsController : Controller
    {
        Utility obj = new Utility();
        SendEmail mail = new SendEmail();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        // GET: News
        public ActionResult Index()
        {
            return View();
        }

        public string NewsAdd(NewsDetails News)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;
            DateTime dt = DateTime.Now;
            string time = dt.ToShortTimeString();
            var dateAndTime = News.created_datetime + " " + time;
            News.created_datetime = dateAndTime.ToString();
            string Error = "";

            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
           
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand("crm_news_insert", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@section_type", News.section_type);
                        cmd.Parameters.AddWithValue("@people_id", DBNull.Value);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        cmd.Parameters.AddWithValue("@activity_id", DBNull.Value);
                        cmd.Parameters.AddWithValue("@news_post", News.news_post);
                        cmd.Parameters.AddWithValue("@deal_id", News.deal_id);
                        cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                        result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string GetNewsByID(int newsId)
        {
            List<NewsListDetails> newsList = new List<NewsListDetails>();
            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_get", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@news_id", newsId);
                    cmd.Parameters.AddWithValue("@user_id", UserID);
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsListDetails newsObject = new NewsListDetails();
                            newsObject.section_type = (dr2["section_type"].ToString());
                            newsObject.news_post = (dr2["news_post"].ToString());
                            newsObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            newsObject.deal_id = Convert.ToInt32(dr2["deal_id"]);
                            newsObject.created_datetime = (dr2["created_datetime"].ToString());
                            newsList.Add(newsObject);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(newsList);

        }

        public string GetNewsByUserID(int count)
        {
            List<NewsListDetails> newsList = new List<NewsListDetails>();
            string UserID = Session["User_ID"].ToString();
            string UserDomain = Session["User_Domain"].ToString();
            string sp = string.Empty;
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();

                if (count ==0)
                {
                    sp = "crm_news_get_by_user_id";
                } else
                {
                    sp = "crm_news_recent_get_by_user_id";
                }
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@user_id", UserID);
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                    if (count != 0)
                    {
                        cmd.Parameters.AddWithValue("@count", count);
                    }
                  
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsListDetails newsObject = new NewsListDetails();
                            newsObject.section_type = (dr2["section_type"].ToString());
                            newsObject.news_post = (dr2["news_post"].ToString());
                            newsObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            newsObject.deal_id = Convert.ToInt32(dr2["deal_id"]);
                            newsObject.created_datetime = (dr2["created_datetime"].ToString());
                            newsObject.firstName = (dr2["User_FirstName"].ToString());
                            newsObject.lastName = (dr2["User_LastName"].ToString());
                            newsObject.company = (dr2["User_Company"].ToString());
                            newsObject.email = (dr2["User_Email"].ToString());
                            newsObject.news_id = Convert.ToInt32((dr2["news_id"]));
                            newsObject.total_comments = Convert.ToInt32((dr2["total_comment"]));
                            newsObject.total_attachments = Convert.ToInt32((dr2["total_attachment"]));
                            newsObject.title = (dr2["title"].ToString());
                            newsObject.status = (dr2["status"].ToString());
                            newsObject.rfp_release_date = (dr2["rfp_release_date"].ToString());
                            newsList.Add(newsObject);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(newsList);

        }


        public string GetRecentNews( int count)
        {
            string UserDomain = Session["User_Domain"].ToString();
            List<NewsListDetails> newsList = new List<NewsListDetails>();
           // List<NewsCommentsDetails> commentsList = new List<NewsCommentsDetails>();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_most_recent", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                   
                    cmd.Parameters.AddWithValue("@count", count);
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsListDetails newsObject = new NewsListDetails();
                            newsObject.section_type = (dr2["section_type"].ToString());
                            newsObject.news_post = (dr2["news_post"].ToString());
                            newsObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            newsObject.deal_id = Convert.ToInt32(dr2["deal_id"]);
                            newsObject.created_datetime = (dr2["created_datetime"].ToString());
                            newsObject.firstName = (dr2["User_FirstName"].ToString());
                            newsObject.lastName = (dr2["User_LastName"].ToString());
                            newsObject.company = (dr2["User_Company"].ToString());
                            newsObject.email = (dr2["User_Email"].ToString());
                            newsObject.news_id = Convert.ToInt32((dr2["news_id"]));
                            newsObject.total_comments = Convert.ToInt32((dr2["total_comment"]));
                            newsObject.total_attachments = Convert.ToInt32((dr2["total_attachment"]));
                            newsObject.title = (dr2["title"].ToString());
                            newsObject.status = (dr2["status"].ToString());
                            newsObject.rfp_release_date = (dr2["rfp_release_date"].ToString());
                            newsList.Add(newsObject);
                        }
                    }
                    
                    foreach (NewsListDetails news in newsList)
                    {
                        news.comments = new List<NewsCommentsDetails>();
                        using (SqlCommand cmdComments = new SqlCommand("crm_news_comments_recent_get_by_news_id", con))
                        {
                            cmdComments.CommandType = CommandType.StoredProcedure;
                            cmdComments.Parameters.AddWithValue("@news_id", news.news_id);
                            cmdComments.Parameters.AddWithValue("@count", 1);
                          
                            DataSet dsComment = obj.getDataSet_SP(cmdComments);
                            if (dsComment.Tables["data"].Rows.Count > 0)
                            {
                                foreach (DataRow dr3 in dsComment.Tables["data"].Rows)
                                {
                                    NewsCommentsDetails commentObject = new NewsCommentsDetails();
                                    commentObject.reply = new List<NewsCommentsReplyDetails>();
                                    commentObject.comment = (dr3["comment"].ToString());
                                    // news.news_id = Convert.ToInt32(dr3["news_id"]);
                                    commentObject.created_datetime = (dr3["created_datetime"].ToString());
                                    commentObject.firstName = (dr3["User_FirstName"].ToString());
                                    commentObject.lastName = (dr3["User_LastName"].ToString());
                                    commentObject.company = (dr3["User_Company"].ToString());
                                    commentObject.email = (dr3["User_Email"].ToString());
                                    commentObject.total_comment = Convert.ToInt32(dr3["total_comment"]);
                                    commentObject.news_id = Convert.ToInt32(dr3["news_id"]);
                                    commentObject.user_id = Convert.ToInt32(dr3["user_id"]);
                                    commentObject.comment_id = Convert.ToInt32(dr3["comment_id"]);                                   
                                    using (SqlCommand cmdReply = new SqlCommand("crm_news_comments_reply_get_by_comments_id", con))
                                    {
                                        cmdReply.CommandType = CommandType.StoredProcedure;
                                        cmdReply.Parameters.AddWithValue("@comment_id", commentObject.comment_id);
                                        DataSet dsReply = obj.getDataSet_SP(cmdReply);
                                        if (dsReply.Tables["data"].Rows.Count > 0)
                                        {
                                            foreach (DataRow dr4 in dsReply.Tables["data"].Rows)
                                            {
                                                NewsCommentsReplyDetails replyObject = new NewsCommentsReplyDetails();
                                                replyObject.reply_id = Convert.ToInt32(dr4["reply_id"]);
                                                replyObject.user_id = Convert.ToInt32(dr4["user_id"]);
                                                replyObject.reply = (dr4["reply"].ToString());
                                                replyObject.created_datetime = (dr4["created_datetime"].ToString());
                                                replyObject.comment_id = Convert.ToInt32(dr4["comment_id"]);
                                                replyObject.firstName = (dr4["User_FirstName"].ToString());
                                                replyObject.lastName = (dr4["User_LastName"].ToString());
                                                replyObject.company = (dr4["User_Company"].ToString());
                                                replyObject.email = (dr4["User_Email"].ToString());
                                                commentObject.reply.Add(replyObject);
                                            }
                                        }
                                    }
                                    news.comments.Add(commentObject);
                                }
                            }
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(newsList);

        }
        public string GetNewsByDealId(int dealId)
        {
            List<NewsListDetails> newsList = new List<NewsListDetails>();
            string UserDomain = Session["User_Domain"].ToString();
            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_get_by_deal_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@deal_id", dealId);
                    cmd.Parameters.AddWithValue("@user_domain", UserDomain);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsListDetails newsObject = new NewsListDetails();
                            newsObject.section_type = (dr2["section_type"].ToString());
                            newsObject.news_post = (dr2["news_post"].ToString());
                            newsObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            newsObject.deal_id = Convert.ToInt32(dr2["deal_id"]);
                            newsObject.created_datetime = (dr2["created_datetime"].ToString());
                            newsObject.firstName = (dr2["User_FirstName"].ToString());
                            newsObject.lastName = (dr2["User_LastName"].ToString());
                            newsObject.company = (dr2["User_Company"].ToString());
                            newsObject.email = (dr2["User_Email"].ToString());
                            newsObject.news_id = Convert.ToInt32((dr2["news_id"]));
                            newsObject.total_comments = Convert.ToInt32((dr2["total_comment"]));
                            newsObject.total_attachments= Convert.ToInt32((dr2["total_attachment"]));
                            newsObject.title = (dr2["title"].ToString());
                            newsObject.status = (dr2["status"].ToString());
                            newsObject.rfp_release_date = (dr2["rfp_release_date"].ToString());
                            newsList.Add(newsObject);
                        }
                        foreach (NewsListDetails news in newsList)
                        {
                            news.comments = new List<NewsCommentsDetails>();
                            using (SqlCommand cmdComments = new SqlCommand("crm_news_comments_recent_get_by_news_id", con))
                            {
                                cmdComments.CommandType = CommandType.StoredProcedure;
                                cmdComments.Parameters.AddWithValue("@news_id", news.news_id);
                                cmdComments.Parameters.AddWithValue("@count", 1);

                                DataSet dsComment = obj.getDataSet_SP(cmdComments);
                                if (dsComment.Tables["data"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr3 in dsComment.Tables["data"].Rows)
                                    {
                                        NewsCommentsDetails commentObject = new NewsCommentsDetails();
                                        commentObject.reply = new List<NewsCommentsReplyDetails>();
                                        commentObject.comment = (dr3["comment"].ToString());
                                        // news.news_id = Convert.ToInt32(dr3["news_id"]);
                                        commentObject.created_datetime = (dr3["created_datetime"].ToString());
                                        commentObject.firstName = (dr3["User_FirstName"].ToString());
                                        commentObject.lastName = (dr3["User_LastName"].ToString());
                                        commentObject.company = (dr3["User_Company"].ToString());
                                        commentObject.email = (dr3["User_Email"].ToString());
                                        commentObject.total_comment = Convert.ToInt32(dr3["total_comment"]);
                                        commentObject.news_id = Convert.ToInt32(dr3["news_id"]);
                                        commentObject.user_id = Convert.ToInt32(dr3["user_id"]);
                                        commentObject.comment_id = Convert.ToInt32(dr3["comment_id"]);
                                        using (SqlCommand cmdReply = new SqlCommand("crm_news_comments_reply_get_by_comments_id", con))
                                        {
                                            cmdReply.CommandType = CommandType.StoredProcedure;
                                            cmdReply.Parameters.AddWithValue("@comment_id", commentObject.comment_id);
                                            DataSet dsReply = obj.getDataSet_SP(cmdReply);
                                            if (dsReply.Tables["data"].Rows.Count > 0)
                                            {
                                                foreach (DataRow dr4 in dsReply.Tables["data"].Rows)
                                                {
                                                    NewsCommentsReplyDetails replyObject = new NewsCommentsReplyDetails();
                                                    replyObject.reply_id = Convert.ToInt32(dr4["reply_id"]);
                                                    replyObject.user_id = Convert.ToInt32(dr4["user_id"]);
                                                    replyObject.reply = (dr4["reply"].ToString());
                                                    replyObject.created_datetime = (dr4["created_datetime"].ToString());
                                                    replyObject.comment_id = Convert.ToInt32(dr4["comment_id"]);
                                                    replyObject.firstName = (dr4["User_FirstName"].ToString());
                                                    replyObject.lastName = (dr4["User_LastName"].ToString());
                                                    replyObject.company = (dr4["User_Company"].ToString());
                                                    replyObject.email = (dr4["User_Email"].ToString());
                                                    commentObject.reply.Add(replyObject);
                                                }
                                            }
                                        }
                                        news.comments.Add(commentObject);
                                    }
                                }
                            }
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(newsList);

        }

        public string Search(string searchtxt, int userId)
        {

            List<NewsDetails> GetSearchData = new List<NewsDetails>();



            using (SqlConnection con = new SqlConnection(MainCon))
            {


                SqlCommand cmd1 = new SqlCommand("crm_news_search", con);
                cmd1.CommandType = CommandType.StoredProcedure;
                cmd1.Parameters.AddWithValue("@search_text", searchtxt);
                cmd1.Parameters.AddWithValue("@user_id", userId);

                con.Open();
                SqlDataReader rdr = cmd1.ExecuteReader();
                while (rdr.Read())
                {
                    NewsDetails newsObject = new NewsDetails();
                    newsObject.section_type = (rdr["section_type"].ToString());
                    newsObject.news_post = (rdr["news_post"].ToString());
                    newsObject.user_id = Convert.ToInt32((rdr["user_id"]));
                    newsObject.deal_id = Convert.ToInt32(rdr["deal_id"]);
                    newsObject.created_datetime = (rdr["created_datetime"].ToString());
                    GetSearchData.Add(newsObject);
                }
            }

            con.Close();
            return new JavaScriptSerializer().Serialize(GetSearchData);
        }

        public string AddComment(NewsCommentsDetails comment)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;


            string Error = "";

            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("crm_news_comments_insert", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@news_id", comment.news_id);
                        cmd.Parameters.AddWithValue("@comment", comment.comment);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }

        public string GetComments(int newsId)
        {
            List<NewsCommentsDetails> commentList = new List<NewsCommentsDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_comments_get_by_news_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@news_id", newsId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsCommentsDetails commentObject = new NewsCommentsDetails();
                            commentObject.reply = new List<NewsCommentsReplyDetails>();
                            commentObject.comment = (dr2["comment"].ToString());
                            commentObject.news_id = Convert.ToInt32(dr2["news_id"]);
                            commentObject.created_datetime = (dr2["created_datetime"].ToString());
                            commentObject.firstName = (dr2["User_FirstName"].ToString());
                            commentObject.lastName = (dr2["User_LastName"].ToString());
                            commentObject.company = (dr2["User_Company"].ToString());
                            commentObject.email = (dr2["User_Email"].ToString());
                            commentObject.comment_id = Convert.ToInt32(dr2["comment_id"]);
                            using (SqlCommand cmdReply = new SqlCommand("crm_news_comments_reply_get_by_comments_id", con))
                            {
                                cmdReply.CommandType = CommandType.StoredProcedure;
                                cmdReply.Parameters.AddWithValue("@comment_id", commentObject.comment_id);
                                DataSet dsReply = obj.getDataSet_SP(cmdReply);
                                if (dsReply.Tables["data"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr4 in dsReply.Tables["data"].Rows)
                                    {
                                        NewsCommentsReplyDetails replyObject = new NewsCommentsReplyDetails();
                                        replyObject.reply_id = Convert.ToInt32(dr4["reply_id"]);
                                        replyObject.user_id = Convert.ToInt32(dr4["user_id"]);
                                        replyObject.reply = (dr4["reply"].ToString());
                                        replyObject.created_datetime = (dr4["created_datetime"].ToString());
                                        replyObject.comment_id = Convert.ToInt32(dr4["comment_id"]);
                                        replyObject.firstName = (dr4["User_FirstName"].ToString());
                                        replyObject.lastName = (dr4["User_LastName"].ToString());
                                        replyObject.company = (dr4["User_Company"].ToString());
                                        replyObject.email = (dr4["User_Email"].ToString());
                                        commentObject.reply.Add(replyObject);
                                    }
                                }
                            }
                            commentList.Add(commentObject);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(commentList);
        }

        public string GetRecentComments(int newsId)
        {
            List<NewsCommentsDetails> commentList = new List<NewsCommentsDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_comments_recent_get_by_news_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@news_id", newsId);
                    cmd.Parameters.AddWithValue("@count", 1);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsCommentsDetails commentObject = new NewsCommentsDetails();

                            commentObject.comment = (dr2["comment"].ToString());
                            commentObject.reply = new List<NewsCommentsReplyDetails>();
                            commentObject.news_id = Convert.ToInt32(dr2["news_id"]);
                            commentObject.created_datetime = (dr2["created_datetime"].ToString());
                            commentObject.firstName = (dr2["User_FirstName"].ToString());
                            commentObject.lastName = (dr2["User_LastName"].ToString());
                            commentObject.company = (dr2["User_Company"].ToString());
                            commentObject.email = (dr2["User_Email"].ToString());
                            commentObject.total_comment = Convert.ToInt32(dr2["total_comment"]);
                            commentObject.comment_id = Convert.ToInt32(dr2["comment_id"]);
                            using (SqlCommand cmdReply = new SqlCommand("crm_news_comments_reply_get_by_comments_id", con))
                            {
                                cmdReply.CommandType = CommandType.StoredProcedure;
                                cmdReply.Parameters.AddWithValue("@comment_id", commentObject.comment_id);
                                DataSet dsReply = obj.getDataSet_SP(cmdReply);
                                if (dsReply.Tables["data"].Rows.Count > 0)
                                {
                                    foreach (DataRow dr4 in dsReply.Tables["data"].Rows)
                                    {
                                        NewsCommentsReplyDetails replyObject = new NewsCommentsReplyDetails();
                                        replyObject.reply_id = Convert.ToInt32(dr4["reply_id"]);
                                        replyObject.user_id = Convert.ToInt32(dr4["user_id"]);
                                        replyObject.reply = (dr4["reply"].ToString());
                                        replyObject.created_datetime = (dr4["created_datetime"].ToString());
                                        replyObject.comment_id = Convert.ToInt32(dr4["comment_id"]);
                                        replyObject.firstName = (dr4["User_FirstName"].ToString());
                                        replyObject.lastName = (dr4["User_LastName"].ToString());
                                        replyObject.company = (dr4["User_Company"].ToString());
                                        replyObject.email = (dr4["User_Email"].ToString());
                                        commentObject.reply.Add(replyObject);
                                    }
                                }
                            }
                            commentList.Add(commentObject);
                        }

                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(commentList);
        }

        public string AddDocument(NewsDocumentsDetails document)
        {
            string response = string.Empty;
            string fileName = string.Empty;
            string filenamesaved = string.Empty;

            var error = string.Empty;
            var dateAndTime = DateTime.Now;
            document.document_datetime = dateAndTime.ToString();
            if (Request.Files.Count > 0)
            {
                int result;

                string UserID = Session["User_ID"].ToString();
                HttpFileCollectionBase files = Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    string filePath = Server.MapPath("~/UploadFiles/");
                    HttpPostedFileBase file = files[i];
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    filenamesaved = file.FileName;
                    fileName = filePath + file.FileName;
                    file.SaveAs(fileName);
                }
                try
                {
                    using (SqlConnection con = new SqlConnection(MainCon))
                    {
                        con.Open();
                        using (SqlCommand cmd = new SqlCommand("crm_news_document_insert", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@news_id", document.news_id);
                            cmd.Parameters.AddWithValue("@note", document.note);
                            cmd.Parameters.AddWithValue("@file_name", filenamesaved);
                            cmd.Parameters.AddWithValue("@user_id", UserID);
                            result = obj.insertExecuteNonQuery_SP(cmd);
                            if (result > 0)
                            {
                                response = "Success";
                            }
                            else
                                response = "fail";

                        }
                        con.Close();
                    }
                }
                catch (Exception ex)
                {
                    response = "fail";
                    error = ex.Message;
                }
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }


        public string GetDocuments(int newsId)
        {
            List<NewsDocumentsDetails> documentList = new List<NewsDocumentsDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_documents_get_by_news_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@news_id", newsId);

                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsDocumentsDetails documentObject = new NewsDocumentsDetails();

                            documentObject.note = (dr2["note"].ToString());
                            documentObject.file_name = (dr2["file_name"].ToString());
                            //  documentObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            documentObject.news_id = Convert.ToInt32(dr2["news_id"]);
                            documentObject.document_datetime = (dr2["document_datetime"].ToString());
                            documentObject.firstName = (dr2["User_FirstName"].ToString());
                            documentObject.lastName = (dr2["User_LastName"].ToString());
                            documentObject.company = (dr2["User_Company"].ToString());
                            documentObject.email = (dr2["User_Email"].ToString());
                            documentList.Add(documentObject);
                        }
                    }

                }

                con.Close();
            }
            return new JavaScriptSerializer().Serialize(documentList);
        }

        public string AddCommentReply(NewsCommentsReplyDetails reply)
        {
            int result = 0;
            var sp = string.Empty;
            var error = string.Empty;
            var response = string.Empty;


            string Error = "";

            string UserID = Session["User_ID"].ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(MainCon))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("crm_news_comments_reply_insert", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@comment_id", reply.comment_id);
                        cmd.Parameters.AddWithValue("@reply", reply.reply);
                        cmd.Parameters.AddWithValue("@user_id", UserID);
                        result = obj.insertExecuteNonQuery_SP(cmd);
                        if (result > 0)
                        {
                            response = "Success";
                        }
                        else
                            response = "fail";

                    }
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                response = "fail";
                error = ex.Message;
            }
            return new JavaScriptSerializer().Serialize(new { response, error });
        }
        public string GetCommentReply(int commentId)
        {
            List<NewsCommentsReplyDetails> replyList = new List<NewsCommentsReplyDetails>();

            using (SqlConnection con = new SqlConnection(MainCon))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("crm_news_comments_reply_get_by_comments_id", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@comment_id", commentId);
                    DataSet ds = obj.getDataSet_SP(cmd);
                    if (ds.Tables["data"].Rows.Count > 0)
                    {
                        foreach (DataRow dr2 in ds.Tables["data"].Rows)
                        {
                            NewsCommentsReplyDetails replyObject = new NewsCommentsReplyDetails();

                            replyObject.reply = (dr2["reply"].ToString());
                            replyObject.created_datetime = (dr2["created_datetime"].ToString());
                            replyObject.user_id = Convert.ToInt32((dr2["user_id"]));
                            replyObject.comment_id = Convert.ToInt32(dr2["comment_id"]);
                            replyList.Add(replyObject);
                        }
                    }
                }
                con.Close();
            }
            return new JavaScriptSerializer().Serialize(replyList);
        }

        public string DownloadFile(string filename)
        {
            //filename = "VPN_Setup.txt";

            string query = Request.QueryString[0];

            //Set the File Folder Path.
            //string path = HttpContext.Current.Server.MapPath("~/Files/");
            string path = HostingEnvironment.MapPath("~/UploadFiles/");
            //Read the File as Byte Array.


            byte[] bytes = System.IO.File.ReadAllBytes(path + filename);

            //Convert File to Base64 string and send to Client.
            return Convert.ToBase64String(bytes, 0, bytes.Length);
        }
        public class NewsDetails
        {
            public int news_id { get; set; }
            public string section_type { get; set; }
            public string news_post { get; set; }
            public string created_datetime { get; set; }
            public int user_id { get; set; }
            public int people_id { get; set; }
            public int deal_id { get; set; }
            public int activity_id { get; set; }

        }

        public class NewsListDetails
        {
            public int news_id { get; set; }
            public string section_type { get; set; }
            public string news_post { get; set; }
            public string created_datetime { get; set; }
            public int user_id { get; set; }
            public int people_id { get; set; }
            public int deal_id { get; set; }
            public int activity_id { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string company { get; set; }
            public string email { get; set; }
            public int total_comments { get; set; }
            public int total_attachments { get; set; }
            public string title { get; set; }
            public string status { get; set; }
            public string rfp_release_date { get; set; }
           // public int comment_total_comment { get; set; }
            public List<NewsCommentsDetails> comments { get; set; }
         
        }

        public class NewsCommentsDetails
        {
            public int comment_id { get; set; }
            public string comment { get; set; }
            public string created_datetime { get; set; }
            public int user_id { get; set; }
            public int news_id { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string company { get; set; }
            public string email { get; set; }
            public int total_comment { get; set; }
            public List<NewsCommentsReplyDetails>  reply { get; set; }

    }

        public class NewsCommentsReplyDetails
        {
            public int reply_id { get; set; }
            public int comment_id { get; set; }
            public string reply { get; set; }
            public string created_datetime { get; set; }
            public int user_id { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string company { get; set; }
            public string email { get; set; }
        }

        public class NewsDocumentsDetails
        {
            public int news_document_id { get; set; }
            public string document_datetime { get; set; }
            public string note { get; set; }
            public string file_name { get; set; }
            public int user_id { get; set; }
            public int news_id { get; set; }

            public string firstName { get; set; }
            public string lastName { get; set; }
            public string company { get; set; }
            public string email { get; set; }


        }

    }
}