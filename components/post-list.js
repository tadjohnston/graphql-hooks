import { useState } from 'react'
import { useQuery } from 'graphql-hooks'
import ErrorMessage from './error-message'
import PostUpvoter from './post-upvoter'
import Submit from './submit'

export const allPostsQuery = `
query listing($listingId: String!) {
  listing(listingId: $listingId) {
    ... on Listing {
      propertyLabel
    }
  }
}
`


export const allPostsQueryOptions = (listingId) => ({
  variables: { listingId },
})

export default function PostList(props) {

  console.log('listingId: ', props.listingId)

  const { loading, error, data, refetch, cacheHit } = useQuery(
    allPostsQuery,
    {
      variables: { listingId: props.listingId }
    }
  )

    console.log('cacheHit: ', cacheHit)

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  const { listing } = data

  return (
    <>
      <div onClick={ () => refetch({ variables: { skip: 0, first: allPosts.length } }) }>
        CLICK REFETCH
      </div>
      <div>{listing.propertyLabel}</div>
    </>
  )
}
