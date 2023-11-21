// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {BlogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogListData()
  }

  getBlogListData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    // console.log(data)

    const FormattedData = data.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
    }))
    this.setState({BlogData: FormattedData, isLoading: false})
  }

  render() {
    const {BlogData, isLoading} = this.state
    // console.log(BlogData)

    return (
      <>
        <div data-testid="loader">
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            BlogData.map(item => <BlogItem blogData={item} key={item.id} />)
          )}
        </div>
      </>
    )
  }
}

export default BlogList
