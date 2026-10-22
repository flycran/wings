import i18next from 'i18next';
import zh_index from '../langs/zh/index.json'

i18next.init({
  lng: 'zh',
  debug: true,
  resources: {
    zh: zh_index
  }
});

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "zh";
    resources: {
      zh: typeof zh_index;
    };
  }
}