/// <reference types="@zenweb/result" />
import { Context } from '@zenweb/core';
import { init, inject, scope } from '@zenweb/inject';
import * as formidable from 'formidable';
import { TypeCastPickOption } from 'typecasts';
import { TypeCastHelper } from '@zenweb/helper';
import { FormidableResult, UploadOption } from "./types";

/**
 * 解析上传表单数据
 */
function formidableParse(ctx: Context, opt: UploadOption) {
  const form = formidable(opt);
  return new Promise<FormidableResult>((resolve, reject) => {
    form.parse(ctx.req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
}

/**
 * 表单上传
 */
@scope('request')
export class Upload implements FormidableResult {
  fields: formidable.Fields = {};
  files: formidable.Files = {};

  @init
  private async parse(ctx: Context, option: UploadOption) {
    if (ctx.is('multipart')) {
      try {
        const result = await formidableParse(ctx, option);
        this.fields = result.fields;
        this.files = result.files;
      } catch (err) {
        ctx.fail({
          code: option.errorCode,
          status: option.errorStatus,
          message: option.errorMessage,
        });
      }
    }
  }
}

@scope('request')
export class UploadHelper {
  @inject typeCastHelper: TypeCastHelper;
  @inject upload: Upload;

  get<O extends TypeCastPickOption>(fields: O) {
    return this.typeCastHelper.pick(this.upload.fields, fields);
  }

  file(name: string): formidable.File | undefined {
    return <formidable.File> this.upload.files[name];
  }
}
