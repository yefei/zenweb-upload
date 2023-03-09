import { scope } from "@zenweb/inject";
import { Fields, Files, Options } from "formidable";

/**
 * 解析结果
 */
export interface FormidableResult {
  /**
   * 表单字段
   */
  fields: Fields;

  /**
   * 文件列表
   */
  files: Files;
}

/**
 * 安装选项
 */
export interface UploadOption extends Options {
  /**
   * 解析错误时输出错误代码
   * - 默认无
   */
  errorCode?: number;

  /**
   * 解析错误时 HTTP Code
   * @default 412
   */
  errorStatus?: number;

  /**
   * 解析错误时错误消息
   * @default 'request body error'
   */
  errorMessage?: string;
}


/**
 * Body 解析配置
 */
@scope('singleton')
export abstract class UploadOption implements UploadOption {
  // 影子类，注入识别使用
}
