import { defineStore } from 'pinia'
import type { ArticleListType } from '@/api/ArticleHome/type'
export const useArticleHomeStore = defineStore('articleHome', {
  state() {
    return {
      articleList: [] as ArticleListType[],
      articleListData: [] as ArticleListType[]
    }
  },
  actions: {
    getArticleList(data: ArticleListType[]) {
      this.articleList = data
      // 让服务器返回的数据根据id进行排序
      this.articleListData = data
      this.articleListData.sort((a: any, b: any) => {
        return b.id - a.id
      })
    }
  }
})
