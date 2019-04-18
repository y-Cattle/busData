<?php

    require("conInit.php");

    @$figureNum = $_REQUEST['figureNum'];
    @$loginNum = $_REQUEST['loginNum'];
    // $figureNum = '05000617';
    // $loginNum = '0';
    if($conn == false)// 判断数据库连接
{
    echo "连接失败！";
    var_dump(sqlsrv_errors());
    exit;
}else if($figureNum && $loginNum){

    $sql = "UPDATE [bus].[dbo].[user] SET [loginNum] = '{$figureNum}' WHERE [loginNum] = '{$loginNum}'  ";
    $obj = sqlsrv_query($conn,$sql,null);
    // var_dump($obj);
    if($obj){
        echo '1';
    }else{
        echo '0';
    }

}
