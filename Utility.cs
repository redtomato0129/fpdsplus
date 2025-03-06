using System;
using System.Data;
using System.Data.SqlClient;

namespace FedPipelineApplication
{

    public class Utility
    {
        //public static string conStr = (string)ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString;
        //string MainCon = ConfigurationManager.ConnectionStrings["PipelineDataConn"].ToString();
        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineConn"].ConnectionString);
        SqlConnection MainCon = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PipelineDataConn"].ConnectionString);

        //SqlConnection objCon = new SqlConnection(conStr);

        public DataSet getDataSet(string qry)
        {
            con.Open();
            SqlDataAdapter da = new SqlDataAdapter(qry, con);
            DataSet ds = new DataSet();
            da.Fill(ds, "data");
            con.Close();
            return ds;
        }

        public DataSet getDataSet_SP(SqlCommand cmd)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            cmd.Connection = MainCon;
            cmd.CommandType = CommandType.StoredProcedure;
            da.SelectCommand = cmd;
            da.Fill(ds, "data");
            return ds;
        }

        public int insertExecuteNonQuery(string qry)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand(qry, con);
            int result = cmd.ExecuteNonQuery();
            con.Close();
            return result;
        }

        public int insertExecuteNonQuery_SP(SqlCommand cmd)
        {
            con.Open();
            //SqlCommand cmd = new SqlCommand(qry, con);
            int result = cmd.ExecuteNonQuery();
            con.Close();
            return result;
        }

        public int updateExecuteNonQuery_SP(SqlCommand cmd)
        {
            con.Open();
            //SqlCommand cmd = new SqlCommand(qry, con);
            int result = cmd.ExecuteNonQuery();
            con.Close();
            return result;
        }
        public int insertExecuteScalar(string qry)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand(qry, con);
            int result = Convert.ToInt32(cmd.ExecuteScalar());
            con.Close();
            return result;
        }

        public int getID(string qry)
        {
            DataSet ds = new DataSet();
            ds = getDataSet(qry);
            DataRowView rw = ds.Tables["data"].DefaultView[0];
            int id = Convert.ToInt32(rw["p_id"]);
            return id;
        }
        public string getCode(string qry)
        {
            DataSet ds = new DataSet();
            ds = getDataSet(qry);
            DataRowView rw = ds.Tables["data"].DefaultView[0];
            string Code = rw["p_Code"].ToString();
            return Code;
        }

    }
}