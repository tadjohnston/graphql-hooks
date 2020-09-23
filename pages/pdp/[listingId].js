import { initializeGraphQL } from '../../lib/graphql-client'
import graphQLRequest from '../../lib/graphql-request'
import App from '../../components/app'
import Header from '../../components/header'
import PostList, {
  allPostsQuery,
  allPostsQueryOptions,
} from '../../components/post-list'

export default function Home(props) {

  console.log('props: ', props)
  return (
    <App>
      <Header />
      <PostList listingId={props.listingId} />
    </App>
  )
}

export async function getServerSideProps(context) {
  const client = initializeGraphQL()


  console.log('query: ', context.query)

  await graphQLRequest(client, allPostsQuery, allPostsQueryOptions(context.query.listingId))

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
      listingId: context.query.listingId,
    },
  }
}
