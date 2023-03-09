import { SetupFunction } from '@zenweb/core';
import { UploadOption } from './types';
export * from './types';
export { Upload, UploadHelper } from './upload';

export default function setup(opt?: UploadOption): SetupFunction {
  return function upload(setup) {
    setup.debug('option: %o', opt);
    setup.assertModuleExists('inject');
    setup.assertModuleExists('result');
    setup.assertModuleExists('helper');
    setup.core.injector.define(UploadOption, opt);
  }
}
