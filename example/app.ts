import { Core } from '@zenweb/core';
import modInject from '@zenweb/inject';
import modResult from '@zenweb/result';
import messagecode from '@zenweb/messagecode';
import helper from '@zenweb/helper';
import modUpload, { Upload } from '../src';

const app = new Core();

app.setup(modInject());
app.setup(modResult());
app.setup(messagecode());
app.setup(helper());
app.setup(modUpload());

app.setup(function test(setup) {
  setup.middleware(async ctx => {
    ctx.body = await ctx.injector.getInstance(Upload);
  });
});

app.start();
