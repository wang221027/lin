export type ArticleListType = {
  browse_list?: any[]
  content: string
  cover: string
  id: number
  is_delete: number
  likeList?: any[]
  nickname: string
  time: string
  title: string
  type: string
  user_id: string
}
export interface ArticleList {
  status: number
  message: string
  data: ArticleListType[]
}
