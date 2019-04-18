<?php

require("conInit.php");

@$nickName = $_POST['nickName'];
@$openId = $_POST['openId'];
$nickName = iconv("UTF-8", "GB2312//IGNORE",$nickName);

if( $conn == false)// 判断数据库连接
{
    echo "连接失败！";
    var_dump(sqlsrv_errors());
    exit;
}else if( isset($nickName) && isset($openId) ){

    $sql = "SELECT [loginNum] 
	FROM [bus].[dbo].[user]
	WHERE [openId] = '{$openId}'";
    $obj = sqlsrv_query($conn,$sql,null);
    // var_dump($obj);
    if($obj){
        $res = sqlsrv_fetch_array($obj,SQLSRV_FETCH_ASSOC);
        // print_r($res);
        $json = json_encode($res);
        echo "{".'"num"'.":".$json."}";
    }else{
        echo '0';
    }

}
