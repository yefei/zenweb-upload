# ZenWeb Upload module

[ZenWeb](https://www.npmjs.com/package/zenweb)

文件上传表单支持

## 演示
```ts
import { mapping } from 'zenweb';
import { Upload, UploadHelper } from '@zenweb/upload';

export class Controller {
  @mapping({ path: '/', method: 'POST' })
  post1(upload: Upload) {
    console.log(upload.fields); // 表单字段数据
    console.log(upload.files); // 文件列表
  }

  @mapping({ path: '/', method: 'POST' })
  post2(upload: UploadHelper) {
    console.log(upload.get({ age: '!int' })); // 表单字段数据转换&校验
    console.log(upload.file('name')); // 取得单个文件
  }
}
```
