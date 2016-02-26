
import requests

from django.contrib.auth.models import User



AppID = "wx0572e52dc3d9139a"
AppSecret = "a9ca60ddeba44a9117a762ed173ac2ef"
AppToken = "WcZOZcHKAHOTMFq2"
EncodingAESKey = "yvpDlLluEoLEfPGeyFv2ygSjo6ufGp9mVutTrf8YqB1"

WX_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code"
WX_UINFO_URL = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s"


class WxBackend(object):

    def authenticate(self, code=None, state=None):
        print("WxBackend authenticate", code, state)

        ret = self.wx_auth(state, code)
        if ret:
            # username = weixin openid
            username, token  = ret["openid"], ret["access_token"]
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                info = self.get_wx_userinfo(username, token)
                #last_name = str(info.get("nickname", "").encode('Latin1'), "utf-8")
                user = User(username=username, password='NULL',
                                email=info.get("headimgurl", ""),
                                last_name = info.get("nickname", ""))
                user.save()
            return user

        return None


    def get_user(self, uid):
        try:
            return User.objects.get(pk=uid)
        except User.DoesNotExist:
            return None


    def wx_auth(self, state, code):
        t_url = WX_TOKEN_URL % (AppID, AppSecret, code)
        rep = requests.get(t_url)
        if not rep.ok:
            return False

        ret = rep.json()
        openid = ret.get("openid")
        if not openid:
            print("weixin auth fail:", ret)
            return False

        return ret


    def get_wx_userinfo(self, openid, token):
        rep = requests.get(WX_UINFO_URL % (token, openid))
        if rep.ok:
            rep.encoding = "utf-8"
            info = rep.json()
            err = info.get("errcode")
            if not err:
                return info
            else:
                print("get userinfo err:", info)



