<?php  
error_reporting(E_ALL^E_NOTICE);
header('Content-Type:text/html;charset=UTF-8');
require("conInit.php");


$postNum = trim($_POST['num']);
// $postNum = '05001730';
$avatar = $_POST['avatar'];
// $avatar = "22";
$dataNum = $_POST['dataNum'];

//创建日志存入数据
$fp = fopen('./log.txt','a+');   
fwrite($fp,var_export($postNum,true));   
fclose($fp);
//  eval('return '.iconv("GB2312//IGNORE", "UTF-8", var_export($arr,true)).';');
$json = "";
$data = array();
$n = '0';

    //自定义方法 传入一个关联数组  返回一个索引数组
    // function toIndexArr($arr){
    //     $i=0;
    //     foreach($arr as $key => $value){
    //         $newArr[$i] = $value;
    //         $i++;
    //     }
    //     return $newArr;
    // }


if( $conn == false)
{
    echo "连接失败！";
    var_dump(sqlsrv_errors());
    exit;
}else{
    // echo "pass";
    $sql = "SELECT TOP $dataNum [N]
      ,[Y]
      ,[SJXM]
      ,[SJYYQC]
      ,[ZXSQM]
      ,[YYSR]
      ,[YYRC]
      ,[BZJK]
      ,[GZR]
    FROM [bus].[dbo].[YSJHZ] WHERE [SJBH] like '{$postNum}' order by N desc, Y desc";
    $query = sqlsrv_query($conn,$sql,null);
    // print_r($query);
    // $query = iconv("utf-8", "gbk", $query);
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
        $row["avatar"] = $avatar; //传入微信头像地址
        $row["src"] = '/images/bg/bg'.$n.'.jpg'; //传入背景图片地址

        $n += 1;
        if($n >= 12){
            $n = 0;
        }
        $data[] = $row;

    }

    $json = json_encode($data,JSON_UNESCAPED_UNICODE);
    echo "{".'"user"'.":".$json."}";
}

