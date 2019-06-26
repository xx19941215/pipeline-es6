pipeline-es6
============
使用E6S编写的一个类似laravel的pipeline模块.

## 安装

  ```shell
  $ npm install pipeline-es6
  ```

## 基本用法
```javascript
import {
    Pipeline
} from './node_modules/pipeline-es6/pipeline.js';


class VerifyCsrfToken {
    handle(req, next) {
        console.log("验证Csrf-Token");
        if (req == 'csrf') {
            console.log('请求非法');
        } else {
            next(req);
        }
    }
}

class ShareErrorsFromSession {
    handle(req, next) {
        console.log("如果session中有'errors'变量，则共享它");
        next(req);
    }
}

class StartSession {
    handle(req, next) {
        console.log("开启session,获取数据");
        next(req);
        console.log("保存数据，关闭session");
    }
}

class AddQueuedCookiesToResponse {
    handle(req, next) {
        next(req);
        console.log("添加下一次请求需要的cookie");
    }
}

class EncryptCookies {
    handle(req, next) {
        console.log("对输入请求的cookie进行解密");
        next(req);
        console.log("对输出响应的cookie进行加密");
    }
}

class ChecKForMaintenanceMode {
    handle(req, next) {
        console.log("确定当前程序是否处于维护状态");
        next(req);
    }
}

let pipes = {
    'VerifyCsrfToken': (req, stack) => {
        return (new VerifyCsrfToken).handle(req, stack)
    },
    'ShareErrorsFromSession': (req, stack) => {
        return (new ShareErrorsFromSession).handle(req, stack)
    },
    'StartSession': (req, stack) => {
        return (new StartSession).handle(req, stack)
    },
    'AddQueuedCookiesToResponse': (req, stack) => {
        return (new AddQueuedCookiesToResponse).handle(req, stack)
    },
    'EncryptCookies': (req, stack) => {
        return (new EncryptCookies).handle(req, stack)
    },
    'ChecKForMaintenanceMode': (req, stack) => {
        return (new ChecKForMaintenanceMode).handle(req, stack)
    },
}


let req = '请求';

let firstSlice = () => {
    console.log("请求向路由器传递，返回响应")
}

(new Pipeline(req, pipes)).then(firstSlice);
```


# License

MIT