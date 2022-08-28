import { NavLink } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../home/Footer";
import Aos from "aos";
import 'aos/dist/aos.css';
import { Component } from "react";
import { getBlogs } from "../../js/blogs";
import uuid from "react-uuid";

class Blog extends Component{
    constructor(props){
        super(props);
        this.blogs = [];
        this.page = 1;
        this.totalBlogs = 0;
    }

    async componentDidMount(){
        this.loadBlog();
        Aos.init({duration: 1500});
    }

    async loadBlog(){
        var det = await getBlogs(this.page);
        if(det.success){
            this.blogs = det.result;
            console.log(this.blogs);
            this.setState({})
        }
    }
    render(){
        return <section id="learn">
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <h1 className="learntitle">Learn more about skincare</h1>
       <center> <div className="underline"></div></center>
       <br />
        <div data-aos='fade-up' className="blogs">
            {this.blogs.length !== 0 ? this.blogs.map(function(item, i){
                return <div key={uuid()}  data-aos='fade-up' id="blog" className="blog">
                <div className="blogimg">
                <img src={item.image_url} alt="" />
                </div>
                <div className="blog-texts">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    
                    <span>By {item.author}</span> <br />
                    <NavLink className='learnlink' to={'/learn/'+item.id}>Learn More</NavLink>
                    
                </div>
                   
                </div>
            }) : <div>
                <center><h4>No blogs posted.</h4></center></div>}
          

            
        </div>
       <div className="pagination-grid">
       <div className="pagination">
            {this.page > 1 ? ( <p className='paginationLink' onClick={()=>{
              if(this.page > 1){
                this.page = this.page-1;
                this.loadBlog();
              }
            }}>Previous Page</p>) : ( <div></div>)}

            {this.page < parseInt(this.totalBlogs/8) ? ( <p onClick={()=>{
              var pages = parseInt(this.totalBlogs / 8);
              if(this.page < pages){
                this.page++;
                this.loadBlog()
              }
            }} className='paginationLink'>Next Page</p>) : ( <div></div>)}
           
            
          </div>
       </div>
       <div style={{
            'height': '300px'
          }} className="spacerfooter"></div>
       <Footer/>
    </section>
    }
}

export default Blog;