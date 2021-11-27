import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./App.css";

const accessToken =
  "RzFzerLP0OIDL_fiC9vJwsfF47nFkL6UDNRvfthAO8Y";
const spaceId = "h9ilit1fiefr";
const query = `
{
  blogPostCollection{
    total
    items{
      title
      description
      image{
        title
        url
        fileName
      }
    }
  }
}
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      blogs: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          query
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);

        const { data } = response;
        this.setState({
          loading: false,
          blogs: data ? data.blogPostCollection.items : []
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message
        });
      });
  }

  render() {
    const { blogs } = this.state;

    return (
      <div className="App">
        {blogs.map(blog => {
          return (
            <div className="blog" key={blog.title}>
              <span className="blog__releaseYear">{blog.description}</span>
              {blog.image && (
                <img
                  className="blog__image"
                  src={blog.image.url}
                  alt={blog.image.description}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App
