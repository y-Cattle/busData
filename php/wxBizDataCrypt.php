<?php

/**
 * 对微信小程序用户加密数据的解密示例代码.
 *
 * @copyright Copyright (c) 1998-2014 Tencent Inc.
 */


include_once "errorCode.php";


class WXBizDataCrypt
{
    private $appid;
	private $sessionKey;

	/**
	 * 构造函数
	 * @param $sessionKey string 用户在小程序登录后获取的会话密钥
	 * @param $appid string 小程序的appid
	 */
	public function WXBizDataCrypt( $appid, $sessionKey)
	{
		$this->sessionKey = $sessionKey;
		$this->appid = $appid;
	}


	/**
	 * 检验数据的真实性，并且获取解密后的明文.
	 * @param $encryptedData string 加密的用户数据
	 * @param $iv string 与用户数据一同返回的初始向量
	 * @param $data string 解密后的原文
     *
	 * @return int 成功0，失败返回对应的错误码
	 */
	public function decryptData( $encryptedData, $iv, &$data )
	{	 //如果不是24位，就是非法
		if (strlen($this->sessionKey) != 24) {
			return ErrorCode::$IllegalAesKey;
		}
		//sessionKey在传输前base64加密，所以要base64解密
		$aesKey=base64_decode($this->sessionKey);

        //如果不是24位，就是非法
		if (strlen($iv) != 24) {
			return ErrorCode::$IllegalIv;
		}
		 //IV在传输前base64加密，所以要base64解密
		$aesIV=base64_decode($iv);
		 //encryptedData在传输前base64加密，所以要base64解密
		$aesCipher=base64_decode($encryptedData);

		$result=openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);
		
		//把结果转换为数据对象
		$dataObj=json_decode( $result );
		 //如果错误结果为空，返回非法密文
		if( $dataObj  == NULL )
		{
			return ErrorCode::$IllegalBuffer;
		}
		//如果数据对象的appid不对，返回非法密文
		if( $dataObj->watermark->appid != $this->appid )
		{
			return ErrorCode::$IllegalBuffer;
		}
		//指针$data获取值
		$data = $result;
		return ErrorCode::$OK;
	}

}

