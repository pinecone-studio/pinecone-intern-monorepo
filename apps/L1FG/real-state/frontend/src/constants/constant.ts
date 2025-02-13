type CategoriesType = {
  id: number;
  value: string;
};

export const Categories = <SubCategoryType[]>[
  { id: 1, value: 'Орон сууц', title: 'apartmet', number: '79' },
  { id: 2, value: 'Байшин', title: 'house', number: '79' },
  { id: 3, value: 'Оффис', title: 'office', number: '79' },
];

type ProvinceType = {
  id: number;
  value: string;
};
export const Provincies = <ProvinceType[]>[
  { id: 1, value: 'Улаанбаатар' },
  { id: 2, value: 'Баян-Өлгий' },
  { id: 3, value: 'Баянхонгор' },
  { id: 4, value: 'Булган' },
  { id: 5, value: 'Говь-Алтай' },
  { id: 6, value: 'Говьсүмбэр' },
  { id: 7, value: 'Дархан-Уул' },
  { id: 8, value: 'Дорноговь' },
  { id: 9, value: 'Дорнод' },
  { id: 10, value: 'Дундговь' },
  { id: 11, value: 'Завхан' },
  { id: 12, value: 'Орхон' },
  { id: 13, value: 'Өвөрхангай' },
  { id: 14, value: 'Өмнөговь' },
  { id: 15, value: 'Сүхбаатар' },
  { id: 16, value: 'Сэлэнгэ' },
  { id: 17, value: 'Төв' },
  { id: 18, value: 'Увс' },
  { id: 19, value: 'Ховд' },
  { id: 20, value: 'Хөвсгөл' },
  { id: 21, value: 'Хэнтий' },
  { id: 22, value: 'Архангай' },
];

export const Districts = <ProvinceType[]>[
  { id: 1, value: 'Багануур' },
  { id: 2, value: 'Баянзүрх' },
  { id: 3, value: 'Баянгол' },
  { id: 4, value: 'Налайх' },
  { id: 5, value: 'Сонгинохайрхан' },
  { id: 6, value: 'Сүхбаатар' },
  { id: 7, value: 'Хан-Уул' },
  { id: 8, value: 'Чингэлтэй' },
];

export const Cost = <ProvinceType[]>[
  { id: 1, value: '1 сая' },
  { id: 2, value: '5 сая' },
  { id: 3, value: '10 сая' },
  { id: 4, value: '50 сая' },
  { id: 5, value: '100 сая' },
  { id: 6, value: '300 сая' },
];

export const Rooms = <CategoriesType[]>[
  { id: 1, value: '1' },
  { id: 2, value: '2' },
  { id: 3, value: '3' },
  { id: 4, value: '4' },
  { id: 5, value: '5' },
  { id: 6, value: '+5' },
];
export const ToiletRooms = <CategoriesType[]>[
  { id: 1, value: '1' },
  { id: 2, value: '2' },
  { id: 3, value: '3+' },
];

export const Others = <SubCategoryType[]>[
  { id: 1, value: 'Дулаан зогсоол' },
  { id: 2, value: 'Агуулах' },
  { id: 3, value: 'Лифт' },
];

export type SubCategoryType = {
  id?: number;
  value?: string;
  number?: string;
  title?: string;
};

export const SubCategory = <SubCategoryType[]>[
  { id: 1, title: 'new', value: 'Шинээр нэмэгдсэн', number: '13' },
  { id: 2, title: 'near', value: 'Хотын төвтэй ойрхон', number: '2' },
  { id: 3, title: 'fresh', value: 'Агаарт', number: '22' },
  { id: 4, title: 'downtown', value: 'А зэрэглэлийн бүс', number: '21' },
];
