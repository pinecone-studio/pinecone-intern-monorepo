export interface CardData {
    id: number
    title: string
    description: string
    image: string
    lessonsCount: number
}

export const cardData: CardData[] = [
    {
        id : 1,
        title: 'JavaScript',
        description: 'Сайтын загвар угсрах үндсэн суурь хэлнүүд бөгөөд бүрэн static болон',
        image: 'js.png',
        lessonsCount: 5,
    },
    {
        id : 2,
        title: 'CSS',
        description: 'Компьютер хэрхэн ажилладаг болон компьютерын шинжлэх уха',
        image: 'css.png',
        lessonsCount: 5,
    },
    {
        id : 3,
        title: 'HTML',
        description: 'Сайтын загвар угсрах үндсэн суурь хэлнүүд бөгөөд бүрэн static болон',
        image: 'html.png',
        lessonsCount: 5,
    }
]