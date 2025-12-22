export interface Notice {
  id: number
  title: string
  titleKey: string
  content: string
  contentKey: string
  date: string
  views?: number
}

export const noticesData: Notice[] = [
  {
    id: 1,
    title: "서비스 오픈 안내",
    titleKey: "notice.1.title",
    content: "소빈 서비스가 21일에 정식 오픈되었습니다.\n\n맞춤형 보자기 제작 서비스를 통해 브랜드의 감성을 포장하는 가장 간결한 방식을 제공해드리겠습니다.\n\n많은 관심과 이용 부탁드립니다.",
    contentKey: "notice.1.content",
    date: "2025-11-21",
    views: 0
  }
]

