import { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { getSingleBlog } from "../../js/adminProduct";
import { getBlogs } from "../../js/blogs";
import Footer from "../home/Footer";


const SingleBlog = (props) => { 
    const {blogId} = useParams();
    return <SingleBlogDet bid={blogId}/>
}

class SingleBlogDet extends Component{
    constructor(props){
        super(props);
        this.blogs = [];
        this.blog = [];
    }

    async componentDidMount(){
        var det = await getSingleBlog(this.props.bid);
        if(det.success){
            this.blog = det.blog;
            this.setState({})
        }
        var det2 = await getBlogs(1);
        if(det2.success){
            this.blogs = det2.result;
            this.setState({})
        }
    }
    render(){
        return <section id="sblog">
        <NavBar />
        <br />
        <div className="sblog-cont">
        <div className="sblog-left">
        <h1>{this.blog.title}</h1>
        <div className="sblog-img-cont">
            <div className="sblogimg">
                <img src={this.blog.image_url} alt="" />
            </div>
        </div>
            <div className="sblog-content" dangerouslySetInnerHTML={{
                __html: this.blog.content
            }} />

        <center><div className="underline"></div></center>
        <br />
        </div>

        <div className="sblog-right">
            <br />
            <br />
            <br />
            <h3>Other Posts</h3>
            <br />
            {this.blogs.length !== 1 ? this.blogs.map(function(item, i){
            if(item.id !== this.blog.id){
                return <div>
                 <div className="other-post">
                <img src={item.image_url} alt="" />
                <div className="op-texts">
                <h3>{item.title}</h3>
                <br />
                <NavLink className='other-post-nav' to={'learn/'+item.id}>Learn More</NavLink>
                </div>
                
            </div>
            
            <br />
            <div className="line"></div>
            <br />
            </div>
            }
           }.bind(this)) : <div><center><span>No Other Posts Found</span></center></div>}

           
           
        </div>
        </div>

        <Footer />
        
    </section>
    }
}


export default SingleBlog;