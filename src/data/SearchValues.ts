interface Genres {
  [key: string]: string;
}
export const genres = {
  '2': '和食',
  '3': '洋食',
  '4': 'カフェ',
  '5': 'その他',
  '6': '中華料理',
} as Genres;

export type Area = '全て' | '那加' | '蘇原' | '鵜沼' | '稲羽' | '川島';
export const areas: Area[] = ['全て', '那加', '蘇原', '鵜沼', '稲羽', '川島'];

export const identifyAreaFromAddress = (address: string): unknown => {
  type AreaKeywords = {
    [key in Area]: string[];
  };
  const areaKeywords: AreaKeywords = {
    全て: ['dummy'],
    鵜沼: [
      '鵜沼',
      '各務西',
      '各務車洞',
      '各務おがせ町',
      '各務東町',
      '各務山の前町',
      '各務船山町',
      '松が丘',
      '緑苑',
      'つつじが丘',
      'テクノプラザ',
      '桜木町',
    ],
    那加: ['那加', '尾崎', '入会町', '金属団地'],
    蘇原: ['蘇原', '東山'],
    稲羽: ['前渡北', '三井', '神置'],
    川島: ['川島'],
  };

  return (Object.keys(areaKeywords) as (keyof AreaKeywords)[]).find(
    (areaName: Area): boolean =>
      areaKeywords[areaName].find((keyword: string): boolean =>
        address.includes(keyword),
      ) !== undefined,
  );
};
