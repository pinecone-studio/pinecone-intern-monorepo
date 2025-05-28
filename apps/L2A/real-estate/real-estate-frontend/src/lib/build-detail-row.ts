export const BuildDetailRows = (post:any):[string, string | number | undefined][]=>[
        ['Ашиглалтад орсон он', post?.completionDate],
        ['Цонхны тоо', post?.windowsCount],
        ['Цонх', post?.windowType],
        ['Хаалга', 'no schema'],
        ['Хэдэн давхарт', post?.floorNumber],
        ['Барилгын давхар', post?.totalFloors],
        ['Шал', post?.roofMaterial],
        ['Тагт', post?.balcony ? 'Байгаа' : 'Байхгүй'],
        ['Лифт', post?.balcony ? 'Байгаа' : 'Байхгүй'],
      
]