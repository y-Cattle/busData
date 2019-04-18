<?php
require("conInit.php");//连接数据库

@$loginNum = trim($_POST['loginNum']);//接受参数 编号
@$phoneNumber = trim($_POST['number']); // 手机号码
@$openId = $_POST['openId'];// 用户唯一标示
@$nickName = trim($_POST['nickName']);// userInfo 里的 微信名称
@$nickName = iconv("UTF-8", "GB2312//IGNORE",$nickName);// 转码匹配sql编码格式
// $loginNum = "55";
// $phoneNumber = "55";
// $nickName = "55";
// $openId = 'otbcc5ELfsqwROta6vT9yb3ILgg0';

if( $conn == false)// 判断数据库连接
{
    echo "连接失败！";
    var_dump(sqlsrv_errors());
    exit;
}else if( isset($loginNum) && isset($phoneNumber) && isset($nickName) && isset($openId) ){

    $sql = "SELECT COUNT(loginNum) as total
             FROM [bus].[dbo].[user] where [openId] = '{$openId}'";//查询是否已有数据
    $obj = sqlsrv_query($conn,$sql,null);
    $result = sqlsrv_fetch_array($obj,SQLSRV_FETCH_ASSOC);

    //如果已有数据
    if( isset($result['total']) && $result['total'] >=1){
        //删除有关相应微信名的数据
        $sql = "delete FROM [bus].[dbo].[user]
                where [openId] = '{$openId}' ";
        $obj = sqlsrv_query($conn,$sql);

        //删除成功
        if($obj){           
            // var_dump($conn);
            //插入数据
            $sql = "INSERT INTO [bus].[dbo].[user]
                ([loginNum]
                ,[phoneNumber]
                ,[nickName]
                ,[openId])
            VALUES
                (?
                ,?
                ,?
                ,?)";
            $params = array($loginNum,$phoneNumber,$nickName,$openId);// 传参
            $stmt = sqlsrv_query($conn,$sql,$params); // 执行插入数据库，返回Boolean类型
            // print_r($stmt);
            if($stmt){
                echo '1';
            }else{
                echo '0';
            }

        }else{
            echo "删除失败！";
            var_dump(sqlsrv_errors());
            exit;
        }
    }else{ //如果没有数据（第一次插入），直接插入数据
        $sql = "INSERT INTO [bus].[dbo].[user]
                ([loginNum]
                ,[phoneNumber]
                ,[nickName]
                ,[openId])
            VALUES
                (?
                ,?
                ,?
                ,?)";
            $params = array($loginNum,$phoneNumber,$nickName,$openId);// 传参
            $stmt = sqlsrv_query($conn,$sql,$params); // 执行插入数据库，返回Boolean类型
            // print_r($stmt);
            if($stmt){
                echo '1';
            }else{
                echo '0';
            }
    }
}


