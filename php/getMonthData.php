<?php
error_reporting(E_ALL^E_NOTICE);
header('Content-Type:text/html;charset=UTF-8');
require("conInit.php");

$postNum = trim($_POST['num']?$_POST['num']:null);//司机编号
// $postNum = "05000560";
$year = trim($_POST['year']?$_POST['year']:null);
$month = trim($_POST['month']?$_POST['month']:null);

$json = "";
$data = array();


if( $conn == false)
{
    echo "连接失败！";
    var_dump(sqlsrv_errors());
    exit;
}else{
    
    if($postNum != null && $year != null && $month !=null){
        $sql = "SELECT [N]
                ,[Y]
                ,[SJXM]
                ,[SJYYQC]
                ,[ZXSQM]
                ,[YYSR]
                ,[YYRC]
                ,[BZJK]
                ,[GZR]
                FROM [bus].[dbo].[YSJHZ] WHERE [SJBH] = '{$postNum}' AND [N] = '{$year}' AND [Y] = '{$month}' ";
        $query = sqlsrv_query($conn,$sql,null);

        if($query == false){
            die(print_r(sqlsrv_errors(),true));
        }
        while($row = sqlsrv_fetch_array($query,SQLSRV_FETCH_ASSOC)){
            //转码 各个数据 为utf-8
            $row["N"] = iconv("GB2312//IGNORE", "UTF-8",$row["N"]); //年
            $row["Y"] = iconv("GB2312//IGNORE", "UTF-8",$row["Y"]);//月
            $row["SJXM"] = iconv("GB2312//IGNORE", "UTF-8",$row["SJXM"]); //司机姓名
            $row["SJYYQC"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["SJYYQC"]),2); //实际营运圈次
            $row["ZXSQM"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["ZXSQM"]),2); //总行驶千米
            $row["YYSR"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["YYSR"]),2);//营运收入
            $row["YYRC"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["YYRC"]),2);//营运人次
            $row["BZJK"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["BZJK"]),2); //标准节亏
            $row["GZR"] = iconv("GB2312//IGNORE", "UTF-8",$row["GZR"]);//工作日

            $data[] = $row;

        }

        $json = json_encode($data,JSON_UNESCAPED_UNICODE);
        echo "{".'"user"'.":".$json."}";
        
        }else if($postNum == null){
            echo 1;//司机号码为空
        }else if($year == null){
            echo 2;//年为空
        }else if($month == null){
            echo 3;//月为空
        }
    
}




?>