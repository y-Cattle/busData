<?php
    error_reporting(E_ALL^E_NOTICE);
    header('Content-Type:text/html;charset=UTF-8');
    require("conInit.php");

    //获取初始数据
    $postNum = trim($_POST['num']?$_POST['num']:null);//司机编号
    // $postNum = "05000560";
    $year = trim($_POST['year']?$_POST['year']:null);
    $month = trim($_POST['month']?$_POST['month']:null);
    $day = trim($_POST['day']?$_POST['day']:null);

    $json = "";//接受返回后数据字符串
    $data = array();// 接收数据的数组


    if( $conn == false){
        echo "连接失败！";
        var_dump(sqlsrv_errors());
        exit;
    }else{
        if(isset($day) && $day != null && $postNum != null && $year != null && $month !=null){
            $sql = "SELECT [N]
                    ,[Y]
                    ,[R]
                    ,[SJXM]
                    ,[SJYYQC]
                    ,[ZXSQM]
                    ,[YYSR]
                    ,[YYRC]
                    ,[BZJK]
                    FROM [bus].[dbo].[RSJHZ] WHERE [SJBH] = '{$postNum}' AND [N] = '{$year}' AND [Y] = '{$month}' AND [R] = '{$day}' ";
            $obj = sqlsrv_query($conn,$sql);
            if($obj == false){
                echo "wrong";
                die(print_r(sqlsrv_errors(),true));
            }

            //循环查询结果的关联数组，
            while($row = sqlsrv_fetch_array($obj,SQLSRV_FETCH_ASSOC)){
                //转码 各个数据 为utf-8
                $row["N"] = iconv("GB2312//IGNORE", "UTF-8",$row["N"]);// 年
                $row["Y"] = iconv("GB2312//IGNORE", "UTF-8",$row["Y"]);// 月
                $row["R"] = iconv("GB2312//IGNORE", "UTF-8",$row["R"]);// 日
                $row["SJXM"] = iconv("GB2312//IGNORE", "UTF-8",$row["SJXM"]);//司机姓名
                $row["SJYYQC"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["SJYYQC"]),2);//实际营运圈次
                $row["ZXSQM"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["ZXSQM"]),2);// 总行驶千米
                $row["YYSR"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["YYSR"]),2);// 营运收入
                $row["YYRC"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["YYRC"]),2);// 营运人次
                $row["BZJK"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["BZJK"]),2);//标准节亏 
                // $row["ZXSSJ"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["ZXSSJ"]),2);//总行驶时间 
                // $row["KSSJ"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["KSSJ"]),2);//空驶时间
                // $row["YYSJ"] = round(iconv("GB2312//IGNORE", "UTF-8",$row["YYSJ"]),2);//营运时间  

                $data[] = $row;
            }
            // print_r($data) ;
            $json = json_encode($data,JSON_UNESCAPED_UNICODE);
            // echo "<br>";
            echo "{".'"user"'.":".$json."}";

        }else if($day == null){
            echo 1; //天数为空
        }else if($postNum == null){
            echo 2;//司机号码为空
        }else if($year == null){
            echo 3;//年为空
        }else if($month == null){
            echo 4;//月为空
        }
    }

?>