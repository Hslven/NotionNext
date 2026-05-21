
export default function getAllPageIds (collectionQuery, collectionId, collectionView, viewIds) {
  if (!collectionQuery && !collectionView) {
    return []
  }
  // 优先按照第一个视图排序
  let pageIds = []
  if (viewIds && viewIds.length > 0 && collectionQuery?.[collectionId]) {
    const ids =
      collectionQuery[collectionId][viewIds[0]]?.collection_group_results
        ?.blockIds || collectionQuery[collectionId][viewIds[0]]?.blockIds
    if (Array.isArray(ids)) {
      pageIds.push(...ids)
    }
  }

  // 否则按照数据库原始排序
  if (pageIds.length === 0 && collectionQuery && Object.values(collectionQuery).length > 0) {
    const pageSet = new Set()
    Object.values(collectionQuery[collectionId]).forEach(view => {
      view?.blockIds?.forEach(id => pageSet.add(id)) // group视图
      view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id)) // table视图
    })
    pageIds = [...pageSet]
    // console.log('PageIds: 从collectionQuery获取', collectionQuery, pageIds.length)
  }

  // Notion public site responses may omit collection_query but keep page order on views.
  if (pageIds.length === 0 && collectionView && viewIds?.length > 0) {
    const pageSet = new Set()
    viewIds.forEach(viewId => {
      collectionView[viewId]?.value?.page_sort?.forEach(id => pageSet.add(id))
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
