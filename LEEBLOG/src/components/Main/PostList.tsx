import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostItem from './PostItem'
import { PostListItemType } from 'types/PostItem.types'
import useInfiniteScroll, { useInfiniteScrollType } from 'hooks/useInfiniteScroll'

type PostListProps = {
  selectedCategory: string
  posts: PostListItemType[]
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`

const PostList: FunctionComponent<PostListProps> = function({selectedCategory,posts}) {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(selectedCategory, posts);

  return (
    //화면에 보이는지 체크하기 위한 특정 요소를 선택하기 위해, 상위 요소인 PostListWrapper를 연결해야 함
    <PostListWrapper ref={containerRef}> 
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList