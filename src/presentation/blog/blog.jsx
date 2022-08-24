import { get } from "jquery";
import { NavLink } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { getUserDetail } from "../../js/auth";
import public_url from "../../js/publicurl";
import $ from 'jquery';
import Footer from "../home/Footer";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";



const Blog=()=>{
    useEffect(()=>{
        Aos.init({duration: 1500})
    })
    return <section id="learn">
        <NavBar />
        <br />
        <br />
        <br />
        <h1 className="learntitle">Learn more about skincare</h1>
       <center> <div className="underline"></div></center>
       <br />
        <div className="blogs">
            <div id="blog" data-aos='fade-left' className="blog">
            <div className="blogimg">
            <img src={public_url+'products/DSC_4190.JPG'} alt="" />
            </div>
                <div className="blog-texts">
                    <h3>What is Indigo</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatibus recusandae esse mollitia maxime deleniti earum atque quae voluptatum illum. Alias voluptate, itaque excepturi numquam ducimus reiciendis quam exercitationem. Repudiandae?...</p>
                    
                    <span>By Aaron</span> <br />
                    <NavLink className='learnlink' to='/learn/5645454'>Learn More</NavLink>
                   
                </div>
               
            </div>

            <div id="blog" data-aos='fade-left' className="blog">
            <div className="blogimg">
            <img src={public_url+'products/DSC_4190.JPG'} alt="" />
            </div>
                <div className="blog-texts">
                    <h3>What is Indigo</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatibus recusandae esse mollitia maxime deleniti earum atque quae voluptatum illum. Alias voluptate, itaque excepturi numquam ducimus reiciendis quam exercitationem. Repudiandae?...</p>
                    
                    <span>By Aaron</span> <br />
                    <NavLink className='learnlink' to='/learn/5645454'>Learn More</NavLink>
                   
                </div>
               
            </div>

            <div id="blog3" data-aos='fade-left' className="blog">
            <div className="blogimg">
            <img src={public_url+'products/DSC_4190.JPG'} alt="" />
            </div>
                <div className="blog-texts">
                    <h3>What is Indigo</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatibus recusandae esse mollitia maxime deleniti earum atque quae voluptatum illum. Alias voluptate, itaque excepturi numquam ducimus reiciendis quam exercitationem. Repudiandae?...</p>
                    
                    <span>By Aaron</span> <br />
                    <NavLink className='learnlink' to='/learn/5645454'>Learn More</NavLink>
                   
                </div>
               
            </div>

            <div id="blog" data-aos='fade-left' className="blog">
            <div className="blogimg">
            <img src={public_url+'products/DSC_4190.JPG'} alt="" />
            </div>
                <div className="blog-texts">
                    <h3>What is Indigo</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatibus recusandae esse mollitia maxime deleniti earum atque quae voluptatum illum. Alias voluptate, itaque excepturi numquam ducimus reiciendis quam exercitationem. Repudiandae?...</p>
                    
                    <span>By Aaron</span> <br />
                    <NavLink className='learnlink' to='/learn/5645454'>Learn More</NavLink>
                   
                </div>
               
            </div>

            
        </div>

        <Footer />
    </section>
}

export default Blog;