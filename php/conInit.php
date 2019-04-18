<?php
header('Content-Type:text/html;charset=UTF-8');
$serverName = "localhost"; //数据库服务器地址
$uid = "sa";     //数据库用户名
$pwd = "sa"; //数据库密码
$connectionInfo = array("UID"=>$uid, "PWD"=>$pwd, "Database"=>"bus");
$conn = sqlsrv_connect($serverName, $connectionInfo);
